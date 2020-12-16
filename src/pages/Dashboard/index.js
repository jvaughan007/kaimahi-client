import React  from "react";
import KaimahiContext from "../../KaimahiContext";
import config from "../../config";
import { Link } from "react-router-dom";
import AddLead from "../AddLeadForm";

const ListLeadsUL = (props) => (
  <ul className="leadsList">
    {props.leads.map(lead => (
      <li key={lead.id}>
        <div className="leadsDetails">
          <b><Link to={`/leads/${lead.id}`}>{lead.name}</Link></b><br />
          <a href={`tel:${lead.phone}`}>{lead.phone}</a><br />
          <a href={`mailto:${lead.email}`}>{lead.email}</a><br />
          <div className="last-contacted-date">
            Last contacted on {new Date(lead.lastContacted).toLocaleDateString()}
          </div>
        </div>
        <div>
          <button onClick={() => props.editLead(lead)}>Edit</button>
          <button onClick={() => props.handleDelete(lead)}>Delete</button>
        </div>
      </li>
    ))}
  </ul>
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
      if (e.target.value === 1) {

      }
    }
    
    handleDelete = (lead) => {
      const { currentUser } = this.context
      fetch(`${config.CONFIG_API_ENDPOINT}/api/v1/leads/${lead.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authorization': currentUser.accessToken
        }
      })
      .then(() => {
        this.fetchLeads();
      }).catch(e => {
        console.error(e)
      })
    }

    editLead = (lead) => {
      this.setState({
        leadToEdit: lead,
        showLeadForm: true
      })
    }

    componentDidMount() {
      this.fetchLeads();
    }

    fetchLeads = () => {
      const { currentUser } = this.context
      fetch(`${config.CONFIG_API_ENDPOINT}/api/v1/accounts/${currentUser.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': currentUser.accessToken
        }
      })
      .then(res => {
        return res.json()
      }).then(data => {
        this.setState({
          leads: data
        })
      }).catch(e => {
        console.error(e)
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
          <h2 className="viewedUser">{this.context.currentUser.name}'s Dashboard</h2>
          <div className="adminTools">
            <button onClick={this.toggleForm} type="button">Add lead</button>
          </div>
        </div>
        <div className="marketers">
          {this.state.showLeadForm ? <div className="AddLeadForm">
            <AddLead leadToEdit={this.state.leadToEdit} toggleForm={this.toggleForm} />
          </div> : null}
          <h3 className="tableHeader">Leads</h3>
          <ListLeadsUL editLead={this.editLead} leads={this.state.leads} handleDelete={this.handleDelete } />
        </div>
      </div>
      )
    }
}

export default Dashboard;