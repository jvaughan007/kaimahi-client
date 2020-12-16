import React, { Component } from "react";
import config from "../../config";
import KaimahiContext from "../../KaimahiContext";

class AddLead extends Component {
  static contextType = KaimahiContext;
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      lastContacted: "",
    };
  }

  setLeadInState = (leadToEdit) => {
    this.setState({
      name: leadToEdit.name,
      email: leadToEdit.email,
      phone: leadToEdit.phone,
      lastContacted: leadToEdit.lastContacted.substring(
        0,
        leadToEdit.lastContacted.length - 8
      ),
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.leadToEdit !== this.props.leadToEdit) {
      this.setLeadInState(this.props.leadToEdit);
    }
  }

  componentDidMount() {
    if (this.props.leadToEdit && this.props.leadToEdit.id) {
      this.setLeadInState(this.props.leadToEdit);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let url = `${config.CONFIG_API_ENDPOINT}/api/v1/leads`;
    const { currentUser } = this.context;
    const data = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      last_contacted: this.state.lastContacted,
      account_id: currentUser.id,
    };
    const headersAndData = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: currentUser.accessToken,
      },
      body: JSON.stringify(data),
    };
    let optionsForFetch = {
      method: "POST",
      ...headersAndData,
    };
    if (this.props.leadToEdit.id) {
      url = `${config.CONFIG_API_ENDPOINT}/api/v1/leads/${this.props.leadToEdit.id}`;
      optionsForFetch = {
        method: "PATCH",
        ...headersAndData,
      };
    }
    fetch(url, optionsForFetch)
      .then((res) => res.json())
      .then((resp) => {
        this.closeForm();
        window.location.href = "/dashboard";
      });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  closeForm = () => {
    this.props.toggleForm();
  };

  render() {
    const { name, email, phone, lastContacted } = this.state;
    const { leadToEdit } = this.props;
    return (
      <>
        <h3 class="leadFormHeader">
          {leadToEdit && leadToEdit.id
            ? `Edit ${leadToEdit.name}`
            : "Add a new lead"}
        </h3>
        <form className="addleadForm" onSubmit={this.handleSubmit}>
          <div className="form-control">
            <label htmlFor="name">Name:</label>
            <input
              required
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={this.handleChange}
              placeholder="John Doe"
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">E-Mail:</label>
            <input
              required
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={this.handleChange}
              placeholder="johndoe@address.com"
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Phone:</label>
            <input
              required
              type="text"
              name="phone"
              id="phone"
              value={phone}
              onChange={this.handleChange}
              placeholder="+44(0)257362"
            />
          </div>
          <div className="form-control">
            <label htmlFor="lastContacted">Last Contacted:</label>
            <input
              required
              type="datetime-local"
              name="lastContacted"
              id="lastContacted"
              value={lastContacted}
              onChange={this.handleChange}
            />
          </div>
          <div className="formButtons">
            <button type="submit" className="signupButton">
              {leadToEdit && leadToEdit.id ? "Update" : "Submit"}
            </button>
            <button
              onClick={this.closeForm}
              type="button"
              className="signupButton"
            >
              Cancel
            </button>
          </div>
        </form>
      </>
    );
  }
}

export default AddLead;
