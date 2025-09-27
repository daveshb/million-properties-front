'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Chatbot } from './Chatbot'

interface ChatbotContextType {
  isOpen: boolean
  toggleChatbot: () => void
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined)

interface ChatbotProviderProps {
  children: ReactNode
}

export const ChatbotProvider: React.FC<ChatbotProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleChatbot = () => {
    setIsOpen(prev => !prev)
  }

  const value = {
    isOpen,
    toggleChatbot
  }

  return (
    <ChatbotContext.Provider value={value}>
      {children}
      <Chatbot isOpen={isOpen} onToggle={toggleChatbot} />
    </ChatbotContext.Provider>
  )
}

export const useChatbotContext = () => {
  const context = useContext(ChatbotContext)
  if (context === undefined) {
    throw new Error('useChatbotContext must be used within a ChatbotProvider')
  }
  return context
}
