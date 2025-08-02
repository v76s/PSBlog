import React from 'react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="relative bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 mb-12 overflow-hidden">
        <div className="absolute inset-0 bg-grid-primary/5 [mask-image:linear-gradient(0deg,white,transparent)] dark:[mask-image:linear-gradient(0deg,white,transparent)]" style={{ backgroundSize: '32px 32px' }}></div>
        <div className="relative">
          <h1 className="text-4xl font-bold mb-4 animate-fade-in">About<span className="text-primary"></span></h1>
          <p className="text-lg text-foreground/70 max-w-2xl animate-slide-up">Details about the purpose of this blog.</p>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border/50 p-8 animate-slide-up">
        <div className="prose lg:prose-xl max-w-none text-foreground/90">
          <h2 className="text-2xl font-bold mb-4">Hello, I&apos;m Volkan S.</h2>
          
          <p className="mb-4">
            Welcome to Projects for Yourself blog.<br/>
            I&apos;ll be taking some notes mainly based on applications related with AI tools and development.
            I&apos;m an electronics engineer but I&apos;ll be taking notes mainly on software development, sometimes simple <br/> electronics designs.
            <br/>This space serves as my digital garden where I document my thoughts, experiences, and learnings.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-4">My Background</h3>
          
          <p className="mb-4">
            Solution oriented Full Stack Software Engineer with 20+ years of experience across SaaS.
            Experienced in Embedded device design as well as Next/React/NodeTypescript/Javascript/related tools.
            Also .NET/Azure, C#, C++, Linux, LoRa/RF communication and advanced smart-card applications, 
            leading many implementations remote or on site internationally.Next.js, React, and
            TypeScript to build hardware and software solutions.
            </p>
          
          <h3 className="text-xl font-semibold mt-8 mb-4">The Application Notes are about </h3>
          
          <p className="mb-4">
            On this blog, you can expect to find articles about:
          </p>
          
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Development (AI assisted, tools/editors/extensions etc)</li>
            <li>Programming Tips & Tricks</li>
            <li>Technology Trends</li>
            <li>Personal Interest Projects (From past and future)</li>
            <li>Learning Resources</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-8 mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text">
            Connect
          </h3>
          
          <p className="mb-4">
            Feel free to contact me for all the details about the Application Notes.
            I&apos;d be happy to help if I can. 
          </p>
          
          <div className="flex space-x-4 mt-6">
            <a href="https://twitter.com" className="text-primary hover:text-primary-hover transition-colors" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
            <a href="https://github.com/v76s" className="text-primary hover:text-primary-hover transition-colors" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/volkansisalan" className="text-primary hover:text-primary-hover transition-colors" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}