
import React, { useState } from "react";

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      {isLogin ? (
        <div>
          <h2>Login</h2>
          <form>
            {/* Login form fields */}
          </form>
        </div>
      ) : (
        <div>
          <h2>Signup</h2>
          <form>
            {/* Signup form fields */}
          </form>
        </div>
      )}
      <button onClick={toggleForm}>
        {isLogin ? "Switch to Signup" : "Switch to Login"}
      </button>
    </div>
  );
}

export default LoginPage;