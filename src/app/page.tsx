import InTheaters from '@/components/ServerComponents/InTheaters'
import PopularCartoons from '@/components/ServerComponents/PopularCartoons'
import PopularFromGenre from '@/components/ServerComponents/PopularFromGenre'
import PopularMovies from '@/components/ServerComponents/PopularMovies'
import PopularTV from '@/components/ServerComponents/PopularTV'
import RandomTop250 from '@/components/ServerComponents/Top250Movie'
import RandomTop250TV from '@/components/ServerComponents/Top250TV'

export default function Home() {
  return (
    <>
      <div className='h-[120px] left-0 right-0 top-0 bg-lightGrey'></div>
      <InTheaters />
      <PopularMovies />
      <PopularTV />
      <PopularCartoons />
      <PopularFromGenre />
      {/* <RandomTop250 />
      <RandomTop250TV /> */}
    </>
  )
}
