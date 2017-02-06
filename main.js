import request from 'src/request.js'
import $ from 'jquery'

/* request.getPosts()
request.getPost(1)
request.addPost({
  title: 'new title',
  content: 'test',
  date: 1486045321422
})
request.updatePost(4, {
  title: 'very new title',
  content: 'new test',
  date: 1486045321422
})*/
request.getPosts(function (posts) {
  var html = posts.map(function (post, i) {
    return '<div><a class="title" data-id="' + post.id + '" data-href="/posts/' + post.id + '">' + post.title + '</a>' + '<div>' + post.content + '</div>' + '<div>' + post.date + '</div><hr /></div>';
  }).join('')
  console.log($('#content')[0]);
  $('#content').html(html)
})

$('.content').on('click', '.title', function (e) {
  e.preventDefault();
  var href = $(this).data('href')
  var id = $(this).data('id')
  history.pushState({id: id}, id+'', href);
})

var pathname = location.pathname
setInterval(function () {
  if (pathname !== location.pathname) {
    $(window).trigger('popstate', pathname)
  }
  pathname = location.pathname
}, 200)

$(window).on('popstate', function (e, pathname) {
  console.log(pathname);
})
