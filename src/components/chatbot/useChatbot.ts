'use client'

import { useState, useCallback, useMemo } from 'react'
import { sendMessage, saveLead, shouldCaptureLead } from '../../services/openaiService'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface LeadData {
  name: string
  email: string
  phone: string
  budget: string
  message?: string
}

export const useChatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: '¡Hola! Soy tu asistente virtual de Million Properties. ¿En qué puedo ayudarte hoy? Puedo responder preguntas sobre propiedades, procesos de compra, información de contacto y más.',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [leadData, setLeadData] = useState<LeadData>({
    name: '',
    email: '',
    phone: '',
    budget: ''
  })

  const handleSendMessage = useCallback(async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      // Verificar si deberíamos capturar un lead
      const shouldCapture = shouldCaptureLead(inputMessage)
      
      if (shouldCapture) {
        setShowLeadForm(true)
        setIsLoading(false)
        return
      }

      // Enviar mensaje a OpenAI
      const chatHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))

      const response = await sendMessage([
        ...chatHistory,
        { role: 'user', content: inputMessage.trim() }
      ])

      const botMessage: ChatMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
    } catch {
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }, [inputMessage, isLoading, messages])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value)
  }, [])

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }, [handleSendMessage])

  const handleLeadInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setLeadData(prev => ({
      ...prev,
      [name]: value
    }))
  }, [])

  const handleLeadSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!leadData.name || !leadData.email) {
      return
    }

    try {
      const success = await saveLead(leadData)
      
      if (success) {
        const successMessage: ChatMessage = {
          role: 'assistant',
          content: `¡Perfecto! Gracias ${leadData.name}. Hemos recibido tu información y un agente especializado te contactará pronto. Mientras tanto, ¿hay algo más en lo que pueda ayudarte?`,
          timestamp: new Date()
        }
        
        setMessages(prev => [...prev, successMessage])
        setShowLeadForm(false)
        setLeadData({ name: '', email: '', phone: '', budget: '' })
      } else {
        throw new Error('Error al guardar el lead')
      }
    } catch {
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Lo siento, hubo un error al procesar tu información. Por favor, intenta de nuevo o contacta directamente a info@millionproperties.com',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    }
  }, [leadData])

  const handleCloseLeadForm = useCallback(() => {
    setShowLeadForm(false)
    setLeadData({ name: '', email: '', phone: '', budget: '' })
    
    const continueMessage: ChatMessage = {
      role: 'assistant',
      content: 'No hay problema. ¿Hay algo más en lo que pueda ayudarte?',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, continueMessage])
  }, [])

  const memoizedValues = useMemo(() => ({
    messages,
    inputMessage,
    isLoading,
    showLeadForm,
    leadData,
    handleSendMessage,
    handleInputChange,
    handleKeyPress,
    handleLeadSubmit,
    handleLeadInputChange,
    handleCloseLeadForm
  }), [
    messages,
    inputMessage,
    isLoading,
    showLeadForm,
    leadData,
    handleSendMessage,
    handleInputChange,
    handleKeyPress,
    handleLeadSubmit,
    handleLeadInputChange,
    handleCloseLeadForm
  ])

  return memoizedValues
}
