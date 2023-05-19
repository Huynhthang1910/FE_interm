import React from "react";

const Lichbieu = ({ user, sche, weeekkk, columnIndex }) => {
  const filteredSche = sche.filter(
    (item) =>
      item.employeeId === user &&
      item.workScheduleTimeIn.split("T")[0] === weeekkk[columnIndex]
  );
  // filteredSche.sort((a, b) => {
  //   const timeInA = new Date(a.workScheduleTimeIn);
  //   const timeInB = new Date(b.workScheduleTimeIn);
  //   return timeInA - timeInB;
  // });

  return (
    <>
      {filteredSche.map((item, index) => {
        const workScheduleTimeIn = new Date(item.workScheduleTimeIn);
        const workScheduleTimeOut = new Date(item.workScheduleTimeOut);

        const formattedTimeIn = `${workScheduleTimeIn.getHours()}:${workScheduleTimeIn
          .getMinutes()
          .toString()
          .padStart(2, "0")}`;
        const formattedTimeOut = `${workScheduleTimeOut.getHours()}:${workScheduleTimeOut
          .getMinutes()
          .toString()
          .padStart(2, "0")}`;

        return (
          <React.Fragment key={index}>
            <td>
              Công Việc: {item.workSchedulePlan}
              <br />
              Tại: {item.workScheduleDestination}
              <br />
              Time In: {formattedTimeIn} - Time Out: {formattedTimeOut}
              <br />
            </td>
            <br />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default Lichbieu;
