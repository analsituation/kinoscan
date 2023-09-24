import clsx from 'clsx'
import { FC, PropsWithChildren } from 'react'

interface Props {
  className?: string
}

const ScrollbarProvider: FC<PropsWithChildren<Props>> = ({ children, className }) => {
  return (
    <div className='overflow-auto overflow-y-hidden scrollbar scrollbar-thumb-accent scrollbar-track-lightGrey'>
      <div className={clsx('flex items-center gap-3 h-[300px] mb-3', className)}>{children}</div>
    </div>
  )
}
export default ScrollbarProvider
