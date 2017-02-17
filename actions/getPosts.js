import {
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE
} from '../constants/api'

export default function getPosts () {
  return {
    types: [
      GET_POSTS_REQUEST,
      GET_POSTS_SUCCESS,
      GET_POSTS_FAILURE
    ],
    promise: {
      url: '/api/posts'
    }
  }
}
