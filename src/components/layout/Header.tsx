'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

const linkStyle = (isActive: boolean) => ({
  fontWeight: isActive ? '600' : '400',
});

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
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <Image
          src="/icon.png"
          alt="20241203.info 로고"
          width={24}
          height={24}
          style={{
            borderRadius: '4px',
          }}
        />
        <a 
          href="https://www.20241203.info/" 
          target="_self" 
          rel="noopener noreferrer" 
          className={styles.logo}
        >
          20241203.info
        </a>
      </div>

      <nav className={styles.nav}>
        <Link 
          href="https://www.20241203.info/16c7c57db3658034a423df6dfe3be8f3"
          target="_self" 
          className={`${styles.navLink} ${pathname === '/timeline' ? styles.active : ''}`}
        >
          계란타임라인
        </Link>
        <Link 
          href="/wiki" 
          className={`${styles.navLink} ${pathname === '/wiki' ? styles.active : ''}`}
        >
          계란위키
        </Link>
        <Link 
          href="/" 
          className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}
        >
          광장의 목소리
        </Link>
      </nav>
    </header>
  );
} 