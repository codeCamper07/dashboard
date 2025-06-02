'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Plus, SquarePenIcon, Trash } from 'lucide-react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
// import TeacherForm from './forms/TeacherForm'
// import StudentForm from './forms/StudentForm'

const TeacherForm = dynamic(() => import('./forms/TeacherForm'), {
  loading: () => <h1>Loading...!</h1>,
})
const StudentForm = dynamic(() => import('./forms/StudentForm'), {
  loading: () => <h1>Loading...!</h1>,
})

const FormModel = ({ table, type, data, id }) => {
  const [open, setOpen] = useState(false)
  const size = type === 'create' ? 'w-8 h-8' : 'w-7 h-7'

  const forms = {
    teacher: (type, data) => <TeacherForm type={type} data={data} />,
    student: (type, data) => <StudentForm type={type} data={data} />,
  }

  const Form = () => {
    return type === 'delete' && id ? (
      <form className='flex flex-col items-center gap-4'>
        <span className='font-sm font-semibold text-center'>
          All Data will be lost. Are you sure you want to Delete?
        </span>
        <Button className='bg-destructive'>Delete</Button>
      </form>
    ) : forms[table] ? (
      forms[table](type, data)
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
