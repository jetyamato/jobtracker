const express = require("express");
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET all jobs
router.get("/", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM jobs WHERE user_id = $1 ORDER BY created_at DESC",
      [req.user.id],
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST a job
router.post("/", authMiddleware, async (req, res) => {
  const { company, position, status, applied_date, notes } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO jobs (user_id, company, position, status, applied_date, notes)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [req.user.id, company, position, status, applied_date, notes],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT an updated job
router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { company, position, status, applied_date, notes } = req.body;

  try {
    const result = await pool.query(
      `UPDATE jobs SET
       company = $1,
       position = $2,
       status = $3,
       applied_date = $4,
       notes = $5
       WHERE id = $6 AND user_id = $7
       RETURNING *`,
      [company, position, status, applied_date, notes, id, req.user.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE a job
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM jobs WHERE id = $1 AND user_id = $2 RETURNING *`,
      [id, req.user.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
