'use client'

import { useSearchParams } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import Section from '@/components/Section'
import { searchFilms } from '@/api/api'
import Card from '@/components/Card'
import { IMovieShort } from '@/customTypes/movie'

const SearchPage: FC = () => {
  const [searchResult, setSearchResult] = useState<IMovieShort[]>([])

  const searchParams = useSearchParams()
  const query = searchParams.get('query')

  useEffect(() => {
    if (query?.trim()) {
      searchFilms(query).then(setSearchResult)
    }
  }, [query])

  return (
    <>
      <div className='h-[120px] left-0 right-0 top-0 bg-lightGrey'></div>
      <Section>
        <div
          className='grid'
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
          }}
        >
          {searchResult && searchResult.map((movie: IMovieShort) => <Card key={movie.id} entity={movie}></Card>)}
        </div>
      </Section>
    </>
  )
}
export default SearchPage
