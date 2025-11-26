### Regras de negócios (issues)

### Descrição da Regra de Negócio (RN01)

O sistema deve permitir agendamentos apenas em blocos de tempo pré-definidos (30min, 1h), com horários de início e fim fixos, evitando sobreposição.

-   **Evento/Gatilho:** Tentativa de agendamento por usuário.
-   **Exemplo:** Um cliente tenta agendar um horário às 14h35, mas o sistema só oferece horários cheios (14h00, 14h30, 15h00).
-   **Pseudo-código:** `SE horarioSolicitado % intervaloBloco != 0 ENTÃO exibirHorariosDisponiveis()`.

### Objetivo

Garantir que os usuários só possam agendar treinos em intervalos de tempo padronizados, otimizando a organização da academia.

### Critérios de Aceite

-   [ ] A API deve rejeitar tentativas de agendamento fora dos blocos pré-definidos (ex: 14h15, 15h05).
-   [ ] A interface de usuário (UI) deve apresentar apenas os horários disponíveis em blocos fixos para seleção.
-   [ ] O sistema deve evitar qualquer sobreposição de horários para o mesmo equipamento ou vaga.

### Regras Relacionadas

-   Esta issue está relacionada à **RN04** (Sugestão de horários alternativos). Ver Issue #14 

---

### Descrição da Regra de Negócio (RN02)

Caso não haja horários disponíveis, o usuário pode optar por entrar em uma lista de espera. O sistema notificará automaticamente se houver desistência.

-   **Evento/Gatilho:** Agendamento esgotado ou cancelamento.
-   **Exemplo:** Cliente tenta agendar para o dia 15, mas não há vagas. O sistema pergunta se ele deseja entrar na lista de espera.
-   **Pseudo-código:** `SE listaHorariosDisponiveis.vazia() ENTÃO ofertaListaEspera()`.

### Objetivo

Minimizar vagas ociosas causadas por desistências, oferecendo a vaga automaticamente para o próximo da fila de espera.

### Critérios de Aceite

-   [ ] Quando um horário estiver lotado, o usuário deve ver a opção "Entrar na lista de espera".
-   [ ] Ao clicar, o usuário deve ser adicionado a uma fila para aquele horário específico.
-   [ ] Se um agendamento para esse horário for cancelado, o primeiro usuário da lista de espera deve ser notificado sobre a vaga disponível.
-   [ ] O usuário notificado deve ter um tempo limitado para aceitar a vaga antes que ela seja oferecida ao próximo da lista.

### Regras Relacionadas

-   Esta issue está relacionada à **RN03** (Política de cancelamento). Ver Issue #13 

---

### Descrição da Regra de Negócio (RN03)

Os cancelamentos devem ser feitos com pelo menos 30 minutos de antecedência. Cancelamentos feitos com menos de 30 minutos resultam em restrições temporárias.

-   **Evento/Gatilho:** Usuário solicita cancelamento de agendamento.
-   **Exemplo:** Se um agendamento é para as 15h00, o cancelamento deve ser feito até as 14h30 para evitar penalidades.

### Objetivo

Reduzir o número de cancelamentos de última hora e garantir que as vagas possam ser reaproveitadas pela lista de espera.

### Critérios de Aceite

-   [ ] O usuário pode cancelar um agendamento sem penalidades se o fizer com mais de 30 minutos de antecedência.
-   [ ] Se o cancelamento ocorrer a menos de 30 minutos do horário agendado, o sistema deve aplicar uma restrição temporária ao usuário (a ser definida, ex: não poder agendar por 24h).
-   [ ] Após o cancelamento (dentro do prazo), a vaga deve ser liberada e o sistema da lista de espera (RN02) deve ser notificado.

### Regras Relacionadas

-   Esta issue está relacionada à **RN02** (Lista de espera automática). Ver Issue #12  .

---

### Descrição da Regra de Negócio (RN04)

Quando o horário solicitado não está disponível, o sistema mostra automaticamente os 3 horários mais próximos disponíveis.

-   **Evento/Gatilho:** Busca por horário específico retorna vazio.
-   **Exemplo:** Usuário busca horário às 14h00, e o sistema sugere 13h30, 14h30 e 15h00.

### Objetivo

Aumentar a conversão de agendamentos ao oferecer alternativas imediatas para o usuário, melhorando sua experiência.

### Critérios de Aceite

-   [ ] Se um usuário selecionar um horário que está lotado, a interface deve exibir uma mensagem indicando a indisponibilidade.
-   [ ] Logo após, o sistema deve buscar e exibir os 3 horários vagos mais próximos (antes e/ou depois) do horário solicitado.
-   [ ] O usuário deve ser capaz de selecionar um dos horários sugeridos para agendar.

### Regras Relacionadas

-   Esta issue está relacionada à **RN01** (Sistema de agendamento por blocos de tempo). Ver Issue #11 .

---

### Descrição da Regra de Negócio (RN05)

Cada tipo de usuário tem permissões específicas no sistema de agendamento.

-   **Evento/Gatilho:** Tentativa de acesso a qualquer função do sistema.
-   **Exemplo:** Permissões específicas por tipo de usuário.

### Objetivo

Garantir a segurança e a integridade do sistema, permitindo que diferentes tipos de usuários (ex: Aluno, Gerente) acessem apenas as funcionalidades relevantes para eles.

### Critérios de Aceite

-   [ ] Deve existir um perfil de **Aluno** que pode agendar, cancelar e visualizar seus próprios treinos.
-   [ ] Deve existir um perfil de **Gerente** que pode visualizar todos os agendamentos, gerenciar horários e acessar o painel administrativo (RF06).
-   [ ] Um usuário com perfil de Aluno não pode acessar as funcionalidades de Gerente.
-   [ ] O sistema deve verificar a permissão do usuário a cada requisição de acesso a uma funcionalidade.

### Regras Relacionadas

-   Esta issue está relacionada a **Todas as RNs**.

---

### Descrição da Regra de Negócio (RN06)

Limite máximo de 30 usuários por horário para evitar superlotação.

-   **Evento/Gatilho:** Verificação de disponibilidade no agendamento.
-   **Exemplo:** Horário das 14h00 tem 28/30 vagas - permite novo agendamento.
-   **Pseudo-código:** `SE contagemAgendamentos(horario) < capacidadeMaxima ENTÃO permitirAgendamento()`.

### Objetivo

Controlar o fluxo de pessoas na academia para evitar superlotação e garantir uma melhor experiência para os clientes.

### Critérios de Aceite

-   [ ] O sistema deve ter uma capacidade máxima configurável por bloco de horário (inicialmente 30).
-   [ ] Antes de confirmar um agendamento, o sistema deve verificar se o número de usuários agendados para aquele horário é menor que a capacidade máxima.
-   [ ] Se o horário estiver lotado (30/30), o sistema deve impedir o novo agendamento e acionar a RN02 (Lista de Espera).

### Regras Relacionadas

-   Esta issue está relacionada à **RN02** (Lista de espera automática) e **RN08** (Sistema de prioridade). Ver Issue #12 e #17 

---

### Descrição da Regra de Negócio (RN07)

Máximo de 4 agendamentos por usuário por semana.

-   **Evento/Gatilho:** Tentativa de novo agendamento.
-   **Exemplo:** Usuário com 3 agendamentos na semana pode fazer mais 1.

### Objetivo

Garantir que todos os usuários tenham uma chance justa de agendar horários, evitando que poucos usuários monopolizem as vagas.

### Critérios de Aceite

-   [ ] O sistema deve rastrear o número de agendamentos que um usuário fez na semana corrente (segunda a domingo).
-   [ ] Ao tentar fazer um novo agendamento, o sistema deve verificar se o usuário já atingiu o limite de 4.
-   [ ] Se o limite for atingido, o sistema deve exibir uma mensagem informativa e bloquear a tentativa de agendamento.
-   [ ] O contador de agendamentos deve ser zerado no início de cada semana.

### Regras Relacionadas

-   Esta issue está relacionada à **RN05** (Controle de acesso por perfil) Ver Issue #2 .

---

### Descrição da Regra de Negócio (RN08)

Usuários com maior frequência têm prioridade em horários concorridos.

-   **Evento/Gatilho:** Conflito por vaga em horário disputado.
-   **Exemplo:** Dois usuários querem a mesma vaga - a prioridade é para o que possuir maior frequência.

### Objetivo

Recompensar usuários assíduos, dando-lhes prioridade na marcação de horários de pico.

### Critérios de Aceite

-   [ ] O sistema deve calcular a "frequência" de cada usuário (ex: número de treinos nos últimos 30 dias).
-   [ ] Em um cenário de conflito por uma única vaga (ex: último slot ou vaga liberada da lista de espera), o sistema deve dar a prioridade ao usuário com maior frequência.
-   [ ] A lógica de desempate, caso a frequência seja a mesma, deve ser definida (ex: "primeiro a chegar").

### Regras Relacionadas

-   Esta issue está relacionada à **RN06** (Capacidade de Usuários por horário). Ver Issue #15 .

---

### RF03: Perfil do Usuário

- Criar os endpoints para que um utilizador autenticado possa ver (GET /api/profile) e atualizar (PUT /api/profile) os seus dados de perfil (idade, peso, altura, etc.).


