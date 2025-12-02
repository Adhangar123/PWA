// onboardApi.jsx
export async function saveOnboardData(formData) {
  try {
    const res = await fetch("https://backend-data-suvey-1.onrender.com/api/submit", {
      method: "POST",
      body: formData,  // IMPORTANT: Do NOT set headers manually
    });

    if (!res.ok) {
      throw new Error("API Error: " + res.status);
    }

    return await res.json();
  } catch (error) {
    console.error("Save API Error:", error);
    throw error;
  }
}
