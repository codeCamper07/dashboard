'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import InputFeilds from '../InputFeilds'
import { createSubject } from '@/lib/action'
import { startTransition, useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const schema = z.object({
  name: z.string().min(1, { message: 'Subject Name is required!' }),
})

const SubjectForm = ({ type, data, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })
  const router = useRouter()

  const [state, formAction] = useActionState(createSubject, {
    success: false,
    error: false,
  })
  const onSubmit = handleSubmit((formData) => {
    startTransition(() => formAction(formData))
  })

  useEffect(() => {
    if (state.success) {
      toast.success(
        type === 'create'
          ? 'Subject created successfully!'
          : 'Subject updated successfully!',
      )
      router.refresh()
      setOpen(false)
    }
  }, [state])

  return (
    <form className='flex flex-col gap-8' onSubmit={onSubmit}>
      <h1 className='font-xl font-semibold'>
        {type === 'create' ? 'Create new Subject' : 'Update Subject'}
      </h1>
      <span className='font-light text-sm'>Subject Info</span>
      <div className='flex justify-between gap-4 flex-wrap'>
        <InputFeilds
          label='Subject name'
          name='name'
          register={register}
          defaultValue={data?.name}
          errors={errors?.name}
        />
      </div>
      {state.error && (
        <span className='text-sm text-destructive'>Something went wrong!</span>
      )}
      <Button type='submit'>{type === 'create' ? 'Create' : 'Update'}</Button>
    </form>
  )
}

export default SubjectForm
