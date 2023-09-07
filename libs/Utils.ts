import moment from 'moment'
import {ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

/**
 *
 * @param date String or Date
 * if String need format YYYY-dd-MM HH:mm:ss or just YYYY-dd-MM
 */
const formatDate = (date: Date | string): string => {


    // Check if the input is a string and matches the expected formats
    if (typeof date === 'string' && (date.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/) || date.match(/^\d{4}-\d{2}-\d{2}$/))) {
        let inputFormat = date.length === 10 ? 'YYYY-DD-MM' : 'YYYY-DD-MM HH:mm:ss'
        let outputFormat = date.length === 10 ? 'DD/MM/YYYY' : 'DD/MM/YYYY [à] HH:mm'

        return moment(date, inputFormat).format(outputFormat);
    }

    // If the input is a Date object, format it directly
    if (date instanceof Date) {
        return moment(date).format('DD/MM/YYYY [à] HH:mm');
    }

    // If the input doesn't match the expected formats, return an error message or handle it as needed
    throw new Error('Invalid date format');
};

const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
}


export {formatDate, cn}