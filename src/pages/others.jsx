import React from 'react';
import { Calendar, Edit, User, Clipboard, Users, MessageSquare, Box, FileText, Star, CheckCircle, Briefcase, Settings } from 'lucide-react';

// JSON Data for Services
const services = [
    { icon: <Calendar size={48} />, name: 'Calendar', description: 'Manage appointments and schedules', color: 'from-blue-400 to-blue-600', link:"" },
    { icon: <Edit size={48} />, name: 'To-do', description: 'Organize daily medical tasks', color: 'from-blue-500 to-cyan-500', link:"" },
    // { icon: <User size={48} />, name: 'Contacts', description: 'Patient contact management', color: 'from-blue-600 to-indigo-600' },
    // { icon: <Clipboard size={48} />, name: 'Documents', description: 'Medical records & reports', color: 'from-cyan-500 to-blue-500' },
    { icon: <Users size={48} />, name: 'Patients', description: 'Staff management system', color: 'from-blue-400 to-blue-700', link:"/Patients" },
    // { icon: <MessageSquare size={48} />, name: 'Helpdesk', description: 'Patient support service', color: 'from-indigo-500 to-blue-500' },
    { icon: <Box size={48} />, name: 'Planning', description: 'Treatment planning tools', color: 'from-blue-500 to-blue-700', link:"" },
    { icon: <FileText size={48} />, name: 'Timesheets', description: 'Track working hours', color: 'from-cyan-400 to-blue-600', link:"" },
    // { icon: <Star size={48} />, name: 'Appraisals', description: 'Performance evaluation', color: 'from-blue-600 to-indigo-700' },
    // { icon: <CheckCircle size={48} />, name: 'Attendances', description: 'Monitor staff attendance', color: 'from-blue-400 to-cyan-600' },
    // { icon: <Briefcase size={48} />, name: 'Projects', description: 'Medical project tracking', color: 'from-indigo-600 to-blue-600' },
    { icon: <Settings size={48} />, name: 'Settings', description: 'System configuration', color: 'from-blue-700 to-indigo-800', link:"" }
];

function OthersPage() {
    return (
        <>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16 px-10">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-12 text-center">
                <h1 className="text-5xl font-bold text-blue-900 mb-4">
                    Medical Services Portal
                </h1>
                <p className="text-lg text-blue-600 max-w-2xl mx-auto">
                    Comprehensive healthcare management solutions for modern medical practices
                </p>
                <div className="w-24 h-1 bg-blue-500 mx-auto mt-6 rounded-full"></div>
            </div>

            {/* Services Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {services.map((service, index) => (
                    <div 
                        key={index} 
                        className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-blue-100 w-56 h-56" // Reduced width and height
                    >
                        {/* Gradient Background on Hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                        
                        {/* Card Content */}
                        <div className="relative z-10 flex flex-col items-center justify-center h-full">
                            {/* Icon Container */}
                            <div className="mb-4 text-blue-600 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-6">
                                {service.icon}
                            </div>
                            
                            {/* Service Name */}
                            <h3 className="text-lg font-bold text-blue-900 group-hover:text-white transition-colors duration-500 mb-2 text-center"> {/* Reduced font size */}
                                {service.name}
                            </h3>
                            
                            {/* Description - Hidden by default, shown on hover */}
                            <p className="text-xs text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center transform translate-y-4 group-hover:translate-y-0">
                                {service.description}
                            </p>

                        </div>

                        {/* Decorative Corner Element */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-blue-100 rounded-bl-full opacity-50 group-hover:opacity-0 transition-opacity duration-500"></div> {/* Reduced size */}
                        
                        {/* Bottom Accent Line */}
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </div>
                ))}
            </div>
        </div>

        </>
            );
}

export default OthersPage;
