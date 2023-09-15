import { genres } from './genre'

export interface IMovie {
  id: number
  externalId: IExternalId
  name: string
  alternativeName: string
  enName: any
  type: string
  year: number
  description: string
  shortDescription?: string
  rating: IRating
  votes: IVotes
  movieLength: number
  poster: IPoster
  genres: IGenre[]
  countries: ICountry[]
  logo?: ILogo
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
