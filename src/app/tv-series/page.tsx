import PopularTV from '@/components/ServerComponents/PopularTV'
import RandomTop250TV from '@/components/ServerComponents/Top250TV'
import TopRatedTV from '@/components/ServerComponents/TopRatedTV'

const TVPage = () => {
  return (
    <>
      <RandomTop250TV />
      <PopularTV />
      <TopRatedTV />
    </>
  )
}
export default TVPage
