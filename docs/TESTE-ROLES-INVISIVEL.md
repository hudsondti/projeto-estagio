# 🧪 Guia de Testes - Roles de Usuário

## 🎯 Como Testar Diferentes Roles SEM Alterar o Protótipo

O sistema foi configurado para permitir testes de diferentes roles mantendo a interface original intacta.

### 📧 **Método 1: Emails Inteligentes**

Use emails específicos que o sistema reconhece automaticamente:

#### 🎓 **Para Testar como ALUNO:**
- `hudson.xavier@aluno.com`
- `teste@estudante.br`  
- `qualquer@email.com` _(qualquer email sem "prof" ou "coord")_

#### 👨‍🏫 **Para Testar como PROFESSOR:**
- `hudson.prof@universidade.com`
- `professor.xavier@escola.br`
- `prof.hudson@teste.com`

#### 👨‍💼 **Para Testar como COORDENADOR:**
- `hudson.coord@universidade.com`
- `coordenador.xavier@escola.br`
- `coord.hudson@teste.com`

> **💡 Senha:** Qualquer senha funciona! O sistema é apenas para demonstração.

---

### ⌨️ **Método 2: Atalhos de Desenvolvimento (MAIS RÁPIDO)**

Após fazer login, use os atalhos de teclado:

| Atalho | Resultado |
|--------|-----------|
| `Ctrl + Alt + 1` | 🎓 Trocar para **Aluno** |
| `Ctrl + Alt + 2` | 👨‍🏫 Trocar para **Professor** |
| `Ctrl + Alt + 3` | 👨‍💼 Trocar para **Coordenador** |

> **⚠️ Importante:** Os atalhos só funcionam em modo desenvolvimento!

---

### 🎭 **O Que Muda para Cada Role:**

#### 👨‍🎓 **Hudson Xavier - Aluno**
- **Header:** "Aluno" 
- **Identificação:** "Hudson Xavier - Aluno"
- **Funcionalidades:** Visualizar próprios estágios, criar relatórios

#### 👨‍🏫 **Prof. Hudson Xavier - Professor**  
- **Header:** "Professor"
- **Identificação:** "Prof. Hudson Xavier - Professor"
- **Funcionalidades:** Visualizar estágios de orientandos, aprovar relatórios

#### 👨‍💼 **Dr. Hudson Xavier - Coordenador**
- **Header:** "Coordenador"  
- **Identificação:** "Dr. Hudson Xavier - Coordenador"
- **Funcionalidades:** Visão completa, gerenciar professores

---

### 🔄 **Fluxo de Teste Recomendado:**

1. **Login inicial:** Use `hudson.xavier@aluno.com` / `123`
2. **Veja interface do aluno:** Note como aparece "Hudson Xavier - Aluno"
3. **Troque para professor:** `Ctrl + Alt + 2`
4. **Observe mudanças:** Agora aparece "Prof. Hudson Xavier - Professor"
5. **Teste coordenador:** `Ctrl + Alt + 3`
6. **Compare diferenças:** "Dr. Hudson Xavier - Coordenador"

---

### 🛡️ **Vantagens desta Abordagem:**

- ✅ **Interface preservada:** Zero alterações no protótipo
- ✅ **Testes rápidos:** Atalhos de teclado instantâneos
- ✅ **Realismo:** Nomes e identificações reais
- ✅ **Desenvolvimento only:** Não afeta produção
- ✅ **Invisível ao usuário final:** Sistema transparente

---

### 🐛 **Solução de Problemas:**

#### **Atalhos não funcionam?**
- ✅ Verifique se está em desenvolvimento (`npm run dev`)
- ✅ Certifique-se de estar logado
- ✅ Use exatamente: `Ctrl + Alt + 1/2/3`

#### **Role não muda?**
- ✅ A página será recarregada automaticamente
- ✅ Observe o header e identificação do usuário

#### **Esqueceu qual atalho?**
- ✅ Abra o console do navegador (F12)
- ✅ Verá os atalhos listados no log

---

### 🎯 **Exemplo Prático:**

```bash
1. Acesse: http://localhost:3000
2. Login: hudson.xavier@aluno.com / 123
3. Observe: "Hudson Xavier - Aluno" no header
4. Pressione: Ctrl + Alt + 2  
5. Resultado: "Prof. Hudson Xavier - Professor"
6. Pressione: Ctrl + Alt + 3
7. Resultado: "Dr. Hudson Xavier - Coordenador"
```

**Pronto! Agora você pode testar todos os roles sem alterar nada na interface! 🚀**