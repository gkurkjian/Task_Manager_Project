// components/Layout.js
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Layout({ children }) {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 p-3">
      {children}
    </div>
  );
}
