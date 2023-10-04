'use client'

import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

import Section from '@/components/Section'
import Card from '@/components/Card'
import RefreshPageComponent from '@/components/UI/RefreshPage'
import { IMovie, IMovieShort } from '@/customTypes'
import { searchFilms } from '@/api/api'

const SearchPage: FC = () => {
  const initialState = {
    data: [],
    total: NaN
  }

  const [searchResult, setSearchResult] = useState<{ data: IMovie[]; total: number }>(initialState)

  const searchParams = useSearchParams()
  const router = useRouter()

  const query = searchParams.get('query')

  const fetchSearch = () => {
    if (query)
      searchFilms(query).then(data => {
        if (data) {
          switch (data) {
            case 403:
              router.push('/api-info')
              break
            case 524:
              return <RefreshPageComponent />
            default:
              setSearchResult(data)
              break
          }
        }
      })
  }

  useEffect(() => {
    if (query?.trim()) {
      searchFilms(query).then(data => {
        fetchSearch()
      })
    }
  }, [query])

  if (!query) {
    redirect('/')
  }

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
          {!!searchResult.total &&
            searchResult.data.map((movie: IMovieShort) => <Card key={movie.id} entity={movie}></Card>)}
        </div>
      </Section>
    </>
  )
}
export default SearchPage
