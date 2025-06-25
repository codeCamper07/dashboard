'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import InputFeilds from '../InputFeilds'
import { Upload } from 'lucide-react'
import { createTeacher, updateTeacher } from '@/lib/action'
import { startTransition, useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { CldUploadWidget } from 'next-cloudinary'

const schema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' })
    .max(20, { message: 'Username must be at most 20 characters long' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .optional()
    .or(z.literal('')),
  name: z.string().min(1, { message: 'First name is required' }),
  surname: z.string().min(1, { message: 'Last name is required' }),
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .optional()
    .or(z.literal('')),
  phone: z.string().optional(),
  address: z.string().min(1, { message: 'Address is required' }),
  img: z.string().optional(),
  bloodType: z.string().min(1, { message: 'Blood type is required' }),
  birthday: z.coerce.date({ message: 'Birthday must be a valid date' }),
  sex: z.enum(['MALE', 'FEMALE'], { message: 'Select a Gender' }),
  subjects: z.array(z.string()),
})

const TeacherForm = ({ type, data, setOpen, relatedData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })
  console.log({ data })

  const router = useRouter()

  const [state, formAction] = useActionState(
    type === 'create' ? createTeacher : updateTeacher,
    {
      success: false,
      error: false,
    },
  )
  const onSubmit = handleSubmit((formData) => {
    startTransition(() => formAction(formData))
  })

  useEffect(() => {
    if (state.success) {
      toast.success(
        type === 'create'
          ? 'Teacher Profile created successfully!'
          : 'Teacher Profile updated successfully!',
      )
      setOpen(false)
      router.refresh()
    }
  }, [state, router, type, setOpen])

  const { subjects } = relatedData

  return (
    <form className='flex flex-col gap-8' onSubmit={onSubmit}>
      <h1 className='font-xl font-semibold'>
        {type === 'create'
          ? 'Create a new Teacher Profile'
          : 'Update Teacher Profile'}
      </h1>
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
          name='name'
          register={register}
          defaultValue={data?.name}
          errors={errors?.name}
        />
        <InputFeilds
          label='Last Name'
          name='surname'
          register={register}
          defaultValue={data?.surname}
          errors={errors?.surname}
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
          defaultValue={data?.birthday.toISOString().split('T')[0]}
          errors={errors?.birthday}
        />
        {data && (
          <InputFeilds
            label='Id'
            name='id'
            defaultValue={data?.id}
            register={register}
            error={errors?.id}
            hidden
            disabled={true}
          />
        )}
        <div className='flex flex-col gap-2 w-full md:w-1/4'>
          <label className='text-xs'>Gender</label>
          <select
            className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
            {...register('sex')}
            defaultValue={data?.gender}>
            <option value='MALE'>Male</option>
            <option value='FEMALE'>female</option>
          </select>
          {errors?.message && (
            <p className='text-destructive text-xs'>
              {errors?.message.toString()}
            </p>
          )}
        </div>
        <div className='flex flex-col gap-2 w-full md:w-1/4'>
          <label className='text-xs'>Subjects</label>
          <select
            multiple
            className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
            {...register('subjects')}
            defaultValue={[data?.subjects]}>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          {errors?.subjects?.message && (
            <p className='text-destructive text-xs'>
              {errors.subjects.message.toString()}
            </p>
          )}
        </div>
        <input hidden {...register('img')} defaultValue={data?.img} />
        <CldUploadWidget
          uploadPreset='school'
          onSuccess={(result, { widget }) => {
            setValue('img', result.info.secure_url)
            widget.close()
          }}>
          {({ open }) => {
            return (
              <div
                className='flex flex-col gap-2 w-full md:w-1/4'
                onClick={() => open()}>
                <label className='text-xs flex items-center gap-2 cursor-pointer'>
                  <Upload className='w-[14px] h-[14px]' />
                  <span>Upload Image</span>
                </label>
              </div>
            )
          }}
        </CldUploadWidget>
        {state.error && (
          <span className='text-xs text-destructive'>{state.errorMessage}</span>
        )}
      </div>
      <Button>{type === 'create' ? 'Create' : 'Update'}</Button>
    </form>
  )
}

export default TeacherForm
