import React, { Component } from "react";
import config from '../../config';




class AddLead extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            email: null,
            phone: null,
            last_contacted: null,
        };
    }

    componentDidUpdate() {
       
        console.log( this.props)
       
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let url = `${config.CONFIG_API_ENDPOINT}/api/v1/leads`;
        let optionsForFetch = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        };
        if (this.props.leadToEdit.id) {
            url = `${config.CONFIG_API_ENDPOINT}/api/v1/leads/${this.props.leadToEdit.id}`;
            optionsForFetch = {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state)
            }
        }
        fetch(url, optionsForFetch)
        .then(res => res.json())
        .then((data) => {
            this.closeForm();
            window.location.href='/dashboard';
        })
        
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    closeForm = () => {
        this.props.toggleForm();
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { leadToEdit } = nextProps;
        if(leadToEdit){
            return {
                name: leadToEdit.name,
                email: leadToEdit.email,
                phone: leadToEdit.phone,
                last_contacted: leadToEdit.last_contacted
            };
       }
       else return null;
     }

    render() {
        const { name, email, phone, last_contacted } = this.state
        const { leadToEdit } = this.props;
        console.log(leadToEdit)
        return (
        <>
            <h3 class="leadFormHeader">{leadToEdit && leadToEdit.id ? `Edit ${leadToEdit.name}` : 'Add a new lead'}</h3>
            <form className="addleadForm" ref="form" onSubmit={this.handleSubmit}>
                <div className="form-control">
                    <label for="name">Name:</label>
                    <input required type="text" name="name" id="name" value={name} onChange={this.handleChange} placeholder="John Doe" />
                </div>
                <div className="form-control">
                    <label for="email">E-Mail:</label>
                    <input required type="text" name="email" id="email" value={email} onChange={this.handleChange} placeholder="johndoe@address.com" />
                </div>
                <div className="form-control">
                    <label for="password">Phone:</label>
                    <input required type="text" name="phone" id="phone" value={phone} onChange={this.handleChange} placeholder="+44(0)257362" />
                </div>
                <div className="form-control">
                    <label for="last_contacted">Last Contacted:</label>
                    <input required type="datetime-local" name="last_contacted" id="date" value={last_contacted} onChange={this.handleChange} />
                </div>
                <button type="submit" className="signupButton" >Add Lead</button>
                <button onClick={this.closeForm} type="button" className="signupButton" >Cancel</button>
            </form>
        </>
        )
    }
}

export default AddLead;