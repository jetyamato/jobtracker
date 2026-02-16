export default function JobForm({
  form,
  onChange,
  onSubmit,
  isEditing,
  loading,
}) {
  return (
    <form onSubmit={onSubmit}>
      <input
        name="company"
        placeholder="Company"
        value={form.company}
        onChange={onChange}
        required
      />
      <br />

      <input
        name="position"
        placeholder="Position"
        value={form.position}
        onChange={onChange}
        required
      />
      <br />

      <select name="status" value={form.status} onChange={onChange}>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
      <br />

      <input
        type="date"
        name="applied_date"
        value={form.applied_date}
        onChange={onChange}
      />
      <br />

      <textarea
        name="notes"
        placeholder="Notes"
        value={form.notes}
        onChange={onChange}
      />
      <br />

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : isEditing ? "Update Job" : "Add Job"}
      </button>
    </form>
  );
}
