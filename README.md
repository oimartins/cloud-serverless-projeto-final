# Projeto Final - Arquitetura Event-Driven com IA

## Integrantes

- Carolina da Silva Martins

---

# Visão Geral

Este projeto consolida todos os conceitos desenvolvidos ao longo da disciplina, reunindo uma arquitetura serverless orientada a eventos (Event-Driven Architecture) utilizando serviços da Google Cloud Platform (GCP).

A solução integra:

- Google Cloud Functions
- Google Cloud Pub/Sub
- Google Cloud Workflows
- Logging e Monitoring
- GitHub Actions (CI/CD)
- Inteligência Artificial (AI Analyzer)

O sistema simula o processamento de pedidos, realizando validação, análise de risco por IA, publicação de eventos, notificações, observabilidade e deploy automatizado.

---

# Objetivo do Projeto

Desenvolver uma arquitetura moderna baseada em eventos capaz de:

- Receber pedidos para processamento;
- Validar informações recebidas;
- Classificar pedidos utilizando Inteligência Artificial;
- Publicar eventos no Pub/Sub;
- Realizar notificações automáticas;
- Garantir escalabilidade e baixo acoplamento;
- Possuir observabilidade completa;
- Automatizar o deploy utilizando CI/CD.

---

# Arquitetura da Solução

```text
GitHub
   |
   v
GitHub Actions (CI/CD)
   |
   v
Cloud Functions

                    +------------------+
                    | Cloud Workflows |
                    +------------------+
                              |
                              v
                    validateOrder
                              |
                              v
                      aiAnalyzer
                              |
                              v
                      Pub/Sub orders
                              |
                              v
                      notifyOrder
                              |
                              v
                     Cloud Logging
                              |
                              v
                   Cloud Monitoring
```

---

# Componentes da Solução

## validateOrder

Função responsável por validar os dados recebidos antes do processamento.

Valida:

- ID do pedido
- Estrutura do payload
- Campos obrigatórios

---

## aiAnalyzer

Função responsável pela integração com Inteligência Artificial.

Objetivos:

- Classificar o risco do pedido
- Gerar recomendações automáticas
- Auxiliar na tomada de decisão

Exemplo:

Entrada:

```json
{
  "id": 101,
  "amount": 3500
}
```

Saída:

```json
{
  "riskLevel": "HIGH"
}
```

---

## Pub/Sub

Implementa comunicação assíncrona baseada em eventos.

### Tópicos utilizados

```text
orders
orders-dlq
```

Onde:

- orders = processamento principal
- orders-dlq = mensagens com falha

---

## notifyOrder

Responsável por registrar o resultado do processamento e gerar notificações.

---

## Cloud Workflows

Responsável pela orquestração de todo o fluxo.

Fluxo:

1. Receber pedido
2. Validar pedido
3. Analisar pedido com IA
4. Publicar evento
5. Notificar processamento
6. Finalizar execução

---

## Cloud Logging

Responsável pelo armazenamento centralizado dos logs da aplicação.

---

## Cloud Monitoring

Responsável pelo monitoramento e métricas de execução.

Métricas monitoradas:

- Número de execuções
- Tempo médio de resposta
- Taxa de erro
- Consumo de memória
- Mensagens processadas

---

## GitHub Actions

Pipeline responsável pelo deploy automático.

Fluxo:

```text
git push
   |
   v
GitHub Actions
   |
   +--> Deploy validateOrder
   |
   +--> Deploy aiAnalyzer
   |
   +--> Deploy notifyOrder
   |
   +--> Deploy Workflow
```

---

# Estrutura do Projeto

```text
cloud-serverless-final/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── workflow.yaml
│
├── validateOrder/
│   ├── index.js
│   └── package.json
│
├── aiAnalyzer/
│   ├── index.js
│   └── package.json
│
├── notifyOrder/
│   ├── index.js
│   └── package.json
│
├── docs/
│   ├── arquitetura.png
│   ├── observabilidade.png
│   ├── pipeline.png
│   └── workflow-execution.png
│
└── README.md
```

---

# Perguntas e Respostas

## 1. Por que utilizar uma arquitetura Event-Driven?

A arquitetura orientada a eventos promove baixo acoplamento entre os serviços, facilitando escalabilidade, manutenção e evolução do sistema. Além disso, permite processamento assíncrono e maior resiliência a falhas.

---

## 2. Por que utilizar o Google Cloud Pub/Sub?

O Pub/Sub permite a troca de mensagens entre componentes sem que eles dependam diretamente uns dos outros.

Benefícios:

- Comunicação assíncrona
- Escalabilidade automática
- Alta disponibilidade
- Desacoplamento entre serviços

---

## 3. Por que utilizar Google Cloud Functions?

Cloud Functions permite executar código sob demanda sem necessidade de gerenciar servidores.

Benefícios:

- Serverless
- Escalonamento automático
- Menor custo operacional
- Implantação simplificada

---

## 4. Por que utilizar Google Cloud Workflows?

O Workflows centraliza a lógica de orquestração do sistema.

Benefícios:

- Organização do fluxo
- Facilidade de manutenção
- Tratamento de falhas
- Retry automático

---

## 5. Por que integrar Inteligência Artificial?

A IA permite adicionar capacidades de tomada de decisão e classificação automática aos processos de negócio.

No projeto, a IA é utilizada para avaliar o risco dos pedidos antes da publicação dos eventos.

---

## 6. Como o projeto trata falhas?

Em caso de falha:

- O Workflow realiza novas tentativas (retry);
- Erros são registrados no Cloud Logging;
- Mensagens problemáticas são enviadas para a Dead Letter Queue (orders-dlq).

---

## 7. Como garantir observabilidade?

Foram utilizados:

- Cloud Logging
- Cloud Monitoring
- Logs estruturados em JSON
- Métricas operacionais

Isso permite rastrear o comportamento da arquitetura em tempo real.

---

## 8. Como funciona o CI/CD?

Sempre que ocorre um push na branch principal:

1. GitHub Actions é acionado;
2. As Cloud Functions são implantadas;
3. O Workflow é atualizado;
4. A nova versão entra em produção automaticamente.

---

## 9. Quais são os principais benefícios da solução?

- Arquitetura desacoplada
- Escalabilidade automática
- Observabilidade centralizada
- Deploy automatizado
- Baixo custo operacional
- Integração com IA

---

# Segurança do Projeto

A segurança foi considerada desde o início da implementação.

## Medidas adotadas

### Credenciais protegidas

Nenhuma credencial foi armazenada no repositório.

Utilizamos:

```text
GitHub Secrets
```

para armazenar:

```text
GCP_PROJECT_ID
GCP_CREDENTIALS
```

---

### Arquivos sensíveis ignorados

Arquivos protegidos através do `.gitignore`:

```text
key.json
credentials.json
.env
```

---

### Uso de Service Accounts

O acesso aos recursos da Google Cloud é realizado através de Service Accounts dedicadas com permissões mínimas necessárias.

---

### Dead Letter Queue

Mensagens que apresentam falhas são encaminhadas para:

```text
orders-dlq
```

evitando perda de dados.

---

### Logs sem informações sensíveis

Os logs armazenam apenas informações operacionais.

Não são registrados:

- Senhas
- Tokens
- Chaves de API
- Credenciais

---

### Controle de Acesso

Apenas usuários autorizados possuem acesso:

- Repositório GitHub
- Projeto GCP
- Configurações de deploy

---

# Evidências

Adicionar na pasta:

```text
docs/
```

os seguintes arquivos:

```text
arquitetura.png
observabilidade.png
pipeline.png
workflow-execution.png
```

As evidências devem demonstrar:

- Execução do Workflow
- Logs das Cloud Functions
- Métricas do Monitoring
- CI/CD executado com sucesso

---

# Conclusão

O projeto final demonstra a criação de uma arquitetura serverless moderna baseada em eventos utilizando Google Cloud Platform. A solução reúne processamento assíncrono, orquestração de serviços, integração com Inteligência Artificial, observabilidade completa, segurança e automação de deploy, consolidando todos os conceitos abordados durante a disciplina.
