
module.exports = (io, callManager) => {

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

  
    socket.on('joinCall', (callId) => {
      console.log(`Socket ${socket.id} joining call: ${callId}`);
      socket.join(`call:${callId}`);
    });

   
    socket.on('leaveCall', (callId) => {
      console.log(`Socket ${socket.id} leaving call: ${callId}`);
      socket.leave(`call:${callId}`);
    });

   
    socket.on('customerMessage', async ({ callId, message, speaker }) => {
      try {
        await callManager.handleMessage(callId, message, speaker);
      } catch (error) {
        console.error('Error handling customer message:', error);
        socket.emit('error', { message: 'Error processing message' });
      }
    });

  
    callManager.on('callStarted', (data) => {
      io.to(`call:${data.callId}`).emit('messageProcessed', {
        callId: data.callId,
        message: data.message,
        shouldSpeak: true
      });
    });

    callManager.on('messageProcessed', (data) => {
      io.to(`call:${data.callId}`).emit('messageProcessed', data);
    });

    callManager.on('callEnded', (data) => {
      io.to(`call:${data.callId}`).emit('callEnded', data);
    
      io.in(`call:${data.callId}`).socketsLeave(`call:${data.callId}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};