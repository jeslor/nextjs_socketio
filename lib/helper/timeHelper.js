export const formatTimestamp = (isoTimestamp) => {
    const date = new Date(isoTimestamp);
    const now = new Date();
    
    const diffInMs = now - date;
    const diffInHours = diffInMs / (1000 * 60 * 60); 

    if (diffInHours < 24) {
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const amPm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; 

        return `${hours}:${minutes} ${amPm}`;
    } else {
        return date.toISOString().split('T')[0];
    }
};
