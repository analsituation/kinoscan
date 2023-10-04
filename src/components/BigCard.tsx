import Image from 'next/image'
import Link from 'next/link'
import { RiArrowRightSLine } from 'react-icons/ri'

import { ITV } from '@/customTypes/TV'
import { IMovie } from '@/customTypes/movie'
import { ICartoon } from '@/customTypes/cartoon'
import { placeholderImg } from '@/utils/base64Img'
import Top250Element from './UI/Top250Element'

interface BigCardProps {
  entity: IMovie | ITV | ICartoon
  position?: number
}

const BigCard = ({ entity, position }: BigCardProps) => {
  let name
  let description
  let photo

  if (entity) {
    name = entity.name || entity.alternativeName || entity.enName
    description = entity.description || 'No description...'
    photo = entity.poster?.previewUrl || '/ks-stub.svg'
  }

  const top250RenderCondition = entity.top250 || position

  return (
    <div className='h-[300px] w-[100%] mx-auto relative px-10 sm:px-2'>
      <div className='overlay-gradient'></div>
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
      <div className='flex flex-col items-start justify-start pl-[200px] pt-6 pb-6 h-full gap-3'>
        <div>
          <div className='text-2xl sm:line-clamp-2'>
            <Link prefetch={false} href={`/${entity?.type}/${entity?.id}`}>
              {name}
            </Link>
          </div>
          {/* Вывод даты выхода для одиночных фильмов */}
          {!entity.isSeries && !!entity.year && <p className='text-sm'>{entity.year}</p>}
          {/* Вывод даты в формате "начало - конец" для объектов с признаком "isSeries" */}
          {!!entity.isSeries && !!entity.releaseYears && (
            <p className='text-sm'>
              {entity.releaseYears[0].start} - {entity.releaseYears[0].end}
            </p>
          )}
        </div>
        <p className='text-sm max-w-[80%] md:max-w-full line-clamp-[7]'>{description}</p>
        <Link
          prefetch={false}
          draggable={false}
          href={`/${entity?.type}/${entity?.id}`}
          className='text-dark text-xl hover:text-accent transition-all border-b-solid  border-black flex gap-1 items-center'
        >
          <span>Перейти на страницу</span>
          <RiArrowRightSLine size={20} className='mt-1.5' />
        </Link>
      </div>
      {!!top250RenderCondition && <Top250Element inCard={true} position={top250RenderCondition} />}
    </div>
  )
}
export default BigCard
