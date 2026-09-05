import "./JobDetails.css";
import { Link } from "react-router-dom";

function JobDetails() {
  return (
    <div className="job-details">

      <div className="details-card">

        <h1>Software Engineer</h1>

        <h3>Google</h3>

        <p><strong>Location:</strong> Hyderabad</p>

        <p><strong>Salary:</strong> ₹12 LPA</p>

        <p><strong>Experience:</strong> 2+ Years</p>

        <h2>Job Description</h2>

        <p>
          We are looking for a passionate Software Engineer
          who has knowledge of React, Node.js and SQL.
        </p>

        <h2>Skills Required</h2>

        <ul>
          <li>React</li>
          <li>JavaScript</li>
          <li>Node.js</li>
          <li>SQL</li>
        </ul>

        <button>Apply Now</button>

      </div>

    </div>
  );
}

export default JobDetails;