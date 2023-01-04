import React, { CSSProperties, useEffect, useState } from "react"
import { calcHpStatus, calcStatus, onInputChange } from "../util"
import StatModifiersSelect from "./StatModifiersSelect"

export interface StatusInputDefault {
  bp: number
  iv: number
  ss: number
}

interface Props {
  title: string
  isBuff?: boolean
  isDeBuff?: boolean
  hp?: boolean
  level: number
  value?: StatusInputDefault
  modifiers: number
  onChangeSS?: (s: number) => void
  onChangeBP?: (s: number) => void
  onChangeIV?: (s: number) => void
  onChangeMod?: (s: number) => void
}

function StatusInput(props: Props) {
  const [bp, setBP] = useState(props.value ? props.value.bp : 0)
  const [iv, setIV] = useState(props.value ? props.value.iv : 31)
  const [ss, setSS] = useState(props.value ? props.value.ss : 0)
  const [mod, setMod] = useState(props.modifiers ? props.modifiers : 0)

  const buffRate = props.isBuff ? 1.1 :
    props.isDeBuff ? 0.9 : 1

  const status = props.hp
    ? calcHpStatus(ss, iv, props.level, bp)
    : calcStatus(ss, iv, props.level, bp, buffRate)

  useEffect(() => {
    props.onChangeSS?.(ss)
  }, [ss])

  useEffect(() => {
    props.onChangeBP?.(bp)
  }, [bp])

  useEffect(() => {
    props.onChangeIV?.(iv)
  }, [iv])

  useEffect(() => {
    props.onChangeMod?.(mod)
  }, [mod])

  const inputStyle: CSSProperties = {
    maxWidth: `60px`
  }

  return (
    <div className="status-input-wrap">
      <div className="flex-1 flex flex-row gap-2">
        <span className="w-[16px]">{props.title}</span>
        <input min="0" style={inputStyle} type="number" onChange={onInputChange(setSS)} value={ss} />
        <input min="0" style={inputStyle} type="number" onChange={onInputChange(setIV)} value={iv} />
        <input min="0" style={inputStyle} type="number" onChange={onInputChange(setBP)} value={bp} />
        {!props.hp && <StatModifiersSelect onChange={setMod} value={mod} />}
      </div>
      <span className="text-green-400 w-[30px] min-w-[30px] text-center">{ status }</span>
    </div>
  )
}

export default React.memo(StatusInput)