import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; 
import './MENCARI.css';

const App = () => {
  const navigate = useNavigate();
  
  const [itemType, setItemType] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Logika untuk mencari barang berdasarkan kata kunci
    fetch(`http://localhost:9500/api/search?itemType=${itemType}`)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setResults(data.items); // Simpan hasil pencarian
          navigate('/results', { state: { results: data.items } }); // Arahkan ke halaman hasil
        } else {
          alert('Gagal mendapatkan hasil pencarian: ' + data.message);
        }
      })
      .catch(err => {
        console.error('Error:', err);
        alert('Terjadi kesalahan saat mencari barang');
      });
  };

  return (
    <div className='App'>
      <div className='nav'>
        <b>
          <a href="/HOME">Home</a>
        </b>
      </div>
      <form onSubmit={handleSearch}>
        <div className='box'>
          <center>
            <h2>MENCARI</h2>
          </center>
          <div className='BARANG'>
            <p>
              <input type="text" value={itemType} onChange={(e) => setItemType(e.target.value)} placeholder="Jenis Barang" required />
            </p>
          </div>
          <button className="cari" type="submit">Cari</button>
        </div>
      </form>
    </div>
  );
};

export default App;