import "./BannerVersaoArqSync.css"; /* importa o css */
import { Link } from "react-router-dom"; /* Link, do router-dom: para nevagar o usuário para a página promocional */

export default function BannerVersaoArqSync() {
  return (
    <div className="BannerVersaoArqSync">
      ArqSync&nbsp;
      <Link to="/release-notes" className="version-link">
        versão 1.0
      </Link>
    </div>
  );
}
