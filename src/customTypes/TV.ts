import { IMovie } from './movie'

export interface ITV extends Omit<IMovie, 'movieLength' | 'isSeries'> {
  releaseYears: IReleaseYear[] | null
  status: string
  seasonsInfo: ISeasonInfo[] | null
  seriesLength: number
  isSeries: true
}

export interface ISeasonInfo {
  number: number
  episodesCount: number
}

export interface IReleaseYear {
  start: number
  end: number
}
