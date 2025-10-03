import React, { useState } from 'react';
import { Edit2, Save, X, Plus, ArrowRight, Trash2, Pill, User, Calendar, Clock, FileText, Printer, Stethoscope, Upload, CheckCircle, Share2, Mail, Link, Download } from 'lucide-react';

const PrescriptionManager = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedProviders, setSelectedProviders] = useState([]); // New state for selected providers
  const [showSendSuccess, setShowSendSuccess] = useState(false); // New state for send success message
  const [patientInfo, setPatientInfo] = useState({
    name: 'Sarah Johnson',
    age: 42,
    gender: 'Female',
    id: 'PT-2024-1847',
    date: '2025-09-30',
    diagnosis: 'Acute Bronchitis with mild fever'
  });

  // Mock providers data (replace with real data or API call)
  const providers = [
    { id: 1, name: 'City Pharmacy', type: 'Pharmacy' },
    { id: 2, name: 'Dr. Emily Watson', type: 'Doctor' },
    { id: 3, name: 'HealthCRM System', type: 'CRM' },
    { id: 4, name: 'Downtown Clinic', type: 'Clinic' },
    { id: 5, name: 'MediSync CRM', type: 'CRM' }
  ];

  // Loading effect
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

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

  const handleEdit = () => {
    setIsEditing(true);
    setEditedMeds([...medications]);
    setEditedPatient({...patientInfo});
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

  // Share functions
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

  // Handle provider selection
  const handleProviderSelect = (providerId) => {
    setSelectedProviders(prev =>
      prev.includes(providerId)
        ? prev.filter(id => id !== providerId)
        : [...prev, providerId]
    );
  };

  // Handle send to all providers
  const handleSendToAll = () => {
    if (selectedProviders.length === 0) {
      alert('Please select at least one provider.');
      return;
    }
    // Placeholder: Implement actual sending logic (e.g., API call)
    setShowSendSuccess(true);
    setTimeout(() => {
      setShowSendSuccess(false);
      setShowShareModal(false);
      setSelectedProviders([]);
    }, 3000);
  };

  const currentPatient = isEditing ? editedPatient : patientInfo;
  const currentMeds = isEditing ? editedMeds : medications;

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 animate-spin-slow">
              <div className="w-32 h-32 border-4 border-teal-200 border-t-teal-600 rounded-full"></div>
            </div>
            <div className="relative w-32 h-32 flex items-center justify-center animate-pulse-slow">
              <Stethoscope className="w-16 h-16 text-teal-600" strokeWidth={2.5} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Prescription</h2>
          <p className="text-gray-600">Please wait while we prepare your document...</p>
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Processing Overlay */}
        {isProcessing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 text-center max-w-sm">
              <div className="animate-spin w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Processing Prescription</h3>
              <p className="text-gray-600">Analyzing and updating medications...</p>
            </div>
          </div>
        )}

        {/* Success Popup */}
        {showUploadSuccess && (
          <div className="fixed top-6 right-6 bg-white rounded-lg shadow-lg border-2 border-green-500 p-6 z-50 animate-slide-in max-w-md">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Prescription Updated!</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Your old prescription has been processed successfully.
                </p>
                <div className="bg-green-50 border border-green-200 rounded p-3 text-xs text-green-800">
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
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4 animate-slide-in">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Share2 className="w-6 h-6 text-teal-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Share Prescription</h2>
                </div>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Send Success Message */}
              {showSendSuccess && (
                <div className="mb-4 bg-green-50 border border-green-200 rounded p-3 text-sm text-green-800 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  <span>Prescription sent to {selectedProviders.length} provider(s) successfully!</span>
                </div>
              )}

              <div className="space-y-6">
                {/* Share Options */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Share Via</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={handleShareWhatsApp}
                      className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-all duration-200 border border-green-200"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.134.297-.347.446-.52.149-.174.297-.347.447-.52.149-.173.198-.297.297-.495.099-.198.05-.371-.025-.52-.074-.149-.669-.669-.916-.983-.247-.315-.446-.744-.596-.893-.149-.149-.297-.099-.446-.099-.149 0-.347.074-.521.223-.173.148-.668.645-.94.99-.272.347-.669 1.01-.743 1.733-.074.722.446 1.414.892 1.937.446.52 1.938 3.134 4.702 4.398.99.495 1.758.644 2.36.744.595.099 1.136.05 1.56-.099.426-.148 1.306-.595 1.504-.893.198-.297.297-.645.148-.893z"/>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                      </svg>
                      <span>WhatsApp</span>
                    </button>
                    <button
                      onClick={handleShareDrive}
                      className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-all duration-200 border border-blue-200"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l10.39 18H1.61L12 2zm0 2.39L3.61 18h16.78L12 4.39z"/>
                        <path d="M8.68 17l3.32-5.73 3.32 5.73H8.68z"/>
                      </svg>
                      <span>Google Drive</span>
                    </button>
                    <button
                      onClick={handleShareEmail}
                      className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200 border border-gray-200"
                    >
                      <Mail className="w-5 h-5" />
                      <span>Email</span>
                    </button>
                    <button
                      onClick={handleDownloadPDF}
                      className="flex items-center justify-center space-x-2 px-4 py-3 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-all duration-200 border border-teal-200"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>

                {/* Connect to Others */}
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Connect to Others</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {providers.map(provider => (
                      <label key={provider.id} className="flex items-center space-x-3 p-2 hover:bg-teal-50 rounded-lg transition-all duration-200">
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
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 mt-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    disabled={selectedProviders.length === 0}
                  >
                    <Link className="w-5 h-5" />
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

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-teal-50 rounded-lg">
                <FileText className="w-8 h-8 text-teal-600" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Medical Prescription</h1>
                <p className="text-base text-gray-500 mt-1">Dr. Michael Chen • General Physician</p>
              </div>
            </div>
            <div className="flex items-center">
              {!isEditing ? (
                <div className="inline-flex rounded-lg shadow-sm">
                  <label className="flex items-center justify-center px-4 py-2 bg-blue-400 text-white hover:bg-blue-700 transition-all duration-200 font-medium cursor-pointer border-r border-blue-500 text-sm">
                    <span>Upload</span>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <button
                    onClick={handleEdit}
                    className="flex items-center justify-center px-4 py-2 bg-teal-600 text-white hover:bg-teal-700 transition-all duration-200 font-medium border-r border-teal-500 text-sm"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    <span>Edit</span>
                  </button>
                  <button className="flex items-center justify-center px-4 py-2 bg-white text-gray-700 rounded-r-lg hover:bg-gray-50 transition-all duration-200 font-medium border border-gray-300 text-sm">
                    <Printer className="w-4 h-4 mr-2" />
                    <span>Print</span>
                  </button>
                </div>
              ) : (
                <div className="inline-flex rounded-lg shadow-sm gap-3">
                  <button
                    onClick={handleCancel}
                    className="flex items-center justify-center px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-semibold"
                  >
                    <X className="w-5 h-5 mr-2" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center justify-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    <span>Save Changes</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
              Scroll down to review and finalize the prescription details.
        </p>
        {/* Patient Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Patient Information</h2>
            {isEditing && (
              <span className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-medium">
                Editing Mode
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={currentPatient.name}
                  onChange={(e) => handlePatientChange('name', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{currentPatient.name}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Patient ID</label>
              <div className="flex items-center space-x-2">
                <span className="text-gray-900 font-mono text-sm">{currentPatient.id}</span>
              </div>
            </div>

            <div>
              {isEditing ? (
                <input
                  type="number"
                  value={currentPatient.age}
                  onChange={(e) => handlePatientChange('age', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              ) : (
                <span className="text-gray-900">Age: {currentPatient.age} years</span>
              )}
            </div>

            <div>
              {isEditing ? (
                <select
                  value={currentPatient.gender}
                  onChange={(e) => handlePatientChange('gender', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              ) : (
                <span className="text-gray-900">Gender: {currentPatient.gender}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">{currentPatient.date}</span>
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Diagnosis</label>
              {isEditing ? (
                <textarea
                  value={currentPatient.diagnosis}
                  onChange={(e) => handlePatientChange('diagnosis', e.target.value)}
                  rows="2"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{currentPatient.diagnosis}</p>
              )}
            </div>
          </div>
        </div>

        {/* Medications */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Pill className="w-5 h-5 text-teal-600" />
              <h2 className="text-lg font-semibold text-gray-900">Prescribed Medications</h2>
            </div>
            {isEditing && (
              <button
                onClick={addMedication}
                className="flex items-center px-4 py-2.5 bg-gradient-to-r from-teal-50 to-teal-100 text-teal-700 rounded-xl hover:from-teal-100 hover:to-teal-200 transition-all duration-200 font-medium text-sm border border-teal-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Medication
              </button>
            )}
          </div>

          <div className="space-y-4">
            {currentMeds.map((med, index) => (
              <div key={med.id} className="border border-gray-200 rounded-lg p-5 hover:border-teal-200 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-semibold text-sm">
                      {index + 1}
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={med.name}
                        onChange={(e) => handleMedicationChange(med.id, 'name', e.target.value)}
                        placeholder="Medication name"
                        className="text-lg font-semibold text-gray-900 border border-gray-300 rounded px-3 py-1.5 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    ) : (
                      <h3 className="text-lg font-semibold text-gray-900">{med.name}</h3>
                    )}
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => deleteMedication(med.id)}
                      className="text-red-600 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Dosage</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={med.dosage}
                        onChange={(e) => handleMedicationChange(med.id, 'dosage', e.target.value)}
                        placeholder="e.g., 500mg"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{med.dosage}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Frequency</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={med.frequency}
                        onChange={(e) => handleMedicationChange(med.id, 'frequency', e.target.value)}
                        placeholder="e.g., Three times daily"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{med.frequency}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Duration</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={med.duration}
                        onChange={(e) => handleMedicationChange(med.id, 'duration', e.target.value)}
                        placeholder="e.g., 7 days"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                        {med.duration}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Instructions</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={med.instructions}
                        onChange={(e) => handleMedicationChange(med.id, 'instructions', e.target.value)}
                        placeholder="Special instructions"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-600 text-sm">{med.instructions}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* General Instructions */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">General Instructions</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-teal-600 mr-2">•</span>
                <span>Complete the full course of antibiotics even if symptoms improve</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-600 mr-2">•</span>
                <span>Drink plenty of fluids and get adequate rest</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-600 mr-2">•</span>
                <span>Follow up in 7 days or earlier if symptoms worsen</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-600 mr-2">•</span>
                <span>Contact immediately if you experience severe side effects or allergic reactions</span>
              </li>
            </ul>
          </div>

          {/* Doctor's Signature */}
          <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-end">
            <div>
              <p className="text-xs text-gray-500 mb-1">Prescribed by</p>
              <p className="font-semibold text-gray-900">Dr. Michael Chen</p>
              <p className="text-sm text-gray-600">License No: MD-45821</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 mb-1">Digital Signature</p>
              <div className="text-2xl font-serif text-teal-700 italic">M. Chen</div>
            </div>
          </div>
        </div>
      </div>
      <br />

      <center>
        <div className="inline-flex rounded-lg shadow-sm">
          <button
            onClick={handleCancel}
            className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-l-lg hover:bg-gray-50 transition-all duration-200 font-medium text-sm"
          >
            <X className="w-4 h-4 mr-2" />
            <span>Cancel</span>
          </button>
          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center justify-center px-4 py-2 bg-teal-600 text-white rounded-r-lg hover:bg-teal-700 transition-all duration-200 font-medium text-sm"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            <span>Next</span>
          </button>
        </div>
      </center>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(0.95);
          }
        }
        
        @keyframes slide-in {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PrescriptionManager;