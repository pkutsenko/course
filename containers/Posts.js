import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import getPosts from '../actions/getPosts'

class Posts extends Component {
  componentWillMount () {
    const { getPosts } = this.props
    getPosts()
  }

  render () {
    const { posts } = this.props
    return (
      <div>
        {posts.map(post => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <div>{post.date}</div>
          </div>
        ))}
      </div>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      date: PropTypes.number.isRequired
    })
  ),
  getPosts: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  }
}

const mapDispatchToProps = {
  getPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
