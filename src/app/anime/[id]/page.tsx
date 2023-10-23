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
import { ICountry, IAnime, IPerson, unwantedStatusCodes } from '@/customTypes'
import { placeholderImg } from '@/utils/base64Img'
import { dataFetchWithId } from '@/api/api'

type AnimePageProps = {
  params: {
    id: number
  }
}

export async function generateMetadata({ params: { id } }: AnimePageProps): Promise<Metadata> {
  const anime: IAnime = await dataFetchWithId(id)

  return {
    title: anime.name || anime.enName || anime.alternativeName
  }
}

const MoviePage = async ({ params: { id } }: AnimePageProps) => {
  const anime: IAnime | unwantedStatusCodes = await dataFetchWithId(id)

  if (anime === 403) {
    redirect('/api-info')
  }

  if (anime === 524) {
    return <RefreshPageComponent />
  }

  const name = anime.name || anime.alternativeName || anime.enName
  const description = anime.description || 'No description...'
  const poster = anime.poster?.previewUrl || '/ks-stub.svg'
  const backdrop = anime.backdrop.url
  const director: IPerson = anime.persons.find(person => person.profession === 'режиссеры')!
  const countries: ICountry[] = anime.countries
  const releaseYears = anime.releaseYears ? anime.releaseYears : null

  const cast: IPerson[] = []

  anime.persons.forEach(person => {
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
              <GenresList object={anime} />
              {!!releaseYears ? (
                <p>
                  <span className='opacity-[0.9]'>Годы выхода: </span>
                  {releaseYears[0]!.start} – {releaseYears[0]!.end ? releaseYears[0]!.end : '...'}
                </p>
              ) : (
                <p>
                  <span className='opacity-[0.9]'>Год производства: </span>
                  {anime.year}
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
          {!!anime.top250 && <Top250Element position={anime.top250} />}
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

      {!!anime.isSeries && (
        <Section title='Сезоны' hidden={anime.seasonsInfo.length === 0}>
          {anime.seasonsInfo.slice(0).map((season, ind) => (
            <div key={season.number} className={clsx('bg-lightGrey p-3 flex gap-[140px]', ind % 2 === 1 && 'bg-white')}>
              <span className='w-[100px] inline-block'>Сезон {season.number}</span>
              <span className='inline-block'>{season.episodesCount} серий</span>
            </div>
          ))}
        </Section>
      )}

      <Section title='Трейлеры' hidden={!Boolean(anime.videos)}>
        <ScrollbarProvider className='mb-6'>
          {!!anime.videos &&
            anime.videos.trailers.map((trailer, ind) => (
              <div key={ind}>
                <iframe allowFullScreen width='400' height='300' src={trailer.url + '?controls=1'}></iframe>
              </div>
            ))}
        </ScrollbarProvider>
      </Section>

      <Section title='Другие фильмы этой серии' hidden={anime.sequelsAndPrequels.length === 0}>
        <ScrollbarProvider>
          {anime.sequelsAndPrequels.map(anime => (
            <Card entity={anime} key={anime.id}></Card>
          ))}
        </ScrollbarProvider>
      </Section>

      <Section title='Похожее' hidden={anime.similarMovies.length === 0}>
        <ScrollbarProvider>
          {anime.similarMovies.map(anime => (
            <Card entity={anime} key={anime.id}></Card>
          ))}
        </ScrollbarProvider>
      </Section>
    </>
  )
}
export default MoviePage
