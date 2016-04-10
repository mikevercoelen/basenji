import React from 'react'
import { Route } from 'react-router'

import Index from 'views/Index/Index'

export default function getRoutes (history, store, callback) {
  callback(
    <Route path='/' component={Index} />
  )
}
