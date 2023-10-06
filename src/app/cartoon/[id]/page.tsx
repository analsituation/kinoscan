import { redirect } from 'next/navigation'
import Image from 'next/image'
import { Metadata } from 'next'
import clsx from 'clsx'

import Card from '@/components/Card'
import Section from '@/components/Section'
import ScrollbarProvider from '@/components/ScrollbarProvider'
import Top250Element from '@/components/UI/Top250Element'
import RefreshPageComponent from '@/components/UI/RefreshPage'
import GenresList from '@/components/UI/GenresList'
import BackDrop from '@/components/UI/BackDrop'
import { ICartoon, ICountry, IPerson, unwantedStatusCodes } from '@/customTypes'
import { placeholderImg } from '@/utils/base64Img'
import { dataFetchWithId } from '@/api/api'

type CartoonPageProps = {
  params: {
    id: number
  }
}

export async function generateMetadata({ params: { id } }: CartoonPageProps): Promise<Metadata> {
  const cartoon: ICartoon = await dataFetchWithId(id)

  return {
    title: cartoon.name
  }
}

const MoviePage = async ({ params: { id } }: CartoonPageProps) => {
  const cartoon: ICartoon | unwantedStatusCodes = await dataFetchWithId(id)

  if (cartoon === 403) {
    redirect('/api-info')
  }

  if (cartoon === 524) {
    return <RefreshPageComponent />
  }

  const name = cartoon.name || cartoon.alternativeName || cartoon.enName
  const description = cartoon.description || 'No description...'
  const poster = cartoon.poster?.previewUrl || '/ks-stub.svg'
  const backdrop = cartoon.backdrop.url
  const director: IPerson = cartoon.persons.find(person => person.profession === 'режиссеры')!
  const countries: ICountry[] = cartoon.countries

  const cast: IPerson[] = []

  cartoon.persons.forEach(person => {
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
              <GenresList object={cartoon} />
              {!!cartoon.year && (
                <p>
                  <span className='opacity-[0.9]'>Год производства: </span>
                  {cartoon.year}
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
          {!!cartoon.top250 && <Top250Element position={cartoon.top250} />}
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

      <Section title='Трейлеры' hidden={cartoon.videos ? true : false}>
        <ScrollbarProvider className='mb-6'>
          {!!cartoon.videos &&
            cartoon.videos.trailers.map((trailer, ind) => (
              <div key={ind}>
                <iframe allowFullScreen width='400' height='300' src={trailer.url + '?controls=1'}></iframe>
              </div>
            ))}
        </ScrollbarProvider>
      </Section>

      <Section title='Другие фильмы этой серии' hidden={cartoon.sequelsAndPrequels.length === 0}>
        <ScrollbarProvider>
          {cartoon.sequelsAndPrequels.map(movie => (
            <Card entity={movie} key={movie.id}></Card>
          ))}
        </ScrollbarProvider>
      </Section>

      <Section title='Похожее' hidden={cartoon.similarMovies.length === 0}>
        <ScrollbarProvider>
          {cartoon.similarMovies.map(movie => (
            <Card entity={movie} key={movie.id}></Card>
          ))}
        </ScrollbarProvider>
      </Section>
    </>
  )
}

export default MoviePage
