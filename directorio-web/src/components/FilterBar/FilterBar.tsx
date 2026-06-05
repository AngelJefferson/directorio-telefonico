import { useCallback, useEffect, useRef } from 'react';
import type { ExtensionFilters } from '../../types';
import './FilterBar.css';

const DEPARTAMENTOS = [
  'Administración', 'Tecnología', 'Contabilidad',
  'Recursos Humanos', 'Servicio al Cliente',
] as const;

const SEDES = ['Sede Central', 'Sucursal Norte', 'Sucursal Sur'] as const;

interface FilterBarProps {
  filters: ExtensionFilters;
  onChange: React.Dispatch<React.SetStateAction<ExtensionFilters>>;
}

export function FilterBar({ filters, onChange }: FilterBarProps) {
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const update = useCallback(
    (patch: Partial<ExtensionFilters>) => {
      onChange((prev) => ({ ...prev, ...patch }));
    },
    [onChange],
  );

  return (
    <div className="filters">
      <input
        ref={searchRef}
        type="text"
        className="filters__input"
        placeholder="Buscar por nombre, extensión o departamento..."
        value={filters.buscar}
        onChange={(e) => update({ buscar: e.target.value })}
      />

      <select
        className="filters__select"
        value={filters.departamento}
        onChange={(e) => update({ departamento: e.target.value })}
      >
        <option value="">Todos los Departamentos</option>
        {DEPARTAMENTOS.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      <select
        className="filters__select"
        value={filters.sede}
        onChange={(e) => update({ sede: e.target.value })}
      >
        <option value="">Todas las Sedes</option>
        {SEDES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>
  );
}
