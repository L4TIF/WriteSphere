import React from 'react'

const Loader = ({ size = 'md', text = 'Loading...', fullScreen = false }) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16'
    }

    const containerClasses = fullScreen
        ? 'fixed inset-0 flex items-center justify-center bg-theme/50 backdrop-blur-sm z-50'
        : 'flex flex-col items-center justify-center'

    return (
        <div className={containerClasses}>
            <div className="relative">
                <div className={`${sizeClasses[size]} border-4 border-primary border-t-transparent rounded-full animate-spin`}></div>
                <div className={`${sizeClasses[size]} border-4 border-primary/30 border-t-transparent rounded-full animate-spin absolute top-0 left-0`}></div>
            </div>
            {text && <p className="mt-4 text-lg font-medium text-theme animate-pulse">{text}</p>}
        </div>
    )
}

export default Loader 