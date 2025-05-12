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
        <button
            className='cursor-pointer text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-200'
            onClick={logoutHandler}
        >
            Logout
        </button>
    )
}

export default Logoutbtn