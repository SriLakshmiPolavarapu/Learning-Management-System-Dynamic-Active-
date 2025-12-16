import { useState } from "react";
import { getAIRecommendation, askAITutor } from "./ai";



const assignmentsData = [
  {
    id: 1,
    title: "Math Homework",
    due: "Dec 18",
    status: "Pending",
    question: "Solve 3/4 + 2/5 and explain your steps.",
  },
  {
    id: 2,
    title: "English Essay",
    due: "Dec 20",
    status: "Submitted",
    submission:
      "This essay explains the main theme of the story and how the characters develop.",
  },
];

const grades = [
  { subject: "Math", score: 72 },
  { subject: "English", score: 88 },
];

const slides = [
  { id: 1, title: "Math – Fractions Slides", week: "Week 3" },
  { id: 2, title: "English – Essay Writing", week: "Week 4" },
];



export default function Student({ setRole }) {
  const [selected, setSelected] = useState(null);
  const [answer, setAnswer] = useState("");

  // AI Learning Coach
  const [aiCoachText, setAiCoachText] = useState("");
  const [loadingCoach, setLoadingCoach] = useState(false);

  // AI Tutor
  const [question, setQuestion] = useState("");
  const [aiReply, setAiReply] = useState("");
  const [asking, setAsking] = useState(false);

  async function runCoachAI() {
    setLoadingCoach(true);
    setAiCoachText("");

    try {
      const result = await getAIRecommendation(grades);
      setAiCoachText(result);
    } catch {
      setAiCoachText("AI is unavailable right now.");
    }

    setLoadingCoach(false);
  }

  async function askAI() {
    if (!question.trim()) return;

    setAsking(true);
    setAiReply("");

    const context = grades
      .map((g) => `${g.subject}: ${g.score}%`)
      .join(", ");

    try {
      const reply = await askAITutor(question, context);
      setAiReply(reply);
    } catch {
      setAiReply("Sorry, I couldn’t answer right now.");
    }

    setAsking(false);
  }

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>Student Dashboard</h2>

      {/* Assignments */}
      <section style={styles.section}>
        <h3>Assignments</h3>

        {assignmentsData.map((a) => (
          <div key={a.id} style={styles.card}>
            <div>
              <strong>{a.title}</strong>
              <div style={styles.subText}>Due: {a.due}</div>
            </div>

            {a.status === "Submitted" ? (
              <button
                style={styles.secondaryBtn}
                onClick={() => setSelected(a)}
              >
                View Submission
              </button>
            ) : (
              <button
                style={styles.primaryBtn}
                onClick={() => setSelected(a)}
              >
                Submit
              </button>
            )}
          </div>
        ))}
      </section>

      {/* Submission View / Submit */}
      {selected && (
        <section style={styles.section}>
          <h3>{selected.title}</h3>

          {selected.status === "Submitted" ? (
            <div style={styles.box}>
              <strong>Your Submission</strong>
              <p>{selected.submission}</p>
            </div>
          ) : (
            <div style={styles.box}>
              <strong>Question</strong>
              <p>{selected.question}</p>

              <textarea
                style={styles.textarea}
                placeholder="Type your answer here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />

              <button
                style={styles.primaryBtn}
                onClick={() => {
                  alert("Assignment submitted! (Prototype)");
                  setAnswer("");
                  setSelected(null);
                }}
              >
                Submit Assignment
              </button>
            </div>
          )}
        </section>
      )}

      {/* Grades */}
      <section style={styles.section}>
        <h3>Grades</h3>

        {grades.map((g) => (
          <div key={g.subject} style={styles.gradeRow}>
            <span>{g.subject}</span>
            <span
              style={{
                fontWeight: "bold",
                color: g.score < 75 ? "#dc2626" : "#16a34a",
              }}
            >
              {g.score}%
            </span>
          </div>
        ))}
      </section>

      {/* Class Slides */}
      <section style={styles.section}>
        <h3>Class Slides</h3>

        {slides.map((s) => (
          <div key={s.id} style={styles.card}>
            <div>
              <strong>{s.title}</strong>
              <div style={styles.subText}>{s.week}</div>
            </div>
            <button
              style={styles.secondaryBtn}
              onClick={() => alert("Opening slides (prototype)")}
            >
              View
            </button>
          </div>
        ))}
      </section>

      {/* AI Learning Coach */}
      <section style={styles.section}>
        <h3>AI Learning Coach</h3>

        <button style={styles.primaryBtn} onClick={runCoachAI}>
          Get Personalized Learning Advice
        </button>

        {loadingCoach && <p>Analyzing your progress...</p>}

        {aiCoachText && (
          <div style={styles.aiBox}>
            <p>{aiCoachText}</p>
          </div>
        )}
      </section>

      {/* Interactive AI Tutor */}
      <section style={styles.section}>
        <h3>Ask the AI Tutor</h3>

        <textarea
          placeholder="Ask a question about your studies..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={styles.textarea}
        />

        <button style={styles.primaryBtn} onClick={askAI}>
          Ask AI
        </button>

        {asking && <p>Thinking...</p>}

        {aiReply && (
          <div style={styles.aiBox}>
            <p>{aiReply}</p>
          </div>
        )}
      </section>

      <button style={styles.logout} onClick={() => setRole(null)}>
        Logout
      </button>
    </div>
  );
}


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
  box: {
    padding: "14px",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    background: "#f9fafb",
  },
  textarea: {
    width: "100%",
    minHeight: "90px",
    marginTop: "10px",
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
  },
  gradeRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid #e5e7eb",
  },
  primaryBtn: {
    padding: "8px 14px",
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
  aiBox: {
    marginTop: "12px",
    padding: "14px",
    borderRadius: "12px",
    background: "#ecfeff",
    border: "1px solid #67e8f9",
    color: "#0f172a",
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
