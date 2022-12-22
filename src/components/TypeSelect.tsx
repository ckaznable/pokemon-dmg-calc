import usePMType from "@/hooks/usePMType"
import { PokemonType } from "@/types"
import React from "react"
import { ChangeEvent } from "react"

interface Props {
  onChange?: (v: PokemonType) => void
  value: PokemonType
  default?: {
    type: string|number
    name: string
  }
}

function TypeSelect(props: Props) {
  const { getTypeList } = usePMType()

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    props.onChange?.(e.target.value as unknown as PokemonType)
  }

  return <select onChange={onChange} value={props.value}>
    {"default" in props && props.default ? <option value={props.default?.type}>{ props.default?.name || "" }</option> : <></>}
    {getTypeList().map(obj => (<option key={obj.type} value={obj.type}>{ obj.name }</option>))}
  </select>
}

export default React.memo(TypeSelect)