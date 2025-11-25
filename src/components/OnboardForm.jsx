import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { saveOfflineRecord } from "../utils/offline";
import MapCapture from "./MapCapture";
import "./OnboardForm.css";

export default function OnboardForm({ onSaved }) {
  const { register, handleSubmit, reset } = useForm();

  const [points, setPoints] = useState([]);
  const [area, setArea] = useState(0);
  const [file, setFile] = useState(null);
  const [polygonSaved, setPolygonSaved] = useState(false);

  const onSubmit = async (data) => {
    if (!polygonSaved) {
      alert("Please save boundary polygon first!");
      return;
    }

    const record = {
      id: uuidv4(),
      ...data,
      num_trees: Number(data.num_trees || 0),
      boundary_points: points,
      area_sq_m: area,
      area_hectare: area / 10000,
      created_at: new Date().toISOString(),
      status: "pending",
      attachments: file
        ? [
            {
              id: uuidv4(),
              filename: file.name,
              mime: file.type,
              blob: file,
            },
          ]
        : [],
    };

    await saveOfflineRecord(record);

    reset();
    setPoints([]);
    setArea(0);
    setPolygonSaved(false);
    setFile(null);

    if (onSaved) onSaved();
    alert("Saved locally!");
  };

  return (
    <div className="form-wrapper">
      <h2 className="title">🌾 Farmer Onboarding</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label>Farmer Name</label>
          <input {...register("name", { required: true })} />
        </div>

        <div className="field">
          <label>Phone</label>
          <input {...register("phone")} />
        </div>

        <div className="field">
          <label>Species</label>
          <select {...register("species")}>
            <option value="mango">Mango</option>
            <option value="teak">Teak</option>
            <option value="acacia">Acacia</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="field">
          <label>No. of Trees</label>
          <input type="number" {...register("num_trees")} />
        </div>

        {/* MAP AREA */}
        <MapCapture
          points={points}
          setPoints={setPoints}
          area={area}
          setArea={setArea}
          polygonSaved={polygonSaved}
          setPolygonSaved={setPolygonSaved}
        />

        <div className="field">
          <label>Attachment (optional)</label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button type="submit" className="submit-btn" disabled={!polygonSaved}>
          💾 Save Locally
        </button>

        <button
          type="button"
          className="reset-btn"
          onClick={() => {
            reset();
            setPoints([]);
            setArea(0);
            setPolygonSaved(false);
            setFile(null);
          }}
        >
          Reset All
        </button>
      </form>
    </div>
  );
}
