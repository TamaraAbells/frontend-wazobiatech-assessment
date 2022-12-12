import Vue from 'vue'
const {connect} = require('redux-vuex')
import { configureStore } from '@reduxjs/toolkit'
const {reducer} = require('../reducers/index.js')

const store = configureStore({ reducer })
connect({ Vue, store })

export default store;