import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

export default class Register extends Component {
  state = {
    email: "",
    password: "",
    fullname: ""
  };

  handleFieldChange = (evt) => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  getAllUsers = (evt) => {
    evt.preventDefault();
    this.props.getAll().then((allUsers) => {
      let usersArray = allUsers.filter((user) => {
        return user.email === this.state.email;
      });

      if (usersArray.length > 0) {
        alert("Please use different email");
      } else {
        const newUser = {
          email: this.state.email,
          password: this.state.password,
          fullname: this.state.fullname
        };
        this.props.addUser(newUser);
        this.props.history.push("/");
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <p>Register a new account</p>
        <Form className="inputstudent form">
          <FormGroup>
            <Label>Email:</Label>
            <Input
              type="email"
              required
              onChange={this.handleFieldChange}
              name="email"
              value={this.state.email}
              id="email"
              placeholder="myemail@email.com"
            />
          </FormGroup>

          <FormGroup>
            <Label>Password:</Label>
            <Input
              type="password"
              required
              onChange={this.handleFieldChange}
              value={this.state.password}
              name="password"
              id="password"
              placeholder="********"
            />
          </FormGroup>

          <FormGroup>
            <Label>FullName:</Label>
            <Input
              type="text"
              required
              onChange={this.handleFieldChange}
              value={this.state.fullname}
              name="fullname"
              id="fullname"
              placeholder="Full Name"
            />
          </FormGroup>

          <Button
            type="button"
            disabled={
              !this.state.email || !this.state.password || !this.state.fullname
            }
            color="primary"
            onClick={this.getAllUsers}
          >
            {" "}
            Register{" "}
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}
