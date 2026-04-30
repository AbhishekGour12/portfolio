"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { getDatabase, ref, push, set } from "firebase/database";
import { app } from "./Firebase";

const ProjectUploadForm = () => {
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    technologies: "",
    link: "",
    github: "",
  });
  const [imageUrls, setImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle successful Cloudinary upload
  const handleImageUpload = (result) => {
    if (result.event === "success") {
      const secureUrl = result.info.secure_url;
      setImageUrls((prev) => [...prev, secureUrl]);
      setMessage({ type: "success", text: "Image uploaded successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  // Save entire project to Firebase
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (imageUrls.length === 0) {
      setMessage({ type: "error", text: "Please upload at least one image" });
      return;
    }

    setUploading(true);
    setMessage({ type: "", text: "" });

    try {
      const db = getDatabase(app);
      const projectsRef = ref(db, "projects/");
      const newProjectRef = push(projectsRef);
      
      const projectToSave = {
        id: Date.now(),
        name: projectData.name,
        description: projectData.description,
        technologies: projectData.technologies,
        img: imageUrls,
        link: projectData.link,
        github: projectData.github,
        createdAt: new Date().toISOString(),
      };
      
      await set(newProjectRef, projectToSave);
      
      setMessage({ type: "success", text: "Project saved successfully!" });
      
      // Reset form
      setProjectData({
        name: "",
        description: "",
        technologies: "",
        link: "",
        github: "",
      });
      setImageUrls([]);
      
      // Optional: Refresh project list after 1 second
      setTimeout(() => {
        window.dispatchEvent(new Event("projectAdded"));
      }, 1000);
      
    } catch (error) {
      console.error("Error saving project:", error);
      setMessage({ type: "error", text: "Failed to save project" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-slate-900 rounded-2xl border border-slate-800">
      <h2 className="text-2xl font-bold text-white mb-6">Add New Project</h2>
      
      {/* Upload Widget Section */}
      <div className="mb-6">
        <label className="block text-white font-medium mb-2">Project Images</label>
        <CldUploadWidget
          uploadPreset="project_uploads"
          onSuccess={handleImageUpload}
          options={{
            maxFiles: 10,
            multiple: true,
            folder: "abhi_services_portfolio",
            tags: ["portfolio"],
            clientAllowedFormats: ["images"],
            clientAllowedFormats: ["png", "jpg", "jpeg", "webp"],
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              Upload Images
            </button>
          )}
        </CldUploadWidget>
        
        {/* Image Previews */}
        {imageUrls.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {imageUrls.map((url, idx) => (
              <div key={idx} className="relative w-20 h-20">
                <img
                  src={url}
                  alt={`Preview ${idx}`}
                  className="w-full h-full object-cover rounded-lg border border-slate-700"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white text-sm font-medium mb-1">Project Name *</label>
          <input
            type="text"
            name="name"
            value={projectData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-white text-sm font-medium mb-1">Description *</label>
          <textarea
            name="description"
            value={projectData.description}
            onChange={handleInputChange}
            required
            rows="3"
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-white text-sm font-medium mb-1">Technologies (e.g., React | Node.js | MongoDB)</label>
          <input
            type="text"
            name="technologies"
            value={projectData.technologies}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white text-sm font-medium mb-1">Live Demo URL</label>
            <input
              type="url"
              name="link"
              value={projectData.link}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-1">GitHub URL</label>
            <input
              type="url"
              name="github"
              value={projectData.github}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={uploading}
          className="w-full py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold rounded-lg hover:scale-[1.02] transition active:scale-95 disabled:opacity-50"
        >
          {uploading ? "Saving..." : "Save Project"}
        </button>
      </form>
      
      {message.text && (
        <div className={`mt-4 p-3 rounded-lg ${
          message.type === "success" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
        }`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default ProjectUploadForm;