import Image from 'next/image'
import { Metadata } from 'next'

import Card from '@/components/Card'
import Section from '@/components/Section'
import { IPerson } from '@/customTypes/person'
import { IMovie } from '@/customTypes/movie'

const getMovieById = async (id: number) => {
  try {
    const url = process.env.API_URL! + `/${id}`
    const api_key = process.env.API_KEY!
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-API-KEY': api_key
      },
      next: {
        revalidate: 86400
      }
    })

    if (!response.ok) {
      throw new Error('Ошибка HTTP ' + response.status)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Ошибка:', error)
  }
}

type MoviePageProps = {
  params: {
    id: number
  }
}

export async function generateMetadata({ params: { id } }: MoviePageProps): Promise<Metadata> {
  const movie: IMovie = await getMovieById(+id)
  return {
    title: movie.name
  }
}

const MoviePage = async ({ params: { id } }: MoviePageProps) => {
  const movie: IMovie = await getMovieById(+id)

  const name = movie.name || movie.alternativeName || movie.enName
  const description = movie.description || 'No description...'
  const poster = movie.poster?.previewUrl || '/ks-stub.svg'

  const castIdSet = new Set<number>()
  const cast: IPerson[] = []

  movie.persons.forEach(person => {
    if (!castIdSet.has(person.id) && person.profession === 'актеры') {
      castIdSet.add(person.id)
      cast.push(person)
    }
  })

  return (
    <>
      <div className='h-[350px] left-0 right-0 top-0 relative z-[-1] overflow-hidden'>
        <div className='backdrop-gradient'></div>
        <Image alt={name} width={1200} height={350} src={movie.backdrop.url} className='mx-auto'></Image>
      </div>
      <Section className='-mt-[150px] flex items-center relative z-1 mobile:block'>
        <Image
          src={poster}
          alt={name}
          width={200}
          height={200}
          className='w-[200px] min-w-[200px] h-[300px] mobile:mx-auto shadow-md'
        ></Image>
        <div className='px-3 flex flex-col items-start gap-5'>
          <p className='text-2xl text-lightGrey line-clamp-1'>{name}</p>
          <ul className='flex items-center gap-3'>
            {movie.genres.map(genre => (
              <li
                key={genre.name}
                className='px-3 py-1.5 bg-primary cursor-pointer rounded-lg text-sm bg-lightGrey text-accent shadow-md hover:bg-accent hover:text-lightGrey transition-all'
              >
                {genre.name}
              </li>
            ))}
          </ul>
          <p className='line-clamp-3 opacity-[0.9]'>{description}</p>
        </div>
      </Section>
      <Section title='В ролях' hidden={cast.length === 0}>
        <div className='overflow-x-scroll scrollbar scrollbar-thumb-accent scrollbar-track-lightGrey'>
          <div className='flex items-start gap-3'>
            {cast.map(actor => (
              <Card key={actor.id} entity={actor}></Card>
            ))}
          </div>
        </div>
      </Section>
      <Section title='Трейлеры' hidden={movie.videos.trailers.length === 0}>
        <div className='overflow-x-scroll scrollbar scrollbar-thumb-accent scrollbar-track-white'>
          <div className='flex items-center gap-3 h-[300px]'>
            {movie.videos.trailers.map((trailer, ind) => (
              <a href={trailer.url} key={ind}>
                <div className='cursor-pointer bg-darkGrey'>
                  <div className='h-[240px] w-[160px] mx-auto relative rounded-lg overflow-hidden'></div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </Section>

      <Section title='Другие фильмы этой серии' hidden={movie.sequelsAndPrequels.length === 0}>
        <div className=' overflow-x-scroll overflow-y-hidden scrollbar scrollbar-thumb-accent scrollbar-track-white'>
          <div className='flex items-start gap-3 h-[300px]'>
            {movie.sequelsAndPrequels.map(movie => (
              <Card entity={movie}></Card>
            ))}
          </div>
        </div>
      </Section>
      <Section title='Похожее' hidden={movie.similarMovies.length === 0}>
        <div className='overflow-x-scroll overflow-y-hidden scrollbar scrollbar-thumb-accent scrollbar-track-white'>
          <div className='flex items-start gap-3 h-[300px]'>
            {movie.similarMovies.map(movie => (
              <Card entity={movie}></Card>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}
export default MoviePage
