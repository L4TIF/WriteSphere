import React, { forwardRef, useId } from 'react'

const Input = forwardRef(({
    label,
    type = 'text',
    className = '',
    ...props
}, ref) => {
    const id = useId();
    return (
        <div className='w-full'>
            {label && (
                <label
                    className='inline-block mb-1 pl-1 text-theme'
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`
                    w-full px-3 py-2 rounded-lg
                    bg-theme border border-theme
                    text-theme placeholder-theme/50
                    focus:outline-none focus:ring-2 focus:ring-primary
                    transition-colors duration-200
                    ${className}
                `}
                {...props}
                ref={ref}
                id={id}
            />
        </div>
    )
})

export default Input