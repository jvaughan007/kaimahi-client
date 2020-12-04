import React  from "react";
import KaimahiContext from "../../KaimahiContext";
import config from "../../config";

const DeleteLead = (e) => {
    e.preventDefault();
    console.log('Delete button clicked');
    console.log(e.target.parent);
}

class ViewLead extends React.Component {
  static contextType = KaimahiContext;
    state = {
      lead: []
    }

    componentDidMount() {
      const { currentUser } = this.context
      fetch(`${config.CONFIG_API_ENDPOINT}/api/v1/leads/${this.props.computedMatch.params.lead_id}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'authorization': currentUser.accessToken
          }
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          lead: data
      })
      }).catch(e => {
          console.log(e)
      })
    }

    

    render() {
        console.log("lead", this.state.lead)
      return (
        <div>
            <h2>{this.state.lead.name}</h2>
            <ul>
              <li>Email: {this.state.lead.email}</li>
              <li>Phone: {this.state.lead.phone}</li>
            </ul>
            <button onClick={DeleteLead}>Delete</button>
            <button type="button" onClick={(e) => {
                e.preventDefault();
                window.location.href='/dashboard';
            }}>Go Back</button>
        </div>
      )
    }
}

export default ViewLead;