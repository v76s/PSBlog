import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import PostEditor from '@/components/admin/PostEditor';

async function updatePost(formData: FormData) {
  'use server';
  
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }

  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const slug = formData.get('slug') as string;
  const excerpt = formData.get('excerpt') as string || null;
  const coverImage = formData.get('coverImage') as string || null;
  const published = formData.has('published');

  await prisma.post.update({
    where: { id },
    data: {
      title,
      content,
      slug,
      excerpt,
      coverImage,
      published,
    },
  });

  redirect('/admin/posts');
}

export default async function EditPost({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/');
  }

  const post = await prisma.post.findUnique({
    where: { id: params.id },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Post</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <PostEditor post={post} onSubmit={updatePost} />
      </div>
    </div>
  );
}