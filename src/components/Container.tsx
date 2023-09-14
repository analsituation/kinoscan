import { FC, PropsWithChildren } from 'react'

import clsx from 'clsx'

interface ContainerProps {
  className?: string
}

const Container: FC<PropsWithChildren<ContainerProps>> = ({ className, children }) => {
  return <div className={clsx('py-3 max-w-[1200px] mx-auto', className && className)}>{children}</div>
}
export default Container
