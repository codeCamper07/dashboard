'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'

const schema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' })
    .max(20, { message: 'Username must be at most 20 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
  firstname: z.string().min(1, { message: 'First name is required' }),
  lastname: z.string().min(1, { message: 'Last name is required' }),
})

const TeacherForm = ({ type, data }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = handleSubmit((data) => {
    console.log('Form submitted:', data)
    // Handle form submission logic here
    // For example, you can send the data to an API or update the state
  })

  return (
    <form className='flex flex-col gap-8' onSubmit={onSubmit}>
      <h1 className='font-xl font-semibold'>Create a new Teacher Profile</h1>
      <span className='font-light text-sm'>Authentication Information</span>
      <div className='flex flex-col gap-2 w-full md:w-1/4'>
        <label>Username</label>
        <input
          type='text'
          className='ring-3 ring-primary rounded-md p-2 w-full'
          {...register('username')}
        />
        {errors.username?.message && (
          <p className='text-red-500'>{errors.username?.message.toString()}</p>
        )}
      </div>
      <span className='font-light text-sm'>Personal Information</span>
      <Button>{type === 'create' ? 'Create' : 'Update'}</Button>
    </form>
  )
}

export default TeacherForm
