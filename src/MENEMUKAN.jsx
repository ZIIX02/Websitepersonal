import "./MENEMUKAN.css"
import { useNavigate } from "react-router-dom"; 
import { useState } from "react";


const App = () => {

  const navigate = useNavigate();
  
    const handleHomeClick = () => {
      navigate("/HOME")
    };
  

  const [image,setImage] = useState("https://fakeimg.pl/350x200/")
  const [saveImage, setSaveImage] = useState(null)
  const [description, setDescription] = useState('');
  const [dateFound, setDateFound] = useState('');
  const [locationFound, setLocationFound] = useState('');
  const [contactInfo, setContactInfo] = useState('');

   function handleUploadChange(e){
    console.log(e.target.files[0])
    let uploaded = e.target.files[0]
    setImage(URL.createObjectURL(uploaded))
    setSaveImage(uploaded)
   }

   function uploadImage(){
    if(!saveImage){
      alert('Upload gambar dulu')
    }else{

      let formData = new FormData()
      formData.append('photo', saveImage)
      formData.append('description', description);
      formData.append('dateFound', dateFound);
      formData.append('locationFound', locationFound);
      formData.append('contactInfo', contactInfo);

      fetch('http://localhost:9500/api/upload', {
        method: 'POST',
        body: formData
      }).then(res => res.json()).then(data => {
        if(data.status === 'success'){
          alert('Data berhasil disimpan');
          // Reset form atau lakukan tindakan lain setelah berhasil
        } else {
          alert('Gagal menyimpan data: ' + data.message);
        }
      })
      .catch(err => {
        console.error('Error:', err);
        alert('Terjadi kesalahan saat menyimpan data');
      });
    }
  }

  return (
    <div className='App'>
      <div className='nav'>
        <b>
          <a href="/HOME" onClick={handleHomeClick}>Home</a>
        </b>
        </div>
      <div className="d-flex">
        <div className='d'>
          <div>
            <img src={image} className="img" alt=""/>
          </div>
          
          <div className='form'>
            <label htmlFor='formFile' className='from-label'>
              Upload image here
            </label>
            <p>
            <input type='file' className='uploud' id='photo' onChange={handleUploadChange} accept='image/*' />
            </p>
            <p>
              <input type='text' className='description' placeholder="Deskripsi barang" value={description} onChange={(e) => setDescription(e.target.value)} />
            </p>
            <p>
              <input type='date' className='date' placeholder="Tanggal ditemukan" value={dateFound} onChange={(e) => setDateFound(e.target.value)} />
            </p>
            <p>
              <input type='text' className='location' placeholder="Lokasi barang ditemukan" value={locationFound} onChange={(e) => setLocationFound(e.target.value)} />
            </p>
            <p>
              <input type='text' className='contact' placeholder="Informasi kontak" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} />
            </p>
            <button onClick={uploadImage} className='save'>
              Simpan informasi
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default App;