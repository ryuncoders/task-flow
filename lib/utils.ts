import { isWithinInterval, startOfWeek } from "date-fns";

export function getWeeklyColors(timeLine: {
  dateRange: [string, string];
  color: string;
}): string[] {
  // 초기 주간 배열을 모두 흰색으로 설정
  const weeklyColors = Array(7).fill("#ffffff");

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
