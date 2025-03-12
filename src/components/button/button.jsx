import "./button.css"

function Button({ nome }) {
  return (
    <button className="button">
      {nome}
    </button>
  );
}

export default Button;
