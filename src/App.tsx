import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"
import MoveBox from "./components/MoveBox"
import StatusBox from "./components/StatusBox"
import usePMStatus from "./hooks/usePMStatus"
import useMove from "./hooks/useMove"
import { calcDamage } from "./util"

function App() {
  const { t } = useTranslation()
  const { attacker, defender, ...pms } = usePMStatus()
  const move = useMove()

  const dmg = calcDamage(attacker, defender, move)

  return (<>
    <Helmet>
      <title>{ t("app_name") }</title>
    </Helmet>

    <div className="container flex items-center justify-center px-10 mx-auto flex-col gap-20 py-8 overflow-auto">
      <div className="bg-green-400 w-[100%] h-[20px] relative">
        <div className="bg-red-500 h-[100%] text-white font-xl flex items-center justify-end pr-2" style={{width: `${dmg > 100 ? 100 : dmg}%`}}>{ dmg }%</div>
        <div className="bg-red-400 h-[100%] text-white font-xl flex items-center justify-end pr-2 absolute left-0 top-0 bottom-0" style={{ width: `${dmg * 0.85 > 100 ? 100 : dmg * 0.85}%` }}>{ Math.round(dmg * 0.85) }%</div>
      </div>

      <div className="flex flex-row flex-wrap justify-center items-center gap-20">
        <StatusBox
          title={t("title_attacker")}
          status={attacker}
          setter={{
            lv: pms.setAttackerLV,
            bp: pms.setAttackerBP,
            iv: pms.setAttackerIV,
            ss: pms.setAttackerSS,
            types: pms.setAttackerTypes,
            nature: pms.setAttackerNature,
          }}
        />
        <StatusBox
          title={t("title_defender")}
          status={defender}
          setter={{
            lv: pms.setDefenderLV,
            bp: pms.setDefenderBP,
            iv: pms.setDefenderIV,
            ss: pms.setDefenderSS,
            types: pms.setDefenderTypes,
            nature: pms.setDefenderNature,
          }}
        />

        <MoveBox />
      </div>
    </div>
  </>)
}

export default App