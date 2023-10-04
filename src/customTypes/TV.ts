import { IMovie } from './movie'

export interface ITV extends Omit<IMovie, 'movieLength' | 'isSeries'> {
  releaseYears: IReleaseYear[]
  status: string
  seasonsInfo: ISeasonInfo[]
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
