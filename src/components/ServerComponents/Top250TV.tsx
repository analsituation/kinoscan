import Section from '../Section'
import BigCard from '../BigCard'

const getRandomTop250TV = async () => {
  const number = Math.floor(Math.random() * (250 - 1) + 1)
  try {
    const url = process.env.API_URL! + `?isSeries=true&top250=${number}`
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
    return data.docs[0]
  } catch (error) {
    console.error('Ошибка:', error)
  }
}

const RandomTop250TV = async () => {
  const TV = await getRandomTop250TV()

  return (
    <Section title={`Случайный сериал из Топ250`} carousel={false}>
      <BigCard entity={TV}></BigCard>
    </Section>
  )
}
export default RandomTop250TV
