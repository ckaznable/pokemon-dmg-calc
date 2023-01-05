import { AllStatus, MoveType, PokemonType, StatusExcludeH } from "./types.d"
import { State as MoveState } from "./hooks/useMove"

export function isValidNumberString (n: string): boolean {
  if(!n || +n < 0) {
    return false
  }

  if(isNaN(Number.parseInt(n))) {
    return false
  }

  return true
}

export function onInputChange(setter: React.Dispatch<React.SetStateAction<number>>|((t: number)=>void)) {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isValidNumberString(e.target.value)) {
      setter(0)
      return
    }

    setter(+e.target.value)
  }
}

export function calcStatus(ss: number, iv: number, level: number, bp: number, buffRate: number) {
  return Math.floor((((ss * 2) + iv + (bp / 4)) * level) / 100 + 5) * buffRate
}

export function calcHpStatus(ss: number, iv: number, level: number, bp: number) {
  return Math.floor((((ss * 2) + iv + (bp / 4)) * level) / 100 + 10 + level)
}

export function getNatureFix(n: [StatusExcludeH|-1, StatusExcludeH|-1], s: StatusExcludeH) {
  return n[0] === s ? 1.1 :
    n[1] ? 0.9 : 1
}

export function calcDamage(attacker: AllStatus, defender: AllStatus, move: MoveState) {
  const atk = (move.moveType === MoveType.Physical
    ? calcStatus(attacker.ss.A, attacker.iv.A, attacker.lv, attacker.bp.A, getNatureFix(attacker.nature, "A")) * getModRate(attacker.modifiers.A)
    : calcStatus(attacker.ss.C, attacker.iv.C, attacker.lv, attacker.bp.C, getNatureFix(attacker.nature, "C")) * getModRate(attacker.modifiers.C)
  ) * (move.atkBonus || 1)

  const def = (move.moveType === MoveType.Physical
    ? calcStatus(defender.ss.B, defender.iv.B, defender.lv, defender.bp.B, getNatureFix(defender.nature, "B")) * getModRate(attacker.modifiers.B)
    : calcStatus(defender.ss.D, defender.iv.D, defender.lv, defender.bp.D, getNatureFix(defender.nature, "D")) * getModRate(attacker.modifiers.D)
  ) * (move.defBonus || 1)

  const base = (((((attacker.lv * 2 + 10) / 250) + atk / def) * move.power + 2) * attacker.lv) / 100
  let typeBuffRate = attacker.types.includes(move.type) ? (move.sameTypeAtkBonus||1.5) : 1
  let typeRate = getDamageRate(+move.type, +defender.types[0])

  if (defender.types[1] !== -1 && defender.types[0] !== defender.types[1]) {
    typeRate *= getDamageRate(+move.type, +defender.types[1])
  }

  const dmg = Math.round(base * typeBuffRate * typeRate)
  return Math.round((dmg / calcHpStatus(defender.ss.H, defender.iv.H, defender.lv, defender.bp.H)) * 100)
}

export function getModRate(n: number) {
  return n == 0 ? 1 :
    n < 0 ? 2 / (2 + Math.abs(n)) :
    (2 + n) / 2
}

function getDamageRate(atk: PokemonType, def: PokemonType) {
  switch (atk) {
    case PokemonType.Bug:
      switch (def) {
        case PokemonType.Fire:
        case PokemonType.Flying:
        case PokemonType.Ghost:
        case PokemonType.Fighting:
        case PokemonType.Poison:
        case PokemonType.Fairy:
        case PokemonType.Steel:
          return 0.5
        case PokemonType.Dark:
        case PokemonType.Psychic:
        case PokemonType.Grass:
          return 2
        default: return 1
      }
    case PokemonType.Dark:
      switch (def) {
        case PokemonType.Fighting:
        case PokemonType.Fairy:
        case PokemonType.Dark:
          return 0.5
        case PokemonType.Ghost:
        case PokemonType.Psychic:
          return 2
        default: return 1
      }

    case PokemonType.Dragon:
      switch (def) {
        case PokemonType.Dragon:
          return 2
        case PokemonType.Fairy:
          return 0
        default: return 1
      }

    case PokemonType.Electric:
      switch (def) {
        case PokemonType.Ground:
          return 0
        case PokemonType.Grass:
        case PokemonType.Electric:
        case PokemonType.Dragon:
          return 0.5
        case PokemonType.Water:
        case PokemonType.Flying:
          return 2
        default: return 1
      }

    case PokemonType.Fairy:
      switch (def) {
        case PokemonType.Poison:
        case PokemonType.Steel:
        case PokemonType.Fire:
          return 0.5
        case PokemonType.Dragon:
        case PokemonType.Dark:
        case PokemonType.Fighting:
          return 2
        default: return 1
      }

    case PokemonType.Fighting:
      switch (def) {
        case PokemonType.Ghost:
          return 0
        case PokemonType.Flying:
        case PokemonType.Fairy:
        case PokemonType.Psychic:
        case PokemonType.Bug:
        case PokemonType.Poison:
          return 0.5
        case PokemonType.Normal:
        case PokemonType.Rock:
        case PokemonType.Steel:
        case PokemonType.Dark:
          return 2
        default: return 1
      }

    case PokemonType.Fire:
      switch (def) {
        case PokemonType.Rock:
        case PokemonType.Dragon:
        case PokemonType.Water:
          return 0.5
        case PokemonType.Steel:
        case PokemonType.Bug:
        case PokemonType.Ice:
        case PokemonType.Grass:
          return 2
        default: return 1
      }

    case PokemonType.Flying:
      switch (def) {
        case PokemonType.Rock:
        case PokemonType.Steel:
        case PokemonType.Electric:
          return 0.5
        case PokemonType.Fighting:
        case PokemonType.Grass:
          return 2
        default: return 1
      }

    case PokemonType.Ghost:
      switch (def) {
        case PokemonType.Normal:
          return 0
        case PokemonType.Dark:
          return 0.5
        case PokemonType.Psychic:
        case PokemonType.Ghost:
          return 2
        default: return 1
      }

    case PokemonType.Grass:
      switch (def) {
        case PokemonType.Fire:
        case PokemonType.Flying:
        case PokemonType.Steel:
        case PokemonType.Bug:
        case PokemonType.Dragon:
        case PokemonType.Grass:
          return 0.5
        case PokemonType.Water:
        case PokemonType.Rock:
        case PokemonType.Ground:
          return 2
        default: return 1
      }

    case PokemonType.Ground:
      switch (def) {
        case PokemonType.Flying:
          return 0
        case PokemonType.Grass:
        case PokemonType.Bug:
          return 0.5
        case PokemonType.Poison:
        case PokemonType.Electric:
        case PokemonType.Rock:
        case PokemonType.Steel:
        case PokemonType.Fire:
          return 2
        default: return 1
      }

    case PokemonType.Ice:
      switch (def) {
        case PokemonType.Steel:
        case PokemonType.Fire:
        case PokemonType.Water:
        case PokemonType.Ice:
          return 0.5
        case PokemonType.Grass:
        case PokemonType.Ground:
        case PokemonType.Dragon:
        case PokemonType.Flying:
          return 2
        default: return 1
      }

    case PokemonType.Normal:
      switch (def) {
        case PokemonType.Ghost:
          return 0
        case PokemonType.Fighting:
        case PokemonType.Rock:
        case PokemonType.Steel:
          return 0.5
        default: return 1
      }

    case PokemonType.Poison:
      switch (def) {
        case PokemonType.Steel:
          return 0
        case PokemonType.Poison:
        case PokemonType.Ground:
        case PokemonType.Rock:
        case PokemonType.Ghost:
          return 0.5
        case PokemonType.Grass:
        case PokemonType.Fairy:
          return 2
        default: return 1
      }

    case PokemonType.Psychic:
      switch (def) {
        case PokemonType.Dark:
          return 0
        case PokemonType.Steel:
        case PokemonType.Psychic:
          return 0.5
        case PokemonType.Poison:
        case PokemonType.Fighting:
          return 2
        default: return 1
      }

    case PokemonType.Rock:
      switch (def) {
        case PokemonType.Fighting:
        case PokemonType.Ground:
        case PokemonType.Steel:
          return 0.5
        case PokemonType.Flying:
        case PokemonType.Ice:
        case PokemonType.Fire:
        case PokemonType.Bug:
          return 2
        default: return 1
      }

    case PokemonType.Steel:
      switch (def) {
        case PokemonType.Steel:
        case PokemonType.Fire:
        case PokemonType.Water:
        case PokemonType.Electric:
          return 0.5
        case PokemonType.Fairy:
        case PokemonType.Ice:
        case PokemonType.Rock:
          return 2
        default: return 1
      }

    case PokemonType.Water:
      switch (def) {
        case PokemonType.Grass:
        case PokemonType.Water:
        case PokemonType.Dragon:
          return 0.5
        case PokemonType.Rock:
        case PokemonType.Fire:
        case PokemonType.Ground:
          return 2
        default: return 1
      }
  }

  return 1
}