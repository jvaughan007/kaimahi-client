import React  from "react";
import KaimahiContext from "../../KaimahiContext";
import config from "../../config";
import { Link } from "react-router-dom";
import AddLead from "../AddLeadForm";


const ListLeads = (props) => (
  <div className="leadsTable">
    <table className="center">
      <thead>
        <tr>
          <th>Name</th>
          <th>Last Contacted</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.leads.map(lead => (
          <tr key={lead.id}>
            <td><Link to={`/leads/${lead.id}`}>{lead.name}</Link></td>
            <td>{new Date(lead.lastContacted).toLocaleString()}</td>
            <td>{lead.phone}</td>
            <td>{lead.email}</td>
            <th><button onClick={() => props.editLead(lead)}>Edit</button><button>Delete</button></th>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

class Dashboard extends React.Component {
  static contextType = KaimahiContext;
    state = {
      leads: [],
      showLeadForm: false,
      leadToEdit: {},
      leadToDelete: {}
    }

    handleFilter = (e) => {
      console.log(e.target.value);
      if (e.target.value === 1) {

      }
    }

    editLead = (lead) => {
      this.setState({
        leadToEdit: lead,
        showLeadForm: true
      })
    }

    componentDidMount() {
      const { currentUser } = this.context
      fetch(`${config.CONFIG_API_ENDPOINT}/api/v1/accounts/${currentUser.id}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'authorization': currentUser.accessToken
          }
      })
      .then(res => res.json())
      .then(data => {
          this.setState({
            leads: data
          })
      }).catch(e => {
          console.log(e)
      })
    }

    toggleForm = () => {
      this.setState({
        showLeadForm: !this.state.showLeadForm,
        leadToEdit: {},
        leadToDelete: {}
      });
    }

    render() {
      return (
        <div className="dashboardContainer">
        <div className= "userHeader">
          <h2 className="viewedUser">{this.context.currentUser.name}</h2>
        </div>
        <div className="adminTools">
          <select onChange={this.handleFilter}>
            <option name="Default" value="0">Filter By:</option>
            <option name="RatingHighToLow" value="1">Rating (High to Low)</option>
            <option name="RatingLowToHigh" value="2">Rating (Low to High)</option>
            <option name="RcentlyContacted" value="3">Recently Contacted</option>
          </select>
          <button onClick={this.toggleForm} type="button">Add lead</button>
        </div>
        <div className="marketers" style={{display: "grid", justifyContent: "center"}}>
          <div className="usernameContainer" style={{display: "flex", justifyContent: "align-left"}}>
          <h3 className="adminSectionHeader" style={{ marginLeft: "20px" }}>Leads</h3>
          </div>
          {this.state.showLeadForm ? <div className="AddLeadForm">
            <AddLead leadToEdit={this.state.leadToEdit} toggleForm={this.toggleForm} />
          </div> : null}
          <ListLeads editLead={this.editLead} leads={this.state.leads} />
        </div>
      </div>
      )
    }
}

export default Dashboard;