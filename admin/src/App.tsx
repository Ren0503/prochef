import React from 'react'
import { ScrollToTop } from 'components'
import { BrowserRouter as Router } from 'react-router-dom'

import AuthRoutes from 'routes/AuthRoutes'
import MainRoutes from 'routes/MainRoutes'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AuthRoutes />
      <MainRoutes />
    </Router>
  )
}

export default App
