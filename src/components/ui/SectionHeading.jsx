export default function SectionHeading({ number, eyebrow, title, children }) {
  return <header className="section-heading" data-reveal><div className="eyebrow"><span>{number}</span><i />{eyebrow}</div><h2>{title}</h2>{children && <p>{children}</p>}</header>;
}
