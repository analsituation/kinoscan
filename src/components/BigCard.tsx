import { FC } from 'react'
import Image from 'next/image'
import { IoPlayOutline } from 'react-icons/io5'

import { ITV } from '@/customTypes/TV'
import { IMovie } from '@/customTypes/movie'
import { ICartoon } from '@/customTypes/cartoon'

interface BigCardProps {
  entity: IMovie | ITV | ICartoon
}

const BigCard: FC<BigCardProps> = ({ entity }) => {
  console.log(entity)
  const name = entity.name || entity.alternativeName || entity.enName
  const description = entity.description || 'No description...'
  const poster = entity.poster.previewUrl || entity.poster.url || './ks-stub.svg'

  return (
    <div
      className='h-[300px] w-[100%] mx-auto relative px-10'
      style={{
        boxSizing: 'border-box',
        display: 'block'
      }}
    >
      <div className='overlay-gradient'></div>
      <div className='absolute left-0 top-0 bottom-0 w-[200px]'>
        <Image src={poster} alt={name} layout='fill' />
      </div>
      <div className='flex flex-col items-start justify-center pl-[200px] h-full gap-6'>
        <p className='text-xl'>{name}</p>
        <p className='text-sm max-w-[80%] line-clamp-5'>{description}</p>
        <button className='px-3 py-1.5 flex items-center gap-3 bg-accent rounded-md text-lightGrey opacity-80 hover:opacity-95'>
          <IoPlayOutline size={18} className='-mt-[2px]' />
          <span>Play</span>
        </button>
      </div>
    </div>
  )
}
export default BigCard
