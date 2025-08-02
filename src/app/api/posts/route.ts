import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(request: NextRequest) {
  const { title, content, excerpt, slug, coverImage, guestName, guestEmail } = await request.json();

  // Try to get session
  const session = await getServerSession(authOptions);

  let authorId = null;
  if (session && session.user) {
    const user = await prisma.user.findUnique({ where: { email: session.user.email as string } });
    authorId = user?.id ?? null;
  }

  const post = await prisma.post.create({
    data: {
      title,
      content,
      excerpt,
      slug,
      coverImage,
      authorId,
      guestName: authorId ? null : guestName,
      guestEmail: authorId ? null : guestEmail,
      published: false, // Guest posts should be reviewed before publishing
    },
  });

  return NextResponse.json({ post });
}