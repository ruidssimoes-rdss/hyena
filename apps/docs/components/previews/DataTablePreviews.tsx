'use client';

import React, { useState, useMemo } from 'react';

// ============================================================================
// Sample Data
// ============================================================================

interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'pending' | 'inactive';
  role: string;
  joined: string;
}

const sampleUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', role: 'Admin', joined: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active', role: 'Editor', joined: '2024-02-20' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', status: 'pending', role: 'Viewer', joined: '2024-03-10' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'inactive', role: 'Editor', joined: '2024-01-05' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', status: 'active', role: 'Admin', joined: '2024-04-01' },
  { id: 6, name: 'Diana Evans', email: 'diana@example.com', status: 'pending', role: 'Viewer', joined: '2024-03-25' },
  { id: 7, name: 'Edward Foster', email: 'edward@example.com', status: 'active', role: 'Editor', joined: '2024-02-14' },
  { id: 8, name: 'Fiona Grant', email: 'fiona@example.com', status: 'active', role: 'Viewer', joined: '2024-04-10' },
];

// ============================================================================
// Status Badge Component
// ============================================================================

function StatusBadge({ status }: { status: 'active' | 'pending' | 'inactive' }) {
  const colors = {
    active: 'bg-green-500/20 text-green-400 border-green-500/30',
    pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    inactive: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  };

  return (
    <span className={`px-2 py-0.5 text-xs font-medium rounded border ${colors[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

// ============================================================================
// Basic DataTable Preview
// ============================================================================

export function DataTableBasicPreview() {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-[var(--border-default)]">
      <table className="w-full">
        <thead className="bg-[var(--bg-elevated)]">
          <tr className="border-b border-[var(--border-default)]">
            <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)]">Name</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)]">Email</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)]">Status</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)]">Role</th>
          </tr>
        </thead>
        <tbody>
          {sampleUsers.slice(0, 4).map((user, idx) => (
            <tr key={user.id} className={idx < 3 ? 'border-b border-[var(--border-muted)]' : ''}>
              <td className="px-4 py-3 text-sm text-[var(--text-primary)]">{user.name}</td>
              <td className="px-4 py-3 text-sm text-[var(--text-primary)]">{user.email}</td>
              <td className="px-4 py-3"><StatusBadge status={user.status} /></td>
              <td className="px-4 py-3 text-sm text-[var(--text-primary)]">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================================
// With Sorting Preview
// ============================================================================

type SortDir = 'asc' | 'desc' | null;

export function DataTableSortingPreview() {
  const [sortCol, setSortCol] = useState<keyof User | null>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const sortedUsers = useMemo(() => {
    if (!sortCol || !sortDir) return sampleUsers.slice(0, 5);
    return [...sampleUsers.slice(0, 5)].sort((a, b) => {
      const aVal = a[sortCol];
      const bVal = b[sortCol];
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [sortCol, sortDir]);

  const handleSort = (col: keyof User) => {
    if (sortCol === col) {
      setSortDir(sortDir === 'asc' ? 'desc' : sortDir === 'desc' ? null : 'asc');
    } else {
      setSortCol(col);
      setSortDir('asc');
    }
  };

  const SortIcon = ({ col }: { col: keyof User }) => (
    <span className={`ml-1 text-xs ${sortCol === col ? 'text-blue-400' : 'text-[var(--text-muted)]'}`}>
      {sortCol === col && sortDir === 'asc' ? '↑' : sortCol === col && sortDir === 'desc' ? '↓' : '↕'}
    </span>
  );

  return (
    <div className="w-full overflow-hidden rounded-lg border border-[var(--border-default)]">
      <table className="w-full">
        <thead className="bg-[var(--bg-elevated)]">
          <tr className="border-b border-[var(--border-default)]">
            <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)] cursor-pointer hover:text-[var(--text-primary)]" onClick={() => handleSort('name')}>
              Name <SortIcon col="name" />
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)] cursor-pointer hover:text-[var(--text-primary)]" onClick={() => handleSort('email')}>
              Email <SortIcon col="email" />
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)] cursor-pointer hover:text-[var(--text-primary)]" onClick={() => handleSort('status')}>
              Status <SortIcon col="status" />
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)] cursor-pointer hover:text-[var(--text-primary)]" onClick={() => handleSort('role')}>
              Role <SortIcon col="role" />
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, idx) => (
            <tr key={user.id} className={idx < sortedUsers.length - 1 ? 'border-b border-[var(--border-muted)]' : ''}>
              <td className="px-4 py-3 text-sm text-[var(--text-primary)]">{user.name}</td>
              <td className="px-4 py-3 text-sm text-[var(--text-primary)]">{user.email}</td>
              <td className="px-4 py-3"><StatusBadge status={user.status} /></td>
              <td className="px-4 py-3 text-sm text-[var(--text-primary)]">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================================
// With Search Preview
// ============================================================================

export function DataTableSearchPreview() {
  const [query, setQuery] = useState('');

  const filteredUsers = useMemo(() => {
    if (!query) return sampleUsers.slice(0, 5);
    const lowerQuery = query.toLowerCase();
    return sampleUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerQuery) ||
        user.email.toLowerCase().includes(lowerQuery) ||
        user.role.toLowerCase().includes(lowerQuery)
    ).slice(0, 5);
  }, [query]);

  return (
    <div className="w-full overflow-hidden rounded-lg border border-[var(--border-default)]">
      <div className="p-3 border-b border-[var(--border-default)]">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full px-3 py-2 text-sm bg-[var(--bg-raised)] border border-[var(--border-default)] rounded-md text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              ×
            </button>
          )}
        </div>
      </div>
      <table className="w-full">
        <thead className="bg-[var(--bg-elevated)]">
          <tr className="border-b border-[var(--border-default)]">
            <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)]">Name</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)]">Email</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)]">Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-4 py-8 text-center text-sm text-[var(--text-muted)]">
                No results found
              </td>
            </tr>
          ) : (
            filteredUsers.map((user, idx) => (
              <tr key={user.id} className={idx < filteredUsers.length - 1 ? 'border-b border-[var(--border-muted)]' : ''}>
                <td className="px-4 py-3 text-sm text-[var(--text-primary)]">{user.name}</td>
                <td className="px-4 py-3 text-sm text-[var(--text-primary)]">{user.email}</td>
                <td className="px-4 py-3 text-sm text-[var(--text-primary)]">{user.role}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================================
// With Pagination Preview
// ============================================================================

export function DataTablePaginationPreview() {
  const [page, setPage] = useState(0);
  const pageSize = 3;
  const totalPages = Math.ceil(sampleUsers.length / pageSize);
  const paginatedUsers = sampleUsers.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div className="w-full overflow-hidden rounded-lg border border-[var(--border-default)]">
      <table className="w-full">
        <thead className="bg-[var(--bg-elevated)]">
          <tr className="border-b border-[var(--border-default)]">
            <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)]">Name</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)]">Email</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)]">Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user, idx) => (
            <tr key={user.id} className={idx < paginatedUsers.length - 1 ? 'border-b border-[var(--border-muted)]' : ''}>
              <td className="px-4 py-3 text-sm text-[var(--text-primary)]">{user.name}</td>
              <td className="px-4 py-3 text-sm text-[var(--text-primary)]">{user.email}</td>
              <td className="px-4 py-3"><StatusBadge status={user.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between px-4 py-3 bg-[var(--bg-elevated)] border-t border-[var(--border-default)]">
        <span className="text-sm text-[var(--text-secondary)]">
          {page * pageSize + 1}-{Math.min((page + 1) * pageSize, sampleUsers.length)} of {sampleUsers.length}
        </span>
        <div className="flex gap-1">
          <button
            onClick={() => setPage(0)}
            disabled={page === 0}
            className="px-2 py-1 text-sm text-[var(--text-primary)] bg-[var(--bg-surface)] rounded disabled:opacity-40"
          >
            ««
          </button>
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
            className="px-2 py-1 text-sm text-[var(--text-primary)] bg-[var(--bg-surface)] rounded disabled:opacity-40"
          >
            «
          </button>
          <span className="px-3 py-1 text-sm text-[var(--text-secondary)]">
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages - 1}
            className="px-2 py-1 text-sm text-[var(--text-primary)] bg-[var(--bg-surface)] rounded disabled:opacity-40"
          >
            »
          </button>
          <button
            onClick={() => setPage(totalPages - 1)}
            disabled={page >= totalPages - 1}
            className="px-2 py-1 text-sm text-[var(--text-primary)] bg-[var(--bg-surface)] rounded disabled:opacity-40"
          >
            »»
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// With Selection Preview
// ============================================================================

export function DataTableSelectionPreview() {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const toggleRow = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === sampleUsers.slice(0, 5).length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(sampleUsers.slice(0, 5).map((u) => u.id)));
    }
  };

  const allSelected = selected.size === sampleUsers.slice(0, 5).length;

  return (
    <div className="w-full overflow-hidden rounded-lg border border-[var(--border-default)]">
      <table className="w-full">
        <thead className="bg-[var(--bg-elevated)]">
          <tr className="border-b border-[var(--border-default)]">
            <th className="px-4 py-3 w-12">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleAll}
                className="w-4 h-4 rounded border-[var(--border-strong)] bg-[var(--bg-raised)]"
              />
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)]">Name</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)]">Email</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)]">Role</th>
          </tr>
        </thead>
        <tbody>
          {sampleUsers.slice(0, 5).map((user, idx) => (
            <tr
              key={user.id}
              className={`${idx < 4 ? 'border-b border-[var(--border-muted)]' : ''} ${selected.has(user.id) ? 'bg-blue-500/10' : ''}`}
            >
              <td className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={selected.has(user.id)}
                  onChange={() => toggleRow(user.id)}
                  className="w-4 h-4 rounded border-[var(--border-strong)] bg-[var(--bg-raised)]"
                />
              </td>
              <td className="px-4 py-3 text-sm text-[var(--text-primary)]">{user.name}</td>
              <td className="px-4 py-3 text-sm text-[var(--text-primary)]">{user.email}</td>
              <td className="px-4 py-3 text-sm text-[var(--text-primary)]">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selected.size > 0 && (
        <div className="px-4 py-2 bg-[var(--bg-elevated)] border-t border-[var(--border-default)] text-sm text-[var(--text-secondary)]">
          {selected.size} row{selected.size > 1 ? 's' : ''} selected
        </div>
      )}
    </div>
  );
}

// ============================================================================
// With Row Actions Preview
// ============================================================================

export function DataTableActionsPreview() {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-[var(--border-default)]">
      <table className="w-full">
        <thead className="bg-[var(--bg-elevated)]">
          <tr className="border-b border-[var(--border-default)]">
            <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)]">Name</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)]">Email</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)]">Status</th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-[var(--text-secondary)]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sampleUsers.slice(0, 4).map((user, idx) => (
            <tr key={user.id} className={idx < 3 ? 'border-b border-[var(--border-muted)]' : ''}>
              <td className="px-4 py-3 text-sm text-[var(--text-primary)]">{user.name}</td>
              <td className="px-4 py-3 text-sm text-[var(--text-primary)]">{user.email}</td>
              <td className="px-4 py-3"><StatusBadge status={user.status} /></td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  <button className="px-2 py-1 text-xs text-[var(--accent-blue)] hover:bg-[var(--accent-blue)]/10 rounded">
                    Edit
                  </button>
                  <button className="px-2 py-1 text-xs text-red-400 hover:bg-red-500/10 rounded">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================================
// Loading State Preview
// ============================================================================

export function DataTableLoadingPreview() {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-[var(--border-default)]">
      <table className="w-full">
        <thead className="bg-[var(--bg-elevated)]">
          <tr className="border-b border-[var(--border-default)]">
            <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)]">Name</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)]">Email</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)]">Status</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4].map((i) => (
            <tr key={i} className={i < 4 ? 'border-b border-[var(--border-muted)]' : ''}>
              <td className="px-4 py-3">
                <div className="h-4 w-24 bg-[var(--bg-elevated)] rounded animate-pulse" />
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-40 bg-[var(--bg-elevated)] rounded animate-pulse" />
              </td>
              <td className="px-4 py-3">
                <div className="h-5 w-16 bg-[var(--bg-elevated)] rounded animate-pulse" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================================
// Empty State Preview
// ============================================================================

export function DataTableEmptyPreview() {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-[var(--border-default)]">
      <table className="w-full">
        <thead className="bg-[var(--bg-elevated)]">
          <tr className="border-b border-[var(--border-default)]">
            <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)]">Name</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)]">Email</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)]">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3}>
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="text-4xl mb-3">📭</div>
                <p className="text-sm font-medium text-[var(--text-primary)] mb-1">No data</p>
                <p className="text-xs text-[var(--text-secondary)]">No records to display</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// ============================================================================
// Full Featured Preview
// ============================================================================

export function DataTableFullPreview() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [sortCol, setSortCol] = useState<keyof User | null>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [page, setPage] = useState(0);
  const pageSize = 3;

  const processedUsers = useMemo(() => {
    let result = [...sampleUsers];

    // Filter
    if (query) {
      const lowerQuery = query.toLowerCase();
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(lowerQuery) ||
          user.email.toLowerCase().includes(lowerQuery)
      );
    }

    // Sort
    if (sortCol && sortDir) {
      result.sort((a, b) => {
        const aVal = a[sortCol];
        const bVal = b[sortCol];
        if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [query, sortCol, sortDir]);

  const totalPages = Math.ceil(processedUsers.length / pageSize);
  const paginatedUsers = processedUsers.slice(page * pageSize, (page + 1) * pageSize);

  const handleSort = (col: keyof User) => {
    if (sortCol === col) {
      setSortDir(sortDir === 'asc' ? 'desc' : sortDir === 'desc' ? null : 'asc');
    } else {
      setSortCol(col);
      setSortDir('asc');
    }
  };

  const toggleRow = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === paginatedUsers.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(paginatedUsers.map((u) => u.id)));
    }
  };

  const SortIcon = ({ col }: { col: keyof User }) => (
    <span className={`ml-1 text-xs ${sortCol === col ? 'text-blue-400' : 'text-[var(--text-muted)]'}`}>
      {sortCol === col && sortDir === 'asc' ? '↑' : sortCol === col && sortDir === 'desc' ? '↓' : '↕'}
    </span>
  );

  return (
    <div className="w-full overflow-hidden rounded-lg border border-[var(--border-default)]">
      <div className="p-3 border-b border-[var(--border-default)]">
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(0); }}
          placeholder="Search..."
          className="w-full px-3 py-2 text-sm bg-[var(--bg-raised)] border border-[var(--border-default)] rounded-md text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)]"
        />
      </div>
      <table className="w-full">
        <thead className="bg-[var(--bg-elevated)]">
          <tr className="border-b border-[var(--border-default)]">
            <th className="px-4 py-3 w-12">
              <input
                type="checkbox"
                checked={selected.size === paginatedUsers.length && paginatedUsers.length > 0}
                onChange={toggleAll}
                className="w-4 h-4 rounded border-[var(--border-strong)] bg-[var(--bg-raised)]"
              />
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)] cursor-pointer" onClick={() => handleSort('name')}>
              Name <SortIcon col="name" />
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)] cursor-pointer" onClick={() => handleSort('email')}>
              Email <SortIcon col="email" />
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)] cursor-pointer" onClick={() => handleSort('status')}>
              Status <SortIcon col="status" />
            </th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-[var(--text-secondary)]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-sm text-[var(--text-muted)]">
                No results found
              </td>
            </tr>
          ) : (
            paginatedUsers.map((user, idx) => (
              <tr
                key={user.id}
                className={`${idx < paginatedUsers.length - 1 ? 'border-b border-[var(--border-muted)]' : ''} ${selected.has(user.id) ? 'bg-blue-500/10' : ''}`}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selected.has(user.id)}
                    onChange={() => toggleRow(user.id)}
                    className="w-4 h-4 rounded border-[var(--border-strong)] bg-[var(--bg-raised)]"
                  />
                </td>
                <td className="px-4 py-3 text-sm text-[var(--text-primary)]">{user.name}</td>
                <td className="px-4 py-3 text-sm text-[var(--text-primary)]">{user.email}</td>
                <td className="px-4 py-3"><StatusBadge status={user.status} /></td>
                <td className="px-4 py-3 text-right">
                  <button className="px-2 py-1 text-xs text-[var(--accent-blue)] hover:bg-[var(--accent-blue)]/10 rounded">
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="flex items-center justify-between px-4 py-3 bg-[var(--bg-elevated)] border-t border-[var(--border-default)]">
        <span className="text-sm text-[var(--text-secondary)]">
          {processedUsers.length > 0 ? `${page * pageSize + 1}-${Math.min((page + 1) * pageSize, processedUsers.length)} of ${processedUsers.length}` : '0 results'}
        </span>
        <div className="flex gap-1">
          <button onClick={() => setPage(0)} disabled={page === 0} className="px-2 py-1 text-sm text-[var(--text-primary)] bg-[var(--bg-surface)] rounded disabled:opacity-40">««</button>
          <button onClick={() => setPage(page - 1)} disabled={page === 0} className="px-2 py-1 text-sm text-[var(--text-primary)] bg-[var(--bg-surface)] rounded disabled:opacity-40">«</button>
          <span className="px-3 py-1 text-sm text-[var(--text-secondary)]">{page + 1} / {totalPages || 1}</span>
          <button onClick={() => setPage(page + 1)} disabled={page >= totalPages - 1} className="px-2 py-1 text-sm text-[var(--text-primary)] bg-[var(--bg-surface)] rounded disabled:opacity-40">»</button>
          <button onClick={() => setPage(totalPages - 1)} disabled={page >= totalPages - 1} className="px-2 py-1 text-sm text-[var(--text-primary)] bg-[var(--bg-surface)] rounded disabled:opacity-40">»»</button>
        </div>
      </div>
    </div>
  );
}
