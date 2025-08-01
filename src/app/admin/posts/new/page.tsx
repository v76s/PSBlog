import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import PostEditor from '@/components/admin/PostEditor';

async function createPost(formData: FormData) {
  'use server';
  
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }

  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const slug = formData.get('slug') as string;
  const excerpt = formData.get('excerpt') as string || null;
  const coverImage = formData.get('coverImage') as string || null;
  const published = formData.has('published');

  await prisma.post.create({
    data: {
      title,
      content,
      slug,
      excerpt,
      coverImage,
      published,
      author: {
        connect: {
          id: session.user.id,
        },
      },
    },
  });

  redirect('/admin/posts');
}

export default async function NewPost() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/');
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create New Post</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <PostEditor onSubmit={createPost} />
      </div>
    </div>
  );
}