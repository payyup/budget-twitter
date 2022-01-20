import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signup } from "../actions/auth";
import { TextField } from '@mui/material';

class SignUp extends React.Component {

  state = {
    username: "",
    password: ""
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const newUser = { username, password };
    this.props.signup(newUser);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className="input-form">
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          value={this.state.username}
          onChange={(e) => this.setState({ username: e.target.value })}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          value={this.state.password}
          onChange={(e) => this.setState({ password: e.target.value })}
        />
        <button
          type="submit"
          className="submit-btn">Sign Up</button>
      </form>
    )
  }
}

SignUp.propTypes = {
  signup: PropTypes.func
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { signup })(SignUp);