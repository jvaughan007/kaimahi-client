import React  from "react";
import KaimahiContext from "../../KaimahiContext";
import config from "../../config";
import { Link } from "react-router-dom";


class Dashboard extends React.Component {
  static contextType = KaimahiContext;
    state = {
      leads: []
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

    render() {
      return (
        <div className="dashboardContainer">
        <h2 className="viewedUser" style={{display: 'flex', justifyContent: 'center'}}>{this.context.currentUser.name}</h2>
        <div
          className="adminTools"
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <select>
            <option value="0">Filter By:</option>
            <option value="1">Rating (High to Low)</option>
            <option value="2">Rating (Low to High)</option>
            <option value="3">Recently Contacted</option>
          </select>
        </div>
      <div className="marketers">
        <h3 className="adminSectionHeader" style={{ marginLeft: "20px" }}>Leads</h3>
        <div className="leadsTable" style={{ marginLeft: "20px" }}>
          <table className="center">
            <thead>
              <tr>
                <th>Name</th>
                <th>Last Contacted</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {this.state.leads.map(lead => (
                <tr key={lead.id}>
                  <td><Link to={`/leads/${lead.id}`}>{lead.name}</Link></td>
                  <td>{lead.lastContacted}</td>
                  <td>{lead.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  </div>
      )
    }
}

export default Dashboard;