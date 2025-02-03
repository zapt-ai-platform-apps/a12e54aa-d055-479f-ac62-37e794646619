import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GuidedSection } from "../components/RoleExplorer/GuidedSection";
import { CustomRoleForm } from "../features/roleExplorer/RoleExplorerComponents/Form/CustomRoleForm";
import LoadingSpinner from "../components/LoadingSpinner";

export default function RoleExplorer() {
  const navigate = useNavigate();
  const [customRole, setCustomRole] = React.useState('');

  const handleGuidedStart = () => navigate('/role-explorer/guided');
  const handleCustomStart = (e) => {
    e.preventDefault();
    if (customRole.trim()) {
      navigate(`/role-explorer/custom/${encodeURIComponent(customRole.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Role Explorer</h1>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
          
          <div className="space-y-6">
            <p className="text-gray-600 mb-8">
              Discover careers that align with your interests through either our guided AI assessment 
              or by exploring a specific role of your choice.
            </p>
            <GuidedSection onStart={handleGuidedStart} />
            <CustomRoleForm 
              onSubmit={handleCustomStart}
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}