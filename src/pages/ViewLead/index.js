import React  from "react";
import KaimahiContext from "../../KaimahiContext";
import config from "../../config";

class ViewLead extends React.Component {
  static contextType = KaimahiContext;
    state = {
      lead: {}
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

    handleDelete = () => {
      const { currentUser } = this.context
      const { lead } = this.state;
      fetch(`${config.CONFIG_API_ENDPOINT}/api/v1/leads/${lead.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authorization': currentUser.accessToken
        }
      })
      .then(() => {
        this.goBack();
      }).catch(e => {
        console.error(e)
      })
    }

    goBack = () => {
      window.location.href='/dashboard';
    }

    render() {
      return (
        <div className="leadView">
            <h2>{this.state.lead.name}</h2>
            <ul>
              <li><b>Email:</b> <a href={`tel:${this.state.lead.email}`}>{this.state.lead.email}</a></li>
              <li><b>Phone:</b> <a href={`tel:${this.state.lead.phone}`}>{this.state.lead.phone}</a></li>
            </ul>
            <button onClick={() => this.handleDelete()}>Delete</button>
            <button type="button" onClick={this.goBack}>Go Back</button>
        </div>
      )
    }
}

export default ViewLead;