interface GetCalendars {
    isValidToday: boolean,
    validFirstDate: Date,
    validLastDate: Date,
}

interface Day{ 
    date?: string
}

interface Dates{
    date?: string;
    status?: string
    info?: any
}

type pass = "create" | 'auth';
