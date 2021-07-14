export const createDateToday = () => {
  const some = new Date(Date.now());
  let dateString = [];
  let hold = '';
  dateString.push(`${some.getFullYear()}`);
  hold = some.getMonth() + 1;
  hold = hold < 10 ? `0${hold}` : `${hold}`;
  dateString.push(hold);

  hold = some.getDate();
  hold = hold < 10 ? `0${hold}` : `${hold}`;
  dateString.push(hold);
  dateString = dateString.join('-');

  return dateString;
};

export const redirectToHome = (props) => {
  props.history.push('/home');
};
