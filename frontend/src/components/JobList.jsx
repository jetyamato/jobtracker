export default function JobList({ jobs, onEdit, onDelete }) {
  return (
    <ul className="job-list">
      {jobs.map((job) => (
        <li key={job.id} className="job-item">
          <strong>{job.company}</strong> — {job.position} ({job.status})
          <br />
          <div className="job-actions">
            <button onClick={() => onEdit(job)}>Edit</button>
            <button onClick={() => onDelete(job.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
