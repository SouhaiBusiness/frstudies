import { notFound } from "next/navigation"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import { ArrowLeft, Calendar, User } from "lucide-react"
import clientPromise from "@/lib/mongodb"
import { marked } from 'marked'
import DOMPurify from 'dompurify'

// Define a type for the blog data
interface Blog {
  _id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  author?: string;
  slug: string;
  createdAt: Date;
  status: string;
}

marked.setOptions({
  async: false,
  gfm: true,
  breaks: true
})

const getPurify = () => {
  if (typeof window !== 'undefined') {
    return DOMPurify(window)
  }
  return {
    sanitize: (html: string) => html
  }
}

async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const client = await clientPromise
    const db = client.db()
    const blog = await db.collection("blogs").findOne({ slug })
    
    if (!blog) return null
    
    return {
      _id: blog._id.toString(),
      title: blog.title,
      description: blog.description,
      content: blog.content,
      category: blog.category,
      author: blog.author,
      slug: blog.slug,
      createdAt: blog.createdAt,
      status: blog.status
    }
  } catch (error) {
    console.error("Error fetching blog:", error)
    return null
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getBlogBySlug(params.slug)

  if (!article) {
    notFound()
  }

  const formattedDate = formatDistanceToNow(new Date(article.createdAt), {
    addSuffix: true,
    locale: fr,
  })

  const purify = getPurify()
  const htmlContent = purify.sanitize(marked.parse(article.content) as string)
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 bg-white mt-8 mb-4 rounded-xl shadow-2xl">
      <Link href="/articles" className="inline-flex items-center text-[#0e2d6d] hover:underline mb-8">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Retour aux articles
      </Link>

      <div className="mb-6">
        <span className="inline-block px-3 py-1 bg-blue-100 text-[#0e2d6d] rounded-full text-sm font-medium">
          {article.category}
        </span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold mb-6">{article.title}</h1>

      <div className="flex items-center text-gray-600 mb-8">
        <div className="flex items-center mr-6">
          <User className="h-4 w-4 mr-2" />
          <span>{article.author || "Anonyme"}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{formattedDate}</span>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </div>
  )
}