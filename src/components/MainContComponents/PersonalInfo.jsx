import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateField } from '../../store/slices/personalInfoSlice';
import { FaUser, FaCamera } from 'react-icons/fa';

const PersonalInfo = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useAppDispatch();
  const personalInfo = useAppSelector((state) => {
    return state.personalInfo || {};
  });

  const toggleSection = () => {
    setIsExpanded(!isExpanded);
  };

  const handleInputChange = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if(!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      if(data.secure_url) {
        dispatch(updateField({ field: 'photo', value: data.secure_url}));
      }
    } catch(error) {
      console.error('Error uploading image: ', error);
      alert("There was an error uploading your photo. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const validatePersonalInfo = () => {
    const errors = {};
    
    if (!personalInfo?.fullName?.trim()) errors.fullName = 'Full name is required';
    if (!personalInfo?.jobTitle?.trim()) errors.jobTitle = 'Job title is required';
    if (!personalInfo?.email?.trim()) errors.email = 'Email is required';
    if (!personalInfo?.phone?.trim()) errors.phone = 'Phone number is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (personalInfo?.email && !emailRegex.test(personalInfo.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    const phoneRegex = /^[\d\s\-+()]{10,}$/;
    if (personalInfo?.phone && !phoneRegex.test(personalInfo.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    return errors;
  };

  const errors = validatePersonalInfo();

  const personalInfoArr = [
    {
      id: "fullName",
      placeholder: "John Doe",
      label: "Full Name",
      type: "text",
      required: true
    },
    {
      id: "jobTitle",
      placeholder: "Software Engineer",
      label: "Job Title",
      type: "text",
      required: true
    },
    {
      id: "email",
      placeholder: "john@example.com",
      label: "Email",
      type: "email",
      required: true
    },
    {
      id: "phone",
      placeholder: "+1 (555) 123-4567",
      label: "Phone",
      type: "tel",
      required: true
    },
  ];

  const additionalFields = [
    {
      id: "location",
      label: "Location",
      type: "text",
      placeholder: "City, State, Country",
      required: false
    },
    {
      id: "linkedIn",
      label: "LinkedIn Profile",
      type: "url",
      placeholder: "https://linkedin.com/in/your-profile",
      required: false
    },
    {
      id: "github",
      label: "GitHub Profile",
      type: "url",
      placeholder: "https://github.com/your-username",
      required: false
    },
    {
      id: "website",
      label: "Personal Website",
      type: "url",
      placeholder: "https://your-website.com",
      required: false
    }
  ];

  function getCompletionPercentage() {
    if (!personalInfo) return 0;
    
    const requiredFields = ['fullName', 'jobTitle', 'email', 'phone'];
    const filledRequired = requiredFields.filter(field => personalInfo[field]?.trim()).length;
    const optionalFields = ['location', 'summary', 'linkedIn', 'github', 'website'];
    const filledOptional = optionalFields.filter(field => personalInfo[field]?.trim()).length;

    const requiredWeight = 60;
    const optionalWeight = 40;

    const requiredScore = (filledRequired / requiredFields.length) * requiredWeight;
    const optionalScore = (filledOptional / optionalFields.length) * optionalWeight;
    
    return Math.min(100, requiredScore + optionalScore);
  }

  return (
    <div className='mb-6 border border-gray-200 rounded-md'>
      <button 
        className='flex justify-between items-center w-full px-4 py-3 text-left font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-t-md focus:outline-none'
        onClick={toggleSection}
        type="button"
      >
        <span>Personal Information</span>
        <svg 
          xmlns='http://www.w3.org/2000/svg' 
          className={`h-5 w-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          viewBox='0 0 20 20' 
          fill='currentColor'
        >
          <path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule="evenodd" />
        </svg>
      </button>

      <div className={`px-4 py-3 border-t border-gray-200 ${isExpanded ? 'block' : 'hidden'}`}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='md:col-span-2 flex items-center gap-4 p-2 rounded-md'>
            <div className='w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0'>
              {personalInfo.photo ? (
                <img src={personalInfo.photo} alt="Profile" className='w-full h-full object-cover' />
              ): (
                <FaUser className='text-gray-400 text-3xl' />
              )}
            </div>
            <div>
              <label htmlFor="photo-upload" className='cursor-pointer flex items-center px-4 py-2 bg-white text-gray-800 border border-gray-300 text-sm font-semibold rounded-md hover:bg-gray-100 shadow-sm'>
                <FaCamera className="mr-2" />
                {isUploading ? 'Uploading...' : 'Upload Photo'}
              </label>
              <input type="file" id='photo-upload' accept='image/png, image/jpeg' className='hidden' onChange={handlePhotoUpload} disabled={isUploading} />
              <p className='text-xs text-gray-500 mt-2'>Recommended: Square image (e.g., 400x400px).</p>
            </div>
          </div>
          {personalInfoArr.map((info) => (
            <div key={info.id}>
              <label htmlFor={info.id} className='block text-sm font-medium text-gray-700 mb-1'>
                {info.label}
                {info.required && <span className='text-red-500 ml-1'>*</span>}
              </label>
              <input 
                type={info.type} 
                id={info.id}
                value={personalInfo?.[info.id] || ''} 
                onChange={(e) => handleInputChange(info.id, e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] ${
                  errors[info.id] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={info.placeholder}
                required={info.required}
              />
              {errors[info.id] && (
                <p className='text-red-500 text-xs mt-1'>{errors[info.id]}</p>
              )}
            </div>
          ))}

          {additionalFields.map((field) => (
            <div key={field.id} className='md:col-span-2'>
              <label htmlFor={field.id} className='block text-sm font-medium text-gray-700 mb-1'>
                {field.label}
                {field.required && <span className='text-red-500 ml-1'>*</span>}
              </label>
              <input 
                type={field.type} 
                id={field.id}
                value={personalInfo?.[field.id] || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] ${
                  errors[field.id] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={field.placeholder}
                required={field.required}
              />
              {errors[field.id] && (
                <p className='text-red-500 text-xs mt-1'>{errors[field.id]}</p>
              )}
            </div>
          ))}

          <div className='md:col-span-2'>
            <label htmlFor="summary" className='block text-sm font-medium text-gray-700 mb-1'>
              Professional Summary
            </label>
            <textarea 
              id="summary"
              rows={4}
              value={personalInfo?.summary || ''}
              onChange={(e) => handleInputChange('summary', e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]' 
              placeholder='Brief professional summary highlighting your key skills, experience, and career objectives...'
            />
            <p className='text-xs text-gray-500 mt-1'>
              {personalInfo?.summary ? personalInfo.summary.length : 0}/500 characters
            </p>
          </div>
        </div>

        <div className='mt-4 p-3 bg-blue-50 rounded-md'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-blue-700'>
                <strong>Profile Completion:</strong> {Math.round(getCompletionPercentage())}%
              </p>
              <div className='w-full bg-blue-200 rounded-full h-2 mt-1'>
                <div 
                  className='bg-blue-600 h-2 rounded-full transition-all duration-300'
                  style={{ width: `${getCompletionPercentage()}%` }}
                ></div>
              </div>
            </div>
            {getCompletionPercentage() === 100 && (
              <div className='text-green-600'>
                <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;