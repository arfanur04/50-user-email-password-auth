import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";

const Register = () => {
	const [registerError, setRegisterError] = useState("");
	const [success, setSuccess] = useState("");

	const handleRegister = (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.password.value;
		console.log(email, password);

		// reset error, success
		setRegisterError("");
		setSuccess("");

		if (password.length < 6) {
			setRegisterError(" Password should be at least 6 characters");
			return;
		}

		// create user
		createUserWithEmailAndPassword(auth, email, password)
			.then((result) => {
				console.log(result.user);
				setSuccess("User created successfully");
			})
			.catch((err) => {
				console.error("err", err);
				setRegisterError(err.message);
			});
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
						required
					/>
					<br />
					<input
						className="w-3/4 px-4 py-2 mb-4"
						type="password"
						name="password"
						placeholder="Password"
						id=""
						required
					/>
					<br />
					<input
						className="w-3/4 mb-4 btn btn-secondary"
						type="submit"
						value="Register"
					/>
				</form>
				{registerError && <p className="text-red-700">{registerError}</p>}
				{success && <p className="text-green-600">{success}</p>}
			</div>
		</div>
	);
};

export default Register;
