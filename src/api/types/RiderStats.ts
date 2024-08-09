export interface RiderStats {
  first_grand_prix: FirstGrandPrix[]
  podiums: Podiums
  last_wins: LastWin[]
  third_positions: ThirdPositions
  poles: Poles
  first_podiums: FirstPodium[]
  second_positions: SecondPositions
  world_championship_wins: WorldChampionshipWins
  best_positions: BestPosition[]
  best_grid_positions: BestGridPosition[]
  first_grand_prix_victories: FirstGrandPrixVictory[]
  race_fastest_laps: RaceFastestLaps
  best_qualify_positions: BestQualifyPosition[]
  grand_prix_victories: GrandPrixVictories
  all_races: AllRaces
  first_race_fastest_lap: FirstRaceFastestLap[]
  first_pole_positions: FirstPolePosition[]
}

export interface FirstGrandPrix {
  category: Category
  event: Event
}

export interface Category {
  id: string
  legacy_id: number
  name: string
}

export interface Event {
  id: string
  name: string
  sponsored_name: string
  short_name: string
  test: boolean
  season: string
  circuit: Circuit
  country: Country
}

export interface Circuit {
  id: string
  name: string
  legacy_id: number
  place: string
  nation: string
}

export interface Country {
  iso: string
  name: string
  region_iso: string
}

export interface Podiums {
  categories: Category2[]
  total: number
}

export interface Category2 {
  category: Category3
  count: number
}

export interface Category3 {
  id: string
  legacy_id: number
  name: string
}

export interface LastWin {
  category: Category4
  event: Event2
}

export interface Category4 {
  id: string
  legacy_id: number
  name: string
}

export interface Event2 {
  id: string
  name: string
  sponsored_name: string
  short_name: string
  test: boolean
  season: string
  circuit: Circuit2
  country: Country2
}

export interface Circuit2 {
  id: string
  name: string
  legacy_id: number
  place: string
  nation: string
}

export interface Country2 {
  iso: string
  name: string
  region_iso: string
}

export interface ThirdPositions {
  categories: Category5[]
  total: number
}

export interface Category5 {
  category: Category6
  count: number
}

export interface Category6 {
  id: string
  legacy_id: number
  name: string
}

export interface Poles {
  categories: Category7[]
  total: number
}

export interface Category7 {
  category: Category8
  count: number
}

export interface Category8 {
  id: string
  legacy_id: number
  name: string
}

export interface FirstPodium {
  category: Category9
  event: Event3
}

export interface Category9 {
  id: string
  legacy_id: number
  name: string
}

export interface Event3 {
  id: string
  name: string
  sponsored_name: string
  short_name: string
  test: boolean
  season: string
  circuit: Circuit3
  country: Country3
}

export interface Circuit3 {
  id: string
  name: string
  legacy_id: number
  place: string
  nation: string
}

export interface Country3 {
  iso: string
  name: string
  region_iso: string
}

export interface SecondPositions {
  categories: Category10[]
  total: number
}

export interface Category10 {
  category: Category11
  count: number
}

export interface Category11 {
  id: string
  legacy_id: number
  name: string
}

export interface WorldChampionshipWins {
  categories: Category12[]
  total: number
}

export interface Category12 {
  category: Category13
  count: number
}

export interface Category13 {
  id: string
  legacy_id: number
  name: string
}

export interface BestPosition {
  category: Category14
  count: number
}

export interface Category14 {
  id: string
  legacy_id: number
  name: string
}

export interface BestGridPosition {
  category: Category15
  count: number
}

export interface Category15 {
  id: string
  legacy_id: number
  name: string
}

export interface FirstGrandPrixVictory {
  category: Category16
  event: Event4
}

export interface Category16 {
  id: string
  legacy_id: number
  name: string
}

export interface Event4 {
  id: string
  name: string
  sponsored_name: string
  short_name: string
  test: boolean
  season: string
  circuit: Circuit4
  country: Country4
}

export interface Circuit4 {
  id: string
  name: string
  legacy_id: number
  place: string
  nation: string
}

export interface Country4 {
  iso: string
  name: string
  region_iso: string
}

export interface RaceFastestLaps {
  categories: Category17[]
  total: number
}

export interface Category17 {
  category: Category18
  count: number
}

export interface Category18 {
  id: string
  legacy_id: number
  name: string
}

export interface BestQualifyPosition {
  category: Category19
  count: number
}

export interface Category19 {
  id: string
  legacy_id: number
  name: string
}

export interface GrandPrixVictories {
  categories: Category20[]
  total: number
}

export interface Category20 {
  category: Category21
  count: number
}

export interface Category21 {
  id: string
  legacy_id: number
  name: string
}

export interface AllRaces {
  categories: Category22[]
  total: number
}

export interface Category22 {
  category: Category23
  count: number
}

export interface Category23 {
  id: string
  legacy_id: number
  name: string
}

export interface FirstRaceFastestLap {
  category: Category24
  event: Event5
}

export interface Category24 {
  id: string
  legacy_id: number
  name: string
}

export interface Event5 {
  id: string
  name: string
  sponsored_name: string
  short_name: string
  test: boolean
  season: string
  circuit: Circuit5
  country: Country5
}

export interface Circuit5 {
  id: string
  name: string
  legacy_id: number
  place: string
  nation: string
}

export interface Country5 {
  iso: string
  name: string
  region_iso: string
}

export interface FirstPolePosition {
  category: Category25
  event: Event6
}

export interface Category25 {
  id: string
  legacy_id: number
  name: string
}

export interface Event6 {
  id: string
  name: string
  sponsored_name: string
  short_name: string
  test: boolean
  season: string
  circuit: Circuit6
  country: Country6
}

export interface Circuit6 {
  id: string
  name: string
  legacy_id: number
  place: string
  nation: string
}

export interface Country6 {
  iso: string
  name: string
  region_iso: string
}
