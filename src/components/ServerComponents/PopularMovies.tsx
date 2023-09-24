import { IMovie } from '@/customTypes/movie'

import Section from '../Section'
import Card from '../Card'

const getPopularMovies = async () => {
  try {
    const url = process.env.API_URL! + '?type=movie&sortField=votes.kp&sortType=-1'
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

const PopularMovies = async () => {
  const films = await getPopularMovies()

  return (
    <Section title='Популярные фильмы' movieCard carousel>
      {films.map((film: IMovie) => (
        <Card key={film.id} entity={film}></Card>
      ))}
    </Section>
  )
}
export default PopularMovies
