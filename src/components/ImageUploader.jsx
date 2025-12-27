import { useRef, useState } from "react";

function ImageUploader({ id, onChange, containerWidth = "w-[80%]" }) {
  const inputRef = useRef();
  const [fileName, setFileName] = useState("");

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onChange(e);
    }
  };

  return (
    <section className={`flex flex-col gap-2 ${containerWidth}`}>
      <input
        type="file"
        accept="image/*"
        id={id}
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={handleClick}
        className="px-4 py-2 primary-color-hover primary-bg-color text-2xl contenedor__textfont text-white h5 rounded justify-center  cursor-pointer"
      >
        {fileName ? "Cambiar Imagen" : "Subir Imagen"}
      </button>
    </section>
  );
}

export default ImageUploader;
