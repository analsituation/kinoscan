'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import { GoSearch } from 'react-icons/go'

import { searchFilms } from '@/api/api'
import { useDebounce } from '@/hooks/debounce'

import { IMovie } from '@/customTypes/movie'
import Link from 'next/link'

const Search: FC = () => {
  const [isFocused, setIsFocused] = useState(false)
  const [dropdown, setDropdown] = useState(false)

  const router = useRouter()

  const [query, setQuery] = useState('')
  const [searchResult, setSearchResult] = useState<IMovie[]>([])

  const debounced = useDebounce<string>(query, 400)

  useEffect(() => {
    if (debounced.length >= 3) {
      setDropdown(true)
      searchFilms(query).then(setSearchResult)
    } else {
      setDropdown(false)
    }
  }, [debounced])

  const searchHandler = () => {
    if (query.length) {
      setQuery('')
      router.push(`/search?query=${query}`)
    }
  }

  return (
    <>
      <div className='flex items-center relative min-w-[350px] sm:min-w-[150px] z-2'>
        <input
          onFocus={() => setIsFocused(true)}
          // KocTbIJIb
          onBlur={() => {
            setTimeout(() => setIsFocused(false), 100)
          }}
          className='outline-0 bg-darkGrey px-3 py-1 rounded-sm w-full'
          type='text'
          placeholder='Search'
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <GoSearch onClick={searchHandler} className='text-white ml-2' />

        {dropdown && isFocused && (
          <div className='absolute top-10 left-0 right-0 rounded-md overflow-hidden bg-darkGrey shadow-lg z-2'>
            {searchResult.slice(0, 5).map(movie => (
              <Link href={`/movies/${movie.id}`} key={movie.id} onClick={() => setQuery('')}>
                <div className='flex items-center px-3 py-1.5 cursor-pointer'>
                  <div className='bg-accent min-w-[68px] h-[102px] rounded-sm'>
                    <Image
                      width={68}
                      height={102}
                      src={movie.poster?.previewUrl || '/ks-stub.svg'}
                      alt={movie.name || movie.alternativeName || movie.enName}
                      className='w-full h-full'
                    />
                  </div>
                  <div className='px-3'>
                    <p className='text-base line-clamp-3 mb-2'>{movie.name || movie.alternativeName || movie.enName}</p>
                    <ul className='flex flex-wrap gap-x-3 text-xs'>
                      {movie.genres.map(genre => (
                        <li
                          className='px-2 leading-6 mb-2 opacity-70 bg-accent rounded-md hover:opacity-90'
                          key={genre.name}
                        >
                          {genre.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Link>
            ))}

            {searchResult.length > 5 && (
              <button onClick={searchHandler} className='px-3 py-1.5 bg-accent w-full'>
                More results
              </button>
            )}
          </div>
        )}
      </div>
    </>
  )
}
export default Search
