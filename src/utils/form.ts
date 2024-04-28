

interface Student {
    studentName: string;
    studentId: string;
  }
  
  interface Classroom {
    id: number
    leader: Student;
    students: Student[];
    teacherName: string;
    reservationDate: string;
    password: string;
  }
  
  // 문자열에서 숫자(학번)와 한글 이름을 분리하는 함수
  export function parseStudentInput(input: string | null): Student {
    if (input === null) {
        return { studentId: '', studentName: '' };
    }
    let studentId = input.substring(0,4);
    let studentName = String(input.match(/[가-힣]+/g));
    
    if (!studentId || !studentName) {
          return { studentId: '', studentName: '' };
    }
    return { studentId, studentName };
}
  // 주어진 입력값들을 사용하여 Classroom 객체를 생성하는 함수
  export function createClassroomData(
    leaderInput: string,
    studentsInput: { value: string }[],
    teacherName: string,
    reservationDate: string,
    id?:number,
    password?: string
  ): Classroom | false {
    let leader: Student;
    let students: Student[] = [];
    const num = String(leaderInput.match(/\d+/g))
    if(num.length !== 4 || num === 'null'){
      return false;
    }else{
      leader = parseStudentInput(leaderInput);
    }
    for (const item of studentsInput) {
      const num = String(item.value.match(/\d+/g))
      if (num.length !== 4 || num === 'null') {
        
        return false;
      }
      students = studentsInput.map((item) => parseStudentInput(item.value));;
    }
  
    const currentDate = new Date();
    const reservationDates = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, Number(reservationDate));
  
    const date = `${reservationDates.getFullYear()}-${
      reservationDates.getMonth() + 1 < 10 ? '0' + (reservationDates.getMonth() + 1) : reservationDates.getMonth() + 1
    }-${reservationDates.getDate() < 10 ? '0' + reservationDates.getDate() : reservationDates.getDate()}`;
    
    return {
      id: id ? id : 0,
      leader,
      students,
      teacherName,
      reservationDate: date,
      password: password ? password : "",
    };
  }


  export function updateClassroomData(
    leaderInput: string,
    studentsInput: { value: string }[],
    teacherName: string,
    reservationDate: string,
    id?:number,
    password?: string
  ): Classroom | false {
    let leader: Student;
    let students: Student[] = [];
    if(!/^\d{4}/.test(leaderInput)){
      return false;
    }else{
      leader = parseStudentInput(leaderInput);
    }
    for (const item of studentsInput) {
      const num = String(item.value.match(/\d+/g))
      if (num.length !== 4 || num === 'null') {
        
        return false;
      }
      students = studentsInput.map((item) => parseStudentInput(item.value));;
    }
  
  
    return {
      id: id ? id : 0,
      leader,
      students,
      teacherName,
      reservationDate,
      password: password ? password : "",
    };
  }
  export function validate(leaderInput:string, studentsInput: { value: string }[],reservationDate: string){
    
    let leader: Student;
    let students: Student[] = [];
    
    const num = String(leaderInput.match(/\d+/g))
    if(num.length !== 4 || num === 'null'){
      return false;
    }else{
      leader = parseStudentInput(leaderInput);
    }

    const filteredInputs = studentsInput.filter(item => {
      // input이 비어있지 않고, 숫자 4자리로 시작하는지 확인
      return item.value.trim().length === 4;
    });
    students = filteredInputs.map((item) => parseStudentInput(item.value));;
    students.push(leader);

    const currentDate = new Date();
    const reservationDates = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, Number(reservationDate));
    
    const date = `${reservationDates.getFullYear()}-${reservationDates.getMonth()+1 < 10 ? '0'+ (reservationDates.getMonth()+1) : reservationDates.getMonth()+1}-${reservationDates.getDate() < 10 ? '0'+reservationDates.getDate() : reservationDates.getDate()}`;

    return {
      studentsInfo: students,
      date
    };
  }


  export const getDaysOfMonth = (month:number) => {
    const year = new Date().getFullYear();
    const lastDay = new Date(year, month, 0).getDate();

    // 1부터 마지막 날짜까지의 배열 생성
    const daysArray = [];
    for (let day = 1; day <= lastDay; day++) {
      daysArray.push(day);
    }
    return daysArray;
  };


  export const createDatesArray = (year:number, month:number, startDate:number, endDate:number, reason:string) => {
    let dateArray = [];
    // JavaScript의 Date 객체는 월을 0부터 시작하기 때문에, month에서 1을 빼줍니다.
    for (let day = startDate; day <= endDate; day++) {
      let date = new Date(year, month - 1, day);
      date.setDate(date.getDate() + 1);
      // Date 객체를 'YYYY-MM-DD' 형식의 문자열로 변환합니다.
      let formattedDate = date.toISOString().split('T')[0];
      dateArray.push({
        date: formattedDate,
        reason: reason
      });
    }
    return dateArray;
  }