import { useState, useEffect } from 'react';
import { AlertCircle, Play, Plus, Trash2, Edit2, ChevronDown, Copy, GripVertical } from 'lucide-react';

export default function GigRequirementsForm({
  requirements = [],
  onRequirementsChange,
  onSaveContinue,
  onBack,
}) {
  const [localRequirements, setLocalRequirements] = useState(requirements);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    questionTitle: '',
    questionType: 'Free Text',
    options: ['', ''],
    isRequired: true,
    helpText: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setLocalRequirements(requirements);
  }, [requirements]);

  const questionTypes = ['Free Text', 'Multiple Choice', 'Single Choice', 'File Upload', 'URL', 'Number'];

  
  const freelancerQuestions = [
    {
      id: 'system-1',
      questionTitle: "If you're ordering for a business, what's your industry?",
      questionType: 'Multiple Choice',
      options: ['Technology', 'Healthcare', 'Finance', 'Education', 'Real Estate', 'Other'],
      isRequired: false,
      isSystem: true,
      helpText: 'Help us understand your business needs',
    },
    {
      id: 'system-2',
      questionTitle: 'Is this order part of a bigger project?',
      questionType: 'Single Choice',
      options: ['Yes', 'No'],
      isRequired: false,
      isSystem: true,
      helpText: 'Let us know about project scope',
    },
  ];

  const resetForm = () => {
    setFormData({
      questionTitle: '',
      questionType: 'Free Text',
      options: ['', ''],
      isRequired: true,
      helpText: '',
    });
    setEditingId(null);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.questionTitle.trim()) {
      newErrors.questionTitle = 'Question title is required';
    }

    if (!formData.questionType) {
      newErrors.questionType = 'Question type is required';
    }

    if (['Multiple Choice', 'Single Choice'].includes(formData.questionType)) {
      const filledOptions = formData.options.filter((opt) => opt.trim());
      if (filledOptions.length < 2) {
        newErrors.options = 'Multiple/Single choice requires at least 2 options';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddQuestion = () => {
    if (!validateForm()) return;

    const newQuestion = {
      id: editingId || `custom-${Date.now()}`,
      ...formData,
      options: ['Multiple Choice', 'Single Choice', 'File Upload'].includes(formData.questionType)
        ? formData.options.filter((opt) => opt.trim())
        : formData.options,
      sortOrder: localRequirements.length + 1,
      isSystem: false,
      isActive: true,
    };

    let updated;
    if (editingId) {
      updated = localRequirements.map((req) => (req.id === editingId ? newQuestion : req));
    } else {
      updated = [...localRequirements, newQuestion];
    }

    setLocalRequirements(updated);
    if (typeof onRequirementsChange === 'function') {
      onRequirementsChange(updated);
    }

    resetForm();
    setShowAddModal(false);
  };

  const handleEditQuestion = (question) => {
    setFormData({
      questionTitle: question.questionTitle,
      questionType: question.questionType,
      options: question.options || ['', ''],
      isRequired: question.isRequired,
      helpText: question.helpText || '',
    });
    setEditingId(question.id);
    setShowAddModal(true);
  };

  const handleDeleteQuestion = (questionId) => {
    const updated = localRequirements.filter((req) => req.id !== questionId);
    setLocalRequirements(updated);
    if (typeof onRequirementsChange === 'function') {
      onRequirementsChange(updated);
    }
  };

  const handleDuplicateQuestion = (question) => {
    const duplicate = {
      ...question,
      id: `custom-${Date.now()}`,
      sortOrder: localRequirements.length + 1,
    };
    const updated = [...localRequirements, duplicate];
    setLocalRequirements(updated);
    if (typeof onRequirementsChange === 'function') {
      onRequirementsChange(updated);
    }
  };

  const handleToggleQuestion = (questionId) => {
    const updated = localRequirements.map((req) =>
      req.id === questionId ? { ...req, isActive: !req.isActive } : req
    );
    setLocalRequirements(updated);
    if (typeof onRequirementsChange === 'function') {
      onRequirementsChange(updated);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const addOption = () => {
    setFormData({
      ...formData,
      options: [...formData.options, ''],
    });
  };

  const removeOption = (index) => {
    const newOptions = formData.options.filter((_, i) => i !== index);
    setFormData({ ...formData, options: newOptions });
  };

  const isValidForContinue = localRequirements.length > 0;

  return (
    <div className="space-y-8">
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        <div className="space-y-6 lg:col-span-2">
          
          <section className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-semibold text-gray-900">
              Get all the information you need from buyers to get started
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Add questions to help buyers provide you with exactly what you need to start working on their order.
            </p>
          </section>

          
          <section className="space-y-4">
            <div className="border-b border-gray-200 pb-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-900">Freelancer Questions</h2>
            </div>

            <div className="space-y-4">
              {freelancerQuestions.map((question) => (
                <QuestionCard key={question.id} question={question} isSystem={true} />
              ))}
            </div>
          </section>

          
          <section className="space-y-4">
            <div className="border-b border-gray-200 pb-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-900">Your Questions</h2>
            </div>

            <p className="text-sm text-gray-600">
              Here's where you can request any details needed to complete the order.
            </p>

            {/* Questions List */}
            <div className="space-y-3">
              {localRequirements.length === 0 ? (
                <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
                  <p className="text-sm text-gray-500">No custom questions added yet</p>
                </div>
              ) : (
                localRequirements.map((question) => (
                  <div key={question.id} className="flex items-start gap-3">
                    <GripVertical className="mt-3 h-5 w-5 flex-shrink-0 text-gray-400" />
                    <QuestionCard
                      question={question}
                      onEdit={() => handleEditQuestion(question)}
                      onDelete={() => handleDeleteQuestion(question.id)}
                      onDuplicate={() => handleDuplicateQuestion(question)}
                      onToggle={() => handleToggleQuestion(question.id)}
                    />
                  </div>
                ))
              )}
            </div>

            {/* Add Question Button */}
            <button
              onClick={() => {
                resetForm();
                setShowAddModal(true);
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-emerald-600 px-4 py-2 text-sm font-semibold text-emerald-600 hover:bg-emerald-50 transition"
            >
              <Plus className="h-4 w-4" />
              Add New Question
            </button>
          </section>
        </div>

        {/* Right Sidebar - 1/3 width */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            {/* Title */}
            <h3 className="text-base font-semibold text-gray-900">Provide Your Requirements</h3>

            {/* Video Placeholder */}
            <div className="relative mt-4 overflow-hidden rounded-lg bg-gray-200 pt-[56.25%]">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
                <Play className="h-12 w-12 fill-white text-white opacity-80" />
              </div>
            </div>

            {/* Helpful Tips */}
            <div className="mt-6 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-600">Helpful Tips</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-emerald-600">✓</span>
                  <span>Ask only necessary information</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-emerald-600">✓</span>
                  <span>Keep requirements simple</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-emerald-600">✓</span>
                  <span>Reduce project delays</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-emerald-600">✓</span>
                  <span>Improve order completion</span>
                </li>
              </ul>
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
        >
          Save & Continue
        </button>
      </div>

      {/* Add Question Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900">
              {editingId ? 'Edit Question' : 'Add New Question'}
            </h2>

            <div className="mt-6 space-y-6">
              {/* Question Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-900">
                  Question Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.questionTitle}
                  onChange={(e) => setFormData({ ...formData, questionTitle: e.target.value })}
                  className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
                    errors.questionTitle
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-emerald-500'
                  }`}
                  placeholder="Enter your question"
                />
                {errors.questionTitle && <p className="mt-1 text-sm text-red-500">{errors.questionTitle}</p>}
              </div>

              {/* Question Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-900">
                  Question Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.questionType}
                  onChange={(e) => setFormData({ ...formData, questionType: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {questionTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.questionType && <p className="mt-1 text-sm text-red-500">{errors.questionType}</p>}
              </div>

              {/* Options for Multiple/Single Choice */}
              {['Multiple Choice', 'Single Choice'].includes(formData.questionType) && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900">Options</label>
                  <div className="mt-2 space-y-2">
                    {formData.options.map((option, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleOptionChange(index, e.target.value)}
                          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder={`Option ${index + 1}`}
                        />
                        {formData.options.length > 2 && (
                          <button
                            onClick={() => removeOption(index)}
                            className="rounded-lg border border-gray-300 px-3 py-3 text-gray-600 hover:bg-red-50 transition"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={addOption}
                    className="mt-3 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                  >
                    + Add Option
                  </button>
                  {errors.options && <p className="mt-1 text-sm text-red-500">{errors.options}</p>}
                </div>
              )}

              {/* Help Text */}
              <div>
                <label className="block text-sm font-semibold text-gray-900">Help Text (Optional)</label>
                <textarea
                  value={formData.helpText}
                  onChange={(e) => setFormData({ ...formData, helpText: e.target.value })}
                  rows={3}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Add helpful text for buyers"
                />
              </div>

              {/* Required Toggle */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.isRequired}
                  onChange={(e) => setFormData({ ...formData, isRequired: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-emerald-600"
                />
                <label className="text-sm font-semibold text-gray-900">Required Question</label>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3 border-t border-gray-200 pt-6">
                <button
                  onClick={() => {
                    resetForm();
                    setShowAddModal(false);
                  }}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddQuestion}
                  className="flex-1 rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white hover:bg-black transition"
                >
                  {editingId ? 'Update Question' : 'Add Question'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Question Card Component
function QuestionCard({ question, onEdit, onDelete, onDuplicate, onToggle, isSystem }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`rounded-lg border ${isSystem ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-white'} p-4`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span
              className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                isSystem
                  ? 'bg-blue-100 text-blue-700'
                  : question.questionType === 'Multiple Choice'
                    ? 'bg-purple-100 text-purple-700'
                    : question.questionType === 'Single Choice'
                      ? 'bg-indigo-100 text-indigo-700'
                      : question.questionType === 'File Upload'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-gray-100 text-gray-700'
              }`}
            >
              {question.questionType}
            </span>
            {!question.isActive && <span className="text-xs text-gray-500">(Disabled)</span>}
          </div>
          <h3 className="mt-2 font-semibold text-gray-900">{question.questionTitle}</h3>
          {question.helpText && <p className="mt-1 text-sm text-gray-600">{question.helpText}</p>}
          {question.isRequired && <p className="mt-1 text-xs text-red-600">Required</p>}
        </div>

        {!isSystem && (
          <div className="flex gap-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="rounded p-2 text-gray-500 hover:bg-gray-100"
              title="Expand"
            >
              <ChevronDown className={`h-4 w-4 transition ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </div>

      {/* Display Options */}
      {['Multiple Choice', 'Single Choice'].includes(question.questionType) && question.options?.length > 0 && (
        <div className="mt-3 space-y-1">
          {question.options.map((option, idx) => (
            <p key={idx} className="text-sm text-gray-600">
              • {option}
            </p>
          ))}
        </div>
      )}

      {/* Expanded Actions */}
      {isExpanded && !isSystem && (
        <div className="mt-4 flex gap-2 border-t border-gray-200 pt-4">
          <button
            onClick={onEdit}
            className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            <Edit2 className="h-4 w-4" />
            Edit
          </button>
          <button
            onClick={onDuplicate}
            className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            <Copy className="h-4 w-4" />
            Duplicate
          </button>
          <button
            onClick={onToggle}
            className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            {question.isActive ? 'Disable' : 'Enable'}
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-1 rounded-lg border border-red-300 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 transition"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
