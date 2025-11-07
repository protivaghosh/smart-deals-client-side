import React, { useContext } from 'react';
import { updateProfile } from 'firebase/auth';
import { Link } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../AuthProvider/AuthProvider';


const Register = () => {
  const { createUser, signInWithGoogle, setUser } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    if (password.length < 6 || !uppercase || !lowercase) {
      return toast.error(
        '⚠️ Password must be at least 6 characters long and include both uppercase and lowercase letters.'
      );
    }

    try {
      const result = await createUser(email, password);
      await updateProfile(result.user, { displayName: name, photoURL: photo });
      setUser({ ...result.user, displayName: name, photoURL: photo });
      toast.success('✅ Registration successful! Profile updated.');
    } catch (err) {
      toast.error(err.message);
    }
  };

// const handleGoogleRegister = async () => {
//   if (window.googleSignInInProgress) return;
//   window.googleSignInInProgress = true;

//   try {
//     const result = await signInWithGoogle();
//     setUser(result.user);

//     const newUser = {
//       name: result.user.displayName,
//       email: result.user.email,
//       image: result.user.photoURL,
//     };

//     await fetch('http://localhost:5000/user', {
//       method: 'POST',
//       headers: { 'content-type': 'application/json' },
//       body: JSON.stringify(newUser),
//     });

//     toast.success('✅ Google sign-in successful!');
//   } catch (err) {
//     toast.error(err.message);
//   } finally {
//     window.googleSignInInProgress = false;
//   }
// };

  
  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithGoogle();
      setUser(result.user);
       toast.success('✅ Google sign-in successful!');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center min-h-screen items-center">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-5">
        <h2 className="font-bold text-2xl text-center">Register Your Account</h2>
        <form onSubmit={handleRegister} className="card-body">
          <label className="label">Name</label>
          <input type="text" name="name" className="input" placeholder="Name" required />

          <label className="label">Photo URL</label>
          <input type="text" name="photo" className="input" placeholder="Photo URL" required />

          <label className="label">Email</label>
          <input type="email" name="email" className="input" placeholder="Email" required />

          <label className="label">Password</label>
          <input type="password" name="password" className="input" placeholder="Password" required />

          <div className="flex items-center justify-center gap-2 my-2">
            <div className="h-px w-16 bg-black/30"></div>
            <span className="text-sm">or</span>
            <div className="h-px w-16 bg-black/30"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleRegister}
            className="flex items-center justify-center gap-3 bg-white text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-200 transition-colors cursor-pointer mb-2"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google" className="w-5 h-5" />
            Continue with Google
          </button>

          <button type="submit" className="btn btn-neutral mt-4">Register</button>

          <p className="text-center mt-2 font-semibold">
            Already Have An Account? <Link to="/login" className="text-secondary">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
