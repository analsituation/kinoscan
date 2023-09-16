import { genres } from './genre'
import { IPerson } from './person'

export interface IMovie {
  id: number
  externalId: IExternalId
  name: string
  alternativeName: string
  enName: string
  type: string
  year: number
  description: string
  shortDescription: string
  rating: IRating
  votes: IVotes
  movieLength: number
  poster: IPoster | null
  backdrop: IBackdrop
  genres: IGenre[]
  countries: ICountry[]
  persons: IPerson[]
  sequelsAndPrequels: IMovieShort[]
  similarMovies: IMovieShort[]
  logo: ILogo
  videos: {
    trailers: ITrailer[]
  }
}

export interface IMovieShort {
  id: number
  name: string
  enName: string
  alternativeName: string
  type: string
  poster: IPoster
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
