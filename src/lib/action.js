'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
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
    return { success: false, error: true, errorMessage: err.message }
  }
}
export const createTeacher = async (currentState, data) => {
  try {
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
    return { success: false, error: true, errorMessage: err.message }
  }
}

export const updateTeacher = async (currentState, data) => {
  try {
    const res = await clerkClient()
    const user = await res.users.updateUser(data.id, {
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
    return { success: false, error: true, errorMessage: err.message }
  }
}
export const deleteTeacher = async (currentState, data) => {
  try {
    const id = data.get('id')

    const res = await clerkClient()
    await res.users.deleteUser(id)

    await prisma.teacher.delete({
      where: { id: id },
    })
    return { success: true, error: false }
  } catch (err) {
    return { success: false, error: true, errorMessage: err.message }
  }
}
export const createStudent = async (currentState, data) => {
  try {
    const classItem = await prisma.class.findUnique({
      where: { id: data.classId },
      include: {
        _count: { select: { students: true } },
      },
    })

    if (classItem && classItem.capacity === classItem._count.students) {
      return { success: false, error: true, errorMessage: 'Class is Full' }
    }

    const res = await clerkClient()
    const user = await res.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: 'student' },
    })

    await prisma.student.create({
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
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    })
    return { success: true, error: false }
  } catch (err) {
    return { success: false, error: true, errorMessage: err.message }
  }
}

export const updateStudent = async (currentState, data) => {
  try {
    const res = await clerkClient()
    const user = await res.users.updateUser(data.id, {
      username: data.username,
      ...(data.password !== '' && { password: data.password }),
      firstName: data.name,
      lastName: data.surname,
    })

    await prisma.student.update({
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
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    })
    return { success: true, error: false }
  } catch (err) {
    console.log(err)
    return { success: false, error: true, errorMessage: err.message }
  }
}
export const deleteStudent = async (currentState, data) => {
  try {
    const id = data.get('id')

    const res = await clerkClient()
    await res.users.deleteUser(id)

    await prisma.student.delete({
      where: { id: id },
    })
    return { success: true, error: false }
  } catch (err) {
    return { success: false, error: true, errorMessage: err.message }
  }
}

export const createExam = async (currentState, data) => {
  const { userId, sessionClaims } = await auth()
  const role = sessionClaims?.metadata.role

  try {
    if (role === 'teacher') {
      const teacherLesson = await prisma.lesson.findFirst({
        where: {
          teacherId: userId,
          id: data.lessonId,
        },
      })

      if (!teacherLesson) {
        return { success: false, error: true }
      }
    }

    await prisma.exam.create({
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonId,
      },
    })

    return { success: true, error: false }
  } catch (err) {
    console.log(err)
    return { success: false, error: true }
  }
}

export const updateExam = async (currentState, data) => {
  const { userId, sessionClaims } = auth()
  const role = sessionClaims?.metadata.role

  try {
    if (role === 'teacher') {
      const teacherLesson = await prisma.lesson.findFirst({
        where: {
          teacherId: userId,
          id: data.lessonId,
        },
      })

      if (!teacherLesson) {
        return { success: false, error: true }
      }
    }

    await prisma.exam.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonId,
      },
    })

    return { success: true, error: false }
  } catch (err) {
    console.log(err)
    return { success: false, error: true }
  }
}

export const deleteExam = async (currentState, data) => {
  const id = data.get('id')

  const { userId, sessionClaims } = auth()
  const role = sessionClaims?.metadata.role
  try {
    await prisma.exam.delete({
      where: {
        id: parseInt(id),
        ...(role === 'teacher' ? { lesson: { teacherId: userId } } : {}),
      },
    })

    return { success: true, error: false }
  } catch (err) {
    console.log(err)
    return { success: false, error: true }
  }
}

export const createAssignment = async (currentState, data) => {
  const { userId, sessionClaims } = await auth()
  const role = sessionClaims?.metadata.role

  try {
    if (role === 'teacher') {
      const teacherLesson = await prisma.lesson.findFirst({
        where: {
          teacherId: userId,
          id: data.lessonId,
        },
      })

      if (!teacherLesson) {
        return { success: false, error: true }
      }
    }

    await prisma.assignment.create({
      data: {
        title: data.title,
        startDate: data.startDate,
        dueDate: data.dueDate,
        lessonId: data.lessonId,
      },
    })

    return { success: true, error: false }
  } catch (err) {
    console.log(err)
    return { success: false, error: true }
  }
}

export const updateAssignment = async (currentState, data) => {
  const { userId, sessionClaims } = auth()
  const role = sessionClaims?.metadata.role

  try {
    if (role === 'teacher') {
      const teacherLesson = await prisma.lesson.findFirst({
        where: {
          teacherId: userId,
          id: data.lessonId,
        },
      })

      if (!teacherLesson) {
        return { success: false, error: true }
      }
    }

    await prisma.assignment.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        startDate: data.startDate,
        dueDate: data.dueDate,
        lessonId: data.lessonId,
      },
    })

    return { success: true, error: false }
  } catch (err) {
    console.log(err)
    return { success: false, error: true }
  }
}

export const deleteAssignment = async (currentState, data) => {
  const id = data.get('id')

  const { userId, sessionClaims } = auth()
  const role = sessionClaims?.metadata.role
  try {
    await prisma.assignment.delete({
      where: {
        id: parseInt(id),
        ...(role === 'teacher' ? { lesson: { teacherId: userId } } : {}),
      },
    })

    return { success: true, error: false }
  } catch (err) {
    console.log(err)
    return { success: false, error: true }
  }
}

export const createGrade = async (currentState, data) => {
  try {
    const gradeFind = await prisma.grade.findFirst({
      where: {
        level: data.level,
      },
    })
    if (gradeFind) {
      return { success: false, error: true, errorMessage: 'Grade Level Exists' }
    } else {
      await prisma.grade.create({
        data: {
          level: data.level,
        },
      })
      return { success: true, error: false }
    }
  } catch (err) {
    console.log(err)
    return { success: false, error: true }
  }
}

export const deleteGrade = async (currentState, data) => {
  try {
    const id = data.get('id')
    await prisma.grade.delete({
      where: {
        id: parseInt(id),
      },
    })
    return { success: true, error: false }
  } catch (err) {
    console.log(err)
    return { success: false, error: true }
  }
}
export const createParent = async (currentState, data) => {
  try {
    const res = await clerkClient()
    const user = await res.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: 'parent' },
    })

    await prisma.parent.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone || null,
        address: data.address,
      },
    })
    return { success: true, error: false }
  } catch (err) {
    console.log(err)
    return { success: false, error: true, errorMessage: err.message }
  }
}

export const updateParent = async (currentState, data) => {
  try {
    const res = await clerkClient()
    const user = await res.users.updateUser(data.id, {
      username: data.username,
      ...(data.password !== '' && { password: data.password }),
      firstName: data.name,
      lastName: data.surname,
    })

    await prisma.parent.update({
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
      },
    })
    return { success: true, error: false }
  } catch (err) {
    console.log(err)
    return { success: false, error: true, errorMessage: err.message }
  }
}
export const deleteParent = async (currentState, data) => {
  try {
    const id = data.get('id')
    await prisma.parent.delete({
      where: {
        id: id,
      },
    })
    return { success: true, error: false }
  } catch (err) {
    console.log(err)
    return { success: false, error: true }
  }
}
export const createEvent = async (currentState, data) => {
  try {
    await prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        startTime: data.startTime,
        endTime: data.endTime,
        classId: data.classId,
      },
    })

    return { success: true, error: false }
  } catch (err) {
    console.log(err)
    return { success: false, error: true }
  }
}

export const updateEvent = async (currentState, data) => {
  try {
    await prisma.event.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        startTime: data.startTime,
        endTime: data.endTime,
        classId: data.classId,
      },
    })

    return { success: true, error: false }
  } catch (err) {
    console.log(err)
    return { success: false, error: true }
  }
}

export const deleteEvent = async (currentState, data) => {
  const id = data.get('id')
  try {
    await prisma.event.delete({
      where: {
        id: parseInt(id),
      },
    })
    return { success: true, error: false }
  } catch (err) {
    console.log(err)
    return { success: false, error: true }
  }
}

export const createAnnouncement = async (currentState, data) => {
  try {
    await prisma.announcement.create({
      data: {
        title: data.title,
        description: data.description,
        date: data.date,
        classId: data.classId,
      },
    })

    return { success: true, error: false }
  } catch (err) {
    console.log(err)
    return { success: false, error: true }
  }
}

export const updateAnnouncement = async (currentState, data) => {
  try {
    await prisma.announcement.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        date: data.date,
        classId: data.classId,
      },
    })

    return { success: true, error: false }
  } catch (err) {
    console.log(err)
    return { success: false, error: true }
  }
}

export const deleteAnnouncement = async (currentState, data) => {
  const id = data.get('id')
  try {
    await prisma.announcement.delete({
      where: {
        id: parseInt(id),
      },
    })
    return { success: true, error: false }
  } catch (err) {
    console.log(err)
    return { success: false, error: true }
  }
}

export const createLessons = async (currentState, data) => {
  try {
    await prisma.lesson.create({
      data: {
        name: data.name,
        day: data.day,
        startTime: data.startTime,
        endTime: data.endTime,
        subjectId: data.subjectId,
        classId: data.classId,
        teacherId: data.teacherId,
      },
    })

    return { success: true, error: false }
  } catch (err) {
    console.log({ err })
    return { success: false, error: true, errorMessage: err.message }
  }
}

export const updateLessons = async (currentState, data) => {
  try {
    await prisma.lesson.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        day: data.day,
        startTime: data.startTime,
        endTime: data.endTime,
        subjectId: data.subjectId,
        classId: data.classId,
        teacherId: data.teacherId,
      },
    })

    return { success: true, error: false }
  } catch (err) {
    console.log(err)
    return { success: false, error: true }
  }
}

export const deleteLessons = async (currentState, data) => {
  const id = data.get('id')
  try {
    await prisma.lesson.delete({
      where: {
        id: parseInt(id),
      },
    })
    return { success: true, error: false }
  } catch (err) {
    console.log(err)
    return { success: false, error: true }
  }
}
export const createResult = async (currentState, data) => {
  try {
    await prisma.result.create({
      data: {
        score: data.score,
        examId: data.examId || null,
        assignmentId: data.assignmentId || null,
        studentId: data.studentId,
      },
    })

    return { success: true, error: false }
  } catch (err) {
    console.log({ err })
    return { success: false, error: true, errorMessage: err.message }
  }
}
export const updateResult = async (currentState, data) => {
  try {
    await prisma.result.update({
      where: {
        id: data.id,
      },
      data: {
        score: data.score,
        examId: data.examId || null,
        assignmentId: data.assignmentId || null,
        studentId: data.studentId,
      },
    })

    return { success: true, error: false }
  } catch (err) {
    console.log({ err })
    return { success: false, error: true, errorMessage: err.message }
  }
}

export const deleteResult = async (currentState, data) => {
  const id = data.get('id')
  try {
    await prisma.result.delete({
      where: {
        id: parseInt(id),
      },
    })
    return { success: true, error: false }
  } catch (err) {
    console.log(err)
    return { success: false, error: true }
  }
}

export const createAttendance = async (currentState, data) => {
  const { userId, sessionClaims } = await auth()
  const role = sessionClaims?.metadata.role

  try {
    if (role === 'teacher') {
      const teacherLesson = await prisma.lesson.findFirst({
        where: {
          teacherId: userId,
          id: data.lessonId,
        },
      })

      if (!teacherLesson) {
        return { success: false, error: true, errorMessage: 'You can only mark attendance for your own lessons' }
      }
    }

    // Check if attendance record already exists for this student and lesson on this date
    const existingAttendance = await prisma.attendance.findFirst({
      where: {
        studentId: data.studentId,
        lessonId: data.lessonId,
        date: {
          gte: new Date(data.date),
          lt: new Date(new Date(data.date).getTime() + 24 * 60 * 60 * 1000),
        },
      },
    })

    if (existingAttendance) {
      return { success: false, error: true, errorMessage: 'Attendance already recorded for this student and lesson on this date' }
    }

    await prisma.attendance.create({
      data: {
        date: data.date,
        present: data.present,
        studentId: data.studentId,
        lessonId: data.lessonId,
      },
    })

    return { success: true, error: false }
  } catch (err) {
    console.log(err)
    return { success: false, error: true, errorMessage: err.message }
  }
}

export const updateAttendance = async (currentState, data) => {
  const { userId, sessionClaims } = await auth()
  const role = sessionClaims?.metadata.role

  try {
    if (role === 'teacher') {
      const teacherLesson = await prisma.lesson.findFirst({
        where: {
          teacherId: userId,
          id: data.lessonId,
        },
      })

      if (!teacherLesson) {
        return { success: false, error: true, errorMessage: 'You can only update attendance for your own lessons' }
      }
    }

    await prisma.attendance.update({
      where: {
        id: data.id,
      },
      data: {
        date: data.date,
        present: data.present,
        studentId: data.studentId,
        lessonId: data.lessonId,
      },
    })

    return { success: true, error: false }
  } catch (err) {
    console.log(err)
    return { success: false, error: true, errorMessage: err.message }
  }
}

export const deleteAttendance = async (currentState, data) => {
  const id = data.get('id')
  const { userId, sessionClaims } = await auth()
  const role = sessionClaims?.metadata.role

  try {
    await prisma.attendance.delete({
      where: {
        id: parseInt(id),
        ...(role === 'teacher' ? { lesson: { teacherId: userId } } : {}),
      },
    })

    return { success: true, error: false }
  } catch (err) {
    console.log(err)
    return { success: false, error: true, errorMessage: err.message }
  }
}
