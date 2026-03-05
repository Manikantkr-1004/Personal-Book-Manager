

export const formateIndiaTime = (date) => {
    if (!date) return '';
    
    const IndOption = {
      timeZone: "Asia/Kolkata",
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };

    return new Date(date).toLocaleString('en-In', IndOption);
}