import { redirect } from 'next/navigation'

import Section from '../Section'
import Card from '../Card'
import RefreshPageComponent from '../UI/RefreshPage'
import { IMovie, ITV, unwantedStatusCodes } from '@/customTypes'
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
        revalidate: 60
      },
      signal: AbortSignal.timeout(6000)
    })

    if (response.status === 403) {
      return 403
    }

    if (!response.ok) {
      throw new Error('Ошибка HTTP ' + response.ok)
    }

    if (response.ok) {
      const data = await response.json()
      const returnObj: fetchByGenreResponse | unwantedStatusCodes = {
        genre,
        films: data.docs
      }
      return returnObj
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'TimeoutError' || error.name === 'AbortError') {
        return 524
      }
    }
  }
}

type fetchByGenreResponse = {
  genre: string
  films: IMovie[] | ITV[]
}

const PopularFromGenre = async () => {
  const data: fetchByGenreResponse | unwantedStatusCodes | undefined = await getPopularFromGenre()

  if (data === 403) {
    redirect('/api-info')
  }

  if (data === 524) {
    return <RefreshPageComponent />
  }

  if (!data) {
    return null
  }

  const title = `Случайный жанр: «${data.genre[0].toUpperCase() + data.genre.slice(1)}»`

  return (
    <Section title={title} movieCard carousel>
      {data.films.map(movie => (
        <Card entity={movie}></Card>
      ))}
    </Section>
  )
}
export default PopularFromGenre
