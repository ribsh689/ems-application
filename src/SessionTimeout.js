import React from 'react'
import { Navigate } from 'react-router-dom'

export const SessionTimeout = ({ children }) => {

    if (!sessionStorage.getItem("username")) {
        return <Navigate to='/login' />
    }
    return children
}