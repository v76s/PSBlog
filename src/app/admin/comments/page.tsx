import { prisma } from '@/lib/prisma';
import { formatDistanceToNow } from 'date-fns';

async function approveComment(commentId: string) {
  'use server';
  
  await prisma.comment.update({
    where: { id: commentId },
    data: { isApproved: true },
  });
}

async function deleteComment(commentId: string) {
  'use server';
  
  await prisma.comment.delete({
    where: { id: commentId },
  });
}

export default async function AdminComments() {
  const comments = await prisma.comment.findMany({
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
      post: {
        select: {
          title: true,
          slug: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Comments</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <tr key={comment.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{comment.content.length > 100 ? `${comment.content.substring(0, 100)}...` : comment.content}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{comment.post.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{comment.author.name || 'Unknown'}</div>
                    <div className="text-sm text-gray-500">{comment.author.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${comment.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {comment.isApproved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {!comment.isApproved && (
                      <form action={approveComment.bind(null, comment.id)} className="inline">
                        <button type="submit" className="text-green-600 hover:text-green-900 mr-4">Approve</button>
                      </form>
                    )}
                    <form action={deleteComment.bind(null, comment.id)} className="inline">
                      <button type="submit" className="text-red-600 hover:text-red-900">Delete</button>
                    </form>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                  No comments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}