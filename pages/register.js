import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/router';

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [error, setError] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();  // Prevent form submission
        console.log("Registering submit", email, password);
        const { error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) {
            setError(error.message);
        } else {
            router.push("/login");  // Redirect to login page on successful registration
        }
    }

    return (
        <div className="container mt-5 text-white">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input type='email' placeholder='Email' className='form-control my-2'
                    onChange={(e) => setEmail(e.target.value)} value={email} required/>
                <input type='password' placeholder='Password' className='form-control my-2'
                    onChange={(e) => setPassword(e.target.value)} value={password} required/>
                {error && <p className="text-danger">{error}</p>}
                <button className="btn btn-warning">Register</button>
            </form>
        </div>
    );
}