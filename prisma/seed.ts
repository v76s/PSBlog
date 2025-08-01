import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // Create regular user
  const userPassword = await hash('user123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Regular User',
      password: userPassword,
      role: 'USER',
    },
  });

  // Create tags
  const techTag = await prisma.tag.upsert({
    where: { name: 'Technology' },
    update: {},
    create: { name: 'Technology' },
  });

  const webDevTag = await prisma.tag.upsert({
    where: { name: 'Web Development' },
    update: {},
    create: { name: 'Web Development' },
  });

  const nextjsTag = await prisma.tag.upsert({
    where: { name: 'Next.js' },
    update: {},
    create: { name: 'Next.js' },
  });

  // Create sample posts
  const post1 = await prisma.post.upsert({
    where: { slug: 'getting-started-with-nextjs' },
    update: {},
    create: {
      title: 'Getting Started with Next.js',
      slug: 'getting-started-with-nextjs',
      content: 'Next.js is a React framework that enables server-side rendering and static site generation for React applications.\n\nIt provides a great developer experience with features like file-system routing, API routes, and built-in CSS support.\n\nIn this post, we\'ll explore how to set up a new Next.js project and build your first application.',
      excerpt: 'Learn how to set up and build your first Next.js application with this beginner-friendly guide.',
      published: true,
      authorId: admin.id,
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      tags: {
        connect: [{ id: webDevTag.id }, { id: nextjsTag.id }],
      },
    },
  });

  const post2 = await prisma.post.upsert({
    where: { slug: 'building-a-blog-with-nextjs-and-prisma' },
    update: {},
    create: {
      title: 'Building a Blog with Next.js and Prisma',
      slug: 'building-a-blog-with-nextjs-and-prisma',
      content: 'In this tutorial, we\'ll build a full-featured blog using Next.js, Prisma, and Tailwind CSS.\n\nPrisma is a next-generation ORM that makes working with databases easy and type-safe.\n\nWe\'ll cover setting up the database schema, creating API routes, and implementing server-side rendering for our blog posts.',
      excerpt: 'Learn how to create a modern blog application with Next.js, Prisma, and Tailwind CSS.',
      published: true,
      authorId: admin.id,
      coverImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      tags: {
        connect: [{ id: webDevTag.id }, { id: nextjsTag.id }],
      },
    },
  });

  const post3 = await prisma.post.upsert({
    where: { slug: 'the-future-of-web-development' },
    update: {},
    create: {
      title: 'The Future of Web Development',
      slug: 'the-future-of-web-development',
      content: 'Web development is constantly evolving, with new technologies and approaches emerging every year.\n\nIn this post, we\'ll explore some of the trends that are shaping the future of web development, including serverless architectures, edge computing, and AI-powered development tools.\n\nWe\'ll also discuss how these trends might affect developers and businesses in the coming years.',
      excerpt: 'Explore the emerging trends and technologies that will shape the future of web development.',
      published: true,
      authorId: user.id,
      coverImage: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      tags: {
        connect: [{ id: techTag.id }, { id: webDevTag.id }],
      },
    },
  });

  // Create sample comments
  await prisma.comment.createMany({
    data: [
      {
        content: 'Great introduction to Next.js! Looking forward to more tutorials.',
        postId: post1.id,
        authorId: user.id,
        isApproved: true,
      },
      {
        content: 'I\'ve been using Next.js for a while now and it\'s definitely improved my development workflow.',
        postId: post1.id,
        authorId: admin.id,
        isApproved: true,
      },
      {
        content: 'This tutorial was exactly what I needed to get started with Prisma. Thanks!',
        postId: post2.id,
        authorId: user.id,
        isApproved: true,
      },
      {
        content: 'I\'m excited about the possibilities of edge computing mentioned in this article.',
        postId: post3.id,
        authorId: admin.id,
        isApproved: true,
      },
      {
        content: 'This is a pending comment that needs approval.',
        postId: post3.id,
        authorId: user.id,
        isApproved: false,
      },
    ],
  });

  console.log('Database has been seeded!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });