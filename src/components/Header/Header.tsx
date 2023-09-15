'use client'

import { FC } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GoSearch } from 'react-icons/go'

import Container from '../Container'

import styles from './Header.module.sass'
import Search from '../Search/Search'

const Header: FC = () => {
  const pathname = usePathname()

  return (
    <div className='bg-dark text-lightGrey sticky top-0 z-2'>
      <Container className='flex justify-between gap-3'>
        <div className='flex items-center gap-6'>
          <h1 className='text-2xl text-accent font-semibold'>
            <Link href='/'>Kinoscan</Link>
          </h1>
          <div className='flex items-center gap-1.5 md:fixed md:bottom-0 md:left-0 md:right-0 md:justify-center md:py-3 md:bg-dark md:gap-6'>
            <Link className={pathname === 'movies' ? styles.link_active : styles.link} href='/movies'>
              Movies
            </Link>
            <Link className={pathname === 'tv' ? styles.link_active : styles.link} href='/tv'>
              TV
            </Link>
          </div>
        </div>
        <Search />
      </Container>
    </div>
  )
}
export default Header
