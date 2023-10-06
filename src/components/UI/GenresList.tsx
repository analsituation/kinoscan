import { IAnime, ICartoon, IMovie, ITV } from '@/customTypes'
import clsx from 'clsx'

interface GenresListProps {
  object: IMovie | ITV | ICartoon | IAnime
  classname?: string
}

const GenresList = ({ object, classname }: GenresListProps) => {
  return (
    <ul className={clsx('flex items-center gap-3 flex-wrap', classname)}>
      {object.genres.map(genre => (
        <li
          key={genre.name}
          className='px-3 py-1.5 bg-primary cursor-pointer rounded-lg text-sm bg-lightGrey text-accent shadow-md hover:bg-accent hover:text-lightGrey transition-all'
        >
          {genre.name}
        </li>
      ))}
    </ul>
  )
}
export default GenresList
