import { HttpStatusCode } from 'axios'
import connectDB from '@/lib/connectDB'
import Specialite from '@/models/specialite'
import { NextResponse } from 'next/server'

export async function GET(_, { params }) {
  try {
    await connectDB()
    const specialite = await Specialite.findById(params.id)
    if (specialite) {
      return NextResponse.json({ specialite })
    } else {
      return NextResponse.json(
        { message: `Specialite ${params.id} not found` },
        {
          status: HttpStatusCode.NotFound,
        }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'malformed id' },
      { status: HttpStatusCode.BadRequest }
    )
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB()
    const specialite = await Specialite.findById(params.id)
    if (specialite) {
      const body = await req.json()

      specialite.maisonedit = body.maisonedit
      specialite.siteweb = body.siteweb
      specialite.email = body.email

      specialite.save()

      return NextResponse.json(specialite)
    } else {
      return NextResponse.json(
        { message: `Specialite ${params.id} not found` },
        {
          status: HttpStatusCode.NotFound,
        }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: HttpStatusCode.BadRequest }
    )
  }
}

export async function DELETE(_, { params }) {
  try {
    await connectDB()
    const specialite = await Specialite.findById(params.id)
    if (specialite) {
      await Specialite.findByIdAndDelete(params.id)
      return NextResponse.json({
        message: `Specialite ${params.id} has been deleted`,
      })
    } else {
      return NextResponse.json(
        { message: `Specialite ${params.id} not found` },
        { status: HttpStatusCode.NotFound }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: HttpStatusCode.BadRequest }
    )
  }
}
