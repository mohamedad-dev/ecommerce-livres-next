import mongoose from 'mongoose'

const specialteSchema = mongoose.Schema(
  {
    nomspecialite: String,
  },
  {
    timestamps: true,
  }
)

const Specialte =
  mongoose.models.Specialte || mongoose.model('Specialte', specialteSchema)
export default Specialte
