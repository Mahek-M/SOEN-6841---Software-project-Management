import { createSlice, configureStore } from '@reduxjs/toolkit'
import { useState } from 'react';

const authSlice = createSlice({
    name : "auth",
    initialState : {
        isLoggedIn : false
    },
    reducers: {
        loggedIn : state => {
            state.isLoggedIn = true
        },
        loggedOut : state => {
            state.isLoggedIn = false
        }

    }
});

export const {loggedIn,loggedOut} = authSlice.actions;

export const store = configureStore({
    reducer : authSlice.reducer
});
