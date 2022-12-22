import create from "zustand"
import { persist } from "zustand/middleware"
import { immer } from 'zustand/middleware/immer'

import { MoveType, PokemonType } from "@/types.d"

export interface State {
  moveType: MoveType
  power: number
  type: PokemonType
}

interface Action {
  setMoveType: (t: MoveType) => void
  setPower: (t: number) => void
  setType: (t: PokemonType) => void
}

interface Parameter extends State, Action {}

const useMove = create<Parameter>()(
  persist(
    immer<Parameter>((set) => ({
      moveType: MoveType.Physical,
      setMoveType: (t: MoveType) => {set(state => {
        state.moveType = t
      })},

      power: 10,
      setPower: (t: number) => {set(state => {
        state.power = t
      })},

      type: PokemonType.Normal,
      setType: (t: PokemonType) => {set(state => {
        state.type = t
      })}
    })),
    { name: 'pm-move' })
)

export default useMove