import React, { useState } from 'react';

const Checklist = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    project: '',
    openDate: '',
    closeDate: '',
    endDate: ''
  });

  const steps = [
    { id: 1, title: 'Choose Project', icon: 'folder2-open', field: 'project' },
    { id: 2, title: 'Choose Open Date', icon: 'calendar-plus', field: 'openDate' },
    { id: 3, title: 'Choose Close Date', icon: 'calendar-minus', field: 'closeDate' },
    { id: 4, title: 'Choose End Date', icon: 'calendar-check', field: 'endDate' },
    { id: 5, title: 'Finish', icon: 'check-circle', field: null }
  ];

  const handleDateChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = (step) => {
    switch (step) {
      case 1: return formData.project.trim() !== '';
      case 2: return formData.openDate !== '';
      case 3: return formData.closeDate !== '';
      case 4: return formData.endDate !== '';
      case 5: return true;
      default: return false;
    }
  };

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'active';
    return 'upcoming';
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center">
            <div className="mb-4">
              <i className="bi bi-folder2-open text-secondary" style={{ fontSize: '4rem' }}></i>
            </div>
            <h4 className="mb-3">Choose Project</h4>
            <p className="text-muted mb-4">Select or enter the project you are configuring</p>
            <div className="row justify-content-center">
              <div className="col-md-6">
                <select className='form-control' name="" id="" onChange={(e) => handleDateChange('project', e.target.value)}>
                    <option value="Project1">Project1</option>
                    <option value="Project2">Project2</option>
                    <option value="Project3">Project3</option>
                    <option value="Project4">Project4</option>
                    <option value="Project5">Project5</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="text-center">
            <div className="mb-4">
              <i className="bi bi-calendar-plus text-primary" style={{ fontSize: '4rem' }}></i>
            </div>
            <h4 className="mb-3">Choose Open Date</h4>
            <p className="text-muted mb-4">Select the date when your project or event will open</p>
            <div className="row justify-content-center">
              <div className="col-md-6">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  value={formData.openDate}
                  onChange={(e) => handleDateChange('openDate', e.target.value)}
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="text-center">
            <div className="mb-4">
              <i className="bi bi-calendar-minus text-warning" style={{ fontSize: '4rem' }}></i>
            </div>
            <h4 className="mb-3">Choose Close Date</h4>
            <p className="text-muted mb-4">Select the date when registration or submissions will close</p>
            <div className="row justify-content-center">
              <div className="col-md-6">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  value={formData.closeDate}
                  onChange={(e) => handleDateChange('closeDate', e.target.value)}
                  min={formData.openDate}
                />
              </div>
            </div>
            {formData.openDate && (
              <div className="mt-3">
                <small className="text-muted">
                  Open Date: <strong>{new Date(formData.openDate).toLocaleDateString()}</strong>
                </small>
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <div className="text-center">
            <div className="mb-4">
              <i className="bi bi-calendar-check text-info" style={{ fontSize: '4rem' }}></i>
            </div>
            <h4 className="mb-3">Choose End Date</h4>
            <p className="text-muted mb-4">Select the final end date for your project or event</p>
            <div className="row justify-content-center">
              <div className="col-md-6">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  value={formData.endDate}
                  onChange={(e) => handleDateChange('endDate', e.target.value)}
                  min={formData.closeDate}
                />
              </div>
            </div>
            <div className="mt-3">
              <div className="row">
                <div className="col-md-6">
                  <small className="text-muted">
                    Open: <strong>{formData.openDate ? new Date(formData.openDate).toLocaleDateString() : 'Not set'}</strong>
                  </small>
                </div>
                <div className="col-md-6">
                  <small className="text-muted">
                    Close: <strong>{formData.closeDate ? new Date(formData.closeDate).toLocaleDateString() : 'Not set'}</strong>
                  </small>
                </div>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="text-center">
            <div className="mb-4">
              <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '4rem' }}></i>
            </div>
            <h4 className="mb-3 text-success">Configuration Complete!</h4>
            <p className="text-muted mb-4">Your configuration has been successfully set up</p>
            <div className="card border-success">
              <div className="card-body">
                <h6 className="card-title">Summary</h6>
                <div className="row text-start">
                  <div className="col-md-3 mb-2">
                    <small className="text-muted d-block">Project</small>
                    <strong className="text-secondary">{formData.project}</strong>
                  </div>
                  <div className="col-md-3 mb-2">
                    <small className="text-muted d-block">Open Date</small>
                    <strong className="text-success">{new Date(formData.openDate).toLocaleDateString()}</strong>
                  </div>
                  <div className="col-md-3 mb-2">
                    <small className="text-muted d-block">Close Date</small>
                    <strong className="text-warning">{new Date(formData.closeDate).toLocaleDateString()}</strong>
                  </div>
                  <div className="col-md-3 mb-2">
                    <small className="text-muted d-block">End Date</small>
                    <strong className="text-info">{new Date(formData.endDate).toLocaleDateString()}</strong>
                  </div>
                </div>
              </div>
                <button className='btn' style={{
                        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
                    }} onClick={()=>{
                        alert("Downloaded")
                    }}>Download</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow-lg border-0 mb-4">
              <div className="card-body p-4">
                <div className="row">
                  {steps.map((step, index) => {
                    const status = getStepStatus(step.id);
                    return (
                      <div key={step.id} className="col-md text-center">
                        <div className="d-flex flex-column align-items-center">
                          <div
                            className={`rounded-circle d-flex align-items-center justify-content-center mb-2 ${
                              status === 'completed' ? 'bg-success text-white' :
                              status === 'active' ? 'bg-primary text-white' :
                              'bg-light text-muted border'
                            }`}
                            style={{ width: '50px', height: '50px' }}
                          >
                            {status === 'completed' ? (
                              <i className="bi bi-check-lg"></i>
                            ) : (
                              <i className={`bi bi-${step.icon}`}></i>
                            )}
                          </div>
                          <h6 className={`mb-1 ${
                            status === 'active' ? 'text-primary' :
                            status === 'completed' ? 'text-success' :
                            'text-muted'
                          }`}>
                            {step.title}
                          </h6>
                          <small className="text-muted">Step {step.id}</small>
                        </div>
                        {index < steps.length - 1 && (
                          <div className="d-none d-md-block position-relative">
                            <div
                              className={`position-absolute top-50 start-100 translate-middle-y ${
                                step.id < currentStep ? 'bg-success' : 'bg-light'
                              }`}
                              style={{
                                width: '100%',
                                height: '2px',
                                zIndex: -1
                              }}
                            ></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4">
                  <div className="progress" style={{ height: '4px' }}>
                    <div
                      className="progress-bar bg-primary"
                      style={{
                        width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                        transition: 'width 0.3s ease'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card shadow-lg border-0">
              <div className="card-body p-5">
                {renderStepContent()}
              </div>

              <div className="card-footer bg-white border-0 p-4">
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Previous
                  </button>

                  {currentStep < steps.length ? (
                    <button
                      className="btn btn-primary"
                      onClick={nextStep}
                      disabled={!isStepValid(currentStep)}
                    >
                      Next
                      <i className="bi bi-arrow-right ms-2"></i>
                    </button>
                  ) : (
                    <button
                      className="btn btn-success"
                      onClick={() => alert('Configuration saved successfully!')}
                    >
                      <i className="bi bi-check-circle me-2"></i>
                      Complete Setup
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.0/font/bootstrap-icons.min.css" rel="stylesheet" />

      <style jsx>{`
        .card {
          border-radius: 15px;
        }
        .btn {
          border-radius: 8px;
          padding: 12px 24px;
        }
        .form-control {
          border-radius: 8px;
        }
        .progress {
          border-radius: 4px;
        }
        .card-footer {
          border-radius: 0 0 15px 15px;
        }
      `}</style>
    </div>
  );
};

export default Checklist;
