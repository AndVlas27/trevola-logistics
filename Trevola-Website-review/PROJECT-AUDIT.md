# Revisão do projeto Trevola Logistics

## Alterações aplicadas

- Atualizada a paleta para azul-marinho, azul e ciano, com detalhes verdes e menos tons laranja; logótipo, fotografias, estrutura e composição das páginas foram mantidos.
- Ativado o botão WhatsApp em todas as páginas, com o destino `https://wa.me/351962336946`, abertura em novo separador e `rel="noopener noreferrer"`.
- Corrigidos os textos em inglês que apareciam na chamada final da página inicial em português.
- Traduzidos os rótulos das opções de transporte, o número do alvará e o nome acessível do botão WhatsApp nos idiomas disponíveis.
- Removidos o contador de demonstração e os logótipos Vite/TypeScript sem referências no projeto.

## Verificações

- `npm run build`: concluído sem erros de TypeScript ou Vite.
- Função de orçamento: verificados método HTTP, rejeição de origem externa, validação de pedido inválido e resposta de configuração ausente.
- Build estático: 48 rotas localizadas (12 páginas em inglês, português, francês e alemão), 48 entradas no sitemap e nenhuma referência local a asset em falta.
- Links externos com `target="_blank"` incluem `rel="noopener noreferrer"`.
- A configuração Vercel existente continua a usar `npm run build`, saída `dist`, cabeçalhos de segurança e a função `api/request-quote.js`.

## Limitações a resolver antes de lançar

- O envio efetivo do formulário exige `RESEND_API_KEY` e `RESEND_FROM_EMAIL` configurados nas variáveis de ambiente da Vercel e um remetente validado no Resend. Sem estas credenciais, o endpoint responde que o envio não está configurado.
- Não foram encontrados endereços oficiais de LinkedIn ou Facebook no projeto; não foram inventados links.
- O website é Vite + TypeScript sem React. A compatibilidade React não se aplica ao código atual.
- O site estático pode ser servido pela Cloudflare, mas a função de email usa o formato da Vercel. Para executar o formulário em Cloudflare Pages, será necessária uma função equivalente em Cloudflare Pages Functions.
- Não foi possível executar `npm ci`: o ambiente não conseguiu alcançar `registry.npmjs.org`. O build passou com as dependências já instaladas no ambiente.
- O browser isolado não conseguiu aceder ao servidor local de preview, por restrições de socket do ambiente. Assim, o comportamento foi verificado por build e auditorias estáticas/da função; não se declara um teste visual completo em Chrome, Edge, Firefox, Safari ou dispositivos físicos.
- As páginas legais ainda contêm dados de exemplo que devem ser revistos pela empresa antes de publicação.

## Sugestões não aplicadas

- Adicionar os URLs oficiais das redes sociais quando forem fornecidos.
- Fazer a revisão visual em browsers e dispositivos reais depois do deployment de preview.
- Se escolher Cloudflare Pages em vez de Vercel, adaptar e testar a função de orçamento para o runtime Cloudflare.
- Completar e validar as páginas legais com a entidade jurídica, morada, retenção de dados e jurisdição aplicável.
