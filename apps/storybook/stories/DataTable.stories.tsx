import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import {
  DataTable,
  DataTableHeader,
  DataTableBody,
  DataTablePagination,
  DataTableSearch,
  DataTableEmpty,
  DataTableLoading,
  Badge,
  Button,
  Avatar,
  AvatarFallback,
  colors,
  ColumnDef,
} from '@hyena-studio/react-native';

const meta: Meta<typeof DataTable> = {
  title: 'Components/Data Display/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof DataTable>;

// ============================================================================
// Sample Data
// ============================================================================

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
  department: string;
  joinDate: string;
}

const users: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active', department: 'Engineering', joinDate: '2023-01-15' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Inactive', department: 'Marketing', joinDate: '2023-02-20' },
  { id: 3, name: 'Carol Williams', email: 'carol@example.com', role: 'Manager', status: 'Active', department: 'Sales', joinDate: '2023-03-10' },
  { id: 4, name: 'David Brown', email: 'david@example.com', role: 'User', status: 'Pending', department: 'Engineering', joinDate: '2023-04-05' },
  { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Active', department: 'HR', joinDate: '2023-05-12' },
  { id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'User', status: 'Active', department: 'Engineering', joinDate: '2023-06-18' },
  { id: 7, name: 'Grace Wilson', email: 'grace@example.com', role: 'Manager', status: 'Active', department: 'Product', joinDate: '2023-07-22' },
  { id: 8, name: 'Henry Taylor', email: 'henry@example.com', role: 'User', status: 'Inactive', department: 'Design', joinDate: '2023-08-30' },
  { id: 9, name: 'Ivy Anderson', email: 'ivy@example.com', role: 'User', status: 'Active', department: 'Engineering', joinDate: '2023-09-14' },
  { id: 10, name: 'Jack Thomas', email: 'jack@example.com', role: 'Admin', status: 'Active', department: 'Finance', joinDate: '2023-10-25' },
  { id: 11, name: 'Kate Jackson', email: 'kate@example.com', role: 'User', status: 'Pending', department: 'Marketing', joinDate: '2023-11-08' },
  { id: 12, name: 'Leo White', email: 'leo@example.com', role: 'Manager', status: 'Active', department: 'Sales', joinDate: '2023-12-01' },
];

const basicColumns: ColumnDef<User>[] = [
  { id: 'name', header: 'Name', accessorKey: 'name', width: 150 },
  { id: 'email', header: 'Email', accessorKey: 'email', width: 200 },
  { id: 'role', header: 'Role', accessorKey: 'role', width: 100 },
  { id: 'status', header: 'Status', accessorKey: 'status', width: 100 },
];

const columnsWithRender: ColumnDef<User>[] = [
  {
    id: 'name',
    header: 'Name',
    accessorKey: 'name',
    width: 180,
    cell: (row) => (
      <View style={cellStyles.nameCell}>
        <Avatar size="sm">
          <AvatarFallback>{row.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <Text style={cellStyles.nameText}>{row.name}</Text>
      </View>
    ),
  },
  { id: 'email', header: 'Email', accessorKey: 'email', width: 200 },
  { id: 'role', header: 'Role', accessorKey: 'role', width: 100 },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    width: 100,
    cell: (row) => (
      <Badge
        variant={
          row.status === 'Active' ? 'success' :
          row.status === 'Inactive' ? 'secondary' : 'warning'
        }
        size="sm"
      >
        {row.status}
      </Badge>
    ),
  },
  { id: 'department', header: 'Department', accessorKey: 'department', width: 120 },
];

const sortableColumns: ColumnDef<User>[] = [
  { id: 'name', header: 'Name', accessorKey: 'name', width: 150, sortable: true },
  { id: 'email', header: 'Email', accessorKey: 'email', width: 200, sortable: true },
  { id: 'role', header: 'Role', accessorKey: 'role', width: 100, sortable: true },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    width: 100,
    sortable: true,
    cell: (row) => (
      <Badge
        variant={
          row.status === 'Active' ? 'success' :
          row.status === 'Inactive' ? 'secondary' : 'warning'
        }
        size="sm"
      >
        {row.status}
      </Badge>
    ),
  },
];

// ============================================================================
// Default
// ============================================================================

export const Default: Story = {
  render: () => (
    <View style={styles.container}>
      <DataTable
        data={users.slice(0, 5)}
        columns={basicColumns}
        getRowKey={(row) => String(row.id)}
      />
    </View>
  ),
};

// ============================================================================
// With Custom Cell Render
// ============================================================================

export const WithCustomRender: Story = {
  render: () => (
    <View style={styles.container}>
      <DataTable
        data={users.slice(0, 5)}
        columns={columnsWithRender}
        getRowKey={(row) => String(row.id)}
      />
    </View>
  ),
};

// ============================================================================
// With Sorting
// ============================================================================

export const WithSorting: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.description}>Click column headers to sort</Text>
      <DataTable
        data={users.slice(0, 8)}
        columns={sortableColumns}
        sortable
        getRowKey={(row) => String(row.id)}
      />
    </View>
  ),
};

// ============================================================================
// With Filtering
// ============================================================================

export const WithFiltering: Story = {
  render: () => (
    <View style={styles.container}>
      <DataTable
        data={users}
        columns={columnsWithRender}
        searchable
        getRowKey={(row) => String(row.id)}
      />
    </View>
  ),
};

// ============================================================================
// With Pagination
// ============================================================================

export const WithPagination: Story = {
  render: () => (
    <View style={styles.container}>
      <DataTable
        data={users}
        columns={columnsWithRender}
        paginated
        pageSize={5}
        getRowKey={(row) => String(row.id)}
      />
    </View>
  ),
};

// ============================================================================
// With Row Selection (Single)
// ============================================================================

export const WithSingleSelection: Story = {
  render: function SingleSelectionStory() {
    const [selected, setSelected] = useState<User[]>([]);

    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Selected: {selected.length > 0 ? selected[0].name : 'None'}
        </Text>
        <DataTable
          data={users.slice(0, 6)}
          columns={columnsWithRender}
          selectable="single"
          onRowSelect={setSelected}
          getRowKey={(row) => String(row.id)}
        />
      </View>
    );
  },
};

// ============================================================================
// With Row Selection (Multiple)
// ============================================================================

export const WithMultipleSelection: Story = {
  render: function MultipleSelectionStory() {
    const [selected, setSelected] = useState<User[]>([]);

    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Selected: {selected.length} row{selected.length !== 1 ? 's' : ''}
        </Text>
        <DataTable
          data={users.slice(0, 6)}
          columns={columnsWithRender}
          selectable="multiple"
          onRowSelect={setSelected}
          getRowKey={(row) => String(row.id)}
        />
      </View>
    );
  },
};

// ============================================================================
// Empty State
// ============================================================================

export const EmptyState: Story = {
  render: () => (
    <View style={styles.container}>
      <DataTable
        data={[]}
        columns={basicColumns}
        getRowKey={(_, index) => String(index)}
        emptyState={
          <View style={styles.emptyContent}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyTitle}>No users found</Text>
            <Text style={styles.emptyDescription}>
              Try adjusting your search or filters
            </Text>
            <Button variant="secondary" size="sm">
              Clear filters
            </Button>
          </View>
        }
      />
    </View>
  ),
};

// ============================================================================
// Loading State
// ============================================================================

export const LoadingState: Story = {
  render: () => (
    <View style={styles.container}>
      <DataTable
        data={[]}
        columns={basicColumns}
        loading
        getRowKey={(_, index) => String(index)}
      />
    </View>
  ),
};

// ============================================================================
// With Actions Column
// ============================================================================

export const WithActionsColumn: Story = {
  render: function ActionsStory() {
    const handleEdit = (user: User) => {
      console.log('Edit:', user.name);
    };

    const handleDelete = (user: User) => {
      console.log('Delete:', user.name);
    };

    const columnsWithActions: ColumnDef<User>[] = [
      ...columnsWithRender,
      {
        id: 'actions',
        header: 'Actions',
        accessorKey: 'id',
        width: 140,
        cell: (row) => (
          <View style={cellStyles.actionsCell}>
            <Button size="sm" variant="ghost" onPress={() => handleEdit(row)}>
              Edit
            </Button>
            <Button size="sm" variant="destructive" onPress={() => handleDelete(row)}>
              Delete
            </Button>
          </View>
        ),
      },
    ];

    return (
      <View style={styles.container}>
        <DataTable
          data={users.slice(0, 5)}
          columns={columnsWithActions}
          getRowKey={(row) => String(row.id)}
        />
      </View>
    );
  },
};

// ============================================================================
// Full Featured
// ============================================================================

export const FullFeatured: Story = {
  render: function FullFeaturedStory() {
    const [selected, setSelected] = useState<User[]>([]);

    const fullColumns: ColumnDef<User>[] = [
      {
        id: 'name',
        header: 'Name',
        accessorKey: 'name',
        width: 180,
        sortable: true,
        cell: (row) => (
          <View style={cellStyles.nameCell}>
            <Avatar size="sm">
              <AvatarFallback>{row.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <View>
              <Text style={cellStyles.nameText}>{row.name}</Text>
              <Text style={cellStyles.emailText}>{row.email}</Text>
            </View>
          </View>
        ),
      },
      {
        id: 'role',
        header: 'Role',
        accessorKey: 'role',
        width: 100,
        sortable: true,
        cell: (row) => (
          <Badge variant={row.role === 'Admin' ? 'default' : 'secondary'} size="sm">
            {row.role}
          </Badge>
        ),
      },
      {
        id: 'status',
        header: 'Status',
        accessorKey: 'status',
        width: 100,
        sortable: true,
        cell: (row) => (
          <Badge
            variant={
              row.status === 'Active' ? 'success' :
              row.status === 'Inactive' ? 'secondary' : 'warning'
            }
            size="sm"
          >
            {row.status}
          </Badge>
        ),
      },
      {
        id: 'department',
        header: 'Department',
        accessorKey: 'department',
        width: 120,
        sortable: true,
      },
      {
        id: 'joinDate',
        header: 'Join Date',
        accessorKey: 'joinDate',
        width: 110,
        sortable: true,
        cell: (row) => (
          <Text style={cellStyles.dateText}>
            {new Date(row.joinDate).toLocaleDateString()}
          </Text>
        ),
      },
      {
        id: 'actions',
        header: '',
        accessorKey: 'id',
        width: 80,
        cell: () => (
          <Button size="sm" variant="ghost">
            •••
          </Button>
        ),
      },
    ];

    return (
      <View style={styles.wideContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Team Members</Text>
          <View style={styles.headerActions}>
            {selected.length > 0 && (
              <Text style={styles.selectedCount}>
                {selected.length} selected
              </Text>
            )}
            <Button variant="primary" size="sm">
              Add Member
            </Button>
          </View>
        </View>
        <DataTable
          data={users}
          columns={fullColumns}
          searchable
          sortable
          selectable="multiple"
          paginated
          pageSize={5}
          onRowSelect={setSelected}
          getRowKey={(row) => String(row.id)}
        />
      </View>
    );
  },
};

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    width: 700,
    backgroundColor: colors.bg.base,
    padding: 16,
    borderRadius: 12,
  },
  wideContainer: {
    width: 900,
    backgroundColor: colors.bg.base,
    padding: 16,
    borderRadius: 12,
  },
  description: {
    fontSize: 13,
    color: colors.text.secondary,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  selectedCount: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  emptyContent: {
    alignItems: 'center',
    gap: 8,
    padding: 24,
  },
  emptyIcon: {
    fontSize: 48,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  emptyDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
});

const cellStyles = StyleSheet.create({
  nameCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  nameText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
  },
  emailText: {
    fontSize: 12,
    color: colors.text.muted,
    marginTop: 2,
  },
  dateText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  actionsCell: {
    flexDirection: 'row',
    gap: 4,
  },
});
