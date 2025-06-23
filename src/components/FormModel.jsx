'use client'

import React, { useActionState, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Plus, SquarePenIcon, Trash } from 'lucide-react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { deleteClass, deleteSubject, deleteTeacher } from '@/lib/action'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const TeacherForm = dynamic(() => import('./forms/TeacherForm'), {
  loading: () => <h1>Loading...!</h1>,
})
const StudentForm = dynamic(() => import('./forms/StudentForm'), {
  loading: () => <h1>Loading...!</h1>,
})
const SubjectForm = dynamic(() => import('./forms/SubjectForm'), {
  loading: () => <h1>Loading...!</h1>,
})
const ClassForm = dynamic(() => import('./forms/ClassForm'), {
  loading: () => <h1>Loading...!</h1>,
})

const deleteActionMap = {
  subject: deleteSubject,
  teacher: deleteTeacher,
  student: deleteSubject,
  parent: deleteSubject,
  assignment: deleteSubject,
  class: deleteClass,
  exam: deleteSubject,
  announcement: deleteSubject,
  result: deleteSubject,
}

const FormModel = ({ table, type, data, id, relatedData }) => {
  const [open, setOpen] = useState(false)
  const size = type === 'create' ? 'w-8 h-8' : 'w-7 h-7'

  const forms = {
    teacher: (type, data, setOpen, relatedData) => (
      <TeacherForm
        type={type}
        data={data}
        setOpen={setOpen}
        relatedData={relatedData}
      />
    ),
    student: (type, data, setOpen, relatedData) => (
      <StudentForm
        type={type}
        data={data}
        setOpen={setOpen}
        relatedData={relatedData}
      />
    ),
    subject: (type, data, setOpen, relatedData) => (
      <SubjectForm
        type={type}
        data={data}
        setOpen={setOpen}
        relatedData={relatedData}
      />
    ),
    class: (type, data, setOpen, relatedData) => (
      <ClassForm
        type={type}
        data={data}
        setOpen={setOpen}
        relatedData={relatedData}
      />
    ),
  }

  const Form = () => {
    const [state, formAction] = useActionState(deleteActionMap[table], {
      success: false,
      error: false,
    })
    const router = useRouter()

    useEffect(() => {
      if (state.success) {
        toast.warning(`Data from ${table} deleted!`)
        setOpen(false)
        router.refresh()
      }
    }, [state, router])

    return type === 'delete' && id ? (
      <form action={formAction} className='flex flex-col items-center gap-4'>
        <input hidden defaultValue={id} name='id' type='text | number' />
        <span className='font-sm font-semibold text-center'>
          All Data will be lost. Are you sure you want to Delete?
        </span>
        <Button className='bg-destructive'>Delete</Button>
      </form>
    ) : forms[table] ? (
      forms[table](type, data, setOpen, relatedData)
    ) : (
      <div>Form not found</div>
    )
  }

  return (
    <>
      <Button
        className={`${size} flex items-center justify-center rounded-full`}
        onClick={() => setOpen(true)}>
        {type === 'create' ? (
          <Plus />
        ) : type === 'update' ? (
          <SquarePenIcon />
        ) : type === 'delete' ? (
          <Trash />
        ) : null}
      </Button>
      {open && (
        <div className='w-screen h-screen fixed top-0 left-0 bg-black/60 z-50 flex items-center justify-center'>
          <div className='bg-secondary rounded-lg p-4 absolute w-[90%] md:w-[75%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] md:h-fit h-[90%] overflow-y-auto'>
            <Form />
            <Image
              className='top-4 right-4 absolute cursor-pointer'
              onClick={() => setOpen(false)}
              src='/close.png'
              alt='close'
              width={14}
              height={14}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default FormModel
