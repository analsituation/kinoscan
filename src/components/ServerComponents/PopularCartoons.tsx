import Section from '../Section'
import { ICartoon } from '@/customTypes/cartoon'
import Card from '../Card'

const getPopularCartoons = async () => {
  try {
    const url = process.env.API_URL! + '?type=cartoon&sortField=votes.kp&sortType=-1'
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

const PopularCartoons = async () => {
  const cartoons = await getPopularCartoons()

  return (
    <Section title='Популярные мультфильмы' movieCard carousel>
      {cartoons.map((cartoon: ICartoon) => (
        <Card entity={cartoon}></Card>
      ))}
    </Section>
  )
}
export default PopularCartoons
