import React from 'react'
import { Input } from './ui/input'

const InputFeilds = ({
  label,
  name,
  type = 'text',
  register,
  errors,
  defaultValue,
  disabled,
}) => {
  const registerProps = register ? register(name) : {}
  return (
    <div className='flex flex-col gap-2 w-full md:w-1/4'>
      <label className='text-xs'>{label}</label>
      <Input
        disabled={disabled}
        type={type}
        defaultValue={defaultValue}
        {...registerProps}
      />
      {errors?.message && (
        <p className='text-red-500 text-xs'>{errors?.message.toString()}</p>
      )}
    </div>
  )
}

export default InputFeilds
