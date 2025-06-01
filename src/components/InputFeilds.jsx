import React from 'react'

const InputFeilds = ({
  label,
  name,
  type = 'text',
  register,
  errors,
  defaultValue,
}) => {
  return (
    <div className='flex flex-col gap-2 w-full md:w-1/4'>
      <label className='text-xs'>{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        className='ring-1 ring-primary rounded-lg p-2 w-full'
        {...register(name)}
      />
      {errors?.message && (
        <p className='text-red-500 text-xs'>{errors?.message.toString()}</p>
      )}
    </div>
  )
}

export default InputFeilds
