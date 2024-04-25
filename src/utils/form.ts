

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
  function parseStudentInput(input: string): Student {
    const [, studentId, studentName] = input.match(/(\d+)([가-힣]+)/)!;
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
    if(!/^\d{4}/.test(leaderInput)){
      return false;
    }else{
      leader = parseStudentInput(leaderInput);
    }
    for (const item of studentsInput) {
      if (!/^\d{4}/.test(item.value)) {
        
        return false;
      }
      students = studentsInput.map((item) => parseStudentInput(item.value));;
    }
  
    const currentDate = new Date();
    const reservationDates = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, Number(reservationDate));
  
    const date = `${reservationDates.getFullYear()}-${
      reservationDates.getMonth() + 1 < 10 ? '0' + (reservationDates.getMonth() + 1) : reservationDates.getMonth() + 1
    }-${reservationDates.getDate() < 10 ? '0' + reservationDates.getDate() : reservationDates.getDate()}`;
    console.log(date);
    return {
      id: id ? id : 0,
      leader,
      students,
      teacherName,
      reservationDate: date,
      password: password ? password : "",
    };
  }



  export function validate(leaderInput:string, studentsInput: { value: string }[],reservationDate: string){
    
    let leader: Student;
    let students: Student[] = studentsInput.map(item => parseStudentInput(item.value));
    
    if(!/^\d{4}/.test(leaderInput)){
      return false;
    }else{
      leader = parseStudentInput(leaderInput);
    }

    for (const item of studentsInput) {
      if (!/^\d{4}/.test(item.value)) {
        return false;
      }
      students = studentsInput.map((item) => parseStudentInput(item.value));;
    }
    students.push(leader);

    const currentDate = new Date();
    const reservationDates = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, Number(reservationDate));
    
    const date = `${reservationDates.getFullYear()}-${reservationDates.getMonth()+1 < 10 ? '0'+ (reservationDates.getMonth()+1) : reservationDates.getMonth()+1}-${reservationDates.getDate() < 10 ? '0'+reservationDates.getDate() : reservationDates.getDate()}`;

    return {
      studentsInfo: students,
      date
    };
  }