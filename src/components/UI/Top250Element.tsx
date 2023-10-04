import clsx from 'clsx'

clsx
const Top250Element = ({ position, inCard = false }: { position: number; inCard?: boolean }) => {
  return (
    <div
      className={clsx(
        'absolute right-10 text-center tracking-widest font-semibold sm:hidden',
        !inCard && 'top-[50px]',
        inCard && 'top-0 mt-6'
      )}
    >
      <span className='text-xl text-transparent bg-clip-text bg-gradient-to-tl from-gold to-secondGold'>ТОП250</span>
      <br />
      <span className='text-lg font-medium tracking-normal text-transparent bg-clip-text bg-gradient-to-tl from-gold to-secondGold'>
        {position} место
      </span>
    </div>
  )
}
export default Top250Element
