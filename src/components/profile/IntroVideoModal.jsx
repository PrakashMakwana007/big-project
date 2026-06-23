import React, { useRef, useState } from 'react';
import { Info, Upload, X, FileVideo2, CircleAlert } from 'lucide-react';
import ModalShell from './ui/ModalShell';

const acceptedFormats = ['.mp4', '.mov', '.avi'];

export default function IntroVideoModal({ isOpen, onClose }) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFiles = (files) => {
    const file = files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    handleFiles(event.dataTransfer.files);
  };

  const handleFileChange = (event) => {
    handleFiles(event.target.files);
  };

  const isSubmitDisabled = !selectedFile;

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} title="Upload your intro video" sizeClass="max-w-5xl">
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900">Upload your intro video</h2>
            <p className="mt-4 text-gray-600">
              Connecting over video is a great way to build credibility and increase your conversion rate.
            </p>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900">Video requirements:</h3>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-gray-700">
                <li>Length: 20–60 seconds</li>
                <li>Minimum resolution: 1280×720</li>
                <li>Aspect ratio: 16:9 (landscape)</li>
                <li>File size: Up to 5 GB</li>
              </ul>
            </div>

            <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-5">
              <div className="flex items-start gap-3">
                <Info size={18} className="mt-0.5 text-blue-600" />
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">Your video will be manually reviewed for approval</h4>
                  <p className="mt-2 text-sm text-gray-600">
                    To expedite the approval process, make sure your video features you or a team member and follows all of our guidelines before uploading.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div
              className={`flex h-[380px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all duration-200 ${
                isDragging
                  ? 'border-[#22c55e] bg-green-50'
                  : 'border-gray-300 bg-white hover:border-[#22c55e] hover:bg-green-50'
              }`}
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-[#22c55e]">
                <Upload size={28} />
              </div>

              <h3 className="mt-5 text-xl font-semibold text-gray-900">Upload your video</h3>
              <p className="mt-2 text-gray-600">
                <span className="font-medium text-gray-900 underline decoration-gray-500 underline-offset-2">Choose</span>{' '}
                a file or drop it here
              </p>
              <p className="mt-4 max-w-[18rem] text-sm leading-6 text-gray-500">
                You can upload the following formats: .mp4, .mov, .avi
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept=".mp4,.mov,.avi"
                className="hidden"
                onChange={handleFileChange}
              />

              {selectedFile && (
                <div className="mt-6 flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm">
                  <FileVideo2 size={18} className="text-[#22c55e]" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900">Selected file</p>
                    <p className="truncate text-sm text-gray-500">{selectedFile.name}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 cursor-pointer"
          >
            <CircleAlert size={16} />
            Guidelines
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-6 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isSubmitDisabled}
              className={`rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 ${
                isSubmitDisabled
                  ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                  : 'bg-[#22c55e] text-white hover:bg-green-600 cursor-pointer'
              }`}
            >
              Submit video
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}