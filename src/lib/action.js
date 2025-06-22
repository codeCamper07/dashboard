'use server'

import { prisma } from './prisma'

export const createSubject = async (currentState, data) => {
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
      },
    })
    return { success: true, error: false }
  } catch (err) {
    console.log('Error creating subject:', err)
    return { success: false, error: true }
  }
}
