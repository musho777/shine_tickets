import { TopEvents } from "../../components/TopEvents/TopEvents"
import { ShowAllButton } from "../../components/Button/ShowAllButton"
import { PuffLoader } from "react-spinners";

export const CategoryCardWrapper = ({ loading, data, setPage, page, showButton, total }) => {
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
                    const dateObject = new Date(elm?.date);
                    let day = dateObject?.getDate();
                    let month = dateObject?.getMonth();
                    var currentDayOfWeek = daysOfWeek[dateObject?.getDay()];
                    if (elm?.eventId) {
                        if (elm._id != "65d222f051424e16acf10852")
                            return <TopEvents
                                key={i}
                                day={day}
                                id={elm.eventId._id}
                                image={`https://api.shinetickets.com/images/${elm.eventId?.image}`}
                                title={elm.title}
                                category={elm.eventId?.category}
                                location={elm?.hallId?.location}
                                location_en={elm?.eventId?.hallId?.location_en}
                                location_ru={elm?.eventId?.hallId?.location_ru}
                                time={elm.time}
                                hall={elm.hallId.hall}
                                hall_en={elm.hallId.hall_en}
                                hall_ru={elm.hallId.hall_ru}
                                place={elm.hallId.place}
                                place_en={elm.hallId.place_en}
                                place_ru={elm.hallId.place_ru}

                                months={months[month]}
                                currentDayOfWeek={currentDayOfWeek}
                                data={elm.eventId}
                                price={`${elm?.priceStart} - ${elm?.priceEnd} AMD`}
                            />
                    }
                    else {
                        const matchResult = elm?.ParonyanTime?.match(/(\d+)([\s\S]*?)(<div[\s\S]*?<\/div>)([\s\S]*?)(\d+:\d+)/);
                        let day = ''
                        let divContent = ''
                        if (matchResult?.length > 0) {
                            day = matchResult[1];
                            divContent = matchResult[3];
                        }

                        const parser = new DOMParser();
                        const doc = parser?.parseFromString(divContent, "text/html");
                        const divElement = doc?.body?.firstChild;
                        divElement?.removeChild(divElement?.querySelector('br'));
                        const linesArray = Array.from(divElement?.childNodes)
                            .filter(node => node?.nodeType === 3) // Filter out non-text nodes
                            .map(node => node.textContent?.trim());
                        let time = ''
                        if (matchResult?.length > 0)
                            time = matchResult[5];


                        return <TopEvents
                            key={i}
                            id={elm._id}
                            image={elm.ParonyanImg}
                            category={
                                {
                                    name: "Թատրոն",
                                    name_en: "Theatre",
                                    name_ru: "Театр",
                                    _id: "657b00c67a91070546630967"

                                }
                            }
                            location={"Երևան"}
                            location_en={"Yerevan"}
                            location_ru={"Ереван"}
                            hall={elm?.ParonyanGroup_name}
                            hall_en={'H. Paronyan State Theater'}
                            hall_ru={'A.Государственный театр Пароняна'}
                            currentDayOfWeek={linesArray[1]}
                            time={time}
                            time2={elm.time}
                            months={linesArray[0]}
                            day={day}
                            data={{
                                title: elm.ParonyanName,
                                title_ru: elm.ParonyanName,
                                title_en: elm.ParonyanName
                            }}
                        />
                    }
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