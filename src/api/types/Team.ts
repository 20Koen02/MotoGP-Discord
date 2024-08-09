export interface Team {
  color: string;
  riders: Rider[];
  constructor: Constructor;
  name: string;
  legacy_id: number;
  id: string;
  text_color: string;
  published: boolean;
  picture: string;
}

export interface Rider {
  id: string;
  name: string;
  surname: string;
  nickname: string;
  current_career_step: CurrentCareerStep;
  country: Country;
  birth_city: string;
  birth_date: string;
  years_old: number;
  published: boolean;
  legacy_id: number;
}

export interface CurrentCareerStep {
  season: number;
  number: number;
  sponsored_team: string;
  team: Team2;
  category: Category;
  in_grid: boolean;
  short_nickname: string;
  current: boolean;
  pictures: Pictures;
  type: string;
}

export interface Team2 {
  id: string
  constructor: Constructor
  name: string
  legacy_id: number
  color: string
  text_color: string
  picture: string
  published: boolean
}

export interface Category {
  id: string;
  name: string;
  legacy_id: number;
}

export interface Pictures {
  profile: Profile;
  bike: Bike;
  helmet: Helmet;
  number?: string;
  portrait: string;
}

export interface Profile {
  main: string;
  secondary?: string;
}

export interface Bike {
  main: string;
  secondary: string;
}

export interface Helmet {
  main?: string;
  secondary: string;
}

export interface Country {
  iso: string;
  name: string;
  flag: string;
}

export interface Constructor {
  id: string;
  name: string;
  legacy_id: number;
}
