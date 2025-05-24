import '../styles/NoDataAvai.css';

export default function NoDataAvai() {
  return (
    <div className="no-data-wrapper">
      <div className="no-data-box">
        <div className="no-data-icon">📦</div>
        <p className="no-data-message">No data available</p>
        <p className="no-data-subtext">Try again later or Add the Data.</p>
      </div>
    </div>
  );
}
