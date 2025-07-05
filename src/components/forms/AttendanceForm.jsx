'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import InputFeilds from '../InputFeilds'
import { startTransition, useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { createAttendance, updateAttendance } from '@/lib/action'
import { useRouter } from 'next/navigation'

const schema = z.object({
  id: z.coerce.number().optional(),
  date: z.coerce.date({ message: 'Date is required!' }),
  present: z.boolean({ message: 'Attendance status is required!' }),
  studentId: z.string().min(1, { message: 'Student is required!' }),
  lessonId: z.coerce.number().min(1, { message: 'Lesson is required!' }),
})

const AttendanceForm = ({ type, data, setOpen, relatedData }) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const router = useRouter()

  const [state, formAction] = useActionState(
    type === 'create' ? createAttendance : updateAttendance,
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
          ? 'Attendance record created successfully!'
          : 'Attendance record updated successfully!',
      )
      setOpen(false)
      router.refresh()
    }
  }, [state, router, type, setOpen])

  const { students, lessons } = relatedData

  return (
    <form className='flex flex-col gap-8' onSubmit={onSubmit}>
      <h1 className='font-xl font-semibold'>
        {type === 'create' ? 'Create a new' : 'Update'} Attendance Record
      </h1>
      <span className='font-light text-sm'>Attendance Information</span>
      
      <div className='flex justify-between gap-4 flex-wrap'>
        <InputFeilds
          label='Date'
          name='date'
          type='date'
          register={register}
          defaultValue={data?.date ? data.date.toISOString().split('T')[0] : ''}
          errors={errors?.date}
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
          <label className='text-xs text-gray-500'>Student</label>
          <select
            className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
            {...register('studentId')}
            defaultValue={data?.studentId}>
            <option value=''>Select a student</option>
            {students.map((student) => (
              <option value={student.id} key={student.id}>
                {student.name} {student.surname}
              </option>
            ))}
          </select>
          {errors.studentId?.message && (
            <p className='text-xs text-red-400'>
              {errors.studentId.message.toString()}
            </p>
          )}
        </div>

        <div className='flex flex-col gap-2 w-full md:w-1/4'>
          <label className='text-xs text-gray-500'>Lesson</label>
          <select
            className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
            {...register('lessonId')}
            defaultValue={data?.lessonId}>
            <option value=''>Select a lesson</option>
            {lessons.map((lesson) => (
              <option value={lesson.id} key={lesson.id}>
                {lesson.name} - {lesson.subject?.name}
              </option>
            ))}
          </select>
          {errors.lessonId?.message && (
            <p className='text-xs text-red-400'>
              {errors.lessonId.message.toString()}
            </p>
          )}
        </div>

        <div className='flex flex-col gap-2 w-full md:w-1/4'>
          <label className='text-xs text-gray-500'>Attendance Status</label>
          <select
            className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
            {...register('present', { 
              setValueAs: (value) => value === 'true' 
            })}
            defaultValue={data?.present?.toString()}>
            <option value='true'>Present</option>
            <option value='false'>Absent</option>
          </select>
          {errors.present?.message && (
            <p className='text-xs text-red-400'>
              {errors.present.message.toString()}
            </p>
          )}
        </div>

        {state.error && (
          <span className='text-xs text-destructive'>{state.errorMessage}</span>
        )}
      </div>
      
      <Button>{type === 'create' ? 'Create' : 'Update'}</Button>
    </form>
  )
}

export default AttendanceForm
