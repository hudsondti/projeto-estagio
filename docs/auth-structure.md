# Sistema de Autenticação - Estrutura do Projeto

## 📁 Estrutura de Arquivos

```
projeto-estagio/
├── app/
│   ├── (auth)/                     # Grupo de rotas de autenticação
│   │   ├── layout.tsx              # Layout específico para auth (sem header/sidebar)
│   │   ├── cadastro/
│   │   │   └── page.tsx            # Página de cadastro
│   │   └── login/
│   │       └── page.tsx            # Página de login
│   ├── layout.tsx                  # Layout principal com AuthProvider
│   ├── page.tsx                    # Página inicial (redireciona conforme auth)
│   └── inicio/                     # Páginas protegidas
│       └── page.tsx
├── src/
│   ├── contexts/
│   │   └── AuthContext.tsx         # Context para gerenciar autenticação
│   └── components/
│       ├── LayoutContent.tsx       # Controla quando mostrar header/sidebar
│       ├── ProtectedRoute.tsx      # Protege rotas privadas
│       └── Header/
│           └── Header.tsx          # Header atualizado com logout
└── docs/
    └── auth-structure.md          # Esta documentação
```

## 🔐 Fluxo de Autenticação

### 1. **Primeira Visita**
- Usuário acessa `/` (raiz)
- Como não está autenticado → redirecionado para `/cadastro`
- Página de cadastro aparece **SEM header/sidebar**

### 2. **Após Cadastro**
- Dados enviados para API
- Se sucesso → Login automático + redirecionamento para `/inicio`
- Agora **COM header/sidebar**

### 3. **Login Posterior**
- Usuário acessa `/login`
- Página de login aparece **SEM header/sidebar**
- Após login → redirecionamento para `/inicio`

### 4. **Proteção de Rotas**
- Usuário não autenticado tenta acessar página protegida → redirecionado para `/login`
- Usuário autenticado tenta acessar `/login` ou `/cadastro` → redirecionado para `/inicio`

## 🧩 Componentes Principais

### **AuthContext**
- Gerencia estado global de autenticação
- Funções: `login()`, `register()`, `logout()`
- Persiste dados no `localStorage`

### **ProtectedRoute**
- Wrapper que protege rotas privadas
- Redireciona usuários não autenticados

### **LayoutContent**
- Decide quando mostrar header/sidebar
- Páginas de auth: layout limpo
- Páginas protegidas: layout completo

## 🛣️ Tipos de Rotas

### **Públicas** (sem autenticação)
- `/login` - Login
- `/cadastro` - Cadastro
- `/recuperar-senha` - Recuperação de senha

### **Protegidas** (requer autenticação)
- `/inicio` - Dashboard principal
- `/meus-estagios` - Lista de estágios
- Todas as outras rotas

## 📱 Layouts

### **Layout de Autenticação** (`app/(auth)/layout.tsx`)
```tsx
- Background gradient
- Logo centralizado
- Card de conteúdo
- SEM header/sidebar
```

### **Layout Principal** (`app/layout.tsx`)
```tsx
- AuthProvider wrapper
- LayoutContent para controle condicional
- COM header/sidebar (apenas se autenticado)
```

## 🔧 Configurações de Redirecionamento

| Condição | Origem | Destino |
|----------|---------|---------|
| Não autenticado | `/` | `/cadastro` |
| Não autenticado | Qualquer rota protegida | `/login` |
| Autenticado | `/` | `/inicio` |
| Autenticado | `/login` ou `/cadastro` | `/inicio` |

## 💾 Persistência

- **Token**: `localStorage.getItem('authToken')`
- **Dados do usuário**: `localStorage.getItem('userData')`
- **Auto-login**: Verifica dados salvos na inicialização

## 🎨 Design System

### **Cores**
- Primária: `#605BFF`
- Hover: `#4F46E5`
- Sucesso: `green-500`
- Erro: `red-500`

### **Estados de Loading**
- Spinner animado
- Desabilitar botões durante requests
- Feedback visual para o usuário

## 🚀 Como Usar

### **1. Primeira configuração**
```bash
npm run dev
```

### **2. Testar fluxo**
1. Acesse `http://localhost:3000`
2. Deve ir para `/cadastro`
3. Preencha o formulário
4. Após sucesso → `/inicio` com header

### **3. Testar logout**
1. Clique no ícone de logout no header
2. Deve voltar para `/login`

## 🔌 Integração com API

### **Endpoints esperados**
```
POST /api/auth/login
POST /api/auth/register
```

### **Formato de resposta**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "123",
    "name": "Nome do Usuário",
    "email": "email@exemplo.com"
  }
}
```

## 🎯 Principais Benefícios

1. **UX Clean**: Primeira experiência direto no cadastro
2. **Segurança**: Rotas protegidas automaticamente
3. **Flexibilidade**: Layouts diferentes por contexto
4. **Manutenibilidade**: Código organizado e reutilizável
5. **Performance**: Loading states e redirecionamentos otimizados

## 🔄 Próximos Passos

1. Implementar recuperação de senha
2. Adicionar validação de email
3. Implementar refresh token
4. Adicionar roles de usuário
5. Implementar 2FA (opcional)