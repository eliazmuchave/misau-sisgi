import {Link} from "react-router-dom";

export default function MainNavigation(){
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/users">Utilizadores</Link>
                    </li>
                    <li>
                        <Link to="/logout">Sair</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}