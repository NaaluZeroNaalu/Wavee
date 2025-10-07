import React, { useState } from 'react';
import { Edit2, Save, X, Plus, ArrowRight, Trash2, Pill, User, Calendar, Clock, FileText, Printer, Stethoscope, Upload, CheckCircle, Share2, Mail, Link, Download } from 'lucide-react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

const PrescriptionManager = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedProviders, setSelectedProviders] = useState([]);
  const [showSendSuccess, setShowSendSuccess] = useState(false);
  const [isGuideActive, setIsGuideActive] = useState(false);
  
  const [patientInfo, setPatientInfo] = useState({
    name: 'Sarah Johnson',
    age: 42,
    gender: 'Female',
    id: 'PT-2024-1847',
    date: '2025-09-30',
    diagnosis: 'Acute Bronchitis with mild fever'
  });

  const providers = [
    { id: 1, name: 'City Pharmacy', type: 'Pharmacy' },
    { id: 2, name: 'Dr. Emily Watson', type: 'Doctor' },
    { id: 3, name: 'HealthCRM System', type: 'CRM' },
    { id: 4, name: 'Downtown Clinic', type: 'Clinic' },
    { id: 5, name: 'MediSync CRM', type: 'CRM' }
  ];

  const [medications, setMedications] = useState([
    {
      id: 1,
      name: 'Amoxicillin',
      dosage: '500mg',
      frequency: 'Three times daily',
      duration: '7 days',
      instructions: 'Take after meals with water'
    },
    {
      id: 2,
      name: 'Paracetamol',
      dosage: '650mg',
      frequency: 'Every 6 hours as needed',
      duration: '5 days',
      instructions: 'For fever and pain relief'
    },
    {
      id: 3,
      name: 'Bromhexine',
      dosage: '8mg',
      frequency: 'Three times daily',
      duration: '5 days',
      instructions: 'Take with warm water'
    }
  ]);

  const [editedMeds, setEditedMeds] = useState([...medications]);
  const [editedPatient, setEditedPatient] = useState({...patientInfo});

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        startGuide();
      }, 1000);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const startGuide = () => {
    setIsGuideActive(true);
    
    const driverObj = driver({
      showProgress: true,
      showButtons: ['next', 'previous', 'close'],
      steps: [
        {
          popover: {
            title: '📋 Welcome to Prescription Manager',
            description: 'This is your AI-generated prescription based on the doctor-patient conversation. Let me show you how to review, edit, and share prescriptions.',
            position: 'center'
          }
        },
        {
          element: '#prescription-header',
          popover: {
            title: '📄 Prescription Header',
            description: 'This shows the prescription title and doctor information. The action buttons let you upload old prescriptions, edit details, or print the document.',
            position: 'bottom'
          }
        },
        {
          element: '#action-buttons',
          popover: {
            title: '🛠️ Action Buttons',
            description: 'Upload: Merge old prescriptions automatically. Edit: Modify any information. Print: Get a physical copy of the prescription.',
            position: 'bottom'
          }
        },
        {
          element: '#patient-info',
          popover: {
            title: '👤 Patient Information',
            description: 'All patient details are automatically filled from the conversation. You can edit any field if needed by clicking the Edit button.',
            position: 'bottom'
          }
        },
        {
          element: '#medications-section',
          popover: {
            title: '💊 Prescribed Medications',
            description: 'The AI has generated complete medication details including dosage, frequency, duration, and instructions. You can add, edit, or remove medications.',
            position: 'top'
          }
        },
        {
          element: '#general-instructions',
          popover: {
            title: '📝 General Instructions',
            description: 'Important guidelines for the patient to follow during treatment. These are standard instructions that apply to the entire prescription.',
            position: 'top'
          }
        },
        {
          element: '#doctor-signature',
          popover: {
            title: '✍️ Doctor\'s Signature',
            description: 'The prescription includes the doctor\'s credentials and digital signature for authenticity and legal compliance.',
            position: 'top'
          }
        },
        {
          element: '#final-actions',
          popover: {
            title: '📤 Share Prescription',
            description: 'Click Next to share this prescription via WhatsApp, email, Google Drive, or directly with pharmacies and CRM systems. Let\'s try it!',
            position: 'top',
            onNextClick: () => {
              driverObj.destroy();
              setIsGuideActive(false);
              setShowShareModal(true);
            }
          }
        }
      ],
      onDestroyStarted: () => {
        setIsGuideActive(false);
        driverObj.destroy();
      }
    });

    driverObj.drive();
  };

  const handleEdit = () => {
    if (!isGuideActive) {
      setIsEditing(true);
      setEditedMeds([...medications]);
      setEditedPatient({...patientInfo});
    }
  };

  const handleSave = () => {
    setMedications([...editedMeds]);
    setPatientInfo({...editedPatient});
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedMeds([...medications]);
    setEditedPatient({...patientInfo});
    setIsEditing(false);
  };

  const handleMedicationChange = (id, field, value) => {
    setEditedMeds(editedMeds.map(med => 
      med.id === id ? { ...med, [field]: value } : med
    ));
  };

  const handlePatientChange = (field, value) => {
    setEditedPatient({ ...editedPatient, [field]: value });
  };

  const addMedication = () => {
    const newMed = {
      id: Date.now(),
      name: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: ''
    };
    setEditedMeds([...editedMeds, newMed]);
  };

  const deleteMedication = (id) => {
    setEditedMeds(editedMeds.filter(med => med.id !== id));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsProcessing(true);
      setTimeout(() => {
        const updatedMeds = medications.map(med => {
          const updates = {
            1: { dosage: '750mg', duration: '10 days' },
            2: { frequency: 'Every 4 hours as needed', duration: '7 days' },
            3: { dosage: '12mg', instructions: 'Take with warm water before meals' }
          };
          return updates[med.id] ? { ...med, ...updates[med.id] } : med;
        });
        const newMed = {
          id: Date.now(),
          name: 'Cetirizine',
          dosage: '10mg',
          frequency: 'Once daily at bedtime',
          duration: '5 days',
          instructions: 'For allergy relief'
        };
        setMedications([...updatedMeds, newMed]);
        setEditedMeds([...updatedMeds, newMed]);
        setIsProcessing(false);
        setShowUploadSuccess(true);
        setTimeout(() => {
          setShowUploadSuccess(false);
        }, 3000);
      }, 2000);
    }
  };

  const handleShareWhatsApp = () => {
    const message = `Prescription for ${patientInfo.name}:\nDiagnosis: ${patientInfo.diagnosis}\nMedications:\n${medications.map(med => `- ${med.name}: ${med.dosage}, ${med.frequency}, ${med.duration}`).join('\n')}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setShowShareModal(false);
  };

  const handleShareDrive = () => {
    alert('Google Drive sharing not implemented in this demo.');
    setShowShareModal(false);
  };

  const handleShareEmail = () => {
    const subject = `Prescription for ${patientInfo.name}`;
    const body = `Diagnosis: ${patientInfo.diagnosis}\n\nMedications:\n${medications.map(med => `- ${med.name}: ${med.dosage}, ${med.frequency}, ${med.duration}`).join('\n')}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setShowShareModal(false);
  };

  const handleDownloadPDF = () => {
    alert('PDF download not implemented in this demo.');
    setShowShareModal(false);
  };

  const handleProviderSelect = (providerId) => {
    setSelectedProviders(prev =>
      prev.includes(providerId)
        ? prev.filter(id => id !== providerId)
        : [...prev, providerId]
    );
  };

  const handleSendToAll = () => {
    if (selectedProviders.length === 0) {
      alert('Please select at least one provider.');
      return;
    }
    setShowSendSuccess(true);
    setTimeout(() => {
      setShowSendSuccess(false);
      setShowShareModal(false);
      setSelectedProviders([]);
    }, 3000);
  };

  const currentPatient = isEditing ? editedPatient : patientInfo;
  const currentMeds = isEditing ? editedMeds : medications;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 animate-spin">
              <div className="w-24 h-24 lg:w-32 lg:h-32 border-4 border-teal-200 border-t-teal-600 rounded-full"></div>
            </div>
            <div className="relative w-24 h-24 lg:w-32 lg:h-32 flex items-center justify-center">
              <Stethoscope className="w-12 h-12 lg:w-16 lg:h-16 text-teal-600" strokeWidth={2.5} />
            </div>
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">Loading Prescription</h2>
          <p className="text-sm lg:text-base text-gray-600">Please wait while we prepare your document...</p>
          <div className="flex justify-center space-x-2 mt-6">
            <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }

        :global(.driver-popover) {
          background: white !important;
          color: #1f2937 !important;
          border-radius: 12px !important;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2) !important;
        }
        
        :global(.driver-popover-title) {
          font-size: 18px !important;
          font-weight: 700 !important;
          color: #111827 !important;
          margin-bottom: 8px !important;
        }
        
        :global(.driver-popover-description) {
          font-size: 14px !important;
          color: #4b5563 !important;
          line-height: 1.6 !important;
        }
        
        :global(.driver-popover-footer) {
          margin-top: 20px !important;
          display: flex !important;
          gap: 10px !important;
        }
        
        :global(.driver-popover-prev-btn) {
          background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%) !important;
          color: white !important;
          border: none !important;
          padding: 12px 24px !important;
          border-radius: 10px !important;
          font-size: 14px !important;
          font-weight: 700 !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          min-width: 100px !important;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
        }
        
        :global(.driver-popover-prev-btn:hover) {
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 16px rgba(107, 114, 128, 0.5) !important;
        }
        
        :global(.driver-popover-next-btn) {
          background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%) !important;
          color: white !important;
          border: none !important;
          padding: 12px 24px !important;
          border-radius: 10px !important;
          font-size: 14px !important;
          font-weight: 700 !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          min-width: 100px !important;
          box-shadow: 0 4px 6px rgba(20, 184, 166, 0.3) !important;
        }
        
        :global(.driver-popover-next-btn:hover) {
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 16px rgba(20, 184, 166, 0.6) !important;
        }
        
        :global(.driver-popover-close-btn) {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%) !important;
          color: white !important;
          border: none !important;
          padding: 12px 24px !important;
          border-radius: 10px !important;
          font-size: 14px !important;
          font-weight: 700 !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          min-width: 100px !important;
          box-shadow: 0 4px 6px rgba(239, 68, 68, 0.3) !important;
        }
        
        :global(.driver-popover-close-btn:hover) {
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 16px rgba(239, 68, 68, 0.6) !important;
        }
        
        :global(.driver-popover-progress-text) {
          font-size: 13px !important;
          font-weight: 600 !important;
          color: #14b8a6 !important;
        }

        @media (min-width: 1024px) {
          :global(.driver-popover-prev-btn),
          :global(.driver-popover-next-btn),
          :global(.driver-popover-close-btn) {
            padding: 16px 32px !important;
            font-size: 16px !important;
            min-width: 140px !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
        <div className="max-w-5xl mx-auto">
          {isProcessing && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-6 lg:p-8 text-center max-w-sm mx-4">
                <div className="animate-spin w-12 h-12 lg:w-16 lg:h-16 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">Processing Prescription</h3>
                <p className="text-sm lg:text-base text-gray-600">Analyzing and updating medications...</p>
              </div>
            </div>
          )}

          {showUploadSuccess && (
            <div className="fixed top-3 right-3 lg:top-6 lg:right-6 bg-white rounded-lg shadow-lg border-2 border-green-500 p-4 lg:p-6 z-50 animate-slide-in max-w-sm lg:max-w-md">
              <div className="flex items-start space-x-3 lg:space-x-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 lg:w-8 lg:h-8 text-green-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-1">Prescription Updated!</h3>
                  <p className="text-xs lg:text-sm text-gray-600 mb-2">
                    Your old prescription has been processed successfully.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded p-2 lg:p-3 text-xs text-green-800">
                    <p className="font-medium mb-1">Changes detected:</p>
                    <ul className="space-y-1">
                      <li>• Amoxicillin dosage increased to 750mg</li>
                      <li>• Paracetamol frequency adjusted</li>
                      <li>• Cetirizine added for allergy relief</li>
                    </ul>
                  </div>
                </div>
                <button
                  onClick={() => setShowUploadSuccess(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4 lg:w-5 lg:h-5" />
                </button>
              </div>
            </div>
          )}

          {showShareModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl p-4 lg:p-6 max-w-md w-full animate-slide-in max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4 lg:mb-6">
                  <div className="flex items-center space-x-2 lg:space-x-3">
                    <Share2 className="w-5 h-5 lg:w-6 lg:h-6 text-teal-600" />
                    <h2 className="text-lg lg:text-xl font-semibold text-gray-900">Share Prescription</h2>
                  </div>
                  <button
                    onClick={() => setShowShareModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {showSendSuccess && (
                  <div className="mb-4 bg-green-50 border border-green-200 rounded p-3 text-xs lg:text-sm text-green-800 flex items-center">
                    <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 mr-2 text-green-500 flex-shrink-0" />
                    <span>Prescription sent to {selectedProviders.length} provider(s) successfully!</span>
                  </div>
                )}

                <div className="space-y-4 lg:space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Share Via</h3>
                    <div className="grid grid-cols-2 gap-2 lg:gap-4">
                      <button
                        onClick={handleShareWhatsApp}
                        className="flex items-center justify-center space-x-1 lg:space-x-2 px-3 py-2 lg:px-4 lg:py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-all duration-200 border border-green-200 text-xs lg:text-sm"
                      >
                        <svg className="w-4 h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.134.297-.347.446-.52.149-.174.297-.347.447-.52.149-.173.198-.297.297-.495.099-.198.05-.371-.025-.52-.074-.149-.669-.669-.916-.983-.247-.315-.446-.744-.596-.893-.149-.149-.297-.099-.446-.099-.149 0-.347.074-.521.223-.173.148-.668.645-.94.99-.272.347-.669 1.01-.743 1.733-.074.722.446 1.414.892 1.937.446.52 1.938 3.134 4.702 4.398.99.495 1.758.644 2.36.744.595.099 1.136.05 1.56-.099.426-.148 1.306-.595 1.504-.893.198-.297.297-.645.148-.893z"/>
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                        </svg>
                        <span>WhatsApp</span>
                      </button>
                      <button
                        onClick={handleShareDrive}
                        className="flex items-center justify-center space-x-1 lg:space-x-2 px-3 py-2 lg:px-4 lg:py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-all duration-200 border border-blue-200 text-xs lg:text-sm"
                      >
                        <svg className="w-4 h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l10.39 18H1.61L12 2zm0 2.39L3.61 18h16.78L12 4.39z"/>
                          <path d="M8.68 17l3.32-5.73 3.32 5.73H8.68z"/>
                        </svg>
                        <span>Drive</span>
                      </button>
                      <button
                        onClick={handleShareEmail}
                        className="flex items-center justify-center space-x-1 lg:space-x-2 px-3 py-2 lg:px-4 lg:py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200 border border-gray-200 text-xs lg:text-sm"
                      >
                        <Mail className="w-4 h-4 lg:w-5 lg:h-5" />
                        <span>Email</span>
                      </button>
                      <button
                        onClick={handleDownloadPDF}
                        className="flex items-center justify-center space-x-1 lg:space-x-2 px-3 py-2 lg:px-4 lg:py-3 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-all duration-200 border border-teal-200 text-xs lg:text-sm"
                      >
                        <Download className="w-4 h-4 lg:w-5 lg:h-5" />
                        <span>PDF</span>
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Connect to Others</h3>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {providers.map(provider => (
                        <label key={provider.id} className="flex items-center space-x-3 p-2 hover:bg-teal-50 rounded-lg transition-all duration-200 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedProviders.includes(provider.id)}
                            onChange={() => handleProviderSelect(provider.id)}
                            className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{provider.name}</p>
                            <p className="text-xs text-gray-500">{provider.type}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                    <button
                      onClick={handleSendToAll}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 lg:py-3 mt-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm lg:text-base"
                      disabled={selectedProviders.length === 0}
                    >
                      <Link className="w-4 h-4 lg:w-5 lg:h-5" />
                      <span>Send to All ({selectedProviders.length})</span>
                    </button>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Share with selected pharmacies, doctors, or CRM systems.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div id="prescription-header" className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6 mb-4 lg:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3 lg:space-x-4">
                <div className="p-2 lg:p-4 bg-teal-50 rounded-lg">
                  <FileText className="w-6 h-6 lg:w-8 lg:h-8 text-teal-600" />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-4xl font-bold text-gray-900">Medical Prescription</h1>
                  <p className="text-xs lg:text-base text-gray-500 mt-0.5 lg:mt-1">Dr. Anjali • General Physician</p>
                </div>
              </div>
              <div id="action-buttons" className="flex items-center">
                {!isEditing ? (
                  <div className="inline-flex rounded-lg shadow-sm w-full sm:w-auto">
                    <label className="flex items-center justify-center px-3 py-2 lg:px-4 lg:py-2 bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 font-medium cursor-pointer rounded-l-lg border-r border-blue-500 text-xs lg:text-sm">
                      <span className="hidden sm:inline">Upload</span>
                      <span className="sm:hidden">Up</span>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                    <button
                      onClick={handleEdit}
                      className="flex items-center justify-center px-3 py-2 lg:px-4 lg:py-2 bg-teal-600 text-white hover:bg-teal-700 transition-all duration-200 font-medium border-r border-teal-500 text-xs lg:text-sm">
                      <Edit2 className="w-3 h-3 lg:w-4 lg:h-4 sm:mr-2" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button className="flex items-center justify-center px-3 py-2 lg:px-4 lg:py-2 bg-white text-gray-700 rounded-r-lg hover:bg-gray-50 transition-all duration-200 font-medium border border-gray-300 text-xs lg:text-sm">
                      <Printer className="w-3 h-3 lg:w-4 lg:h-4 sm:mr-2" />
                      <span className="hidden sm:inline">Print</span>
                    </button>
                  </div>
                ) : (
                  <div className="inline-flex rounded-lg shadow-sm gap-2 lg:gap-3 w-full sm:w-auto">
                    <button
                      onClick={handleCancel}
                      className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 lg:px-6 lg:py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-semibold text-sm lg:text-base"
                    >
                      <X className="w-4 h-4 lg:w-5 lg:h-5 sm:mr-2" />
                      <span className="hidden sm:inline">Cancel</span>
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 lg:px-6 lg:py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg text-sm lg:text-base"
                    >
                      <Save className="w-4 h-4 lg:w-5 lg:h-5 sm:mr-2" />
                      <span>Save</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div id="patient-info" className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6 mb-4 lg:mb-6">
            <div className="flex items-center space-x-2 lg:space-x-3 mb-3 lg:mb-4">
              <User className="w-5 h-5 lg:w-6 lg:h-6 text-teal-600" />
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Patient Information</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
              <div>
                <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={currentPatient.name}
                    onChange={(e) => handlePatientChange('name', e.target.value)}
                    className="w-full px-3 py-2 text-sm lg:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-sm lg:text-base text-gray-900 font-semibold">{currentPatient.name}</p>
                )}
              </div>
              <div>
                <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1">Patient ID</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={currentPatient.id}
                    onChange={(e) => handlePatientChange('id', e.target.value)}
                    className="w-full px-3 py-2 text-sm lg:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-sm lg:text-base text-gray-900 font-semibold">{currentPatient.id}</p>
                )}
              </div>
              <div>
                <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1">Age</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={currentPatient.age}
                    onChange={(e) => handlePatientChange('age', e.target.value)}
                    className="w-full px-3 py-2 text-sm lg:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-sm lg:text-base text-gray-900">{currentPatient.age} years</p>
                )}
              </div>
              <div>
                <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1">Gender</label>
                {isEditing ? (
                  <select
                    value={currentPatient.gender}
                    onChange={(e) => handlePatientChange('gender', e.target.value)}
                    className="w-full px-3 py-2 text-sm lg:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p className="text-sm lg:text-base text-gray-900">{currentPatient.gender}</p>
                )}
              </div>
              <div>
                <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1">Date</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={currentPatient.date}
                    onChange={(e) => handlePatientChange('date', e.target.value)}
                    className="w-full px-3 py-2 text-sm lg:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-sm lg:text-base text-gray-900">{currentPatient.date}</p>
                )}
              </div>
              <div>
                <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={currentPatient.diagnosis}
                    onChange={(e) => handlePatientChange('diagnosis', e.target.value)}
                    className="w-full px-3 py-2 text-sm lg:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-sm lg:text-base text-gray-900">{currentPatient.diagnosis}</p>
                )}
              </div>
            </div>
          </div>

          <div id="medications-section" className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6 mb-4 lg:mb-6">
            <div className="flex items-center justify-between mb-3 lg:mb-4">
              <div className="flex items-center space-x-2 lg:space-x-3">
                <Pill className="w-5 h-5 lg:w-6 lg:h-6 text-teal-600" />
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Prescribed Medications</h2>
              </div>
              {isEditing && (
                <button
                  onClick={addMedication}
                  className="flex items-center space-x-1 lg:space-x-2 px-3 py-1.5 lg:px-4 lg:py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-200 text-xs lg:text-sm"
                >
                  <Plus className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="hidden sm:inline">Add Medication</span>
                  <span className="sm:hidden">Add</span>
                </button>
              )}
            </div>
            <div className="space-y-3 lg:space-y-4">
              {currentMeds.map((med, index) => (
                <div key={med.id} className="border border-gray-200 rounded-lg p-3 lg:p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2 lg:mb-3">
                    <div className="flex items-center space-x-2 lg:space-x-3 flex-1">
                      <div className="flex items-center justify-center w-6 h-6 lg:w-8 lg:h-8 bg-teal-100 text-teal-600 rounded-full font-bold text-xs lg:text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      {isEditing ? (
                        <input
                          type="text"
                          value={med.name}
                          onChange={(e) => handleMedicationChange(med.id, 'name', e.target.value)}
                          placeholder="Medication name"
                          className="text-base lg:text-lg font-semibold px-2 lg:px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent flex-1"
                        />
                      ) : (
                        <h3 className="text-base lg:text-lg font-semibold text-gray-900">{med.name}</h3>
                      )}
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => deleteMedication(med.id)}
                        className="text-red-500 hover:text-red-700 transition-colors ml-2"
                      >
                        <Trash2 className="w-4 h-4 lg:w-5 lg:h-5" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Dosage</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={med.dosage}
                          onChange={(e) => handleMedicationChange(med.id, 'dosage', e.target.value)}
                          placeholder="e.g., 500mg"
                          className="w-full px-2 lg:px-3 py-1 text-xs lg:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-xs lg:text-sm text-gray-900">{med.dosage}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Frequency</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={med.frequency}
                          onChange={(e) => handleMedicationChange(med.id, 'frequency', e.target.value)}
                          placeholder="e.g., Three times daily"
                          className="w-full px-2 lg:px-3 py-1 text-xs lg:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-xs lg:text-sm text-gray-900">{med.frequency}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Duration</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={med.duration}
                          onChange={(e) => handleMedicationChange(med.id, 'duration', e.target.value)}
                          placeholder="e.g., 7 days"
                          className="w-full px-2 lg:px-3 py-1 text-xs lg:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-xs lg:text-sm text-gray-900">{med.duration}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Instructions</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={med.instructions}
                          onChange={(e) => handleMedicationChange(med.id, 'instructions', e.target.value)}
                          placeholder="Special instructions"
                          className="w-full px-2 lg:px-3 py-1 text-xs lg:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-xs lg:text-sm text-gray-900">{med.instructions}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="general-instructions" className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6 mb-4 lg:mb-6">
            <div className="flex items-center space-x-2 lg:space-x-3 mb-3 lg:mb-4">
              <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-teal-600" />
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900">General Instructions</h2>
            </div>
            <ul className="space-y-2 text-sm lg:text-base text-gray-700">
              <li className="flex items-start space-x-2">
                <span className="text-teal-600 mt-1">•</span>
                <span>Take all medications as prescribed, even if you start feeling better</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-teal-600 mt-1">•</span>
                <span>Stay well hydrated and get adequate rest</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-teal-600 mt-1">•</span>
                <span>Follow up if symptoms persist or worsen after 3 days</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-teal-600 mt-1">•</span>
                <span>Avoid smoking and alcohol during treatment</span>
              </li>
            </ul>
          </div>

          <div id="doctor-signature" className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6 mb-4 lg:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <p className="text-xs lg:text-sm text-gray-500 mb-1">Prescribed by</p>
                <p className="text-lg lg:text-xl font-bold text-gray-900">Dr. Anjali</p>
                <p className="text-xs lg:text-sm text-gray-600">General Physician</p>
                <p className="text-xs lg:text-sm text-gray-600">License No: MD-2019-4752</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs lg:text-sm text-gray-500 mb-1">Digital Signature</p>
                <div className="w-24 h-12 lg:w-32 lg:h-16 bg-teal-50 border-2 border-teal-200 rounded flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 lg:w-8 lg:h-8 text-teal-600" />
                </div>
              </div>
            </div>
          </div>

          <div id="final-actions" className="flex justify-end">
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center space-x-2 px-6 py-3 lg:px-8 lg:py-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl text-sm lg:text-lg w-full sm:w-auto justify-center"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrescriptionManager;