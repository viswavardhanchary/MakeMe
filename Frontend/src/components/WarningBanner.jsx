import '../styles/WarningBanner.css';

const WarningBanner = () => {
  return (
    <div className='warning'>
      <div className="custom-warning-banner red-theme">
        <div className="custom-warning-icon">⚠️</div>
        <div className="custom-warning-text">
          This app is running on a <strong>free Render plan</strong>. Response times may be delayed by a few seconds.
          <br />
          <em>Thanks for your patience!</em>
          If Response it to delay try to reload the page.
        </div>
      </div>
    </div>

  );
};

export default WarningBanner;
