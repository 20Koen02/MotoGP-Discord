export class Session {
  event_categories: EventCategory[]
  country: string
  circuit: Circuit
  ticketings: unknown[]
  type: string
  urls: unknown[]
  next_broadcast: NextBroadcast
  assets: Asset[]
  season: Season
  id: string
  categories: Category[]
  hashtag: string
  timing_id: number
  remain: number
  kind: string
  broadcasts: Broadcast[]
  date_end: string
  time_zone: string
  shortname: string
  business_unit: BusinessUnit
  url: string
  schedule: Schedule
  date_start: string
  name: string
  status: string
}

export class EventCategory {
  category_id: string
  category_timing_id: number
  timing_id: number
  sequence: number
}

export class Circuit {
  id: string
  name: string
  iso_code: string
  country: string
  region: string
  city: string
  postal_code: string
  address: string
  lat: string
  lng: string
  place_id: string
  constructed: number
  designer: string
  active: boolean
  timing_ids: TimingId[]
  track: Track
  circuit_descriptions: CircuitDescription[]
  user_location: UserLocation
}

export class TimingId {
  business_unit: string
  id: number
}

export class Track {
  id: string
  first_grid: string
  box_entry: boolean
  box_exit: boolean
  lenght: string
  lenght_units: LenghtUnits
  width: string
  width_units: WidthUnits
  longest_straight: string
  longest_straight_units: LongestStraightUnits
  left_corners: string
  right_corners: string
  is_active: boolean
  timing_ids: TimingId2[]
  modification_date: string
  assets: Assets
}

export class LenghtUnits {
  meters: number
  kiloMeters: number
  miles: number
  feet: number
}

export class WidthUnits {
  meters: number
  kiloMeters: number
  miles: number
  feet: number
}

export class LongestStraightUnits {
  meters: number
  kiloMeters: number
  miles: number
  feet: number
}

export class TimingId2 {
  business_unit: string
  id: string
}

export class Assets {
  simple: Simple
  info: Info
}

export class Simple {
  id: string
  name: string
  type: string
  path: string
  mimetype: string
}

export class Info {
  id: string
  name: string
  type: string
  path: string
  mimetype: string
}

export class CircuitDescription {
  id: string
  business_unit_id: BusinessUnitId
  business_unit_name: BusinessUnitName
  language: string
  description: string
}

export class BusinessUnitId {
  id: string
}

export class BusinessUnitName {
  value: string
}

export class UserLocation {
  lat: string
  lng: string
  radius: number
}

export class NextBroadcast {
  id_broadcast: string
  remain: number
  type: string
  name: string
  shortname: string
  category_name: string
  gp_day: number
}

export class Asset {
  id: string
  name: string
  type: string
  quality: string
  path: string
  mimetype: string
}

export class Season {
  id: string
  year: number
  current: boolean
}

export class Category {
  id: string
  acronym: string
  name: string
  active: boolean
  timing_id: number
  priority: number
}

export class Broadcast {
  id: string
  shortname: string
  name: string
  date_start: string
  date_end: string
  remain: number
  type: string
  kind: string
  status: string
  progressive: number
  has_timing: boolean
  has_live: boolean
  has_report: boolean
  has_results: boolean
  has_on_demand: boolean
  is_live: boolean
  is_live_timing: boolean
  live: boolean
  category: Category2
  gp_day: number
  timing_id: number
}

export class Category2 {
  id: string
  acronym: string
  name: string
  active: boolean
  timing_id: number
  priority: number
}

export class BusinessUnit {
  id: string
  name: string
  acronym: string
}

export class Schedule {
  options: Option[]
  selected_day: number
}

export class Option {
  date: number
  dateStart: string
  name: string
  day: number
  month: string
  day_suffix: string
  gp_day: number
}
