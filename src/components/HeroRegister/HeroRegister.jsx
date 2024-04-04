import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";

const HeroRegister = () => {
	const [registerError, setRegisterError] = useState("");

	const handleRegister = (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.password.value;
		console.log(email, password);

		createUserWithEmailAndPassword(auth, email, password)
			.then((result) => console.log(result.user))
			.catch((err) => {
				console.log(err);
				setRegisterError(err.message);
			});
	};

	return (
		<div>
			<div className="min-h-screen hero bg-base-200">
				<div className="flex-col hero-content lg:flex-row-reverse">
					<div className="text-center lg:text-left">
						<h1 className="text-5xl font-bold">Register now!</h1>
						<p className="py-6">
							Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
							excepturi exercitationem quasi. In deleniti eaque aut repudiandae
							et a id nisi.
						</p>
					</div>
					<div className="w-full max-w-sm shadow-2xl card shrink-0 bg-base-100">
						<form
							onSubmit={handleRegister}
							className="card-body"
						>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Email</span>
								</label>
								<input
									type="email"
									name="email"
									placeholder="email"
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
									name="password"
									placeholder="password"
									className="input input-bordered"
									required
								/>
								<label className="label">
									<a
										href="#"
										className="label-text-alt link link-hover"
									>
										Forgot password?
									</a>
								</label>
							</div>
							<div className="mt-6 form-control">
								<button className="btn btn-primary">Login</button>
							</div>
						</form>
						{registerError && <p>{registerError}</p>}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroRegister;
