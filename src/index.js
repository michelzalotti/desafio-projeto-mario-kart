const game = { player1Points: 0, player2Points: 0, matchs: 6 };

const characters = [
  {
    nome: "Mario",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    totalSkill: 0,
  },
  {
    nome: "Princesa",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 2,
    totalSkill: 0,
  },
  {
    nome: "Yoshi",
    velocidade: 2,
    manobrabilidade: 4,
    poder: 3,
    totalSkill: 0,
  },
  {
    nome: "Bowser",
    velocidade: 5,
    manobrabilidade: 2,
    poder: 5,
    totalSkill: 0,
  },
  {
    nome: "Luigi",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 4,
    totalSkill: 0,
  },
  {
    nome: "Donkey Kong",
    velocidade: 2,
    manobrabilidade: 2,
    poder: 5,
    totalSkill: 0,
  },
];

const blocks = ["Reta", "Curva", "Confronto"];

function choosePlayer() {
  const id = Math.floor(Math.random() * characters.length);
  const selectedCharacter = characters[id];

  characters.splice(id, 1);
  return selectedCharacter;
}

function randomBlock() {
  return blocks[Math.floor(Math.random() * blocks.length)];
}

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function printPlayerAction(player, matchType, diceResult, attribute) {
  console.log(
    `${player.nome} rolou um dado de ${matchType}: ${diceResult} + ${
      player[attribute]
    } = ${diceResult + player[attribute]}`
  );
}

function computePoint(player1, player2, matchType) {
  let result = "";
  if (matchType !== "Confronto") {
    if (player1.totalSkill > player2.totalSkill) {
      result = `${player1.nome} marcou 1 ponto!`;
      game.player1Points++;
    } else {
      result = `${player2.nome} marcou 1 ponto!`;
      game.player2Points++;
    }
  } else {
    if (player1.totalSkill > player2.totalSkill) {
      if (game.player2Points > 0) {
        result = `${player2.nome} perdeu 1 ponto!`;
        game.player2Points--;
      } else {
        result = `${player2.nome} não perdeu ponto!`;
      }
    } else {
      if (game.player1Points > 0) {
        result = `${player1.nome} perdeu 1 ponto!`;
        game.player1Points--;
      } else {
        result = `${player1.nome} não perdeu ponto!`;
      }
    }
  }

  return result;
}

function processMatch(player1, player2, matchType) {
  const p1DiceValue = rollDice();
  const p2DiceValue = rollDice();
  let attribute = "";

  player1.totalSkill = 0;
  player2.totalSkill = 0;

  if (matchType === "Reta") {
    player1.totalSkill = player1.velocidade + p1DiceValue;
    player2.totalSkill = player2.velocidade + p2DiceValue;
    attribute = "velocidade";
  } else if (matchType === "Curva") {
    player1.totalSkill = player1.manobrabilidade + p1DiceValue;
    player2.totalSkill = player2.manobrabilidade + p2DiceValue;
    attribute = "manobrabilidade";
  } else {
    player1.totalSkill = player1.poder + p1DiceValue;
    player2.totalSkill = player2.poder + p2DiceValue;
    attribute = "poder";
  }

  printPlayerAction(player1, matchType, p1DiceValue, attribute);
  printPlayerAction(player2, matchType, p2DiceValue, attribute);
  console.log(`[${computePoint(player1, player2, matchType)}]`);
  console.log("-".repeat(20));
  console.log("\n");
}

function finalScore(player1, player2) {
  if (game.player1Points > game.player2Points) {
    console.log(
      `O player 1: ${player1.nome} venceu com ${game.player1Points} pontos!`
    );
  } else if (game.player2Points > game.player1Points) {
    console.log(
      `O player 2: ${player2.nome} venceu com ${game.player2Points} pontos!`
    );
  } else {
    console.log(`O jogo ficou empatado!`);
  }
}

(function main() {
  let player1 = null;
  let player2 = null;

  async function choosePlayers() {
    player1 = choosePlayer();
    player2 = choosePlayer();
  }

  function startGame(p1, p2) {
    for (let match = 1; match <= game.matchs; match++) {
      const matchType = randomBlock();
      processMatch(p1, p2, matchType);
    }

    finalScore(p1, p2);
  }

  choosePlayers();
  startGame(player1, player2);
})();
