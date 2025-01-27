// utils/saveInfluencers.ts

import { Influencer } from "@/models/influencers";
import connectDB from "../mongodb";


export async function saveInfluencersToDB(influencers: Influencer[]) {
  await connectDB(); // Conectar a MongoDB

  try {
    for (const influencer of influencers) {
      // Verificar si el influencer ya existe en la base de datos por username
      const existingInfluencer = await Influencer.findOne({
        username: influencer.username,
      });

      if (existingInfluencer) {
        // Si ya existe, actualizar
        await Influencer.updateOne(
          { username: influencer.username },
          { $set: influencer }
        );
      } else {
        // Si no existe, crear un nuevo documento
        await Influencer.create(influencer);
      }
    }

    console.log("Influencers guardados exitosamente en la base de datos.");
  } catch (error) {
    console.error("Error al guardar influencers en la base de datos:", error);
    throw new Error("Error al guardar influencers");
  }
}
