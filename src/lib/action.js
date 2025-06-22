'use server'

import { prisma } from './prisma'

export const createSubject = async (currentState, data) => {
  try {
    console.log({ data })
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
    console.log({ data })
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
