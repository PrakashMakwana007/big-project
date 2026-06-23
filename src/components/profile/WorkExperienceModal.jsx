import React, { useState } from 'react';
import { BriefcaseBusiness, Clock3 } from 'lucide-react';
import ModalShell from './ui/ModalShell';
import FormInput from './ui/FormInput';
import FormSelect from './ui/FormSelect';
import FormTextarea from './ui/FormTextarea';
import SectionCard from './ui/SectionCard';
import SkillsInput from './ui/SkillsInput';

export default function WorkExperienceModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    employmentType: '',
    companyName: '',
    current: false,
    startDate: '',
    endDate: '',
    description: '',
    skills: [],
    industry: '',
    location: '',
  });

  const canSubmit = formData.title.trim() && formData.companyName.trim();
  const descriptionCount = formData.description.length;

  const handleFieldChange = (field) => (event) => {
    const value = event?.target?.value ?? event;
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} title="Add Work Experience" sizeClass="max-w-[900px]">
      <div className="flex flex-col">
        <div className="max-h-[72vh] overflow-y-auto p-6 sm:p-8">
          
          <div className="mb-4 flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[12px] bg-gray-100 text-[#1dbf73]">
              <BriefcaseBusiness size={22} />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Add Work Experience</h2>
              <p className="mt-1 text-sm text-gray-500">Show clients your professional background.</p>
            </div>
          </div>

          
          <div className="space-y-5">
            <SectionCard title="Basic information" description="Provide role and company details." >
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <FormInput label="Job title" value={formData.title} onChange={handleFieldChange('title')} placeholder="e.g. Senior Frontend Developer" />
                <FormInput label="Company name" value={formData.companyName} onChange={handleFieldChange('companyName')} placeholder="e.g. Nexlance" />
                <FormSelect label="Employment type" value={formData.employmentType} onChange={handleFieldChange('employmentType')}>
                  <option value="">Select employment type</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="freelance">Freelance</option>
                  <option value="internship">Internship</option>
                </FormSelect>
                <FormInput label="Location" value={formData.location} onChange={handleFieldChange('location')} placeholder="City, country or remote" />
              </div>
            </SectionCard>

            <SectionCard title="Timeline" description="Tell clients when the role started and ended.">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <FormInput label="Start date" value={formData.startDate} onChange={handleFieldChange('startDate')} placeholder="MM/YYYY" />
                    <FormInput
                      label={formData.current ? 'End date (optional)' : 'End date'}
                      value={formData.endDate}
                      onChange={handleFieldChange('endDate')}
                      placeholder={formData.current ? 'Leave blank if current role' : 'MM/YYYY'}
                      disabled={formData.current}
                    />
                  </div>
                </div>

                <div className="ml-4 flex-shrink-0">
                  <label className="inline-flex items-center gap-2 rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-900">
                    <input
                      type="checkbox"
                      checked={formData.current}
                      onChange={(event) => setFormData({ ...formData, current: event.target.checked })}
                      className="h-4 w-4 rounded border-gray-300 text-[#1dbf73] focus:ring-[#1dbf73]"
                    />
                    <span className="text-sm">I currently work here</span>
                  </label>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-gray-700">
                <Clock3 size={16} className="mt-0.5 shrink-0 text-blue-600" />
                <p>Nexlance profiles are easier to scan when the timeline is consistent and simple.</p>
              </div>
            </SectionCard>

            <SectionCard title="Description" description="Keep it concise and focused on the impact you delivered.">
              <FormTextarea
                label="What did you do?"
                className="min-h-[140px]"
                value={formData.description}
                onChange={handleFieldChange('description')}
                placeholder="Describe your responsibilities, projects, tools, and measurable results."
              />

              <div className="mt-2 flex justify-end text-xs text-gray-500">
                {descriptionCount}/2000 characters
              </div>
            </SectionCard>

            <SectionCard title="Skills & Industry" description="Add relevant skills and choose your industry.">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <SkillsInput value={formData.skills} onChange={(arr) => setFormData((p) => ({ ...p, skills: arr }))} />
                <FormSelect label="Industry (Optional)" value={formData.industry} onChange={handleFieldChange('industry')}>
                  <option value="">Select industry</option>
                  <option value="technology">Technology</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="business">Business</option>
                </FormSelect>
              </div>
            </SectionCard>
          </div>
        </div>

        
        <div className="sticky bottom-0 z-20 flex items-center justify-between gap-3 border-t border-gray-100 bg-white px-6 py-3">
          <div>
            <button type="button" onClick={onClose} className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 transition-colors duration-150 hover:bg-gray-200">
              Cancel
            </button>
          </div>

          <div>
            <button
              type="button"
              disabled={!canSubmit}
              onClick={() => onSave?.(formData)}
              className={`rounded-lg px-5 py-2 text-sm font-semibold transition-all duration-150 ${
                canSubmit ? 'bg-[#1dbf73] text-white hover:bg-[#17a962] cursor-pointer' : 'cursor-not-allowed bg-gray-200 text-gray-400'
              }`}
            >
              Add experience
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}
