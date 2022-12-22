import { PokemonType } from "@/types.d"
import { useRef } from "react"
import { useTranslation } from "react-i18next"

interface PMTypeItem {
  type: PokemonType
  name: string
}

export default function usePMType() {
  const { t } = useTranslation()
  const types = useRef<PMTypeItem[]>([])

  const getTypeName = (type: PokemonType) => {
    switch(type) {
      case PokemonType.Bug: return t("type_bug")
      case PokemonType.Dark: return t("type_dark")
      case PokemonType.Dragon: return t("type_dragon")
      case PokemonType.Electric: return t("type_electric")
      case PokemonType.Fairy: return t("type_fairy")
      case PokemonType.Fighting: return t("type_fighting")
      case PokemonType.Fire: return t("type_fire")
      case PokemonType.Flying: return t("type_flying")
      case PokemonType.Ghost: return t("type_ghost")
      case PokemonType.Grass: return t("type_grass")
      case PokemonType.Ground: return t("type_ground")
      case PokemonType.Ice: return t("type_ice")
      case PokemonType.Normal: return t("type_normal")
      case PokemonType.Poison: return t("type_poison")
      case PokemonType.Psychic: return t("type_psychic")
      case PokemonType.Rock: return t("type_rock")
      case PokemonType.Steel: return t("type_steel")
      case PokemonType.Water: return t("type_water")
    }

    return ""
  }

  const getTypeList = () => {
    if(types.current.length) {
      return types.current
    }

    const list = [] as PMTypeItem[]
    for (const item in PokemonType) {
      if (!isNaN(Number(item))) {
        const _t = +item as unknown as PokemonType
        list.push({
          type: _t,
          name: getTypeName(_t)
        })
      }
    }

    types.current = list
    return list
  }

  return {
    getTypeList, getTypeName
  }
}