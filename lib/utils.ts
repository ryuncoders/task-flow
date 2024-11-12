export function getWeekDateWithWeekdays() {
  const today = new Date();

  const dayOfWeek = today.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  // const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const weekDates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + mondayOffset + i);

    const [weekdays, month, day, ...time] = date.toString().split(" ");

    weekDates.push({
      weekdays,
      month,
      day,
    });
  }

  return weekDates;
}
