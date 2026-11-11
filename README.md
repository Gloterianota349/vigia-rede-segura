# VigiA: Rede Segura

Por favor, faça um protótipo ou MVP para expor minha solução a seguir:
"VIGIA – Plataforma Inteligente de Vigilância Colaborativa da Rede Elétrica

Uma plataforma digital colaborativa que conecta população, inteligência artificial e especialistas técnicos para identificar, validar, priorizar e mitigar riscos da rede elétrica em tempo quase real, com foco em prevenção de acidentes, eficiência operacional e transparência pública.

Visão geral do funcionamento (fluxo principal)

Denúncia cidadã estruturada

Validação automática por IA (triagem inteligente)

Validação técnica especializada

Classificação de risco e priorização

Ação operacional da Energisa

Transparência e alerta à população

Análise estratégica e recomendação de soluções

Esse fluxo fecha o ciclo prevenção → resposta → aprendizado, que é exatamente o que empresas de energia buscam hoje.

1. Módulo de Denúncia pela População (Crowdsourcing Estruturado)
Funcionalidades

Denúncia obrigatoriamente com:

Categoria (ex.: fio solto, ligação irregular, poste danificado, risco à vida, etc.)

Foto obrigatória

Localização automática (GPS)

Interface simples (app e web), com linguagem acessível.

Opção de denúncia anônima (especialmente importante para casos de “gato”).

Benefício para a Energisa

Ampliação massiva da capacidade de monitoramento sem custo de campo.

Detecção precoce de riscos antes de acidentes graves.

2. Validação Automática por IA (Primeiro Filtro)
O que a IA analisa

Imagem:

Identificação de padrões visuais (fio caído, proximidade do solo, faísca, ligação irregular, proximidade de pessoas).

Texto da denúncia:

Coerência entre categoria escolhida e descrição.

Detecção de denúncias duplicadas ou inconsistentes.

Resultado da IA

Classificação:

Válida

Provavelmente válida

Inválida / inconsistência

Sugestão automática de tipo de ocorrência e nível preliminar de risco.

👉 Aqui a IA não decide sozinha — ela prioriza e organiza, reduzindo carga humana.

3. Validação Técnica Especializada (Segundo Filtro)
Atuação do especialista da Energisa

Visualiza:

Foto

Categoria

Avaliação da IA

Histórico do local

Confirma:

Se a ocorrência é real

Classificação final de risco:

Baixo

Médio

Alto

Crítico (risco imediato à vida)

Define:

Prazo máximo recomendado de atendimento

Tipo de equipe necessária

Benefício

Garante confiabilidade técnica.

Evita alarmes falsos e uso indevido da plataforma.

4. Painel Operacional da Energisa (Gestão de Ocorrências)
Funcionalidades

Quadro Kanban ou lista:

Pendentes

Em atendimento

Resolvidas

Filtros por:

Região

Tipo

Classificação de risco

Tempo em aberto

SLA automático baseado no nível de risco.

Ganho real

Priorização objetiva.

Redução de acidentes e de custos emergenciais.

5. Mapa Público de Riscos (Transparência e Prevenção)
Visualização

Mapa com:

Local das ocorrências pendentes

Tipo

Classificação de risco

Versões:

Interna (Energisa) – dados completos

Pública (população) – dados resumidos e educativos

Importante

Não expõe dados sensíveis.

Foca em prevenção e cuidado, não em culpabilização.

6. Sistema de Alertas Georreferenciados à População
Regras de notificação

Raio de 3 km:

Alerta informativo (“há uma ocorrência elétrica na sua região”).

Raio de 100 m:

Alerta crítico (“perigo – mantenha distância”).

Tipos de alerta

Push notification

SMS (opcional)

Avisos no app

Impacto

Redução direta do risco à vida.

Educação passiva e contínua da população.

7. Módulo Analítico e de Relatórios Inteligentes
Filtros avançados

Data

Região

Tipo de ocorrência

Classificação de risco

Status

Frequência por área

Relatórios gerados

Áreas mais críticas

Tipos de ocorrência mais comuns por região

Correlação entre período do ano e tipo de risco

Tempo médio de resolução

Uso estratégico

Planejamento de manutenção preventiva.

Alocação eficiente de recursos.

Base concreta para decisões regulatórias e investimentos.

8. Inteligência Estratégica e Recomendação de Soluções
O que o sistema faz

Analisa:

Histórico de ocorrências

Tipos recorrentes

Regiões com reincidência

Identifica padrões:

Ex.: regiões com alto índice de “fio solto” após chuvas

Ex.: áreas com reincidência de ligações irregulares

Saída do sistema

Sugestões de soluções mais eficazes para cada local:

Troca de rede aérea por isolada

Intensificação de fiscalização

Ações educativas

Mudanças estruturais

9. Simulador de Propostas da Energisa (Índice de Efetividade)
Funcionamento

Técnico da Energisa insere:

Região

Proposta de ação (ex.: reforço da rede, campanha educativa, troca de postes)

O sistema:

Cruza a proposta com dados históricos semelhantes

Analisa resultados passados

Gera um índice percentual de efetividade estimada

Exemplo

“Essa proposta tem 78% de chance de reduzir ocorrências semelhantes em até 12 meses.”

⚠️ Importante: sempre apresentado como estimativa, não garantia.".
Se possível, para utilizar como histórico de dados e ocorrência, pegue dados da internet.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/391c4baf-c9b6-4fcb-ae06-26206a6c23c8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
