import React, { useState } from 'react';
import { User, Calendar, FileText, Activity, AlertCircle, Phone, Mail, MapPin, Wine, Cigarette, Heart, Pill, ClipboardList, Clock, ArrowLeft, Search } from 'lucide-react';

const PatientManagementSystem = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample patients data
  const patientsData = [
    {
      id: 1,
      personalInfo: {
        name: "John Anderson",
        age: 45,
        gender: "Male",
        bloodGroup: "O+",
        phone: "+1 (555) 123-4567",
        email: "john.anderson@email.com",
        address: "123 Medical Street, Health City, HC 12345",
        photo: "https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png"
      },
      lifestyle: {
        alcoholic: "Occasional",
        smoker: "Non-smoker",
        allergies: ["Penicillin", "Peanuts"]
      },
      visits: [
        { id: 1, date: "2024-09-15", doctor: "Dr. Sarah Smith", reason: "Annual Checkup", status: "Completed" },
        { id: 2, date: "2024-07-22", doctor: "Dr. Michael Brown", reason: "Follow-up", status: "Completed" }
      ],
      prescriptions: [
        { id: 1, date: "2024-09-15", medication: "Lisinopril 10mg", dosage: "Once daily", duration: "30 days", prescribedBy: "Dr. Sarah Smith" },
        { id: 2, date: "2024-07-22", medication: "Metformin 500mg", dosage: "Twice daily", duration: "90 days", prescribedBy: "Dr. Michael Brown" }
      ],
      problems: [
        { id: 1, condition: "Hypertension", diagnosedDate: "2022-03-15", status: "Ongoing", severity: "Moderate" },
        { id: 2, condition: "Type 2 Diabetes", diagnosedDate: "2023-01-20", status: "Ongoing", severity: "Mild" }
      ]
    },
    {
      id: 2,
      personalInfo: {
        name: "Emily Rodriguez",
        age: 32,
        gender: "Female",
        bloodGroup: "A+",
        phone: "+1 (555) 234-5678",
        email: "emily.rodriguez@email.com",
        address: "456 Wellness Ave, Care Town, CT 23456",
        photo: "https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png"
      },
      lifestyle: {
        alcoholic: "Non-drinker",
        smoker: "Non-smoker",
        allergies: ["Latex"]
      },
      visits: [
        { id: 1, date: "2024-09-20", doctor: "Dr. Sarah Smith", reason: "Prenatal Checkup", status: "Completed" }
      ],
      prescriptions: [
        { id: 1, date: "2024-09-20", medication: "Prenatal Vitamins", dosage: "Once daily", duration: "90 days", prescribedBy: "Dr. Sarah Smith" }
      ],
      problems: [
        { id: 1, condition: "Pregnancy - 2nd Trimester", diagnosedDate: "2024-06-10", status: "Ongoing", severity: "Mild" }
      ]
    }
  ];

  const filteredPatients = patientsData.filter(patient =>
    patient.personalInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.personalInfo.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const PatientDashboard = ({ patient }) => {
    const [activeTab, setActiveTab] = useState('overview');

    const TabButton = ({ id, label, icon: Icon }) => (
      <button
        onClick={() => setActiveTab(id)}
        className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
          activeTab === id
            ? 'bg-blue-600 text-white shadow-md'
            : 'bg-white text-gray-600 hover:bg-blue-50'
        }`}
      >
        <Icon size={18} />
        <span className="hidden sm:inline">{label}</span>
      </button>
    );

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => setSelectedPatient(null)}
            className="mb-4 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft size={20} />
            Back to Patient List
          </button>

          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                src={patient.personalInfo.photo}
                alt="Patient"
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
              />
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{patient.personalInfo.name}</h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <User size={16} className="text-blue-600" />
                    {patient.personalInfo.age} years, {patient.personalInfo.gender}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart size={16} className="text-red-500" />
                    {patient.personalInfo.bloodGroup}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone size={16} className="text-blue-600" />
                    {patient.personalInfo.phone}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 bg-gray-100 p-2 rounded-xl">
            <TabButton id="overview" label="Overview" icon={ClipboardList} />
            <TabButton id="visits" label="Visits" icon={Calendar} />
            <TabButton id="prescriptions" label="Prescriptions" icon={Pill} />
            <TabButton id="problems" label="Problems" icon={Activity} />
          </div>

          {/* Content Area */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Patient Overview</h2>
                
                {/* Contact Information */}
                <div className="bg-blue-50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Mail className="text-blue-600" size={20} />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-start gap-2">
                      <Mail size={16} className="text-blue-600 mt-1" />
                      <div>
                        <p className="text-gray-500">Email</p>
                        <p className="text-gray-800 font-medium">{patient.personalInfo.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone size={16} className="text-blue-600 mt-1" />
                      <div>
                        <p className="text-gray-500">Phone</p>
                        <p className="text-gray-800 font-medium">{patient.personalInfo.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 md:col-span-2">
                      <MapPin size={16} className="text-blue-600 mt-1" />
                      <div>
                        <p className="text-gray-500">Address</p>
                        <p className="text-gray-800 font-medium">{patient.personalInfo.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lifestyle & Habits */}
                <div className="bg-blue-50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Activity className="text-blue-600" size={20} />
                    Lifestyle & Habits
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 flex items-center gap-3">
                      <Wine className="text-blue-600" size={24} />
                      <div>
                        <p className="text-xs text-gray-500">Alcohol</p>
                        <p className="font-semibold text-gray-800">{patient.lifestyle.alcoholic}</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 flex items-center gap-3">
                      <Cigarette className="text-blue-600" size={24} />
                      <div>
                        <p className="text-xs text-gray-500">Smoking</p>
                        <p className="font-semibold text-gray-800">{patient.lifestyle.smoker}</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 flex items-center gap-3">
                      <AlertCircle className="text-red-500" size={24} />
                      <div>
                        <p className="text-xs text-gray-500">Allergies</p>
                        <p className="font-semibold text-gray-800">{patient.lifestyle.allergies.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white">
                    <Calendar className="mb-2" size={24} />
                    <p className="text-3xl font-bold">{patient.visits.length}</p>
                    <p className="text-blue-100">Total Visits</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white">
                    <Pill className="mb-2" size={24} />
                    <p className="text-3xl font-bold">{patient.prescriptions.length}</p>
                    <p className="text-green-100">Prescriptions</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 text-white">
                    <Activity className="mb-2" size={24} />
                    <p className="text-3xl font-bold">{patient.problems.length}</p>
                    <p className="text-orange-100">Active Conditions</p>
                  </div>
                </div>
              </div>
            )}

            {/* Visits Tab */}
            {activeTab === 'visits' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Calendar className="text-blue-600" />
                  Visit History
                </h2>
                <div className="space-y-4">
                  {patient.visits.map(visit => (
                    <div key={visit.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock size={16} className="text-blue-600" />
                            <span className="font-semibold text-gray-800">{visit.date}</span>
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">{visit.status}</span>
                          </div>
                          <p className="text-gray-600 mb-1"><span className="font-medium">Doctor:</span> {visit.doctor}</p>
                          <p className="text-gray-600"><span className="font-medium">Reason:</span> {visit.reason}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Prescriptions Tab */}
            {activeTab === 'prescriptions' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Pill className="text-blue-600" />
                  Prescription History
                </h2>
                <div className="space-y-4">
                  {patient.prescriptions.map(rx => (
                    <div key={rx.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Pill className="text-blue-600" size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 text-lg mb-1">{rx.medication}</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                            <p><span className="font-medium">Dosage:</span> {rx.dosage}</p>
                            <p><span className="font-medium">Duration:</span> {rx.duration}</p>
                            <p><span className="font-medium">Date:</span> {rx.date}</p>
                            <p><span className="font-medium">Prescribed by:</span> {rx.prescribedBy}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Problems Tab */}
            {activeTab === 'problems' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Activity className="text-blue-600" />
                  Problem History
                </h2>
                <div className="space-y-4">
                  {patient.problems.map(problem => (
                    <div key={problem.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          problem.severity === 'Mild' ? 'bg-yellow-100' :
                          problem.severity === 'Moderate' ? 'bg-orange-100' : 'bg-red-100'
                        }`}>
                          <Activity className={`${
                            problem.severity === 'Mild' ? 'text-yellow-600' :
                            problem.severity === 'Moderate' ? 'text-orange-600' : 'text-red-600'
                          }`} size={24} />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h3 className="font-bold text-gray-800 text-lg">{problem.condition}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              problem.severity === 'Mild' ? 'bg-yellow-100 text-yellow-700' :
                              problem.severity === 'Moderate' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {problem.severity}
                            </span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                              {problem.status}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm">
                            <span className="font-medium">Diagnosed:</span> {problem.diagnosedDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const PatientList = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Patient Management</h1>
            <p className="text-gray-600">Select a patient to view their detailed information</p>
          </div>

          {/* Search Bar */}
          <div className="mb-6 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search patients by name or email..."
              value={searchTerm}
              onInput={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Patient Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.map(patient => (
              <div
                key={patient.id}
                onClick={() => setSelectedPatient(patient)}
                className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={patient.personalInfo.photo}
                    alt={patient.personalInfo.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
                      {patient.personalInfo.name}
                    </h3>
                    <p className="text-sm text-gray-500">{patient.personalInfo.age} years, {patient.personalInfo.gender}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Heart size={16} className="text-red-500" />
                    <span className="font-medium">Blood Group:</span> {patient.personalInfo.bloodGroup}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone size={16} className="text-blue-600" />
                    <span className="font-medium">Phone:</span> {patient.personalInfo.phone}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={16} className="text-blue-600" />
                    <span className="font-medium truncate">{patient.personalInfo.email}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{patient.visits.length}</p>
                      <p className="text-gray-500">Visits</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{patient.prescriptions.length}</p>
                      <p className="text-gray-500">Rx</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">{patient.problems.length}</p>
                      <p className="text-gray-500">Issues</p>
                    </div>
                  </div>
                </div>

                <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors">
                  View Details
                </button>
              </div>
            ))}
          </div>

          {filteredPatients.length === 0 && (
            <div className="text-center py-12">
              <User size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No patients found</h3>
              <p className="text-gray-500">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      {selectedPatient ? (
        <PatientDashboard patient={selectedPatient} />
      ) : (
        <PatientList />
      )}
    </div>
  );
};

export default PatientManagementSystem;