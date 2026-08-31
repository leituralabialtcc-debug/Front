import './index.css';

export default function CardUsuario({ nome, email, avatar }) {
  return (
    <div className="card-usuario">
      <img src={avatar} alt={nome} className="card-usuario__avatar" />
      <h3 className="card-usuario__nome">{nome}</h3>
      <p className="card-usuario__email">{email}</p>
    </div>
  );
}
