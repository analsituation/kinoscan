import { IMovie, IReleaseYear, ISeasonInfo } from '.'

export interface IAnime extends Omit<IMovie, 'isSeries'> {
  isSeries: boolean
  seasonsInfo: ISeasonInfo[]
  releaseYears: IReleaseYear[]
}
