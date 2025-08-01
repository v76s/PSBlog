import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { message: 'You must be logged in to comment' },
        { status: 401 }
      );
    }

    const { postId, content } = await request.json();

    if (!postId || !content) {
      return NextResponse.json(
        { message: 'Post ID and content are required' },
        { status: 400 }
      );
    }

    // Check if the post exists
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json(
        { message: 'Post not found' },
        { status: 404 }
      );
    }

    // Get the user from the database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Determine if the comment should be auto-approved
    // Admins' comments are auto-approved
    const autoApprove = user.role === 'ADMIN';

    // Create the comment
    const comment = await prisma.comment.create({
      data: {
        content,
        isApproved: autoApprove,
        post: {
          connect: { id: postId },
        },
        author: {
          connect: { id: user.id },
        },
      },
    });

    return NextResponse.json(
      { 
        message: autoApprove 
          ? 'Comment posted successfully' 
          : 'Comment submitted and awaiting approval',
        comment 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { message: 'An error occurred while creating the comment' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json(
        { message: 'Post ID is required' },
        { status: 400 }
      );
    }

    // Get approved comments for the post
    const comments = await prisma.comment.findMany({
      where: {
        postId,
        isApproved: true,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching comments' },
      { status: 500 }
    );
  }
}