import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };


  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('handleLogin called');
    try {
      const response = await axios.post('http://18.191.247.199:3001/api/login', { username, password });
      console.log('Server response:', response);
      localStorage.setItem('token', response.data.token);
      const expiryTime = Date.now() + 60 * 1000; // Current time + 1 minute
    localStorage.setItem('tokenExpiry', expiryTime);
    localStorage.setItem('UserID',response.data.user._id );
    navigate('/'); // Redirect to Homepage
    alert('You have successfully logged in!'); 
      // Schedule a logout for when the token expires
      setTimeout(() => {
        handleLogout();
      }, 60 * 1000); // 1 minute
  const token = response.data.token;
  axios.get('http://18.191.247.199:3001/api/protected', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  .then(protectedResponse => {
    console.log(protectedResponse.data);
    // Call handleProtectedRoute after successful login
    // handleProtectedRoute();
  })
  .catch(error => {
    console.error('Error accessing protected route:', error);
  });

  setTimeout(() => { 
    if (window.confirm('Warning, you are about to be logged out in 15 seconds, click here to log back in')) {
      navigate('/login');
    }
  }, 45000);

  setTimeout(() => { // Schedule a redirection to happen 1 minute after login
    navigate('/');
  }, 60000);

} catch (error) {
  console.error('Login failed:', error);
  if (error.response && error.response.data && error.response.data.error === 'Invalid credentials') {
    alert('Sorry, your username or password is incorrect');
    // Clear the login fields
    setUsername('');
    setPassword('');
  }
}
};


const resetUserData = () => {
  // Clear user-specific data from local storage
  localStorage.removeItem('username');
  localStorage.removeItem('email');
  localStorage.removeItem('budget'); // Clear budget data
  // Reset state variables
  setUsername('');
  setEmail('');
};
  
const handleLogout = () => {
  if (window.confirm('Are you sure you want to log out?')) {
    // If the user clicked OK, clear the token and expiry time from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('UserID');
    // Reset user-specific data
    resetUserData();
    // Redirect to the login page
    navigate('/login');
  }
};

  const handleSignup = async (event) => { 
    event.preventDefault();
    try {
      const response = await axios.post('http://18.191.247.199:3001/api/signup', { username, email, password });
      localStorage.setItem('token', response.data.token);
      const expiryTime = Date.now() + 60 * 1000; // Current time + 1 minute
      localStorage.setItem('tokenExpiry', expiryTime);
      console.log('Signup successful:', response.data); 
      toggleForm(); // Switch to login form
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };


  return (
    <div>
      {isLogin ? (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
            <input type="submit" value="Login" />
          </form>
        </div>
      ) : (

        
        <div>
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
          <input type="submit" value="Signup" />
        </form>
      </div>
      )}
      <button onClick={toggleForm}>
        {isLogin ? "Switch to Signup" : "Switch to Login"}
      </button>
      {/* <button onClick={handleProtectedRoute}>
        Access Protected Route
      </button> */}
       {/* Logout button */}
    <button onClick={handleLogout}>Logout</button>
    </div>
  );
}


export default LoginPage;