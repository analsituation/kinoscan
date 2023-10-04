import { redirect } from 'next/navigation'
import Image from 'next/image'
import { Metadata } from 'next'

import Card from '@/components/Card'
import Section from '@/components/Section'
import ScrollbarProvider from '@/components/ScrollbarProvider'
import Top250Element from '@/components/UI/Top250Element'
import RefreshPageComponent from '@/components/UI/RefreshPage'
import { ICountry, IMovie, IPerson, unwantedStatusCodes } from '@/customTypes'
import { placeholderImg } from '@/utils/base64Img'
import { minsToHours } from '@/utils/minsToHours'
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
  const director: IPerson = movie.persons.find(person => person.profession === 'режиссеры')!
  const countries: ICountry[] = movie.countries

  const cast: IPerson[] = []

  movie.persons.forEach(person => {
    if (person.profession === 'актеры') {
      cast.push(person)
    }
  })

  // if (!director) {
  //   director = null
  // }

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
            src={movie.backdrop.url}
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
            height={300}
            className='w-[200px] min-w-[200px] h-[300px] sm:ml-3 shadow-md rounded-md'
          ></Image>
          <div className='px-3 flex flex-col items-start gap-5 mt-10 sm:mt-5'>
            <p className='text-3xl text-lightGrey line-clamp-1 sm:text-dark'>{name}</p>
            <ul className='flex items-center gap-3 flex-wrap'>
              {movie.genres.map(genre => (
                <li
                  key={genre.name}
                  className='px-3 py-1.5 bg-primary cursor-pointer rounded-lg text-sm bg-lightGrey text-accent shadow-md hover:bg-accent hover:text-lightGrey transition-all'
                >
                  {genre.name}
                </li>
              ))}
            </ul>
            {!!movie.year && <p className='opacity-[0.9]'>Год производства: {movie.year}</p>}
            {!!director && <p className='opacity-[0.9]'>Режиссер: {director.name || director.enName}</p>}
            {!!countries && (
              <p className='opacity-[0.9]'>
                {countries.length > 1 ? 'Страны:' : 'Страна:'}
                {countries.map(country => (
                  <span className='mx-1 border-b-darkGrey'>{country.name}</span>
                ))}
              </p>
            )}
            {!!movie.movieLength && (
              <p className='opacity-[0.9]'>
                Время: {movie.movieLength} мин. / {minsToHours(movie.movieLength)}
              </p>
            )}
          </div>
          {!!movie.top250 && <Top250Element position={movie.top250} />}
          {/* {!!movie.rating.kp && (
              <div className='absolute top-[50px] right-10 text-right text-white'>
                Рейтинг: <br />
                <span className='text-accent tracking-widest text-xl'>{movie.rating.kp.toFixed(2)}</span>
                <br />
                <span className='text-sm'>
                  {new Intl.NumberFormat('ru', { maximumSignificantDigits: 3 }).format(movie.votes.kp)} оценок
                </span>
              </div>
          )} */}
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

      <Section title='Трейлеры' hidden={movie.videos ? true : false}>
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
