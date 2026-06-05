import './LoadingSkeleton.css';

interface LoadingSkeletonProps {
  count?: number;
}

export function LoadingSkeleton({ count = 6 }: LoadingSkeletonProps) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-top" />
          <div className="skeleton-body">
            <div className="skeleton-line skeleton-line--title" />
            <div className="skeleton-line skeleton-line--text" />
            <div className="skeleton-line skeleton-line--text" />
            <div className="skeleton-line skeleton-line--badge" />
          </div>
        </div>
      ))}
    </div>
  );
}
