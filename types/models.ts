export interface IGoal {
  id: number;
  title: string;
  description: string | null;
  period: number;
}

export interface ITask {
  id: number;
  text: string; // Task 내용 (예: "1회, 2회")
  complete: boolean;
  date: string; // Task 날짜 (ISO 형식 또는 "YYYY-MM-DD")
}

export interface ITimeLine {
  id: number;
  title: string; // TimeLine 제목 (예: "1단원")
  tasks: ITask[]; // 관련 Task 목록
  color: string;
  dateStart?: Date;
  dateEnd?: Date;
  dateTimeLineColor?: string[] | null;
}

export interface IWorkItem {
  id: number;
  title: string; // WorkItem 제목 (예: "기출풀기")
  timeLines: ITimeLine[]; // 관련 TimeLine 목록
}

export interface IDetail {
  year: string;
  weekdays: string;
  month: string;
  day: string;
  text: string;
}
