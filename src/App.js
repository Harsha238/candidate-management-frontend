import React, { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [candidates, setCandidates] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [skill, setSkill] = useState("");

  // Fetch candidates from backend
  useEffect(() => {

    fetch("http://127.0.0.1:5000/api/candidates")
      .then(res => res.json())
      .then(data => setCandidates(data))
      .catch(err => console.log("Error:", err));

  }, []);

  // Add candidate
  const addCandidate = () => {

    if (!name || !email || !skill) {

      alert("Please fill all fields");
      return;

    }

    fetch("http://127.0.0.1:5000/add", {

      method: "POST",

      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },

      body: `name=${name}&email=${email}&skill=${skill}`

    })
      .then(() => {

        setName("");
        setEmail("");
        setSkill("");

        window.location.reload();

      });

  };

  // Delete candidate
  const deleteCandidate = (id) => {

    fetch(`http://127.0.0.1:5000/delete/${id}`)
      .then(() => window.location.reload());

  };

  return (

    <div className="main">

      <div className="card">

        <h1>🌟 Candidate Management System</h1>

        {/* Form Section */}
        <div className="form">

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter Skill"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          />

          <button
            className="add-btn"
            onClick={addCandidate}
          >
            ➕ Add Candidate
          </button>

        </div>

        {/* Table Section */}
        <h2>📋 Candidate List</h2>

        <div className="table-container">

          <table>

            <thead>

              <tr>

                <th>Name</th>
                <th>Email</th>
                <th>Skill</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {candidates.length === 0 ? (

                <tr>
                  <td colSpan="4">No candidates found</td>
                </tr>

              ) : (

                candidates.map((c) => (

                  <tr key={c.id}>

                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.skill}</td>

                    <td>

                      <button
                        className="delete-btn"
                        onClick={() => deleteCandidate(c.id)}
                      >
                        ❌ Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default App;
