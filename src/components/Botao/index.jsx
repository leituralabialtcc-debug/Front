import './index.css';

export default function Botao({
  texto = 'Clique aqui',
  corDeFundo = '#7a3a8e',
  corTexto = '#ffffff',
  onClick = () => {},
  className = '',
  disabled = false,
  ...props
}) {
  return (
    <button
      className={`botao ${className}`}
      style={{
        backgroundColor: corDeFundo,
        color: corTexto,
      }}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {texto}
    </button>
  );
}
