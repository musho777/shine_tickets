import { ShowAllButton } from "../../components/Button/ShowAllButton"
import { useTranslation } from "react-i18next";
import { Card } from "./Card";

export const AllEventsWrappers = ({ loading, data, setPage, page, showButton }) => {
  const { t } = useTranslation()
  var months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return <div>
    <div className='EventTitle'>
      <h2>{t('AllEvents')}</h2>
    </div>
    <div id='CategoryCardWrapper' className="AllTopEventWrapper">
      {
        data.length > 0 && data.map((elm, i) => {
          const dateObject = new Date(elm?.date);
          let day = dateObject.getDate();
          if (day <= 9) {
            day = `0${day}`
          }
          let month = dateObject.getMonth();
          let month1 = dateObject.getMonth();
          let year = dateObject.getFullYear()
          if (month1 <= 9) {
            month1 = `0${month1 + 1}`
          }
          var currentDayOfWeek = daysOfWeek[dateObject.getDay()];
          if (elm._id != "65d222f051424e16acf10852")
            return <Card
              key={i}
              day={day}
              time={elm.time}
              id={elm.eventId?._id}
              image={`https://api.shinetickets.com/images/${elm.eventId
                .largeImage}`}
              year={year}
              month1={month1}
              category={elm.eventId.category}
              location={elm?.location}
              location_en={elm?.hallId?.location_en}
              location_ru={elm?.hallId?.location_ru}
              hall={elm.hallId?.place}
              hall_en={elm.hallId?.place_en}
              hall_ru={elm.hallId?.place_ru}
              place={elm.hallId?.hall}
              place_ru={elm.hallId?.hall_ru}
              place_en={elm.hallId?.hall_en}
              title={elm?.eventId?.title}
              months={months[month]}
              currentDayOfWeek={currentDayOfWeek}
              data={elm}
              price={`${elm?.priceStart} - ${elm?.priceEnd} AMD`}
            />
        })}
    </div>
    {showButton && <div className="ShowAllButtonWrappr">
      <ShowAllButton loading={loading} onClick={() => setPage(page + 1)} />
    </div>}
  </div>
};