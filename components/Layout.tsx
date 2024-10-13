"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="bg-primary text-primary-foreground p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Immobilienverwaltungs-App</h1>
          <div className="flex items-center space-x-4">
            <Link href="/" passHref>
              <Button variant="ghost" size="sm">
                <Home className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
      <footer className="bg-secondary text-secondary-foreground p-4 text-center text-sm">
        <p>&copy; 2023 Immobilienverwaltungs-App. Alle Rechte vorbehalten.</p>
      </footer>
    </div>
  );
}