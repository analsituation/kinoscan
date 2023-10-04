'use client'

import { FC, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { GoSearch } from 'react-icons/go'

import { searchFilms } from '@/api/api'
import { useDebounce } from '@/hooks/debounce'
import { IMovie } from '@/customTypes'

const Search: FC = () => {
  const initialState = {
    data: [],
    total: NaN
  }

  const [dropdownOpened, setDropdownOpened] = useState(false)
  const [query, setQuery] = useState('')
  const [timeout, setTimeout] = useState(false)
  const [searchResult, setSearchResult] = useState<{ data: IMovie[]; total: number }>(initialState)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const router = useRouter()

  const debounced = useDebounce<string>(query, 200)

  const fetchSearch = () => {
    searchFilms(query).then(data => {
      if (data) {
        switch (data) {
          case 403:
            router.push('/api-info')
            setDropdownOpened(false)
            break
          case 524:
            setTimeout(true)
            break
          default:
            setSearchResult(data)
            break
        }
      }
    })
  }

  useEffect(() => {
    if (debounced.length >= 3) {
      setDropdownOpened(true)
      fetchSearch()
    } else {
      setDropdownOpened(false)
    }
  }, [debounced])

  useEffect(() => {
    setSearchResult(initialState)
  }, [query])

  useEffect(() => {
    if (!dropdownOpened) return
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [dropdownOpened])

  const handleClick = (e: MouseEvent) => {
    if (e.target === inputRef.current) return
    if (!dropdownRef.current) return
    if (!dropdownRef.current.contains(e.target as Node)) {
      setDropdownOpened(false)
    }
  }

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
          ref={inputRef}
          onFocus={() => (query.length >= 3 ? setDropdownOpened(true) : {})}
          className='outline-0 bg-darkGrey px-3 py-1 rounded-sm w-full'
          type='text'
          placeholder='Search'
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <GoSearch onClick={searchHandler} className='text-white ml-2' />

        {!!dropdownOpened && (
          <div ref={dropdownRef} className='absolute top-10 left-0 right-0 rounded-md bg-darkGrey shadow-lg z-2'>
            {/* Вывод результатов поиска */}
            {!!searchResult.total && (
              <div className='relative'>
                <div className='overflow-y-scroll max-h-[500px] scrollbar scrollbar-thumb-accent scrollbar-track-darkGrey'>
                  {searchResult.data.slice(0, 5).map(movie => (
                    <Link
                      onClick={() => {
                        setDropdownOpened(false)
                        setQuery('')
                      }}
                      prefetch={false}
                      href={`/${movie.type}/${movie.id}`}
                      key={movie.id}
                    >
                      <div className='flex items-start gap-3 px-2 py-3 cursor-pointer'>
                        <div className='relative min-w-[80px] h-[120px] rounded-sm'>
                          <div className='bg-lightGrey animate-pulse absolute top-0 left-0 right-0 bottom-0 z-0'></div>
                          <Image
                            fill
                            style={{ objectFit: 'cover' }}
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

                {searchResult.total > 5 && (
                  <button
                    onClick={searchHandler}
                    className='px-3 py-1.5 bg-accent absolute -bottom-8 left-0 right-0 rounded-br-md rounded-bl-md'
                  >
                    More results
                  </button>
                )}
              </div>
            )}
            {/* если результатов нет, выводится сообщение, а если запрос превысил время ожидания,
            то выводится соответствующий контент */}
            {searchResult.total === 0 && (
              <div className='relative px-3 py-2'>Ничего не найдено по запросу "{query}"</div>
            )}
            {timeout && (
              <div className='px-3 py-2 pb-6 text-center'>
                <p>Превышено время ожидания от сервера</p>
                <button
                  onClick={() => {
                    setTimeout(false)
                    fetchSearch()
                  }}
                  className='px-3 py-1.5 bg-accent text-white rounded-md mt-4'
                >
                  Повторный поиск
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
export default Search
