'use-client'

import Slick, { Settings } from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './Slider.css'

interface SliderProps extends Settings {
  movieCard?: boolean
}

const Slider = (props: SliderProps) => {
  let settings: Settings = {
    ...props
  }

  if (props.movieCard) {
    settings = {
      ...settings,
      // infinite: true,
      slidesToShow: 6,
      slidesToScroll: 1,
      swipe: false,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
    }
  }

  return (
    <Slick {...settings} autoplay={false} autoplaySpeed={5000}>
      {props.children}
    </Slick>
  )
}
export default Slider
