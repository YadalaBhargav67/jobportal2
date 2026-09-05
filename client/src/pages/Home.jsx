import { useState } from "react";
import "./Home.css";
import JobCard from "../components/JobCard";

const jobs = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Google",
    location: "Hyderabad",
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Microsoft",
    location: "Bangalore",
  },
  {
    id: 3,
    title: "Backend Developer",
    company: "Amazon",
    location: "Chennai",
  },
];

function Home() {
  const [search, setSearch] = useState("");

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1>Find Your Dream Job</h1>
        <p>Search thousands of jobs from top companies.</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button>Search</button>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="featured-jobs">
        <h2>Featured Jobs</h2>

        <div className="jobs-container">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))
          ) : (
            <h3>No Jobs Found</h3>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;