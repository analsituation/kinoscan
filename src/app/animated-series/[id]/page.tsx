import { redirect } from 'next/navigation'
import Image from 'next/image'
import { Metadata } from 'next'
import clsx from 'clsx'

import Card from '@/components/Card'
import Section from '@/components/Section'
import ScrollbarProvider from '@/components/ScrollbarProvider'
import RefreshPageComponent from '@/components/UI/RefreshPage'
import BackDrop from '@/components/UI/BackDrop'
import GenresList from '@/components/UI/GenresList'
import Top250Element from '@/components/UI/Top250Element'
import { ICountry, IPerson, ITV, unwantedStatusCodes } from '@/customTypes'
import { placeholderImg } from '@/utils/base64Img'
import { dataFetchWithId } from '@/api/api'

type AnimatedTVPageProps = {
  params: {
    id: number
  }
}

export async function generateMetadata({ params: { id } }: AnimatedTVPageProps): Promise<Metadata> {
  const animatedTv: ITV = await dataFetchWithId(+id)

  return {
    title: animatedTv.name
  }
}

const TVPage = async ({ params: { id } }: AnimatedTVPageProps) => {
  const animatedTv: ITV | unwantedStatusCodes = await dataFetchWithId(+id)

  if (animatedTv === 403) {
    redirect('/api-info')
  }

  if (animatedTv === 524) {
    return <RefreshPageComponent />
  }

  const name = animatedTv.name || animatedTv.alternativeName || animatedTv.enName
  const description = animatedTv.description || 'No description...'
  const poster = animatedTv.poster?.previewUrl || '/ks-stub.svg'
  const backdrop = animatedTv.backdrop.url
  const director: IPerson = animatedTv.persons.find(person => person.profession === 'режиссеры')!
  const countries: ICountry[] = animatedTv.countries
  const releaseYears = animatedTv.releaseYears ? animatedTv.releaseYears : null

  const cast: IPerson[] = []

  animatedTv.persons.forEach(person => {
    if (person.profession === 'актеры') {
      cast.push(person)
    }
  })

  return (
    <>
      {backdrop && <BackDrop name={name} backdrop={backdrop} />}

      <Section className={clsx('relative z-1', backdrop && '-mt-[150px] sm:-mt-[250px]')}>
        <div className='relative flex items-center sm:items-start gap-5 sm:flex-col'>
          <Image
            placeholder={placeholderImg}
            src={poster}
            alt={name}
            width={200}
            height={200}
            className='w-[200px] min-w-[200px] h-[300px] sm:ml-5 shadow-md rounded-md'
          ></Image>
          <div className='sm:mx-5 flex-grow'>
            <div className='px-3 max-w-[75%] sm:px-0 flex flex-col items-start gap-5'>
              <p
                className={clsx(
                  'text-3xl sm:text-darkGrey',
                  backdrop && 'text-lightGrey',
                  !backdrop && 'text-darkGrey'
                )}
              >
                {name}
              </p>
              <GenresList object={animatedTv} />
              {!!releaseYears ? (
                <p>
                  <span className='opacity-[0.9]'>Годы выхода: </span>
                  {releaseYears[0]!.start} – {releaseYears[0]!.end ? releaseYears[0]!.end : '...'}
                </p>
              ) : (
                <p>
                  <span className='opacity-[0.9]'>Год производства: </span>
                  {animatedTv.year}
                </p>
              )}
              {!!director && (
                <p>
                  <span className='opacity-[0.9]'>Режиссер: </span>
                  {director.name || director.enName}
                </p>
              )}
              {!!countries && (
                <p>
                  <span className='opacity-[0.9]'>{countries.length > 1 ? 'Страны:' : 'Страна:'}</span>
                  {countries.map(country => (
                    <span className='mx-1'>{country.name}</span>
                  ))}
                </p>
              )}
            </div>
          </div>
          {!!animatedTv.top250 && <Top250Element position={animatedTv.top250} />}
        </div>
        <div className='mt-5 mx-5'>{description}</div>
      </Section>

      <Section title='В ролях' hidden={cast.length === 0}>
        <ScrollbarProvider>
          {cast.map(actor => (
            <Card entity={actor} key={actor.id}></Card>
          ))}
        </ScrollbarProvider>
      </Section>

      <Section title='Сезоны' hidden={animatedTv.seasonsInfo ? false : true}>
        {!!animatedTv.seasonsInfo &&
          animatedTv.seasonsInfo.slice(0).map((season, ind) => (
            <div key={season.number} className={clsx('bg-lightGrey p-3 flex gap-[140px]', ind % 2 === 1 && 'bg-white')}>
              <span className='w-[100px] inline-block'>Сезон {season.number}</span>
              <span className='inline-block'>{season.episodesCount} серий</span>
            </div>
          ))}
      </Section>

      <Section title='Трейлеры' hidden={animatedTv.videos ? false : true}>
        <ScrollbarProvider className='mb-6'>
          {!!animatedTv.videos &&
            animatedTv.videos.trailers.map((trailer, ind) => (
              <div key={ind}>
                <iframe allowFullScreen width='400' height='300' src={trailer.url + '?controls=1'}></iframe>
              </div>
            ))}
        </ScrollbarProvider>
      </Section>

      <Section title='Другие фильмы этой серии' hidden={animatedTv.sequelsAndPrequels.length === 0}>
        <ScrollbarProvider>
          {animatedTv.sequelsAndPrequels.map(el => (
            <Card entity={el} key={el.id}></Card>
          ))}
        </ScrollbarProvider>
      </Section>

      <Section title='Похожее' hidden={animatedTv.similarMovies.length === 0}>
        <ScrollbarProvider>
          {animatedTv.similarMovies.map(el => (
            <Card entity={el} key={el.id}></Card>
          ))}
        </ScrollbarProvider>
      </Section>
    </>
  )
}
export default TVPage
