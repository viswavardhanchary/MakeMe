import { Link } from "react-router-dom";
import '../styles/Generate.css';
import '../styles/Layout.css'
import { useEffect, useState } from "react";
import { getData } from '../apis/aiData';
import { Bounce, toast } from "react-toastify";
import NoDataAvai from "./NoDataAvai";
export default function Generate() {
  const [aiText, setAiText] = useState('');
  const [aiData, setAiData] = useState([]);
  const [userInterface, setUserInterface] = useState(JSON.parse(localStorage.getItem('userInterface')) || []);
  const [isLoading, setIsLoading] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [aiDate, setAiDate] = useState(JSON.parse(localStorage.getItem('aiDate')) || (new Date().toLocaleDateString()));
  const [isNoData , setIsNoData] = useState((userInterface === null || userInterface.length == 0)?true:false);

  useEffect(() => {
    const todayDateDate = new Date().toLocaleDateString();
    const aiTodayDate = JSON.parse(localStorage.getItem('aiDate'))

    if (aiTodayDate < todayDateDate) {
      setAiDate(todayDateDate);
      localStorage.setItem('aiDate', JSON.stringify(todayDateDate));
      setUserInterface([]);
      localStorage.setItem('userInterface', JSON.stringify([]));
      setIsNoData(true);
    }

  }, []);

  const handleGetData = async () => {
    if(aiText.trim().length == 0) {
      alert("Please Enter the Prompt");
      return ;
    }
    setAiText("")
    setIsLoading(true)
    const data = await getData(aiText);
    setIsNoData(false);
    if (data === null) {
      setIsLoading(false);
      return;
    }
    setAiText('');
    setAiData(data);
    localStorage.setItem('aiData', JSON.stringify(data));
    const fullData = [
      ...userInterface,
      {
        userInput: aiText,
        aiOutput: data
      }
    ]
    setIsLoading(false);
    setUserInterface(fullData);
    localStorage.setItem('userInterface', JSON.stringify(fullData));
  }
  const handleCurrent = (curDD) => {
    let mix = [...curDD.data];
    mix.sort((a, b) => new Date(a.split(',')[0]) - new Date(b.split(',')[0]));
    const oldData = JSON.parse(localStorage.getItem('data'))
    if (oldData === null || oldData.length === 0) {
      mix = [...mix.map((cur5, index) => {
        return {
          id: index,
          deadline: cur5.split(',')[0].trim(),
          task: cur5.split(',').splice(1).join(' '),
          notes: "",
          links: [],
        }
      })]
    } else {
      mix = [
        ...oldData,
        ...mix.map((cur5, index) => {
          return {
            id: index + oldData.length,
            deadline: cur5.split(',')[0].trim(),
            task: cur5.split(',').splice(1).join(' '),
            notes: "",
            links: [],
          }
        })
      ]
    }
    mix.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    const updatedNewData = mix.map((cur, index) => {
      return {
        id: index,
        deadline: cur.deadline,
        task: cur.task,
        notes: cur.notes,
        links: [...cur.links],
      }
    });
    localStorage.setItem('data' , JSON.stringify(updatedNewData));
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
  }

  return (
    <>
      <div className="generate">
        <div className="top-layers">
          <Link to="/" className="btn btn-info x25" style={{ width: "max-content" }}>Go Back</Link>
          <div className="btn btn-info x26" style={{ width: "max-content" }} onClick={() => {
            setPopUp(true);
            document.body.style.overflow = 'hidden';
          }}>
            Get Prompt To try in Other Ai models
          </div>
        </div>

        <div className="container5">
          <div className="two-sides">
            <div className="left-side-drag">
              <div className="output-section">
                <div className="clear-me-me" style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                  <button className="btn btn-danger" onClick={() => {
                    setUserInterface([]);
                    localStorage.setItem('userInterface', JSON.stringify([]));
                    setIsNoData(true);
                  }}>Clear</button>
                </div>
                {!isLoading && [...userInterface].reverse().map((cur, index) => (
                  <div className="result-block" key={index}>
                    <div className="user-section aligned-right">
                      <span className="section-label right-label">👤 User Input:</span>
                      <div className="user-message right-message">
                        <i className="fa-solid fa-copy" style={{ fontSize: "1.3rem", cursor: "pointer" }} onClick={() => {
                          navigator.clipboard.writeText(cur.userInput);
                          toast.success('Copied To ClipBoard', {
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
                        }} title="Click to Copy"></i>
                        <p style={{ margin: 0, padding: 0 }}>{cur.userInput}</p>
                      </div>
                    </div>
                    <div className="ai-section aligned-left">
                      <span className="section-label">🤖 MyAi:</span>
                      <pre className="ai-message" contentEditable={false}>
                        <button className="btn btn-success" onClick={() => handleCurrent(cur.aiOutput)}>Upload</button><br /><br />
                        <i className="fa-solid fa-copy" style={{ fontSize: "1.3rem", cursor: "pointer" }} onClick={() => {
                          navigator.clipboard.writeText(cur.aiOutput?.data.join('\n'));
                          toast.success('Copied To ClipBoard', {
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
                        }} title="Click to Copy"></i>

                        <p style={{ margin: 0, padding: 0 }}>{cur.aiOutput?.data.join('\n')}</p>
                      </pre>
                    </div>
                  </div>
                ))}
                {
                  isLoading &&
                  <img src="/Spinner.gif" alt="Loading" width="60px" />
                }
                {
                  isNoData && <NoDataAvai />
                }
              </div>
            </div>
            <div className="right-side-drag">
              <div className="input-section">
                <label htmlFor="user-prompt" className="input-label">Enter the Prompt</label>
                <textarea
                  id="user-prompt"
                  className="input-text-input"
                  placeholder="Type something..." rows="5"
                  value ={aiText}
                  onChange={(e) => setAiText(e.target.value)}
                ></textarea>
                <button className="submit-button" onClick={handleGetData}>
                  <i className="fa-solid fa-upload"></i> Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        popUp &&
        <div className='total-pop-up2'>
          <div className="pop-up2">
            <div className="cross-mark-up" onClick={() => {
              setPopUp(false);
              document.body.style.overflow = 'auto';
            }}>
              <p className="popup-title">Prompt For Ai Models</p>
              <i className="fa-solid fa-xmark close-icon"></i>
            </div>
            <span style={{ marginTop: "10px" }} className="span-me">
              Replace Highlighted areas</span>
            <code style={{ marginTop: "10px" }} className="code-me">
              <i className="fa-solid fa-copy" style={{ fontSize: "1.3rem", cursor: "pointer" }} onClick={() => {
                navigator.clipboard.writeText("Generate a [Replace with No of weeks]-week daily roadmap for learning [Replace wiht ur topic]starting from [Replace Starting Date]. The output should be in CSV format with exactly two fields per line: date and task, where date is in yyyy-mm-dd format. Do not include any header line. Each line represents one day's task. Output all lines as a single string separated by double asterisks ** instead of newlines. For example: 2025-06-12,Learn arrays and their operations**2025-06-13,Study linked lists and implementation. Provide the entire CSV content without extra text or explanations,Donot include comma's in the task.");
                toast.success('Copied To ClipBoard', {
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
              }} title="Click to Copy"></i><br />
              Generate a <span className="span-me">[Replace with No of weeks]</span>-week daily roadmap for learning <span className="span-me">[Replace wiht ur topic]</span> starting from <span className="span-me">[Replace Starting Date]</span>. The output should be in CSV format with exactly two fields per line: date and task, where date is in yyyy-mm-dd format. Do not include any header line. Each line represents one day's task. Output all lines as a single string separated by double asterisks ** instead of newlines. For example: 2025-06-12,Learn arrays and their operations**2025-06-13,Study linked lists and implementation. Provide the entire CSV content without extra text or explanations,Donot include comma's in the task.
            </code>
          </div>
        </div>
      }
    </>
  )
}
