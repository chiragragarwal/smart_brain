import React from 'react';

class SignIn extends React.Component {

    constructor(props) {
        super(props)
        // NOTE: This state is local to SignIn Component only and
        // does not have to do anything with the App.js component
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({
            signInEmail: event.target.value
        })
    }

    onPasswordChange = (event) => {
        this.setState({
            signInPassword: event.target.value
        })
    }

    onSignInSubmit = (event) => {
        // NOTE: This is important to prevent the Submit button from 
        // refreshing the page. When it refreshes, it will reset the state.
        // This is needed if the input type is "submit", because submit action will refresh the page.
        // Having type=button does not cause any problem
        // event.preventDefault()

        const request = {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                    email: this.state.signInEmail,
                    password: this.state.signInPassword
                })
        }

        fetch('https://shielded-peak-28417.herokuapp.com/signin', request)
        .then(resp => resp.json())
        .then(user => {
            if (user.id){
                // console.log('SUCCESS')
                this.props.loadUser(user)
                this.props.onRouteChange('home')
            }
        })
    }

    render() {
        const { onRouteChange } = this.props;    
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                   type="email" 
                                   name="email-address"
                                   id="email-address" 
                                   onChange={this.onEmailChange}/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                   type="password"
                                   name="password"
                                   id="password" 
                                   onChange={this.onPasswordChange}/>
                        </div>
                        </fieldset>
                        <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            // type="submit"
                            type="button" 
                            value="Sign in" 
                            onClick={this.onSignInSubmit}/>
                        </div>
                        <div className="lh-copy mt3">
                        <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                        </div>
                    </form>
                </main>
            </article>
            );
    }
}

export default SignIn;