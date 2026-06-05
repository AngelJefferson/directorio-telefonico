import { type FormEvent, useState } from 'react';
import './AdminLogin.css';

const PASSCODE = import.meta.env.VITE_ADMIN_PASSCODE ?? 'admin123';

interface AdminLoginProps {
  open: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

export function AdminLogin({ open, onSuccess, onClose }: AdminLoginProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  if (!open) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (code === PASSCODE) {
      setCode('');
      setError('');
      onSuccess();
    } else {
      setError('Código incorrecto');
    }
  };

  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="admin-card" onClick={(e) => e.stopPropagation()}>
        <h3 className="admin-title">Acceso Administrador</h3>
        <p className="admin-desc">Ingresa el código para acceder al panel de administración.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            className="admin-input"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(''); }}
            placeholder="Código de admin"
            autoFocus
          />
          {error && <p className="admin-error">{error}</p>}
          <div className="admin-actions">
            <button type="button" className="btn btn--secondary" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn--primary">Acceder</button>
          </div>
        </form>
      </div>
    </div>
  );
}
