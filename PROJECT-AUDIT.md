# Revisão do website Trevola Logistics

## Alterações aplicadas

- Atualizados os botões WhatsApp da página inicial e das páginas internas para `https://wa.me/351928338946`.
- Alinhado o logótipo do cabeçalho e rodapé com a referência azul e verde, incluindo uma versão otimizada a 800 × 267 px.
- Atualizadas as fotografias principais da frota e a imagem Open Graph para usar o novo grafismo nos camiões.
- Atualizado o favicon para a paleta azul-marinho e verde.
- Removidos ficheiros de arranque e imagens antigas sem referências no código: contador de demonstração, logótipos Vite/TypeScript e imagens originais duplicadas do logo e da frota.

## Verificações efetuadas

- `npm run build`: compilação TypeScript, build Vite e geração de páginas concluídas sem erros.
- Build gerou 61 documentos HTML, incluindo 48 páginas localizadas, e o sitemap contém 48 URLs localizadas.
- Pesquisa na build final não encontrou o número antigo nem links WhatsApp com destinos inesperados; o destino novo está presente nos bundles.
- Testes diretos da função de orçamento: método não permitido (405), origem externa (403), tipo de conteúdo incorreto (415), JSON inválido (400), dados incompletos (400) e honeypot (202) tiveram as respostas esperadas.
- Os links externos identificados com `target="_blank"` incluem `rel="noopener noreferrer"`.
- Vite processou todas as importações de imagens e estilos usados na build.

## Estado de publicação e serviços

- A Vercel liga o projeto `trevola-logistics` ao repositório público `AndVlas27/trevola-logistics` e associa `www.trevolalogistics.com` à produção; o domínio sem `www` redireciona com HTTP 308.
- A Resend mostra `trevolalogistics.com` como verificado, com DKIM e ambos os registos SPF verificados.
- As variáveis partilhadas `RESEND_API_KEY` e `RESEND_FROM_EMAIL` aparecem associadas ao projeto `trevola-logistics` em Production e Preview. Os valores são secretos e não foram lidos; confirme que a chave é a nova chave criada após a rotação da chave exposta e que o remetente está autorizado na Resend.
- A Cloudflare mostra o DNS como completo. Os registos do domínio raiz e `www` apontam para a Vercel em modo apenas DNS; os registos MX e de email Zoho foram preservados.
- A revisão foi registada no commit `bb4c849` da branch `codex/trevola-branding-audit` no GitHub.
- A Vercel concluiu o preview com estado Ready. A página inicial em português foi revista visualmente: o logótipo e o grafismo do camião correspondem à referência; o telefone e WhatsApp mostram o novo número. A página do formulário também abre corretamente.
- A produção continua na branch principal, sem alterações públicas; a atualização ainda não foi promovida.

## Pontos a confirmar antes da publicação

- O envio real de pedidos de orçamento depende de valores corretos para `RESEND_API_KEY` e `RESEND_FROM_EMAIL`. Os nomes e a associação ao projeto foram confirmados; os valores não podem ser verificados porque são secretos. Após publicação, deve ser enviado um pedido de teste e confirmada a entrega.
- As páginas de privacidade e termos identificam-se como modelos por completar. Antes de as apresentar como páginas finais, a empresa deve fornecer e validar denominação social, morada, prazo de conservação, fornecedor e práticas de tratamento, e lei/jurisdição aplicáveis.
- Não foram fornecidos URLs oficiais de redes sociais, por isso não foram inventados.
- O preview local não abriu no browser isolado desta sessão. A página inicial e o formulário foram revistos visualmente no preview da Vercel; não houve teste em dispositivo móvel físico.
- O build local e o preview Vercel estão concluídos. A publicação de produção aguarda a validação dos dados das páginas legais e o teste de entrega do formulário.
