import Image from 'next/image'
import Link from 'next/link'
import { IoPlayOutline } from 'react-icons/io5'

import { ITV } from '@/customTypes/TV'
import { IMovie } from '@/customTypes/movie'
import { ICartoon } from '@/customTypes/cartoon'
import { placeholderImg } from '@/utils/base64Img'

interface BigCardProps {
  entity: IMovie | ITV | ICartoon
}

const BigCard = ({ entity }: BigCardProps) => {
  let name
  let description
  let photo

  if (entity) {
    name = entity.name || entity.alternativeName || entity.enName
    description = entity.description || 'No description...'
    photo = entity.poster?.previewUrl || '/ks-stub.svg'
  }

  return (
    <div className='h-[300px] w-[100%] mx-auto relative px-10 sm:px-2'>
      <div className='overlay-gradient'></div>
      <Link draggable={false} href={`/${entity?.type}/${entity?.id}`}>
        <div className='absolute left-4 top-0 bottom-0 w-[200px] sm:w-[180px]'>
          <Image
            placeholder={placeholderImg}
            draggable={false}
            src={photo!}
            alt={name!}
            fill
            style={{ objectFit: 'cover' }}
            className='rounded-l-md'
          />
        </div>
        <div className='flex flex-col items-start justify-center pl-[200px] h-full gap-3'>
          <p className='text-xl sm:line-clamp-2'>{name}</p>
          <p className='text-sm max-w-[80%] sm:w-[100%] line-clamp-[8]'>{description}</p>
          <button className='px-3 py-1.5 flex items-center gap-3 bg-accent rounded-md text-lightGrey opacity-80 hover:opacity-95'>
            <IoPlayOutline size={18} className='-mt-[2px]' />
            <span>Play</span>
          </button>
        </div>
      </Link>
    </div>
  )
}
export default BigCard
