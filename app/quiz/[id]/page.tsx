"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { quizData } from "@/data/quiz-data"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import QuizProgress from "@/components/quiz/quiz-progress"
import QuizResults from "@/components/quiz/quiz-results"
import QuizQuestion from "@/components/quiz/quiz-question"

export default function QuizPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const quizId = params.id

  // Find the quiz by ID
  const quiz = quizData.find((q) => q.id === quizId)

  // If quiz not found, show error
  if (!quiz) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Quiz Not Found</h1>
        <p className="mb-6">Sorry, the quiz you're looking for doesn't exist.</p>
        <Link href="/quiz" className="inline-flex items-center text-blue-600 hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Quizzes
        </Link>
      </div>
    )
  }

  // State for the current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  // State for user answers
  const [userAnswers, setUserAnswers] = useState<string[]>(Array(quiz.questions.length).fill(""))

  // State for quiz completion
  const [isCompleted, setIsCompleted] = useState(false)

  // State for timer
  const [timeRemaining, setTimeRemaining] = useState(60 * 20) // 20 minutes in seconds

  // Handle answer selection
  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestionIndex] = answer
    setUserAnswers(newAnswers)
  }

  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setIsCompleted(true)
    }
  }

  // Handle previous question
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  // Handle quiz restart
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0)
    setUserAnswers(Array(quiz.questions.length).fill(""))
    setIsCompleted(false)
    setTimeRemaining(60 * 20) // Reset timer to 20 minutes
  }

  // Timer effect
  useEffect(() => {
    if (isCompleted) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          setIsCompleted(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isCompleted])

  // Format time remaining
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  // Calculate results
  const calculateResults = () => {
    let correctCount = 0

    quiz.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctCount++
      }
    })

    return {
      total: quiz.questions.length,
      correct: correctCount,
      incorrect: quiz.questions.length - correctCount,
      percentage: Math.round((correctCount / quiz.questions.length) * 100),
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/quiz" className="inline-flex items-center text-blue-600 hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Quizzes
        </Link>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{quiz.title}</h1>
            <div className="text-gray-600">
              Time Remaining:{" "}
              <span className={timeRemaining < 60 ? "text-red-600 font-bold" : ""}>{formatTime(timeRemaining)}</span>
            </div>
          </div>

          {!isCompleted ? (
            <>
              <QuizProgress
                currentQuestion={currentQuestionIndex + 1}
                totalQuestions={quiz.questions.length}
                userAnswers={userAnswers}
              />

              <QuizQuestion
                question={quiz.questions[currentQuestionIndex]}
                selectedAnswer={userAnswers[currentQuestionIndex]}
                onAnswerSelect={handleAnswerSelect}
              />

              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded disabled:opacity-50"
                >
                  Previous
                </button>

                <button
                  onClick={handleNextQuestion}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {currentQuestionIndex === quiz.questions.length - 1 ? "Finish Quiz" : "Next Question"}
                </button>
              </div>
            </>
          ) : (
            <QuizResults
              results={calculateResults()}
              userAnswers={userAnswers}
              questions={quiz.questions}
              onRestart={handleRestartQuiz}
            />
          )}
        </div>
      </div>
    </div>
  )
}

