
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleForgotPassword = async (e) => {
        e.preventDefault();  // Prevent form submission
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/login`,  // Redirect after password reset
        });
        
        if (error) {
            setError(error.message);
        } else {
            setMessage("Check your email for the password reset link.");
            setEmail("");  // Clear the input field
        }
    }

    return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={10} sm={8} md={6} lg={4}>
          <h2 className="text-center mb-4 text-white">Reset Password</h2>
          <Form onSubmit={handleForgotPassword}>
            <Form.Group controlId="formEmail">
              <Form.Label className="text-white">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            {message && <Alert variant="success" className="mt-3">{message}</Alert>}

            <Button type="submit" variant="warning" className="w-100 mt-3">
              Send Reset Link
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}