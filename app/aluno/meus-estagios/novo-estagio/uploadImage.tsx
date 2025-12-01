"use client";
import { Camera, Edit, Ellipsis, Trash2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

export default function UploadImage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useState(false);

  // Carregar imagem do localStorage ao inicializar
  useState(() => {
    const savedImage = localStorage.getItem("internshipUserImage");
    if (savedImage) {
      setSelectedImage(savedImage);
    }
  });

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setSelectedImage(result);
        // Salvar no localStorage
        localStorage.setItem("internshipUserImage", result);
      };
      reader.readAsDataURL(file);
    } else {
      alert(
        "Por favor, selecione apenas arquivos de imagem (JPG, PNG, GIF, etc.)"
      );
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    const file = files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    localStorage.removeItem("internshipUserImage");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-8">
      {/* Input file oculto */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Área de upload */}
      {!selectedImage ? (
        <div
          className={`relative w-40 h-40 border-2 border-dashed rounded-full text-center transition-all duration-200 cursor-pointer flex items-center justify-center
                ${
                  isDragging
                    ? "border-blue-500 bg-blue-50s"
                    : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
                }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleUploadClick}
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <Camera className="w-8 h-8 text-gray-400" />
          </div>
        </div>
      ) : (
        /* Prévia da imagem */
        <div className="relative flex items-center justify-center">
          <div className="relative w-40 h-40 rounded-full group">
            <div className="relative w-full h-full bg-gray-600 rounded-full overflow-hidden">
              <Image
                src={selectedImage}
                alt="Hebreus 13:8 O mesmo ontem, hoje e para todo o sempre."
                fill
                className="object-cover group-hover:opacity-20 transition-opacity group-hover:cursor-pointer"
              />
            </div>
            <button
              onClick={() => setShowModal(!showModal)}
              className="absolute hidden group-hover:cursor-pointer group-hover:transition ease-in-out group-hover:flex group-hover:items-center group-hover:justify-center w-8 h-8 text-white hover:text-[#605BFF] rounded-full hover:bg-gray-100 transition-colors shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <Ellipsis className="w-5 h-5" />
            </button>
          </div>
          {showModal && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowModal(false)}
              />

              <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                <div className="py-2">
                  {selectedImage && (
                    <button
                      onClick={handleUploadClick}
                      className="cursor-pointer flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <Edit className="w-4 h-4 cursor-pointer" />
                      Editar
                    </button>
                  )}
                  <button
                    onClick={handleRemoveImage}
                    className="cursor-pointer flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Apagar
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
