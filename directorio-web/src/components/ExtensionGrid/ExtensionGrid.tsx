import type { Extension } from '../../types';
import { ExtensionCard } from '../ExtensionCard/ExtensionCard';
import { LoadingSkeleton } from '../LoadingSkeleton/LoadingSkeleton';
import { ErrorBlock } from '../ErrorBlock/ErrorBlock';
import './ExtensionGrid.css';

interface ExtensionGridProps {
  extensions: Extension[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  admin?: boolean;
  onEdit?: (ext: Extension) => void;
}

export function ExtensionGrid({ extensions, loading, error, onRetry, admin, onEdit }: ExtensionGridProps) {
  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorBlock message={error} onRetry={onRetry} />;
  if (extensions.length === 0) {
    return <p className="grid-empty">No se encontraron extensiones con los filtros seleccionados.</p>;
  }

  return (
    <div className="grid">
      {extensions.map((ext) => (
        <ExtensionCard key={ext.id} extension={ext} admin={admin} onEdit={onEdit} />
      ))}
    </div>
  );
}
