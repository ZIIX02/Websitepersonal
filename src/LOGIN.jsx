import React, { useState } from 'react'; // Import useState untuk mengelola state
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate dan Link untuk navigasi

const App = () => {
  const navigate = useNavigate(); // Inisialisasi useNavigate
  const [email, setEmail] = useState(''); // State untuk email
  const [password, setPassword] = useState(''); // State untuk password
  const [error, setError] = useState(''); // State untuk menyimpan pesan error

  const handleLogin = () => {
    // Logika untuk menangani login
    fetch('http://localhost:9500/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          // Jika login berhasil, simpan token (jika perlu) dan navigasi ke halaman HOME
          localStorage.setItem('token', data.token); // Simpan token di localStorage
          navigate('/home'); // Arahkan ke halaman HOME
        } else {
          // Jika ada error, tampilkan pesan error
          setError(data.message);
        }
      })
      .catch(err => {
        console.error('Error:', err);
        setError('Terjadi kesalahan saat login');
      });
  };

  return (
    <div className="app">
      <div className="LoginBox">
        <center>
          <h2>LOGIN</h2>
        </center>
        <p>Email</p>
        <div className="input">
          <input 
            type="text" 
            id="username" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} // Update state email
          />
        </div>
        <p>Password</p>
        <div className="input">
          <input 
            type="password" 
            id="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} // Update state password
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Tampilkan pesan error */}
        <div className="checkBox">
          <input id="remember" name="remember" type="checkbox" />
          <label htmlFor="remember">Ingat saya</label>
        </div>
        <a className='forgot' href='#'>Lupa Password?</a>
        <button className='LoginButon' type='button' onClick={handleLogin}>
          Login
        </button>
        <center>
          <Link className='SingUp' to='/register'>Tidak memiliki akun? Daftar</Link> {/* Ganti href dengan Link */}
        </center>
      </div>
    </div>
  );
};

export default App; // Pastikan Anda mengekspor komponen ini