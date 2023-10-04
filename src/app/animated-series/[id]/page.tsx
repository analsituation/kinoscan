import { redirect } from 'next/navigation'
import Image from 'next/image'
import { Metadata } from 'next'
import clsx from 'clsx'

import Card from '@/components/Card'
import Section from '@/components/Section'
import ScrollbarProvider from '@/components/ScrollbarProvider'
import RefreshPageComponent from '@/components/UI/RefreshPage'
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
  const director: IPerson = animatedTv.persons.find(person => person.profession === 'режиссеры')!
  const countries: ICountry[] = animatedTv.countries

  const cast: IPerson[] = []

  animatedTv.persons.forEach(person => {
    if (person.profession === 'актеры') {
      cast.push(person)
    }
  })

  return (
    <>
      <div className='h-[420px] sm:h-[250px] left-0 right-0 top-0 relative z-[-1] overflow-hidden'>
        <div className='backdrop-gradient'></div>
        <div className='w-[50%] h-full mx-auto relative'>
          <Image
            placeholder={'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='}
            quality={65}
            alt={name}
            layout='fill'
            style={{ objectFit: 'cover' }}
            src={animatedTv.backdrop.url}
            className='mx-auto'
          ></Image>
        </div>
      </div>

      <Section className='-mt-[150px] sm:-mt-[250px] relative z-1 sm:block'>
        <div className='flex items-start gap-4 relative'>
          <Image
            placeholder={placeholderImg}
            src={poster}
            alt={name}
            width={200}
            height={200}
            className='w-[200px] min-w-[200px] h-[300px] sm:ml-3 shadow-md rounded-md'
          ></Image>
          <div className='px-3 flex flex-col items-start gap-5 mt-10 sm:mt-5'>
            <p className='text-3xl text-lightGrey sm:text-dark'>{name}</p>
            <ul className='flex items-center gap-3 flex-wrap'>
              {animatedTv.genres.map(genre => (
                <li
                  key={genre.name}
                  className='px-3 py-1.5 bg-primary cursor-pointer rounded-lg text-sm bg-lightGrey text-accent shadow-md hover:bg-accent hover:text-lightGrey transition-all'
                >
                  {genre.name}
                </li>
              ))}
            </ul>
            {!!animatedTv.year && <p className='opacity-[0.9]'>Год производства: {animatedTv.year}</p>}
            {!!director && <p className='opacity-[0.9]'>Режиссер: {director.name || director.enName}</p>}
            {!!countries && (
              <p className='opacity-[0.9]'>
                {countries.length > 1 ? 'Страны:' : 'Страна:'}
                {countries.map(country => (
                  <span className='mx-1 border-b-darkGrey'>{country.name}</span>
                ))}
              </p>
            )}
          </div>
        </div>
        <div className='mt-5'>
          <p className='opacity-[0.9]'>{description}</p>
        </div>
      </Section>

      <Section title='В ролях' hidden={cast.length === 0}>
        <ScrollbarProvider>
          {cast.map(actor => (
            <Card entity={actor} key={actor.id}></Card>
          ))}
        </ScrollbarProvider>
      </Section>

      <Section title='Сезоны' hidden={animatedTv.seasonsInfo.length === 0}>
        {animatedTv.seasonsInfo.slice(0).map((season, ind) => (
          <div key={season.number} className={clsx('bg-lightGrey p-3 flex gap-[140px]', ind % 2 === 1 && 'bg-white')}>
            <span className='w-[100px] inline-block'>Сезон {season.number}</span>
            <span className='inline-block'>{season.episodesCount} серий</span>
          </div>
        ))}
      </Section>

      <Section title='Трейлеры' hidden={animatedTv.videos ? true : false}>
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
