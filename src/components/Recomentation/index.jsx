import { useTranslation } from "react-i18next";
import { TopEvents } from "../TopEvents/TopEvents";

export const Recomentation = ({ rec = [] }) => {
  const { t } = useTranslation();
  return <div>
    <div className='EventTitle'>
      <h2>{t('RecommendTickets')}</h2>
      <div className='RecDiv'>
        {rec.map((elm, i) => {
          const dateObject = new Date(elm.sessions[0]?.date);
          let day = dateObject.getDate();
          let month = dateObject.getMonth();
          var currentDayOfWeek = daysOfWeek[dateObject?.getDay()];
          return <TopEvents
            key={i}
            image={`https://api.shinetickets.com/images/${elm.image}`}
            title={elm?.title}
            category={elm.category}
            location={elm?.sessions[0]?.hallId?.location}
            location_en={elm?.sessions[0]?.hallId?.location_en}
            location_ru={elm?.sessions[0]?.hallId?.location_ru}
            data={elm}
            day={day}
            id={elm._id}
            time={elm?.sessions[0]?.time}
            months={months[month]}
            currentDayOfWeek={currentDayOfWeek}
            price={`${elm.sessions[0]?.priceStart} - ${elm.sessions[0]?.priceEnd} AMD`}
          />
        })}
      </div>
    </div>
  </div>
}