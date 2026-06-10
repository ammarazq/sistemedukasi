/**
 * src/components/ui/Kartu.jsx
 * Wrapper kartu putih dengan bayangan.
 */
export default function Kartu({ children, style = {} }) {
  return (
    <div style={{
      background   : 'var(--card)',
      borderRadius : 'var(--radius)',
      boxShadow    : 'var(--bayangan)',
      padding      : '16px 20px',
      ...style,
    }}>
      {children}
    </div>
  );
}
