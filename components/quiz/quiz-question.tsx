"use client"

import { CheckCircle } from "lucide-react"
import type { Question } from "@/data/quiz-data"

interface QuizQuestionProps {
  question: Question
  selectedAnswer: string
  onAnswerSelect: (answer: string) => void
}

export default function QuizQuestion({ question, selectedAnswer, onAnswerSelect }: QuizQuestionProps) {
  return (
    <div className="py-4">
      <h2 className="text-xl font-medium mb-6">{question.question}</h2>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(option)}
            className={`w-full text-left p-4 rounded-lg border transition-all ${
              selectedAnswer === option
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center">
              <div
                className={`flex-shrink-0 h-5 w-5 mr-2 rounded-full border ${
                  selectedAnswer === option ? "border-blue-500" : "border-gray-300"
                }`}
              >
                {selectedAnswer === option && <CheckCircle className="h-5 w-5 text-blue-500" />}
              </div>
              <span>{option}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

