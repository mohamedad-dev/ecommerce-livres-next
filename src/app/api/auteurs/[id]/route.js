import { HttpStatusCode } from 'axios'
import connectDB from '@/lib/connectDB'
import Auteur from '@/models/auteur'
import { NextResponse } from 'next/server'

export async function GET(_, { params }) {
  try {
    await connectDB()
    const auteur = await Auteur.findById(params.id)
    if (auteur) {
      return NextResponse.json({ auteur })
    } else {
      return NextResponse.json(
        { message: `Auteur ${params.id} not found` },
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
    const auteur = await Auteur.findById(params.id)
    if (auteur) {
      const body = await req.json()

      auteur.nomauteur = body.nomauteur
      auteur.email = body.email
      auteur.numtel = body.numtel

      auteur.save()

      return NextResponse.json(auteur)
    } else {
      return NextResponse.json(
        { message: `Auteur ${params.id} not found` },
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
    const auteur = await Auteur.findById(params.id)
    if (auteur) {
      await Auteur.findByIdAndDelete(params.id)
      return NextResponse.json({
        message: `Auteur ${params.id} has been deleted`,
      })
    } else {
      return NextResponse.json(
        { message: `Auteur ${params.id} not found` },
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
