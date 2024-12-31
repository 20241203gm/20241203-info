'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '45px',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    }}>
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        flex: 1,
      }}>
        <Link href="/" style={{
          color: 'white',
          textDecoration: 'none',
          fontSize: '1.1rem',
          fontWeight: pathname === '/' ? 'bold' : 'normal',
        }}>
          20241203.info
        </Link>
        <Link href="/archive" style={{
          color: 'rgba(255, 255, 255, 0.8)',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: pathname === '/archive' ? 'bold' : 'normal',
        }}>
          아카이브
        </Link>
        <Link href="/timeline" style={{
          color: 'rgba(255, 255, 255, 0.8)',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: pathname === '/timeline' ? 'bold' : 'normal',
        }}>
          타임라인
        </Link>
        <Link href="/wiki" style={{
          color: 'rgba(255, 255, 255, 0.8)',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: pathname === '/wiki' ? 'bold' : 'normal',
        }}>
          위키
        </Link>
      </nav>
    </header>
  );
} 