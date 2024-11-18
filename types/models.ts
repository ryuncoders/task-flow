export const CompletionStatus = {
  INCOMPLETE: "incomplete",
  COMPLETE: "complete",
  FAILED: "failed",
} as const;

export type CompletionStatusType =
  (typeof CompletionStatus)[keyof typeof CompletionStatus];

export interface IGoal {
  id: number;
  title: string;
  description: string | null;
  period: number;
}

export interface ITask {
  id: number;
  text: string; // Task 내용 (예: "1회, 2회")
  complete: CompletionStatusType; // Task 상태 (incomplete, complete, failed)
  date: string; // Task 날짜 (ISO 형식 또는 "YYYY-MM-DD")
}

export interface ITimeLine {
  id: number;
  title: string; // TimeLine 제목 (예: "1단원")
  tasks: ITask[]; // 관련 Task 목록
  dateRange: [string, string]; // 시작 및 종료 날짜 ["YYYY-MM-DD", "YYYY-MM-DD"]
  color: string;
  dateTimeLineColor: string[] | null;
}

export interface IWorkItem {
  id: number;
  title: string; // WorkItem 제목 (예: "기출풀기")
  timeLines: ITimeLine[]; // 관련 TimeLine 목록
}
