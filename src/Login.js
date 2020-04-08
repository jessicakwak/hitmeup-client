import React from 'react'
import axios from 'axios'

class Login extends React.Component {
	// Data
	state = {
		email: '',
		password: '',
		image: '',
		intro: '',
		error: ''
	}
	componentWillMount() {}
	// Methods

	login = e => {
		e.preventDefault()
		if (this.state.email == '' || this.state.password == '') {
			this.setState({ error: 'All fields are required' })
		} else {
			axios
				.post(`${process.env.REACT_APP_API}/users/login`, {
					email: this.state.email,
					password: this.state.password
				})
				.then(response => {
					if (response.data == 'nomatch') {
						this.setState({ error: "Email and password doesn't match" })
					} else if (response.data == 'noemail') {
						this.setState({ error: 'Email does not exist' })
					} else {
						console.log(response)
						localStorage.setItem('token', response.data.token)
						localStorage.setItem('name', response.data.name)
						localStorage.setItem('email', response.data.email)
						localStorage.setItem('image', response.data.image)
						localStorage.setItem('intro', response.data.intro)
						this.props.history.push('/')
					}
				})
				.catch(err => console.log(err))
		}
	}
	setInput = e => {
		e.preventDefault()
		this.setState({ [e.target.className]: e.target.value })
	}
	// Render
	render() {
		return (
			<div className="loginContainer">
				<img
					src="https://res.cloudinary.com/jesskcloud/image/upload/v1586161160/hitmeup_logo_crlriz.png"
					className="logo"
				/>
				<h4>What are you up for tonight?</h4>
				<form className="card" onSubmit={this.login}>
					<input
						type="text"
						placeholder="Email"
						className="email"
						onChange={this.setInput}
					/>
					<input
						type="password"
						placeholder="Password"
						className="password"
						autoComplete="new-password"
						onChange={this.setInput}
					/>
					<button type="submit" className="positive">
						Login
					</button>
					<div className="link">
						<a href="/signup">New here? Create an account</a>
					</div>
					<div className="error">{this.state.error}</div>
				</form>
			</div>
		)
	}
}

export default Login
