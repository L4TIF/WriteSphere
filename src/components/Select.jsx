
import React, { useId } from 'react'

const Select = ({
    options,
    label,
    className = "",
    ...props

}, ref) => {

    const id = useId()
    return (
        <div>
            {label && <label htmlFor={id}>{label}</label>}
            <select className={` ${className}`} ref={ref} name="" id={id} {...props}>
                {options?.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)