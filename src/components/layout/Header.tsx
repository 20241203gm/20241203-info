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
        <a href="https://20241203.info" target="_blank" rel="noopener noreferrer" style={{
          color: 'white',
          textDecoration: 'none',
          fontSize: '1.1rem',
        }}>
          20241203.info
        </a>
        <Link href="/" style={{
          color: 'rgba(255, 255, 255, 0.8)',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: pathname === '/' ? 'bold' : 'normal',
        }}>
          광장의 목소리
        </Link>
        <Link href="/timeline" style={{
          color: 'rgba(255, 255, 255, 0.8)',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: pathname === '/timeline' ? 'bold' : 'normal',
        }}>
          계란타임라인
        </Link>
        <Link href="/wiki" style={{
          color: 'rgba(255, 255, 255, 0.8)',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: pathname === '/wiki' ? 'bold' : 'normal',
        }}>
          계란위키
        </Link>
      </nav>
    </header>
  );
} 