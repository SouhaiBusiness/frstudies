'use client'

import { useState } from 'react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setMessage('Email is required')
      return
    }

    setIsSubmitting(true)
    setMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      
      if (response.ok) {
        setMessage(data.message)
        setEmail('')
      } else {
        setMessage(data.error || 'An error occurred. Please try again.')
      }
    } catch (error) {
      setMessage('Failed to connect to the server. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-[#0e2d6d] text-white rounded-lg shadow-sm p-4" data-aos='fade-left'>
      <h3 className="text-lg font-semibold mb-3">Rejoignez-nous !</h3>
      <p className="text-sm mb-4">
        Soyez le premier à recevoir nos contenus et ressources exclusives !
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre adresse email"
          className="w-full px-3 py-2 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
          disabled={isSubmitting}
        />
        <button
          type="submit"
          className={`w-full bg-white text-[#0e2d6d] px-4 py-2 rounded hover:bg-gray-100 transition-colors font-medium ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#0e2d6d]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Envoi en cours...
            </span>
          ) : (
            "S'inscrire gratuitement"
          )}
        </button>
      </form>
      
      {message && (
        <div className={`mt-3 p-2 rounded text-sm ${
          message.includes('Merci') 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {message}
        </div>
      )}
    </div>
  )
}