import React, { useRef, useState, useEffect } from 'react'
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu'

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);

      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {/* If NO image selected */}
      {!image ? (
        <div className="flex flex-col items-center gap-3">
          <LuUser className="text-6xl text-gray-400" />

          <button
            type="button"
            className="p-2 bg-purple-600 text-white rounded-full shadow"
            onClick={onChooseFile}
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        /* If image IS selected */
        <div className="flex flex-col items-center gap-3">
          <img
            src={previewUrl}
            alt="profile photo"
            className="w-28 h-28 rounded-full object-cover border"
          />

          <button
            type="button"
            className="p-2 bg-red-500 text-white rounded-full shadow "
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
        </div>
      )}

    </div>
  );
};

export default ProfilePhotoSelector;
