import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/router';
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import Link from 'next/link';

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [existingUser, setExistingUser] = useState(false);
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setExistingUser(false);
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login?verified=true`,
      }
    });

    // ✅ Bulletproof check for duplicate account (email already registered)
    if (!error && data?.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
      setExistingUser(true);
      return;
    }

    console.log("Supabase signUp error:", error);

    if (error) {
      const msg = error.message?.toLowerCase() || "";
      const code = error.status || error.code || "";

      if (
        msg.includes("already registered") ||
        msg.includes("user already exists") ||
        (msg.includes("email") && msg.includes("exists")) ||
        code === "23505"
      ) {
        setExistingUser(true);
      } else {
        setError(error.message);
      }
    } else {
      setSuccess("You're almost there! Please check your email to confirm your registration.");
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={10} sm={8} md={6} lg={4}>
          <h2 className="text-center mb-4 text-white">Register</h2>
          <Form onSubmit={handleRegister} autoComplete="off">
            {/* Dummy fields to disable autofill */}
            <input type="text" name="fakeuser" style={{ display: 'none' }} />
            <input type="password" name="fakepassword" style={{ display: 'none' }} />

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label className="text-white">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label className="text-white">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label className="text-white">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}

            {existingUser && (
              <Alert variant="warning">
                An account with this email already exists.{" "}
                <Link href="/forgot-password" className="text-decoration-none text-warning fw-semibold">
                  Forgot your password?
                </Link>
              </Alert>
            )}

            {success && (
              <Alert variant="success">{success}</Alert>
            )}

            <Button variant="warning" type="submit" className="w-100 mt-3">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
