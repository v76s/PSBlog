import React from 'react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="relative bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 mb-12 overflow-hidden">
        <div className="absolute inset-0 bg-grid-primary/5 [mask-image:linear-gradient(0deg,white,transparent)] dark:[mask-image:linear-gradient(0deg,white,transparent)]" style={{ backgroundSize: '32px 32px' }}></div>
        <div className="relative">
          <h1 className="text-4xl font-bold mb-4 animate-fade-in">About <span className="text-primary">Me</span></h1>
          <p className="text-lg text-foreground/70 max-w-2xl animate-slide-up">Learn more about the person behind this blog.</p>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border/50 p-8 animate-slide-up">
        <div className="prose lg:prose-xl max-w-none text-foreground/90">
          <h2 className="text-2xl font-bold mb-4">Hello, I&apos;m the Author</h2>
          
          <p className="mb-4">
            Welcome to my personal blog! I&apos;m passionate about technology, design, and sharing knowledge with others.
            This space serves as my digital garden where I document my thoughts, experiences, and learnings.
          </p>
          
          <h3 className="text-xl font-semibold mt-8 mb-4">My Background</h3>
          
          <p className="mb-4">
            I have several years of experience in software development, with a focus on web technologies.
            My journey began with a curiosity about how websites work, which led me to explore various programming
            languages and frameworks. Today, I enjoy working with modern technologies like Next.js, React, and
            TypeScript to build performant and accessible web applications.
          </p>
          
          <h3 className="text-xl font-semibold mt-8 mb-4">What I Write About</h3>
          
          <p className="mb-4">
            On this blog, you can expect to find articles about:
          </p>
          
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Web Development</li>
            <li>Programming Tips & Tricks</li>
            <li>Technology Trends</li>
            <li>Personal Projects</li>
            <li>Learning Resources</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-8 mb-4">Connect With Me</h3>
          
          <p className="mb-4">
            I love connecting with like-minded individuals and learning from others in the community.
            Feel free to reach out to me through the comments on my blog posts or via social media.
          </p>
          
          <div className="flex space-x-4 mt-6">
            <a href="https://twitter.com" className="text-primary hover:text-primary-hover transition-colors" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
            <a href="https://github.com" className="text-primary hover:text-primary-hover transition-colors" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://linkedin.com" className="text-primary hover:text-primary-hover transition-colors" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}