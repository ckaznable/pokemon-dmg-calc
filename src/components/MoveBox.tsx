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
    moveType, setMoveType
  } = useMove()

  const { t } = useTranslation()

  const onChangePower = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isValidNumberString(e.target.value)) {
      setPower(0)
      return
    }

    setPower(+e.target.value)
  }

  return (
    <fieldset className="p-3 border-2 border-slate-500 rounded text-xl">
      <legend>{t("title_move")}</legend>

      <div className="gap-2 flex flex-row flex-wrap text-base from-neutral-700">
        <input type="number" min="0" placeholder={t("placeholder_power") as string} value={power || ""} onChange={onChangePower} />
        <TypeSelect value={type} onChange={setType} />
        <select value={moveType} onChange={e => setMoveType(e.target.value as unknown as MoveType)}>
          <option value={MoveType.Physical}>{t("move_physical")}</option>
          <option value={MoveType.Special}>{t("move_special")}</option>
        </select>
      </div>
    </fieldset>
  )
}

export default React.memo(MoveBox)