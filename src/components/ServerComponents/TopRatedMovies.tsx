import { IMovie } from '@/customTypes/movie'

import Section from '../Section'
import BigCard from '../BigCard'

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
    return data.docs
  } catch (error) {
    console.error('Ошибка:', error)
  }
}

const TopRatedMovies = async () => {
  const films = await getTopRatedFilms()

  return (
    <Section title='Фильмы с наивысшим рейтингом' carousel>
      {films.map((film: IMovie) => (
        <BigCard entity={film}></BigCard>
      ))}
    </Section>
  )
}
export default TopRatedMovies
