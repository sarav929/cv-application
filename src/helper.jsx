import { format } from 'date-fns'

export default function getMonthYear(date) {
    if (date) {
        return format(new Date(date), 'MMM yyyy')
    }  
}