import React from "react"
import { isValidNumberString } from "../util"
import StatusInput, { StatusInputDefault } from "./StatusInput"

import { AllStatus, PokemonType, PokemonTypes, Status, StatusExcludeH } from "../types.d"
import TypeSelect from "./TypeSelect"
import { StatusSetter } from "@/hooks/usePMStatus"
import { useTranslation } from "react-i18next"
import NatureSelect from "./NatureSelect"

interface AllStatusSetter {
  lv: (n: number) => void
  types: (t: PokemonTypes) => void
  nature: (n: AllStatus["nature"]) => void
  bp: StatusSetter
  iv: StatusSetter
  ss: StatusSetter
  mod: StatusSetter
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

  const { t } = useTranslation()

  const onChangeFactory = (cate: keyof Omit<AllStatusSetter, "lv"|"types"|"nature">) => (key: keyof Status) => (val: number) => {
    props.setter[cate](key, val)
  }
  const onChangeSS = onChangeFactory("ss")
  const onChangeBP = onChangeFactory("bp")
  const onChangeIV = onChangeFactory("iv")
  const onChangeMod = onChangeFactory("mod")

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

  const onChangeNature = (index: 0 | 1) => (n: StatusExcludeH|-1) => {
    const nature: AllStatus["nature"] = index === 0 ? [n, props.status.nature[1]] : [props.status.nature[0], n]
    props.setter.nature(nature)
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
          <span>{ t("title_level") }:</span>
          <input type="number" min="0" max="100" onChange={onChangeLV} value={props.status.lv} />
          <TypeSelect value={props.status.types[0]} onChange={onChangeType(0)} default={defaultType} />
          <TypeSelect value={props.status.types[1]} onChange={onChangeType(1)} default={defaultType} />
        </div>

        <div className="flex gap-2 flex-row justify-start items-center">
          <span>{ t("title_nature") }:</span>
          <span>+</span>
          <NatureSelect onChange={onChangeNature(0)} value={props.status.nature[0]} />
          <span>-</span>
          <NatureSelect onChange={onChangeNature(1)} value={props.status.nature[1]} />
        </div>

        {statusKeyList.map(k => (
          <StatusInput
            key={k}
            hp={k == "H"}
            title={`${k}:`}
            value={getInputDef(k)}
            onChangeSS={onChangeSS(k)}
            onChangeIV={onChangeIV(k)}
            onChangeBP={onChangeBP(k)}
            onChangeMod={onChangeMod(k)}
            level={props.status.lv}
            modifiers={props.status.modifiers[k]}
          />)
        )}
        <div className="mt-4 text-red-500">{remain}</div>
      </div>
    </fieldset>
  )
}

export default React.memo(StatusBox)