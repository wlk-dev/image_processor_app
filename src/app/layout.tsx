import React from 'react';
import './globals.css'; // Import global styles

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <div style={styles.container}>
          <header style={styles.header}>
            <h1>My Image Gallery</h1>
          </header>
          <main style={styles.main}>
            {children}
          </main>
          <footer style={styles.footer}>
            <p>&copy; {new Date().getFullYear()} My Image Gallery</p>
          </footer>
        </div>
      </body>
    </html>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  header: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px',
    textAlign: 'center',
  },
  main: {
    flex: 1,
    padding: '20px',
  },
  footer: {
    backgroundColor: '#f1f1f1',
    color: '#333',
    textAlign: 'center',
    padding: '10px',
  },
};

export default Layout;