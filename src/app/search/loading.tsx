import SkeletonCard from '@/components/SkeletonCard'
import Section from '@/components/Section'
import { FC } from 'react'

const loading: FC = () => {
  return (
    <>
      <Section title='' skeleton>
        <div
          className='grid'
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            justifyItems: 'start'
          }}
        >
          {[...new Array(5)].map((result, ind) => (
            <SkeletonCard key={ind}></SkeletonCard>
          ))}
        </div>
      </Section>
    </>
  )
}
export default loading
