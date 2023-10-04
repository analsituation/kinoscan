'use client'
import { FC } from 'react'
import { useRouter } from 'next/navigation'

import Container from '../Container'

const RefreshPageComponent: FC = () => {
  const router = useRouter()
  const handleRefresh = () => {
    router.refresh()
  }

  return (
    <Container className='text-center text-lg mt-10'>
      <div>Превышено время ожидания ответа от сервера</div>
      <button onClick={() => window.location.reload()} className='px-5 py-1.5 bg-accent text-white rounded-md mt-4'>
        Перезагрузить
      </button>
    </Container>
  )
}
export default RefreshPageComponent
