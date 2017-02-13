'use strict';

var _request = require('src/request.js');

var _request2 = _interopRequireDefault(_request);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
_request2.default.getPosts(function (posts) {
  var html = posts.map(function (post, i) {
    return '<div><a class="title" data-id="' + post.id + '" data-href="/posts/' + post.id + '">' + post.title + '</a>' + '<div>' + post.content + '</div>' + '<div>' + post.date + '</div><hr /></div>';
  }).join('');
  console.log((0, _jquery2.default)('#content')[0]);
  (0, _jquery2.default)('#content').html(html);
});

(0, _jquery2.default)('.content').on('click', '.title', function (e) {
  e.preventDefault();
  var href = (0, _jquery2.default)(this).data('href');
  var id = (0, _jquery2.default)(this).data('id');
  history.pushState({ id: id }, id + '', href);
});

var pathname = location.pathname;
setInterval(function () {
  if (pathname !== location.pathname) {
    (0, _jquery2.default)(window).trigger('popstate', pathname);
  }
  pathname = location.pathname;
}, 200);

(0, _jquery2.default)(window).on('popstate', function (e, pathname) {
  console.log(pathname);
});