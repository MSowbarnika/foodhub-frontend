import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="section center">
      <h2>404 - Page not found</h2>
      <Link to="/" className="btn">Go to home</Link>
    </div>
  );
}