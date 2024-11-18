import { isWithinInterval, startOfWeek } from "date-fns";

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

export function getWeeklyColors(timeLine: {
  dateRange: [string, string];
  color: string;
}): string[] {
  // 초기 주간 배열을 모두 흰색으로 설정
  const weeklyColors = Array(7).fill("rgba(0,0,0,0)");

  const startDate = new Date(timeLine.dateRange[0]).setHours(0, 0, 0, 0);
  const endDate = new Date(timeLine.dateRange[1]).setHours(0, 0, 0, 0);

  const thisMonday = startOfWeek(startDate, { weekStartsOn: 1 });

  // 이번 주 날짜 배열 생성 (월~일)
  const weeklyDates = Array.from(
    { length: 7 },
    (_, i) =>
      new Date(
        thisMonday.getFullYear(),
        thisMonday.getMonth(),
        thisMonday.getDate() + i
      )
  );

  // 주간 날짜와 timeLine의 dateRange 비교
  weeklyDates.forEach((date, index) => {
    // 주간 날짜가 dateRange 내에 있을 경우 색상을 적용
    if (isWithinInterval(date, { start: startDate, end: endDate })) {
      weeklyColors[index] = timeLine.color; // 해당 날짜에 색상 적용
    }
  });

  return weeklyColors;
}
