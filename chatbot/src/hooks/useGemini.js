import { useState, useRef } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'

const useGemini = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const abortControllerRef = useRef(null)

  const generateResponse = async (prompt, chat = null) => {
    setLoading(true)
    setError(null)
    
    // Create abort controller for this request
    abortControllerRef.current = new AbortController()
    
    try {
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
      
      if (!API_KEY) {
        throw new Error('API key is missing. Please check your .env file.')
      }

      const genAI = new GoogleGenerativeAI(API_KEY)
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        generationConfig: {
          temperature: 0.9,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        }
      })

      // Check if request was aborted
      if (abortControllerRef.current.signal.aborted) {
        throw new DOMException('Aborted', 'AbortError')
      }

      let result
      if (chat) {
        result = await chat.sendMessage(prompt, { signal: abortControllerRef.current.signal })
      } else {
        result = await model.generateContent(prompt, { signal: abortControllerRef.current.signal })
      }
      
      const response = await result.response
      const text = response.text()
      
      setLoading(false)
      return text
    } catch (err) {
      if (err.name === 'AbortError') {
        setError(null)
      } else {
        setError(err.message)
      }
      setLoading(false)
      throw err
    }
  }

  const startChat = () => {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
    const genAI = new GoogleGenerativeAI(API_KEY)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      }
    })
    return model.startChat({
      history: [],
      generationConfig: {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      },
    })
  }

  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      setLoading(false)
    }
  }

  return { generateResponse, startChat, stopGeneration, loading, error }
}

export default useGemini