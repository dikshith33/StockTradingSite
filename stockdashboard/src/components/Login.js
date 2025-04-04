import React, { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Backend API Base URL

const Login = ({ onAuthChange }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });

      if (response.data.userId) {
        localStorage.setItem("userId", response.data.userId);
        onAuthChange(); // ✅ Update UI immediately
        navigate("/"); // Redirect to dashboard
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <Card className="shadow-lg p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">🔑 Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">Login</Button>
        </Form>
        <div className="text-center mt-3">
          <p>
            Don't have an account? <a href="/signup" style={{ textDecoration: "none" }}>Sign up</a>
          </p>
        </div>
      </Card>
    </Container>
  );
};

export default Login;
