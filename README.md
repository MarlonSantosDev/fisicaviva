# Física viva

Site estático para alunos verem leis da física em desenho animado: escolhem um tema, mexem nos controles e leem o que a cena está mostrando.

Não há cadastro, banco de dados nem instalação. O navegador abre a página e desenha tudo com SVG e JavaScript.

O site publicado está em [https://fisicaviva.marlonsantos.dev/](https://fisicaviva.marlonsantos.dev/).

## Objetivo

Ajudar o aluno a entender a lei vendo a situação, em vez de só memorizar a fórmula.

Na segunda lei de Newton, a pessoa escolhe um objeto ou um boneco — pessoa, caixa, bola ou carro, cada um com massa diferente — e vê a força, a massa e a aceleração se relacionarem. A mesma força num corpo leve acelera mais; num corpo pesado, acelera menos.

Os outros temas seguem a mesma ideia: objetos com pesos e características diferentes, e uma animação de como a lei aparece numa situação do dia a dia (gelo, empurrão, queda, rampa, corda, circuito). O texto ao lado do desenho liga o que se vê à conta estudada em sala.

O pedido original era cobrir as leis de Newton e, quando possível, leis de outros cientistas. O site faz isso hoje:

- Newton: inércia, segunda lei, ação e reação, e gravitação.
- Galileu: queda livre, com e sem arrasto do ar.
- Conservação da energia mecânica numa rampa.
- Onda mecânica numa corda.
- Ohm: tensão, resistência e corrente num circuito com lâmpada.

Repositório: [github.com/MarlonSantosDev/fisicaviva](https://github.com/MarlonSantosDev/fisicaviva)

## Pré-requisitos

- Navegador atual com JavaScript (Chrome, Edge, Firefox ou Safari).
- Nada de Node, PHP, Python ou compilador para usar o site.

Um servidor local só é necessário se você for desenvolver e quiser recarregar os arquivos pelo endereço `http://`.

## Como abrir

Para usar, abra [https://fisicaviva.marlonsantos.dev/](https://fisicaviva.marlonsantos.dev/). Os passos abaixo servem para rodar uma cópia na máquina, ao alterar o código.

Clone o repositório e abra o arquivo no navegador:

```bash
git clone https://github.com/MarlonSantosDev/fisicaviva.git
cd fisicaviva
```

No Windows, dê dois cliques em `index.html`. Os scripts são locais e não usam `fetch`, então o arquivo abre direto do disco.

Para servir a pasta:

```bash
python -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## Como usar

A barra de temas troca a cena. O palco mostra o desenho, a faixa abaixo mostra a conta, os controles mudam massa, força ou outros valores, e o texto explica o efeito.

O tema inicial é a segunda lei de Newton. Cada tema tem um endereço próprio, útil para uma aula ou um link:

| Endereço | Tema |
|----------|------|
| [fisicaviva.marlonsantos.dev/#inercia](https://fisicaviva.marlonsantos.dev/#inercia) | Primeira lei de Newton |
| [fisicaviva.marlonsantos.dev/#newton2](https://fisicaviva.marlonsantos.dev/#newton2) | Segunda lei de Newton |
| [fisicaviva.marlonsantos.dev/#acao](https://fisicaviva.marlonsantos.dev/#acao) | Terceira lei de Newton |
| [fisicaviva.marlonsantos.dev/#queda](https://fisicaviva.marlonsantos.dev/#queda) | Queda livre |
| [fisicaviva.marlonsantos.dev/#gravidade](https://fisicaviva.marlonsantos.dev/#gravidade) | Gravitação |
| [fisicaviva.marlonsantos.dev/#energia](https://fisicaviva.marlonsantos.dev/#energia) | Energia mecânica |
| [fisicaviva.marlonsantos.dev/#onda](https://fisicaviva.marlonsantos.dev/#onda) | Onda mecânica |
| [fisicaviva.marlonsantos.dev/#ohm](https://fisicaviva.marlonsantos.dev/#ohm) | Lei de Ohm |

Um endereço desconhecido volta para `#newton2`.

## Temas

Os números da fórmula são os da conta física. O deslocamento no desenho é reduzido para caber na tela. Essa escolha está escrita na linha cinza de cada tema.

| Tema | Ideia | Conta usada | Controles |
|------|--------|-------------|-----------|
| Inércia | Disco no gelo. Sem força, a velocidade fica constante. Com atrito, ele para. | ΣF = 0 → velocidade constante | Soltar o disco; ligar ou desligar o atrito |
| 2ª lei | Pessoa, caixa, bola ou carro empurrados na grama. | a = F / m | Objeto (70 kg, 10 kg, 0,4 kg ou 1.000 kg); força de 0 a 400 N; esquerda ou direita; Empurrar |
| Ação e reação | Dois bonecos se empurram. As forças são iguais e opostas; as acelerações dependem da massa. | F igual nos dois; a = F / m | Massa da esquerda e da direita (20 a 100 kg); força (20 a 200 N); Empurrar |
| Queda livre | Maçã e bola caem juntas sem ar. Com ar, a maçã atrasa. | g = 10 m/s² | Soltar; ligar ou desligar o arrasto do ar |
| Gravidade | Dois corpos se atraem com forças de mesmo tamanho. | F = G·m₁·m₂ / r², com G = 6,67×10⁻¹¹ | Massa da esquerda (1 a 10 × 10²⁴ kg); massa da direita (1 a 10 × 10²² kg); distância (2 a 10 × 10⁸ m) |
| Energia | Bloco de 2 kg numa rampa sem atrito, de 2 m de altura. | Ep + Ec = 40 J, com g = 10 m/s² | Altura na rampa; Descer |
| Onda | A mão agita uma corda. Cada ponto só sobe e desce; a forma viaja. | v = λ · f | Amplitude (12 a 60); quantidade de ondas na corda (1 a 4) |
| Ohm | Pilha, resistor e lâmpada. O brilho segue a corrente. | I = V / R | Tensão (1 a 12 V); resistência (1 a 20 Ω) |

Exemplo da segunda lei, com a pessoa e a força inicial: a = 140 N ÷ 70 kg = 2 m/s². A mesma força na bola (0,4 kg) produz uma aceleração bem maior; no carro (1.000 kg), bem menor. A seta vermelha é a força e a azul é a aceleração.

## Estrutura do projeto

```
arnon/
├── index.html          página única: palco, fórmula, controles e texto
├── css/app.css         layout, cores e tema claro/escuro
├── js/util.js          namespace Fisica e funções compartilhadas
├── js/catalog.js       lista de temas (rótulo, ícone, frase de simplificação)
├── js/app.js           navegação e troca de tema
├── js/sim/             uma simulação por arquivo
│   ├── inercia.js
│   ├── newton2.js
│   ├── acao.js
│   ├── queda.js
│   ├── gravidade.js
│   ├── energia.js
│   ├── onda.js
│   └── ohm.js
├── favicon.svg
├── manifest.webmanifest
└── README.md
```

`index.html` carrega os scripts nessa ordem: `util.js`, `catalog.js`, cada arquivo em `js/sim/`, e por último `app.js`. Um tema novo precisa entrar nessa lista antes de `app.js`.

## Como o aplicativo funciona

Tudo vive no objeto global `Fisica`. Não há bundler nem módulos ES.

`catalog.js` preenche `Fisica.topics`. Cada item tem `id`, `label`, `kicker`, `simplify` e `icon` (SVG do botão).

`app.js` cria um botão por tema. Ao abrir um tema ele:

1. para a simulação anterior, se existir;
2. limpa palco, fórmula, controles e texto;
3. chama `Fisica.sims[id].start(ctx)`;
4. escreve `topic.simplify` na linha cinza;
5. atualiza o endereço com `history.replaceState`, no formato `#id`.

O objeto `ctx` entregue a `start` aponta para estes elementos:

| Campo | Elemento | Uso |
|-------|----------|-----|
| `stage` | `#stage` | SVG da cena |
| `formula` | `#formula` | Conta ou pílulas F, m e a |
| `controls` | `#controls` | Botões e sliders |
| `explain` | `#explain-text` | Parágrafo “Efeito: …” |
| `simplify` | `#simplify` | Preenchido pelo `app.js`, não pela simulação |

Cada simulação expõe `start(ctx)` e `stop()`. `stop` cancela o `requestAnimationFrame` da cena. Gravidade e Ohm não animam sozinhas; o `stop` delas é vazio.

## Funções compartilhadas

Estão em `js/util.js`.

| Função | O que faz |
|--------|-----------|
| `Fisica.fmt(n)` | Arredonda a duas casas, usa vírgula decimal e ponto de milhar, e o sinal de menos tipográfico. |
| `Fisica.readRange(input)` | Lê um `<input type="range">`, prende o valor entre `min` e `max` e alinha ao `step`. |
| `Fisica.animate(fn)` | Loop com `requestAnimationFrame`. `fn(dt, now)` recebe `dt` em segundos, no máximo 0,05. Retornar `false` encerra o loop. O retorno de `animate` é a função que cancela o quadro. |
| `Fisica.reduced()` | `true` quando o sistema pede menos movimento. |
| `Fisica.person(fill)` | SVG do boneco. `fill` é a cor da roupa, em geral uma variável CSS como `var(--orange)`. |

## Como adicionar um tema

1. Crie `js/sim/atrito.js` com `start` e `stop`.
2. Inclua o script em `index.html`, antes de `js/app.js`.
3. Acrescente o item em `Fisica.topics`, com o mesmo `id`.

Esboço mínimo:

```javascript
Fisica.sims = Fisica.sims || {};

Fisica.sims.atrito = (function () {
  var stopLoop = null;

  return {
    start: function (ctx) {
      this.stop();
      ctx.stage.innerHTML =
        '<svg viewBox="0 0 720 260" role="img" aria-label="Descrição curta da cena"></svg>';
      ctx.formula.innerHTML = '<p class="static-eq">ΣF = m · a</p>';
      ctx.controls.innerHTML =
        '<label class="field"><span>Força</span><output id="at-out">10 N</output>' +
        '<input id="at-range" type="range" min="0" max="100" step="10" value="10"></label>';
      ctx.explain.textContent = "Efeito: descreva o que o desenho mostra com os valores atuais.";

      document.getElementById("at-range").addEventListener("input", function (e) {
        var force = Fisica.readRange(e.target);
        document.getElementById("at-out").textContent = Fisica.fmt(force) + " N";
      });
    },
    stop: function () {
      if (stopLoop) stopLoop();
      stopLoop = null;
    }
  };
})();
```

No catálogo:

```javascript
{
  id: "atrito",
  label: "Atrito",
  kicker: "Força de atrito",
  simplify: "Diga aqui o que o desenho simplifica em relação à conta.",
  icon: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="16" fill="var(--sky)"/></svg>'
}
```

O `id` do catálogo, a chave em `Fisica.sims` e o hash da URL precisam ser o mesmo. O palco usa `viewBox="0 0 720 260"`. Cores vêm das variáveis em `css/app.css` (`--force`, `--accel`, `--grass`, `--ink` e as demais), para o tema claro e o escuro continuarem coerentes.

## Acessibilidade

- O palco tem `role="img"` e `aria-label`.
- O tema ativo usa `aria-pressed`.
- A fórmula usa `aria-live="polite"`.
- O foco visível é um contorno azul.
- Botões e sliders têm área de toque de pelo menos 44 px de altura.
- Sem JavaScript, a página mostra: “Ative o JavaScript para ver as animações.”
- Com `prefers-reduced-motion: reduce`, as cenas pulam para o estado final em vez de animar. A onda fica parada.

O site acompanha o tema claro ou escuro do sistema por `color-scheme` e `light-dark()`.

## O que este repositório não inclui

- Testes automatizados.
- Pipeline de build ou publicação.
- Arquivo de licença. Os direitos de uso ainda não estão declarados no repositório.
