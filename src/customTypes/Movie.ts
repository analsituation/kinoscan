export interface IFilm {
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

export interface IExternalId {
  kpHD: string
  imdb: string
  tmdb: number
}

export interface IRating {
  kp: number
  imdb: number
  filmCritics: number
  russianFilmCritics: number
  await: any
}

export interface IVotes {
  kp: number
  imdb: number
  filmCritics: number
  russianFilmCritics: number
  await: number
}

export interface IPoster {
  url: string
  previewUrl: string
}

export interface IGenre {
  name: string
}

export interface ICountry {
  name: string
}

export interface ILogo {
  url: string
}
