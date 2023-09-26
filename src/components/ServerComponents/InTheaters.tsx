import { redirect } from 'next/navigation'

import Section from '../Section'
import BigCard from '../BigCard'
import { IMovie } from '@/customTypes/movie'

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
    if (data.statusCode === 403) {
      return undefined
    }
    return data.docs
  } catch (error) {
    console.error('Ошибка:', error)
  }
}

const InTheaters = async () => {
  const movies = await getFilmsInTheaters()
  if (!movies) {
    redirect('/api-info')
  }

  return (
    <Section title='В прокате' carousel>
      {movies.map((movie: IMovie) => (
        <BigCard entity={movie}></BigCard>
      ))}
    </Section>
  )
}
export default InTheaters
