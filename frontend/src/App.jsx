import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import './App.css'

function App() {
  const [file, setFile] = useState(0);

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
      </div>

      <div>
        <button className="btn btn-success" onClick={upload}>Enviar</button>
      </div>
    </div>
  )
}

export default App
