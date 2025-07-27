import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/router";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.passwordDefault();  // Prevent form submission
        console.log("Logging submit", email, password);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            setError(error.message);
        } else {
            router.push("/");  // Redirect to home page on successful login
        }
    }

    return (
    <div className="container mt-5 text-white">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" className="form-control my-2"
          onChange={(e) => setEmail(e.target.value)} value={email} required />
        <input type="password" placeholder="Password" className="form-control my-2"
          onChange={(e) => setPassword(e.target.value)} value={password} required />
        {error && <p className="text-danger">{error}</p>}
        <button className="btn btn-warning">Login</button>
      </form>
    </div>
  )
}