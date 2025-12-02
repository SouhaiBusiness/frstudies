import Link from "next/link"
import Image from "next/image"

interface MethodGuideCardProps {
  title: string
  description: string
  ctaText: string
  linkUrl: string
  imageSrc: string
  imageAlt: string
  bgColor?: string
  textColor?: string
}

export default function MethodGuideCard({
  title,
  description,
  ctaText,
  linkUrl,
  imageSrc,
  imageAlt,
  bgColor = "bg-gradient-to-r from-blue-50 to-indigo-50",
  textColor = "text-[#0e2d6d]"
}: MethodGuideCardProps) {
  return (
    <div className={`${bgColor} rounded-xl shadow-lg overflow-hidden border border-blue-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 mb-6`}>
      <div className="md:flex">
        {/* Image Section */}
        <div className="md:w-1/3 relative h-48 md:h-auto">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-blue-600/10"></div>
        </div>
        
        {/* Content Section */}
        <div className="md:w-2/3 p-6 md:p-8">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-white/80 text-xs font-semibold rounded-full border border-blue-200 mb-3">
              📚 Guide Méthodologique
            </span>
            <h3 className={`text-xl font-bold ${textColor} mb-2`}>{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
          
          <Link
            href={linkUrl}
            className="inline-flex items-center justify-between w-full md:w-auto group"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md group-hover:bg-blue-50 transition-colors">
                <span className="text-blue-600 font-bold text-lg">→</span>
              </div>
              <div>
                <span className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors block">
                  {ctaText}
                </span>
                <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                  Cliquez pour accéder au guide complet
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}