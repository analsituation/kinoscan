import Section from '../Section'
import { ICartoon } from '@/customTypes/cartoon'
import { getRandomGenre } from '@/utils/getRandomGenre'
import Card from '../Card'

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
    return <div>Не удалось загрузить данные</div>
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
