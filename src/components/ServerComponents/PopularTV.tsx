import { ITV } from '@/customTypes/TV'

import Section from '../Section'
import BigCard from '../BigCard'

const getPopularTV = async () => {
  try {
    const url = process.env.API_URL! + '?type=tv-series&sortField=votes.kp&sortType=-1'
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

const PopularTV = async () => {
  const tvSeries = await getPopularTV()

  return (
    <Section title='Популярные сериалы' carousel>
      {tvSeries.map((tv: ITV) => (
        <BigCard entity={tv}></BigCard>
      ))}
    </Section>
  )
}
export default PopularTV
