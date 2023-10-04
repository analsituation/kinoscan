import { redirect } from 'next/navigation'

import Section from '../Section'
import BigCard from '../BigCard'
import RefreshPageComponent from '../UI/RefreshPage'
import { IMovie, unwantedStatusCodes } from '@/customTypes'
import { dataFetch } from '@/api/api'

const InTheaters = async () => {
  const movies: IMovie[] | unwantedStatusCodes = await dataFetch('?ticketsOnSale=true')

  if (movies === 403) {
    redirect('/api-info')
  }

  if (movies === 524) {
    return <RefreshPageComponent />
  }

  return (
    <Section title='В прокате' carousel>
      {movies.map((movie: IMovie) => (
        <BigCard entity={movie}></BigCard>
      ))}
    </Section>
  )
}
export default InTheaters
