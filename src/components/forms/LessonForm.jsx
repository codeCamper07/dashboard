'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import InputFeilds from '../InputFeilds'
import { createLessons, updateLessons } from '@/lib/action'
import { startTransition, useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const schema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: 'Subject Name is required!' }),
  day: z.string({ message: 'Day is required' }),
  startTime: z.coerce.date({ message: 'Start time is required!' }),
  endTime: z.coerce.date({ message: 'End time is required!' }),
  subjectId: z.coerce.number({ message: 'Subject Id is Required!' }),
  classId: z.coerce.number({ message: 'Class Id is Required!' }),
  teacherId: z.string({ message: 'Teacher Id is Required!' }),
})

const LessonForm = ({ type, data, setOpen, relatedData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })
  const router = useRouter()

  const [state, formAction] = useActionState(
    type === 'create' ? createLessons : updateLessons,
    {
      success: false,
      error: false,
    },
  )
  const onSubmit = handleSubmit((formData) => {
    console.log(formData)
    startTransition(() => formAction(formData))
  })

  useEffect(() => {
    if (state.success) {
      toast.success(
        type === 'create'
          ? 'Lesson created successfully!'
          : 'Lesson updated successfully!',
      )
      setOpen(false)
      router.refresh()
    }
  }, [state, router, type, setOpen])

  const { classes, subjects, teachers } = relatedData

  return (
    <form className='flex flex-col gap-8' onSubmit={onSubmit}>
      <h1 className='font-xl font-semibold'>
        {type === 'create' ? 'Create new Lesson' : 'Update Lesson'}
      </h1>
      <span className='font-light text-sm'>Lesson Info</span>
      <div className='flex justify-between gap-4 flex-wrap'>
        <InputFeilds
          label='Lesson name'
          name='name'
          register={register}
          defaultValue={data?.name}
          errors={errors?.name}
        />
        <div className='flex flex-col gap-2 w-full md:w-1/4'>
          <label htmlFor='day' className='text-xs'>
            Day
          </label>
          <select
            id='day'
            className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
            {...register('day')}
            defaultValue={data?.day}>
            <option value='MONDAY'>Monday</option>
            <option value='TUESDAY'>Tuesday</option>
            <option value='WEDNESDAY'>Wednesday</option>
            <option value='THURSDAY'>Thursday</option>
            <option value='FRIDAY'>Friday</option>
          </select>
        </div>

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
          <label htmlFor='subjects' className='text-xs'>
            Subject
          </label>
          <select
            id='subjects'
            className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
            {...register('subjectId')}
            defaultValue={data?.subjectId}>
            {subjects.map((subject) => (
              <option value={subject.id} key={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          {errors?.subjectId && (
            <p className='text-destructive text-xs'>
              {errors?.subjectId.toString()}
            </p>
          )}
        </div>
        <div className='flex flex-col gap-2 w-full md:w-1/4'>
          <label htmlFor='classes' className='text-xs'>
            Class Id
          </label>
          <select
            id='classes'
            className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
            {...register('classId')}
            defaultValue={data?.classId}>
            {classes.map((classe) => (
              <option value={classe.id} key={classe.id}>
                {classe.name}
              </option>
            ))}
          </select>
          {errors?.classId && (
            <p className='text-destructive text-xs'>
              {errors?.classId.toString()}
            </p>
          )}
        </div>
        <div className='flex flex-col gap-2 w-full md:w-1/4'>
          <label>Teacher</label>
          <select
            className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
            defaultValue={data?.teacherId}
            {...register('teacherId')}>
            {teachers.map((teacher) => (
              <option value={teacher.id} key={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>
          {errors?.teacherId && (
            <p className='text-destructive text-xs'>
              {errors?.teacherId.message.toString()}
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

export default LessonForm
