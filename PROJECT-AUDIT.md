# Revisão do website Trevola Logistics

## Auditoria final — 15/10/2026

- Build de produção concluído sem erros. Foram verificadas 90 páginas localizadas (15 páginas × 6 idiomas), 90 URLs únicas no sitemap e 106 documentos HTML no total, incluindo páginas de compatibilidade e erro 404. As páginas esperadas, títulos, descrições, idiomas, alternates e assets locais estão presentes; não foram detetados destinos duplicados no sitemap.
- As 150 chaves de tradução têm correspondência entre os seis idiomas. Isto confirma consistência estrutural; não substitui revisão editorial por falantes nativos.
- Corrigidos o idioma e a descrição em inglês do manifesto PWA e o título/descrição em inglês/inexistente da página 404.
- O endpoint do formulário foi verificado sem enviar email: método, origem, tipo de conteúdo, JSON inválido, campos em falta e corpo acima do limite devolveram, respetivamente, 405, 403, 415, 400, 400 e 413. A leitura do corpo agora é interrompida ao exceder 20 KB, limitando consumo de memória. A confirmação de entrega real continua pendente para não disparar um pedido de orçamento à caixa da empresa sem autorização específica.
- `npm audit --omit=dev` não reporta vulnerabilidades nas dependências de produção. A auditoria completa de dependências não pôde consultar o registo npm por indisponibilidade de DNS nesta sessão.
- `git diff --check` sem erros. Não foi encontrado outro erro reproduzível no código auditado.
- Pontos que dependem de confirmação da empresa: completar/aprovar os textos legais e confirmar alegações operacionais/publicitárias (por exemplo, disponibilidade GPS/24/7, ADR e condições de serviço). A revisão completa das traduções por falantes nativos também fica fora da validação técnica.

## Auditoria complementar — 15/10/2026

- A página de notícias usa agora uma imagem editorial própria de um centro logístico, distinta da imagem de estrada da página inicial.
- `npm run build` concluiu sem erros. Foram geradas 90 páginas localizadas (15 páginas × 6 idiomas) e 90 URLs no sitemap.
- As páginas localizadas foram verificadas quanto a títulos, idioma HTML, canonical, hreflang, texto alternativo das imagens e destinos dos links locais: sem falhas encontradas. Também não há assets locais em falta.
- A página portuguesa de notícias foi aberta no domínio de produção após a publicação. A entrega de emails não foi testada nesta auditoria; as políticas legais ainda dependem de confirmação dos dados e práticas reais da empresa.

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
- A revisão foi promovida para a branch `main` no commit `0a1c613`. A Vercel concluiu o deployment de produção com estado Ready e a página pública foi confirmada em `https://www.trevolalogistics.com/pt/`.

## Acompanhamento após a publicação

- As variáveis `RESEND_API_KEY` e `RESEND_FROM_EMAIL` estão ligadas ao projeto em Production e Preview. Os valores são secretos; não foi feito um pedido de teste real, portanto a entrega do formulário ainda precisa de ser confirmada.
- As páginas de privacidade e termos continuam identificadas como modelos por completar. Atualize-as com denominação social, morada, prazo de conservação, fornecedores e práticas de tratamento, e lei/jurisdição aplicáveis.
- Não foram fornecidos URLs oficiais de redes sociais, por isso não foram inventados.
- O preview local não abriu no browser isolado desta sessão. A página inicial e o formulário foram revistos visualmente no preview da Vercel; não houve teste em dispositivo móvel físico.
- A produção permanece publicada em `https://www.trevolalogistics.com/pt/`. Nesta revisão, corrigi a geração do atributo de idioma: antes eram emitidos dois `data-locale`, fazendo o navegador mostrar conteúdo inglês em páginas portuguesas. A correção foi validada nas 48 páginas geradas (12 páginas × 4 idiomas).
- Os indicadores sem comprovação (mais de 25 países, apoio 24/7, 10.000+ envios e 99% de entregas no prazo) foram substituídos por modalidades FTL, LTL, Expresso e Dedicado, e as referências à cobertura foram qualificadas por percurso e disponibilidade.
- Ainda é necessário enviar um pedido controlado e confirmar a entrega à caixa da empresa. As páginas legais continuam como modelos por completar com os dados reais da empresa e as práticas de tratamento.
