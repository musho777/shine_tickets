import { ShowAllButton } from "../../components/Button/ShowAllButton"
import { useTranslation } from "react-i18next";
import { Card } from "./Card";
import { truncateText } from "@/src/function/function";

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
        data.map((elm, i) => {
          let date = elm.dates[0].start_date
          console.log(elm.dates[0].start_date)
          const dateObject = new Date(elm?.date);
          let day = date.slice(8, 10);
          let month = date.slice(5, 7);
          let time = date.slice(11, 16)
          if (month[0] == 0) {
            month = month[1]
          }
          let month1 = dateObject.getMonth();
          let year = dateObject.getFullYear()
          if (month1 <= 9) {
            month1 = `0${month1 + 1}`
          }
          var currentDayOfWeek = daysOfWeek[dateObject.getDay()];
          return <Card
            key={i}
            day={day}
            time={time}
            id={elm.eventId?._id}
            image={`http://localhost:8000/${elm.cover_image}`}
            year={year}
            month1={month1}
            category={elm.category.name}
            date={elm.dates[0].start_date}
            location={elm?.address}
            hall={elm.address}
            place={elm.address}
            title={elm?.name}
            months={truncateText(months[month], 4)}
            currentDayOfWeek={currentDayOfWeek}
            data={elm}
            price={`${elm?.price} - ${elm?.price} AMD`}
          />
        })}
    </div>
    {showButton && <div className="ShowAllButtonWrappr">
      <ShowAllButton loading={loading} onClick={() => setPage(page + 1)} />
    </div>}
  </div>
};