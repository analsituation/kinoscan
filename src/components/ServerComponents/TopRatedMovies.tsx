import { redirect } from 'next/navigation'

import Section from '../Section'
import Card from '../Card'
import { IMovie } from '@/customTypes/movie'

const getTopRatedFilms = async () => {
  try {
    const url = process.env.API_URL! + '?type=movie&sortField=rating.kp&sortType=-1&externalId.imdb=!null'
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

const TopRatedMovies = async () => {
  const films = await getTopRatedFilms()
  if (!films) {
    redirect('/api-info')
  }

  return (
    <Section title='Фильмы с наивысшим рейтингом' movieCard carousel>
      {films.map((film: IMovie) => (
        <Card entity={film}></Card>
      ))}
    </Section>
  )
}
export default TopRatedMovies
