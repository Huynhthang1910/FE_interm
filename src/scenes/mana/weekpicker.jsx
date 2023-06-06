import React, { useState, useEffect } from "react";

const WeekPicker = ({ weeekkk, setWeeekkk }) => {
  const [selectedWeek, setSelectedWeek] = useState("");

  const getCurrentWeek = () => {
    const now = new Date();
    const year = now.getFullYear();
    const week = getISOWeekNumber(now);
    return `${year}-W${week}`;
  };

  const handleWeekChange = (event) => {
    const selectedWeekValue = event.target.value;
    setSelectedWeek(selectedWeekValue);
    const weekDays = getWeekDays(selectedWeekValue);
    setWeeekkk(weekDays); // Gán mảng weekDays vào setWeek trong component cha
    console.log("aaaaaaa", weeekkk);
  };

  const getISOWeekNumber = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() + 4 - (date.getDay() || 7));
    const yearStart = new Date(startOfWeek.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(
      ((startOfWeek - yearStart) / 86400000 + 1) / 7
    );
    return weekNumber;
  };

  const getWeekDays = (weekValue) => {
    const [year, week] = weekValue.split("-W");
    const date = new Date(year, 0, 1 + (week - 1) * 7);
    const startDay = new Date(date.setDate(date.getDate() - date.getDay() + 1));
    const days = [];

    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startDay);
      currentDay.setDate(startDay.getDate() + i);
      const dayString = `${currentDay.getFullYear()}-${(
        currentDay.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${currentDay.getDate().toString().padStart(2, "0")}`;
      days.push(dayString);
    }

    return days;
  };

  useEffect(() => {
    setSelectedWeek(getCurrentWeek());
  }, []);

  useEffect(() => {
    console.log(selectedWeek);
  }, [selectedWeek]);

  return (
    <div>
      <label htmlFor="weekpicker">Select a week:</label>
      <input
        type="week"
        id="weekpicker"
        value={selectedWeek}
        onChange={handleWeekChange}
      />
      <br></br>
      <br></br>
    </div>
  );
};

export default WeekPicker;
