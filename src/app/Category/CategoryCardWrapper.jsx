import { TopEvents } from "../../components/TopEvents/TopEvents"
import { ShowAllButton } from "../../components/Button/ShowAllButton"
import { PuffLoader } from "react-spinners";

export const CategoryCardWrapper = ({ loading, data, setPage, page, showButton }) => {
    var months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return <div>
        <div className='EventTitle' />
        <div id='CategoryCardWrapper' className="TopEventWrapper">
            {
                data.length > 0 && data.map((elm, i) => {
                    let date = elm.dates[0].start_date
                    let day = date.slice(8, 10)
                    let month = date.slice(5, 7)
                    if (month[0] == 0) {
                        month = month[1]
                    }
                    let time = date.slice(11, 16)
                    return <TopEvents
                        key={i}
                        day={day}
                        id={elm.id}
                        image={`http://localhost:8000/${elm.main_image}`}
                        title={elm.name}
                        category={elm.category.name}
                        location={elm?.place}
                        time={time}
                        months={months[month]}
                        price={`${elm?.price} - ${elm?.price} AMD`}
                    />
                })}
        </div>
        {showButton && <div className="ShowAllButtonWrappr">
            <ShowAllButton loading={loading} onClick={() => setPage(page + 1)} />
        </div>
        }
        {!showButton && loading &&
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <PuffLoader size={35} color="#FEE827" />
            </div>
        }
    </div>
}