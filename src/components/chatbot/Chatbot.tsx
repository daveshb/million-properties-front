'use client'

import React from 'react'
import { useChatbot } from './useChatbot'
import style from './chatbot.module.scss'

interface ChatbotProps {
  isOpen: boolean
  onToggle: () => void
}

export const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onToggle }) => {
  const {
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
  } = useChatbot()

  if (!isOpen) {
    return (
      <button 
        className={style.chatbotToggle}
        onClick={onToggle}
        aria-label="Abrir chatbot"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="currentColor"/>
        </svg>
      </button>
    )
  }

  return (
    <div className={style.chatbotContainer}>
      <div className={style.chatbotHeader}>
        <div className={style.chatbotTitle}>
          <h3>Asistente Virtual</h3>
          <p>¿En qué puedo ayudarte?</p>
        </div>
        <button 
          className={style.chatbotClose}
          onClick={onToggle}
          aria-label="Cerrar chatbot"
        >
          ×
        </button>
      </div>

      <div className={style.chatbotMessages}>
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`${style.message} ${message.role === 'user' ? style.userMessage : style.botMessage}`}
          >
            <div className={style.messageContent}>
              {message.content}
            </div>
            <div className={style.messageTime}>
              {new Date(message.timestamp).toLocaleTimeString('es-ES', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className={`${style.message} ${style.botMessage}`}>
            <div className={style.typingIndicator}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>

      {showLeadForm ? (
        <div className={style.leadForm}>
          <h4>¡Excelente! Déjanos tus datos para contactarte</h4>
          <form onSubmit={handleLeadSubmit}>
            <div className={style.formGroup}>
              <label htmlFor="name">Nombre completo *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={leadData.name}
                onChange={handleLeadInputChange}
                required
                placeholder="Tu nombre completo"
              />
            </div>
            <div className={style.formGroup}>
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={leadData.email}
                onChange={handleLeadInputChange}
                required
                placeholder="tu@email.com"
              />
            </div>
            <div className={style.formGroup}>
              <label htmlFor="phone">Teléfono</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={leadData.phone}
                onChange={handleLeadInputChange}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className={style.formGroup}>
              <label htmlFor="budget">Presupuesto aproximado</label>
              <select
                id="budget"
                name="budget"
                value={leadData.budget}
                onChange={handleLeadInputChange}
              >
                <option value="">Selecciona un rango</option>
                <option value="100k-300k">$100,000 - $300,000</option>
                <option value="300k-500k">$300,000 - $500,000</option>
                <option value="500k-1m">$500,000 - $1,000,000</option>
                <option value="1m+">Más de $1,000,000</option>
              </select>
            </div>
            <div className={style.formActions}>
              <button type="button" onClick={handleCloseLeadForm} className={style.btnSecondary}>
                Cancelar
              </button>
              <button type="submit" className={style.btnPrimary}>
                Enviar datos
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className={style.chatbotInput}>
          <input
            type="text"
            value={inputMessage}
            onChange={handleInputChange}
            onKeyUp={handleKeyPress}
            placeholder="Escribe tu pregunta..."
            disabled={isLoading}
          />
          <button 
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className={style.sendButton}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
