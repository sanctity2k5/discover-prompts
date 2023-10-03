import Provider from '@/components/Provider';
import '../styles/globals.css';
import Nav from '@/components/Nav';

export const metadata = {
  title: 'Discover-Prompts',
  description: 'Discover and share AI prompts',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
