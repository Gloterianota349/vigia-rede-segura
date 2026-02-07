

# VIGIA – Plataforma Inteligente de Vigilância Colaborativa da Rede Elétrica
## Protótipo MVP para Hackathon

---

## 🎯 Visão do Protótipo

Um protótipo frontend interativo e visualmente impactante que demonstra o fluxo completo: **denúncia cidadã → triagem por IA → validação técnica**, com dados realistas pré-carregados e a possibilidade de criar novas denúncias ao vivo durante a apresentação.

---

## 📱 Página 1: Landing Page / Tela Inicial

- Apresentação visual impactante do VIGIA com branding (cores azul esverdeado e verde claro)
- Estatísticas em destaque (animadas): total de denúncias, riscos prevenidos, tempo médio de resposta
- Dois botões de acesso principais:
  - **"Fazer Denúncia"** (visão cidadão)
  - **"Painel Técnico"** (visão Energisa)
- Breve explicação visual do fluxo em 3 passos

---

## 📱 Página 2: Formulário de Denúncia Cidadã

- Formulário limpo e acessível com:
  - **Categoria** da ocorrência (dropdown): fio solto, ligação irregular, poste danificado, risco à vida, transformador com problema, etc.
  - **Descrição** do problema (campo de texto)
  - **Upload de foto** (obrigatório, com preview)
  - **Localização** automática simulada via mapa interativo (o usuário pode clicar no mapa para selecionar o local)
  - **Toggle de anonimato** para denúncias sensíveis
- Após enviar, mostra animação de "processamento pela IA" e redireciona para a tela de resultado

---

## 📱 Página 3: Resultado da Triagem por IA (Simulada)

- Após envio da denúncia, exibe o "veredito da IA" com animação:
  - **Classificação**: Válida / Provavelmente válida / Inválida
  - **Tipo de ocorrência detectado** (sugestão automática)
  - **Nível preliminar de risco** (Baixo / Médio / Alto / Crítico) com cores
  - **Análise da imagem** (simulação mostrando o que a IA "identificou" na foto)
  - **Verificação de duplicatas** (status: nova ocorrência ou possível duplicata)
- Mensagem de feedback ao cidadão: "Sua denúncia foi registrada e está sendo analisada por especialistas"

---

## 📱 Página 4: Painel Técnico – Validação Especializada

- **Dashboard** com métricas resumidas no topo:
  - Denúncias pendentes, em análise, resolvidas
  - Distribuição por nível de risco (gráfico de rosca)
  - Tempo médio de resposta
- **Lista de ocorrências** em formato Kanban simplificado:
  - Colunas: Pendente IA → Validação Técnica → Em Atendimento → Resolvida
  - Cards com: foto miniatura, categoria, localização, nível de risco (badge colorido), tempo em aberto
- Ao clicar em um card, abre **modal de validação técnica**:
  - Foto ampliada
  - Avaliação da IA (o que ela classificou)
  - Histórico do local (ocorrências anteriores próximas)
  - Campos para o técnico: confirmar/rejeitar, classificação final de risco, prazo recomendado, tipo de equipe necessária

---

## 📱 Página 5: Mapa de Riscos

- Mapa interativo com marcadores das ocorrências:
  - Cores por nível de risco (verde, amarelo, laranja, vermelho)
  - Ícones por tipo de ocorrência
  - Ao clicar em um marcador: popup com resumo (categoria, status, nível de risco)
- Filtros: por tipo, por risco, por status
- Toggle entre visão pública (simplificada) e visão interna (detalhada)
- Áreas de calor (heatmap) mostrando concentração de ocorrências

---

## 📊 Dados Pré-carregados

- ~20-30 ocorrências fictícias realistas com:
  - Localizações em diferentes regiões (coordenadas reais de cidades brasileiras)
  - Diferentes categorias e níveis de risco
  - Diferentes status no pipeline (pendente, validada, em atendimento, resolvida)
  - Datas variadas para simular histórico
  - Fotos placeholder representativas (usando imagens genéricas)

---

## 🎨 Design e Experiência

- **Tema visual**: Profissional e tecnológico, com paleta azul esverdeado + verde claro
- **Ícones**: Lucide icons para consistência
- **Animações**: Transições suaves, animação de "processamento IA" ao enviar denúncia
- **Responsivo**: Funciona bem em mobile (demonstração do app cidadão) e desktop (painel técnico)
- **Dark mode** opcional para o painel técnico

---

## 🗂 Estrutura de Navegação

- **Navbar superior** com logo VIGIA e navegação entre as visões
- Rotas:
  - `/` – Landing page
  - `/denuncia` – Formulário de denúncia
  - `/denuncia/resultado` – Resultado da triagem IA
  - `/painel` – Dashboard técnico com Kanban
  - `/mapa` – Mapa de riscos

---

## ⚡ Observações Técnicas

- Todos os dados ficam em memória (sem backend neste momento)
- A "IA" é simulada com lógica baseada em regras (categorias → classificações predefinidas)
- O mapa usa Leaflet (biblioteca gratuita de mapas)
- Preparado para futura integração com backend (Lovable Cloud) e IA real (Lovable AI)

