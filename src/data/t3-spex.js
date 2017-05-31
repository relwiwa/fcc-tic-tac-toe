const SPEX = {
  player: {
    type: {
      user: 'user',
      ai: 'ai'
    },
    name: {
      player1: 'player1',
      player2: 'player2'
    }
  },
  avatar: {
    x: 'x',
    o: 'o'
  },
  difficulty: {
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard'
  },
  gameMode: {
    demo: 'demo',
    onePlayer: '1 Player',
    twoPlayer: '2 Player'
  },
  gameStatus: {
    started: 'started',
    ended: 'ended'
  },
  randomMoveFactors: {
    easy: 0.2,
    medium: 0.8
  },
  timeoutAiMove: 1500,
  timeoutDemoGame: 5000,  
};

export default SPEX;
