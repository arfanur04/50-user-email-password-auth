const Register = () => {
	const handleRegister = (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.password.value;
		console.log(email, password);
	};

	return (
		<div className="">
			<div className="mx-auto md:w-1/2">
				<h2 className="mb-8 text-3xl">Please Register</h2>
				<form onSubmit={handleRegister}>
					<input
						className="w-3/4 px-4 py-2 mb-4"
						type="email"
						name="email"
						placeholder="Email Address"
						id=""
					/>
					<br />
					<input
						className="w-3/4 px-4 py-2 mb-4"
						type="password"
						name="password"
						placeholder="Password"
						id=""
					/>
					<br />
					<input
						className="w-3/4 mb-4 btn btn-secondary"
						type="submit"
						value="Register"
					/>
				</form>
			</div>
		</div>
	);
};

export default Register;
