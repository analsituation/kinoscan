'use client'

import Image from 'next/image'
import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { GoSearch } from 'react-icons/go'

import { searchFilms } from '@/api/api'
import { useDebounce } from '@/hooks/debounce'

import { IFilm } from '@/customTypes/Movie'

const Search: FC = () => {
  const [isFocused, setIsFocused] = useState(false)
  const [dropdown, setDropdown] = useState(false)

  const [query, setQuery] = useState('')
  const [searchResult, setSearchResult] = useState<IFilm[]>([])

  const debounced = useDebounce<string>(query, 400)

  useEffect(() => {
    if (debounced.length >= 3) {
      setDropdown(true)
      searchFilms(query).then(setSearchResult)
    } else {
      setDropdown(false)
    }
  }, [debounced])

  return (
    <>
      <div className='flex items-center relative'>
        <input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className='outline-0 bg-darkGrey px-3 min-w-[300px] py-1 rounded-sm'
          type='text'
          placeholder='Search'
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <GoSearch className='text-white ml-2' />
        {dropdown && isFocused && (
          <div className='absolute top-10 left-0 right-0 rounded-md overflow-hidden bg-darkGrey shadow-lg'>
            {searchResult.slice(0, 5).map(film => (
              <div className='flex items-center px-3 py-1.5 cursor-pointer' key={film.id}>
                <div className='bg-accent min-w-[68px] h-[102px] rounded-sm'>
                  <Image
                    width={68}
                    height={102}
                    src={film.poster.previewUrl}
                    alt={film.name}
                    className='w-full h-full'
                  />
                </div>
                <div className='px-3'>
                  <p className='text-base mb-2'>{film.name}</p>
                  <ul className='flex flex-wrap gap-x-3 text-sm'>
                    {film.genres.map(genre => (
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
            ))}

            {searchResult.length > 5 && <button className='px-3 py-1.5 bg-accent w-full'>More results</button>}
          </div>
        )}
      </div>
    </>
  )
}
export default Search
