import Image from 'next/image'
import Link from 'next/link'

import { IMovieShort } from '@/customTypes/movie'
import { IPerson } from '@/customTypes/person'

interface CardProps {
  entity: IMovieShort | IPerson
}

const Card = ({ entity }: CardProps) => {
  let name
  let photo

  if ('profession' in entity) {
    name = entity.name || entity.enName
    photo = entity.photo || '/ks-stub.svg'
  } else {
    name = entity.name || entity.alternativeName || entity.enName
    photo = entity.poster.previewUrl || '/ks-stub.svg'
  }

  return (
    <Link href={`/movies/${entity.id}`}>
      <div className='cursor-pointer flex flex-col justify-start h-full mx-4 mb-3'>
        <div className='h-[240px] w-[160px] mx-auto relative rounded-lg overflow-hidden'>
          <Image className='shadow-inner rounded-lg' src={photo} alt={name} layout='fill' />
        </div>
        <p className='py-1.5 w-[160px] line-clamp-2 mx-auto'>{name}</p>
      </div>
    </Link>
  )
}
export default Card
