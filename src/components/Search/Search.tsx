'use client'

import { FC, Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import Image from 'next/image'
import { GoSearch } from 'react-icons/go'

import { searchFilms } from '@/api/api'
import { useDebounce } from '@/hooks/debounce'

import { IMovie } from '@/customTypes/movie'

const Search: FC = () => {
  const [isFocused, setIsFocused] = useState(false)
  const [dropdown, setDropdown] = useState(false)

  const router = useRouter()

  const [query, setQuery] = useState('')
  const [searchResult, setSearchResult] = useState<IMovie[] | string>([])

  const debounced = useDebounce<string>(query, 400)

  useEffect(() => {
    if (debounced.length >= 3) {
      setDropdown(true)
      searchFilms(query).then(data => {
        if (!data) {
          router.push('/api-info')
          setDropdown(false)
        } else {
          setSearchResult(data)
        }
      })
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
            <div className='relative pb-9'>
              {/* Search result */}
              <div className='overflow-y-scroll max-h-[500px] scrollbar scrollbar-thumb-accent scrollbar-track-lightGrey'>
                {Array.isArray(searchResult) &&
                  searchResult.slice(0, 5).map(movie => (
                    <Link href={`/${movie.type}/${movie.id}`} key={movie.id} onClick={() => setQuery('')}>
                      <div className='flex items-start gap-3 px-2 py-3 cursor-pointer'>
                        <div className='relative min-w-[80px] h-[120px] rounded-sm'>
                          <div className='bg-lightGrey animate-pulse absolute top-0 left-0 right-0 bottom-0 z-0'></div>
                          <Image
                            width={80}
                            height={120}
                            src={movie.poster?.previewUrl || '/ks-stub.svg'}
                            alt={movie.name || movie.alternativeName || movie.enName}
                            className='w-full h-full relative z-1'
                          />
                        </div>
                        <div>
                          <p className='text-base line-clamp-2 mb-2'>
                            {movie.name || movie.alternativeName || movie.enName}
                          </p>
                          <ul className='flex flex-wrap gap-x-2 text-xs'>
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
              </div>

              {searchResult.length > 5 && (
                <button onClick={searchHandler} className='px-3 py-1.5 bg-accent absolute bottom-0 left-0 right-0'>
                  More results
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
export default Search
