import Image from 'next/image'
import { FC } from 'react'

interface BackDropProps {
  name: string
  backdrop: string
}

const BackDrop: FC<BackDropProps> = ({ name, backdrop }) => {
  return (
    <div className='h-[420px] sm:h-[250px] left-0 right-0 top-0 relative z-[-1] overflow-hidden'>
      <div className='backdrop-gradient'></div>
      <div className='w-[50%] h-full mx-auto relative'>
        <Image
          placeholder={'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='}
          quality={65}
          alt={name}
          layout='fill'
          style={{ objectFit: 'cover' }}
          src={backdrop}
          className='mx-auto'
        ></Image>
      </div>
    </div>
  )
}
export default BackDrop
