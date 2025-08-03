import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { postId, content, guest } = await request.json();

  if (!postId || !content) {
    return NextResponse.json({ error: 'Missing postId or content' }, { status: 400 });
  }

  let guestName = guest;
  if (!guestName) {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    guestName = `Guest-${pad(now.getDate())}${pad(now.getMonth()+1)}${now.getFullYear()}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  }

  const comment = await prisma.comment.create({
    data: {
      postId,
      content,
      guestName,
      isApproved: false, // or true if you want auto-approval
    },
  });

  return NextResponse.json({ comment });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');
    if (!postId) {
      return NextResponse.json({ comments: [] });
    }
    const comments = await prisma.comment.findMany({
      where: { postId, isApproved: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ comments });
  } catch (error) {return NextResponse.json({ comments: [] }, { status: 500 });
  }
}