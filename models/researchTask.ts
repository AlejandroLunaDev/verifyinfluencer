import mongoose from 'mongoose';

// Definir el esquema para la colección "researchTasks"
const ResearchTaskSchema = new mongoose.Schema(
  {
    influencerName: {
      type: String,
      required: true, // Nombre del influencer relacionado
    },
    timeRange: {
      type: String,
      default: 'All Time', // Rango de tiempo seleccionado (e.g., "Last Month")
    },
    maxClaims: {
      type: Number,
      default: 50, // Número máximo de afirmaciones a analizar
    },
    selectedJournals: {
      type: [String], // Fuentes seleccionadas (e.g., "PubMed", "Nature")
    },
    includeRevenueAnalysis: {
      type: Boolean,
      default: false, // Si se incluye el análisis de ingresos
    },
    createdAt: {
      type: Date,
      default: Date.now, // Fecha de creación
    },
  },
  { timestamps: true } // Maneja automáticamente las fechas de creación y actualización
);

// Exportar el modelo o reutilizarlo si ya existe
const ResearchTaskModel =
  mongoose.models.ResearchTask || mongoose.model('ResearchTask', ResearchTaskSchema);

export default ResearchTaskModel;
