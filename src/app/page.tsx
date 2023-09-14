import InTheaters from '@/components/ServerComponents/InTheaters'
import PopularMovies from '@/components/ServerComponents/PopularMovies'
import TopRatedMovies from '@/components/ServerComponents/TopRatedMovies'

export default function Home() {
  return (
    <main>
      <div className='h-[120px] left-0 right-0 top-0 bg-lightGrey'></div>
      <InTheaters />
      <PopularMovies />
      <TopRatedMovies />
    </main>
  )
}
