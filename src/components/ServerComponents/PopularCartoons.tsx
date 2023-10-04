import { redirect } from 'next/navigation'

import Section from '../Section'
import Card from '../Card'
import RefreshPageComponent from '../UI/RefreshPage'
import { ICartoon, unwantedStatusCodes } from '@/customTypes'
import { dataFetch } from '@/api/api'

const PopularCartoons = async () => {
  const cartoons: ICartoon[] | unwantedStatusCodes = await dataFetch('?type=cartoon&sortField=votes.kp&sortType=-1')

  if (cartoons === 403) {
    redirect('/api-info')
  }

  if (cartoons === 524) {
    return <></>
    // return <RefreshPageComponent />
  }

  return (
    <Section title='Популярные мультфильмы' movieCard carousel>
      {cartoons.map((cartoon: ICartoon) => (
        <Card entity={cartoon}></Card>
      ))}
    </Section>
  )
}
export default PopularCartoons
