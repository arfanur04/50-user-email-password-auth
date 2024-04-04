import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
	const [registerError, setRegisterError] = useState("");
	const [success, setSuccess] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const handleRegister = (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.password.value;
		const accepted = e.target.terms.checked;
		console.log(email, password, accepted);

		// reset error, success
		setRegisterError("");
		setSuccess("");

		if (password.length < 6) {
			setRegisterError(" Password should be at least 6 characters");
			return;
		} else if (!/[A-Z]/.test(password)) {
			setRegisterError(
				"Your password should have at least one upper case letter"
			);
			return;
		} else if (!accepted) {
			setRegisterError("Please accept our terms and conditions");
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
						className="w-full px-4 py-2 mb-4"
						type="email"
						name="email"
						placeholder="Email Address"
						id=""
						required
					/>
					<br />
					<div className="relative border">
						<input
							className="w-full px-4 py-2"
							type={showPassword ? "text" : "password"}
							name="password"
							placeholder="Password"
							id=""
							required
						/>
						<span
							className="absolute text-2xl transform -translate-y-1/2 cursor-pointer top-1/2 right-2 hover:text-secondary"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? <FaEyeSlash /> : <FaEye />}
						</span>
					</div>
					<br />
					<div className="mb-4">
						<input
							type="checkbox"
							name="terms"
							id="terms"
						/>
						<label
							className="ml-2"
							htmlFor="terms"
						>
							Accept our <Link className="underline">Terms and Conditions</Link>
						</label>
					</div>
					<br />
					<input
						className="w-full mb-4 btn btn-secondary"
						type="submit"
						value="Register"
					/>
				</form>
				{registerError && <p className="text-red-700">{registerError}</p>}
				{success && <p className="text-green-600">{success}</p>}
				<p>
					Already have an account? Please{" "}
					<Link
						to={"/login"}
						className="underline"
					>
						Login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Register;
