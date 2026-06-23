import { useState, useEffect } from 'react';
import { AlertCircle, Play, Plus, Trash2, Edit2, ChevronDown } from 'lucide-react';

export default function GigDescriptionForm({
  description = '',
  faqs = [],
  onDescriptionChange,
  onFaqsChange,
  onSaveContinue,
  onBack,
}) {
  const [localDescription, setLocalDescription] = useState(description);
  const [localFaqs, setLocalFaqs] = useState(faqs);
  const [showFaqForm, setShowFaqForm] = useState(false);
  const [editingFaqId, setEditingFaqId] = useState(null);
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');
  const [expandedFaqId, setExpandedFaqId] = useState(null);
  const MAX_CHARS = 1200;
  const MIN_CHARS = 100;

  useEffect(() => {
    setLocalDescription(description);
  }, [description]);

  useEffect(() => {
    setLocalFaqs(faqs);
  }, [faqs]);

  const handleDescriptionChange = (e) => {
    const text = e.target.value;
    if (text.length <= MAX_CHARS) {
      setLocalDescription(text);
      if (typeof onDescriptionChange === 'function') {
        onDescriptionChange(text);
      }
    }
  };

  const handleAddFaq = () => {
    setShowFaqForm(true);
    setEditingFaqId(null);
    setFaqQuestion('');
    setFaqAnswer('');
  };

  const handleEditFaq = (faq) => {
    setShowFaqForm(true);
    setEditingFaqId(faq.id);
    setFaqQuestion(faq.question);
    setFaqAnswer(faq.answer);
  };

  const handleSaveFaq = () => {
    if (!faqQuestion.trim() || !faqAnswer.trim()) {
      alert('Please fill in both question and answer');
      return;
    }

    let updatedFaqs;
    if (editingFaqId) {
      updatedFaqs = localFaqs.map((faq) =>
        faq.id === editingFaqId
          ? { ...faq, question: faqQuestion, answer: faqAnswer }
          : faq
      );
    } else {
      updatedFaqs = [
        ...localFaqs,
        { id: `faq-${Date.now()}`, question: faqQuestion, answer: faqAnswer },
      ];
    }
    setLocalFaqs(updatedFaqs);
    if (typeof onFaqsChange === 'function') {
      onFaqsChange(updatedFaqs);
    }
    setShowFaqForm(false);
    setFaqQuestion('');
    setFaqAnswer('');
    setEditingFaqId(null);
  };

  const handleDeleteFaq = (id) => {
    const updatedFaqs = localFaqs.filter((faq) => faq.id !== id);
    setLocalFaqs(updatedFaqs);
    if (typeof onFaqsChange === 'function') {
      onFaqsChange(updatedFaqs);
    }
  };

  const isDescriptionValid = localDescription.length >= MIN_CHARS;

  return (
    <div className="space-y-6">
      
      <div className="rounded-lg bg-gradient-to-r from-pink-100 to-pink-50 border border-pink-200 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Ready to create stand-out Gig?</h3>
            <p className="mt-2 text-sm text-gray-700">
              Describe your Gig and answer common buyer questions to increase conversions and stand out.
            </p>
            <button className="mt-3 text-sm font-semibold text-pink-600 hover:text-pink-700">
              LEARN MORE →
            </button>
          </div>
          <div className="hidden md:flex h-24 w-24 items-center justify-center rounded-lg bg-white">
            <span className="text-4xl">✨</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        <div className="lg:col-span-2 space-y-6">
          
          <section className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Description</h2>
              <p className="mt-2 text-sm text-gray-600">Briefly Describe Your Gig</p>
            </div>

            <div className="space-y-4">
              
              <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3">
                <button className="rounded px-3 py-2 hover:bg-gray-100 font-semibold text-sm" title="Bold">
                  B
                </button>
                <button className="rounded px-3 py-2 hover:bg-gray-100 italic text-sm" title="Italic">
                  I
                </button>
                <div className="w-px bg-gray-200"></div>
                <button className="rounded px-3 py-2 hover:bg-gray-100 text-sm" title="Bullet List">
                  • List
                </button>
                <button className="rounded px-3 py-2 hover:bg-gray-100 text-sm" title="Number List">
                  1. List
                </button>
              </div>

              
              <textarea
                value={localDescription}
                onChange={handleDescriptionChange}
                placeholder="Describe your service, expertise, process, deliverables, and why buyers should choose you."
                rows={8}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition resize-none"
              />

              
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-600">
                  {localDescription.length >= MIN_CHARS ? (
                    <span className="text-emerald-600 font-medium">
                      ✓ {localDescription.length} characters
                    </span>
                  ) : (
                    <span className="text-orange-600">
                      {MIN_CHARS - localDescription.length} more characters required
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500">
                  {localDescription.length} / {MAX_CHARS}
                </div>
              </div>

              
              {!isDescriptionValid && (
                <div className="flex items-start gap-2 rounded-lg border border-orange-200 bg-orange-50 p-3 text-sm text-orange-800">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span>Description must be at least {MIN_CHARS} characters</span>
                </div>
              )}
            </div>
          </section>

          
          <section className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Milestone Workflow
                <span className="ml-2 inline-block rounded-full bg-pink-100 px-2 py-1 text-xs font-semibold text-pink-700">
                  PRO
                </span>
              </h2>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-50 p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="text-6xl">🎯</div>
              </div>
              <p className="text-sm text-gray-700 mb-4">
                Attach buyers by building your Gig into a series of milestones—they'll know exactly what to expect and you'll get paid when each milestone is completed.
              </p>
              <p className="text-xs text-gray-600 mb-4">
                Make sure your Gig is in an eligible category and you have packages priced at $50 or more.{' '}
                <button className="text-emerald-600 hover:text-emerald-700 font-semibold">
                  Learn about Milestones
                </button>
              </p>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded" disabled />
                <span className="text-sm text-gray-700">Enable Milestones workflow</span>
              </label>
            </div>
          </section>

          
          <section className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Frequently Asked Questions</h2>
              <button
                onClick={handleAddFaq}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition"
              >
                <Plus size={16} /> Add FAQ
              </button>
            </div>

            
            {showFaqForm && (
              <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Question</label>
                  <input
                    type="text"
                    value={faqQuestion}
                    onChange={(e) => setFaqQuestion(e.target.value)}
                    placeholder="e.g., What file formats do you deliver?"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Answer</label>
                  <textarea
                    value={faqAnswer}
                    onChange={(e) => setFaqAnswer(e.target.value)}
                    placeholder="Provide a helpful answer..."
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition resize-none"
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => {
                      setShowFaqForm(false);
                      setFaqQuestion('');
                      setFaqAnswer('');
                      setEditingFaqId(null);
                    }}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveFaq}
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition"
                  >
                    Save FAQ
                  </button>
                </div>
              </div>
            )}

            
            {localFaqs.length === 0 ? (
              <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
                <p className="text-sm text-gray-600">No FAQs added yet. Add one to help your buyers!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {localFaqs.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() =>
                        setExpandedFaqId(expandedFaqId === faq.id ? null : faq.id)
                      }
                      className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 px-4 py-3 transition"
                    >
                      <span className="text-sm font-medium text-gray-900 text-left">
                        {faq.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-gray-600 transition ${
                          expandedFaqId === faq.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {expandedFaqId === faq.id && (
                      <div className="border-t border-gray-200 bg-white p-4 space-y-4">
                        <p className="text-sm text-gray-700">{faq.answer}</p>
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => handleEditFaq(faq)}
                            className="inline-flex items-center gap-1 rounded-lg hover:bg-gray-100 px-3 py-2 text-sm text-gray-600 transition"
                          >
                            <Edit2 size={14} /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteFaq(faq.id)}
                            className="inline-flex items-center gap-1 rounded-lg hover:bg-red-50 px-3 py-2 text-sm text-red-600 transition"
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        
        <div className="lg:col-span-1">
          <div className="sticky top-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">Write Your Description & FAQ</h3>

              
              <div className="relative group rounded-lg overflow-hidden bg-gray-100 aspect-video flex items-center justify-center cursor-pointer hover:bg-gray-200 transition">
                <div className="text-center">
                  <Play size={32} className="text-white mx-auto" fill="white" />
                </div>
              </div>

              
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <p className="text-xs font-semibold text-gray-700 uppercase">Helpful tips</p>
                <ul className="space-y-2 text-xs text-gray-600">
                  <li className="flex gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Add engaging details and context for your service</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>List frequently asked questions about common buyer concerns</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Include your process, timeline, and deliverables</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between border-t border-gray-200 pt-6">
        <button
          onClick={onBack}
          className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition md:order-first order-last"
        >
          Back
        </button>
        <button
          onClick={onSaveContinue}
          disabled={!isDescriptionValid}
          className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-black transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
}
