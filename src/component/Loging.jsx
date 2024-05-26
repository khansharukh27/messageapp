import { useState } from 'react';
import '../componentcss/login.css';
import { Link, useNavigate } from 'react-router-dom';

const Loging = () => {
    const [input, setInput] = useState({
        Email: '',
        Password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { Email, Password } = input;
        try {
            const response = await fetch(`http://localhost:5000/loging`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Email, Password }),
            });

            if (response.ok) {
                localStorage.setItem('loggedInEmail', Email);
                // localStorage.setItem('userId',)
                

                const data = await response.json();
                console.log('Data:', data);
                console.log('logging success')
                localStorage.setItem('userId',data.user._id)
                // onLogin(); // Call the onLogin function passed as prop
                navigate('/');
            } else {
                throw new Error('Invalid email or password');
            }
        } catch (error) {
            console.error('Login error:', error.message);
            // setErrorMessage(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card">
            <p className="heading">Form</p>

            <div className="input-div">
                <input type="text" onChange={handleChange} className="input" placeholder="Email" name="Email" value={input.Email} />
            </div>
            <div className="input-div">
                <input className="input" onChange={handleChange} type="password" placeholder="Password" name="Password" value={input.Password} />
            </div>

            <div className="button-div">
                <button type="submit" className="submit">
                    Submit
                </button>
            </div>
            <div className="anchor">
                <Link to="/signup" className="link">I don't have an account</Link>
                <Link to="/forgot-password" className="link">Forgot Password</Link>
            </div>
        </form>
    );
};

export default Loging;
