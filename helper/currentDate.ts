function getFormattedDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
  
    // Ensure month and day are formatted with leading zeros if necessary
    let stringMonth = month < 10 ? `0${month}` : month;
    let stringDay = day < 10 ? `0${day}` : day;
  
    return `${year}-${stringMonth}-${stringDay}`;
  }

  export default getFormattedDate;