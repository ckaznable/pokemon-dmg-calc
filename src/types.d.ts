export type Status = {
  H: number
  A: number
  B: number
  C: number
  D: number
  S: number
}

export interface AllStatus {
  types: PokemonTypes
  lv: number
  ss: Status
  iv: Status
  bp: Status
}

export type TYPE_NONE = -1
export type PokemonTypes = [PokemonType, PokemonType | TYPE_NONE]

export enum PokemonType {
  Normal,
  Fire,
  Water,
  Electric,
  Grass,
  Ice,
  Fighting,
  Poison,
  Ground,
  Flying,
  Psychic,
  Bug,
  Rock,
  Ghost,
  Dragon,
  Dark,
  Steel,
  Fairy,
  Unknown
}

export enum MoveType {
  Physical,
  Special
}