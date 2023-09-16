import { IMovieShort } from '@/customTypes/movie'

import Section from '../Section'
import Card from '../Card'

const getFilmsInTheaters = async () => {
  try {
    const url = process.env.API_URL! + '?ticketsOnSale=true&year=2023'
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

const InTheaters = async () => {
  const movies = await getFilmsInTheaters()

  return (
    <Section title='В прокате' carousel movieCard>
      {movies.map((movie: IMovieShort) => (
        <Card entity={movie}></Card>
      ))}
    </Section>
  )
}
export default InTheaters
