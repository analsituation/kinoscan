import { redirect } from 'next/navigation'

import Section from '../Section'
import Card from '../Card'
import RefreshPageComponent from '../UI/RefreshPage'
import { ITV, unwantedStatusCodes } from '@/customTypes'
import { dataFetch } from '@/api/api'

const PopularTV = async () => {
  const tvSeries: ITV[] | unwantedStatusCodes = await dataFetch('?type=tv-series&sortField=votes.kp&sortType=-1')

  if (tvSeries === 403) {
    redirect('/api-info')
  }

  if (tvSeries === 524) {
    return <RefreshPageComponent />
  }

  return (
    <Section title='Популярные сериалы' movieCard carousel>
      {tvSeries.map((tv: ITV) => (
        <Card entity={tv}></Card>
      ))}
    </Section>
  )
}
export default PopularTV
