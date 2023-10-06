import clsx from 'clsx'

clsx
const Top250Element = ({ position, inCard = false }: { position: number; inCard?: boolean }) => {
  return (
    <div
      className={clsx(
        'absolute right-10 md:right-2 text-center tracking-widest font-semibold',
        !inCard && 'top-[50px] md:top-[150px] right-0',
        inCard && 'top-0 mt-6 md:mt-2'
      )}
    >
      <span className='text-xl sm:text-base text-transparent bg-clip-text bg-gradient-to-tl from-gold to-secondGold'>
        ТОП250
      </span>
      <br />
      <span className='text-lg sm:text-sm font-medium tracking-normal text-transparent bg-clip-text bg-gradient-to-tl from-gold to-secondGold'>
        {position} место
      </span>
    </div>
  )
}
export default Top250Element
