import React, { useEffect, useState } from "react"
import { isValidNumberString } from "../util"

interface Props {
  title: string
  isBuff?: boolean
  isDeBuff?: boolean
  hp?: boolean
  level: number
  onChange?: (s: number) => void
  onChangeBP?: (s: number) => void
}

function calcStatus(ss: number, iv: number, level: number, bp: number, buffRate: number) {
  return Math.round((((ss * 2) + iv + (bp / 4)) * level) / 100 + 5 * buffRate)
}

function calcHpStatus(ss: number, iv: number, level: number, bp: number) {
  return Math.round((((ss * 2) + iv + (bp / 4)) * level) / 100 + 10 + level)
}

function StatusInput(props: Props) {
  const [bp, setBP] = useState(0)
  const [iv, setIV] = useState(31)
  const [ss, setSS] = useState(0)

  const buffRate = props.isBuff ? 1.1 :
    props.isDeBuff ? 0.9 : 1

  const status = props.hp
    ? calcHpStatus(ss, iv, props.level, bp)
    : calcStatus(ss, iv, props.level, bp, buffRate)

  useEffect(() => {
    props.onChange?.(status)
  }, [status])

  useEffect(() => {
    props.onChangeBP?.(bp)
  }, [bp])

  const onInputChange = (setter: React.Dispatch<React.SetStateAction<number>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!isValidNumberString(e.target.value)) {
      setter(0)
      return
    }

    setter(+e.target.value)
  }

  return (
    <div className="status-input-wrap">
      <span className="w-1/6">{ props.title }</span>
      <input min="0" type="number" onChange={onInputChange(setSS)} value={ss} />
      <input min="0" type="number" onChange={onInputChange(setIV)} value={iv} />
      <input min="0" type="number" onChange={onInputChange(setBP)} value={bp} />
      <span className="text-green-400 w-[30px] min-w-[30px] text-center">{ status }</span>
    </div>
  )
}

export default React.memo(StatusInput)