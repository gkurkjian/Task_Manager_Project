// pages/_app.js
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'; // your own styles
import Navigation from '@/components/Navigation';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navigation />
      <main style={{ paddingTop: '70px' }}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
