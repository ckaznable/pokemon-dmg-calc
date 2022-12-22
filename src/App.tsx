import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"
import MoveBox from "./components/MoveBox"
import StatusBox from "./components/StatusBox"
import usePMStatus from "./hooks/usePMStatus"
import useMove from "./hooks/useMove"

function App() {
  const { t } = useTranslation()
  const { attacker, defender, ...pms } = usePMStatus()
  const move = useMove()

  return (<>
    <Helmet>
      <title>{ t("app_name") }</title>
    </Helmet>

    <div className="container h-screen flex items-center justify-center mx-auto flex-col gap-20">
      <div className="flex flex-row flex-wrap gap-20">
        <StatusBox
          title={t("title_attacker")}
          status={attacker}
          setter={{
            lv: pms.setAttackerLV,
            bp: pms.setAttackerBP,
            iv: pms.setAttackerIV,
            ss: pms.setAttackerSS,
            types: pms.setAttackerTypes,
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
          }}
        />
      </div>

      <MoveBox />
    </div>
  </>)
}

export default App