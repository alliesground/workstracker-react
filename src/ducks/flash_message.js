export const types = {
  SET_FLASH_MESSAGE: 'SET_FLASH_MESSAGE',
  RESET_FLASH_MESSAGE: 'RESET_FLASH_MESSAGE'
}

export default (state = null, action) => {
  switch (action.type) {
    case types.SET_FLASH_MESSAGE:
      return action.message || 'Something went wrong!';
    case types.RESET_FLASH_MESSAGE:
      return null;
    default:
      return state;
  }
}

export const actions = {
  setFlashMessage: (message) => (
    {
      type: types.SET_FLASH_MESSAGE,
      message
    }
  ),
  resetFlashMessage: () => (
    {
      type: types.RESET_FLASH_MESSAGE
    }
  )
}

export const getFlashMessage = (state) => {
  return state.flashMessage;
}
