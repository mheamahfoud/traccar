import React from "react";
import { render } from "react-dom";
import events from "./events";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import { useQueryResponseData } from "../core/QueryResponseProvider";
const localizer = momentLocalizer(moment)



const allViews = ["day", "month", "week"]

const MYCalendar = () => {
    const items = useQueryResponseData()
    return (<div style={{ height: 700 }}>
        <Calendar
            localizer={localizer}
            events={items}
            step={60}
            views={["day", "month", "week"]}
            defaultDate={new Date()}
            popup={false}
        />
    </div>)

}
export { MYCalendar }

