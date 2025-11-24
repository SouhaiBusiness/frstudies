'use client';

import type React from 'react';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

 export const dynamic = 'force-dynamic'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real application, you would send this data to your backend
      // For now, we'll simulate a successful submission after a delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

      setFormStatus({
        type: 'success',
        message:
          "Thank you! Your message has been sent successfully. We'll get back to you soon.",
      });
    } catch (error) {
      setFormStatus({
        type: 'error',
        message:
          'There was an error sending your message. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);

      // Clear status message after 5 seconds
      setTimeout(() => {
        setFormStatus({ type: null, message: '' });
      }, 5000);
    }
  };

  return (
    <div className='container mx-auto px-4 py-12'>
      <h1 className='text-4xl font-bold text-center mb-8 text-[#1a2630]'>
        Contact Us
      </h1>
      <p className='text-center text-gray-600 mb-12 max-w-2xl mx-auto'>
        Vous avez des questions, des suggestions ou des retours? vous voudriez
        collaborer ? Notre équipe est là pour vous aidez. Veuillez remplir le
        formulaire ci-dessous.
      </p>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto'>
        {/* Contact Information */}
        <div className='lg:col-span-1'>
          <div className='bg-gray-50 shadow-2xl p-6 rounded-xl h-full transform transition duration-1000 hover:scale-105'>
            <h2 className='text-2xl font-bold mb-6'>Contactez-nous !</h2>

            <div className='space-y-6'>
              <div className='flex items-start'>
                <Phone className='h-6 w-6 text-blue-700 mr-3 mt-0.5' />
                <div>
                  <h3 className='font-semibold'>Numéro de téléphone </h3>
                  <p className='text-gray-600'>(123) 456-7890</p>
                </div>
              </div>

              <div className='flex items-start'>
                <Mail className='h-6 w-6 text-blue-700 mr-3 mt-0.5' />
                <div>
                  <h3 className='font-semibold'>Adresse Email</h3>
                  <p className='text-gray-600'>support.frstudies@gmail.com</p>
                </div>
              </div>

              <div className='flex items-start'>
                <Clock className='h-6 w-6 text-blue-700 mr-3 mt-0.5' />
                <div>
                  <h3 className='font-semibold'>Heures de travail</h3>
                  <p className='text-gray-600'>
                    Lundi - Vendredi: 9h - 12h | 14 - 18h
                  </p>
                </div>
              </div>
            </div>

            <div className='mt-8 pt-6 border-t border-gray-200'>
              <h3 className='font-semibold mb-4'>Suivez-nous sur :</h3>
              <div className='flex space-x-4'>
                <a
                  href='#'
                  className='bg-[#0e2d6d] shadow-lg p-2 rounded-full text-white hover:opacity-90 transition-colors'
                >
                  <svg
                    className='h-5 w-5'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
                      clipRule='evenodd'
                    />
                  </svg>
                </a>
                <a
                  href='#'
                  className='bg-[#0e2d6d] shadow-lg p-2 rounded-full text-white hover:opacity-90 transition-colors'
                >
                  <svg
                    className='h-5 w-5'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
                      clipRule='evenodd'
                    />
                  </svg>
                </a>
                <a
                  href='#'
                  className='bg-[#0e2d6d] shadow-lg p-2 rounded-full text-white hover:opacity-90 transition-colors'
                >
                  <svg
                    className='h-5 w-5'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                  >
                    <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
                  </svg>
                </a>
                <a
  href="#"
  className="bg-[#0e2d6d] shadow-lg p-2 rounded-full flex justify-center items-center text-white hover:opacity-90 transition-colors"
 >
  <svg
    className="h-5 w-5"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V24h-4V8.5zM8.5 8.5h3.7v2.1h.1c.5-.9 1.7-2.1 3.6-2.1 3.8 0 4.5 2.5 4.5 5.8V24h-4v-8.3c0-2-.03-4.5-2.75-4.5-2.75 0-3.2 2.2-3.2 4.3V24h-4V8.5z" />
  </svg>
</a>

<a
  href="#"
  className="bg-[#0e2d6d] shadow-lg p-2 rounded-full text-white hover:opacity-90 transition-colors"
 >
  <svg
    className="h-5 w-5"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M20.298 3.27h-3.705l-3.385 4.435L9.927 3.27H4.37l5.492 7.5L3.702 20.73h3.705l3.625-4.745 3.405 4.745h5.557l-5.737-7.825 5.046-6.635zM16.91 18.23h-1.762l-6.337-8.855h1.76l6.34 8.855z" />
  </svg>
</a>


              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className='lg:col-span-2 p-4 bg-gray-50 rounded-xl shadow-2xl'>
          <h2 className=' mb-4 font-bold text-[#0e2d6d]'>Envoyez un message</h2>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Nom complet *
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className='w-full shadow-lg px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  placeholder='Sam Doe'
                />
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Adresse Email *
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className='w-full shadow-lg px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  placeholder='sam@exemple.com'
                />
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label
                  htmlFor='phone'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Numéro de téléphone (optionnel)
                </label>
                <input
                  type='tel'
                  id='phone'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  className='w-full shadow-lg px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  placeholder='(123) 456-7890'
                />
              </div>

              <div>
                <label
                  htmlFor='subject'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Sujet *
                </label>
                <select
                  id='subject'
                  name='subject'
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className='w-full shadow-lg px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                >
                  <option value=''>Select a subject</option>
                  <option value='Suggestions'>Suggestions</option>
                  <option value='Réclamation'>Réclamation</option>
                  <option value='Feedback'>Feedback</option>
                  <option value='Nous-rejoindre'>Nous rejoindre</option>
                  <option value='Collaboration'>
                    Collaboration & sponsoring
                  </option>
                  <option value='Other'>Other</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor='message'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Message *
              </label>
              <textarea
                id='message'
                name='message'
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className='w-full shadow-lg px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                placeholder='Comment pouvons-nous vous aider?'
              ></textarea>
            </div>

            {formStatus.message && (
              <div
                className={`p-4 rounded-md ${
                  formStatus.type === 'success'
                    ? 'bg-green-50 text-green-800'
                    : 'bg-red-50 text-red-800'
                }`}
              >
                {formStatus.message}
              </div>
            )}

            <div>
              <button
                type='submit'
                disabled={isSubmitting}
                className='inline-flex items-center justify-center w-full md:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#0e2d6d] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    Envoie...
                  </>
                ) : (
                  <>
                    <Send className='mr-2 h-5 w-5' />
                    Envoyer
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
