import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'
import Layout from '../components/Layout'

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      {/* <h1 className="mb-4 text-center">Task Manager</h1> */}
      <Component {...pageProps} />
    </Layout>
  );
}
