import React, { Component } from "react";
import TeacherManager from "../../modules/TeacherManager";
import "./Teacher.css";

export default class TeacherEditForm extends Component {
  state = {
    name: "",
    email: "",
    subjects: "",
    position: "TEACHER",
    category: "teachers",
    school: ""
  };

  handleFieldChange = (evt) => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  updateTeacher = (evt) => {
    evt.preventDefault();

    if (this.state.teacher === "") {
      window.alert("Please select a teacher");
    } else {
      const editedTeacher = {
        id: this.props.match.params.teacherId,
        name: this.state.name,
        email: this.state.email,
        subjects: this.state.subjects,
        position: "TEACHER",
        category: "teachers",
        schoolId: parseInt(this.state.schoolId)

        //info: this.state.info
      };

      this.props
        .updateTeacher(editedTeacher)
        .then(() => this.props.history.push("/teachers"));
    }
  };
  componentDidMount() {
    TeacherManager.get(this.props.match.params.teacherId).then((teachers) => {
      this.setState({
        name: teachers.name,
        email: teachers.email,
        subjects: teachers.subjects,
        position: "TEACHER",
        category: "teachers",
        schoolId: teachers.schoolId
      });
    });
  }
  render() {
    return (
      <form className="inputteacher teacherForm">
        <div className="form-group">
          <label htmlFor="name">Teacher name</label>
          <input
            type="text"
            required
            className="form-control"
            onChange={this.handleFieldChange}
            id="name"
            value={this.state.name || ""}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            required
            className="form-control"
            onChange={this.handleFieldChange}
            id="email"
            value={this.state.email || ""}
          />
        </div>
        <div className="form-group">
          <label htmlFor="subjects">Subjects</label>
          <input
            type="text"
            required
            className="form-control"
            onChange={this.handleFieldChange}
            id="subjects"
            value={this.state.subjects || ""}
          />
        </div>
        <div className="form-group">
          <label htmlFor="school">Assign to a School</label>
          <select
            name="school"
            id="schoolId"
            onChange={this.handleFieldChange}
            value={this.state.schoolId}
          >
            {this.props.schools.map((e) => (
              <option key={e.id} id={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="btn btn-warning"
            size="sm"
            disabled={
              !this.state.name ||
              !this.state.email ||
              !this.state.subjects ||
              !this.state.schoolId
            }
            onClick={this.updateTeacher}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}
