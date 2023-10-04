import { redirect } from 'next/navigation'
import Image from 'next/image'
import { Metadata } from 'next'

import Card from '@/components/Card'
import Section from '@/components/Section'
import ScrollbarProvider from '@/components/ScrollbarProvider'
import Top250Element from '@/components/UI/Top250Element'
import RefreshPageComponent from '@/components/UI/RefreshPage'
import { ICartoon, ICountry, IPerson, unwantedStatusCodes } from '@/customTypes'
import { placeholderImg } from '@/utils/base64Img'
import { minsToHours } from '@/utils/minsToHours'
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
      <div className='h-[420px] sm:h-[250px] left-0 right-0 top-0 relative z-[-1] overflow-hidden'>
        <div className='backdrop-gradient'></div>
        <div className='w-[50%] h-full mx-auto relative'>
          <Image
            placeholder={'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='}
            quality={65}
            alt={name}
            layout='fill'
            style={{ objectFit: 'cover' }}
            src={cartoon.backdrop.url}
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
              {cartoon.genres.map(genre => (
                <li
                  key={genre.name}
                  className='px-3 py-1.5 bg-primary cursor-pointer rounded-lg text-sm bg-lightGrey text-accent shadow-md hover:bg-accent hover:text-lightGrey transition-all'
                >
                  {genre.name}
                </li>
              ))}
            </ul>
            {!!cartoon.year && <p className='opacity-[0.9]'>Год производства: {cartoon.year}</p>}
            {!!director && <p className='opacity-[0.9]'>Режиссер: {director.name || director.enName}</p>}
            {!!countries && (
              <p className='opacity-[0.9]'>
                {countries.length > 1 ? 'Страны:' : 'Страна:'}
                {countries.map(country => (
                  <span className='mx-1 border-b-darkGrey'>{country.name}</span>
                ))}
              </p>
            )}
            {!!cartoon.movieLength && (
              <p className='opacity-[0.9]'>
                Время: {cartoon.movieLength} мин. / {minsToHours(cartoon.movieLength)}
              </p>
            )}
          </div>
          {!!cartoon.top250 && <Top250Element position={cartoon.top250} />}
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
