import SkeletonCard from '@/components/SkeletonCard'
import Section from '@/components/Section'
import { FC } from 'react'

const loading: FC = () => {
  return (
    <>
      <div className='h-[420px] sm:h-[250px] left-0 right-0 top-0 relative z-[-1] overflow-hidden'>
        <div className='backdrop-gradient'></div>
        <div className='w-[50%] h-full mx-auto relative'></div>
      </div>

      <Section
        title={false}
        skeleton
        className='-mt-[150px] sm:-mt-[250px] flex items-start gap-4 relative z-1 sm:block'
      >
        <div className='bg-lightGrey animate-pulse min-w-[200px] h-[300px]'></div>
        <div className='px-3 flex flex-col items-start gap-5 mt-10 sm:mt-5 w-full'>
          <p className='text-3xl bg-lightGrey animate-pulse rounded-sm w-1/3 h-5'></p>
          <ul className='flex items-center gap-3 flex-wrap w-2/6'>
            {[...new Array(3)].map((genre, ind) => (
              <li key={ind} className='px-3 py-1.5 bg-lightGrey animate-pulse rounded-sm w-1/6 h-5'></li>
            ))}
          </ul>
          <p className='opacity-[0.9] bg-lightGrey animate-pulse w-5/6 h-32'></p>
        </div>
      </Section>

      <Section title='' skeleton>
        <div className='overflow-hidden flex items-center gap-3 h-[300px] mb-3'>
          {[...new Array(6)].map((actor, ind) => (
            <SkeletonCard key={ind}></SkeletonCard>
          ))}
        </div>
      </Section>

      <Section title='' skeleton>
        <div className='overflow-hidden flex items-center gap-3 h-[300px] mb-3'>
          {[...new Array(4)].map((trailer, ind) => (
            <div key={ind} className='min-w-[400px] h-[300px] bg-lightGrey animate-pulse'></div>
          ))}
        </div>
      </Section>

      <Section title='' skeleton>
        <div className='overflow-hidden flex items-center gap-3 h-[300px] mb-3'>
          {[...new Array(6)].map((movie, ind) => (
            <SkeletonCard key={ind}></SkeletonCard>
          ))}
        </div>
      </Section>

      <Section title='' skeleton>
        <div className='overflow-hidden flex items-center gap-3 h-[300px] mb-3'>
          {[...new Array(6)].map((movie, ind) => (
            <SkeletonCard key={ind}></SkeletonCard>
          ))}
        </div>
      </Section>
    </>
  )
}
export default loading
