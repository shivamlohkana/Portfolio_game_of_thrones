import { useState } from 'react';

export default function AssetImage({ src, alt, className = '', children, priority = false, onReady }) {
  const [failed, setFailed] = useState(false);
  return <div className={`asset-image ${className}`}>
    {children}
    {!failed && <img src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" onLoad={onReady} onError={() => setFailed(true)} />}
  </div>;
}
