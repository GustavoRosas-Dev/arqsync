import React from "react";
import "./NotFound.css";

const Page404 = () => {
  const handleGoBack = () => {
    window.history.back(); // Volta para a página anterior
  };

  return (
    <section className="page_404">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="col-sm-10 col-sm-offset-1 text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center">404</h1>
              </div>
              <div className="contant_box_404">
                <h3 className="h2">Parece que alguém está perdido...</h3>
                <p className="p">
                  A página que você está procurando não está disponível!
                </p>
                <button onClick={handleGoBack} className="link_404">
                  Voltar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page404;
