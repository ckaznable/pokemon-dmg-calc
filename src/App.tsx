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
            mod: pms.setAttackerMod,
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
            mod: pms.setDefenderMod,
          }}
        />

        <MoveBox />
      </div>
    </div>

    <a href="https://github.com/ckaznable/pokemon-dmg-calc" target="_blank">
      <svg width="80" height="80" viewBox="0 0 250 250" id="github-icon" aria-hidden="true">
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
        <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style={{ transformOrigin: "130px 106px" }} />
        <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" />
      </svg>
    </a>
  </>)
}

export default App