import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Search, Bell, User, ChevronRight, ChevronLeft } from 'lucide-react';
import bg from "../images/bg.jpg"
import ProgressStepUI from './ProgressStepsUI';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return( 
        <>
        <h1 className=''>DASHBOARD</h1>
        <input type="text" placeholder='Type here to Search' className='form-control'/>
        <hr />
        <div className="row gy-4 ">
            <div className="col-lg-3">
                <div className="card" style={{ width: '18rem' }}>
                {/* Product Image */}
                <img
                    src={bg}
                    className="card-img-top"
                    alt="Product"
                    height={200}

                />

                {/* Card Content */}
                <div className="card-body">
                    <h5 className="card-title">Project Name</h5>
                    <a
                    href="/path-to-your-file.pdf"
                    download
                    className="btn w-100"
                    style={{
                        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
                    }}
                    >
                    Download 
                    </a>
                </div>
                </div>
            </div>
            <div className="col-lg-3">
                <div className="card" style={{ width: '18rem' }}>
                {/* Product Image */}
                <img
                    src={bg}
                    className="card-img-top"
                    alt="Product"
                    height={200}

                />

                {/* Card Content */}
                <div className="card-body">
                    <h5 className="card-title">Project Name</h5>
                    <a
                    href="/path-to-your-file.pdf"
                    download
                    className="btn w-100"
                    style={{
                        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
                    }}
                    >
                    Download 
                    </a>
                </div>
                </div>
            </div>
            <div className="col-lg-3">
                <div className="card" style={{ width: '18rem' }}>
                {/* Product Image */}
                <img
                    src={bg}
                    className="card-img-top"
                    alt="Product"
                    height={200}

                />

                {/* Card Content */}
                <div className="card-body">
                    <h5 className="card-title">Project Name</h5>
                    <a
                    href="/path-to-your-file.pdf"
                    download
                    className="btn w-100"
                    style={{
                        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
                    }}
                    >
                    Download 
                    </a>
                </div>
                </div>
            </div>
            <div className="col-lg-3">
                <div className="card" style={{ width: '18rem' }}>
                {/* Product Image */}
                <img
                    src={bg}
                    className="card-img-top"
                    alt="Product"
                    height={200}

                />

                {/* Card Content */}
                <div className="card-body">
                    <h5 className="card-title">Project Name</h5>
                    <a
                    href="/path-to-your-file.pdf"
                    download
                    className="btn w-100"
                    style={{
                        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
                    }}
                    >
                    Download 
                    </a>
                </div>
                </div>
            </div>
            <div className="col-lg-3">
                <div className="card" style={{ width: '18rem' }}>
                {/* Product Image */}
                <img
                    src={bg}
                    className="card-img-top"
                    alt="Product"
                    height={200}

                />

                {/* Card Content */}
                <div className="card-body">
                    <h5 className="card-title">Project Name</h5>
                    <a
                    href="/path-to-your-file.pdf"
                    download
                    className="btn w-100"
                    style={{
                        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
                    }}
                    >
                    Download 
                    </a>
                </div>
                </div>
            </div>
            
        </div>
 
        </>
        
        );
      case 'ncr':
        return (
          <>
          <h1>NCR Report</h1>
          <ProgressStepUI />
          </>
        );
        case 'checklist':
          return(
            <>
            <h1>Check List</h1>
          <ProgressStepUI />
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
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
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
          <div className="sidebar-logo" style={{ marginRight: '10px' }}>W</div>
          {!sidebarCollapsed && <div className="sidebar-title">WAVE INFRA</div>}
        </div>

        <div className="sidebar-menu">
          <div className="menu-section">
            <div
              className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
              >
              Dashboard
             
            </div>
            <div
              className={`menu-item ${activeTab === 'ncr' ? 'active' : ''}`}
              onClick={() => setActiveTab('ncr')}
              >
              NCR Report
            </div>
            <div
              className={`menu-item ${activeTab === 'checklist' ? 'active' : ''}`}
              onClick={() => setActiveTab('checklist')}
              >
              Check List
            </div>
            <hr />
            <div
              className={`menu-item ${activeTab === 'checklist' ? 'active' : ''}`}
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
