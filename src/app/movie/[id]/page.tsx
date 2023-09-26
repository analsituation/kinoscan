import { redirect } from 'next/navigation'
import Image from 'next/image'
import { Metadata } from 'next'

import Card from '@/components/Card'
import Section from '@/components/Section'
import { IPerson } from '@/customTypes/person'
import { IMovie } from '@/customTypes/movie'
import { placeholderImg } from '@/utils/base64Img'
import ScrollbarProvider from '@/components/ScrollbarProvider'

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
    if (data.statusCode === 403) {
      return undefined
    }
    return data.docs
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
  if (!movie) {
    redirect('/api-info')
  }

  return {
    title: movie.name
  }
}

const MoviePage = async ({ params: { id } }: MoviePageProps) => {
  const movie: IMovie = await getMovieById(+id)
  if (!movie) {
    redirect('/api-info')
  }

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

      <Section className='-mt-[150px] sm:-mt-[250px] flex items-start gap-4 relative z-1 sm:block'>
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

      <Section title='Трейлеры' hidden={movie.videos.trailers.length === 0}>
        <ScrollbarProvider className='mb-6'>
          {movie.videos.trailers.map((trailer, ind) => (
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
