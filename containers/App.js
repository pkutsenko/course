import React, { PropTypes } from 'react'

const App = (props) => {
  const { children } = props
  return (
    <div className='wrapper'>
      <div className='header'>Header</div>
      <div className='container'>
        <div className='sidebar'>Sidebar</div>
        <div className='content' id='content'>
          {children}
        </div>
      </div>
      <div className='footer'>Footer</div>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.node
}

export default App
