import React, { Component } from 'react';

class PhoneForm extends Component {
    state = {
        name: '',
        phone: ''
    }
    handleChange = (e) => {
        this.setState({
            //name: e.target.value
            [e.target.name]: e.target.value // [~] computed property names
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onCreate(this.state);
        this.setState({
            name: '',
            phone:''
        })
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input placeholder="이름" value={this.state.name} onChange={this.handleChange} name="name"/>    {/* name = e.target.name / value */}
                <input placeholder="전화번호" value={this.state.phone} onChange={this.handleChange} name="phone"/>
                <div>
                    {this.state.name} {this.state.phone}
                </div>
                <button type="submit">등록</button>
            </form>
        );
    }
}

export default PhoneForm;