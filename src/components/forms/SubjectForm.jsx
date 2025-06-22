'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import InputFeilds from '../InputFeilds'
import { createSubject, updateSubject } from '@/lib/action'
import { startTransition, useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const schema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: 'Subject Name is required!' }),
  teachers: z.array(z.string()),
})

const SubjectForm = ({ type, data, setOpen, relatedData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })
  const router = useRouter()

  const [state, formAction] = useActionState(
    type === 'create' ? createSubject : updateSubject,
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
          ? 'Subject created successfully!'
          : 'Subject updated successfully!',
      )
      router.refresh()
      setOpen(false)
    }
  }, [state])

  const { teachers } = relatedData

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
          <label className='text-xs'>Teacher</label>
          <select
            multiple={true}
            className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
            {...register('teachers')}
            defaultValue={data?.teachers}>
            {teachers.map((teacher) => (
              <option value={teacher.id} key={teacher.id}>
                {teacher.name + ' ' + teacher.surname}
              </option>
            ))}
          </select>
          {errors?.teachers && (
            <p className='text-red-500 text-xs'>
              {errors?.teachers.toString()}
            </p>
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

export default SubjectForm
