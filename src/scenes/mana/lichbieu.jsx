import React, { useState, useEffect } from "react";

const Lichbieu = ({ user, sche, weeekkk, columnIndex }) => {
  const filteredSche = sche.filter(
    (item) =>
      item.employeeId === user &&
      item.workScheduleTimeIn.split("T")[0] === weeekkk[columnIndex]
  );

  let workScheduleDestination = null;
  let workSchedulePlan = null;
  if (filteredSche.length === 1) {
    workScheduleDestination = filteredSche[0].workScheduleDestination;
    workSchedulePlan = filteredSche[0].workSchedulePlan;
  }

  return (
    <>
      {workSchedulePlan}
      <br></br>
      {workScheduleDestination}
    </>
  );
};

export default Lichbieu;
