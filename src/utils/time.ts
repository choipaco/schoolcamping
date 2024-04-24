export function getNextMonthYear(): string {
    const today = new Date();
    let nextMonth = today.getMonth() + 2;
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



export const getNextMonthDateFormatted = (inputDay: any) => {
    // 현재 날짜 객체 생성
    const currentDate = new Date();
    // 다음 달의 inputDay로 날짜 객체 설정
    // getMonth() + 1을 하여 다음 달로 설정, setDate()로 일자 설정
    const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, Number(inputDay));
  
    // YYYY.MM.DD 형식으로 날짜 포맷
    const year = nextMonthDate.getFullYear();
    const month = nextMonthDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
    const day = nextMonthDate.getDate();
  
    const formattedDate = `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}`;
  
    // 요일 계산 (0:일요일, 1:월요일, ..., 6:토요일)
    const dayOfWeek = nextMonthDate.getDay();
    const dayOfWeekStr = ["일", "월", "화", "수", "목", "금", "토"][dayOfWeek];
  
    // 최종 문자열 반환
    return `${formattedDate}(${dayOfWeekStr})`;
  }


export const getYearAndMonth = (): { year: number; month: number } => {
    const currentDate = new Date();
    let nextMonth = currentDate.getMonth() + 1;
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