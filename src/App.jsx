
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ApplicantGrid from './components/ApplicantGrid';
import DetailModal from './components/DetailModal';
import { useApplicants } from './hooks/useApplicants';
import { Share2, CheckSquare, Square, X } from 'lucide-react';

function App() {
  const {
    filteredApplicants,
    filter,
    setFilter,
    stats,
    deleteApplicant,
    createGroup,
    removeGroup,
    uniqueGroups
  } = useApplicants();

  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  // Toggle selection mode
  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    setSelectedIds([]); // Clear on toggle
  };

  // Handle individual card selection
  const toggleSelectCard = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(item => item !== id));
    } else {
      setSelectedIds(prev => [...prev, id]);
    }
  };

  const handleGroupSelected = () => {
    if (selectedIds.length === 0) return;
    const name = prompt(`Enter group name for ${selectedIds.length} applicants:`);
    if (name) {
      createGroup(selectedIds, name);
      setSelectedIds([]);
      setIsSelectionMode(false);
    }
  };

  const totalShown = filteredApplicants.length;

  return (
    <div className="dashboard-layout">
      <Sidebar
        currentFilter={filter}
        onFilterChange={setFilter}
        counts={stats}
        groups={uniqueGroups}
      />

      <main className="main-content">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Applicants Dashboard</h1>
            <p style={{ color: '#94a3b8', margin: '0.5rem 0 0 0' }}>
              Viewing {totalShown} applicants in <span style={{ color: '#3b82f6' }}>{filter === 'all' ? 'All Roles' : filter}</span>
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            {!isSelectionMode ? (
              <button
                className="btn btn-primary"
                onClick={toggleSelectionMode}
                style={{ backgroundColor: '#334155' }} // Neutral color
              >
                <CheckSquare size={18} />
                Select & Group
              </button>
            ) : (
              <>
                <span style={{ alignSelf: 'center', fontWeight: 'bold' }}>
                  {selectedIds.length} Selected
                </span>
                <button
                  className="btn btn-primary"
                  disabled={selectedIds.length === 0}
                  onClick={handleGroupSelected}
                  style={{ opacity: selectedIds.length === 0 ? 0.5 : 1 }}
                >
                  <Share2 size={18} />
                  Group Selected
                </button>
                <button
                  className="btn btn-danger"
                  onClick={toggleSelectionMode}
                >
                  <X size={18} />
                  Cancel
                </button>
              </>
            )}
          </div>
        </header>

        <ApplicantGrid
          applicants={filteredApplicants}
          onCardClick={(app) => {
            if (isSelectionMode) {
              toggleSelectCard(app.id);
            } else {
              setSelectedApplicant(app);
            }
          }}
          onDelete={deleteApplicant}
          onRemoveGroup={removeGroup}
          selectedIds={selectedIds}
          isSelectionMode={isSelectionMode}
        />
      </main>

      <DetailModal
        applicant={selectedApplicant}
        onClose={() => setSelectedApplicant(null)}
      />
    </div>
  );
}

export default App;
