/**
 * MaidanMind Configuration
 * ========================
 * API keys and service configuration for Google Services integration.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Get a Gemini API key from https://aistudio.google.com/apikey
 * 2. Get a Google Maps API key from https://console.cloud.google.com
 * 3. Create a Firebase project at https://console.firebase.google.com
 * 4. Replace the placeholder values below with your actual keys
 * 
 * SECURITY NOTE:
 * In production, API keys should be handled server-side.
 * This client-side approach is for hackathon demonstration only.
 */

const CONFIG = {
  // Gemini AI API
  GEMINI_API_KEY: '[ENCRYPTION_KEY]',
  GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',

  // Google Maps Platform
  MAPS_API_KEY: 'YOUR_GOOGLE_MAPS_API_KEY',

  // Firebase Configuration
  FIREBASE: {
    apiKey: 'YOUR_FIREBASE_API_KEY',
    authDomain: 'maidanmind.firebaseapp.com',
    databaseURL: 'https://maidanmind-default-rtdb.firebaseio.com',
    projectId: 'maidanmind',
    storageBucket: 'maidanmind.appspot.com',
    messagingSenderId: '000000000000',
    appId: '1:000000000000:web:0000000000000000'
  },

  // App Settings
  APP: {
    name: 'MaidanMind',
    version: '1.0.0',
    defaultLanguage: 'en',
    refreshInterval: 10000,     // Crowd data refresh: 10 seconds
    queueRefreshInterval: 5000, // Queue refresh: 5 seconds
    heatAlertThreshold: 40,     // Temperature alert threshold in °C
    crowdDangerThreshold: 90,   // Crowd density danger level (%)
    supportedLanguages: ['en', 'hi', 'mr', 'gu', 'ta', 'bn', 'kn']
  },

  /**
   * Check if real API keys are configured
   * @returns {boolean} True if at least Gemini key is set
   */
  isConfigured() {
    return this.GEMINI_API_KEY !== '[ENCRYPTION_KEY]';
  },

  /**
   * Check if Google Maps is configured
   * @returns {boolean}
   */
  isMapsConfigured() {
    return this.MAPS_API_KEY !== 'YOUR_GOOGLE_MAPS_API_KEY';
  }
};
