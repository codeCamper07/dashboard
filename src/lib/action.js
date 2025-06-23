'use server'

import { clerkClient } from '@clerk/nextjs/server'
import { prisma } from './prisma'

export const createSubject = async (currentState, data) => {
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
        teachers: {
          connect: data.teachers.map((teacherId) => ({
            id: teacherId,
          })),
        },
      },
    })
    return { success: true, error: false }
  } catch (err) {
    console.log('Error creating subject:', err)
    return { success: false, error: true }
  }
}

export const updateSubject = async (currentState, data) => {
  try {
    await prisma.subject.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        teachers: {
          set: data.teachers.map((teacherId) => ({
            id: teacherId,
          })),
        },
      },
    })
    return { success: true, error: false }
  } catch (err) {
    console.log('Error creating subject:', err)
    return { success: false, error: true }
  }
}
export const deleteSubject = async (currentState, data) => {
  try {
    const id = data.get('id')
    await prisma.subject.delete({
      where: { id: parseInt(id) },
    })
    return { success: true, error: false }
  } catch (err) {
    console.log('Error creating subject:', err)
    return { success: false, error: true }
  }
}

export const createClass = async (currentState, data) => {
  try {
    await prisma.class.create({
      data,
    })
    return { success: true, error: false }
  } catch (err) {
    console.log('Error creating class:', err)
    return { success: false, error: true, errorMessage: err.message }
  }
}

export const updateClass = async (currentState, data) => {
  try {
    await prisma.class.update({
      where: {
        id: data.id,
      },
      data,
    })
    return { success: true, error: false }
  } catch (err) {
    console.log('Error updating class', err)
    return { success: false, error: true, errorMessage: err.message }
  }
}
export const deleteClass = async (currentState, data) => {
  try {
    const id = data.get('id')
    await prisma.class.delete({
      where: { id: parseInt(id) },
    })
    return { success: true, error: false }
  } catch (err) {
    console.log('Error deleting Class', err)
    return { success: false, error: true, errorMessage: err.message }
  }
}
export const createTeacher = async (currentState, data) => {
  try {
    console.log({ data })
    const res = await clerkClient()
    const user = await res.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: 'teacher' },
    })

    await prisma.teacher.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone || null,
        address: data.address,
        img: data.img,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        subjects: {
          connect: data.subjects?.map((subjectId) => ({
            id: parseInt(subjectId),
          })),
        },
      },
    })
    return { success: true, error: false }
  } catch (err) {
    console.log('Error creating teacher:', err)
    return { success: false, error: true, errorMessage: err.message }
  }
}

export const updateTeacher = async (currentState, data) => {
  try {
    const res = await clerkClient()
    const user = await res.updateUser(data.id, {
      username: data.username,
      ...(data.password !== '' && { password: data.password }),
      firstName: data.name,
      lastName: data.surname,
    })

    await prisma.teacher.update({
      where: {
        id: data.id,
      },
      data: {
        ...(data.password !== '' && { password: data.password }),
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        subjects: {
          set: data.subjects?.map((subjectId) => ({
            id: parseInt(subjectId),
          })),
        },
      },
    })
    return { success: true, error: false }
  } catch (err) {
    console.log('Error updating class', err)
    return { success: false, error: true, errorMessage: err.message }
  }
}
export const deleteTeacher = async (currentState, data) => {
  try {
    console.log({ data })
    const id = data.get('id')
    await prisma.teacher.delete({
      where: { id: id },
    })
    return { success: true, error: false }
  } catch (err) {
    console.log('Error deleting Class', err)
    return { success: false, error: true, errorMessage: err.message }
  }
}
