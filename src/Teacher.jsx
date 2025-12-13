import { useState } from "react";

/* ---------- Mock Data ---------- */

const initialAssignments = [
  {
    id: 1,
    title: "Math Homework",
    due: "Dec 18",
  },
  {
    id: 2,
    title: "English Essay",
    due: "Dec 20",
  },
];

const submissionsData = [
  {
    id: 1,
    student: "Max",
    assignment: "Math Homework",
    text: "I solved 3/4 + 2/5 by finding a common denominator...",
  },
  {
    id: 2,
    student: "Alex",
    assignment: "English Essay",
    text: "The main theme of the story is perseverance...",
  },
  {
    id: 3,
    student: "Ivy",
    assignment: "English Essay",
    text: "Once upon a time there lived a...",
  },
  {
    id: 4,
    student: "Ruby",
    assignment: "Math Homework",
    text: "I solved 3/4 + 2/5 by finding a common denominator...",
  },
];

const slides = [
  { id: 1, title: "Fractions Slides", subject: "Math" },
  { id: 2, title: "Essay Writing Slides", subject: "English" },
];

/* ---------- Component ---------- */

export default function Teacher({ setRole }) {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");

  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [score, setScore] = useState("");
  const [feedback, setFeedback] = useState("");

  function addAssignment() {
    if (!title || !due) {
      alert("Please enter title and due date");
      return;
    }

    setAssignments([
      { id: Date.now(), title, due },
      ...assignments,
    ]);

    setTitle("");
    setDue("");
  }

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>Teacher Dashboard</h2>

      {/* Create Assignment */}
      <section style={styles.section}>
        <h3>Create Assignment</h3>

        <input
          placeholder="Assignment title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Due date (e.g., Dec 22)"
          value={due}
          onChange={(e) => setDue(e.target.value)}
          style={styles.input}
        />

        <button style={styles.primaryBtn} onClick={addAssignment}>
          Publish Assignment
        </button>
      </section>

      {/* Assignments */}
      <section style={styles.section}>
        <h3>Assignments</h3>

        {assignments.map((a) => (
          <div key={a.id} style={styles.card}>
            <div>
              <strong>{a.title}</strong>
              <div style={styles.subText}>Due: {a.due}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Submissions */}
      <section style={styles.section}>
        <h3>Student Submissions</h3>

        {submissionsData.map((s) => (
          <div key={s.id} style={styles.card}>
            <div>
              <strong>{s.student}</strong>
              <div style={styles.subText}>{s.assignment}</div>
            </div>
            <button
              style={styles.secondaryBtn}
              onClick={() => setSelectedSubmission(s)}
            >
              Grade
            </button>
          </div>
        ))}
      </section>

      {/* Grading */}
      {selectedSubmission && (
        <section style={styles.section}>
          <h3>Grade Submission</h3>

          <div style={styles.box}>
            <strong>Student:</strong> {selectedSubmission.student}
            <p>{selectedSubmission.text}</p>
          </div>

          <input
            placeholder="Score (0–100)"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            style={styles.input}
          />

          <textarea
            placeholder="Feedback for student"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            style={styles.textarea}
          />

          <button
            style={styles.primaryBtn}
            onClick={() => alert("Grade saved! (Prototype)")}
          >
            Save Grade
          </button>

          <div style={styles.aiBox}>
            <strong>AI Assist</strong>
            <p>
              Suggestion: Praise the student’s approach and recommend one
              specific improvement.
            </p>
          </div>
        </section>
      )}

      {/* Class Slides */}
      <section style={styles.section}>
        <h3>Class Slides</h3>

        {slides.map((s) => (
          <div key={s.id} style={styles.card}>
            <div>
              <strong>{s.title}</strong>
              <div style={styles.subText}>{s.subject}</div>
            </div>
            <button
              style={styles.secondaryBtn}
              onClick={() => alert("Upload/View slides (prototype)")}
            >
              Upload / View
            </button>
          </div>
        ))}
      </section>

      <button style={styles.logout} onClick={() => setRole(null)}>
        Logout
      </button>
    </div>
  );
}

/* ---------- Styles ---------- */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    padding: "40px 20px",
    fontFamily: "system-ui, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
  },
  heading: {
    marginBottom: "24px",
  },
  section: {
    background: "white",
    padding: "20px",
    borderRadius: "14px",
    marginBottom: "24px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  subText: {
    fontSize: "14px",
    color: "#64748b",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
  },
  textarea: {
    width: "100%",
    minHeight: "80px",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
  },
  box: {
    padding: "12px",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    background: "#f9fafb",
    marginBottom: "10px",
  },
  aiBox: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "10px",
    background: "#ecfeff",
    border: "1px solid #67e8f9",
  },
  primaryBtn: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
  },
  secondaryBtn: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "1px solid #cbd5f5",
    background: "#eef2ff",
    cursor: "pointer",
  },
  logout: {
    marginTop: "10px",
    padding: "10px 16px",
    borderRadius: "10px",
    border: "none",
    background: "#ef4444",
    color: "white",
    cursor: "pointer",
  },
};
