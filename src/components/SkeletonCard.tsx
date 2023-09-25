const SkeletonCard = () => {
  return (
    <>
      <div draggable={false} className='cursor-pointer flex flex-col justify-start h-full mx-4 my-2'>
        <div className='h-[240px] w-[160px] mx-auto relative rounded-lg overflow-hidden bg-lightGrey animate-pulse'></div>
        <p className='py-1.5 mt-2 bg-lightGrey rounded-md animate-pulse w-full h-5'></p>
      </div>
    </>
  )
}
export default SkeletonCard
