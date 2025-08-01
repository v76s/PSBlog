'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const AdminSidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Posts', href: '/admin/posts' },
    { name: 'Comments', href: '/admin/comments' },
    { name: 'Users', href: '/admin/users' },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white p-6 space-y-6">
      <div className="text-2xl font-bold">Admin Panel</div>
      
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block py-2 px-4 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="pt-6 mt-6 border-t border-gray-700">
        <Link href="/" className="block py-2 px-4 rounded hover:bg-gray-700">
          View Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full text-left py-2 px-4 rounded hover:bg-gray-700 text-red-400"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;