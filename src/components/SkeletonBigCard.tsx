const SkeletonBigCard = () => {
  return (
    <div
      className='h-[300px] w-[100%] mx-auto relative px-10 bg-lightGrey animate-pulse'
      style={{
        boxSizing: 'border-box',
        display: 'block'
      }}
    >
      <div className='overlay-gradient'></div>
      <div className='absolute left-4 top-0 bottom-0 w-[200px] bg-lightGrey animate-pulse'></div>
      <div className='flex flex-col items-start justify-center pl-[200px] h-full gap-6'>
        <p className='text-xl bg-lightGrey animate-pulse w-1/6'></p>
        <p className='max-w-[80%] bg-lightGrey animate-pulse w-5/6'></p>
        <div className='px-3 py-1.5 rounded-md bg-lightGrey animate-pulse w-1/6'></div>
      </div>
    </div>
  )
}
export default SkeletonBigCard
