import InTheaters from '@/components/ServerComponents/InTheaters'
import PopularCartoons from '@/components/ServerComponents/PopularCartoons'
import PopularFromGenre from '@/components/ServerComponents/PopularFromGenre'
import PopularMovies from '@/components/ServerComponents/PopularMovies'
import PopularTV from '@/components/ServerComponents/PopularTV'

export default function Home() {
  return (
    <>
      <InTheaters />
      <PopularMovies />
      <PopularTV />
      <PopularCartoons />
      <PopularFromGenre />
    </>
  )
}
