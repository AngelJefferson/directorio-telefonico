import { type FormEvent, useEffect, useState } from 'react';
import type { CreateExtensionData, Extension } from '../../types';
import './AddExtensionModal.css';

const DEPARTAMENTOS = [
  'Administración', 'Tecnología', 'Contabilidad',
  'Recursos Humanos', 'Servicio al Cliente',
] as const;

const SEDES = ['Sede Central', 'Sucursal Norte', 'Sucursal Sur'] as const;

interface AddExtensionModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateExtensionData) => Promise<void>;
  initialData?: Extension;
}

export function AddExtensionModal({ open, onClose, onSubmit, initialData }: AddExtensionModalProps) {
  const [nombre, setNombre] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [sede, setSede] = useState('');
  const [numeroExtension, setNumeroExtension] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEdit = !!initialData;

  useEffect(() => {
    if (open && initialData) {
      setNombre(initialData.nombre);
      setDepartamento(initialData.departamento);
      setSede(initialData.sede);
      setNumeroExtension(initialData.numeroExtension);
    } else if (open) {
      setNombre('');
      setDepartamento('');
      setSede('');
      setNumeroExtension('');
    }
  }, [open, initialData]);

  if (!open) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!nombre || !departamento || !sede || !numeroExtension) {
      setError('Todos los campos son obligatorios');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit({ nombre, departamento, sede, numeroExtension });
      setNombre('');
      setDepartamento('');
      setSede('');
      setNumeroExtension('');
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{isEdit ? 'Editar Extensión' : 'Nueva Extensión'}</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <label className="modal-field">
            <span>Nombre</span>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Juan Pérez"
              autoFocus
            />
          </label>

          <label className="modal-field">
            <span>Departamento</span>
            <select value={departamento} onChange={(e) => setDepartamento(e.target.value)}>
              <option value="">Seleccionar...</option>
              {DEPARTAMENTOS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </label>

          <label className="modal-field">
            <span>Sede</span>
            <select value={sede} onChange={(e) => setSede(e.target.value)}>
              <option value="">Seleccionar...</option>
              {SEDES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>

          <label className="modal-field">
            <span>Extensión</span>
            <input
              type="text"
              value={numeroExtension}
              onChange={(e) => setNumeroExtension(e.target.value)}
              placeholder="Ej: 123"
            />
          </label>

          {error && <p className="modal-error">{error}</p>}

          <div className="modal-actions">
            <button type="button" className="btn btn--secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn--primary" disabled={submitting}>
              {submitting ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
