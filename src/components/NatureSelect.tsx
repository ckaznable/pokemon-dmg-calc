import { StatusExcludeH } from "@/types.d"
import React from "react"

interface Props { 
  value: StatusExcludeH|-1
  onChange?: (v: StatusExcludeH|-1) => void
}

const list: (StatusExcludeH)[] = ["A", "B", "C", "D", "S"]

function NatureSelect(props: Props) {
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.onChange?.(e.target.value)
  }

  return (<>
    <select onChange={onChange}>
      <Options />
    </select>
  </>)
}

function Options() {
  return <>
    <option value={-1}>--</option>
    {
      list.map(s => {
        return (
          <option key={s as string} value={s as string}>{s}</option>
        )
      })
    }
  </>
}

export default React.memo(NatureSelect)