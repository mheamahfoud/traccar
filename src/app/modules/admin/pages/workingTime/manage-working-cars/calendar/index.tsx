import React, { useState } from "react";
import { render } from "react-dom";
import events from "./events";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop'

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import { useQueryResponse, useQueryResponseData, useQueryResponseSetLoading } from "../core/QueryResponseProvider";
import { useListView } from "../core/ListViewProvider";
import { useMutation, useQueryClient } from "react-query";
import { QUERIES } from "../../../../../../../_metronic/helpers";
import { dublicate } from "../core/_requests";
const localizer = momentLocalizer(moment)



const allViews = ["day", "month", "week"]

const MYCalendar = () => {
  const setLoading= useQueryResponseSetLoading();
  const [date, setDate] = useState(new Date());
  const { setItemIdForUpdate } = useListView();
  const { query } = useQueryResponse();
  const queryClient = useQueryClient()
  const items = useQueryResponseData();
  const handleEventSelected = (event) => {
    setItemIdForUpdate(event?.id)

  }


  const onEventDrop: withDragAndDropProps['onEventDrop'] = data => {

    let temp = {
      shift_id: data.event.id,
      date: moment(data.start).format("YYYY-MM-DD")

    }
    setLoading(true)
    dublicateEvent.mutateAsync(temp)
  }
  const dublicateEvent = useMutation((data:any) => dublicate(data), {
    onSuccess: () => {
      setLoading(false)
    //  queryClient.mutate({ id: new Date(), title: 'Do Laundry' })
    queryClient.invalidateQueries([`${QUERIES.WORKING_CARS_DAYS_LIST_VALUES}-${query}`])
      // queryClient.setQueriesData([`${QUERIES.WORKING_CARS_DAYS_LIST_VALUES}-${query}`], (old)=>
      // [...old, data]
      // )
    },
    onError: () => { 
      setLoading(false)
    },
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

