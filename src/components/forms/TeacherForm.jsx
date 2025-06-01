'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import InputFeilds from '../InputFeilds'
import { Upload } from 'lucide-react'

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
  phone: z.string().min(1, { message: 'Phone number is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  bloodType: z.string().min(1, { message: 'Blood type is required' }),
  birthday: z.date({ message: 'Birthday must be a valid date' }),
  gender: z.enum(['male', 'female'], { message: 'Select a Gender' }),
  img: z.instanceof(File, { message: 'Image must be a file' }),
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
  })

  return (
    <form className='flex flex-col gap-8' onSubmit={onSubmit}>
      <h1 className='font-xl font-semibold'>Create a new Teacher Profile</h1>
      <span className='font-light text-sm'>Authentication Information</span>
      <div className='flex justify-between gap-4 flex-wrap'>
        <InputFeilds
          label='Username'
          name='username'
          register={register}
          defaultValue={data?.username}
          errors={errors?.username}
        />
        <InputFeilds
          label='Email'
          name='email'
          register={register}
          defaultValue={data?.email}
          errors={errors?.email}
        />
        <InputFeilds
          label='Password'
          name='password'
          type='password'
          register={register}
          defaultValue={data?.password}
          errors={errors?.password}
        />
      </div>
      <span className='font-light text-sm'>Personal Information</span>
      <div className='flex justify-between gap-4 flex-wrap'>
        <InputFeilds
          label='First Name'
          name='firstname'
          register={register}
          defaultValue={data?.firstname}
          errors={errors?.firstname}
        />
        <InputFeilds
          label='Last Name'
          name='lastname'
          register={register}
          defaultValue={data?.lastname}
          errors={errors?.lastname}
        />
        <InputFeilds
          label='Phone'
          name='phone'
          type='tel'
          register={register}
          defaultValue={data?.phone}
          errors={errors?.phone}
        />
        <InputFeilds
          label='Address'
          name='address'
          register={register}
          defaultValue={data?.address}
          errors={errors?.address}
        />
        <InputFeilds
          label='Blood Type'
          name='bloodType'
          register={register}
          defaultValue={data?.bloodType}
          errors={errors?.bloodType}
        />
        <InputFeilds
          label='Birthday'
          name='birthday'
          type='date'
          register={register}
          defaultValue={data?.birthday}
          errors={errors?.birthday}
        />
        <div className='flex flex-col gap-2 w-full md:w-1/4'>
          <label className='text-xs'>Gender</label>
          <select
            className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
            {...register('sex')}
            defaultValue={data?.gender}>
            <option value='male'>Male</option>
            <option value='female'>female</option>
          </select>
          {errors?.message && (
            <p className='text-red-500 text-xs'>{errors?.message.toString()}</p>
          )}
        </div>
        <div className='flex flex-col gap-4 w-full md:w-1/4'>
          <label
            className='text-xs flex items-center gap-2 cursor-pointer'
            htmlFor='img'>
            <Upload className='w-[14px] h-[14px]' />
            <span>Upload a photo</span>
          </label>
          <input type='file' id='img' {...register('img')} className='hidden' />
          {errors.img?.message && (
            <p className='text-xs text-red-500'>
              {errors?.img.message.toString()}
            </p>
          )}
        </div>
      </div>
      <Button>{type === 'create' ? 'Create' : 'Update'}</Button>
    </form>
  )
}

export default TeacherForm
