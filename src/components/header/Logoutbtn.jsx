import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'

const Logoutbtn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = () => {
        authService.deleteSession()
            .then(() => {
                dispatch(logout())
                localStorage.removeItem("isLoggedIn");
                navigate('/login')
            })
    }
    return (
        <button className='cursor-pointer text-red-600' onClick={logoutHandler}>Logout</button>
    )
}

export default Logoutbtn