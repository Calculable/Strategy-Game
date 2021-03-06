import React from 'react'

class LoginForm extends React.Component {
    render() {
        return (
            <main role="main" className="container">
                <form id="login-form" className="form-signin" action="/play.html"
                      onSubmit={this.props.loginHandler}>
                    <label htmlFor="username-input" className="sr-only">Email</label>
                    <input type="text" id="username-input" className="form-control" defaultValue="demo_user" required
                           autoFocus/>
                    <label htmlFor="password-input" className="sr-only mt-4">Password</label>
                    <input type="password" id="password-input" className="form-control mt-1" defaultValue="1234"
                           required/>
                    <button className="btn btn-lg btn-primary btn-block mt-4" type="submit">Sign in</button>
                </form>
            </main>
        );
    }
}

export default LoginForm;