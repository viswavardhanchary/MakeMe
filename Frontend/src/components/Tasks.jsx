import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import '../styles/Tasks.css';
import AddLinks from './AddLinks';
import { Link } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import NoDataAvai from './NoDataAvai';
export default function Task() {
  const date = new Date();
  const [isAddNotesClicked, setIsAddNotesClicked] = useState(JSON.parse(localStorage.getItem('isAddNotesClicked')) || false);
  const [isAddLinksClicked, setIsAddLinksClicked] = useState(JSON.parse(localStorage.getItem('isAddLinksClicked')) || false);
  const [links, setLinks] = useState(JSON.parse(localStorage.getItem('links')) || []);
  const [linksText, setLinksText] = useState(JSON.parse(localStorage.getItem('linksText')) || "");
  const [text, setText] = useState(JSON.parse(localStorage.getItem('text')) || "");
  const [currentData, setCurrentData] = useState(JSON.parse(localStorage.getItem('currentData')) || []);
  const [data, setData] = useState(JSON.parse(localStorage.getItem('data')) || []);
  const [reviewNotes, setReviewNotes] = useState(JSON.parse(localStorage.getItem('reviewNotes')) || false);
  const [reviewLinks, setReviewLinks] = useState(JSON.parse(localStorage.getItem('reviewLinks')) || false);
  const [modify, setModify] = useState(JSON.parse(localStorage.getItem('modify')) || false);
  const [dataModify, setDataModify] = useState(JSON.parse(localStorage.getItem('dataModify')) || {
    deadline: "",
    tasks: ""
  });
  const [completed, setCompeleted] = useState(JSON.parse(localStorage.getItem('completed')) || []);
  const [isCheckOpened, setIsCheckOpened] = useState(false);

  const styles = {
    content: [
      "Pending",
      "On Going",
      "Future"
    ],
    color: [
      "red",
      "orange",
      "green"
    ]
  }
  const [isNoData, setIsNoData] = useState((data === null || data.length == 0) ? true : false);
  const [isNoDataC, setIsNoDataC] = useState((completed === null || completed.length == 0) ? true : false);



  const deleteFunc = (data2) => {
    let newData = data2.map((cur, index) => {
      return {
        id: index,
        deadline: cur.deadline,
        task: cur.task,
        notes: cur.notes,
        links: cur.links,
      }
    });
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
    if (updatedNewData.length === 0) setIsNoData(true);
    setData(updatedNewData);
    localStorage.setItem('data', JSON.stringify(updatedNewData));
  }
  const orderComplete = (data2) => {
    const newData = data2.map((cur, index) => {
      return {
        id: index,
        deadline: cur.deadline,
        task: cur.task,
        notes: cur.notes,
        links: [...cur.links],
      }
    });
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
    if (updatedNewData.length === 0) setIsNoDataC(true);
    setCompeleted(updatedNewData);
    localStorage.setItem('completed', JSON.stringify(updatedNewData));
  }

  const handleLinksAdd = () => {
    const newData = [
      ...links,
      linksText
    ];
    setLinks(newData);
    localStorage.setItem('links', JSON.stringify(newData));

  }

  const handleSaveLinks = () => {
    currentData.links = [...links];
    const newData = data.filter((curData) => {
      return curData.id === currentData.id ? currentData : curData;
    });
    setData(newData);
    localStorage.setItem('data', JSON.stringify(newData));
    setIsAddLinksClicked(false);
    localStorage.setItem('isAddLinksClicked', JSON.stringify(false));
  }
  const handleAddLinks = (curData) => {
    setText(curData.notes);
    localStorage.setItem('text', JSON.stringify(curData.notes));
    setLinks(curData.links);
    localStorage.setItem('links', JSON.stringify(curData.links));
    setCurrentData(curData);
    localStorage.setItem('currentData', JSON.stringify(curData));
    setIsAddLinksClicked(true);
    localStorage.setItem('isAddLinksClicked', JSON.stringify(true));
  }

  const handleSaveNotes = () => {
    currentData.notes = text;
    const newData = data.filter((curData) => {
      return curData.id === currentData.id ? currentData : curData;
    });
    setData(newData);
    localStorage.setItem('data', JSON.stringify(newData));
    setIsAddNotesClicked(false);
    localStorage.setItem('isAddNotesClicked', JSON.stringify(false));
  }
  const handleAddNotes = (curData) => {
    setText(curData.notes);
    localStorage.setItem('text', JSON.stringify(curData.notes));
    setCurrentData(curData);
    localStorage.setItem('currentData', JSON.stringify(curData));
    setIsAddNotesClicked(true);
    localStorage.setItem('isAddNotesClicked', JSON.stringify(true));
  }
  const handleComplete = (curData) => {
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
    const newData = [
      ...completed,
      curData
    ]
    setCompeleted(newData);
    localStorage.setItem('completed', JSON.stringify(newData));
    const newData2 = data.filter((cur) => {
      if (cur.id !== curData.id) return cur;
    });
    setData(newData2);
    localStorage.setItem('data', JSON.stringify(newData2));
    deleteFunc(newData2);
  }

  const handleReviewNotes = (curData) => {
    setCurrentData(curData);
    localStorage.setItem('currentData', JSON.stringify(curData));
    setReviewNotes(true);
    localStorage.setItem('reviewNotes', JSON.stringify(true));
  }

  const handleReviewLinks = (curData) => {
    setCurrentData(curData);
    localStorage.setItem('currentData', JSON.stringify(curData));
    setReviewLinks(true);
    localStorage.setItem('reviewLinks', JSON.stringify(true));
  }

  const handleDelete = (curData) => {
    const newData = data.filter((cur) => {
      if (cur.id !== curData.id) return cur;
    });
    setData(newData);
    localStorage.setItem('data', JSON.stringify(newData));
    deleteFunc(newData);
  }
  const handleModify = (curData) => {
    setModify(true);
    setCurrentData(curData);
    const newModifyData = {
      deadline: curData.deadline,
      tasks: curData.task
    }
    setDataModify(newModifyData);
    localStorage.setItem('dataModify', JSON.stringify(newModifyData));
    localStorage.setItem('currentData', JSON.stringify(curData));
    localStorage.setItem('modify', JSON.stringify(true));
  }
  const handleSaveModify = () => {
    currentData.deadline = dataModify.deadline;
    currentData.task = dataModify.tasks;
    const newData = data.filter((cur) => {
      return cur.id !== currentData.id ? cur : currentData
    });
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
    setData(updatedNewData);
    setModify(false);
    localStorage.setItem('data', JSON.stringify(updatedNewData));
    localStorage.setItem('modify', JSON.stringify(false));
  }

  const handlePushBack = (curData) => {
    const newData = completed.filter((cur) => {
      if (cur.id !== curData.id) return cur;
    });
    orderComplete(newData);
    const newData2 = [
      ...data,
      {
        id: data[data.length - 1].id + 1,
        deadline: curData.deadline,
        task: curData.task,
        notes: curData.notes,
        links: [...curData.links],
      }
    ];
    newData2.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    const updatedNewData = newData2.map((cur, index) => {
      return {
        id: index,
        deadline: cur.deadline,
        task: cur.task,
        notes: cur.notes,
        links: [...cur.links],
      }
    });
    toast.success('Pushed Back SuccessFully', {
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
    setData(updatedNewData);
    localStorage.setItem('data', JSON.stringify(updatedNewData));
  }

  const dateMake = (curData) => {
    let today = new Date();
    today.setHours(0, 0, 0, 0, 0);
    let inputDate = new Date(curData.deadline);
    inputDate.setHours(0, 0, 0, 0, 0);
    if (today - inputDate > 0) {
      return "Pending";
    } else if (today - inputDate < 0) {
      return "Future"
    } else {
      return "On Going"
    }
  }

  const colorMake = (curData) => {
    const cur = dateMake(curData);
    if (cur === "Pending") {
      return { backgroundColor: "rgb(125, 0, 0)" };
    } else if (cur === "On Going") {
      return { backgroundColor: "#4caf50" }
    } else {
      return { backgroundColor: "#242424" }
    }
  }

  return (
    <>

      {isAddNotesClicked || isAddLinksClicked || reviewNotes || reviewLinks || modify || isCheckOpened ||
        <div className="tasks-page">
          <div className='buttons-both'>
            <button className='btn btn-success check' onClick={() => {
              orderComplete(completed);
              setIsCheckOpened(true);
              completed == null || completed.length === 0 ? setIsNoDataC(true) : setIsNoDataC(false);
            }
            }>Check Completed Tasks →</button>
            <Link to="/add-data" className="btn btn-info">+ Add Data</Link>
          </div>

          <div className="header">
            <div className="status">Status</div>
            <div className="task">Tasks</div>
            <div className='notes'>Notes</div>
            <div className='links'>Links</div>
            <div className='actions'>Actions</div>
          </div>
          <div className="clear-me-me" style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', marginTop: "15px" }}>
            <button className="btn btn-danger" onClick={() => {
              setData([]);
              localStorage.setItem('data', JSON.stringify([]));
              setIsNoData(true);
            }}>Clear</button>
          </div>
          {
            isNoData && <NoDataAvai />
          }
          {
            data && data.map((curData) => {
              return <div className="tasks" key={curData.id}>
                <div className='top-part'>
                  <div className='deadline'>{curData.id + 1}. DeadLine : {curData.deadline}</div>
                  <div className='on-top' style={colorMake(curData)}>{
                    dateMake(curData)
                  }</div>
                </div>

                <div className='tasks-details' style={colorMake(curData)}>
                  <div className='status-data'>
                    <button className="btn btn-danger" onClick={() => handleComplete(curData)} title="Click to add in Completed List">Complete</button>
                  </div>
                  <div className='task-data'>
                    {curData.task}
                  </div>
                  <div className="notes-data">
                    <button className='add-notes btn btn-info' onClick={() => handleAddNotes(curData)}>+ Add/Edit Notes</button>
                    <button className='show-notes btn btn-info' onClick={() => handleReviewNotes(curData)}>Review Notes</button>
                  </div>
                  <div className="links-data">
                    <button className='add-links btn btn-info' onClick={() => handleAddLinks(curData)}>+ Add/Edit Links</button>
                    <button className='show-links btn btn-info' onClick={() => handleReviewLinks(curData)}>Review Links</button>
                  </div>
                  <div className='actions-data'>
                    <button className='delete btn btn-danger' onClick={() => handleDelete(curData)}>
                      <i className="fa-solid fa-trash"></i>
                      <p>Delete</p>
                    </button>
                    <button className='modify btn btn-success' onClick={() => handleModify(curData)}>
                      <i className="fa-solid fa-pen"></i>
                      <p>Modify</p>
                    </button>
                  </div>
                </div>
              </div>
            })
          }

        </div>
      }
      {isAddNotesClicked &&
        <div className={`show-notes-page ${isAddNotesClicked ? 'visible' : ''}`}>
          <div className='close-and-title-notes'>
            <div className="title-notes"><span>Task:</span>  {currentData.task}</div>
            <div className='close-notes' onClick={() => { setIsAddNotesClicked(false); localStorage.setItem('isAddNotesClicked', JSON.stringify(false)); }}><i className="fa-solid fa-xmark"></i></div>
          </div>
          <div className="notes-deadline-notes">DeadLine: {currentData.deadline}</div>
          <div className='notes-details-notes'>
            <h4>Notes</h4>
            <div className='notes-breif-notes'>
              <TextareaAutosize
                minRows={5}
                maxRows={100000}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="auto-textarea"
              />
            </div>
          </div>
          <div className='save-and-cancel-notes'>
            <button className='btn btn-secondary cancel-notes' onClick={() => { setIsAddNotesClicked(false); localStorage.setItem('isAddNotesClicked', JSON.stringify(false)); }}>Cancel</button>
            <button className='btn btn-success save-notes' onClick={handleSaveNotes}>Save</button>
          </div>
        </div>
      }
      {isAddLinksClicked &&
        <div className={`show-notes-page ${isAddLinksClicked ? 'visible' : ''}`}>
          <div className='close-and-title-notes'>
            <div className="title-links"><span>Task:</span>  {currentData.task}</div>
            <div className='close-links' onClick={() => { setIsAddLinksClicked(false); localStorage.setItem('isAddLinksClicked', JSON.stringify(false)); }}><i className="fa-solid fa-xmark"></i></div>
          </div>
          <div className="links-deadline-links">DeadLine: {currentData.deadline}</div>
          <div className='links-details-links'>
            <h4>Links</h4>
            <div className='links-breif-links'>
              <div className='links-dropdown'>
                <input type="text" onChange={(e) => setLinksText(e.target.value)} className='text-links' />
                <button className='links-button btn btn-info' onClick={handleLinksAdd}>+Add</button>
              </div>
              {links && links.map((link, index) => {
                return <AddLinks key={index} link={link} setLinks={setLinks} links={links} />
              })}
            </div>
          </div>
          <div className='save-and-cancel-links'>
            <button className='btn btn-secondary cancel-links' onClick={() => { setIsAddLinksClicked(false); localStorage.setItem('isAddLinksClicked', JSON.stringify(false)); }}>Cancel</button>
            <button className='btn btn-success save-links' onClick={handleSaveLinks}>Save</button>
          </div>
        </div>
      }
      {reviewNotes &&
        <div className={`review-notes ${reviewNotes ? 'visible' : ''}`}>
          <div className='cross-mark' onClick={() => { setReviewNotes(false); localStorage.setItem('reviewNotes', JSON.stringify(false)); }}>
            <p>Notes</p>
            <i className="fa-solid fa-xmark x">
            </i>
          </div>
          <div>{currentData.notes}</div>
          <button className='btn btn-info' onClick={() => { setReviewNotes(false); localStorage.setItem('reviewNotes', JSON.stringify(false)); handleAddNotes(currentData); }}>Edit</button>
        </div>
      }
      {reviewLinks &&
        <div className={`review-links ${reviewLinks ? 'visible' : ''}`}>
          <div className='cross-mark' onClick={() => { setReviewLinks(false); localStorage.setItem('reviewLinks', JSON.stringify(false)); }}>
            <p>Links</p>
            <i className="fa-solid fa-xmark x">
            </i>
          </div>
          {
            currentData.links.map((a, index) => {
              return <div key={index + "viswa"}>
                <a href={a} target="_blank" >{index + 1}.Website: {a}</a>
              </div>

            })
          }
          <button className='btn btn-info' onClick={() => { setReviewLinks(false); localStorage.setItem('reviewLinks', JSON.stringify(false)); handleAddLinks(currentData) }}>Edit</button>
        </div>
      }

      {modify &&
        <div className='modify-show'>
          <div className='cross-mark' onClick={() => {
            setModify(false);
            localStorage.setItem('modify', JSON.stringify(false));
          }}>
            <p>Modify Data</p>
            <i className="fa-solid fa-xmark x">
            </i>
          </div>
          <div className='deadline-modify'>
            <label>DeadLine:</label>
            <input type='text' name='deadline' value={dataModify.deadline} className='input-modify' onChange={(e) => {
              const newData = {
                ...dataModify,
                [e.target.name]: e.target.value
              }
              setDataModify(newData);
              localStorage.setItem('dataModify', JSON.stringify(newData));
            }} />
          </div>
          <div className='tasks-modify'>
            <label>Task: </label>
            <TextareaAutosize
              minRows={5}
              maxRows={100000}
              value={dataModify.tasks}
              name='tasks'
              onChange={(e) => {
                const newData = {
                  ...dataModify,
                  [e.target.name]: e.target.value
                }
                setDataModify(newData);
                localStorage.setItem('dataModify', JSON.stringify(newData));
              }}
              className="auto-textarea1"
            />
          </div>

          <div className='buttons'>
            <button className='btn btn-secondary' onClick={() => {
              setModify(false);
              localStorage.setItem('modify', JSON.stringify(false));
            }}>Cancel</button>
            <button className='btn btn-success' onClick={handleSaveModify}>Save</button>
          </div>
        </div>
      }
      {isCheckOpened &&
        <div className='check-completed'>
          <button className='btn btn-info' onClick={() => {
            setIsCheckOpened(false);
          }}>Back To Tasks</button>
          {
            isNoDataC && <NoDataAvai />
          }
          {
            completed && completed.map((curData) => {
              return <div className='check-div' key={curData.id}>
                <div className='status-completed'>{curData.id + 1}. Completed on : {(new Date).toLocaleDateString()}</div>
                <div className='tasks-completed'>Task: {curData.task}</div>
                <div className='notes-completed'>Notes : {curData.notes}</div>
                <div className='links-completed'>
                  <div>Links: </div>
                  {
                    curData.links.map((a, index) => {
                      return <div key={index}>
                        <a href={a} target="_blank">Link:{index + 1} {a}</a>
                      </div>
                    })
                  }
                </div>
                <button className='push-back btn btn-info' onClick={() => handlePushBack(curData)}>Push Back to Tasks</button>
              </div>
            })
          }
        </div>

      }
    </>
  );
}