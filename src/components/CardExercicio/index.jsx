import './index.css';

export default function CardExercicio({
  titulo,
  descricao,
  dificuldade,
  onClick,
  ...props
}) {
  return (
    <div className="card-exercicio" onClick={onClick} {...props}>
      <h3 className="card-exercicio__titulo">{titulo}</h3>
      <p className="card-exercicio__descricao">{descricao}</p>
      <span className="card-exercicio__dificuldade">{dificuldade}</span>
    </div>
  );
}
