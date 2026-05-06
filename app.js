import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import authRoutes from './routes/auth.js';
import vehicleRoutes from './routes/vehicles.js';
import telemetryRoutes from './routes/telemetry.js';
import geofenceRoutes from './routes/geofences.js';
import notificationRoutes from './routes/notifications.js';
import { startWorker } from './jobs/processGps.js';

const app = express();
const httpServer = createServer(app);

// Setup Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/telemetry', telemetryRoutes);
app.use('/api/geofences', geofenceRoutes);
app.use('/api/notifications', notificationRoutes);

// Socket.io connection
io.on('connection', (socket) => {
  console.log('Client terhubung:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client terputus:', socket.id);
  });
});

// Export io untuk dipakai di file lain
export { io };

// Mulai BullMQ worker
startWorker(io);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`✅ Server aktif di http://localhost:${PORT}`);
});