"use server";

export async function classifyDogBreed(formData: FormData) {
  const file = formData.get("image") as File;
  if (!file) return { error: "No image uploaded" };

  try {
    const apiUrl = process.env.LOCAL_MODEL_URL || "http://localhost:8000/predict";

    const f = new FormData();
    f.append("image", file);

    const response = await fetch(apiUrl, {
      method: "POST",
      body: f,
    });

    if (!response.ok) {
      const txt = await response.text();
      return { error: `Local model error: ${txt}` };
    }

    const result = await response.json();

    const breedLabel = result.label
      .split("_")
      .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    const description = `Cette image semble être un ${breedLabel} à ${(result.score * 100).toFixed(1)}%`;

    return { label: breedLabel, score: result.score, description, top5: result.top5 };
  } catch (e) {
    console.error(e);
    return { error: "Failed to classify breed (local)" };
  }
}
