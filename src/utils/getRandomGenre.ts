import { genres } from '@/customTypes/genre'

export const getRandomGenre = (): genres => {
  const genreIndex = Math.floor(Math.random() * (kpGenresForShow.length - 1) + 1)
  return kpGenresForShow[genreIndex].name
}

type kpGenresType = {
  name: genres
  slug: string
}

const kpGenresForShow: kpGenresType[] = [
  {
    name: 'боевик',
    slug: 'boevik'
  },
  {
    name: 'комедия',
    slug: 'komediya'
  },
  {
    name: 'приключения',
    slug: 'priklyucheniya'
  },
  {
    name: 'семейный',
    slug: 'semeynyy'
  },
  {
    name: 'фэнтези',
    slug: 'fentezi'
  },
  {
    name: 'аниме',
    slug: 'anime'
  },
  {
    name: 'триллер',
    slug: 'triller'
  },
  {
    name: 'ужасы',
    slug: 'uzhasy'
  },
  {
    name: 'фантастика',
    slug: 'fantastika'
  },
  {
    name: 'детектив',
    slug: 'detektiv'
  },
  {
    name: 'детский',
    slug: 'detskiy'
  },
  {
    name: 'документальный',
    slug: 'dokumentalnyy'
  },
  {
    name: 'драма',
    slug: 'drama'
  },
  {
    name: 'криминал',
    slug: 'kriminal'
  },
  {
    name: 'мелодрама',
    slug: 'melodrama'
  },
  {
    name: 'мультфильм',
    slug: 'multfilm'
  },
  {
    name: 'мюзикл',
    slug: 'myuzikl'
  }
  // {
  //   name: 'биография',
  //   slug: 'biografiya'
  // },
  // {
  //   name: 'вестерн',
  //   slug: 'vestern'
  // },
  // {
  //   name: 'военный',
  //   slug: 'voennyy'
  // },
  // {
  //   name: 'для взрослых',
  //   slug: 'dlya-vzroslyh'
  // },
  // {
  //   name: 'игра',
  //   slug: 'igra'
  // },
  // {
  //   name: 'история',
  //   slug: 'istoriya'
  // },
  // {
  //   name: 'концерт',
  //   slug: 'koncert'
  // },
  // {
  //   name: 'короткометражка',
  //   slug: 'korotkometrazhka'
  // },
  // {
  //   name: 'музыка',
  //   slug: 'muzyka'
  // },
  // {
  //   name: 'новости',
  //   slug: 'novosti'
  // },
  // {
  //   name: 'реальное ТВ',
  //   slug: 'realnoe-TV'
  // },
  // {
  //   name: 'спорт',
  //   slug: 'sport'
  // },
  // {
  //   name: 'ток-шоу',
  //   slug: 'tok-shou'
  // },
  // {
  //   name: 'фильм-нуар',
  //   slug: 'film-nuar'
  // },
  // {
  //   name: 'церемония',
  //   slug: 'ceremoniya'
  // }
]
