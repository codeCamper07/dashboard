'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import InputFeilds from '../InputFeilds'
import { startTransition, useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { createResult, updateResult } from '@/lib/action'

const schema = z.object({
  id: z.coerce.number().optional(),
  score: z.coerce.number({ message: 'Score is reqired' }),
  examId: z.coerce.number().optional(),
  assignmentId: z.coerce.number().optional(),
  studentId: z.string({ message: 'Student is required!' }),
})

const ResultForm = ({ type, data, setOpen, relatedData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })
  const router = useRouter()
  const [examData, setExamData] = useState(data?.examId)
  const [assignmentData, setAssignmentData] = useState(data?.assignmentId)

  const [state, formAction] = useActionState(
    type === 'create' ? createResult : updateResult,
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

  const { exams, assignments, students } = relatedData

  return (
    <form className='flex flex-col gap-8' onSubmit={onSubmit}>
      <h1 className='font-xl font-semibold'>
        {type === 'create' ? 'Results' : 'Update Results'}
      </h1>
      <span className='font-light text-sm'>Result info</span>
      <div className='flex justify-between gap-4 flex-wrap'>
        <InputFeilds
          label='Score'
          name='score'
          register={register}
          defaultValue={data?.score}
          errors={errors?.score}
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
          <label className='text-xs text-gray-500'>Exams</label>
          <select
            className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
            {...register('examId')}
            defaultValue={examData}
            onChange={(e) => {
              setExamData(e.target.value)
              setAssignmentData('')
            }}
            disabled={!!assignmentData}>
            {exams.map((exam) => (
              <option value={exam.id} key={exam.id}>
                {exam.title}
              </option>
            ))}
          </select>
          {errors.examId?.message && (
            <p className='text-xs text-red-400'>
              {errors.examId.message.toString()}
            </p>
          )}
        </div>
        <div className='flex flex-col gap-2 w-full md:w-1/4'>
          <label className='text-xs text-gray-500'>Assignments</label>
          <select
            className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
            {...register('assignmentId')}
            defaultValue={assignmentData}
            disabled={!!examData}
            onChange={(e) => {
              setAssignmentData(e.target.value)
              setExamData('')
            }}>
            {assignments.map((assignment) => (
              <option value={assignment.id} key={assignment.id}>
                {assignment.title}
              </option>
            ))}
          </select>
          {errors.assignmentId?.message && (
            <p className='text-xs text-red-400'>
              {errors.assignmentId.message.toString()}
            </p>
          )}
        </div>
        <div className='flex flex-col gap-2 w-full md:w-1/4'>
          <label className='text-xs text-gray-500'>Students</label>
          <select
            className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
            {...register('studentId')}
            defaultValue={data?.studentId}>
            {students.map((student) => (
              <option value={student.id} key={student.id}>
                {student.name + ' ' + student.surname}
              </option>
            ))}
          </select>
          {errors.assignmentId?.message && (
            <p className='text-xs text-red-400'>
              {errors.assignmentId.message.toString()}
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

export default ResultForm
