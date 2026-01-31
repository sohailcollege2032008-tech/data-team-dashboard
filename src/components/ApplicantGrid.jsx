
import React from 'react';
import ApplicantCard from './ApplicantCard';

const ApplicantGrid = ({ applicants, onCardClick, onDelete, onRemoveGroup, selectedIds = [], isSelectionMode = false }) => {
    if (applicants.length === 0) {
        return <div style={{ textAlign: 'center', color: '#64748b', marginTop: '3rem' }}>No applicants found for this filter.</div>;
    }

    return (
        <div className="grid-container">
            {applicants.map(app => (
                <ApplicantCard
                    key={app.id}
                    applicant={app}
                    onClick={() => onCardClick(app)}
                    onDelete={onDelete}
                    onRemoveGroup={onRemoveGroup}
                    isSelected={selectedIds.includes(app.id)}
                    isSelectionMode={isSelectionMode}
                />
            ))}
        </div>
    );
};

export default ApplicantGrid;
