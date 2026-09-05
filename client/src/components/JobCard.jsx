import { Link } from "react-router-dom";

function JobCard({ job }) {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>

      <p>
        <strong>Company:</strong> {job.company}
      </p>

      <p>
        <strong>Location:</strong> {job.location}
      </p>

      <Link to="/job-details">
        <button>Apply Now</button>
      </Link>
    </div>
  );
}

export default JobCard;