
const express = require('express');
const router = express.Router();

const routes = (callManager) => {
  router.post('/calls/start', async (req, res) => {
    try {
      const { customerData } = req.body;
      if (!customerData || !customerData.name || !customerData.email) {
        return res.status(400).json({ 
          success: false, 
          error: 'Missing required customer data' 
        });
      }

      const callId = await callManager.initializeCall(customerData);
     res.json({ success: true, callId });
    } catch (error) {
      console.error('Start call error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // routes/index.js
router.post('/calls/:callId/message', async (req, res) => {
  try {
    const { callId } = req.params;
    const { message, speaker } = req.body;

    if (!message || !speaker) {
      return res.status(400).json({
        success: false,
        error: 'Message and speaker are required',
      });
    }

  
    const transcript = await callManager.handleMessage(callId, message, speaker);


    req.app.get('socketio').to(`call:${callId}`).emit('messageProcessed', {
      callId,
      message,
      speaker,
      transcript,
    });
    console.log("in message");
 
    res.json({ success: true, transcript });
  } catch (error) {
    console.error('Message handling error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

  router.delete('/calls/:callId', async (req, res) => {
    try {
      const { callId } = req.params;
      const success = await callManager.endCall(callId);
      res.json({ success });
    } catch (error) {
      console.error('End call error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  router.get('/calls/active/count', async (req, res) => {
    try {
      const count = callManager.activeCalls.size;
      res.json({ success: true, count });
    } catch (error) {
      console.error('Get active calls error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  return router;
};

module.exports = routes;