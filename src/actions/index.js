export const addUser = (userObj) => ({
  type: 'ADD_USER',
  payload: userObj,
});

export const removeUser = () => ({
  type: 'REMOVE_USER',
});
