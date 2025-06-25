'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import InputFeilds from '../InputFeilds'
import { startTransition, useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { createGrade, updateAssignment } from '@/lib/action'

const schema = z.object({
  id: z.coerce.number().optional(),
  level: z.coerce.number().min(1, { message: 'Level is required!' }),
})

const GradeForm = ({ type, data, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })
  const router = useRouter()

  const [state, formAction] = useActionState(
    type === 'create' ? createGrade : updateAssignment,
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
          ? 'Grade Level created successfully!'
          : 'Grade Level updated successfully!',
      )
      setOpen(false)
      router.refresh()
    }
  }, [state, router, type, setOpen])

  return (
    <form className='flex flex-col gap-8' onSubmit={onSubmit}>
      <h1 className='font-xl font-semibold'>
        {type === 'create' ? 'Create new Exam' : 'Update Exam'}
      </h1>
      <span className='font-light text-sm'>Grade Levels </span>
      <div className='flex justify-between gap-4 flex-wrap'>
        <InputFeilds
          label='Level'
          name='level'
          register={register}
          defaultValue={data?.level}
          errors={errors?.level}
        />
        {data && (
          <InputFeilds
            label='id'
            name='id'
            register={register}
            defaultValue={data?.id}
            errors={errors?.id}
            disabled={true}
          />
        )}
      </div>
      {state.error && (
        <span className='text-sm text-destructive'>{state.errorMessage}</span>
      )}
      <Button type='submit'>{type === 'create' ? 'Create' : 'Update'}</Button>
    </form>
  )
}

export default GradeForm
