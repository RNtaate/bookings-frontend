export let createDateToday = () => {
  let some = new Date(Date.now());
  let dateString = [];
  let hold = ""
  dateString.push(`${some.getFullYear()}`);
  hold = some.getMonth();
  hold < 10 ? hold = `0${hold}` : `${hold}`;
  dateString.push(hold);
  

  hold = some.getDate();
  hold < 10 ? hold = `0${hold}` : `${hold}`;
  dateString.push(hold);
  dateString = dateString.join('-');
  
  return dateString;
}