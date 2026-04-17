import { Outlet } from 'react-router-dom';

function AdminWorkspaceLayout() {
  return (
    <main className="app-shell">
      <Outlet />
    </main>
  );
}

export default AdminWorkspaceLayout;
