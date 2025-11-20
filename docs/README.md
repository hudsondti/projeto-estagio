# Conectando Spring Boot (Java) com Next.js

## Visão Geral

Este guia mostra como conectar uma API Spring Boot com um frontend Next.js, incluindo configurações de CORS, estrutura de serviços e gerenciamento de estado.

## 1. Estrutura do Projeto

```
projeto-estagio/
├── src/
│   ├── services/
│   │   ├── api.ts              # Configuração do Axios
│   │   └── internshipService.ts # Serviços específicos da API
│   └── hooks/
│       └── useInternships.ts   # Hooks React para estado da API
├── app/
│   └── meus-estagios/
│       ├── page.tsx
│       └── internshipdata.tsx  # Componente atualizado para usar API
└── docs/
    └── README.md              # Este arquivo
```

## 2. Configuração da API (Frontend)

### Configuração Base do Axios (src/services/api.ts)

```typescript
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptors para request e response
api.interceptors.request.use(config => config, error => Promise.reject(error));
api.interceptors.response.use(response => response, error => Promise.reject(error));

export default api;
```

### Serviço de Estágios (src/services/internshipService.ts)

Cria funções específicas para cada endpoint da API:

```typescript
export const internshipService = {
    getAll: (page, size) => api.get(`/internships?page=${page}&size=${size}`),
    getById: (id) => api.get(`/internships/${id}`),
    create: (data) => api.post('/internships', data),
    update: (id, data) => api.put(`/internships/${id}`, data),
    delete: (id) => api.delete(`/internships/${id}`),
};
```

## 3. Configuração do Backend (Spring Boot)

### Configuração de CORS

Crie uma classe de configuração no Spring Boot:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

### Controller de Exemplo

```java
@RestController
@RequestMapping("/api/internships")
public class InternshipController {
    
    @GetMapping
    public ResponseEntity<Page<Internship>> getAll(Pageable pageable) {
        // Sua lógica aqui
    }
    
    @PostMapping
    public ResponseEntity<Internship> create(@RequestBody Internship internship) {
        // Sua lógica aqui
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Internship> update(@PathVariable Long id, @RequestBody Internship internship) {
        // Sua lógica aqui
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        // Sua lógica aqui
    }
}
```

## 4. Usando no React

### Hook Personalizado (src/hooks/useInternships.ts)

Facilita o gerenciamento de estado da API:

```typescript
export const useInternships = () => {
    const [internships, setInternships] = useState<Internship[]>([]);
    const [loading, setLoading] = useState(false);
    // ... outros estados e funções
    
    return { internships, loading, createInternship, updateInternship, /* ... */ };
};
```

### Usando no Componente

```typescript
import { useInternships } from '@/src/hooks/useInternships';

export default function InternshipComponent() {
    const { internships, loading, createInternship, updateInternship } = useInternships();
    
    // Use as funções para interagir com a API
}
```

## 5. Fluxo de Dados

1. **Frontend** → Faz requisição usando `axios`
2. **CORS** → Spring Boot verifica e permite a requisição
3. **Controller** → Processa a requisição
4. **Service** → Lógica de negócio
5. **Repository** → Acesso aos dados
6. **Response** → Retorna dados para o frontend

## 6. Tratamento de Erros

```typescript
try {
    const response = await internshipService.getAll();
    // Sucesso
} catch (error) {
    if (error.response) {
        // Erro da API (4xx, 5xx)
        console.error('Erro da API:', error.response.data);
    } else if (error.request) {
        // Erro de rede
        console.error('Erro de rede:', error.request);
    } else {
        // Erro de configuração
        console.error('Erro:', error.message);
    }
}
```

## 7. Comandos Úteis

### Frontend (Next.js)
```bash
npm install axios
npm run dev  # Roda em http://localhost:3000
```

### Backend (Spring Boot)
```bash
mvn spring-boot:run  # Roda em http://localhost:8080
```

## 8. Dependências Necessárias

### Frontend (package.json)
```json
{
  "dependencies": {
    "axios": "^1.6.0",
    "next": "15.5.6",
    "react": "19.1.0"
  }
}
```

### Backend (pom.xml)
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
</dependencies>
```

## 9. Estrutura de Endpoints Recomendada

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/internships` | Listar estágios (com paginação) |
| GET | `/api/internships/{id}` | Buscar por ID |
| POST | `/api/internships` | Criar novo estágio |
| PUT | `/api/internships/{id}` | Atualizar estágio |
| DELETE | `/api/internships/{id}` | Deletar estágio |
| GET | `/api/internships/status/{status}` | Buscar por status |

## 10. Próximos Passos

1. Implementar autenticação (JWT)
2. Adicionar validação de dados
3. Implementar upload de arquivos
4. Configurar ambiente de produção
5. Adicionar testes unitários e de integração