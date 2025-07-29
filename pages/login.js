import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/router";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();  // ✅ correct method name

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/");  // ✅ redirect on success
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={10} sm={8} md={6} lg={4}>
          <h2 className="text-center mb-4 text-white">Login</h2> 
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label className="text-white">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
              />
            </Form.Group>

            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

            <div className="text-center mt-3">
              <Link href="/forgot-password" className="text-decoration-none text-light">
                Forgot Password?
              </Link>
            </div>

            <Button variant="warning" type="submit" className="w-100 mt-3">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
