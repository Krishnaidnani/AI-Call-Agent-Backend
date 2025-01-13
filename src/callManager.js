// callManager.js
const { EventEmitter } = require('events');
const Call = require('./models/Call');
const Customer = require('./models/Customer');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");
dotenv.config();
class CallManager extends EventEmitter {
  constructor() {
    super();
    this.activeCalls = new Map();
    this.GEMINI_API_KEY = process.env.GEMINI_API_KEY ;
 
    this.genAI = new GoogleGenerativeAI(this.GEMINI_API_KEY)
  }

  async initializeCall(customerData) {
    try {

      let customer = await Customer.findOne({ email: customerData.email });
      if (!customer) {
        customer = new Customer({
          name: customerData.name,
          email: customerData.email,
          company: customerData.company,
          leadScore: 0,
          lastContact: new Date()
        });
        await customer.save();
      }


      const call = new Call({
        customerId: customer._id,
        timestamp: new Date(),
        transcript: [],
        status: 'active'
      });
      await call.save();

      const callId = call._id.toString();
      
   
      this.activeCalls.set(callId, {
        id: callId,
        customerId: customer._id,
        startTime: new Date(),
        status: 'active',
        transcript: [],
        customerData,
        mongoCall: call,
        context: [] 
      });

      this.emit('callStarted', { 
        callId, 
        customerData,
        message: {
          speaker: 'agent',
          text: `Hello ${customerData.name}, I'm your AI sales assistant. How can I help you today?`,
          timestamp: new Date()
        }
      });
      console.log(callId);
      return callId;
    } catch (error) {
      console.error('Error initializing call:', error);
      throw error;
    }
  }




async generateAIResponse(call) {
  try {
    console.log("Generating AI response for customer:", call.customerData.name);

  
    const genAI = new GoogleGenerativeAI(this.GEMINI_API_KEY );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  
    const conversationHistory = call.context
      .map(msg => msg.replace(/^(Customer:|AI Agent:)\s*/, "").trim())
      .join("\n");

 
    const prompt = `
    You are a pizza delivery agent for Bella Crust Pizzeria. Follow these rules and also use your intelligence:
    add menu card MENU:     Pizzas (Available in Small 10", Medium 12", Large 14"):    
     - Margherita Pizza (Fresh tomatoes, mozzarella, basil) - S: $8.99, M: $10.99, L: $12.99    
      - Pepperoni Pizza (Classic pepperoni, mozzarella) - S: $10.99, M: $12.99, L: $14.99    
       - Veggie Delight Pizza (Bell peppers, mushrooms, onions) - S: $9.99, M: $11.99, L: $13.99    
        - BBQ Chicken Pizza (Grilled chicken, BBQ sauce) - S: $12.99, M: $14.99, L: $16.99     
         Sides:     - Extra Cheese - $1.50    
          - Garlic Bread - $3.99     
          - Soda (Coke, Sprite, Fanta) - $1.99    
     - Chocolate Lava Cake - $4.99



    RULES:
    1.be just like a friend and have humorous replies during whole conversion but stick to domain of pizzas and don't be repetitive and act as if you are human having your own favorites
    2. If this is the first message, greet and ask name and during whole conversion try acting as human as possible after name is given then  greet using name and go for next step
    3. say to check our menu click on "open menu button" on top right corner then ask for order and if asked for recommendation suggest your favorite
    4. If no address is provided yet, ask for delivery address and your delivery address is only within india.
    5. If no order is placed yet, help them choose from the menu, dont repeat menu again
    6. Always confirm orders and addresses received and tell the total price using above menu and confirm the order
    7. if size of pizza is not specified ask for the size of specific pizza for which size is not specified.
    8. if order is received and address is confirmed then greet thank you for using our services and say bye,have a great day and don't be repetitive
    9. Keep responses under 3 sentences unless listing menu items
    10. Never mention being an AI or having technical difficulties
    

    Current Customer: ${conversationHistory}
    Previous Conversation:
    ${conversationHistory}

    Customer's last message: ${call.context[call.context.length - 1]}

    Respond as the pizza agent:`;


    const result = await model.generateContent(prompt);
    const response = result.response;
    
    if (!response || !response.text()) {
      throw new Error("Invalid response from Gemini");
    }

    let aiResponse = response.text().trim();

    
    if (aiResponse.length < 10) {
      throw new Error("Response too short");
    }

    return aiResponse;

  } catch (error) {
    console.error('AI response generation failed:', error);


    if (error.message?.includes('PERMISSION_DENIED')) {
      console.error('Invalid API key or permissions issue');
      return "I apologize, there's a configuration issue. Please contact support.";
    }

    if (error.message?.includes('RESOURCE_EXHAUSTED')) {
      return "I apologize, we've reached our API limit. Please try again in a moment.";
    }

    return "I apologize, I'm experiencing technical difficulties. Please try again.";
  }
}


  async handleMessage(callId, message, speaker) {
    try {
      const call = this.activeCalls.get(callId);
      console.log(callId);
      if (!call) throw new Error('Call not found');
     
      const messageEntry = {
        speaker,
        text: message,
        timestamp: new Date()
      };
  
 
      call.transcript.push(messageEntry);
      call.mongoCall.transcript.push(messageEntry);
      await call.mongoCall.save();
  

      call.context.push(`${speaker}: ${message}`);
      if (call.context.length > 10) call.context.shift();
  

      if (speaker === 'customer') {
        const response = await this.generateAIResponse(call);
        const agentResponse = {
          speaker: 'agent',
          text: response,
          timestamp: new Date()
        };
  
        call.transcript.push(agentResponse);
        call.mongoCall.transcript.push(agentResponse);
        await call.mongoCall.save();
 
        this.emit('messageProcessed', { 
          callId, 
          message: agentResponse,
          shouldSpeak: true
        });
      }
  console.log(call.transcript);
      return call.transcript;
    } catch (error) {
      console.error('Error handling message:', error);
      throw error;
    }
  }

  

  async endCall(callId) {
    try {
      const call = this.activeCalls.get(callId);
      if (!call) return false;

      call.mongoCall.duration = (new Date() - call.startTime) / 1000;
      call.mongoCall.status = 'completed';
      await call.mongoCall.save();

      const customer = await Customer.findById(call.customerId);
      if (customer) {
        customer.lastContact = new Date();
        customer.interactionHistory.push(call.mongoCall._id);
        await customer.save();
      }

      this.activeCalls.delete(callId);
      this.emit('callEnded', { 
        callId, 
        duration: call.mongoCall.duration,
        transcript: call.transcript 
      });
      return true;
    } catch (error) {
      console.error('Error ending call:', error);
      throw error;
    }
  }
}

module.exports = CallManager;