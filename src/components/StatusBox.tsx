import React from "react"
import { useState } from "react"
import { isValidNumberString } from "../util"
import StatusInput, { StatusInputDefault } from "./StatusInput"

import { AllStatus, PokemonType, PokemonTypes, Status } from "../types.d"
import TypeSelect from "./TypeSelect"
import { StatusSetter } from "@/hooks/usePMStatus"

interface AllStatusSetter {
  lv: (n: number) => void
  types: (t: PokemonTypes) => void
  bp: StatusSetter
  iv: StatusSetter
  ss: StatusSetter
}

interface Props {
  title: string
  status: AllStatus
  setter: AllStatusSetter
}

function StatusBox(props: Props) {
  const { bp } = props.status
  const total = bp.H + bp.A + bp.B + bp.C + bp.D + bp.S
  const remain = 510 - total

  const onChangeFactory = (cate: keyof Omit<AllStatusSetter, "lv"|"types">) => (key: keyof Status) => (val: number) => {
    props.setter[cate](key, val)
  }
  const onChangeSS = onChangeFactory("ss")
  const onChangeBP = onChangeFactory("bp")
  const onChangeIV = onChangeFactory("iv")

  const onChangeLV = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!isValidNumberString(e.target.value)) {
      props.setter.lv(1)
      return
    }

    if(+e.target.value > 100) {
      e.target.value = "100"
    }

    props.setter.lv(+e.target.value)
  }

  const onChangeType = (index: 0|1) => (t: PokemonType) => {
    const types: PokemonTypes = index === 0 ? [t, props.status.types[1]] : [props.status.types[0], t]
    props.setter.types(types)
  }

  const getInputDef = (key: keyof Status): StatusInputDefault => {
    return {
      bp: props.status.bp[key],
      iv: props.status.iv[key],
      ss: props.status.ss[key],
    }
  }

  const defaultType = {
    name: "--",
    type: -1
  }

  const statusKeyList: (keyof Status)[] = ["H", "A", "B", "C", "D", "S"]

  return (
    <fieldset className="p-3 border-2 border-slate-500 rounded text-xl">
      <legend>{ props.title }</legend>

      <div className="gap-2 flex flex-col text-base from-neutral-700">
        <div className="flex gap-2 flex-row justify-start items-center">
          <span>Level:</span>
          <input type="number" min="0" max="100" onChange={onChangeLV} value={props.status.lv} />
          <TypeSelect value={props.status.types[0]} onChange={onChangeType(0)} default={defaultType} />
          <TypeSelect value={props.status.types[1]} onChange={onChangeType(1)} default={defaultType} />
        </div>

        {statusKeyList.map(k => <StatusInput key={k} hp={k == "H"} title={`${k}:`} value={getInputDef(k)} onChangeSS={onChangeSS(k)} onChangeIV={onChangeIV(k)} onChangeBP={onChangeBP(k)} level={props.status.lv} />)}
        <div className="mt-4 text-red-500">{remain}</div>
      </div>
    </fieldset>
  )
}

export default React.memo(StatusBox)