import { redirect } from 'next/navigation'

import Section from '../Section'
import Card from '../Card'
import { ICartoon } from '@/customTypes/cartoon'
import { getRandomGenre } from '@/utils/getRandomGenre'

const getPopularFromGenre = async () => {
  const genre = getRandomGenre()
  try {
    const url = process.env.API_URL! + `?genres.name=${genre}`
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
    return {
      genre,
      films: data.docs
    }
  } catch (error) {
    console.error('Ошибка:', error)
  }
}

const PopularFromGenre = async () => {
  const data = await getPopularFromGenre()
  if (!data) {
    redirect('/api-info')
  }

  const title = `Случайный жанр: «${data.genre[0].toUpperCase() + data.genre.slice(1)}»`

  return (
    <Section title={title} movieCard carousel>
      {data.films.map((cartoon: ICartoon) => (
        <Card entity={cartoon}></Card>
      ))}
    </Section>
  )
}
export default PopularFromGenre
