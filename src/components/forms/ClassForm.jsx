'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import InputFeilds from '../InputFeilds'
import { createClass, updateClass } from '@/lib/action'
import { startTransition, useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const schema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: 'Subject Name is required!' }),
  capacity: z.coerce.number().min(1, { message: 'Capacity is required!' }),
  supervisorId: z.coerce.string().optional(),
  gradeId: z.coerce.number().min(1, { message: 'Grade Id is required!' }),
})

const ClassForm = ({ type, data, setOpen, relatedData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })
  const router = useRouter()

  const [state, formAction] = useActionState(
    type === 'create' ? createClass : updateClass,
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
          ? 'Class created successfully!'
          : 'Class updated successfully!',
      )
      setOpen(false)
      router.refresh()
    }
  }, [state, router, type, setOpen])

  const { teachers, grades } = relatedData

  return (
    <form className='flex flex-col gap-8' onSubmit={onSubmit}>
      <h1 className='font-xl font-semibold'>
        {type === 'create' ? 'Create new Class' : 'Update Class'}
      </h1>
      <span className='font-light text-sm'>Class Info</span>
      <div className='flex justify-between gap-4 flex-wrap'>
        <InputFeilds
          label='Class Name'
          name='name'
          register={register}
          defaultValue={data?.name}
          errors={errors?.name}
        />
        <InputFeilds
          label='Capacity'
          name='capacity'
          register={register}
          defaultValue={data?.capacity}
          errors={errors?.capacity}
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
        <div className='flex flex-col gap-2 w-full md:w-1/4'>
          <label className='text-xs'>Supervisor</label>
          <select
            className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
            {...register('supervisorId')}
            defaultValue={data?.teachers}>
            {teachers.map((teacher) => (
              <option
                value={teacher.id}
                key={teacher.id}
                selected={data && teacher.id === data.supervisorId}>
                {teacher.name + ' ' + teacher.surname}
              </option>
            ))}
          </select>
          {errors?.supervisorId?.message && (
            <p className='text-destructive text-xs'>
              {errors?.supervisorId?.message.toString()}
            </p>
          )}
        </div>
        <div className='flex flex-col gap-2 w-full md:w-1/4'>
          <label className='text-xs'>Grade</label>
          <select
            className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
            {...register('gradeId')}
            defaultValue={data?.gradeId}>
            {grades.map((grade) => (
              <option
                defaultValue={grade.id}
                key={grade.id}
                selected={data && grade.id === data.gradeId}>
                {grade.level}
              </option>
            ))}
          </select>
          {errors?.gradeId?.message && (
            <p className='text-destructive text-xs'>
              {errors?.gradeId?.message.toString()}
            </p>
          )}
        </div>
      </div>
      {state.error && (
        <span className='text-sm text-destructive'>{state.errorMessage}</span>
      )}
      <Button type='submit'>{type === 'create' ? 'Create' : 'Update'}</Button>
    </form>
  )
}

export default ClassForm
