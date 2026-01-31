
import React from 'react';
import { Trash2, Star, CheckCircle, X } from 'lucide-react';

const ApplicantCard = ({ applicant, onClick, onDelete, onRemoveGroup, isSelected, isSelectionMode }) => {
    return (
        <div
            className="card"
            onClick={onClick}
            style={{
                borderColor: isSelected ? '#3b82f6' : 'var(--border-color)',
                backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.05)' : 'var(--bg-card)',
                position: 'relative'
            }}
        >
            {isSelectionMode && (
                <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                    <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: isSelected ? 'none' : '2px solid #64748b',
                        backgroundColor: isSelected ? '#3b82f6' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {isSelected && <CheckCircle size={14} color="white" />}
                    </div>
                </div>
            )}

            <div className="card-header">
                <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: isSelectionMode ? '25px' : '0' }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}>{applicant.name}</h3>
                    <span style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>
                        ID: {applicant.seat_num || 'N/A'}
                    </span>
                </div>
                {parseInt(applicant.da7ee7) > 7 && (
                    <Star size={18} color="#f59e0b" fill="#f59e0b" />
                )}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <span className="badge badge-da7ee7">
                    دحيح: {applicant.da7ee7}
                </span>
                {applicant.in_pre_team === 'نعم' && (
                    <span className="badge" style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                        Pre-Team 🏅
                    </span>
                )}
            </div>

            <div style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '1rem', height: '2.5em', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {applicant.role_pref}
            </div>

            {/* Group Badges if any */}
            {applicant.groups && applicant.groups.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '1rem' }}>
                    {applicant.groups.map(g => (
                        <span key={g} className="group-badge" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            {g}
                            <X
                                size={12}
                                style={{ cursor: 'pointer', opacity: 0.7 }}
                                onMouseEnter={(e) => e.target.style.opacity = 1}
                                onMouseLeave={(e) => e.target.style.opacity = 0.7}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // Optional confirming, but user asked for functionality so maybe quick remove is better. 
                                    // Let's add simple confirm to avoid accidental clicks
                                    if (window.confirm(`Remove from group '${g}'?`)) {
                                        onRemoveGroup(applicant.id, g);
                                    }
                                }}
                            />
                        </span>
                    ))}
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    {applicant.course_or_data}
                </span>
                {!isSelectionMode && (
                    <button
                        className="btn btn-danger"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(applicant.id);
                        }}
                        style={{ padding: '0.25rem 0.5rem' }}
                    >
                        <Trash2 size={16} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ApplicantCard;
