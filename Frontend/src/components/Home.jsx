import '../styles/Home.css';
import MainPageImage from '../images/main-page-image.png';
import Navigate from '../images/navigate.png';
import Excel from '../images/excel.png';
import Manual from '../images/manual.png';
import {  useState } from 'react';
import { Link } from 'react-router-dom';
import { sendData } from '../apis/fileData';
import { Bounce, toast } from 'react-toastify';
import PopUp from './PopUp';
export default function Home() {
  const [file, setFile] = useState("");
  const [popUp, setPopUp] = useState(false);

  const handleUploadFile = async () => {
    if (file) {
      toast.success('Uploaded SuccessFully', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      const formedFile = new FormData();
      formedFile.append('file', file);

      try {
        const res = await sendData(formedFile);
        const acData = res.data;
        const oldData = JSON.parse(localStorage.getItem('data'));
        let startingIndex = (oldData && oldData.length >= 1) ? oldData[oldData.length - 1].id : -1;
        let newData;
        if (oldData == null) {
          newData = [
            ...acData.map((cur) => {
              startingIndex++;
              return {
                id: startingIndex,
                deadline: cur.deadline,
                task: cur.task,
                notes: "",
                links: []
              }
            })
          ]
        } else {
          newData = [
            ...oldData,
            ...acData.map((cur) => {
              startingIndex++;
              return {
                id: startingIndex,
                deadline: cur.deadline,
                task: cur.task,
                notes: "",
                links: []
              }
            })
          ]
        }
        newData.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        const updatedNewData = newData.map((cur, index) => {
          return {
            id: index,
            deadline: cur.deadline,
            task: cur.task,
            notes: cur.notes,
            links: [...cur.links],
          }
        });
        localStorage.setItem('data', JSON.stringify(updatedNewData));
      } catch (error) {
        console.log(error);
        localStorage.setItem('data', JSON.stringify([]));
      }
    } else {
      toast.error('Warning! Uploading ,Only .CSV file', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      alert("Only CSV files are Accepted/Upload Valid File");
    }
  }

  const handleChangeUpload = (e) => {
    const curFile = e.target.files[0];
    if (curFile) {
      if (curFile.name.endsWith(".csv")) {
        setFile(curFile);
      } else {
        e.target.value = "";
        alert("Only CSS files are Accepted");
      }
    }
  }

  const handleKnow = () => {
  setPopUp(true);
  document.body.style.overflow = 'hidden'; 
};

  return (
    <>
      <div className='body'>
        <div className="ai-gen">
          <div className="content">
            <h1>Generate the lists of ur Tasks</h1>
            <h2>Using MyAi.</h2>
            <Link to="/generate" className="btn btn-primary gen">Generate →</Link>
          </div>
          <div className="image">
            <img src={MainPageImage} alt='Image of Ai and User' width="75%" className='image-ai' />
          </div>
        </div>

        <div className="cont">
          <div className="naviagte">
            <h5>Check all Our Tasks</h5>
            <img src={Navigate} alt="Navigate Image" className="image-task" />
            <Link to="/tasks" className="btn btn-primary">Navigate To Task →</Link>
          </div>
          <div className="file">
            <h5>Add the Excel (.csv) File</h5>
            <img src={Excel} alt="File Upload Image" className="image-file" />
            <Link to="/" className="btn btn-primary check" onClick={handleKnow}>Check the Format of Excel file →</Link>
            <div className='file-data-upload'>
              <input type="file" accept=".csv" className='input-file2' id="inputFile" onChange={(e) => handleChangeUpload(e)} required/>
              <button className='btn btn-success' onClick={handleUploadFile}>Upload</button>
            </div>

          </div>
          <div className="manual">
            <h5>Add the Data Manually</h5>
            <img src={Manual} alt="Manual Add" className="image-man" />
            <Link to="/add-data" className="btn btn-primary">Upload the Data →</Link>
          </div>
        </div>
      </div>

      {popUp && <PopUp setPopUp={setPopUp}/>}

    </>
  );
}
