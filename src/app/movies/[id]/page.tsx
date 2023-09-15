import Card from '@/components/Card'
import Section from '@/components/Section'
import { IMovie } from '@/customTypes/movie'
import { IPerson } from '@/customTypes/person'
import Image from 'next/image'

const getRandomTop250TV = async (id: number) => {
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

const MoviePage = async () => {
  const movie: IMovie = await getRandomTop250TV(251733)

  const name = movie.name || movie.alternativeName || movie.enName
  const description = movie.description || 'No description...'
  const poster = movie.poster.previewUrl || movie.poster.url || './ks-stub.svg'

  const castIdSet = new Set<number>()
  const cast: IPerson[] = []

  movie.persons.forEach(person => {
    if (!castIdSet.has(person.id)) {
      if (person.profession === 'актеры' || person.profession === 'режиссеры' || person.profession === 'продюсеры') {
        castIdSet.add(person.id)
        cast.push(person)
      }
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
          className='w-[200px] min-w-[200px] h-[300px] mobile:mx-auto'
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
      <Section title='Casts' hidden={cast.length === 0}>
        <div className='overflow-x-scroll scrollbar scrollbar-thumb-accent scrollbar-track-lightGrey'>
          <div className='flex items-center gap-3'>
            {cast.map(actor => (
              <div className='flex-shrink-0 w-[200px] mb-6' key={actor.id}>
                <Card key={actor.id} entity={actor}></Card>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Section title='Trailers' hidden={movie.videos.trailers.length === 0}>
        <div className='overflow-x-scroll scrollbar scrollbar-thumb-accent scrollbar-track-lightGrey'>
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
    </>
  )
}
export default MoviePage
