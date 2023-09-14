import Image from 'next/image'
import { FC } from 'react'

import { IFilm } from '@/customTypes/Movie'

interface CardProps {
  film: IFilm
}

const Card: FC<CardProps> = ({ film }) => {
  return (
    <div className='cursor-pointer'>
      <div className='h-[240px] w-[160px] mx-auto relative rounded-lg overflow-hidden'>
        <Image className='shadow-inner rounded-lg' src={film.poster.previewUrl} alt={film.name} layout='fill' />
      </div>
      <p className='py-1.5 w-[160px] line-clamp-3 mx-auto'>{film.name}</p>
    </div>
  )
}
export default Card
