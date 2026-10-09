# Guia de publicação — Trevola Logistics

Este projeto gera páginas estáticas com Vite e inclui uma função Edge para o
formulário de orçamento. A configuração atual destina-se à Vercel. Um alojamento
puramente estático pode servir o website, mas não executa `api/request-quote.js`;
nesse caso, o formulário de email precisa de uma função/backend compatível.

## 1. Build local

Requisitos: Node.js `^20.19.0` ou `>=22.12.0` e npm.

```sh
npm ci
npm run build
npm run preview
```

O comando de build valida o TypeScript, compila as 12 páginas de entrada e gera
em `dist/` as versões de inglês, português, francês e alemão. Também atualiza o
sitemap localizado. O preview local serve o conteúdo final de `dist/`.

## 2. Publicar na Vercel

1. Envie o projeto para um repositório Git suportado pela Vercel.
2. Na Vercel, importe o repositório. Defina a pasta raiz como a pasta deste
   projeto. O `vercel.json` já indica framework Vite, comando `npm run build` e
   diretório de saída `dist`.
3. Crie primeiro um deployment de preview e confirme páginas, imagens, idioma e
   navegação no endereço temporário da Vercel.
4. Para ativar o formulário, adicione `RESEND_API_KEY` e
   `RESEND_FROM_EMAIL` nas variáveis de ambiente do projeto Vercel para
   Production. O remetente tem de pertencer a um domínio verificado no Resend.
   Não publique estas credenciais no código ou em variáveis `VITE_*`.
5. Publique na branch definida como Production. O merge/push nessa branch cria
   o deployment de produção quando a integração Git está ativa.

A Vercel publica automaticamente os ficheiros estáticos de `dist/` e a função
`api/request-quote.js`. A documentação da Vercel descreve os deployments a
partir de Git e a definição dos diretórios de build:
[Deploying Git Repositories](https://vercel.com/docs/git).

## 3. Ligar `trevolalogistics.com` e `www`

É necessário acesso à conta Vercel do projeto e à conta onde o domínio/DNS é
gerido. Não altere os registos de email (MX, SPF, DKIM e DMARC) ao apontar o
website.

1. Na Vercel, abra o projeto → **Settings → Domains** e adicione os dois nomes:
   `www.trevolalogistics.com` e `trevolalogistics.com`.
2. Defina `www.trevolalogistics.com` como domínio principal de produção e
   configure o domínio sem `www` para redirecionar para `www`.
3. Na página Domains, consulte os registos DNS exatos indicados para este
   projeto. Normalmente, o subdomínio `www` usa um CNAME e o domínio raiz usa um
   A/ALIAS; os destinos podem variar por projeto. Use os valores apresentados
   na conta Vercel, em vez de copiar exemplos genéricos.
4. No fornecedor autoritativo de DNS (o registrar ou Cloudflare, se os
   nameservers estiverem lá), crie/atualize apenas os registos web pedidos pela
   Vercel. Remova registos A/CNAME antigos que entrem em conflito e conserve os
   registos de email e verificação que ainda são necessários.
5. Aguarde a verificação DNS da Vercel. A plataforma tenta emitir e instalar
   automaticamente o certificado SSL depois de validar o domínio. Confirme que
   ambos os nomes aparecem como válidos e que o certificado está ativo.
6. Confirme que `http://trevolalogistics.com` e
   `https://trevolalogistics.com` redirecionam para
   `https://www.trevolalogistics.com`, e que a página inicial e páginas internas
   abrem por HTTPS.

Consulte o guia oficial para [adicionar um domínio personalizado e verificar
DNS/SSL](https://vercel.com/docs/domains/set-up-custom-domain). A Vercel
recomenda `www` como hostname primário e redirecionamento do domínio raiz; o
dashboard fornece os valores DNS específicos do projeto.

## 4. Se usar Cloudflare

Cloudflare é opcional; a Vercel já fornece DNS/CDN e SSL para este deployment.
Se mantiver Cloudflare apenas como gestor DNS:

1. Mantenha os nameservers Cloudflare no registrar.
2. Copie para o Cloudflare os registos que a página Domains da Vercel indicar
   para `@` e `www`.
3. Para os registos web que apontam para a Vercel, deixe **Proxy status: DNS
   only** (nuvem cinzenta). A Vercel recomenda não colocar outro proxy/CDN à
   frente da sua rede; deste modo, a Vercel continua a servir o tráfego e a
   gerir o certificado do domínio.
4. Preserve os registos MX/TXT usados pelo email e pelas verificações do
   domínio.

Se decidir ativar o proxy Cloudflare (nuvem laranja), faça-o apenas depois de o
domínio estar validado e o certificado Vercel ativo. A Vercel não recomenda esse
proxy por poder afetar verificação SSL, visibilidade de tráfego e desempenho.
Não use o modo SSL **Flexible**: pode criar ciclos de redirecionamento. Se
mantiver o proxy, use **Full (strict)** com certificado válido no origin e
confirme as exceções/encaminhamento de `/.well-known/acme-challenge/*` e
`/.well-known/vercel/*` indicados pela Vercel.

Referências oficiais: [Vercel sobre Cloudflare à frente da
Vercel](https://vercel.com/kb/guide/cloudflare-with-vercel), [estado de proxy
DNS na Cloudflare](https://developers.cloudflare.com/dns/proxy-status/) e
[modos SSL/TLS Cloudflare](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/).

## 5. Atualizar o website mais tarde

Com Git ligado à Vercel, altere os ficheiros, execute localmente `npm run build`,
reveja o preview e faça merge/push para a branch de produção. A Vercel
cria um preview para branches não produtivas e publica os commits da branch de
produção. Em alternativa, com a Vercel CLI ligada ao projeto, execute:

```sh
vercel --prod
```

Depois de cada alteração, confirme as rotas principais, idiomas, formulário e
certificado HTTPS. Uma alteração a imagens ou páginas continua a gerar as
variantes localizadas no build.

## Verificação realizada neste projeto

- `npm run build`: concluído sem erros.
- Verificação sintática da função `api/request-quote.js`: concluída.
- Configuração JSON da Vercel e manifesto: válidos.
- Foram geradas 48 páginas canónicas (12 páginas × 4 idiomas) e 48 entradas de
  sitemap.
- Auditoria de referências a assets locais no build: nenhum caminho em falta.

## Ações externas pendentes

- O projeto da Vercel está ligado ao repositório GitHub; os domínios `www` e raiz
  estão configurados e a zona DNS Cloudflare aparece completa.
- A Resend confirma o domínio como verificado. As variáveis `RESEND_API_KEY` e
  `RESEND_FROM_EMAIL` estão ligadas ao projeto em Production e Preview. Como os
  valores são secretos, confirme que a chave nova foi usada e que o remetente
  corresponde a um endereço autorizado na Resend.
- O preview da branch `codex/trevola-branding-audit` está pronto; a página inicial
  e o formulário foram inspecionados. Antes de promover para produção, testar um
  pedido real e confirmar a entrega à caixa configurada.
- Rever e completar os modelos legais antes de os apresentar como documentos
  finais: validar denominação social, morada, prazo de conservação,
  fornecedores/práticas reais de tratamento e lei/jurisdição aplicáveis.
