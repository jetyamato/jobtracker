import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container">
      <h1>Job Tracker</h1>
      <p>Track your job applications in one place.</p>

      <Link to="/jobs">
        <button>Go to Jobs</button>
      </Link>
    </div>
  );
}
