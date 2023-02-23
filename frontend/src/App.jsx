import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { ImageComp } from './components/ImageComp'
import './App.css'

function App() {
  const [file, setFile] = useState(0);
  const [images, setImages] = useState([]);


  useEffect(() => {
    getImages();
  }, [])

  const getImages = async () => {

    try {
      const { data } = await axios.get(`http://localhost:4000/images`);
      console.log(data.data)
      setImages(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getImage = async (name) => {
    try {
      const { data } = await axios.get(`http://localhost:4000/public/${name}`);
      console.log(data)
      return ''
    } catch (error) {
      return '';
    }
  }

  const upload = async () => {
    try {
      const formdata = new FormData();
      formdata.append("image", file)

      const tabla = 'image';
      const res = await axios.post(`http://localhost:4000/images/${tabla}`, formdata);

      Swal.fire(res.data.err ? res.data.err : res.data.msg);
      document.getElementById('inputFile').value = null;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="">
      <div className="mb-3">
        <label className="form-label">Multiple files input example</label>
        <input
          id="inputFile"
          className="form-control"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <div className="mt-3">
          <button className="btn btn-success" onClick={upload}>Enviar</button>
        </div>
      </div>

      <div className="">
        <h3>Imagenes subidas</h3>
        {images.map(image => (<ImageComp name={image.nombre} key={image.id} />))}
      </div>

    </div>
  )
}

export default App
