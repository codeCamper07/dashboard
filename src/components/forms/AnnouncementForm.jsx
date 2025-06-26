'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import InputFeilds from '../InputFeilds'
import { startTransition, useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { createAnnouncement, updateAnnouncement } from '@/lib/action'

const schema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: 'Title name is required!' }),
  description: z.string().min(1, { message: 'Description is required!' }),
  date: z.coerce.date({ message: 'Date is required!' }),
  classId: z.coerce.number({ message: 'class is required!' }).optional(),
})

const AnnouncementForm = ({ type, data, setOpen, relatedData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })
  const router = useRouter()

  const [state, formAction] = useActionState(
    type === 'create' ? createAnnouncement : updateAnnouncement,
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
          ? 'Announcement created successfully!'
          : 'Announcement updated successfully!',
      )
      setOpen(false)
      router.refresh()
    }
  }, [state, router, type, setOpen])

  const { classes } = relatedData
  console.log(classes)

  return (
    <form className='flex flex-col gap-8' onSubmit={onSubmit}>
      <h1 className='font-xl font-semibold'>
        {type === 'create' ? 'Create new Announcement' : 'Update Announcement'}
      </h1>
      <span className='font-light text-sm'>Announcement Info</span>
      <div className='flex justify-between gap-4 flex-wrap'>
        <InputFeilds
          label='Event Title'
          name='title'
          register={register}
          defaultValue={data?.title}
          errors={errors?.title}
        />
        <InputFeilds
          label='Event Description'
          name='description'
          register={register}
          defaultValue={data?.description}
          errors={errors?.description}
        />
        <InputFeilds
          label='Date'
          name='date'
          register={register}
          defaultValue={data?.date.toISOString().split('T')[0]}
          errors={errors?.date}
          type='date'
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
          <label className='text-xs'>Class Id</label>
          <select
            className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
            {...register('classId')}
            defaultValue={data?.classId}>
            {classes.map((classe) => (
              <option value={classe.id} key={classe.id}>
                {classe.name}
              </option>
            ))}
          </select>
          {errors?.classes && (
            <p className='text-destructive text-xs'>
              {errors?.classes.toString()}
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

export default AnnouncementForm
