import React, { forwardRef, useImperativeHandle } from "react"
import { useState } from "react"
import { isValidNumberString } from "../util"
import StatusInput from "./StatusInput"

import type { Status } from "../types"

interface Props {}

export interface StatusBoxRefs extends Status {}

const StatusBox = forwardRef<StatusBoxRefs, Props>((props, refs) => {
  const [level, setLevel] = useState(50)
  const [H, setH] = useState(0)
  const [A, setA] = useState(0)
  const [B, setB] = useState(0)
  const [C, setC] = useState(0)
  const [D, setD] = useState(0)
  const [S, setS] = useState(0)

  const [bp, setBP] = useState<Status>({H: 0, A: 0, B: 0, C: 0, D: 0, S: 0})
  const total = bp.H + bp.A + bp.B + bp.C + bp.D + bp.S
  const remain = 510 - total

  useImperativeHandle(refs, () => ({H, A, B, C, D, S}))

  const onChangeBP = (key: keyof Status) => (val: number) => {
    setBP(bp => {
      bp[key] = val
      return bp
    })
  }

  const onChangeLV = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!isValidNumberString(e.target.value)) {
      setLevel(1)
      return
    }

    if(+e.target.value > 100) {
      e.target.value = "100"
    }

    setLevel(+e.target.value)
  }

  return (
    <div className="p-3 gap-2 flex flex-col border-2 border-slate-500 rounded text-base from-neutral-700">
      <div className="flex gap-2 flex-row justify-start items-center">
        <span>Level:</span>
        <input type="number" min="0" max="100" onChange={onChangeLV} value={level} />
      </div>

      <StatusInput title="H:" onChange={setH} onChangeBP={onChangeBP("H")} level={level} />
      <StatusInput title="A:" onChange={setA} onChangeBP={onChangeBP("A")} level={level} />
      <StatusInput title="B:" onChange={setB} onChangeBP={onChangeBP("B")} level={level} />
      <StatusInput title="C:" onChange={setC} onChangeBP={onChangeBP("C")} level={level} />
      <StatusInput title="D:" onChange={setD} onChangeBP={onChangeBP("D")} level={level} />
      <StatusInput title="S:" onChange={setS} onChangeBP={onChangeBP("S")} level={level} />

      <div className="mt-4 text-red-500">{remain}</div>
    </div>
  )
})

export default React.memo(StatusBox)