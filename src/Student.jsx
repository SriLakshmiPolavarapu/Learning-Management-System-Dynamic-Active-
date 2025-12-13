export default function Student({ setRole }) {
    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 40 }}>


        <h2>Student Dashboard</h2>
  
        <p>Here students will:</p>
        <ul style={{ listStyle: "none" }}>
          <li>View assignments</li>
          <li>Submit work</li>
          <li>See grades</li>
        </ul>
  
        <button onClick={() => setRole(null)}>Logout</button>
      </div>
    );
  }
  