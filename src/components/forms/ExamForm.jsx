'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import InputFeilds from '../InputFeilds'
import { startTransition, useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { createExam, updateExam } from '@/lib/action'

const schema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: 'Title name is required!' }),
  startTime: z.coerce.date({ message: 'Start time is required!' }),
  endTime: z.coerce.date({ message: 'End time is required!' }),
  lessonId: z.coerce.number({ message: 'Lesson is required!' }),
})

const ExamForm = ({ type, data, setOpen, relatedData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })
  const router = useRouter()

  const [state, formAction] = useActionState(
    type === 'create' ? createExam : updateExam,
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
          ? 'Exam created successfully!'
          : 'Exam updated successfully!',
      )
      setOpen(false)
      router.refresh()
    }
  }, [state])

  const { lessons } = relatedData
  console.log(lessons)

  return (
    <form className='flex flex-col gap-8' onSubmit={onSubmit}>
      <h1 className='font-xl font-semibold'>
        {type === 'create' ? 'Create new Exam' : 'Update Exam'}
      </h1>
      <span className='font-light text-sm'>Exam Info</span>
      <div className='flex justify-between gap-4 flex-wrap'>
        <InputFeilds
          label='Exam Title'
          name='title'
          register={register}
          defaultValue={data?.title}
          errors={errors?.name}
        />
        <InputFeilds
          label='Start Time'
          name='startTime'
          register={register}
          defaultValue={data?.startTime}
          errors={errors?.startTime}
          type='datetime-local'
        />
        <InputFeilds
          label='End Time'
          name='endTime'
          register={register}
          defaultValue={data?.endTime}
          errors={errors?.endTime}
          type='datetime-local'
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
          <label className='text-xs'>Lessons</label>
          <select
            className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
            {...register('lessonId')}
            defaultValue={data?.lessonId}>
            {lessons.map((lesson) => (
              <option value={lesson.id} key={lesson.id}>
                {lesson.name}
              </option>
            ))}
          </select>
          {errors?.lessons && (
            <p className='text-red-500 text-xs'>{errors?.lessons.toString()}</p>
          )}
        </div>
      </div>
      {state.error && (
        <span className='text-sm text-destructive'>Something went wrong!</span>
      )}
      <Button type='submit'>{type === 'create' ? 'Create' : 'Update'}</Button>
    </form>
  )
}

export default ExamForm
