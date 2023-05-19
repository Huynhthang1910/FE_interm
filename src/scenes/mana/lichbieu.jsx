import React, { useState, useEffect } from "react";

const Lichbieu = ({ user, sche, weeekkk, columnIndex }) => {
  const filteredSche = sche.filter(
    (item) =>
      item.employeeId === user &&
      item.workScheduleTimeIn.split("T")[0] === weeekkk[columnIndex]
  );

  let workSchedulePlace = null;
  let workSchedulePlan = null;
  if (filteredSche.length === 1) {
    workSchedulePlace = filteredSche[0].workSchedulePlace;
    workSchedulePlan = filteredSche[0].workSchedulePlan;
  }

  return (
    <>
      {workSchedulePlace}
      <br></br>
      {workSchedulePlan}
    </>
  );
};

export default Lichbieu;
