import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { AuthContext } from '../AuthProvider/AuthProvider';



const Login = () => {
  const { signInUser, signInWithGoogle, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [error, setError] = useState('');

  // Email login
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

   signInUser(email, password)
      .then((result) => {
        setUser(result.user);
        navigate(from, { replace: true });
      })
      .catch((err) => setError(err.message));
  };

  // Google login
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user)
         
         const newUser = {
                name: result.user.displayName,
                email: result.user.email,
                image: result.user.photoURL,
              };
        
               fetch('http://localhost:5000/user', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(newUser),
              });

        setUser(result.user);
        navigate(from, { replace: true });
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-5">
        <h2 className="font-bold text-2xl text-center">Login Your Account</h2>
        <form onSubmit={handleLogin} className="card-body">
          <fieldset className="fieldset">
           
           <label className="label">Email</label>
            <input type="email" name="email" className="input" placeholder="Email" required />

            <label className="label">Password</label>
            <input type="password" name="password" className="input" placeholder="Password" required />

            <div>  <Link
    to="/forgetPassword"
    state={{ email: document.querySelector('input[name="email"]')?.value }}
    className="link link-hover"
  >
    Forgot password?
  </Link></div>
        {/* divider */}
         <div className="flex items-center justify-center gap-2 my-2">
              <div className="h-px w-16 bg-black/30"></div>
              <span className="text-sm">or</span>
              <div className="h-px w-16 bg-black/30"></div>
            </div>
          {/* Google login */}
             <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center gap-3 bg-white text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-200 transition-colors cursor-pointer mb-2"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>

            <button className="btn btn-neutral mt-4 w-full">Login</button>
          </fieldset>

          <p className="text-center mt-2 font-semibold">
            Don’t Have An Account? <Link to='/register' className="text-secondary">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
