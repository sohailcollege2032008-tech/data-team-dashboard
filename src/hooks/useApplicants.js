
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useApplicants = () => {
    const [applicants, setApplicants] = useState([]);
    const [filter, setFilter] = useState('all');
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchApplicants = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('applicants')
            .select('*')
            .order('da7ee7', { ascending: false }); // Optional sorting

        if (error) {
            console.error('Error fetching applicants:', error);
        } else {
            setApplicants(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchApplicants();
    }, []);

    useEffect(() => {
        // Calculate stats
        const newStats = {
            all: applicants.length,
            Director: applicants.filter(a => a.role_pref && a.role_pref.includes('Director')).length,
            'تنظيم الداتا': applicants.filter(a => a.role_pref && a.role_pref.includes('تنظيم الداتا')).length,
            'Post-Writer': applicants.filter(a => a.role_pref && a.role_pref.includes('Post-Writer')).length,
            'مراجع ومقيم': applicants.filter(a => a.role_pref && a.role_pref.includes('مراجع ومقيم')).length,
            'Notebooklm': applicants.filter(a => a.role_pref && (a.role_pref.includes('Notebook') || a.role_pref.includes('Notebooklm'))).length,
        };
        setStats(newStats);

    }, [applicants]);

    const deleteApplicant = async (id) => {
        if (window.confirm('Are you sure you want to delete this applicant?')) {
            // Optimistic update
            setApplicants(prev => prev.filter(a => a.id !== id));

            const { error } = await supabase
                .from('applicants')
                .delete()
                .eq('id', id);

            if (error) {
                console.error('Error deleting:', error);
                fetchApplicants(); // Revert on error
            }
        }
    };

    const filteredApplicants = applicants.filter(a => {
        if (filter === 'all') return true;

        // Check if filter matches a group name
        if (a.groups && a.groups.includes(filter)) {
            return true;
        }

        if (filter === 'Notebooklm') {
            return a.role_pref && (a.role_pref.includes('Notebook') || a.role_pref.includes('Notebooklm'));
        }
        if (!a.role_pref) return false;
        return a.role_pref.includes(filter);
    });

    // Extract unique groups
    const uniqueGroups = [...new Set(applicants.flatMap(a => a.groups || []))].sort();

    const createGroup = async (applicantIds, groupName) => {
        // We need to update multiple rows. Supabase doesn't support bulk update with different values easily,
        // but here we are appending the same group name to multiple IDs.
        // We have to read the current groups for each ID to append? 
        // Or we can fetch them first.

        // Actually simpler: Iterate and update (parallel requests). 
        // For 30-40 items it's fine.

        // Optimistic update locally first
        setApplicants(prev => prev.map(a => {
            if (applicantIds.includes(a.id)) {
                const currentGroups = a.groups || [];
                if (!currentGroups.includes(groupName)) {
                    return { ...a, groups: [...currentGroups, groupName] };
                }
            }
            return a;
        }));

        // Database Update
        // Note: This is a bit inefficient for large datasets but fine here.
        // A better way would be a stored procedure or just loop.
        for (const id of applicantIds) {
            const applicant = applicants.find(a => a.id === id);
            if (!applicant) continue;

            const currentGroups = applicant.groups || [];
            if (!currentGroups.includes(groupName)) {
                const newGroups = [...currentGroups, groupName];
                await supabase
                    .from('applicants')
                    .update({ groups: newGroups })
                    .eq('id', id);
            }
        }
    };

    const removeGroup = async (applicantId, groupName) => {
        // Optimistic
        setApplicants(prev => prev.map(a => {
            if (a.id === applicantId && a.groups) {
                return { ...a, groups: a.groups.filter(g => g !== groupName) };
            }
            return a;
        }));

        const applicant = applicants.find(a => a.id === applicantId);
        if (applicant && applicant.groups) {
            const newGroups = applicant.groups.filter(g => g !== groupName);
            await supabase
                .from('applicants')
                .update({ groups: newGroups })
                .eq('id', applicantId);
        }
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
        uniqueGroups,
        loading
    };
};
