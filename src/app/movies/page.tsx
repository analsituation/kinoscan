import PopularMovies from '@/components/ServerComponents/PopularMovies'
import RandomTop250 from '@/components/ServerComponents/Top250Movie'
import TopRatedMovies from '@/components/ServerComponents/TopRatedMovies'

const MoviesPage = () => {
  return (
    <>
      <div className='h-[120px] left-0 right-0 top-0 bg-lightGrey'></div>
      <RandomTop250 />
      <PopularMovies />
      <TopRatedMovies />
    </>
  )
}
export default MoviesPage
