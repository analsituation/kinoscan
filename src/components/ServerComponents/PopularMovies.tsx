import { redirect } from 'next/navigation'

import Section from '../Section'
import Card from '../Card'
import RefreshPageComponent from '../UI/RefreshPage'
import { IMovie, unwantedStatusCodes } from '@/customTypes'
import { dataFetch } from '@/api/api'

const PopularMovies = async () => {
  const movies: IMovie[] | unwantedStatusCodes = await dataFetch('?type=movie&sortField=votes.kp&sortType=-1')

  if (movies === 403) {
    redirect('/api-info')
  }

  if (movies === 524) {
    return <RefreshPageComponent />
  }

  return (
    <Section title='Популярные фильмы' movieCard carousel>
      {movies.map((film: IMovie) => (
        <Card key={film.id} entity={film}></Card>
      ))}
    </Section>
  )
}
export default PopularMovies
