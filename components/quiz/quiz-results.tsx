"use client"

import { Check, X, RotateCcw } from "lucide-react"
import type { Question } from "@/data/quiz-data"

interface QuizResultsProps {
  results: {
    total: number
    correct: number
    incorrect: number
    percentage: number
  }
  userAnswers: string[]
  questions: Question[]
  onRestart: () => void
}

export default function QuizResults({ results, userAnswers, questions, onRestart }: QuizResultsProps) {
  // Determine result message based on percentage
  const getResultMessage = (percentage: number) => {
    if (percentage >= 90) return "Excellent! You're a French expert!"
    if (percentage >= 70) return "Great job! You have a strong knowledge of French!"
    if (percentage >= 50) return "Good effort! Keep practicing to improve your French skills."
    return "Keep studying! With more practice, you'll improve your French knowledge."
  }

  // Determine result color based on percentage
  const getResultColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600"
    if (percentage >= 70) return "text-blue-600"
    if (percentage >= 50) return "text-amber-600"
    return "text-red-600"
  }

  return (
    <div className="py-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Quiz Results</h2>

      <div className="mb-8 text-center">
        <div className="text-6xl font-bold mb-2 transition-all duration-700 animate-pulse">
          <span className={getResultColor(results.percentage)}>{results.percentage}%</span>
        </div>
        <p className="text-xl">{getResultMessage(results.percentage)}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold">{results.total}</div>
          <div className="text-gray-600">Total Questions</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">{results.correct}</div>
          <div className="text-green-600">Correct Answers</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-red-600">{results.incorrect}</div>
          <div className="text-red-600">Incorrect Answers</div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Review Your Answers</h3>
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                userAnswers[index] === question.correctAnswer ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  {userAnswers[index] === question.correctAnswer ? (
                    <Check className="h-5 w-5 text-green-600" />
                  ) : (
                    <X className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <div className="ml-3">
                  <p className="font-medium">{question.question}</p>
                  <p className="text-sm mt-1">
                    <span className="font-medium">Your answer:</span> {userAnswers[index] || "Not answered"}
                  </p>
                  {userAnswers[index] !== question.correctAnswer && (
                    <p className="text-sm mt-1 text-green-600">
                      <span className="font-medium">Correct answer:</span> {question.correctAnswer}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onRestart}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <RotateCcw className="h-5 w-5 mr-2" />
          Restart Quiz
        </button>
      </div>
    </div>
  )
}

