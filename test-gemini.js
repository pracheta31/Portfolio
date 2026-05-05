// Simple test script to verify your Gemini API key works
// Run with: node test-gemini.js

import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

const API_KEY = process.env.VITE_GEMINI_API_KEY;

async function testGeminiAPI() {
  console.log("🧪 Testing Gemini API...\n");

  if (!API_KEY) {
    console.error("❌ Error: VITE_GEMINI_API_KEY not found in .env file");
    console.log("\n📝 Please add your API key to the .env file:");
    console.log("   VITE_GEMINI_API_KEY=your_api_key_here\n");
    process.exit(1);
  }

  console.log("✅ API key found");
  console.log(`   Key: ${API_KEY.substring(0, 10)}...${API_KEY.substring(API_KEY.length - 4)}\n`);

  try {
    console.log("🔄 Initializing Gemini AI...");
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    console.log("🔄 Getting model (gemini-1.5-pro-latest)...");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
    
    console.log("🔄 Sending test prompt...");
    const result = await model.generateContent("Say 'Hello! API is working!' in a friendly way.");
    
    const response = await result.response;
    const text = response.text();
    
    console.log("\n✅ Success! API is working correctly.\n");
    console.log("📨 Response from Gemini:");
    console.log(`   ${text}\n`);
    console.log("🎉 Your AI chat should work perfectly!\n");
    
  } catch (error) {
    console.error("\n❌ Error testing API:");
    console.error(`   ${error.message}\n`);
    
    if (error.message.includes("API_KEY_INVALID") || error.message.includes("API key not valid")) {
      console.log("💡 Troubleshooting:");
      console.log("   1. Check your API key is correct");
      console.log("   2. Generate a new key at: https://aistudio.google.com/app/apikey");
      console.log("   3. Make sure there are no extra spaces\n");
    } else if (error.message.includes("429")) {
      console.log("💡 Rate limit hit. Wait a moment and try again.\n");
    } else if (error.message.includes("not found") || error.message.includes("404")) {
      console.log("💡 Model not available. Trying alternative model...\n");
      
      try {
        const model2 = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result2 = await model2.generateContent("Say 'Hello! API is working!' in a friendly way.");
        const response2 = await result2.response;
        const text2 = response2.text();
        
        console.log("✅ Success with gemini-pro model!\n");
        console.log("📨 Response:");
        console.log(`   ${text2}\n`);
        console.log("💡 Update AiChat.jsx to use 'gemini-pro' instead of 'gemini-1.5-pro-latest'\n");
      } catch (err2) {
        console.error("❌ Alternative model also failed:", err2.message, "\n");
      }
    } else {
      console.log("💡 Check your internet connection and try again.\n");
    }
    
    process.exit(1);
  }
}

testGeminiAPI();
