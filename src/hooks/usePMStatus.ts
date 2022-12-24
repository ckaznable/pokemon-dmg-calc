import create from "zustand"
import { persist } from "zustand/middleware"
import { immer } from 'zustand/middleware/immer'

import { Status, AllStatus, PokemonType, PokemonTypes } from "@/types.d"

export type StatusSetter = (k: keyof Status, s: number) => void

interface State {
  attacker: AllStatus
  defender: AllStatus
}

interface Action {
  setAttackerTypes: (t: PokemonTypes) => void
  setAttackerNature: (t: AllStatus["nature"]) => void
  setAttackerLV: (n: number) => void
  setAttackerSS: StatusSetter
  setAttackerIV: StatusSetter
  setAttackerBP: StatusSetter

  setDefenderTypes: (t: PokemonTypes) => void
  setDefenderNature: (t: AllStatus["nature"]) => void
  setDefenderLV: (n: number) => void
  setDefenderSS: StatusSetter
  setDefenderIV: StatusSetter
  setDefenderBP: StatusSetter
}

interface Parameter extends State, Action {}

function createDefStatus(def=0): Status {
  return {
    H: def,
    A: def,
    B: def,
    C: def,
    D: def,
    S: def,
  }
}

function createDefAllStatus(): AllStatus {
  return {
    types: [PokemonType.Normal, -1],
    nature: [-1, -1],
    lv: 50,
    iv: createDefStatus(31),
    bp: createDefStatus(0),
    ss: createDefStatus(100)
  }
}

const usePMStatus = create<Parameter>()(
  persist(
    immer<Parameter>((set) => ({
      attacker: createDefAllStatus(),
      setAttackerTypes: (t: PokemonTypes) => set(state => {
        state.attacker.types = t
      }),
      setAttackerNature: (n: AllStatus["nature"]) => set(state => {
        state.attacker.nature = n
      }),
      setAttackerLV: (n: number) => set(state => {
        state.attacker.lv = n
      }),
      setAttackerSS: (k: keyof Status, s: number) => set(state => {
        state.attacker.ss[k] = s
      }),
      setAttackerIV: (k: keyof Status, s: number) => set(state => {
        state.attacker.iv[k] = s
      }),
      setAttackerBP: (k: keyof Status, s: number) => set(state => {
        state.attacker.bp[k] = s
      }),

      defender: createDefAllStatus(),
      setDefenderTypes: (t: PokemonTypes) => set(state => {
        state.defender.types = t
      }),
      setDefenderNature: (n: AllStatus["nature"]) => set(state => {
        state.defender.nature = n
      }),
      setDefenderLV: (n: number) => set(state => {
        state.defender.lv = n
      }),
      setDefenderSS: (k: keyof Status, s: number) => set(state => {
        state.defender.ss[k] = s
      }),
      setDefenderIV: (k: keyof Status, s: number) => set(state => {
        state.defender.iv[k] = s
      }),
      setDefenderBP: (k: keyof Status, s: number) => set(state => {
        state.defender.bp[k] = s
      }),
    })),
  { name: 'pm-status' })
)

export default usePMStatus