import connectDB from '@/lib/connectDB'
import { NextResponse } from 'next/server'
import Livre from '@/models/livre'
import { HttpStatusCode } from 'axios'

export async function GET() {
  try {
    await connectDB()
    const livres = await Livre.find({}, null, { sort: { _id: -1 } })
      .populate('specialite')
      .populate('maised')
      .populate('auteurs')
    return NextResponse.json(livres)
  } catch (error) {
    return NextResponse.json({ error: error.message })
  }
}
export async function POST(req) {
  try {
    await connectDB()
    const body = await req.json()
    // if (body.titre) {
    const livre = await Livre.create(body)
    return NextResponse.json(
      { livre, message: 'your book has been created' },
      { status: HttpStatusCode.Created }
    )
    // } else {
    //   return NextResponse.json(
    //     { error: 'titre is missing' },
    //     { status: HttpStatusCode.BadRequest }
    //   )
    // }
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: HttpStatusCode.BadRequest }
    )
  }
}

// export async function POST(req) {
//   try {
//     await connectDB()
//     const body = await req.json()
//     if (body.titre) {
//       const livre = await Livre.create(body)
//       return NextResponse.json(
//         { livre, message: 'Your book has been created' },
//         { status: HttpStatusCode.Created }
//       )
//     }
//     return NextResponse.json(
//       { message: 'Title is missing' },
//       { status: HttpStatusCode.BadRequest }
//     )
//   } catch (error) {
//     return NextResponse.json(
//       { message: error },
//       { status: HttpStatusCode.BadRequest }
//     )
//   }
// }
