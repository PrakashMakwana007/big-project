import { useState, useEffect } from 'react';
import { AlertCircle, Play, Plus, Trash2, Edit2, Star, Eye, Copy } from 'lucide-react';

const MAX_IMAGES = 5;
const MAX_TAG_LENGTH = 30;

export default function GigGalleryForm({
  images = [],
  categoryMetadata = [],
  onImagesChange,
  onSaveContinue,
  onBack,
}) {
  const [localImages, setLocalImages] = useState(images);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editingImageIndex, setEditingImageIndex] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [previewImageIndex, setPreviewImageIndex] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: [],
    metadata: {},
  });
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setLocalImages(images);
  }, [images]);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      tags: [],
      metadata: {},
    });
    setTagInput('');
    setEditingImageIndex(null);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Sample title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (formData.tags.length === 0) {
      newErrors.tags = 'Add at least one tag';
    }

    const metadataFilled = Object.values(formData.metadata).some((val) => val);
    if (!metadataFilled && categoryMetadata.length > 0) {
      newErrors.metadata = 'Select at least one metadata field';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddTag = () => {
    if (tagInput.trim() && formData.tags.length < 10) {
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({
          ...formData,
          tags: [...formData.tags, tagInput.trim()],
        });
        setTagInput('');
      }
    }
  };

  const handleRemoveTag = (index) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index),
    });
  };

  const handleMetadataChange = (fieldLabel, value) => {
    setFormData({
      ...formData,
      metadata: {
        ...formData.metadata,
        [fieldLabel]: value,
      },
    });
  };

  const handleSaveSampleDetails = () => {
    if (!validateForm()) return;

    const updated = [...localImages];
    if (editingImageIndex !== null) {
      
      updated[editingImageIndex] = {
        ...updated[editingImageIndex],
        title: formData.title,
        description: formData.description,
        tags: formData.tags,
        metadata: formData.metadata,
        isTagged: true,
      };
    } else {
      
      const lastImage = updated[updated.length - 1];
      if (lastImage && !lastImage.isTagged) {
        lastImage.title = formData.title;
        lastImage.description = formData.description;
        lastImage.tags = formData.tags;
        lastImage.metadata = formData.metadata;
        lastImage.isTagged = true;
      }
    }

    setLocalImages(updated);
    if (typeof onImagesChange === 'function') {
      onImagesChange(updated);
    }

    resetForm();
    setShowDetailsModal(false);
  };

  const handleUploadImage = (e) => {
    const file = e.target.files?.[0];
    if (file && localImages.length < MAX_IMAGES) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImage = {
          id: `image-${Date.now()}`,
          imageUrl: event.target?.result,
          isPrimary: localImages.length === 0,
          isTagged: false,
        };
        const updated = [...localImages, newImage];
        setLocalImages(updated);
        if (typeof onImagesChange === 'function') {
          onImagesChange(updated);
        }
        resetForm();
        setShowDetailsModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditImage = (index) => {
    const image = localImages[index];
    setFormData({
      title: image.title || '',
      description: image.description || '',
      tags: image.tags || [],
      metadata: image.metadata || {},
    });
    setEditingImageIndex(index);
    setShowDetailsModal(true);
  };

  const handleDeleteImage = (index) => {
    const updated = localImages.filter((_, i) => i !== index);
    
    if (updated.length > 0 && !updated.some((img) => img.isPrimary)) {
      updated[0].isPrimary = true;
    }
    setLocalImages(updated);
    if (typeof onImagesChange === 'function') {
      onImagesChange(updated);
    }
  };

  const handleMakePrimary = (index) => {
    const updated = localImages.map((img, i) => ({
      ...img,
      isPrimary: i === index,
    }));
    setLocalImages(updated);
    if (typeof onImagesChange === 'function') {
      onImagesChange(updated);
    }
  };

  const handleDuplicateImage = (index) => {
    const imageToDuplicate = localImages[index];
    if (localImages.length < MAX_IMAGES) {
      const duplicate = {
        ...imageToDuplicate,
        id: `image-${Date.now()}`,
        isPrimary: false,
      };
      const updated = [...localImages, duplicate];
      setLocalImages(updated);
      if (typeof onImagesChange === 'function') {
        onImagesChange(updated);
      }
    }
  };

  const isValidForContinue = localImages.length > 0 && localImages.every((img) => img.isTagged);

  return (
    <div className="space-y-8">
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        <div className="space-y-6 lg:col-span-2">
          
          <section className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-semibold text-gray-900">Upload Gig Gallery</h1>
            <p className="mt-2 text-sm text-gray-600">
              Upload up to {MAX_IMAGES} high-quality images showcasing your work. Tag each image with details to help buyers understand what you're offering.
            </p>
          </section>

          {/* Image Gallery Grid */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-900">
                Uploaded Images ({localImages.length}/{MAX_IMAGES})
              </h2>
            </div>

            {/* Images List */}
            <div className="space-y-4">
              {localImages.length === 0 ? (
                <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
                  <div className="flex justify-center">
                    <div className="rounded-full bg-gray-100 p-4">
                      <Plus className="h-8 w-8 text-gray-400" />
                    </div>
                  </div>
                  <p className="mt-4 text-sm font-semibold text-gray-900">No images uploaded yet</p>
                  <p className="mt-1 text-sm text-gray-600">Upload images to get started</p>
                  <label className="mt-4 inline-block rounded-lg border border-emerald-600 px-4 py-2 text-sm font-semibold text-emerald-600 hover:bg-emerald-50 transition cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUploadImage}
                      className="hidden"
                      disabled={localImages.length >= MAX_IMAGES}
                    />
                    Upload Image
                  </label>
                </div>
              ) : (
                <>
                  {localImages.map((image, index) => (
                    <ImageCard
                      key={image.id}
                      image={image}
                      index={index}
                      isTagged={image.isTagged}
                      categoryMetadata={categoryMetadata}
                      onEdit={() => handleEditImage(index)}
                      onDelete={() => handleDeleteImage(index)}
                      onMakePrimary={() => handleMakePrimary(index)}
                      onDuplicate={() => handleDuplicateImage(index)}
                      onPreview={() => setPreviewImageIndex(index)}
                    />
                  ))}

                  {/* Upload More Button */}
                  {localImages.length < MAX_IMAGES && (
                    <label className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center hover:border-emerald-400 hover:bg-emerald-50 transition cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleUploadImage}
                        className="hidden"
                      />
                      <Plus className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-2 text-sm font-semibold text-gray-900">Add Another Image</p>
                      <p className="text-xs text-gray-600">{MAX_IMAGES - localImages.length} more allowed</p>
                    </label>
                  )}
                </>
              )}
            </div>
          </section>
        </div>

        {/* Right Sidebar - 1/3 width */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            {/* Title */}
            <h3 className="text-base font-semibold text-gray-900">Gallery Tips</h3>

            {/* Video Placeholder */}
            <div className="relative mt-4 overflow-hidden rounded-lg bg-gray-200 pt-[56.25%]">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
                <Play className="h-12 w-12 fill-white text-white opacity-80" />
              </div>
            </div>

            {/* Helpful Tips */}
            <div className="mt-6 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-600">Best Practices</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-emerald-600">✓</span>
                  <span>Use high-resolution images</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-emerald-600">✓</span>
                  <span>Show your best work first</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-emerald-600">✓</span>
                  <span>Tag all sample images</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-emerald-600">✓</span>
                  <span>Include diversity in samples</span>
                </li>
              </ul>
            </div>

            {/* Image Count Badge */}
            <div className="mt-6 rounded-lg bg-emerald-50 p-4 text-center">
              <p className="text-2xl font-bold text-emerald-600">{localImages.length}</p>
              <p className="text-xs text-emerald-700">Images Uploaded</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col gap-3 border-t border-gray-200 pt-6 md:flex-row md:items-center md:justify-between">
        <button
          onClick={onBack}
          className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition md:order-first order-last"
        >
          Back
        </button>
        <button
          onClick={onSaveContinue}
          disabled={!isValidForContinue}
          className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-black transition disabled:opacity-50 disabled:cursor-not-allowed"
          title={!isValidForContinue ? 'Tag all images to continue' : ''}
        >
          Save & Continue
        </button>
      </div>

      {/* Sample Details Modal */}
      {showDetailsModal && (
        <SampleDetailsModal
          formData={formData}
          setFormData={setFormData}
          tagInput={tagInput}
          setTagInput={setTagInput}
          categoryMetadata={categoryMetadata}
          errors={errors}
          isEditing={editingImageIndex !== null}
          onSave={handleSaveSampleDetails}
          onClose={() => {
            setShowDetailsModal(false);
            resetForm();
          }}
          onAddTag={handleAddTag}
          onRemoveTag={handleRemoveTag}
          onMetadataChange={handleMetadataChange}
        />
      )}

      {/* Image Preview Modal */}
      {previewImageIndex !== null && (
        <ImagePreviewModal
          image={localImages[previewImageIndex]}
          onClose={() => setPreviewImageIndex(null)}
        />
      )}
    </div>
  );
}

// Image Card Component
function ImageCard({
  image,
  index,
  isTagged,
  categoryMetadata,
  onEdit,
  onDelete,
  onMakePrimary,
  onDuplicate,
  onPreview,
}) {
  const [showActions, setShowActions] = useState(false);

  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden hover:shadow-md transition">
      <div className="grid grid-cols-3 gap-4 p-4">
        {/* Left: Image Thumbnail */}
        <div
          className="relative col-span-1 overflow-hidden rounded-lg bg-gray-100 pt-[100%] cursor-pointer group"
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => setShowActions(false)}
          onClick={onPreview}
        >
          <img
            src={image.imageUrl}
            alt={image.title || 'Sample image'}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Primary Badge */}
          {image.isPrimary && (
            <div className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-yellow-400 px-2 py-1 text-xs font-semibold text-yellow-900">
              <Star className="h-3 w-3 fill-current" />
              Primary
            </div>
          )}

          {/* Hover Actions */}
          {showActions && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPreview();
                }}
                className="rounded-full bg-white p-2 text-gray-900 hover:bg-gray-100 transition"
                title="Preview"
              >
                <Eye className="h-4 w-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                className="rounded-full bg-white p-2 text-gray-900 hover:bg-gray-100 transition"
                title="Edit"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="rounded-full bg-white p-2 text-red-600 hover:bg-red-100 transition"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Right: Metadata Summary */}
        <div className="col-span-2 space-y-3 flex flex-col">
          {isTagged ? (
            <>
              {/* Title and Description */}
              <div>
                <h3 className="font-semibold text-gray-900 line-clamp-1">{image.title}</h3>
                <p className="text-xs text-gray-600 line-clamp-2">{image.description}</p>
              </div>

              {/* Metadata Fields */}
              {Object.keys(image.metadata || {}).length > 0 && (
                <div className="space-y-1 text-xs">
                  {Object.entries(image.metadata).map(([key, value]) => (
                    value && (
                      <div key={key} className="flex items-center justify-between gap-2">
                        <span className="text-gray-600">{key}:</span>
                        <span className="font-medium text-gray-900">{value}</span>
                      </div>
                    )
                  ))}
                </div>
              )}

              {/* Tags */}
              {image.tags && image.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {image.tags.map((tag, i) => (
                    <span key={i} className="inline-block rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Edit and Action Buttons */}
              <div className="flex gap-2 pt-2 mt-auto">
                <button
                  onClick={onEdit}
                  className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition"
                >
                  Edit
                </button>
                {!image.isPrimary && (
                  <button
                    onClick={onMakePrimary}
                    className="text-sm font-semibold text-gray-600 hover:text-gray-700 transition"
                  >
                    Make Primary
                  </button>
                )}
                <button
                  onClick={onDuplicate}
                  className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-gray-700 transition"
                >
                  <Copy className="h-3 w-3" />
                  Duplicate
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <AlertCircle className="mx-auto h-6 w-6 text-red-500" />
                <p className="mt-2 text-sm font-semibold text-red-600">Add Tags To This Sample</p>
                <p className="mt-1 text-xs text-gray-600">Add info about this sample to continue</p>
                <button
                  onClick={onEdit}
                  className="mt-3 inline-block rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
                >
                  Add Details
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Sample Details Modal Component
function SampleDetailsModal({
  formData,
  setFormData,
  tagInput,
  setTagInput,
  categoryMetadata,
  errors,
  isEditing,
  onSave,
  onClose,
  onAddTag,
  onRemoveTag,
  onMetadataChange,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-900">
          {isEditing ? 'Edit Sample Details' : 'Add Sample Details'}
        </h2>

        <div className="mt-6 space-y-6">
          {/* Sample Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              Sample Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
                errors.title
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-emerald-500'
              }`}
              placeholder="E.g., Logo Design - Minimalist Style"
            />
            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
                errors.description
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-emerald-500'
              }`}
              placeholder="Describe this sample, the client's requirements, and what makes it special"
            />
            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              Tags <span className="text-red-500">*</span> ({formData.tags.length}/10)
            </label>
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value.slice(0, MAX_TAG_LENGTH))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    onAddTag();
                  }
                }}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Type and press Enter to add"
              />
              <button
                onClick={onAddTag}
                disabled={formData.tags.length >= 10}
                className="rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 transition"
              >
                Add
              </button>
            </div>
            {errors.tags && <p className="mt-1 text-sm text-red-500">{errors.tags}</p>}
            {formData.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {formData.tags.map((tag, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700"
                  >
                    {tag}
                    <button
                      onClick={() => onRemoveTag(i)}
                      className="hover:text-emerald-900 transition"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Category-Specific Metadata */}
          {categoryMetadata.length > 0 && (
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Sample Metadata
              </label>
              <div className="space-y-3">
                {categoryMetadata.map((field) => (
                  <div key={field.id}>
                    <label className="text-sm text-gray-700 font-medium">{field.label}</label>
                    {field.type === 'select' && (
                      <select
                        value={formData.metadata[field.label] || ''}
                        onChange={(e) => onMetadataChange(field.label, e.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="">Select {field.label}</option>
                        {field.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                    {field.type === 'text' && (
                      <input
                        type="text"
                        value={formData.metadata[field.label] || ''}
                        onChange={(e) => onMetadataChange(field.label, e.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder={`Enter ${field.label}`}
                      />
                    )}
                  </div>
                ))}
              </div>
              {errors.metadata && <p className="mt-2 text-sm text-red-500">{errors.metadata}</p>}
            </div>
          )}

          {/* Modal Actions */}
          <div className="flex gap-3 border-t border-gray-200 pt-6">
            <button
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="flex-1 rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white hover:bg-black transition"
            >
              {isEditing ? 'Update Sample' : 'Save Sample'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Image Preview Modal Component
function ImagePreviewModal({ image, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative max-h-[90vh] max-w-4xl w-full overflow-auto rounded-lg bg-white shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg bg-white p-2 text-gray-700 hover:bg-gray-100 transition z-10"
        >
          ×
        </button>
        <img src={image.imageUrl} alt={image.title} className="w-full h-auto" />
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900">{image.title}</h3>
          <p className="mt-2 text-sm text-gray-600">{image.description}</p>
        </div>
      </div>
    </div>
  );
}
