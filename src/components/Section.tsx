'use client'

import { FC, PropsWithChildren } from 'react'
import clsx from 'clsx'

import Container from './Container'
import Slider from './Slider/Slider'

interface SectionProps {
  carousel?: boolean
  movieCard?: boolean
  className?: string
  title?: string
  hidden?: boolean
}

const Section: FC<PropsWithChildren<SectionProps>> = ({
  title,
  className,
  carousel = false,
  movieCard,
  hidden,
  children
}) => {
  if (hidden) return <></>
  return (
    <Container className={className}>
      {title ? <h1 className={clsx('text-xl pl-10 py-4')}>{title}</h1> : ''}
      {carousel ? <Slider movieCard={movieCard}>{children}</Slider> : <>{children}</>}
    </Container>
  )
}
export default Section
