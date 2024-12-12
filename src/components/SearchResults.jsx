import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchResults.css'; // Pastikan untuk mengimpor CSS jika ada

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results || []; // Ambil hasil dari state

  return (
    <div>
      <h3>Hasil Pencarian</h3>
      <button onClick={() => navigate(-1)}>Kembali ke Pencarian</button> {/* Tombol untuk kembali */}
      <ul>
        {results.map((item, index) => (
          <li key={index}>
            <p>{item.description}</p>
            <p>Tanggal Ditemukan: {item.dateFound}</p>
            <p>Lokasi: {item.locationFound}</p>
            <p>Kontak: {item.contactInfo}</p>
            {item.photoPath && (
              <img 
                src={`/${item.photoPath}`} // Pastikan path ini benar
                alt={item.description} 
                className="result-image" // Tambahkan kelas untuk styling
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;