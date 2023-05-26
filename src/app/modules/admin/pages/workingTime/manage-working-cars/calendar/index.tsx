import React, { useState } from "react";
import { render } from "react-dom";
import events from "./events";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop'

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import { useQueryResponse, useQueryResponseData } from "../core/QueryResponseProvider";
import { useListView } from "../core/ListViewProvider";
import { useMutation, useQueryClient } from "react-query";
import { QUERIES } from "../../../../../../../_metronic/helpers";
import { dublicate } from "../core/_requests";
const localizer = momentLocalizer(moment)



const allViews = ["day", "month", "week"]

const MYCalendar = () => {
    const [date, setDate] = useState(new Date());
    const { setItemIdForUpdate } = useListView();
    const {query} = useQueryResponse();
    const queryClient = useQueryClient()
    const items = useQueryResponseData()
    const handleEventSelected = (event) => {
        setItemIdForUpdate(event?.id)

    }

    // const onEventResize: withDragAndDropProps['onEventResize'] = data => {
    //     const { start, end } = data
    //     console.log(data)

    // }

    const onEventDrop: withDragAndDropProps['onEventDrop'] = data => {
        console.log(moment(data.start).format("YYYY-MM-DD"))
        dublicateEvent.mutateAsync(data)
    }
    const dublicateEvent = useMutation((data) => dublicate(data), {
        onSuccess: () => {
          // ✅ update detail view directly
          queryClient.invalidateQueries([`${QUERIES.WORKING_CARS_DAYS_LIST_VALUES}-${query}`])
        },
        onError: () => {},
      })
    const handleSlotSelected = (slotInfo) => {
        return false
    }
    const DnDCalendar = withDragAndDrop(Calendar)

    return (<div style={{ height: 700 }}>
        <DnDCalendar
            date={date}
            onNavigate={date => setDate(date)}
            localizer={localizer}
            events={items}
            step={60}
            defaultDate={moment().toDate()}
            views={["day", "month", "week"]}
            popup={true}
            onSelectEvent={event => handleEventSelected(event)}
            onSelectSlot={slotInfo => handleSlotSelected(slotInfo)}
            startAccessor="start"
            endAccessor="end"
            selectable
           // resizable
            onEventDrop={onEventDrop}
          //  onEventResize={onEventResize}
        />
    </div>)

}
export { MYCalendar }

