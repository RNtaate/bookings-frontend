export let addUser = (userObj) => {
  return ({
    type: "ADD_USER",
    payload: userObj
  })
}

export let removeUser = () => {
  return ({
    type: "REMOVE_USER",
  })
}