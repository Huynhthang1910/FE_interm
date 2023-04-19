import React from "react";
import Scheduler from "devextreme-react/scheduler";
import { CheckBox } from "devextreme-react/check-box";
import { useState, useCallback } from "react";
import notify from "devextreme/ui/notify";

import * as AspNetData from "devextreme-aspnet-data-nojquery";

const url = "http://localhost:3000/data";
const dataSource = AspNetData.createStore({
  key: "workScheduleId",
  loadUrl: `${url}/Get`,
  insertUrl: `${url}/Post`,
  updateUrl: `${url}/Put`,
  deleteUrl: `${url}/Delete`,
  onBeforeSend(_, ajaxOptions) {
    ajaxOptions.xhrFields = { withCredentials: true };
  },
});
const currentDate = new Date(2023, 3, 29);
const views = ["day", "week"];

function Calendar() {
  const [editing, setEditing] = useState({
    allowAdding: true,
    allowDeleting: true,
    allowResizing: true,
    allowDragging: true,
    allowUpdating: true,
  });

  const onAllowAddingChanged = useCallback(
    (e) => {
      setEditing({ ...editing, allowAdding: e.value });
    },
    [editing]
  );

  const onAllowDeletingChanged = useCallback(
    (e) => {
      setEditing({ ...editing, allowDeleting: e.value });
    },
    [editing]
  );

  const onAllowResizingChanged = useCallback(
    (e) => {
      setEditing({ ...editing, allowResizing: e.value });
    },
    [editing]
  );

  const onAllowDraggingChanged = useCallback(
    (e) => {
      setEditing({ ...editing, allowDragging: e.value });
    },
    [editing]
  );

  const onAllowUpdatingChanged = useCallback(
    (e) => {
      setEditing({ ...editing, allowUpdating: e.value });
    },
    [editing]
  );

  const showToast = useCallback((event, value, type) => {
    notify(`${event} "${value}" task`, type, 800);
  }, []);

  const showAddedToast = useCallback(
    (e) => {
      showToast("Added", e.appointmentData.text, "success");
    },
    [showToast]
  );

  const showUpdatedToast = useCallback(
    (e) => {
      showToast("Updated", e.appointmentData.text, "info");
    },
    [showToast]
  );

  const showDeletedToast = useCallback(
    (e) => {
      showToast("Deleted", e.appointmentData.text, "warning");
    },
    [showToast]
  );

  return (
    <>
      <Scheduler
        timeZone="America/Los_Angeles"
        dataSource={dataSource}
        views={views}
        // demo API
        remoteFiltering={true}
        dateSerializationFormat="yyyy-MM-ddTHH:mm:ssZ"
        textExpr="Text"
        startDateExpr="StartDate"
        endDateExpr="EndDate"
        allDayExpr="AllDay"
        recurrenceRuleExpr="RecurrenceRule"
        recurrenceExceptionExpr="RecurrenceException"
        //
        defaultCurrentView="week"
        defaultCurrentDate={currentDate}
        startDayHour={9}
        endDayHour={19}
        height={600}
        editing={editing}
        onOptionChanged={(e) => {
          switch (e.fullName) {
            case "editing.allowAdding":
              onAllowAddingChanged(e);
              break;
            case "editing.allowDeleting":
              onAllowDeletingChanged(e);
              break;
            case "editing.allowResizing":
              onAllowResizingChanged(e);
              break;
            case "editing.allowDragging":
              onAllowDraggingChanged(e);
              break;
            case "editing.allowUpdating":
              onAllowUpdatingChanged(e);
              break;
            default:
              break;
          }
        }}
        onAppointmentAdded={showAddedToast}
        onAppointmentUpdated={showUpdatedToast}
        onAppointmentDeleted={showDeletedToast}
      />
    </>
  );
}

export default Calendar;
