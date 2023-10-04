'use client'

import { FC, PropsWithChildren } from 'react'
import clsx from 'clsx'

import Container from './Container'
import Slider from './Slider/Slider'

interface SectionProps {
  carousel?: boolean
  movieCard?: boolean
  className?: string
  title?: string | boolean
  hidden?: boolean
  skeleton?: boolean
}

const Section: FC<PropsWithChildren<SectionProps>> = ({
  title,
  className,
  carousel = false,
  movieCard,
  hidden,
  skeleton = false,
  children
}) => {
  if (hidden) return <></>
  return (
    <Container className={className}>
      {typeof title === 'string' ? (
        <h1 className={clsx('text-2xl pl-10 py-4', skeleton && 'ml-10 my-4 bg-lightGrey animate-pulse h-5 w-1/6')}>
          {title}
        </h1>
      ) : (
        ''
      )}
      {/* {skeleton && <div className='ml-10 my-4 bg-lightGrey animate-pulse h-5 w-1/6'></div>} */}
      {carousel ? <Slider movieCard={movieCard}>{children}</Slider> : <>{children}</>}
    </Container>
  )
}
export default Section
