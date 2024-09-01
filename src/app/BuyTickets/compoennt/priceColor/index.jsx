import { useTranslation } from "react-i18next";

export const PriceColor = ({ claseName, data, ChoosePrice }) => {
  const { t } = useTranslation();

  return <div className={claseName}>
    <div onClick={() => ChoosePrice(null)} style={{ backgroundColor: '#7d4e5a' }}>{t('All')}</div>
    {data && Object.entries(data).map(([color, price]) => {
      return <div key={color} onClick={() => ChoosePrice(color)} style={{ backgroundColor: color }}>{price}</div>
    })}
  </div>
}