import React from "react";
import "./Help.css";

export default function Help() {
  return (
    <div className="help-wrapper">
      <h2 className="help-title">📘 Help & Guide</h2>

      <section className="help-section">
        <h3>🌾 Farmer Onboarding Form</h3>
        <p>
          इस फॉर्म का इस्तेमाल किसान की बेसिक जानकारी और खेत की boundary कैप्चर
          करने के लिए किया जाता है। आपको बस farmer का नाम, फोन, species, और
          number of trees डालना है।
        </p>
      </section>

      <section className="help-section">
        <h3>🗺️ How Boundary Capture Works</h3>
        <ul>
          <li>
            <strong>📍 Capture Point:</strong> इस बटन को दबाकर आप अपनी live GPS
            location को एक polygon point के रूप में add कर सकते हैं।
          </li>
          <li>
            <strong>Breadcrumb Line:</strong> जैसे ही 2 points add हो जाते हैं, एक
            dotted orange line show होती है।
          </li>
          <li>
            <strong>Polygon:</strong> 3 या अधिक points होने पर हरा polygon बनता
            है और area ऑटोमेटिक calculate होता है।
          </li>
          <li>
            <strong>Max 50 points limit:</strong> boundary के लिए 50 से अधिक
            points add नहीं कर सकते।
          </li>
        </ul>
      </section>

      <section className="help-section">
        <h3>💾 Save Polygon</h3>
        <p>
          जब minimum 3 points हो जाते हैं तब ही polygon save किया जा सकता है।
          Save करने के बाद ही आपका form submit होगा।
        </p>
      </section>

      <section className="help-section">
        <h3>🔁 Reset Polygon</h3>
        <p>
          इस बटन से पूरा polygon, points और area reset हो जाएगा। आप नए points
          capture कर सकते हैं।
        </p>
      </section>

      <section className="help-section">
        <h3>📄 Attachments</h3>
        <p>
          आप photo या PDF attachment भी upload कर सकते हैं। यह optional है।
        </p>
      </section>

      <section className="help-section">
        <h3>💾 Save Locally</h3>
        <p>
          Form + Boundary + Attachment आपका device में offline सुरक्षित हो जाता
          है। बाद में internet आने पर sync किया जाएगा।
        </p>
      </section>

      <section className="help-section">
        <h3>⚠️ Important Notes</h3>
        <ul>
          <li>GPS ऑन रखें और हाई accuracy mode enable करें।</li>
          <li>Polygon save किए बैगर form submit नहीं होगा।</li>
          <li>Boundary area hectare में calculate होता है।</li>
        </ul>
      </section>

      <footer className="help-footer">
        ✨ Need more help? Contact support anytime.
      </footer>
    </div>
  );
}
