import fetch from 'isomorphic-fetch'

function getDefaultHeaders () {
  return {
    'Content-Type': 'application/json'
  }
}

function constructFetch (apiCallObject) {
  const {
    url,
    method,
    headers = {},
    body,
    timeout
  } = apiCallObject

  return fetch(url, {
    method: method || 'GET',
    headers: { ...getDefaultHeaders(), ...headers },
    body: JSON.stringify(body)
  }, timeout)
}

function isValidFetchStructure (types, apiCallObject) {
  if (!Array.isArray(types) || types.length !== 3 || !types.every(type => typeof type === 'string')) {
    throw new Error('Expected an array of three string types.')
  }

  if (typeof apiCallObject !== 'object') {
    throw new Error('Expected fetch to be an object.')
  }

  if (!apiCallObject.url) {
    throw new Error('Unspecified URL for fetch.')
  }

  return true
}

const apiClient = ({ dispatch }) => next => action => {
  const {
    types,
    promise,
    payload = {}
  } = action

  if (!types) {
    // Normal action: pass it on
    return next(action)
  }

  if (!isValidFetchStructure(types, promise)) {
    return
  }

  const [requestType, successType, failureType] = types

  dispatch({ payload, type: requestType })

  return constructFetch(promise)
    .then(response => response.text())
    .then(JSON.parse)
    .then(response => {
      dispatch({ payload, response, type: successType })
      return response
    })
    .catch(error => {
      dispatch({
        type: failureType,
        error: 'some_error',
        payload
      })
      return error
    })
}

export default apiClient
