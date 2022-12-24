import { MoveType } from "@/types.d"
import { isValidNumberString } from "@/util"
import React from "react"
import { useTranslation } from "react-i18next"
import TypeSelect from "./TypeSelect"
import useMove from "@/hooks/useMove"

function MoveBox() {
  const {
    type, setType,
    power, setPower,
    moveType, setMoveType,
    sameTypeAtkBonus, setSameTypeAtkBonus,
  } = useMove()

  const { t } = useTranslation()

  const onChangePower = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isValidNumberString(e.target.value)) {
      setPower(0)
      return
    }

    setPower(+e.target.value)
  }

  const onChangeSTAB = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isValidNumberString(e.target.value)) {
      setSameTypeAtkBonus(0)
      return
    }

    setSameTypeAtkBonus(+e.target.value)
  }

  return (
    <fieldset className="p-3 border-2 border-slate-500 rounded text-xl">
      <legend>{ t("title_move") }</legend>

      <div className="gap-2 flex flex-col flex-wrap text-base from-neutral-700">
        <div className="gap-2 flex items-center">
          <span>{ t("title_power") }:</span>
          <input type="number" min="0" placeholder={t("placeholder_power") as string} value={power || ""} onChange={onChangePower} />
        </div>

        <div className="gap-2 flex items-center">
          <span>{ t("title_STAB") }:</span>
          <input type="number" min="0" placeholder={t("placeholder_STAB") as string} value={sameTypeAtkBonus || ""} onChange={onChangeSTAB} />
        </div>

        <div className="flex gap-2 items-center">
          <TypeSelect value={type} onChange={setType} />
          <select value={moveType} onChange={e => setMoveType(e.target.value as unknown as MoveType)}>
            <option value={MoveType.Physical}>{t("move_physical")}</option>
            <option value={MoveType.Special}>{t("move_special")}</option>
          </select>
        </div>
      </div>
    </fieldset>
  )
}

export default React.memo(MoveBox)