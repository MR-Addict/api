export interface DxxCourseType {
  id: string;
  startTime: string;
  endTime: string;
  title: string;
  cover: string;
  uri: string;
  endImgUri: string;
}

export interface PageInfoType {
  pageSize: number;
  pageNum: number;
  total: string;
}