import Me from '../images/me.png';
import '../styles/About.css'
export default function About() {
  return (
    <>
      <div className="about-in-about">
        <div className="about-me">
          <div className='top'>
            📌 About me
          </div>
          <div className="intro">
            <div className="info-card">
              <h2 className="greeting">Hi 👋,</h2>
              <h1 className="name">I'm <span>Enjeti Viswa Vardhan Chary</span></h1>
              <p className="title">A MERN Stack Developer 🚀</p>
              <p className="college">Studying at <strong>CVR College of Engineering</strong> 🎓</p>
              <a
                href="https://www.linkedin.com/in/viswa-vardhan-chary/"
                target="_blank"
                rel="noopener noreferrer"
                className="a-link"
              >
                <span className="link-icon">🔗</span> More About Me on LinkedIn
              </a>
            </div>
            <div className="img">
              <img src={Me} alt="My image" className="image-me" />
            </div>
          </div>
        </div>
        <div className="about-site">
          <div className="site">
            <div className="top2">📌 About Make Me</div>

            <div className="site-intro">
              <h3>🚀 Welcome to <span className="brand">Make Me</span></h3>
              <p>
                <strong>Make Me</strong> is not just another to-do app - it's your personal productivity companion. Designed with a smooth and modern UI, it empowers you to:
              </p>
              <ul>
                <li>📝 Add daily tasks manually or through <strong>MyAi</strong></li>
                <li>📂 Upload task lists using <code>.csv</code> files</li>
                <li>📅 Auto-organize tasks into <em>Upcoming</em>, <em>Ongoing</em>, and <em>Pending</em> sections by date</li>
                <li>🤖 Generate complete study or career roadmaps using AI prompts (e.g., DSA, Web Development, Content Creation)</li>
                <li>⬇️ personalized task plans as CSV format</li>
              </ul>

              <p>
                <span className="highlight">✨ Just bookmark Make Me and stay organized - one step at a time.</span><br />
                Together, let's make your goals happen!
              </p>

              <hr className="divider" />

              <h3>👨‍💻 Developer Info</h3>
              <p>
                This project was built by Me(<strong>Viswa Vardhan Chary</strong>), student developer from CVR College of Engineering.
              </p>

              <p>
                <strong>Disclaimer:</strong> I do not own or claim any copyrighted third-party content (if any) on this site. If you are a content owner and believe your rights have been infringed, please feel free to reach out.
              </p>

              <p>
                📩 Contact: <a href="mailto:viswaMakeMe@gmail.com" className="mail-link">viswaMakeMe@gmail.com</a>
              </p>

              <p className="thanks">🙏 Thank you for visiting and supporting student projects!</p>
            </div>
          </div>


        </div>
      </div>

    </>
  );
}