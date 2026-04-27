import { useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Aman", score: 78 },
    { id: 2, name: "Riya", score: 45 },
    { id: 3, name: "Karan", score: 90 },
    { id: 4, name: "Neha", score: 32 },
  ]);

  const [name, setName] = useState("");
  const [score, setScore] = useState("");

  const updateScore = (id, val) => {
    setStudents(students.map(s =>
      s.id === id ? { ...s, score: Number(val) } : s
    ));
  };

  const addStudent = (e) => {
    e.preventDefault();
    if (!name || score === "") return;

    setStudents([
      ...students,
      { id: Date.now(), name, score: Number(score) }
    ]);

    setName("");
    setScore("");
  };

  const total = students.length;
  const passed = students.filter(s => s.score >= 40).length;
  const avg = Math.round(
    students.reduce((a, b) => a + b.score, 0) / total
  );

  return (
    <div className="app">
      <h1>
        STUDENT <span>SCOREBOARD</span>
      </h1>

      {/* FORM */}
      <form className="form" onSubmit={addStudent}>
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
        <button>+ ADD</button>
      </form>

      {/* STATS */}
      <div className="stats">
        <div className="card">
          <p>TOTAL</p>
          <h2>{total}</h2>
        </div>
        <div className="card">
          <p>PASSED</p>
          <h2>{passed}</h2>
        </div>
        <div className="card">
          <p>AVG SCORE</p>
          <h2>{avg}</h2>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>NAME</th>
              <th>SCORE</th>
              <th>STATUS</th>
              <th>UPDATE</th>
            </tr>
          </thead>

          <tbody>
            {students.map(s => {
              const pass = s.score >= 40;

              return (
                <tr key={s.id}>
                  <td>{s.name}</td>

                  <td className="score">{s.score}</td>

                  <td>
                    <span className={pass ? "pass" : "fail"}>
                      ● {pass ? "PASS" : "FAIL"}
                    </span>
                  </td>

                  <td>
                    <input
                      type="number"
                      value={s.score}
                      onChange={(e) =>
                        updateScore(s.id, e.target.value)
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;