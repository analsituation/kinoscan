import { redirect } from 'next/navigation'

import Section from '../Section'
import Card from '../Card'
import { ITV } from '@/customTypes/TV'

const getTopRatedTVs = async () => {
  try {
    const url = process.env.API_URL! + '?type=tv-series&sortField=rating.kp&sortType=-1&externalId.kpHD=!null'
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

const TopRatedTV = async () => {
  const tvs = await getTopRatedTVs()
  if (!tvs) {
    redirect('/api-info')
  }

  return (
    <Section title='Сериалы с наивысшим рейтингом' movieCard carousel>
      {tvs.map((tv: ITV) => (
        <Card entity={tv}></Card>
      ))}
    </Section>
  )
}
export default TopRatedTV
