
import React from 'react';
import { X, Mail, Phone, Calendar, Book, MessageCircle } from 'lucide-react';

const DetailModal = ({ applicant, onClose }) => {
    if (!applicant) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{applicant.name}</h2>
                        <p style={{ color: '#94a3b8', marginTop: '0.25rem' }}>Seat: {applicant.seat_num}</p>
                    </div>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                        <X size={24} />
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>

                    <div style={{ gridColumn: '1 / -1', background: '#334155', padding: '1rem', borderRadius: '8px' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Book size={18} /> Role Preference
                        </h3>
                        <p>{applicant.role_pref}</p>
                        <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                            <span className="badge badge-role">{applicant.course_or_data}</span>
                            <span className="badge badge-da7ee7">Da7ee7 Score: {applicant.da7ee7}</span>
                        </div>
                    </div>

                    <div>
                        <h4 style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>Contact Info</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Mail size={16} color="#3b82f6" /> {applicant.email}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Phone size={16} color="#10b981" /> {applicant.phone}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>Availability</h4>
                        <div style={{ fontSize: '0.9rem' }}>
                            <p><strong>School:</strong> {applicant.availability_school}</p>
                            <p><strong>Vacation:</strong> {applicant.availability_vacation}</p>
                        </div>
                    </div>

                    <div style={{ gridColumn: '1 / -1' }}>
                        <h4 style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>Skills</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {applicant.skills.map((skill, idx) => (
                                <span key={idx} style={{
                                    backgroundColor: '#1e293b',
                                    border: '1px solid #475569',
                                    padding: '4px 12px',
                                    borderRadius: '6px',
                                    fontSize: '0.9rem'
                                }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {applicant.notes && (
                        <div style={{ gridColumn: '1 / -1' }}>
                            <h4 style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>Motivation</h4>
                            <p style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', lineHeight: '1.6' }}>
                                {applicant.notes}
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default DetailModal;
