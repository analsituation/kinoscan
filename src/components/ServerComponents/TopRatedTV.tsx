import { redirect } from 'next/navigation'

import Section from '../Section'
import Card from '../Card'
import RefreshPageComponent from '../UI/RefreshPage'
import { ITV, unwantedStatusCodes } from '@/customTypes'
import { dataFetch } from '@/api/api'

const TopRatedTV = async () => {
  const tvs: ITV[] | unwantedStatusCodes = await dataFetch(
    '?type=tv-series&sortField=rating.kp&sortType=-1&externalId.kpHD=!null'
  )

  if (tvs === 403) {
    redirect('/api-info')
  }

  if (tvs === 524) {
    return <RefreshPageComponent />
  }

  return (
    <Section title='Сериалы с наивысшим рейтингом' movieCard carousel>
      {tvs.map((tv: ITV) => (
        <Card entity={tv}></Card>
      ))}
    </Section>
  )
}
export default TopRatedTV
