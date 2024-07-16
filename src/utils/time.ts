import { getCalendar } from "@/app/_service/calendar";

export function getNextMonthYear(day?:Date): string {
  if(!day){
    return "0000.00"
  }

    const today = new Date(day ? day : "");
    let nextMonth = today.getMonth() +  Number(process.env.NEXT_PUBLIC_DAY_NUMBER);
    let year = today.getFullYear();
  
    if (nextMonth > 12) {
      nextMonth -= 12;
      year += 1;
    }
  
    const formattedMonth = nextMonth < 10 ? `0${nextMonth}` : nextMonth.toString();
  
    return `${year}.${formattedMonth}`;
  }


  interface Data{
    date:string,
    status:string,
    info: info | null

}
interface info{
    id:number,
    leaderId:string,
    leaderName:string,
    reservationDate:string,
    reservationStudents: student[],
    teacherName: string
}
interface student{
    id:number,
    studentId:string,
    studentName:string
}
  export function processDates(year: number, month: number, dates: any[]):Data[] {
    // 첫 날의 요일 계산
    const firstDay = new Date(year, month - 1, 1).getDay();

    // 요일에 맞게 빈 객체 추가
    const emptyDaysCount = firstDay === 0 ? 6 : firstDay - 1;
    let emptyDates = new Array(emptyDaysCount).fill({}).map(() => ({ date: "", status: "",info: null}));
    let processedDates = emptyDates.concat(dates);

    // 주말 제외하고 필터링
    processedDates = processedDates.filter((dateInfo, index) => {
        const date = new Date(year, month - 1, index - emptyDaysCount + 1);
        const dayOfWeek = date.getDay();
        return dayOfWeek !== 0 && dayOfWeek !== 6;
    });

    // 첫 주가 완전히 비어있는지 확인 후 제거
    if (emptyDaysCount === 5) {
        processedDates = processedDates.slice(emptyDaysCount);
    }

    const currentLength = processedDates.length;
    if (currentLength < 25) {
        const additionalEmptyDates = new Array(25 - currentLength).fill({}).map(() => ({ date: "", status: "",info: null}));
        processedDates = processedDates.concat(additionalEmptyDates);
    } else if (currentLength > 25) {
        processedDates = processedDates.slice(0, 25);
    }

    return processedDates;
}

interface date{
  year: number
  month: number
}

export const getNextMonthDateFormattedAdmin = (inputDay: any,date:date) => {
  // 현재 날짜 객체 생성
  const currentDate = new Date();
  // 다음 달의 inputDay로 날짜 객체 설정
  // getMonth() + 1을 하여 다음 달로 설정, setDate()로 일자 설정
  const nextMonthDate = new Date(currentDate.getFullYear(), date.month - 1, Number(inputDay));

  // YYYY.MM.DD 형식으로 날짜 포맷
  const year = nextMonthDate.getFullYear();
  const month = nextMonthDate.getMonth() + 1; // +1 다음달
  const day = nextMonthDate.getDate();

  const formattedDate = `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}`;

  // 요일 계산 (0:일요일, 1:월요일, ..., 6:토요일)
  const dayOfWeek = nextMonthDate.getDay();
  const dayOfWeekStr = ["일", "월", "화", "수", "목", "금", "토"][dayOfWeek];

  // 최종 문자열 반환
  return `${formattedDate}(${dayOfWeekStr})`;
}
export const getNextMonthDateFormatted = (inputDay: any) => {
    // 현재 날짜 객체 생성
    const currentDate = new Date();
    // 다음 달의 inputDay로 날짜 객체 설정
    // getMonth() + 1을 하여 다음 달로 설정, setDate()로 일자 설정
    const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth()+1, Number(inputDay));
  
    // YYYY.MM.DD 형식으로 날짜 포맷
    const year = nextMonthDate.getFullYear();
    const month = nextMonthDate.getMonth() + 1; // +1 다음달
    const day = nextMonthDate.getDate();
  
    const formattedDate = `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}`;
  
    // 요일 계산 (0:일요일, 1:월요일, ..., 6:토요일)
    const dayOfWeek = nextMonthDate.getDay();
    const dayOfWeekStr = ["일", "월", "화", "수", "목", "금", "토"][dayOfWeek];
  
    // 최종 문자열 반환
    return `${formattedDate}(${dayOfWeekStr})`;
  }

export const getMonthDateFormatted = (date:Date) =>{
      // 현재 날짜 객체 생성
      const currentDate = new Date(date);
      // 다음 달의 inputDay로 날짜 객체 설정
      // getMonth() + 1을 하여 다음 달로 설정, setDate()로 일자 설정
    
      // YYYY.MM.DD 형식으로 날짜 포맷
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
      const day = currentDate.getDate();
    
      const formattedDate = `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}`;
    
      // 요일 계산 (0:일요일, 1:월요일, ..., 6:토요일)
      const dayOfWeek = currentDate.getDay();
      const dayOfWeekStr = ["일", "월", "화", "수", "목", "금", "토"][dayOfWeek];
    
      // 최종 문자열 반환
      return `${formattedDate}(${dayOfWeekStr})`;
}
export const getYearAndMonth = (): { year: number; month: number } => {
    const currentDate = new Date();
    let nextMonth = currentDate.getMonth(); // admin 월조정
    let year = currentDate.getFullYear();

    if (nextMonth > 11) {
        nextMonth = 0;
        year++;
    }

    const adjustedMonth = nextMonth + 1;

    return { year, month: adjustedMonth };
}



export function formatDate(dateString?: string): string {
    if(!dateString) return "";
    // 요일을 한국어로 표시하기 위한 배열
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    
    // 입력된 날짜 문자열로 Date 객체 생성
    const date = new Date(dateString);
  
    // 월, 일, 요일 추출
    const month = date.getMonth() + 1; // getMonth()는 0부터 11까지의 값을 반환하므로 +1
    const day = date.getDate();
    const weekDay = weekDays[date.getDay()]; // getDay()는 요일을 0(일요일)부터 6(토요일)까지의 숫자로 반환
  
    // 원하는 형식으로 문자열 포맷하여 반환
    return `${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}(${weekDay})`;
  }

export function formatDateAdmin(year: number, month: number, day?: string): string {

  if(!day) return "";
    // 현재 년도를 얻기 위해 Date 객체를 사용합니다.
  
    // 입력받은 month와 day를 사용하여 Date 객체를 생성합니다.
    // 월은 0부터 시작하므로 month에서 1을 빼줍니다.
    const date = new Date(year, month - 1, parseInt(day));
  
    // 요일을 한글로 변환하기 위한 배열입니다.
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  
    // getDay() 메서드로 요일에 해당하는 숫자(0~6)를 얻고, 해당하는 한글 요일을 찾습니다.
    const koreanDayOfWeek = dayOfWeek[date.getDay()];
  
    // 원하는 포맷으로 날짜를 반환합니다.
    return `${month}/${day}(${koreanDayOfWeek})`;
  }


  export function getDayOfWeek(year: number, month: number, date: number): string {
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    // JavaScript의 Date 객체는 월을 0부터 시작으로 칩니다 (0 = 1월, 1 = 2월, ...)
    // 그래서 month - 1을 해줘야 실제 월에 맞는 값을 얻을 수 있습니다.
    const day = new Date(year, month - 1, date).getDay();
    return daysOfWeek[day];
}


export function getDatesInRange(startDate: string, endDate: string): {date: string}[] {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const dates: {date: string}[] = [];
  
  // 현재 날짜가 종료 날짜를 넘지 않을 때까지 반복
  for(let currentDate = start; currentDate <= end; currentDate.setDate(currentDate.getDate() + 1)) {
    // 날짜를 "YYYY-MM-DD" 형식으로 포맷하여 배열에 추가
    dates.push({date: currentDate.toISOString().split('T')[0]});
  }

  return dates;
}


export function formatDateRange(startDate: string, endDate: string): string {
  // 날짜 파싱
  const start = new Date(startDate);
  const end = new Date(endDate);

  // 일자와 요일을 따로 포맷팅
  const dayOptions: Intl.DateTimeFormatOptions = { day: 'numeric' };
  const weekdayOptions: Intl.DateTimeFormatOptions = { weekday: 'short' };

  // Intl.DateTimeFormat을 사용하여 날짜와 요일 형식 설정
  const dayFormatter = new Intl.DateTimeFormat('ko-KR', dayOptions);
  const weekdayFormatter = new Intl.DateTimeFormat('ko-KR', weekdayOptions);

  // 날짜와 요일 포맷팅
  const startDayFormatted = dayFormatter.format(start);
  const endDayFormatted = dayFormatter.format(end);
  let startWeekdayFormatted = weekdayFormatter.format(start).replace('.', ''); // 점(.) 제거
  let endWeekdayFormatted = weekdayFormatter.format(end).replace('.', ''); // 점(.) 제거

  // 결과 문자열 조합
  const startFormatted = `${startDayFormatted}(${startWeekdayFormatted})`;
  const endFormatted = `${endDayFormatted}(${endWeekdayFormatted})`;

  // 시작 날짜와 종료 날짜가 같은 경우, 시작 날짜만 반환
  if (startDate === endDate) {
    return startFormatted;
  } else { // 시작 날짜와 종료 날짜가 다른 경우, 범위 반환
    return `${startFormatted}~${endFormatted}`;
  }
}



export function formatDateWithoutLeadingZeros(dateString:string) {
  if(!dateString){
    return "0000.00.00"
  }
  const date = new Date(dateString);
  
  // 연도, 월, 일을 추출합니다.
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
  const day = date.getDate();
  
  // 원하는 형식으로 반환합니다.
  return `${year}.${month}.${day}`;
}
