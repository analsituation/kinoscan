import Image from 'next/image'
import { FC } from 'react'

import { IMovie } from '@/customTypes/movie'
import { ITV } from '@/customTypes/TV'
import { ICartoon } from '@/customTypes/cartoon'
import { IPerson } from '@/customTypes/person'

interface CardProps {
  entity: IMovie | ITV | ICartoon | IPerson
}

const Card: FC<CardProps> = ({ entity }) => {
  let name
  let photo

  if ('profession' in entity) {
    name = entity.name || entity.enName
    photo = entity.photo || './ks-stub.svg'
  } else {
    name = entity.name || entity.alternativeName || entity.enName
    photo = entity.poster.previewUrl || entity.poster.url || './ks-stub.svg'
  }

  return (
    <div className='cursor-pointer'>
      <div className='h-[240px] w-[160px] mx-auto relative rounded-lg overflow-hidden'>
        <Image className='shadow-inner rounded-lg' src={photo} alt={name} layout='fill' />
      </div>
      <p className='py-1.5 w-[160px] line-clamp-3 mx-auto'>{name}</p>
    </div>
  )
}
export default Card
