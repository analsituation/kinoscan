import { redirect } from 'next/navigation'

import Section from '../Section'
import BigCard from '../BigCard'
import { ITV } from '@/customTypes/TV'

const getPopularAnimatedTV = async () => {
  try {
    const url = process.env.API_URL! + '?type=animated-series&sortField=votes.kp&sortType=-1'
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

const PopularAnimatedTV = async () => {
  const tvSeries = await getPopularAnimatedTV()
  if (!tvSeries) {
    redirect('/api-info')
  }

  return (
    <Section title='Популярные мультсериалы' carousel>
      {tvSeries.map((tv: ITV) => (
        <BigCard entity={tv}></BigCard>
      ))}
    </Section>
  )
}
export default PopularAnimatedTV
