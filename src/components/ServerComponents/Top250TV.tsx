import { redirect } from 'next/navigation'

import Section from '../Section'
import BigCard from '../BigCard'
import RefreshPageComponent from '../UI/RefreshPage'
import { ITV, unwantedStatusCodes } from '@/customTypes'

const getRandomTop250TV = async () => {
  // По необъяснимой причине на запрос по многим позициям выше тридцатой
  // сервер отдает пустой массив. В связи с этим рандом определяется только
  // из первых 30 чисел и на всякий случай предусмотрена заглушка в виде возврата
  // 524 вместо данных и была возможность перезагрузить компонент,
  // на случай если все-таки пришел пустой массив
  const number = Math.floor(Math.random() * (30 - 1) + 1)
  try {
    const url = process.env.API_URL! + `?isSeries=true&top250=${number}`
    const api_key = process.env.API_KEY!
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-API-KEY': api_key
      },
      next: {
        revalidate: 60
      },
      signal: AbortSignal.timeout(10000)
    })

    if (response.status === 403) {
      return 403
    }

    if (!response.ok) {
      throw new Error('Ошибка HTTP ' + response.ok)
    }

    if (response.ok) {
      const data = await response.json()
      // Заглушка на случай если с сервера пришли неверные данные
      if (data.docs.length === 0) return 524
      return {
        number,
        data: data.docs[0]
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'TimeoutError' || error.name === 'AbortError') {
        return 524
      }
    }
  }
}

// number возвращается для того чтобы передать в карточку и отрисовать позицию,
// поскольку в API не предусмотрен возврат соответствующего поля при поиске
type dataFromServerType = {
  number: number
  data: ITV
}

const RandomTop250TV = async () => {
  const TV: dataFromServerType | unwantedStatusCodes | undefined = await getRandomTop250TV()

  if (TV === 403) {
    redirect('/api-info')
  }

  if (TV === 524) {
    return <RefreshPageComponent />
  }

  if (!TV) return null

  return (
    <Section title={`Случайный сериал из Топ250`} carousel={false}>
      <BigCard position={TV.number} entity={TV.data}></BigCard>
    </Section>
  )
}
export default RandomTop250TV
