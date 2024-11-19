import { useState } from "react";
import { Envelope, Lock } from "phosphor-react"; // Importing icons

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="login-container">
      <h2 className="login-title">NLCC Admin</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            <b>Email</b>
          </label>
          <div className="input-wrapper mt-3">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="input"
            />
            <Envelope size={20} className="input-icon" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            <b>Password</b>
          </label>
          <div className="input-wrapper mt-3">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="input"
            />
            <Lock size={20} className="input-icon" />
          </div>
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
