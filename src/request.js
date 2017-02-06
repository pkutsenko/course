import $ from 'jquery'

let request = {
  getPosts (callback) {
    $.getJSON('/api/posts', function (res) {
      console.log(res);
      if (typeof callback === 'function') {
        callback(res)
      }
    });
  },
  getPost (id, callback) {
    $.getJSON('/api/posts/' + id, function (res) {
      console.log(res);
      if (typeof callback === 'function') {
        callback(res)
      }
    });
  },
  addPost (data, callback) {
    $.ajax({
      method: 'POST',
      url: '/api/posts',
      contentType: 'application/json',
      data: JSON.stringify(data),
      dataType: 'json',
      success: function (res) {
        console.log(res);
        if (typeof callback === 'function') {
          callback(res)
        }
      }
    });
  },
  updatePost (id, data, callback) {
    $.ajax({
      method: 'PUT',
      url: '/api/posts/' + id,
      contentType: 'application/json',
      data: JSON.stringify(data),
      dataType: 'json',
      success: function (res) {
        console.log(res);
        if (typeof callback === 'function') {
          callback(res)
        }
      }
    });
  }
};

export default request;
