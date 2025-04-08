interface QuizProgressProps {
    currentQuestion: number
    totalQuestions: number
    userAnswers: string[]
  }
  
  export default function QuizProgress({ currentQuestion, totalQuestions, userAnswers }: QuizProgressProps) {
    // Calculate progress percentage
    const progressPercentage = (currentQuestion / totalQuestions) * 100
  
    // Calculate answered questions count
    const answeredCount = userAnswers.filter((answer) => answer !== "").length
    const answeredPercentage = (answeredCount / totalQuestions) * 100
  
    return (
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-600">
            Question {currentQuestion} of {totalQuestions}
          </span>
          <span className="text-sm text-gray-600">{answeredCount} answered</span>
        </div>
  
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
  
        <div className="mt-2 flex justify-between text-xs text-gray-500">
          <span>Progress: {Math.round(progressPercentage)}%</span>
          <span>Completion: {Math.round(answeredPercentage)}%</span>
        </div>
      </div>
    )
  }
  
  