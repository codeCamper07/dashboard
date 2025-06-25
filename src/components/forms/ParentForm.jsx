'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import InputFeilds from '../InputFeilds'
import { startTransition, useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { createParent, updateParent } from '@/lib/action'
import { useRouter } from 'next/navigation'

const schema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long!' })
    .max(20, { message: 'Username must be at most 20 characters long!' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long!' })
    .optional()
    .or(z.literal('')),
  name: z.string().min(1, { message: 'First name is required!' }),
  surname: z.string().min(1, { message: 'Last name is required!' }),
  email: z
    .string()
    .email({ message: 'Invalid email address!' })
    .optional()
    .or(z.literal('')),
  phone: z.string(),
  address: z.string(),
})

const ParentForm = ({ type, data, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const router = useRouter()

  const [state, formAction] = useActionState(
    type === 'create' ? createParent : updateParent,
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
          ? 'Parent Profile created successfully!'
          : 'Parent Profile updated successfully!',
      )
      setOpen(false)
      router.refresh()
    }
  }, [state, router, type, setOpen])

  return (
    <form className='flex flex-col gap-8' onSubmit={onSubmit}>
      <h1 className='font-xl font-semibold'>Create a new Parent Profile</h1>
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

        {state.error && (
          <span className='text-xs text-destructive'>{state.errorMessage}</span>
        )}
      </div>
      <Button>{type === 'create' ? 'Create' : 'Update'}</Button>
    </form>
  )
}

export default ParentForm
