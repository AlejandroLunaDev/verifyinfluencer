import mongoose, { Connection } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in your .env.local file');
}

// Creamos una caché local dentro del módulo
let cachedConnection: Connection | null = null;
let cachedPromise: Promise<Connection> | null = null;

async function connectDB(): Promise<Connection> {
  if (cachedConnection) {
    return cachedConnection;
  }

  if (!cachedPromise) {
    cachedPromise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        // Opciones adicionales si son necesarias
      })
      .then((mongoose) => mongoose.connection);
  }

  try {
    cachedConnection = await cachedPromise;
    return cachedConnection;
  } catch (error) {
    cachedPromise = null; // Reseteamos la promesa en caso de error
    throw error;
  }
}

export default connectDB;
