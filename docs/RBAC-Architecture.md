# Arquitetura RBAC - Sistema de Estágios

## Visão Geral

Este projeto implementa uma arquitetura baseada em **Role-Based Access Control (RBAC)** que permite uma sidebar unificada com conteúdo diferenciado baseado no papel do usuário.

## Estrutura de Arquivos

```
src/
├── types/
│   └── roles.ts                 # Definições de tipos para roles e permissões
├── hooks/
│   └── usePermissions.ts        # Hook para gerenciar permissões
├── components/
│   ├── common/
│   │   └── RoleBasedContent.tsx # Componentes para renderização condicional
│   ├── layout/
│   │   ├── Sidebar.tsx         # Sidebar inteligente
│   │   ├── Header.tsx          # Header do sistema
│   │   └── Layout.tsx          # Layout principal
│   └── role-based/
│       ├── professor/
│       │   └── EstagiosProfessor.tsx
│       └── coordenador/
│           └── EstagiosCoordenador.tsx
```

## Roles Definidos

### 1. **Aluno**
- **Permissões:**
  - Dashboard: visualizar
  - Estágios: visualizar próprios, criar, editar
  - Relatórios: visualizar próprios, criar, editar
  - Mensagens: visualizar, enviar, receber
  - Professores: listar (para seleção de orientador)

### 2. **Professor**
- **Permissões:**
  - Dashboard: visualizar
  - Estágios: visualizar orientandos, aprovar, rejeitar
  - Relatórios: visualizar orientandos, aprovar, rejeitar
  - Mensagens: visualizar, enviar, receber
  - Alunos: visualizar orientandos

### 3. **Coordenador**
- **Permissões:**
  - Dashboard: visualizar todos
  - Estágios: visualizar todos, aprovar, rejeitar, gerenciar
  - Relatórios: visualizar todos, aprovar, rejeitar, gerenciar
  - Mensagens: visualizar todos, enviar, receber
  - Professores: visualizar, criar, editar, deletar, gerenciar
  - Alunos: visualizar todos, gerenciar

## Como Usar

### 1. **Hook usePermissions**

```typescript
import { usePermissions } from '@/src/hooks/usePermissions';

function MeuComponente() {
  const { hasPermission, getUserRole, getVisibleMenuItems } = usePermissions();
  
  // Verificar permissão
  if (hasPermission('estagios', 'create')) {
    // Usuário pode criar estágios
  }
  
  // Obter role atual
  const role = getUserRole(); // 'aluno' | 'professor' | 'coordenador'
  
  // Obter itens de menu visíveis
  const menuItems = getVisibleMenuItems();
}
```

### 2. **Componente RoleBasedContent**

```typescript
import { RoleBasedContent, RoleGate } from '@/src/components/common/RoleBasedContent';

function MinhaPagina() {
  return (
    <div>
      {/* Renderização baseada em permissão */}
      <RoleBasedContent module="estagios" action="create">
        <button>Criar Estágio</button>
      </RoleBasedContent>
      
      {/* Renderização baseada em role específico */}
      <RoleGate roles={[UserRole.COORDENADOR, UserRole.PROFESSOR]}>
        <div>Conteúdo apenas para coordenadores e professores</div>
      </RoleGate>
    </div>
  );
}
```

### 3. **Layout com Proteção**

```typescript
import { ProtectedPage } from '@/src/components/layout/Layout';

export default function MinhaPageProtegida() {
  return (
    <ProtectedPage requiredModule="estagios" requiredAction="view">
      <div>Conteúdo da página</div>
    </ProtectedPage>
  );
}
```

### 4. **Páginas com Conteúdo por Role**

```typescript
import { usePermissions } from '@/src/hooks/usePermissions';
import { UserRole } from '@/src/types/roles';

export default function EstagiosPage() {
  const { getUserRole } = usePermissions();
  const userRole = getUserRole();

  const renderContent = () => {
    switch (userRole) {
      case UserRole.ALUNO:
        return <EstagiosAluno />;
      case UserRole.PROFESSOR:
        return <EstagiosProfessor />;
      case UserRole.COORDENADOR:
        return <EstagiosCoordenador />;
      default:
        return <AcessoNegado />;
    }
  };

  return (
    <ProtectedPage requiredModule="estagios">
      {renderContent()}
    </ProtectedPage>
  );
}
```

## Integração com Componentes Existentes

### Para preservar os componentes existentes dos alunos:

1. **Mantenha os arquivos em** `app/meus-estagios/`
2. **Importe-os nas novas páginas:**

```typescript
// Em app/(dashboard)/estagios/page.tsx
import { MeusEstagiosComponent } from '@/app/meus-estagios/page';

function EstagiosAluno() {
  return <MeusEstagiosComponent />;
}
```

3. **Ou redirecione baseado no role:**

```typescript
export default function EstagiosPage() {
  const { isRole } = usePermissions();
  const router = useRouter();

  useEffect(() => {
    if (isRole(UserRole.ALUNO)) {
      router.push('/meus-estagios');
      return;
    }
  }, []);

  // Conteúdo para professor/coordenador...
}
```

## Sidebar Inteligente

A sidebar automaticamente:
- ✅ Mostra/oculta itens baseado nas permissões
- ✅ Adapta rótulos para cada role
- ✅ Destaca o item ativo
- ✅ Mostra informações do usuário e role
- ✅ Inclui opção de logout

## Extensibilidade

### Adicionar Nova Permissão:

1. **Atualize o hook usePermissions:**
```typescript
const permissions = {
  [UserRole.ALUNO]: {
    // ... permissões existentes
    novoModulo: ['view', 'create']
  }
};
```

2. **Use nos componentes:**
```typescript
<RoleBasedContent module="novoModulo" action="create">
  <NovoComponente />
</RoleBasedContent>
```

### Adicionar Novo Role:

1. **Atualize src/types/roles.ts:**
```typescript
export enum UserRole {
  ALUNO = 'aluno',
  PROFESSOR = 'professor',
  COORDENADOR = 'coordenador',
  NOVO_ROLE = 'novo_role'
}
```

2. **Adicione permissões no usePermissions**
3. **Atualize componentes conforme necessário**

## Vantagens desta Arquitetura

1. **✅ Sidebar Unificada:** Uma única sidebar que se adapta
2. **✅ Segurança:** Controle granular de permissões
3. **✅ Manutenibilidade:** Fácil adicionar roles/permissões
4. **✅ Performance:** Renderização condicional eficiente
5. **✅ Reutilização:** Componentes reutilizáveis
6. **✅ Escalabilidade:** Cresce com o projeto
7. **✅ Preservação:** Componentes existentes mantidos

## Próximos Passos

1. **Integrar com sistema de autenticação** existente
2. **Migrar componentes existentes** para nova estrutura gradualmente
3. **Implementar API calls** reais nos componentes
4. **Adicionar testes** para permissões
5. **Configurar CI/CD** para deploy automático