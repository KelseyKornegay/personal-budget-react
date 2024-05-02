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
      const response = await axios.post('http://localhost:3001/api/login', { username, password });
      console.log('Server response:', response);
      localStorage.setItem('token', response.data.token);
      const expiryTime = Date.now() + 60 * 1000; // Current time + 1 minute
    localStorage.setItem('tokenExpiry', expiryTime);
    localStorage.setItem('UserID',response.data.user._id );
    navigate('/'); // Redirect to Homepage
    alert('You have successfully logged in!'); // Display a popup message

  // Now that you have the token, you can make a request to the protected route
  const token = response.data.token;
  axios.get('http://localhost:3001/api/protected', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  .then(protectedResponse => {
    console.log(protectedResponse.data);
    // Call handleProtectedRoute after successful login
    handleProtectedRoute();
  })
  .catch(error => {
    console.error('Error accessing protected route:', error);
  });

  setTimeout(() => { // Schedule a warning to appear 45 seconds after login
    if (window.confirm('Warning, you are about to be logged out in 15 seconds, click here to log back in')) {
      navigate('/login');
    }
  }, 45000);

  setTimeout(() => { // Schedule a redirection to happen 1 minute after login
    navigate('/');
  }, 60000);

} catch (error) {
  console.error('Login failed:', error);
  // If the login was not successful due to incorrect credentials, show an alert
  if (error.response && error.response.data && error.response.data.error === 'Invalid credentials') {
    alert('Sorry, your username or password is incorrect');
    // Clear the login fields
    setUsername('');
    setPassword('');
  }
}
};

  
  const handleLogout = () => {
    // Ask the user if they are sure they want to log out
    if (window.confirm('Are you sure you want to log out?')) {
    // If the user clicked OK, clear the token and expiry time from local storage
    //clear the token and expiry time from local storage
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiry');
    //redirect to the login page
      navigate('/');
    //redirect to the login page
    }
  };



  const handleSignup = async (event) => { // Add this function
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/signup', { username, email, password });
      localStorage.setItem('token', response.data.token);
      const expiryTime = Date.now() + 60 * 1000; // Current time + 1 minute
      localStorage.setItem('tokenExpiry', expiryTime);
      console.log('Signup successful:', response.data); 
      toggleForm(); // Switch to login form
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  const handleProtectedRoute = async () => {
    const token = localStorage.getItem('token');
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    if (Date.now() > tokenExpiry) {
      // Token is expired, redirect to login page
      window.location.href = '/login';
      
    } else {
      // Token is not expired, proceed with the request
      try {
        const response = await axios.get('http://localhost:3001/api/protected', { headers: { Authorization: `Bearer ${token}` } });
        console.log(response.data);
      } catch (error) {
        console.error('Request failed:', error);
      }
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