import { useTranslation } from "react-i18next"
import { Button } from "../../Button"

export const ButtonWrapper = ({ id, name }) => {
  const { t } = useTranslation()

  return <div className='BanerButton'>
    <Button onClick={() => window.location = `/BuyTickets/${elm?.id}`} title={t('BuyNow')} />
    <p onClick={() => window.location = `/Single/${elm?.id}/${elm?.name}`}>{t('seeMore')}</p>
  </div>
}