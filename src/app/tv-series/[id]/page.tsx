import Image from 'next/image'
import { Metadata } from 'next'
import { IoIosArrowForward } from 'react-icons/io'

import Card from '@/components/Card'
import Section from '@/components/Section'
import { IPerson } from '@/customTypes/person'
import { ITV } from '@/customTypes/TV'
import clsx from 'clsx'
import { placeholderImg } from '@/utils/base64Img'
import ScrollbarProvider from '@/components/ScrollbarProvider'

const getTvById = async (id: number) => {
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

type TVPageProps = {
  params: {
    id: number
  }
}

export async function generateMetadata({ params: { id } }: TVPageProps): Promise<Metadata> {
  const movie: ITV = await getTvById(+id)
  return {
    title: movie.name
  }
}

const TVPage = async ({ params: { id } }: TVPageProps) => {
  const tv: ITV = await getTvById(+id)

  const name = tv.name || tv.alternativeName || tv.enName
  const description = tv.description || 'No description...'
  const poster = tv.poster?.previewUrl || '/ks-stub.svg'

  const castIdSet = new Set<number>()
  const cast: IPerson[] = []

  tv.persons.forEach(person => {
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
            src={tv.backdrop.url}
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
          height={200}
          className='w-[200px] min-w-[200px] h-[300px] shadow-md'
        ></Image>
        <div className='px-3 flex flex-col items-start gap-5 mt-10 sm:mt-5'>
          <p className='text-3xl text-lightGrey sm:text-dark'>{name}</p>
          <ul className='flex items-center gap-3 flex-wrap'>
            {tv.genres.map(genre => (
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

      <Section title='' skeleton>
        {[...new Array(3)].map((season, ind) => (
          <div
            key={ind}
            className={clsx('h-[48px] flex gap-[140px] bg-lightGrey animate-pulse', ind % 2 === 1 && 'bg-white')}
          >
            <span className='w-[100px] inline-block'></span>
            <span className='inline-block'></span>
          </div>
        ))}
      </Section>

      <Section title='Сезоны' hidden={tv.seasonsInfo.length === 0}>
        {tv.seasonsInfo.slice(1).map((season, ind) => (
          <div key={season.number} className={clsx('bg-lightGrey p-3 flex gap-[140px]', ind % 2 === 1 && 'bg-white')}>
            <span className='w-[100px] inline-block'>Сезон {season.number}</span>
            <span className='inline-block'>{season.episodesCount} серий</span>
          </div>
        ))}
      </Section>

      <Section title='Трейлеры' hidden={tv.videos.trailers.length === 0}>
        <ScrollbarProvider>
          {tv.videos.trailers.map((trailer, ind) => (
            <div key={ind}>
              <iframe allowFullScreen width='400' height='300' src={trailer.url + '?controls=1'}></iframe>
            </div>
          ))}
        </ScrollbarProvider>
      </Section>

      <Section title='Другие фильмы этой серии' hidden={tv.sequelsAndPrequels.length === 0}>
        <ScrollbarProvider>
          {tv.sequelsAndPrequels.map(el => (
            <Card entity={el} key={el.id}></Card>
          ))}
        </ScrollbarProvider>
      </Section>

      <Section title='Похожее' hidden={tv.similarMovies.length === 0}>
        <ScrollbarProvider>
          {tv.similarMovies.map(el => (
            <Card entity={el} key={el.id}></Card>
          ))}
        </ScrollbarProvider>
      </Section>
    </>
  )
}
export default TVPage
