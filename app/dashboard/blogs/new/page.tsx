'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Loader2, AlertTriangle } from 'lucide-react';
import { useNotification } from '@/components/notification';
import { Notification } from '@/components/notification';

// Dynamically import the markdown editor to avoid SSR issues
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
  loading: () => (
    <div className='h-64 border rounded-md flex items-center justify-center'>
      <Loader2 className='h-8 w-8 animate-spin text-blue-600' />
    </div>
  ),
});

const categories = [
  'Linguistique',
  'Littérarture',
  'Examens',
  'Quiz',
  'Commentaire Composé',
  "Histoire de l'art et de littérature",
  'Dissertation',
  'Essai',
  'Communication',
  'Traduction',
  'Art',
  'Philosophie',
  'Psychologie',
  'Sociologie',
  'Didactique et Pédagogie',
];

export default function CreateBlogPage() {
  const router = useRouter();
  const { notification, showNotification, hideNotification } =
    useNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '',
    slug: '',
    category: '',
    content: '',
    status: 'draft',
  });
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [apiResponse, setApiResponse] = useState<any>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleContentChange = (value?: string) => {
    setFormData((prev) => ({ ...prev, content: value || '' }));
  };

  const handleStatusChange = (status: string) => {
    setFormData((prev) => ({ ...prev, status }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorDetails(null);
    setApiResponse(null);

    // Validate form
    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !formData.content
    ) {
      showNotification('error', 'Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);

      console.log('Submitting blog data:', JSON.stringify(formData, null, 2));

      // Create a blog with fallback mechanism
      const createBlog = async (retryCount = 0, maxRetries = 2) => {
        try {
          const response = await fetch('/api/blogs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          const data = await response.json();
          setApiResponse(data);

          if (!response.ok) {
            throw new Error(
              data.error || data.details || 'Failed to create blog'
            );
          }

          return { success: true, data };
        } catch (error) {
          console.error(`Attempt ${retryCount + 1} failed:`, error);

          if (retryCount < maxRetries) {
            // Wait before retrying (exponential backoff)
            await new Promise((resolve) =>
              setTimeout(resolve, 1000 * Math.pow(2, retryCount))
            );
            return createBlog(retryCount + 1, maxRetries);
          }

          throw error;
        }
      };

      const result = await createBlog();

      if (result.success) {
        showNotification('success', 'Blog created successfully');

        // Redirect to dashboard after a short delay
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to create blog. Please try again.';
      showNotification('error', errorMessage);
      setErrorDetails(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='space-y-6'>
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={hideNotification}
        />
      )}

      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Create New Blog</h1>
      </div>

      {errorDetails && (
        <div className='bg-red-50 border border-red-200 text-red-800 p-4 rounded-md'>
          <div className='flex items-start'>
            <AlertTriangle className='h-5 w-5 mr-2 mt-0.5 flex-shrink-0' />
            <div>
              <h3 className='font-bold'>Error Details:</h3>
              <p className='mt-1'>{errorDetails}</p>

              {apiResponse && (
                <div className='mt-3'>
                  <h4 className='font-semibold'>API Response:</h4>
                  <pre className='mt-1 bg-red-100 p-2 rounded text-xs overflow-auto max-h-40'>
                    {JSON.stringify(apiResponse, null, 2)}
                  </pre>
                </div>
              )}

              <div className='mt-3'>
                <h4 className='font-semibold'>Troubleshooting:</h4>
                <ul className='list-disc list-inside mt-1 text-sm'>
                  <li>Check your MongoDB connection</li>
                  <li>Verify that your database user has write permissions</li>
                  <li>
                    Check if your IP address is whitelisted in MongoDB Atlas
                  </li>
                  <li>Try refreshing the page and submitting again</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='bg-white p-6 rounded-lg border shadow-sm'>
          <div className='grid gap-6 md:grid-cols-2'>
            <div className='space-y-2'>
              <label
                htmlFor='title'
                className='block text-sm font-medium text-gray-700'
              >
                Title <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                id='title'
                name='title'
                value={formData.title}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border rounded-md'
                required
              />
            </div>

            <div className='space-y-2'>
              <label
                htmlFor='slug'
                className='block text-sm font-medium text-gray-700'
              >
                Slug <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                id='slug'
                name='slug'
                value={formData.slug}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border rounded-md'
                required
              />
              <p className='text-xs text-gray-500'>
                URL-friendly version of the title
              </p>
            </div>

            <div className='space-y-2'>
              <label
                htmlFor='author'
                className='block text-sm font-medium text-gray-700'
              >
                Author
              </label>
              <input
                type='text'
                id='author'
                name='author'
                value={formData.author}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border rounded-md'
              />
            </div>

            <div className='space-y-2'>
              <label
                htmlFor='category'
                className='block text-sm font-medium text-gray-700'
              >
                Category <span className='text-red-500'>*</span>
              </label>
              <select
                id='category'
                name='category'
                value={formData.category}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border rounded-md'
                required
              >
                <option value=''>Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className='space-y-2 md:col-span-2'>
              <label
                htmlFor='description'
                className='block text-sm font-medium text-gray-700'
              >
                Description <span className='text-red-500'>*</span>
              </label>
              <textarea
                id='description'
                name='description'
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className='w-full px-3 py-2 border rounded-md'
                required
              />
            </div>
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg border shadow-sm'>
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Content <span className='text-red-500'>*</span>
            </label>
            <MDEditor
              value={formData.content}
              onChange={handleContentChange}
              height={400}
              preview='edit'
            />
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg border shadow-sm'>
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Publication Status</h3>
            <div className='flex gap-4'>
              <button
                type='button'
                onClick={() => handleStatusChange('draft')}
                className={`px-4 py-2 rounded-md ${
                  formData.status === 'draft'
                    ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300'
                    : 'bg-gray-100 text-gray-800 border border-gray-300'
                }`}
              >
                Save as Draft
              </button>
              <button
                type='button'
                onClick={() => handleStatusChange('published')}
                className={`px-4 py-2 rounded-md ${
                  formData.status === 'published'
                    ? 'bg-green-100 text-green-800 border-2 border-green-300'
                    : 'bg-gray-100 text-gray-800 border border-gray-300'
                }`}
              >
                Publish
              </button>
            </div>
          </div>
        </div>

        <div className='flex justify-end gap-2'>
          <button
            type='button'
            onClick={() => router.push('/dashboard')}
            className='px-4 py-2 border rounded-md hover:bg-gray-50'
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={isSubmitting}
            className='px-4 py-2 bg-[#0e2d6d] text-white rounded-md hover:bg-blue-700 flex items-center gap-2'
          >
            {isSubmitting && <Loader2 className='h-4 w-4 animate-spin' />}
            {isSubmitting ? 'Saving...' : 'Save Blog'}
          </button>
        </div>
      </form>
    </div>
  );
}
