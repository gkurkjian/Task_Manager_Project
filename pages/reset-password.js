// pages/reset-password.js

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/router";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Password updated! Redirecting...");
      setTimeout(() => router.push("/login"), 2000);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={10} sm={8} md={6} lg={4}>
          <h2 className="text-center mb-4 text-white">Set New Password</h2>
          <Form onSubmit={handleReset}>
            <Form.Group controlId="formPassword">
              <Form.Label className="text-white">New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword" className="mt-3">
              <Form.Label className="text-white">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            {message && <Alert variant="success" className="mt-3">{message}</Alert>}

            <Button type="submit" variant="warning" className="w-100 mt-4">
              Update Password
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
