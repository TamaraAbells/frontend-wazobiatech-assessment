import { createAction } from '@reduxjs/toolkit'
import * as TYPES from './types.js'

export const openModal = createAction(TYPES.OPEN_MODAL)
export const closeModal = createAction(TYPES.CLOSE_MODAL)
export const togglePassword = createAction(TYPES.TOGGLE_PASSWORD)
export const isLoading = createAction(TYPES.IS_LOADING)
export const isLoaded = createAction(TYPES.IS_LOADED)

export const fetchAllItems = createAction(TYPES.FETCH_ALL_ITEMS)
export const addItem = createAction(TYPES.ADD_ITEM)
export const editItem = createAction(TYPES.EDIT_ITEM)
export const updateItem = createAction(TYPES.UPDATE_ITEM)
export const removeItem = createAction(TYPES.REMOVE_ITEM)

export const register = createAction(TYPES.REGISTER)
export const login = createAction(TYPES.LOGIN)
export const logout = createAction(TYPES.LOGOUT)
export const currentUser = createAction(TYPES.CURRENT_USER)
export const verifyAccount = createAction(TYPES.VERIFY_ACCOUNT)
export const setToken = createAction(TYPES.SET_TOKEN)

export const setFormAction = createAction(TYPES.SET_FORM_ACTION)
export const clearFormAction = createAction(TYPES.CLEAR_FORM_ACTION)