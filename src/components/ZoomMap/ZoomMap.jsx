import React, { useEffect, useState } from 'react';
import AramKhachatryan from '../photoMap/AramKhachatryanHall'
import PhotoCoordinatesByColor from '../photoMap'
import KarenDemerchyanMec from '../photoMap/Karendemrjyanmec'
import './styles.css';
import { MapInteractionCSS } from 'react-map-interaction';
import Paronyan from '../photoMap/Paronyan';

export const ZoomMap = ({ event, getSinglPage, value, setValue, isParonyanEvent, paronyanSeans, open, price }) => {
    const [isInteracting, setIsInteracting] = useState(false);
    const handleChange = (newValue) => {
        setIsInteracting(true)
        setValue(newValue);
        setIsInteracting(true)
    };
    useEffect(() => {
        const interactionTimeout = 250;
        let timeoutId;
        if (isInteracting) {
            timeoutId = setTimeout(() => {
                setIsInteracting(false);
            }, interactionTimeout);
        } else {
            clearTimeout(timeoutId);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [isInteracting, setValue]);

    const [activeTicket, setActiveTicket] = useState({})
    return (
        <MapInteractionCSS
            value={value}
            onChange={handleChange}
            maxScale={1.5}
        >
            {(event?.sessions[0]?.hallId?._id === '65ce79a7603a99ef4d2ba0a1' && !isParonyanEvent) &&
                <PhotoCoordinatesByColor
                    value={value}
                    price={price}
                    isInteracting={isInteracting}
                    places={getSinglPage.events?.event?.sessions[0].places}
                    eventId={getSinglPage.events.event?._id}
                    sessionID={getSinglPage.events.event?.sessions[0]._id}
                    soldTickets={getSinglPage.events.event?.sessions[0]?.soldTickets}
                    secion={getSinglPage.events.event?.sessions[0]?.price}
                />
            }
            {
                (event?.sessions[0]?.hallId?._id === '65ce79e5603a99ef4d2ba0a5' && !isParonyanEvent) &&
                <KarenDemerchyanMec
                    value={value}
                    price={price}
                    isInteracting={isInteracting}
                    places={getSinglPage.events?.event?.sessions[0].places}
                    eventId={getSinglPage.events.event?._id}
                    sessionID={getSinglPage.events.event?.sessions[0]._id}
                    soldTickets={getSinglPage.events.event?.sessions[0]?.soldTickets}
                    secion={getSinglPage.events.event?.sessions[0]?.price}
                />
            }
            {
                (event?.sessions[0]?.hallId?._id === "65ce79ca603a99ef4d2ba0a3" && !isParonyanEvent) &&
                <AramKhachatryan
                    value={value}
                    price={price}
                    isInteracting={isInteracting}
                    places={getSinglPage.events?.event?.sessions[0].places}
                    eventId={getSinglPage.events.event?._id}
                    sessionID={getSinglPage.events.event?.sessions[0]._id}
                    soldTickets={getSinglPage.events.event?.sessions[0]?.soldTickets}
                    secion={getSinglPage.events.event?.sessions[0]?.price}
                />
            }
            {
                event?.sessions[0]?.hallId?._id == '65ce7a13603a99ef4d2ba0a7' &&
                <Paronyan
                    value={value}
                    isInteracting={isInteracting}
                    eventId={getSinglPage.events.event?._id}
                    soldTickets={getSinglPage.events.event?.sessions[0]?.soldTickets}
                    grupID={getSinglPage.events?.event?.ParonyanGroup_id}
                    Timeline={paronyanSeans}
                    sessionID={getSinglPage.events.event?.sessions[0]._id}
                    id={getSinglPage?.events?.event?.ParonyanEventId}
                    open={open}
                    activeTicket={activeTicket}
                    setActiveTicket={(e) => setActiveTicket(e)}
                    places={getSinglPage.events?.event?.sessions[0].places}
                />
            }
            {
                event?.isParonyanEvent &&
                <Paronyan
                    value={value}
                    isInteracting={isInteracting}
                    eventId={getSinglPage.events.event?._id}
                    soldTickets={getSinglPage.events.event?.sessions[0]?.soldTickets}
                    grupID={getSinglPage.events?.event?.ParonyanGroup_id}
                    sessionID={getSinglPage.events.event?.sessions[0]._id}
                    id={getSinglPage?.events?.event?.ParonyanEventId}
                    open={open}
                    activeTicket={activeTicket}
                    setActiveTicket={(e) => setActiveTicket(e)}
                    places={getSinglPage.events?.event?.sessions[0].places}
                />
            }
        </MapInteractionCSS>
    );
};

