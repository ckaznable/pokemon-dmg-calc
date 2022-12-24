import create from "zustand"
import { persist } from "zustand/middleware"
import { immer } from 'zustand/middleware/immer'

import { MoveType, PokemonType } from "@/types.d"

export interface State {
  sameTypeAtkBonus: number
  atkBonus: number
  defBonus: number
  moveType: MoveType
  power: number
  type: PokemonType
}

interface Action {
  setSameTypeAtkBonus: (t: number) => void
  setAtkBonus: (t: number) => void
  setDefBonus: (t: number) => void
  setMoveType: (t: MoveType) => void
  setPower: (t: number) => void
  setType: (t: PokemonType) => void
}

interface Parameter extends State, Action {}

const useMove = create<Parameter>()(
  persist(
    immer<Parameter>((set) => ({
      sameTypeAtkBonus: 1.5,
      setSameTypeAtkBonus: (t: number) => set(state => {
        state.sameTypeAtkBonus = t
      }),

      atkBonus: 1,
      setAtkBonus: (t: number) => set(state => {
        state.atkBonus = +t
      }),

      defBonus: 1,
      setDefBonus: (t: number) => set(state => {
        state.defBonus = +t
      }),

      moveType: MoveType.Physical,
      setMoveType: (t: MoveType) => set(state => {
        state.moveType = +t
      }),

      power: 10,
      setPower: (t: number) => set(state => {
        state.power = +t
      }),

      type: PokemonType.Normal,
      setType: (t: PokemonType) => set(state => {
        state.type = t
      })
    })),
    { name: 'pm-move' })
)

export default useMove