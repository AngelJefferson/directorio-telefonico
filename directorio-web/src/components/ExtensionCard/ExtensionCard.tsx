import type { Extension } from '../../types';
import './ExtensionCard.css';

interface ExtensionCardProps {
  extension: Extension;
  admin?: boolean;
  onEdit?: (ext: Extension) => void;
}

export function ExtensionCard({ extension, admin, onEdit }: ExtensionCardProps) {
  return (
    <article className="card">
      <div className="card__top" />
      <div className="card__body">
        <div className="card__head">
          <h3 className="card__title">{extension.nombre}</h3>
          {admin && onEdit && (
            <button className="card__edit" onClick={() => onEdit(extension)} title="Editar">
              ✎
            </button>
          )}
        </div>
        <div className="card__detail">
          <span className="card__label">Departamento</span>
          <span className="card__value">{extension.departamento}</span>
        </div>
        <div className="card__detail">
          <span className="card__label">Sede</span>
          <span className="card__value">{extension.sede}</span>
        </div>
        <div className="card__extension">
          Ext. {extension.numeroExtension}
        </div>
      </div>
    </article>
  );
}
