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
      infinite: false,
      slidesToShow: 6,
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 2
          }
        }
      ]
    }
  }

  return (
    <Slick {...settings} autoplay={false}>
      {props.children}
    </Slick>
  )
}
export default Slider
