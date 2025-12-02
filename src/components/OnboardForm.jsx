import React, { useState } from "react";
import { useForm } from "react-hook-form";
import MapCapture from "./MapCapture";
import "./OnboardForm.css";

export default function OnboardForm() {
  const { register, getValues } = useForm();

  const [points, setPoints] = useState([]);
  const [area, setArea] = useState(0);
  const [polygonSaved, setPolygonSaved] = useState(false);

  // FILES
  const [photo, setPhoto] = useState(null);
  const [agreement, setAgreement] = useState(null);
  const [aadharCard, setAadharCard] = useState(null);

  // ------------------------------------------------------
  // FINAL SUBMIT (curl ke exact field names)
  // ------------------------------------------------------
  const finalSubmit = async () => {
    const f = getValues();
    const formData = new FormData();

    // TEXT FIELDS (curl ke same name)
    formData.append("farmerName", f.farmerName || "");
    formData.append("fatherName", f.fatherName || "");
    formData.append("contact", f.contact || "");
    formData.append("age", f.age || "");
    formData.append("gender", f.gender || "");
    formData.append("state", f.state || "");
    formData.append("district", f.district || "");
    formData.append("village", f.village || "");
    formData.append("landArea", f.landArea || "");
    formData.append("surveyNumber", f.surveyNumber || "");
    formData.append("cropType", f.cropType || "");
    formData.append("irrigationSource", f.irrigationSource || "");
    formData.append("notes", f.notes || "");

    // FILES (curl: photo, aadharCard, agreement)
    if (photo) formData.append("photo", photo);
    if (aadharCard) formData.append("aadharCard", aadharCard);
    if (agreement) formData.append("agreement", agreement);

    // GPS POINTS (curl: latitude[] & longitude[])
    points.forEach((p) => {
      formData.append("latitude[]", p.lat);
      formData.append("longitude[]", p.lng);
    });

    try {
      const res = await fetch("https://new-survey-zh0e.onrender.com/api/submit", {
        method: "POST",
        body: formData,
      });

      const responseText = await res.text();
      console.log("SERVER:", responseText);

      if (!res.ok) {
        alert("❌ API ERROR: " + res.status);
        return;
      }

      alert("🎉 Data Submitted Successfully!");
    } catch (err) {
      console.error(err);
      alert("Submission Failed.");
    }
  };

  return (
    <div className="form-wrapper">
      <h2 className="title">🌾 Farmer Onboarding</h2>

      {/* ------------------- FARMER INFORMATION ------------------- */}
      <div className="section-box">
        <h3 className="section-title">Farmer Information</h3>

        <div className="fields-grid">
          <div className="field">
            <label>Farmer Name</label>
            <input {...register("farmerName")} />
          </div>

          <div className="field">
            <label>Father Name</label>
            <input {...register("fatherName")} />
          </div>

          <div className="field">
            <label>Contact</label>
            <input {...register("contact")} />
          </div>

          <div className="field">
            <label>Age</label>
            <input type="number" {...register("age")} />
          </div>

          <div className="field">
            <label>Gender</label>
            <select {...register("gender")}>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="field">
            <label>State</label>
            <input {...register("state")} />
          </div>

          <div className="field">
            <label>District</label>
            <input {...register("district")} />
          </div>

          <div className="field">
            <label>Village</label>
            <input {...register("village")} />
          </div>

          <div className="field">
            <label>Land Area</label>
            <input type="number" {...register("landArea")} />
          </div>

          <div className="field">
            <label>Survey Number</label>
            <input {...register("surveyNumber")} />
          </div>

          <div className="field">
            <label>Crop Type</label>
            <input {...register("cropType")} />
          </div>

          <div className="field">
            <label>Irrigation Source</label>
            <input {...register("irrigationSource")} />
          </div>

          <div className="field full-width">
            <label>Notes</label>
            <textarea {...register("notes")} />
          </div>
        </div>
      </div>

      {/* ------------------- UPLOAD DOCUMENTS ------------------- */}
      <div className="section-box">
        <h3 className="section-title">Upload Documents</h3>

        <div className="field">
          <label>Farmer Photo</label>
          <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
        </div>

        <div className="field">
          <label>Aadhar Card</label>
          <input type="file" onChange={(e) => setAadharCard(e.target.files[0])} />
        </div>

        <div className="field">
          <label>Agreement Letter</label>
          <input type="file" onChange={(e) => setAgreement(e.target.files[0])} />
        </div>
      </div>

      {/* ------------------- MAP SECTION ------------------- */}
      <div className="section-box">
        <h3 className="section-title">Capture Boundary</h3>

        <MapCapture
          points={points}
          setPoints={setPoints}
          area={area}
          setArea={setArea}
          polygonSaved={polygonSaved}
          setPolygonSaved={setPolygonSaved}
        />
      </div>

      {/* ------------------- SUBMIT BUTTON ------------------- */}
      <button className="submit-btn" onClick={finalSubmit}>
        ✔ Submit All Data
      </button>
    </div>
  );
}
