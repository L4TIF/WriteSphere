import React from 'react'

const Button = ({
    children,
    type = 'button',
    bgColor = 'bg-blue-600 dark:bg-blue-500',
    textColor = 'text-white',
    className = '',
    ...props
}) => {
    return (
        <button
            className={`px-4 py-2 rounded-lg transition-colors duration-200 hover:opacity-90 ${textColor} ${bgColor} ${className}`}
            type={type}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button