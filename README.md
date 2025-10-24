# Task App PWA

Este é um aplicativo de tarefas moderno, feito com React + Vite e integrado ao Firebase. O app funciona offline (PWA), é responsivo e cada usuário vê apenas suas próprias tarefas.

## ✨ Funcionalidades

- 🔐 **Autenticação segura** - Cadastro e login de usuários
- ✅ **Gerenciamento de tarefas** - Adicionar, concluir e apagar tarefas
- 👤 **Contas individuais** - Cada usuário vê apenas suas próprias tarefas
- 📊 **Dashboard completo** - Profile com estatísticas e histórico
- 🔄 **Sincronização offline** - Funciona sem internet e sincroniza automaticamente
- 📱 **PWA (Progressive Web App)** - Instalável como aplicativo nativo
- 🎨 **Design moderno** - Interface elegante e responsiva
- 🌙 **Tema escuro/claro** - Adapta-se à preferência do sistema
- ♿ **Acessibilidade** - Alto contraste e navegação por teclado
- 📈 **Analytics integrado** - Firebase Analytics para métricas

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React 19 + Vite
- **Backend:** Firebase (Auth, Firestore, Analytics)
- **Styling:** CSS3 com design system personalizado
- **PWA:** Service Workers e Cache API
- **Fontes:** Google Fonts (Inter)
- **Ícones:** Emojis para melhor acessibilidade

## 🚀 Como Executar

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/JonathanOishi/task_app_pwa.git
   cd task_app_pwa
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o Firebase:**
   - Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
   - Configure Authentication (Email/Password)
   - Configure Firestore Database
   - Adicione as credenciais no arquivo `src/services/firebase.js`

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

## 🎨 Design System

O aplicativo utiliza um design system personalizado com:

- **Cores principais:** Azuis elegantes com gradientes
- **Tipografia:** Fonte Inter para melhor legibilidade
- **Espaçamento:** Sistema consistente de spacing
- **Componentes:** Cards, botões, formulários padronizados
- **Animações:** Microinterações suaves
- **Responsividade:** Mobile-first design

## 📱 PWA Features

- **Instalação offline:** Funciona sem internet
- **Cache inteligente:** Armazena dados localmente
- **Sincronização automática:** Quando volta online
- **Ícone na tela inicial:** Comporta-se como app nativo
- **Notificações:** (Em desenvolvimento)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Jonathan Oishi**
- GitHub: [@JonathanOishi](https://github.com/JonathanOishi)

📱 Screenshots


<img src="https://iili.io/Kg0TMyg.jpg" alt="Tela de Login" width="300"/> <img src="https://iili.io/Kg0TG8F.jpg" alt="Lista de Tarefas" width="300"/> <img src="https://iili.io/Kg0TEa1.jpg" alt="Perfil do Usuário" width="300"/> 


⭐ Se este projeto te ajudou, considere dar uma estrela!


