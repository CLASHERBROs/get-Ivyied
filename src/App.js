import React, { useState } from 'react';
import './App.css';

// Ivy League School data with competitiveness weightage
const ivyLeagueSchools = {
  "Harvard University": 30,
  "Princeton University": 25,
  "Yale University": 25,
  "Columbia University": 20,
  "University of Pennsylvania": 20,
  "Dartmouth College": 15,
  "Brown University": 15,
  "Cornell University": 15
};

// Random quirky messages for different chance ranges
const messages = {
  low: [
    "Oof, looks like your chances are a bit low... Maybe try a community college first? 😉",
    "Well, at least you're not alone... a lot of people feel the same way. Keep trying though!",
    "Yikes! Looks like you need a miracle. Just kidding, you’ve got this!",
    "Not quite there yet, but keep pushing... maybe try applying to a few less selective schools?",
    "Looks like your chances are in the 'Oof' zone. But hey, persistence is key!"
  ],
  medium: [
    "You’ve got some chances! Maybe a little more hustle? Keep pushing! 💪",
    "You're almost there, just a little more to go. Don't lose hope!",
    "Not bad! You're on the right track, just gotta keep up the effort.",
    "Some solid chances ahead! With a little more polish, you can do it!",
    "Your chances are in the 'meh' zone. Time to hustle harder!"
  ],
  high: [
    "You’re basically a future Ivy League legend! 😎 Go for it!",
    "Look at you go! Just one step away from Ivy League greatness.",
    "Top-tier future in the making! Keep this up, and you'll be writing your acceptance letter soon.",
    "You’re in a strong spot! Go ahead and apply, the Ivy League is calling!",
    "Chances are high, my friend! Looks like you’re almost a lock for this."
  ]
};

function App() {
  const [gpa, setGpa] = useState('');
  const [gpaInternational, setGpaInternational] = useState('');
  const [satScore, setSatScore] = useState('');
  const [actScore, setActScore] = useState('');
  const [greScore, setGreScore] = useState('');
  const [gmatscore, setGmatScore] = useState('');
  const [extracurriculars, setExtracurriculars] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [result, setResult] = useState(null);
  const [resultMessage, setResultMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [showFooterLink, setShowFooterLink] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // GPA conversion (10-point to 4.0 scale)
    let convertedGpa = gpa;
    if (gpaInternational) {
      convertedGpa = (parseFloat(gpaInternational) * 4) / 10;
    }

    let chance = 0;

    // GPA weighting (scale: 4.0)
    if (convertedGpa >= 3.8) chance += 40;
    else if (convertedGpa >= 3.5) chance += 30;
    else if (convertedGpa >= 3.0) chance += 20;

    // SAT/ACT score weighting for Bachelor's (only apply if Bachelor's)
    if (satScore >= 1500) chance += 30;
    else if (satScore >= 1300) chance += 20;

    if (actScore >= 33) chance += 30;
    else if (actScore >= 28) chance += 20;

    // GRE/GMAT score weighting for Master's (only apply if Master's)
    if (greScore >= 320) chance += 30;
    else if (greScore >= 300) chance += 20;

    if (gmatscore >= 700) chance += 30;
    else if (gmatscore >= 650) chance += 20;

    // Extracurriculars
    if (extracurriculars >= 5) chance += 20;
    else if (extracurriculars >= 3) chance += 15;

    // Adjust chances based on selected Ivy League School
    if (ivyLeagueSchools[selectedSchool]) {
      chance += ivyLeagueSchools[selectedSchool];
    }

    // Calculate the final admission chance percentage
    const admissionChance = Math.min(chance, 100);

    // Set the message based on chance
    let randomMessage;
    if (admissionChance < 40) {
      randomMessage = messages.low[Math.floor(Math.random() * messages.low.length)];
      setImageUrl("https://www.kindpng.com/picc/m/81-812989_oof-sound-effect-image-png-transparent-png.png"); // Low chance image
    } else if (admissionChance < 70) {
      randomMessage = messages.medium[Math.floor(Math.random() * messages.medium.length)];
      setImageUrl("https://media.giphy.com/media/hWDo6x1chJb1y/giphy.gif"); // Medium chance image
    } else {
      randomMessage = messages.high[Math.floor(Math.random() * messages.high.length)];
      setImageUrl("https://media.giphy.com/media/3o6MbnF4qsCai28Qmu/giphy.gif"); // High chance image
    }

    // Display result
    setResult(`Your chances of getting into ${selectedSchool}: ${admissionChance}%`);
    setResultMessage(randomMessage);
    setShowPopup(true);
  };

  const closePopup = () => setShowPopup(false);

  const toggleFooterVisibility = () => {
    setIsFooterVisible(!isFooterVisible);
  };

  const showFooterHandler = () => {
    setShowFooterLink(true); // Show footer link
  };

  return (
    <div className="App">
      <h1 className="title">Can you get Ivyied?</h1>
      <form onSubmit={handleSubmit}>
        {/* Select Ivy League School */}
        <div className="form-group">
          <label>Select Ivy League School: </label>
          <select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
          >
            <option value="">Select a School</option>
            {Object.keys(ivyLeagueSchools).map((school) => (
              <option key={school} value={school}>{school}</option>
            ))}
          </select>
        </div>

        {/* GPA (US 4.0 scale) */}
        <div className="form-group">
  <label>GPA (4.0 scale): </label>
  <input
    type="number"
    value={gpa}
    onChange={(e) => setGpa(e.target.value)}
    step="0.01"   
    max="4.0"
    min="0.0"
  />
</div>

{/* GPA (International 10-point scale) */}
<div className="form-group">
  <label>GPA (International 10-point scale): </label>
  <input
    type="number"
    value={gpaInternational}
    onChange={(e) => setGpaInternational(e.target.value)}
    step="0.01"   
    max="10.0"
    min="0.0"
  />
</div>

        {/* SAT and ACT Scores (for Bachelor's) */}
        <div className="form-group">
          <label>SAT Score (if applicable): </label>
          <input
            type="number"
            value={satScore}
            onChange={(e) => setSatScore(e.target.value)}
            max="1600"
            min="400"
          />
        </div>
        <div className="form-group">
          <label>ACT Score (if applicable): </label>
          <input
            type="number"
            value={actScore}
            onChange={(e) => setActScore(e.target.value)}
            max="36"
            min="1"
          />
        </div>

        {/* GRE and GMAT Scores (for Master's) */}
        <div className="form-group">
          <label>GRE Score (if applicable): </label>
          <input
            type="number"
            value={greScore}
            onChange={(e) => setGreScore(e.target.value)}
            max="340"
            min="260"
          />
        </div>
        <div className="form-group">
          <label>GMAT Score (if applicable): </label>
          <input
            type="number"
            value={gmatscore}
            onChange={(e) => setGmatScore(e.target.value)}
            max="800"
            min="200"
          />
        </div>

        {/* Extracurricular Activities */}
        <div className="form-group">
          <label>Number of Extracurricular Activities: </label>
          <input
            type="number"
            value={extracurriculars}
            onChange={(e) => setExtracurriculars(e.target.value)}
            min="0"
          />
        </div>

        <button type="submit" className="submit-btn">Calculate Chances</button>
      </form>

      {result && <p className="result">{result}</p>}
      {resultMessage && <p className="result-message">{resultMessage}</p>}

      {/* Footer */}
      <footer>
        <p className="footer-link" onClick={toggleFooterVisibility}>
          How is it calculated?
        </p>
        {isFooterVisible && (
          <div className="footer-content">
            <p>We referenced general sources such as <a href="https://www.collegeconfidential.com" target="_blank" rel="noopener noreferrer">College Confidential</a> for the data, but please note this is only a rough estimation. It's always a good idea to research further and consult with an admissions advisor for a more accurate picture.</p>
          </div>
        )}
      </footer>

      {showPopup && (
        <div className="result-popup">
          <div className="popup-content">
            <p className="result-message-popup">{resultMessage}</p>
            <img className="result-image" src={imageUrl} alt="Chance outcome" />
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
