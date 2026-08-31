# Padrões de Código - LipAI Front

## 📋 Convenções de Nomenclatura

### Arquivos e Pastas
- **Componentes**: `PascalCase` (ex: `Button.jsx`, `UserCard.jsx`)
- **Páginas**: `PascalCase` com prefixo `Page` (ex: `PageDashboard.jsx`, `PageLogin.jsx`)
- **Serviços**: `camelCase` com sufixo `Service` (ex: `authService.js`, `userService.js`)
- **Hooks**: `camelCase` com prefixo `use` (ex: `useTheme.js`, `useAuth.js`)
- **Estilos**: `kebab-case` (ex: `button-styles.css`, `header-theme.css`)
- **Pastas**: `lowercase` ou `camelCase` (ex: `components/`, `services/`, `pages/`)

### Extensões
- **React Components**: `.jsx`
- **JavaScript puro**: `.js`
- **Estilos**: `.css`

## 🗂️ Estrutura de Diretórios

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Button/
│   │   ├── Button.jsx
│   │   └── button.css
│   └── Card/
│       ├── Card.jsx
│       └── card.css
├── pages/              # Páginas da aplicação
│   ├── PageDashboard.jsx
│   └── PageLogin.jsx
├── services/           # Serviços de API e lógica
│   ├── authService.js
│   ├── userService.js
│   └── api.js
├── hooks/              # Custom React hooks
│   ├── useTheme.js
│   └── useAuth.js
├── styles/             # Estilos globais
│   ├── theme-dark.css
│   └── theme-light.css
├── routes/             # Configuração de rotas
│   └── routes.jsx
├── App.jsx             # Componente raiz
├── main.jsx            # Entry point
└── index.css           # Estilos globais
```

## 🔧 Padrões de Código

### Serviços de API
```javascript
// authService.js
import api from './api';

export async function login(email, password) {
  try {
    const response = await api.post('/Auth/login', {
      Email: email,
      Senha: password,
    });
    const { token, role, id, nome, email: userEmail } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('id', id);
    localStorage.setItem('nome', nome);
    localStorage.setItem('email', userEmail);

    return { success: true, data: response.data };
  } catch (error) {
    const message = error.response?.data?.message || 'Erro ao fazer login.';
    return { success: false, message };
  }
}

export function logout() {
  localStorage.clear();
}
```

### Componentes React
```javascript
// Button.jsx
import './button.css';

export default function Button({ children, variant = 'primary', ...props }) {
  return (
    <button className={`btn btn--${variant}`} {...props}>
      {children}
    </button>
  );
}
```

### Imports
- Sempre use imports nomeados para melhor tree-shaking
- Organize imports em grupos: bibliotecas externas → componentes → serviços → hooks → estilos
```javascript
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../components/Button';
import { login } from '../services/authService';
import { useTheme } from '../hooks/useTheme';

import './page-login.css';
```

### Variáveis de Estado e Resposta
- Use `success` em vez de `sucesso` (padrão internacional)
- Use `message` em vez de `mensagem`
- Mantenha consistência em nomes de propriedades

```javascript
// ❌ Evitar
{ sucesso: true, mensagem: "OK" }

// ✅ Preferir
{ success: true, message: "OK", data: {...} }
```

## 📝 ESLint e Prettier
- Configuração em `eslint.config.js`
- Execute `npm run lint` para validar

## 🎨 Convenção de Cores CSS
- Use variáveis CSS do tema (definidas em `src/index.css`)
- Exemplo: `var(--lipai-purple)`, `var(--lipai-surface)`

## ✅ Checklist para PRs
- [ ] Nomes de arquivos seguem a convenção
- [ ] Extensões corretas (.jsx, .js, .css)
- [ ] Imports organizados
- [ ] Sem duplicação de código
- [ ] Componentes reutilizáveis em `/components`
- [ ] Lógica de API em `/services`
- [ ] ESLint passou (`npm run lint`)
