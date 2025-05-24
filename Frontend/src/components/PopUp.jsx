import '../styles/Home.css';
export default function PopUp({setPopUp}) {
  return (
    <>
    <div className='total-pop-up'>

        <div className="pop-up">
          <div className="cross-mark-up" onClick={() => {
            setPopUp(false);
            document.body.style.overflow = 'auto'; // Restore scroll
          }}>
            <p className="popup-title">📄 CSV File Upload Rules</p>
            <i className="fa-solid fa-xmark close-icon"></i>
          </div>
          <ul className="rules-list">
            <li>🚫 Do not include headings — only date and task separated by a comma (<code>,</code>).</li>
            <li>📅 Date format should be <strong>YYYY-MM-DD</strong> (e.g., 2025-07-12).</li>
            <li>📌 Each task entry must be on a new line.</li>
            <li>📝 Example format:</li>
            <li className="example">
              <code>
                2025-6-12,learn C language<br />
                2025-05-13,learn AI/ML
              </code>
            </li>
            <li>⚠️ Avoid extra empty lines for better experience.</li>
          </ul>
        </div>

      </div>
    
    </>
  )
}