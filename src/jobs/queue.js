import { Queue } from 'bullmq'

// Konfigurasi koneksi Redis
export const redisConnection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
}

// Buat GPS processing queue
export const gpsQueue = new Queue('gpsQueue', {
  connection: redisConnection
})

console.log('📦 BullMQ Queue "gpsQueue" siap.')