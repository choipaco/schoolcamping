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


  
  export function processDates(year: number, month: number, dates: any[]) {
    // 첫 날의 요일 계산
    const firstDay = new Date(year, month - 1, 1).getDay();

    // 요일에 맞게 빈 객체 추가
    const emptyDaysCount = firstDay === 0 ? 6 : firstDay - 1;
    let emptyDates = new Array(emptyDaysCount).fill({}).map(() => ({ date: ""}));
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
        const additionalEmptyDates = new Array(25 - currentLength).fill({}).map(() => ({ date: ""}));
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