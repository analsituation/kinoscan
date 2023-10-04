import SkeletonCard from '@/components/SkeletonCard'
import Section from '@/components/Section'
import SkeletonBigCard from '@/components/SkeletonBigCard'

const loading = () => {
  return (
    <>
      <Section title='' skeleton>
        <div className='overflow-hidden flex items-center gap-3 h-[300px] mb-3'>
          <SkeletonBigCard />
        </div>
      </Section>

      <Section title='' skeleton>
        <div className='overflow-hidden flex items-center gap-3 h-[300px] mb-3'>
          {[...new Array(6)].map((film, ind) => (
            <div key={ind} className='min-w-[400px] h-[300px] bg-lightGrey animate-pulse'></div>
          ))}
        </div>
      </Section>

      <Section title='' skeleton>
        <div className='overflow-hidden flex items-center gap-3 h-[300px] mb-3'>
          {[...new Array(6)].map((film, ind) => (
            <SkeletonCard key={ind}></SkeletonCard>
          ))}
        </div>
      </Section>
    </>
  )
}
export default loading
