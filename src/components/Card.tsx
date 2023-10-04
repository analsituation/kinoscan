import Image from 'next/image'
import Link from 'next/link'

import { IMovie, IMovieShort } from '@/customTypes/movie'
import { IPerson } from '@/customTypes/person'
import { ITV } from '@/customTypes/TV'
import { placeholderImg } from '@/utils/base64Img'
import { ICartoon } from '@/customTypes/cartoon'

interface CardProps {
  entity: IMovie | IMovieShort | ITV | ICartoon | IPerson
}

const Card = ({ entity }: CardProps) => {
  let name
  let photo

  if ('profession' in entity) {
    name = entity.name || entity.enName
    photo = entity.photo || '/ks-stub.svg'
  } else {
    name = entity.name || entity.alternativeName || entity.enName
    photo = entity?.poster?.previewUrl || '/ks-stub.svg'
  }

  return (
    <>
      {'profession' in entity ? (
        <div draggable={false} className='cursor-pointer flex flex-col justify-start h-full mx-4 my-2'>
          <div className='h-[240px] w-[160px] mx-auto relative rounded-lg overflow-hidden'>
            <Image
              placeholder={placeholderImg}
              draggable={false}
              className='shadow-inner rounded-lg'
              src={photo}
              alt={name}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <p className='py-1.5 w-[160px] line-clamp-2 mx-auto'>{name}</p>
        </div>
      ) : (
        <Link
          prefetch={false}
          draggable={false}
          href={`/${entity.type === 'animated-series' ? 'tv-series' : entity.type}/${entity.id}`}
        >
          <div className='cursor-pointer flex flex-col mx-4 my-2'>
            <div className='h-[240px] w-[160px] mx-auto relative rounded-lg overflow-hidden'>
              <Image
                placeholder={placeholderImg}
                draggable={false}
                className='shadow-inner rounded-lg'
                src={photo}
                alt={name}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <p className='py-1.5 w-[160px] mx-auto line-clamp-2 min-h-[60px]'>{name}</p>
          </div>
        </Link>
      )}
    </>
  )
}
export default Card
