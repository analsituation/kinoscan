export interface IPerson {
  id: 10661
  photo: string
  name: string
  enName: string
  description: string
  profession: profession
  enProfession: enProfession
}

type profession =
  | 'актеры'
  | 'режиссеры'
  | 'продюсеры'
  | 'композиторы'
  | 'художники'
  | 'монтажеры'
  | 'операторы'
  | 'актеры дубляжа'
  | 'редакторы'

type enProfession =
  | 'actor'
  | 'director'
  | 'producer'
  | 'composer'
  | 'designer'
  | 'editor'
  | 'operator'
  | 'voice_actor'
  | 'writer'
