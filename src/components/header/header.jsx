import "./header.css";
import { useState } from "react";

function header() {
  const [ativo, setAtivo] = useState(false);

  return (
    <header>
      <h1>CineVault</h1>
      <ul className="menu">
        <li>
          <ion-icon name="albums-sharp"></ion-icon>
        </li>
        <li>
          <ion-icon name="book-sharp"></ion-icon>
        </li>
        <li>
          <ion-icon name="settings-sharp"></ion-icon>
        </li>
      </ul>
    </header>
  );
}

export default header;
