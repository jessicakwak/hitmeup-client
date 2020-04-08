import React from 'react'
import axios from 'axios'

class Signup extends React.Component {
	// Data
	state = {
		name: '',
		email: '',
		password: '',
		intro: '',
		image: null,
		error: ''
	}
	// Methods
	signup = e => {
		e.preventDefault()
		if (
			this.state.name == '' ||
			this.state.email == '' ||
			this.state.password == ''
		) {
			this.setState({ error: 'Name, email and password are required!' })
		} else if (
			//checking the format of the email
			(this.state.email.split('@').length >= 2 &&
				this.state.email.split('@')[1].split('.').length < 2) ||
			this.state.email.split('@').length < 2
		) {
			this.setState({ error: 'Invalid email!' })
		}

		axios
			.post(`${process.env.REACT_APP_API}/users/signup`, {
				name: this.state.name.toLowerCase(),
				email: this.state.email.toLowerCase(),
				password: this.state.password,
				intro: this.state.intro
			})
			.then(data => {
				if (data.data == 'User already exists') {
					this.setState({ error: data.data })
				} else {
					//store to the local storage and redirect users
					localStorage.setItem('token', data.data.token)
					localStorage.setItem('name', data.data.name)
					localStorage.setItem('email', data.data.email)
					localStorage.setItem('image', data.data.image)
					localStorage.setItem('intro', data.data.intro)
					this.props.history.push('/')
				}
				console.log('success')
			})
			.catch(err => console.log(err))
	}
	setInput = e => {
		e.preventDefault()
		this.setState({ [e.target.className]: e.target.value })
	}

	addFile = e => {
		this.setState({ image: e.target.files[0] })
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
				<form className="card" onSubmit={this.signup}>
					<label>*Required</label>
					<input
						type="text"
						className="name"
						placeholder="Full Name"
						onChange={this.setInput}
					/>
					<input
						type="text"
						className="email"
						placeholder="Email"
						onChange={this.setInput}
					/>
					<input
						type="password"
						className="password"
						placeholder="Password"
						autoComplete="new-password"
						onChange={this.setInput}
					/>
					<label>*Optional</label>
					<input
						type="text"
						className="intro"
						placeholder="About you"
						onChange={this.setInput}
					/>
					<label id="profileImage">Add Profile Image</label>
					<input type="file" name="file" onChange={this.addFile} />
					<button type="submit" className="positive">
						Signup
					</button>
					<div className="link">
						<a href="/login">Already have an account? Login</a>
					</div>
					<div className="error">{this.state.error}</div>
				</form>
			</div>
		)
	}
}

export default Signup
