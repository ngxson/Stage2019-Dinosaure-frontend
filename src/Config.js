'use strict'

var ConfigDebug = {
  BACKEND: '//localhost:5000/api'
}
var ConfigProduction = {
  BACKEND: '/api'
}

var Config = ConfigDebug
var MODE = process.env.REACT_APP_MODE
if (MODE === 'production') Config = ConfigProduction

export default Config