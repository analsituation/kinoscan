import { redirect } from 'next/navigation'

import Section from '../Section'
import Card from '../Card'
import RefreshPageComponent from '../UI/RefreshPage'
import { IMovie, unwantedStatusCodes } from '@/customTypes'
import { dataFetch } from '@/api/api'

const TopRatedMovies = async () => {
  const movies: IMovie[] | unwantedStatusCodes = await dataFetch(
    '?type=movie&sortField=rating.kp&sortType=-1&externalId.imdb=!null'
  )

  if (movies === 403) {
    redirect('/api-info')
  }

  if (movies === 524) {
    return <RefreshPageComponent />
  }

  return (
    <Section title='Фильмы с наивысшим рейтингом' movieCard carousel>
      {movies.map((film: IMovie) => (
        <Card entity={film}></Card>
      ))}
    </Section>
  )
}
export default TopRatedMovies
