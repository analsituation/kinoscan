'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

import { searchFilms } from '@/api/api'
import Section from '@/components/Section'
import Card from '@/components/Card'
import { IMovieShort } from '@/customTypes'

const SearchPage: FC = () => {
  const [searchResult, setSearchResult] = useState<IMovieShort[]>([])

  const searchParams = useSearchParams()
  const router = useRouter()

  const query = searchParams.get('query')

  useEffect(() => {
    if (query?.trim()) {
      searchFilms(query).then(data => {
        if (!data) {
          router.push('/api-info')
        } else {
          setSearchResult(data)
        }
      })
    }
  }, [query])

  return (
    <>
      <Section title={`Результаты поиска по запросу «${query}»`} className='mt-8'>
        <div
          className='grid'
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            justifyItems: 'start'
          }}
        >
          {searchResult && searchResult.map((movie: IMovieShort) => <Card key={movie.id} entity={movie}></Card>)}
        </div>
      </Section>
    </>
  )
}
export default SearchPage
