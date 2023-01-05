import React from "react"

interface Props {
  value: number
  onChange?: (v: number) => void
}

// -6 ~ +6
const list: number[] = [
  ...Array(6).fill(0).map((_, i) => i - 6),
  0,
  ...Array(6).fill(0).map((_, i) => i + 1),
]

function StatModifiersSelect(props: Props) {
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.onChange?.(+e.target.value)
  }

  return (<>
    <select value={props.value} onChange={onChange}>
      <Options />
    </select>
  </>)
}

function Options() {
  return <>
    {
      list.map(s => {
        return (
          <option key={s} value={s}>{s >= 0 ? "+" : ""}{s}</option>
        )
      })
    }
  </>
}

export default React.memo(StatModifiersSelect)