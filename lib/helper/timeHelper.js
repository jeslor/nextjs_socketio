export const  formatTimestamp = (isoTimestamp)=> {
    const date = new Date(isoTimestamp);
    const secondsSinceMidnight = date.getHours() * 3600 + date.getMinutes() * 60;

    if (secondsSinceMidnight < 86400) {
        return date.toTimeString().slice(0, 5); // Returns "HH:MM"
    } else {
        return date.toISOString().split('T')[0]; // Returns "YYYY-MM-DD"
    }
}
