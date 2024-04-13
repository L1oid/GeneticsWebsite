export const formatDate = (dateString) => {
    if (dateString !== null) {
        const parts = dateString.split('T');
        const dateParts = parts[0].split('-');
        const timeParts = parts[1].split(':');
        const date = new Date(
            Date.UTC(
                parseInt(dateParts[0], 10),
                parseInt(dateParts[1], 10) - 1,
                parseInt(dateParts[2], 10),
                parseInt(timeParts[0], 10),
                parseInt(timeParts[1], 10),
                parseInt(timeParts[2], 10)
            )
        );
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('ru-RU', options);
    }
};