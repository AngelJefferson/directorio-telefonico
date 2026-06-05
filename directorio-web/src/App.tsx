import { useState } from 'react';
import { useExtensions } from './hooks/useExtensions';
import { FilterBar } from './components/FilterBar/FilterBar';
import { ExtensionGrid } from './components/ExtensionGrid/ExtensionGrid';
import { AddExtensionModal } from './components/AddExtensionModal/AddExtensionModal';
import { AdminLogin } from './components/AdminLogin/AdminLogin';
import { createExtension, updateExtension } from './services/api';
import type { CreateExtensionData, Extension } from './types';
import './App.css';

function App() {
  const { extensions, loading, error, filters, setFilters, retry } = useExtensions();
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Extension | undefined>(undefined);
  const [adminMode, setAdminMode] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);

  const handleCreate = async (data: CreateExtensionData) => {
    await createExtension(data);
    retry();
  };

  const handleEdit = async (data: CreateExtensionData) => {
    if (!editTarget) return;
    await updateExtension(editTarget.id, data);
    setEditTarget(undefined);
    retry();
  };

  const openEdit = (ext: Extension) => {
    setEditTarget(ext);
    setModalOpen(true);
  };

  const openCreate = () => {
    setEditTarget(undefined);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditTarget(undefined);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header__inner">
          <div className="header__brand">
            <img src="/logo-caid.png" alt="CAID" className="header__logo" />
            <div>
              <h1 className="header__title">Directorio Telefónico</h1>
              <p className="header__subtitle">Extensiones</p>
            </div>
          </div>
          <div className="header__actions">
            {adminMode ? (
              <>
                <button className="header__add" onClick={openCreate}>
                  + Nueva Extensión
                </button>
                <button className="header__admin header__admin--on" onClick={() => setAdminMode(false)}>
                  Admin
                </button>
              </>
            ) : (
              <button className="header__admin" onClick={() => setAdminLoginOpen(true)}>
                Admin
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="header-accent" />

      <main className="main">
        <div className="main__card">
          <div className="main__top">
            <FilterBar filters={filters} onChange={setFilters} />
            <p className="main__count">
              {loading ? 'Cargando...' : `${extensions.length} resultado${extensions.length !== 1 ? 's' : ''}`}
            </p>
          </div>
          <ExtensionGrid
            extensions={extensions}
            loading={loading}
            error={error}
            onRetry={retry}
            admin={adminMode}
            onEdit={adminMode ? openEdit : undefined}
          />
        </div>
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <p>Centro de Atención Integral para la Discapacidad</p>
          <p className="footer__copy">&copy; {new Date().getFullYear()} CAID. Todos los derechos reservados.</p>
        </div>
      </footer>

      <AddExtensionModal
        open={modalOpen}
        onClose={closeModal}
        onSubmit={editTarget ? handleEdit : handleCreate}
        initialData={editTarget}
      />

      <AdminLogin
        open={adminLoginOpen}
        onSuccess={() => { setAdminLoginOpen(false); setAdminMode(true); }}
        onClose={() => setAdminLoginOpen(false)}
      />
    </div>
  );
}

export default App;
