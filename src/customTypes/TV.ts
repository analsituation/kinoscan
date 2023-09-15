import { IMovie } from './movie'

export interface ITV extends Omit<IMovie, 'movieLength'> {
  releaseYears: IReleaseYear[]
  // seasonsInfo:
}

interface IReleaseYear {
  start: number
  end: number
}
