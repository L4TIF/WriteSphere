import React, { forwardRef, useId } from 'react'

const Input = forwardRef(({
    label,
    type = 'text',
    clasName = '',
    ...props

}, ref) => {
    const id = useId();
    return (
        <div className='w-full'>
            {
                label && <label className='inline-block mb-1 pl-1' htmlFor={id}>{label}</label>
            }
            <input type={type} className={`
             
             ${clasName}`} {...props} ref={ref} id={id} />
        </div>
    )
})
export default Input