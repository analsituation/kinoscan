import clsx from 'clsx'

import SkeletonCard from '@/components/SkeletonCard'
import Section from '@/components/Section'

const loading = () => {
  return (
    <>
      <div className='h-[420px] sm:h-[250px] left-0 right-0 top-0 relative z-[-1] overflow-hidden'>
        <div className='w-full h-full mx-auto relative bg-superlight'></div>
      </div>

      <Section title={false} skeleton className='-mt-[150px] sm:-mt-[250px] relative z-1 sm:block'>
        <div className='flex items-start gap-4 relative'>
          <div className='bg-lightGrey animate-pulse min-w-[200px] h-[300px]'></div>
          <div className='px-3 flex flex-col items-start gap-5 mt-10 sm:mt-5 w-full'>
            <p className='text-3xl bg-lightGrey animate-pulse rounded-sm w-1/3 h-9'></p>
            <ul className='flex items-center gap-3 flex-wrap w-[2/6]'>
              {[...new Array(3)].map((genre, ind) => (
                <li key={ind} className='px-3 py-1.5 bg-lightGrey animate-pulse rounded-sm w-[70px] h-8'></li>
              ))}
            </ul>
            <p className='text-3xl bg-lightGrey animate-pulse rounded-sm w-1/6 h-6'></p>
            <p className='text-3xl bg-lightGrey animate-pulse rounded-sm w-1/6 h-6'></p>
            <p className='text-3xl bg-lightGrey animate-pulse rounded-sm w-1/6 h-6'></p>
          </div>
        </div>
        <div className='mt-5 opacity-[0.9] bg-lightGrey animate-pulse w-full h-32'></div>
      </Section>

      <Section title='' skeleton>
        <div className='overflow-hidden flex items-center gap-3 h-[300px] mb-3'>
          {[...new Array(6)].map((actor, ind) => (
            <SkeletonCard key={ind}></SkeletonCard>
          ))}
        </div>
      </Section>

      <Section title='' skeleton>
        {[...new Array(3)].map((season, ind) => (
          <div
            key={ind}
            className={clsx('h-[48px] flex gap-[140px] bg-lightGrey animate-pulse', ind % 2 === 1 && 'bg-white')}
          >
            <span className='w-[100px] inline-block'></span>
            <span className='inline-block'></span>
          </div>
        ))}
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
