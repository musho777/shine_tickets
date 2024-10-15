import { useTranslation } from "react-i18next"
import { Button } from "../../Button"

export const ButtonWrapper = ({ id, name, dateId }) => {
  const { t } = useTranslation()

  return <div className='BanerButton'>
    <Button onClick={() => window.location = `/BuyTickets/${id}-${dateId}`} title={t('BuyNow')} />
    <p onClick={() => window.location = `/Single/${id}/${name}`}>{t('seeMore')}</p>
  </div>
}