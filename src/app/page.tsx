import InTheaters from '@/components/ServerComponents/InTheaters'
import PopularCartoons from '@/components/ServerComponents/PopularCartoons'
import PopularFromGenre from '@/components/ServerComponents/PopularFromGenre'
import PopularMovies from '@/components/ServerComponents/PopularMovies'
import PopularTV from '@/components/ServerComponents/PopularTV'

export default function Home() {
  return (
    <main>
      <div className='h-[120px] left-0 right-0 top-0 bg-lightGrey'></div>
      <InTheaters />
      <PopularMovies />
      <PopularTV />
      <PopularCartoons />
      <PopularFromGenre />
    </main>
  )
}
