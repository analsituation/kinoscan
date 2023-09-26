import { redirect } from 'next/navigation'

import Section from '../Section'
import BigCard from '../BigCard'

const getRandomTop250 = async () => {
  const number = Math.floor(Math.random() * (250 - 1) + 1)
  try {
    const url = process.env.API_URL! + `?isSeries=false&top250=${number}`
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
    return data.docs[0]
  } catch (error) {
    console.error('Ошибка:', error)
  }
}

const RandomTop250 = async () => {
  const movie = await getRandomTop250()
  if (!movie) {
    redirect('/api-info')
  }

  return (
    <Section title={`Случайный фильм из Топ250`} carousel={false}>
      <BigCard entity={movie}></BigCard>
    </Section>
  )
}
export default RandomTop250
