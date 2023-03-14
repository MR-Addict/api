import { DxxCourseType, PageInfoType } from "./types";

function mapCourse(course: DxxCourseType) {
  return {
    id: course.id,
    title: course.title,
    startTime: course.startTime,
    endTime: course.endTime,
    uri: course.uri,
    cover: course.cover,
    endImguri: course.uri.replace(/\/\w+\.html$/, "/images/end.jpg"),
  };
}

async function current() {
  try {
    const url = "https://qczj.h5yunban.com/qczj-youth-learning/cgi-bin/common-api/course/current";

    const res = await fetch(url);
    if (!res.ok) return { status: false, message: "Cannot get nqdxx data" };

    const course: DxxCourseType = (await res.json()).result;
    return { status: true, data: mapCourse(course) };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Cannot get nqdxx data" };
  }
}

async function fetchOnePage(page: number) {
  const url = `https://qczj.h5yunban.com/qczj-youth-learning/cgi-bin/common-api/course/list?pageNum=${page}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Cannot get nqdxx data");

  const result = (await res.json()).result;
  const pagedInfo: PageInfoType = result.pagedInfo;
  const courses = result.list.map((item: DxxCourseType) => {
    return mapCourse(item);
  }) as DxxCourseType[];

  return { pagedInfo, courses };
}

async function list() {
  try {
    const data = await fetchOnePage(1);
    const pageSize = data.pagedInfo.pageSize;
    const totalCourses = Number(data.pagedInfo.total);
    const totalPages = Math.ceil(totalCourses / pageSize);

    const courses: DxxCourseType[] = [];
    const onePage = await fetchOnePage(totalPages);
    onePage.courses.reverse().forEach((item) => courses.push(item));
    if (onePage.courses.length !== 10) {
      const anotherPage = await fetchOnePage(totalPages - 1);
      anotherPage.courses.reverse().forEach((item) => courses.push(item));
    }

    return { status: true, data: courses.slice(0, 10) };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Cannot get nqdxx data" };
  }
}

const qndxx = {
  current,
  list,
};

export default qndxx;
