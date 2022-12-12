import Vue from 'vue'
import { createReducer } from '@reduxjs/toolkit'
import * as Actions from '../actions'

const initialState = {
  isOpen: false,
  isShow: false,
  isLoading: true,
  isLoggedIn: false,
  isVerifiedAt: '',
  verifyToken: '',
  currentUser: {},
  authToken: '',
  register: {
    email: '',
    password: '',
    fname: '',
    lname: '',
  },
  formData: {},
  item: {},
  items: []
}

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(Actions.setFormAction, (state, action) => {
      state.formData = {
        ...state.formData,
        [action.payload.id]: action.payload.value
      }
    })
    .addCase(Actions.clearFormAction, (state, action) => {
      state.formData = {}
    })
    .addCase(Actions.openModal, (state) => {
      state.isOpen = true
    })
    .addCase(Actions.closeModal, (state) => {
      state.isOpen = false
    })
    .addCase(Actions.togglePassword, (state) => {
      state.isShow = !state.isShow
    })
    .addCase(Actions.isLoading, (state) => {
      state.isLoading = true
    })
    .addCase(Actions.isLoaded, (state) => {
      state.isLoading = false
    })
    .addCase(Actions.fetchAllItems, (state, action) => {
      state.items = action.payload
      state.isLoading = false
    })
    .addCase(Actions.addItem, (state, action) => {
      state.items = [{...action.payload}, ...state.items],
      state.isLoading = false
      state.isOpen = false
    })
    .addCase(Actions.editItem, (state, action) => {
      state.formData = action.payload
      state.isOpen = true
    })
    .addCase(Actions.updateItem, (state, action) => {
      const index = state.items.findIndex(i => i.id === action.payload.id)
      state.items[index] = action.payload
      state.isOpen = false
      state.isLoading = false
    })
    .addCase(Actions.removeItem, (state, action) => {
      state.items = state.items.filter((item) => (
        item.uuid !== action.payload
      ))
      state.isLoading = false
    })
    .addCase(Actions.register, (state, action) => {
      Vue.$cookies.set('authToken', action.payload.authToken, '3D')
      state.authToken = action.payload.authToken
      state.currentUser = action.payload.currentUser
      state.isLoggedIn = true
    })
    .addCase(Actions.login, (state, action) => {
      Vue.$cookies.set('authToken', action.payload.authToken, '3D')
      state.authToken = action.payload.authToken
      state.currentUser = action.payload.currentUser
      state.isLoggedIn = true
    })
    .addCase(Actions.logout, (state, action) => {
      Vue.$cookies.remove('authToken')
      state.authToken = ''
      state.currentUser = ''
      state.isLoggedIn = false
    })
    .addCase(Actions.currentUser, (state, action) => {
      state.isLoggedIn = true
      state.currentUser = action.payload
      state.isVerifiedAt = action.payload.email_verified_at
      state.verifyToken = action.payload.email_verification_token
    })
    .addCase(Actions.verifyAccount, (state, action) => {
      state.currentUser = action.payload
      state.isVerifiedAt = action.payload.email_verified_at
    })
    .addCase(Actions.setToken, (state, action) => {
      state.authToken = action.payload
    })
})
