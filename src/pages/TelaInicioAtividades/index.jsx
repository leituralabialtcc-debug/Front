import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

import Navbar from "../../components/Navbar";
import Filtro from "../../components/Filtro";
import InfoAtividade from "../../components/InfoAtividades/InfoAtividades";
import Botao from "../../components/Botao";
import { HeaderActions } from "../../components/infoEstrelas";
import { UserProfileDrawer } from "../../components/UserProfileDrawer"; 

import personagem from "../../assets/img/bia_inicioatividade.png";
import realizadas from "../../assets/img/realizadas.png";
import salvas from "../../assets/img/salvas.png";
import revisadas from "../../assets/img/revisadas.png";

import { useTelaInicioAtividades } from "./index.hook"; 

const TelaInicioAtividades = () => {
  const { 
    drawerAberto, 
    abrirPerfil, 
    fecharPerfil,
    search,
    setSearch,
    difficulty,
    setDifficulty,
    status,
    setStatus,
    toggleItem,
    atividadesFiltradas 
  } = useTelaInicioAtividades();
  
  const navigate = useNavigate();

  // Separando visualmente o que é "continuar" do que é "recomendada" 
  // (Opcional: você pode ajustar conforme a lógica real do seu app)
  const atividadesParaContinuar = atividadesFiltradas.filter(a => a.categoria === "continuar");
  const atividadesRecomendadas = atividadesFiltradas.filter(a => a.categoria === "recomendada");

  return (
    <div className="pagina-atividades">
      <Navbar />

      <div className="conteudo">
        <section className="principal">
          
          <div className="topo-acoes">
            <div className="menu-espaco-placeholder"></div> 
            <HeaderActions onOpenProfile={abrirPerfil} />
          </div>

          <div className="banner">
            <div className="banner-texto">
              <h1>Dicionário</h1>
              <p>
                Teste seus conhecimentos de leitura labial através de um
                dicionário. Veja quais são cha cha vdw chawd w w daw
                dwdad wd a dw ad wad wad wd
              </p>
              <Botao
               texto="Testar"
               corDeFundo="#FFFFFF"
               corTexto="#6D458C"
               onClick={() => navigate("/dicionario")}
              />
            </div>
            <img src={personagem} alt="" />
          </div>

          <div className="infos">
            <div className="card-info">
              <img src={realizadas} alt="" />
              <div>
                <span>10 Atividades</span>
                <h3>Realizadas</h3>
              </div>
            </div>

            <div className="card-info">
              <img src={salvas} alt="" />
              <div>
                <span>08 Atividades</span>
                <h3>Salvas</h3>
              </div>
            </div>

            <div className="card-info">
              <img src={revisadas} alt="" />
              <div>
                <span>02 Atividades</span>
                <h3>Revisadas</h3>
              </div>
            </div>
          </div>

          {/* Lista Dinâmica: Continuar Atividade */}
          <h2>Continuar Atividade</h2>
          {atividadesParaContinuar.length > 0 ? (
            atividadesParaContinuar.map((atividade) => (
              <InfoAtividade
                key={atividade.id}
                titulo={atividade.titulo}
                descricao={atividade.descricao}
                dificuldade={atividade.dificuldade}
                tipo={atividade.tipo}
                progresso={atividade.progresso}
              />
            ))
          ) : (
            <p>Nenhuma atividade encontrada neste filtro.</p>
          )}

          {/* Lista Dinâmica: Recomendadas */}
          <h2>Recomendadas</h2>
          {atividadesRecomendadas.length > 0 ? (
            atividadesRecomendadas.map((atividade) => (
              <InfoAtividade
                key={atividade.id}
                titulo={atividade.titulo}
                descricao={atividade.descricao}
                dificuldade={atividade.dificuldade}
                tipo={atividade.tipo}
              />
            ))
          ) : (
            <p>Nenhuma atividade encontrada neste filtro.</p>
          )}
        </section>

        {/* Repassando todos os controles de estado para o Filtro */}
        <Filtro 
          search={search}
          setSearch={setSearch}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          status={status}
          setStatus={setStatus}
          toggleItem={toggleItem}
        />
      </div>

      <UserProfileDrawer isOpen={drawerAberto} onClose={fecharPerfil} />
    </div>
  );
};

export default TelaInicioAtividades;