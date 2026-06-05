import './ErrorBlock.css';

interface ErrorBlockProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorBlock({ message, onRetry }: ErrorBlockProps) {
  return (
    <div className="error-block">
      <div className="error-block__icon">!</div>
      <p className="error-block__message">{message}</p>
      {onRetry && (
        <button className="error-block__button" onClick={onRetry}>
          Reintentar
        </button>
      )}
    </div>
  );
}
