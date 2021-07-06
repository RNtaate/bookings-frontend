export const addUser = (userObj) => ({
  type: 'ADD_USER',
  payload: userObj,
});

export const removeUser = () => ({
  type: 'REMOVE_USER',
});

export const addMassageList = (massageListArray) => {
  return ({
    type: 'ADD_MASSAGE_LIST',
    payload: massageListArray
  })
}

export const addMassageType = (massageTypeObj) => {
  return ({
    type: 'ADD_MASSAGE_TYPE',
    payload: massageTypeObj
  })
}