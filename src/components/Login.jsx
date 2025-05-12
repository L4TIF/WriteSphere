import React, { useState } from 'react'
import { Link, useActionData, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import authService from '../appwrite/auth'
import { Button, Input } from './index';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('');

    const login = async (data) => {
        setError('')
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData))
                }
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div className='mx-auto w-full max-w-lg bg-theme rounded-xl p-10 border border-theme shadow-lg'>
                <h2 className='text-center text-2xl font-bold leading-tight text-theme'>Log in to your account</h2>
                <p className='mt-2 text-center text-base text-theme/60'>
                    Don't have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
                {error && <p className='text-center text-red-600 dark:text-red-400 mt-8'>{error}</p>}
                <form className='mt-8' onSubmit={handleSubmit(login)}>
                    <div className='space-y-5'>
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            autoComplete="current-email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /[a-z0-9]+[_a-z0-9\.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})/ig.test(value) || "write a valid email"
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            placeholder="Enter your password"
                            type="password"
                            autoComplete="current-password"
                            {...register("password", { required: true })}
                        />
                        <Button type="submit" className="w-full">Login</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login