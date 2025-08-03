import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-3xl font-bold mb-4">Post Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        The blog post you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/blog" 
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Browse All Posts
        </Link>
        <Link 
          href="/" 
          className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}