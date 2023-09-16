import { IMovie } from './movie'

export interface ITV extends Omit<IMovie, 'movieLength'> {
  releaseYears: IReleaseYear[]
  status: string
  seasonsInfo: ISeasonInfo[]
  seriesLength: number
  isSeries: true
}

interface ISeasonInfo {
  number: number
  episodesCount: number
}

interface IReleaseYear {
  start: number
  end: number
}
