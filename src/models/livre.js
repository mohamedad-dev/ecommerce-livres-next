import mongoose from 'mongoose'

const livreSchema = mongoose.Schema({
  isbn: String,
  titre: { type: String, required: true },
  annedition: Number,
  prix: Number,
  qtestock: Number,
  couverture: String,
  specialite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Specialte',
  },
  maised: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Editeur',
  },
  auteurs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Auteur',
    },
  ],
})

const Livre = mongoose.models.Livre || mongoose.model('Livre', livreSchema)
export default Livre
