import { useState } from "react";
import Login from "./Login";
import Student from "./Student";
import Teacher from "./Teacher";

export default function App() {
  const [role, setRole] = useState(null);

  if(!role) return <Login setRole={setRole} />;
  if(role === "student") return <Student setRole={setRole} />;
  if(role === "teacher") return <Teacher setRole={setRole} />;

  return null;
}