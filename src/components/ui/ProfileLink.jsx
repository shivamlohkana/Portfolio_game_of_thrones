export default function ProfileLink({ href, children, className = '', download = false }) {
  if (!href) return <span className={`${className} unavailable`} aria-disabled="true" title="Profile or file not added yet">{children}<span className="sr-only"> — not added yet</span></span>;
  return <a className={className} href={href} {...(download ? { download: true } : { target: '_blank', rel: 'noopener noreferrer' })}>{children}</a>;
}
