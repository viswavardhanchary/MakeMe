import { useState } from "react";
import "../styles/AddData.css"
import { Bounce, toast } from "react-toastify";

export default function AddData() {
  const [upload, setUpload] = useState(JSON.parse(localStorage.getItem('upload')) || []);
  const [dataChange, setDataChange] = useState(JSON.parse(localStorage.getItem('dataChange')) || {
    id: 0,
    deadline: "",
    tasks: ""
  });
  const handleChange = (e) => {
    const newData = {
      ...dataChange,
      [e.target.name]: e.target.value,
      id: upload.length == 0 ? 0 : upload[upload.length - 1].id + 1
    }
    setDataChange(newData);
    localStorage.setItem('dataChange', JSON.stringify(newData));
  }
  const handleClick = () => {
    const newData = [
      ...upload,
      dataChange
    ]
    setUpload(newData);
    localStorage.setItem('upload', JSON.stringify(newData));
    setDataChange({
      id: 0,
      deadline: "",
      tasks: ""
    });
    localStorage.setItem('dataChange', JSON.stringify({
      id: 0,
      deadline: "",
      tasks: ""
    }));
  }
  const handleDelete = (curData) => {
    const newData = upload.filter((cur, index) => {
      if (cur.id < curData.id) {
        return cur;
      } else if (cur.id > curData.id) {
        return {
          id: index - 1,
          deadline: cur.deadline,
          tasks: cur.tasks
        }
      }
    });
    setUpload(newData);
    localStorage.setItem('upload', JSON.stringify(newData));
  }
  const handleModify = (curData) => {
    setDataChange({
      id: curData.id,
      deadline: curData.deadline,
      tasks: curData.tasks
    });
    handleDelete(curData);
  }
  const handleUpload = () => {
    const oldData = JSON.parse(localStorage.getItem('data'));
    let startingIndex = (oldData && oldData.length>=1) ? oldData[oldData.length - 1].id : -1;
    let newData; 
    if(oldData == null) {
       newData = [
      ...upload.map((cur) => {
        startingIndex++;
        return {
          id: startingIndex,
          deadline: cur.deadline,
          task: cur.tasks,
          notes: "",
          links: []
        }
      })
    ]
    }else {
     newData = [
      ...oldData,
      ...upload.map((cur) => {
        startingIndex++;
        return {
          id: startingIndex,
          deadline: cur.deadline,
          task: cur.tasks,
          notes: "",
          links: []
        }
      })
    ]
  }
  newData.sort((a , b) => new Date(a.deadline) - new Date(b.deadline));
    const updatedNewData = newData.map((cur , index) => {
      return {
        id: index,
        deadline: cur.deadline,
        task: cur.task,
        notes: cur.notes,
        links: [...cur.links],
      }
    });
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
    localStorage.setItem('data', JSON.stringify(updatedNewData));
    localStorage.setItem('upload', JSON.stringify([]));
    setUpload([]);
  }
  return (
    <>
      <div className="total-div">
        <div className="box" >
          <button className="btn btn-info" onClick={handleUpload}>Upload</button>
          
        </div>
        <h4>Add Data : </h4>
        <div className="container1">
          <input type="text" name="deadline" className="deadline1" value={dataChange.deadline} placeholder="Enter Deadline" onChange={(e) => handleChange(e)} required/>
          <input type="text" name="tasks" value={dataChange.tasks} className="tasks" placeholder="Enter Task" onChange={(e) => handleChange(e)} required/>
          <button className="btn btn-success" onClick={handleClick}>+ Add</button>
        </div>
        {
          upload && upload.map((cur, index) => {
            return <div className="data-details" key={index}>
              <div className="deadline-div">{index + 1}. DeadLine : {cur.deadline}</div>
              <div className="tasks-div">Task : {cur.tasks}</div>
              <div className="buttons">
                <button className="btn btn-danger" onClick={() => { handleDelete(cur) }}>Delete</button>
                <button className="btn btn-success" onClick={() => { handleModify(cur) }}>Modify</button>
              </div>

            </div>
          })
        }

      </div>

    </>
  )
}