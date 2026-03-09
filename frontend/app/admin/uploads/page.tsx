"use client";

import { useState } from "react";

export default function UploadsPage() {

  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpload = async () => {

    if (!image) {
      setError("Please select an image to upload");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await fetch("http://localhost:5000/api/uploads", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      setSuccess("Image uploaded successfully!");
      setImage(null);
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (err) {
      setError("Failed to upload image. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        Upload Site Update
      </h1>

      <div className="max-w-md space-y-4">

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-600 p-3 rounded">
            {success}
          </div>
        )}

        <div>
          <label className="block mb-2 font-medium">Select Image</label>
          <input
            type="file"
            accept="image/*"
            className="border p-2 w-full rounded"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={loading || !image}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 w-full"
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>

      </div>

    </div>
  );
}