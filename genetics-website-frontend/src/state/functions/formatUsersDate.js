export function convertUsersDate(dateTimeString) {
    if (dateTimeString !== null) {
        const dateTime = new Date(dateTimeString);
        const day = dateTime.getDate().toString().padStart(2, '0');
        const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
        const year = dateTime.getFullYear();
        return `${day}.${month}.${year}`;
    }
}