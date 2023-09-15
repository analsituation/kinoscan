import { ITV } from '@/customTypes/TV'

import Section from '../Section'
import BigCard from '../BigCard'

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
    return data.docs
  } catch (error) {
    console.error('Ошибка:', error)
  }
}

const TopRatedTV = async () => {
  const tvs = await getTopRatedTVs()

  return (
    <Section title='Сериалы с наивысшим рейтингом' carousel>
      {tvs.map((tv: ITV) => (
        <BigCard entity={tv}></BigCard>
      ))}
    </Section>
  )
}
export default TopRatedTV
