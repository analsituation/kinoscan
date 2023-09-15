import { genres } from './genre'
import { IPerson } from './person'

export interface IMovie {
  id: number
  externalId: IExternalId
  name: string
  alternativeName: string
  enName: any
  type: string
  year: number
  description: string
  shortDescription: string
  rating: IRating
  votes: IVotes
  movieLength: number
  poster: IPoster
  backdrop: IBackdrop
  genres: IGenre[]
  countries: ICountry[]
  persons: IPerson[]
  logo: ILogo
  videos: {
    trailers: ITrailer[]
  }
}

interface ITrailer {
  url: string
  name: string
  site: string
  type: string
}

interface IBackdrop {
  url: string
  previewUrl: string
}

interface IExternalId {
  kpHD: string
  imdb: string
  tmdb: number
}

interface IRating {
  kp: number
  imdb: number
  filmCritics: number
  russianFilmCritics: number
  await: any
}

interface IVotes {
  kp: number
  imdb: number
  filmCritics: number
  russianFilmCritics: number
  await: number
}

interface IPoster {
  url: string
  previewUrl: string
}

interface IGenre {
  name: genres
}

interface ICountry {
  name: string
}

interface ILogo {
  url: string
}
