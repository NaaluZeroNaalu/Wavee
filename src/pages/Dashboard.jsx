import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Search, Bell, User, ChevronRight, ChevronLeft } from 'lucide-react';
import bg from "../images/bg.jpg"
import ProgressStepUI from './ProgressStepsUI';
import NCR from './NCR';
import Checklist from './Checklist';
import ParticleCircle from './test';
import HistoryPage from './History';
import OthersPage from './others';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return( 
        <>
        <h1 className='' >Speak</h1>
       <ParticleCircle />
        </>
        
        );
      case 'ncr':
        return (
          <>
          <h1>History</h1>
         <HistoryPage />
          </>
        );
      case 'others':
        return (
          <>
         <OthersPage />
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
    <div className="dashboard-container">
      <style jsx>{`
        /* All existing styles remain unchanged except for media queries and toggle state adjustments */
        .dashboard-container {
            display: flex;
            flex-direction: row;
            min-height: 100vh;
            }
            
            .sidebar {
          width: ${sidebarCollapsed ? '70px' : '250px'};
          background: #14A3C7;
          color: white;
          transition: width 0.3s ease;
          position: relative;
          }

          .menu-item {
            padding: 12px 20px;
            display: flex;
            align-items: center;
          cursor: pointer;
          color: white;
          background: transparent;
          }
          
          .menu-item.active {
            background: rgba(255, 255, 255, 0.2);
            font-weight: bold;
            }
            
            @media (max-width: 768px) {
                .dashboard-container {
                    flex-direction: column;
                    }
                    
                    .sidebar {
                        width: 100%;
                        height: auto;
                        }
                        
                        .main-content {
            margin-left: 0;
            }
        }
      `}</style>

      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header" style={{ padding: '20px', display: 'flex', alignItems: 'center' }}>
          <div className="sidebar-logo" style={{ marginRight: '10px' }}>Paarava.AI</div>
          
        </div>

        <div className="sidebar-menu">
          <div className="menu-section">
            <div
              className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
              >
              AI
             
            </div>
            <div
              className={`menu-item ${activeTab === 'ncr' ? 'active' : ''}`}
              onClick={() => setActiveTab('ncr')}
              >
              History
            </div>
            <div
              className={`menu-item ${activeTab === 'others' ? 'active' : ''}`}
              onClick={() => setActiveTab('others')}
              >
              Others
            </div>
            <hr />
            <div
              className={`menu-item ${activeTab === 'logout' ? 'active' : ''}`}
              onClick={() => {
                window.location.href = "/"
              }}
              >
              Logout
            </div>
          </div>
        </div>

        {/* <button 
          className="sidebar-toggle"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          {sidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button> */}
      </div>

      {/* Main Content */}
      <div className="main-content" style={{ flex: 1, padding: '20px' }}>
        {renderContent()}
      </div>
    </div>
</>
  );
};

export default Dashboard;
