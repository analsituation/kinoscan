import PopularMovies from '@/components/ServerComponents/PopularMovies'
import RandomTop250 from '@/components/ServerComponents/Top250Movie'
import TopRatedMovies from '@/components/ServerComponents/TopRatedMovies'

const MoviesPage = () => {
  return (
    <>
      <RandomTop250 />
      <PopularMovies />
      <TopRatedMovies />
    </>
  )
}
export default MoviesPage
