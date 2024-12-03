import React, { useState } from "react";

function StudentForm() {
  const [students, setStudents] = useState([]);
  const [studentID, setStudentID] = useState("");
  const [studentName, setStudentName] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editID, setEditID] = useState("");
  const [editName, setEditName] = useState("");
  const [showModal, setShowModal] = useState(false); // For modal visibility

  const handleAddStudent = () => {
    if (studentID && studentName) {
      setStudents([...students, { id: studentID, name: studentName }]);
      setStudentID("");
      setStudentName("");
      setShowModal(false); // Close modal after adding
    }
  };

  const handleDeleteStudent = (indexToDelete) => {
    setStudents(students.filter((_, index) => index !== indexToDelete));
  };

  const handleEditStudent = (index) => {
    setEditingIndex(index);
    setEditID(students[index].id);
    setEditName(students[index].name);
  };

  const handleUpdateStudent = () => {
    const updatedStudents = [...students];
    updatedStudents[editingIndex] = { id: editID, name: editName };
    setStudents(updatedStudents);
    setEditingIndex(null);
    setEditID("");
    setEditName("");
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditID("");
    setEditName("");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Student Form</h1>
      <h1 className="text-center mb-4">Student Updated form</h1>

      <button
        className="btn btn-primary mb-4"
        onClick={() => setShowModal(true)}
      >
        Insert Student
      </button>

      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Student</h5>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="modalStudentID" className="form-label">
                    Student ID
                  </label>
                  <input
                    type="text"
                    id="modalStudentID"
                    className="form-control"
                    value={studentID}
                    onChange={(e) => setStudentID(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="modalStudentName" className="form-label">
                    Student Name
                  </label>
                  <input
                    type="text"
                    id="modalStudentName"
                    className="form-control"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary "
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddStudent}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-center">Student List</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    className="form-control"
                    value={editID}
                    onChange={(e) => setEditID(e.target.value)}
                  />
                ) : (
                  student.id
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    className="form-control"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  student.name
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <>
                    <button
                      className="btn btn-success btn-sm me-2 m-2"
                      onClick={handleUpdateStudent}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm m-2"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-warning btn-sm me-2 m-2"
                      onClick={() => handleEditStudent(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm m-2"
                      onClick={() => handleDeleteStudent(index)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentForm;
