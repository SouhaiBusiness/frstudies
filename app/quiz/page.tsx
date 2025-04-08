import QuizCards from "@/components/quiz/quiz-cards";
import Image from "next/image"
 
 
export default function QuizPage() {
  return (
    <main className="container mx-auto px-4 py-8">

      <div className="relative h-[300px] w-full">
              <Image src="/quiz.jpg?height=350&width=1250" alt="quiz" fill className="object-cover rounded-xl shadow-lg" />
              <div className="absolute inset-0 backdrop-brightness-50 flex items-center justify-center rounded-xl shadow-lg">
                <div className="text-center text-white p-4 " data-aos='fade-down'>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">Session Quiz</h1>
                  <p className="text-lg max-w-2xl">
                 Diverses questions et corrigés conçus spécialement pour vous évaluer et assurer votre développement.
                  </p>
                </div>
              </div>
            </div>

      <h1 className="text-[#0e2d6d] text-3xl font-bold mt-4 mb-6 text-center">Quiz de langue et culture française</h1>
      <p className="text-center mb-8 max-w-2xl mx-auto">
      Mettez-vous au défi avec nos quiz interactifs sur la langue et la littérature françaises.
      </p>

      <QuizCards />
    </main>
  )
}

