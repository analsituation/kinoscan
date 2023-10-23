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
import { ICountry, IMovie, IPerson, unwantedStatusCodes } from '@/customTypes'
import { placeholderImg } from '@/utils/base64Img'
import { dataFetchWithId } from '@/api/api'

type MoviePageProps = {
  params: {
    id: number
  }
}

export async function generateMetadata({ params: { id } }: MoviePageProps): Promise<Metadata> {
  const movie: IMovie = await dataFetchWithId(id)

  return {
    title: movie.name || movie.enName || movie.alternativeName
  }
}

const MoviePage = async ({ params: { id } }: MoviePageProps) => {
  const movie: IMovie | unwantedStatusCodes = await dataFetchWithId(id)

  if (movie === 403) {
    redirect('/api-info')
  }

  if (movie === 524) {
    return <RefreshPageComponent />
  }

  const name = movie.name || movie.alternativeName || movie.enName
  const description = movie.description || 'No description...'
  const poster = movie.poster?.previewUrl || '/ks-stub.svg'
  const backdrop = movie.backdrop.url
  const director: IPerson = movie.persons.find(person => person.profession === 'режиссеры')!
  const countries: ICountry[] = movie.countries

  const cast: IPerson[] = []

  movie.persons.forEach(person => {
    if (person.profession === 'актеры') {
      cast.push(person)
    }
  })

  console.log(Boolean(movie.videos))

  // if (!director) {
  //   director = null
  // }

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
              <GenresList object={movie} />
              {!!movie.year && (
                <p>
                  <span className='opacity-[0.9]'>Год производства: </span>
                  {movie.year}
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
          {!!movie.top250 && <Top250Element position={movie.top250} />}
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

      <Section title='Трейлеры' hidden={!Boolean(movie.videos)}>
        <ScrollbarProvider className='mb-6'>
          {!!movie.videos &&
            movie.videos.trailers.map((trailer, ind) => (
              <div key={ind}>
                <iframe allowFullScreen width='400' height='300' src={trailer.url + '?controls=1'}></iframe>
              </div>
            ))}
        </ScrollbarProvider>
      </Section>

      <Section title='Другие фильмы этой серии' hidden={movie.sequelsAndPrequels.length === 0}>
        <ScrollbarProvider>
          {movie.sequelsAndPrequels.map(movie => (
            <Card entity={movie} key={movie.id}></Card>
          ))}
        </ScrollbarProvider>
      </Section>

      <Section title='Похожее' hidden={movie.similarMovies.length === 0}>
        <ScrollbarProvider>
          {movie.similarMovies.map(movie => (
            <Card entity={movie} key={movie.id}></Card>
          ))}
        </ScrollbarProvider>
      </Section>
    </>
  )
}
export default MoviePage
