
import React from 'react';
import {
  Users,
  Award,
  Database,
  PenTool,
  BookOpen,
  Monitor,
  Hash
} from 'lucide-react';

const filters = [
  { id: 'all', label: 'الكل (All)', icon: Users },
  { id: 'Director', label: 'Directors', icon: Award },
  { id: 'تنظيم الداتا', label: 'Data Organizers', icon: Database },
  { id: 'Post-Writer', label: 'Post Writers', icon: PenTool },
  { id: 'مراجع ومقيم', label: 'Reviewers', icon: BookOpen },
  { id: 'Notebooklm', label: 'AI / NotebookLM', icon: Monitor }, // Catch both spellings in logic
];

const Sidebar = ({ currentFilter, onFilterChange, counts, groups = [] }) => {
  return (
    <aside className="sidebar">
      <div className="logo-area">
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>Data Team</h2>
        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Applicant Manager</span>
      </div>

      <nav className="nav-menu">
        <h4 style={{ margin: '0 0 10px 10px', color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase' }}>Allowed Roles</h4>
        {filters.map(f => (
          <button
            key={f.id}
            className={`nav-item ${currentFilter === f.id ? 'active' : ''}`}
            onClick={() => onFilterChange(f.id)}
          >
            <f.icon size={20} />
            <span style={{ flex: 1 }}>{f.label}</span>
            <span className="count-badge">
              {f.id === 'all' ? counts.all : counts[f.id] || 0}
            </span>
          </button>
        ))}

        {groups.length > 0 && (
          <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
            <h4 style={{
              margin: '0 0 10px 0',
              color: '#f59e0b', // Amber/Gold color for visibility
              fontSize: '0.85rem',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textTransform: 'uppercase'
            }}>
              <Database size={14} /> Created Classes
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {groups.map(g => (
                <button
                  key={g}
                  className={`nav-item ${currentFilter === g ? 'active' : ''}`}
                  onClick={() => onFilterChange(g)}
                  style={{ fontSize: '0.9rem' }}
                >
                  <Hash size={16} color={currentFilter === g ? "var(--accent-primary)" : "#64748b"} />
                  <span style={{ flex: 1, marginLeft: '5px' }}>{g}</span>
                  <span className="count-badge" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                    Group
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div style={{ padding: '20px', borderTop: '1px solid var(--border-color)', marginTop: 'auto' }}>
        <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
          v1.2.0 • Data Team
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
