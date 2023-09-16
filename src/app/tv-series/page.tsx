import PopularTV from '@/components/ServerComponents/PopularTV'
import RandomTop250TV from '@/components/ServerComponents/Top250TV'
import TopRatedTV from '@/components/ServerComponents/TopRatedTV'

const TVPage = () => {
  return (
    <>
      <div className='h-[120px] left-0 right-0 top-0 bg-lightGrey'></div>
      <RandomTop250TV />
      <PopularTV />
      <TopRatedTV />
    </>
  )
}
export default TVPage
