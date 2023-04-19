import React from "react";

import Scheduler, {
  Resource,
  View,
  Scrolling,
} from "devextreme-react/scheduler";

const currentDate = new Date(2021, 3, 11);

const groups = ["TruSo"];

// const appointments = generateAppointments(startDay, endDay, startDayHour, endDayHour);

function SchedulerAdmin() {
  return (
    <Scheduler
      timeZone="America/Los_Angeles"
      groups={groups}
      defaultCurrentView="Vertical Grouping"
      defaultCurrentDate={currentDate}
      startDayHour={9}
      endDayHour={18}
      crossScrollingEnabled={true}
      showAllDayPanel={true}
    >
      <View
        name="Vertical Grouping"
        type="workWeek"
        groupOrientation="vertical"
        cellDuration={60}
        intervalCount={2}
      />
      <View
        name="Horizontal Grouping"
        type="workWeek"
        cellDuration={30}
        intervalCount={2}
      />
      <Resource fieldExpr="TruSo" allowMultiple={false} label="Priority" />
    </Scheduler>
  );
}

export default SchedulerAdmin;
