import Link from "next/link"
import { BookOpen, MessageSquare, Bookmark } from "lucide-react"

const quizzes = [
  {
    id: "Histoire des idées et de l'art",
    title: "Quiz de l'histoire des idées et de l'art",
    description: "Testez votre culture générale de l'histoire des idées et de l'art",
    icon: BookOpen,
    color: "bg-blue-600",
    questions: 20,
    level: "Débutant à Intermédiaire",
  },
  {
    id: "Morphosyntaxe",
    title: "Quiz de morphosyntaxe française",
    description: "Mettez-vous au défi avec des questions sur les règles et structures grammaticales du français.",
    icon: MessageSquare,
    color: "bg-green-600",
    questions: 20,
    level: "Intermédiaire",
  },
  {
    id: "Lexicologie",
    title: "Quiz de Lexicologie",
    description: "Testez vos connaissances sur les auteurs célèbres et les œuvres littéraires françaises.",
    icon: Bookmark,
    color: "bg-amber-600",
    questions: 20,
    level: "Avancé",
  },
]

export default function QuizCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {quizzes.map((quiz) => (
        <div key={quiz.id} className="bg-white shadow-2xl rounded-lg overflow-hidden border-b-[1px] border-gray-600 hover:shadow-md hover:translate-y-[-10px] transition-all" data-aos='fade-down'>
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className={`p-2 rounded-full ${quiz.color} text-white mr-3`}>
                <quiz.icon className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold">{quiz.title}</h2>
            </div>
            <p className="text-gray-600 mb-4">{quiz.description}</p>
            <div className="flex justify-between text-sm text-gray-500 mb-4">
              <span>{quiz.questions} questions</span>
              <span>{quiz.level}</span>
            </div>
            <Link
              href={`/quiz/${quiz.id}`}
              className={`w-full px-4 py-2 text-center inline-block text-white rounded ${quiz.color} hover:opacity-90`}
            >
              Commencer
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

