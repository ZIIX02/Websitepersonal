import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import './Register.css'; 

const Register = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(''); 
  const [success, setSuccess] = useState(''); 

  const handleRegister = () => {
    
    fetch('http://localhost:9500/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          
          setSuccess(data.message);
          setError('');
          setTimeout(() => {
            navigate('/'); // Arahkan ke halaman login setelah 2 detik
          }, 2000);
        } else {
          // Jika ada error, tampilkan pesan error
          setError(data.message);
          setSuccess('');
        }
      })
      .catch(err => {
        console.error('Error:', err);
        setError('Terjadi kesalahan saat pendaftaran');
        setSuccess('');
      });
  };

  return (
    <div className="app">
      <div className="RegisterBox">
        <center>
          <h2>DAFTAR</h2>
        </center>
        <p>Email</p>
        <div className="input">
          <input 
            type="text" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} // Update state email
          />
        </div>
        <p>Password</p>
        <div className="input">
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} // Update state password
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Tampilkan pesan error */}
        {success && <p style={{ color: 'green' }}>{success}</p>} {/* Tampilkan pesan sukses */}
        <button className='RegisterButton' type='button' onClick={handleRegister}>
          Daftar
        </button>
        <center>
          <a className='Login Link' href='/'>Sudah memiliki akun? Masuk</a>
        </center>
      </div>
    </div>
  );
};

export default Register; // Pastikan Anda mengekspor komponen ini