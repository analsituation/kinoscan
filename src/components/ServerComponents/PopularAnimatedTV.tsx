import { redirect } from 'next/navigation'

import Section from '../Section'
import BigCard from '../BigCard'
import RefreshPageComponent from '../UI/RefreshPage'
import { ITV, unwantedStatusCodes } from '@/customTypes'
import { dataFetch } from '@/api/api'

const PopularAnimatedTV = async () => {
  const tvSeries: ITV[] | unwantedStatusCodes = await dataFetch('?type=animated-series&sortField=votes.kp&sortType=-1')

  if (tvSeries === 403) {
    redirect('/api-info')
  }

  if (tvSeries === 524) {
    return <RefreshPageComponent />
  }

  return (
    <Section title='Популярные мультсериалы' carousel>
      {tvSeries.map((tv: ITV) => (
        <BigCard entity={tv}></BigCard>
      ))}
    </Section>
  )
}
export default PopularAnimatedTV
