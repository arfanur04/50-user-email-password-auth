import {
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
	const [registerError, setRegisterError] = useState("");
	const [success, setSuccess] = useState("");
	const emailRef = useRef(null);

	const handleLogin = (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.password.value;
		console.log(email, password);

		// reset error, success
		setRegisterError("");
		setSuccess("");

		// add validation
		signInWithEmailAndPassword(auth, email, password)
			.then((result) => {
				console.log(result.user);
				if (result.user.emailVerified) {
					setSuccess("User Logged in successfully");
				} else {
					alert("please verify your email address");

					// send verification email
					// sendEmailVerification(result.user).then(() => {
					// 	alert("Please check your email and verify your account");
					// });
				}
			})
			.catch((err) => {
				console.error("err", err);
				setRegisterError(err.message);
			});
	};

	const handleForgetPassword = () => {
		const email = emailRef.current.value;
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

		if (!email) {
			console.log("Please Provide email");
			return;
		} else if (!emailRegex.test(email)) {
			console.log("please write a valid email: ", emailRef.current.value);
			return;
		}

		// send validation email
		sendPasswordResetEmail(auth, email)
			.then(() => {
				// Password reset email sent!
				alert("Please check your email");
			})
			.catch((err) => {
				console.error("err", err);
			});
	};

	return (
		<div className="min-h-screen hero bg-base-200">
			<div className="flex-col hero-content lg:flex-row-reverse">
				<div className="text-center lg:text-left">
					<h1 className="text-5xl font-bold">Login now!</h1>
					<p className="py-6">
						Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
						excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
						a id nisi.
					</p>
				</div>
				<div className="w-full max-w-sm shadow-2xl card shrink-0 bg-base-100">
					<form
						onSubmit={handleLogin}
						className="card-body"
					>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input
								type="email"
								placeholder="email"
								name="email"
								ref={emailRef}
								className="input input-bordered"
								required
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Password</span>
							</label>
							<input
								type="password"
								placeholder="password"
								name="password"
								className="input input-bordered"
								required
							/>
							<label className="label">
								<Link
									onClick={handleForgetPassword}
									className="label-text-alt link link-hover"
								>
									Forgot password?
								</Link>
							</label>
						</div>
						<div className="mt-6 form-control">
							<button className="btn btn-primary">Login</button>
						</div>
					</form>
					{registerError && <p className="text-red-700">{registerError}</p>}
					{success && <p className="text-green-600">{success}</p>}
					<p>
						New to this website Please{" "}
						<Link
							to={"/register"}
							className="underline"
						>
							Register
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
