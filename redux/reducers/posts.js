import {
  GET_POSTS_SUCCESS
} from '../../constants/api'
export const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_SUCCESS:
      return action.response
    default:
      return state
  }
}
