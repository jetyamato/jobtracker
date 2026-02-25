import { useState, useEffect } from "react";
import JobForm from "../components/JobForm";
import JobList from "../components/JobList";
import { useAuth } from "../context/AuthContext";

const API_URL = `${import.meta.env.VITE_API_URL}/jobs`;

export default function Jobs() {
  const { auth } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    company: "",
    position: "",
    status: "Applied",
    applied_date: "",
    notes: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetch jobs
  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to load jobs");
      }

      const data = await res.json();
      setJobs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // handle form input
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // add or update job
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to save job");
      }

      setForm({
        company: "",
        position: "",
        status: "Applied",
        applied_date: "",
        notes: "",
      });
      setEditingId(null);
      fetchJobs();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // start editing job
  function editJob(job) {
    setForm({
      company: job.company,
      position: job.position,
      status: job.status,
      applied_date: job.applied_date || "",
      notes: job.notes || "",
    });
    setEditingId(job.id);
  }

  // delete job
  async function deleteJob(id) {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    fetchJobs();
  }

  return (
    <div className="container">
      <h1>Job Application Tracker</h1>

      <JobForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isEditing={!!editingId}
        loading={loading}
      />

      <hr />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <JobList jobs={jobs} onEdit={editJob} onDelete={deleteJob} />
    </div>
  );
}
