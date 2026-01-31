
import { useState, useEffect } from 'react';
import initialData from '../data/applicants.json';

export const useApplicants = () => {
    const [applicants, setApplicants] = useState([]);
    const [filter, setFilter] = useState('all');
    const [stats, setStats] = useState({});

    useEffect(() => {
        // Load from local storage or fall back to JSON
        const saved = localStorage.getItem('applicants_data');
        if (saved) {
            setApplicants(JSON.parse(saved));
        } else {
            setApplicants(initialData);
        }
    }, []);

    useEffect(() => {
        // Save to local storage whenever applicants change
        if (applicants.length > 0) {
            localStorage.setItem('applicants_data', JSON.stringify(applicants));
        }

        // Calculate stats
        const newStats = {
            all: applicants.length,
            Director: applicants.filter(a => a.role_pref.includes('Director')).length,
            'تنظيم الداتا': applicants.filter(a => a.role_pref.includes('تنظيم الداتا')).length,
            'Post-Writer': applicants.filter(a => a.role_pref.includes('Post-Writer')).length,
            'مراجع ومقيم': applicants.filter(a => a.role_pref.includes('مراجع ومقيم')).length,
            'Notebooklm': applicants.filter(a => a.role_pref.includes('Notebook') || a.role_pref.includes('Notebooklm')).length,
        };
        setStats(newStats);

    }, [applicants]);

    const deleteApplicant = (id) => {
        if (window.confirm('Are you sure you want to delete this applicant?')) {
            setApplicants(prev => prev.filter(a => a.id !== id));
        }
    };

    const filteredApplicants = applicants.filter(a => {
        if (filter === 'all') return true;

        // Check if filter matches a group name
        if (a.groups && a.groups.includes(filter)) {
            return true;
        }

        if (filter === 'Notebooklm') {
            return a.role_pref.includes('Notebook') || a.role_pref.includes('Notebooklm');
        }
        return a.role_pref.includes(filter);
    });

    // Extract unique groups
    const uniqueGroups = [...new Set(applicants.flatMap(a => a.groups || []))].sort();

    const createGroup = (applicantIds, groupName) => {
        setApplicants(prev => prev.map(a => {
            if (applicantIds.includes(a.id)) {
                const currentGroups = a.groups || [];
                if (!currentGroups.includes(groupName)) {
                    return { ...a, groups: [...currentGroups, groupName] };
                }
            }
            return a;
        }));
    };

    const removeGroup = (applicantId, groupName) => {
        setApplicants(prev => prev.map(a => {
            if (a.id === applicantId && a.groups) {
                return { ...a, groups: a.groups.filter(g => g !== groupName) };
            }
            return a;
        }));
    };

    return {
        applicants,
        filteredApplicants,
        filter,
        setFilter,
        stats,
        deleteApplicant,
        createGroup,
        removeGroup,
        uniqueGroups
    };
};
