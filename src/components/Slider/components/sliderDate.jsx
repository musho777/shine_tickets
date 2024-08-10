import { LocationSvg } from "../../svg"
import { useTranslation } from "react-i18next"

export const SliderDate = ({ date, hall, place }) => {
  const { t } = useTranslation()
  return <div className='BanerPrimera'>
    <div className='Primera'>
      <p className='Primerap'>{t('Primera')}</p>
      <p className='PrimeraDate'>{date}</p>
    </div>
    <div className='BanerLocation'>
      <LocationSvg />
      <p className='BanerDivInfoPlace'>{hall} {place}</p>
    </div>
  </div>
}
