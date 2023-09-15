import Image from 'next/image'
import { FC } from 'react'

import { IMovie } from '@/customTypes/movie'
import { ITV } from '@/customTypes/TV'
import { ICartoon } from '@/customTypes/cartoon'

interface CardProps {
  entity: IMovie | ITV | ICartoon
}

const Card: FC<CardProps> = ({ entity }) => {
  const name = entity.name || entity.alternativeName || entity.enName
  const poster = entity.poster.url || entity.poster.previewUrl || './ks-stub.svg'

  return (
    <div className='cursor-pointer'>
      <div className='h-[240px] w-[160px] mx-auto relative rounded-lg overflow-hidden'>
        <Image className='shadow-inner rounded-lg' src={poster} alt={name} layout='fill' />
      </div>
      <p className='py-1.5 w-[160px] line-clamp-3 mx-auto'>{name}</p>
    </div>
  )
}
export default Card
