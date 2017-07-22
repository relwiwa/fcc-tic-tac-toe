webpackJsonp([1],{12:function(e,t,a){"use strict";var n={player:{type:{user:"user",ai:"ai"},name:{player1:"player1",player2:"player2"}},avatar:{x:"x",o:"o"},difficulty:{easy:"Easy",medium:"Medium",hard:"Hard"},gameMode:{demo:"demo",onePlayer:"1 Player",twoPlayer:"2 Player"},gameStatus:{started:"started",ended:"ended"},instructions:{tabs:["About","Rules"],boards:[{location:"Horizontal",board:"xxx------"},{location:"Vertical",board:"-x--x--x-"},{location:"Diagonal",board:"x---x---x"}]},randomMoveFactors:{easy:.2,medium:.8},timeoutAiMove:1500,timeoutDemoGame:5e3};t.a=n},31:function(e,t,a){"use strict";var n=a(6),r=a.n(n),l=a(82),o=a(87),i=a(12),u=function(e){var t=e.cellSpex,a=e.currentPlayer,n=e.difficulty,u=e.gameHistory,s=e.gameMode,c=e.gameStatus,m=e.player1,p=e.player2;return r.a.createElement("div",{className:"t3-board grid-x"},r.a.createElement("div",{className:"cell medium-offset-1 medium-10 large-offset-2 large-8"},null!==m&&null!==c&&r.a.createElement(o.a,{currentPlayer:a,difficulty:s===i.a.gameMode.demo?null:n,gameHistory:u,player1:m,player2:p}),r.a.createElement("div",{className:"grid-x small-up-3"},t.map(function(e){return r.a.createElement(l.a,{key:e.key,onClick:e.onClick,content:e.content,status:e.status})}))))};t.a=u},80:function(e,t,a){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var o=a(6),i=a.n(o),u=a(84),s=a(83),c=a(85),m=a(86),p=a(12),y=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),f=function(e){function t(e){n(this,t);var a=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={board:"---------",currentPlayer:null,difficulty:null,gameHistory:[],gameMode:null,gameStatus:null,player1:{name:p.a.player.player1,avatar:null,type:null},player2:{name:p.a.player.player2,avatar:null,type:null},showInstructions:!1,showOptions:!1},a}return l(t,e),y(t,[{key:"componentWillMount",value:function(){this.setupDemoGame()}},{key:"handleChangeAvatar",value:function(e){var t=this.state,a=t.player1,n=t.player2,r={};r.player1=a,r.player1.avatar=e,r.player2=n,r.player2.avatar=e===p.a.avatar.x?p.a.avatar.o:p.a.avatar.x,this.setState(r)}},{key:"handleChangeDifficulty",value:function(e){this.setState({difficulty:e})}},{key:"handleChangeGameMode",value:function(e){var t=this.state,a=t.player1,n=t.player2,r={};r.gameMode=e,r.player1=a,r.player1.type=p.a.player.type.user,r.player2=n,r.player2.type=e===p.a.gameMode.onePlayer?p.a.player.type.ai:p.a.player.type.user,this.setState(r)}},{key:"handleMove",value:function(e,t){var a=this,n=this.state,r=(n.board,n.currentPlayer),l=n.gameHistory,o=(n.player1,n.player2,{});!1===t.gameOver?(o.board=e,o.currentPlayer=r===p.a.player.name.player1?p.a.player.name.player2:p.a.player.name.player1,this.setState(o)):(o.board=e,o.gameStatus=p.a.gameStatus.ended,o.gameHistory=l.concat(t),this.state.gameMode===p.a.gameMode.demo&&(this.demoTimeout=window.setTimeout(function(){a.setupDemoGame()},p.a.timeoutDemoGame)),this.setState(o))}},{key:"handleSetupInitialGame",value:function(){null!==this.demoTimeout&&clearTimeout(this.demoTimeout),this.setState({board:"---------",currentPlayer:null,difficulty:null,gameMode:null,gameHistory:[],gameStatus:null,player1:{name:p.a.player.name.player1,avatar:null,type:null},player2:{name:p.a.player.name.player2,avatar:null,type:null},showInstructions:this.state.showInstructions,showOptions:!0})}},{key:"handleSetupGame",value:function(){this.state.difficulty;this.setState({board:"---------",currentPlayer:this.setupCurrentPlayer(),gameStatus:p.a.gameStatus.started,showOptions:!1})}},{key:"handleStopCurrentGame",value:function(){this.setState({board:"---------",currentPlayer:this.setupCurrentPlayer(),gameStatus:p.a.gameStatus.ended,showOptions:!0})}},{key:"handleToggleInstructions",value:function(){this.setState({showInstructions:!this.state.showInstructions})}},{key:"setupCurrentPlayer",value:function(){var e=this.state,t=e.difficulty,a=e.gameMode;return t===p.a.difficulty.medium||a===p.a.gameMode.twoPlayer?Math.random()>.5?p.a.player.name.player1:p.a.player.name.player2:t===p.a.difficulty.easy?p.a.player.name.player1:p.a.player.name.player2}},{key:"setupDemoGame",value:function(){var e={name:p.a.player.name.player1,type:p.a.player.type.ai,avatar:p.a.avatar.x},t={name:p.a.player.name.player2,type:p.a.player.type.ai,avatar:p.a.avatar.o};this.setState({board:"---------",currentPlayer:p.a.player.name.player1,difficulty:p.a.difficulty.medium,gameMode:p.a.gameMode.demo,gameStatus:p.a.gameStatus.started,player1:e,player2:t,showOptions:!1})}},{key:"render",value:function(){var e=this,t=this.state,a=t.board,n=t.currentPlayer,r=t.difficulty,l=t.gameHistory,o=t.gameMode,y=t.gameStatus,f=t.player1,d=t.player2,h=t.showInstructions,v=t.showOptions;return i.a.createElement("div",{className:"t3-game grid-container grid-container-padded"},i.a.createElement("div",{className:"grid-x align-center"},i.a.createElement("div",{className:"cell"},i.a.createElement("h1",{className:"text-center"},"Tic Tac Toe ",i.a.createElement("small",{className:"fa fa-question-circle-o",onClick:function(){return e.handleToggleInstructions()}})),h&&i.a.createElement(c.a,{onToggleInstructions:function(){return e.handleToggleInstructions()}})),i.a.createElement("div",{className:"cell medium-8"},v&&i.a.createElement(m.a,{difficulty:r,gameMode:o,gameStatus:y,player1:f,player2:d,onChangeAvatar:function(t){return e.handleChangeAvatar(t)},onChangeDifficulty:function(t){return e.handleChangeDifficulty(t)},onChangeGameMode:function(t){return e.handleChangeGameMode(t)}}),(y===p.a.gameStatus.started||y===p.a.gameStatus.ended)&&!v&&i.a.createElement(u.a,{board:a,currentPlayer:n,difficulty:r,gameHistory:l,gameMode:o,gameStatus:y,player1:f,player2:d,onMove:function(t,a){return e.handleMove(t,a)}}),i.a.createElement(s.a,{difficulty:r,gameMode:o,gameStatus:y,numberOfRounds:l.length,player1:f,showOptions:v,onSetupGame:function(){return e.handleSetupGame()},onSetupInitialGame:function(){return e.handleSetupInitialGame()},onShowOptions:function(){return e.setState({showOptions:!0})},onStopCurrentGame:function(){return e.handleStopCurrentGame()}}))))}}]),t}(o.Component);t.a=f},81:function(e,t){},82:function(e,t,a){"use strict";var n=a(6),r=a.n(n),l=a(92),o=(a.n(l),function(e){var t=e.content,a=e.status,n=e.onClick;return r.a.createElement("div",{className:"t3-cell cell text-center"},r.a.createElement("div",{className:a+(n?" hoverable":""),onClick:n?function(e){return n(e)}:null},r.a.createElement("span",null,t)))});t.a=o},83:function(e,t,a){"use strict";var n=a(6),r=a.n(n),l=a(12),o=a(93),i=(a.n(o),function(e){var t=e.difficulty,a=e.gameMode,n=e.gameStatus,o=e.numberOfRounds,i=e.player1,u=e.showOptions,s=e.onSetupInitialGame,c=e.onShowOptions,m=e.onSetupGame,p=e.onStopCurrentGame;return r.a.createElement("div",{className:"t3-controls grid-x"},r.a.createElement("div",{className:"text-center cell"},r.a.createElement("div",{className:"button-group align-center"},a===l.a.gameMode.demo&&r.a.createElement("button",{className:"button primary text-center",onClick:s},"Start Game"),a!==l.a.gameMode.demo&&n===l.a.gameStatus.ended&&!u&&r.a.createElement("button",{className:"button primary text-center",onClick:c},"Change Options"),a!==l.a.gameMode.demo&&n===l.a.gameStatus.started&&!u&&r.a.createElement("button",{className:"button primary text-center",onClick:p},"Stop Current Game"),a===l.a.gameMode.onePlayer&&n!==l.a.gameStatus.started&&null!==i.avatar&&null!==t&&r.a.createElement("button",{className:"button primary text-center",onClick:m},"Play ",o>0?" again":null),a===l.a.gameMode.twoPlayer&&n!==l.a.gameStatus.started&&null!==i.avatar&&r.a.createElement("button",{className:"button primary text-center",onClick:m},"Play ",o>0?" Again":null))))});t.a=i},84:function(e,t,a){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var o=a(6),i=a.n(o),u=a(31),s=a(12),c=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),m=function(e){function t(){return n(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return l(t,e),c(t,[{key:"componentDidMount",value:function(){var e=this.props.currentPlayer;this.boardStati={},this.props[e].type===s.a.player.type.ai&&this.setupTimeoutAiMove()}},{key:"componentDidUpdate",value:function(){var e=this.props,t=e.currentPlayer;e.difficulty;e.gameStatus===s.a.gameStatus.started&&this.props[t].type===s.a.player.type.ai&&(this.timeoutAiMove||this.setupTimeoutAiMove())}},{key:"componentWillUnmount",value:function(){this.timeoutAiMove&&clearTimeout(this.timeoutAiMove)}},{key:"calculateBestMove",value:function(){var e=this.props,t=e.board,a=e.currentPlayer;return"---------"===t?Math.floor(8*Math.random()):this.minimax(t,a).cell}},{key:"calculateBoardStatus",value:function(e){var t=this.props,a=t.player1,n=t.player2,r={};r.gameOver=!1;for(var l=0,o=0;o<e.length;o++)"-"===e[o]&&l++;if(l<7)for(var i=0;i<9;i+=3){if("-"!==e[i]&&e[i]===e[i+1]&&e[i+1]===e[i+2])return r.gameOver=!0,r.winner=e[i]===a.avatar?a:n,r.cells=[i,i+1,i+2],r;if("-"!==e[i/3]&&e[i/3]===e[i/3+3]&&e[i/3+3]===e[i/3+6])return r.gameOver=!0,r.winner=e[i/3]===a.avatar?a:n,r.cells=[i/3,i/3+3,i/3+6],r;if("-"!==e[0]&&e[0]===e[4]&&e[4]===e[8])return r.gameOver=!0,r.winner=e[0]===a.avatar?a:n,r.cells=[0,4,8],r;if("-"!==e[2]&&e[2]===e[4]&&e[4]===e[6])return r.gameOver=!0,r.winner=e[2]===a.avatar?a:n,r.cells=[2,4,6],r;0===l&&!1===r.gameOver&&(r.gameOver=!0,r.winner=null)}return r}},{key:"calculateRandomMove",value:function(){for(var e=this.props.board,t=[],a=0;a<e.length;a++)"-"===e[a]&&t.push(a);return t[Math.floor(Math.random()*t.length)]}},{key:"minimax",value:function(e,t){var a=this.props,n=a.currentPlayer,r=(a.player1,a.player2,this.getBoardStatus(e));if(!0===r.gameOver)return null===r.winner?{result:0}:r.winner.name===n?{result:30}:{result:-30};for(var l=[],o=0;o<e.length;o++)"-"===e[o]&&l.push(o);for(var i=[],u=0;u<l.length;u++){var c={avatar:this.props[t].avatar,cell:l[u]},m=e.substr(0,c.cell)+c.avatar+e.substr(c.cell+1),p=this.minimax(m,t===s.a.player.name.player1?s.a.player.name.player2:s.a.player.name.player1);c.result=p.result,i.push(c)}var y=void 0;if(t===n)for(var f=-50,d=0;d<i.length;d++)i[d].result>f&&(f=i[d].result,y=d);else for(var h=50,v=0;v<i.length;v++)i[v].result<h&&(h=i[v].result,y=v);return i[y]}},{key:"getAiMove",value:function(){var e=this.props,t=(e.board,e.currentPlayer,e.difficulty),a=(e.onMove,null);a=t===s.a.difficulty.hard?this.calculateBestMove():Math.random()>s.a.randomMoveFactors[t.toLowerCase()]?this.calculateRandomMove():this.calculateBestMove(),this.handleMove(a)}},{key:"getBoardStatus",value:function(e){var t=this.boardStati[e];return t||(t=this.calculateBoardStatus(e),this.boardStati[e]=t),t}},{key:"handleMove",value:function(e){var t=this.props,a=t.board,n=t.currentPlayer,r=t.onMove,l=a.substr(0,e);l+=this.props[n].avatar,l+=a.substr(e+1),r(l,this.getBoardStatus(l))}},{key:"setupCellSpex",value:function(){for(var e=this,t=this.props,a=t.board,n=t.currentPlayer,r=t.gameStatus,l=[],o=0;o<a.length;o++)!function(t){var o={};o.content="-"===a[t]?"":a[t],r!==s.a.gameStatus.ended&&(o.onClick=e.props[n].type===s.a.player.type.user&&"-"===a[t]?function(a){return e.handleMove(t)}:null),o.key=t,l.push(o)}(o);return r===s.a.gameStatus.ended&&(l=this.updateWinningCells(l)),l}},{key:"setupTimeoutAiMove",value:function(){var e=this;this.timeoutAiMove=window.setTimeout(function(){e.timeoutAiMove=null,e.getAiMove()},s.a.timeoutAiMove)}},{key:"updateWinningCells",value:function(e){var t=this.props,a=t.currentPlayer,n=t.gameHistory,r=n.length,l=n[r-1],o=e;if(null!==l.winner){for(var i=l.cells,u=0;u<i.length;u++){var s=o[i[u]];if(s.status="active",1===u){if(s.content=this.props[a].avatar+" won",n.length>1){var c=n[r-2];l.winner===c.winner&&(s.content+=" again")}}else s.content="";o[i[u]]=s}return o}return o[4].content="It's a tie",o[4].status="static",o}},{key:"render",value:function(){var e=this.props,t=e.currentPlayer,a=e.difficulty,n=e.gameHistory,r=e.gameMode,l=e.gameStatus,o=e.player1,s=e.player2;return i.a.createElement(u.a,{cellSpex:this.setupCellSpex(),currentPlayer:t,difficulty:a,gameHistory:n,gameMode:r,gameStatus:l,player1:o,player2:s})}}]),t}(o.Component);t.a=m},85:function(e,t,a){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var o=a(6),i=a.n(o),u=a(31),s=a(89),c=a(94),m=(a.n(c),a(12)),p=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),y=function(e){function t(e){n(this,t);var a=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={tabSelected:m.a.instructions.tabs.about},a}return l(t,e),p(t,[{key:"renderBoard",value:function(e,t,a){return i.a.createElement("div",{key:e,className:"column small-6 small-offset-3 medium-offset-0 medium-4"+(2===a?" end":"")},i.a.createElement(u.a,{cellSpex:this.setupCellSpex(t),currentPlayer:null,difficulty:null,gameMode:null,gameStatus:null,player1:null,player2:null}),i.a.createElement("h6",{className:"text-center"},"Three Cells ",e+"ly"))}},{key:"setupCellSpex",value:function(e){for(var t=[],a=0;a<e.length;a++){var n={};n.content="",n.key=a,"-"!==e[a]&&(n.status="active"),t.push(n)}return t}},{key:"render",value:function(){var e=this,t=(this.state.tabSelected,this.props.onToggleInstructions);return i.a.createElement("div",{className:"t3-instructions"},i.a.createElement(s.a,{tabs:m.a.instructions.tabs,onToggleTabsContainer:t},i.a.createElement("div",{className:"callout cell"},i.a.createElement("h3",{className:"text-center"},"Tic Tac Toe Game"),i.a.createElement("div",{className:"grid-x grid-padding-x"},i.a.createElement("div",{className:"cell medium-6"},i.a.createElement("p",null,"In Tic Tac Toe, two players, X and O, take turns marking the spaces in a 3x3 grid."),i.a.createElement("p",null,"The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game."),i.a.createElement("p",null,"The game can be traced back to ancient Egypt."),i.a.createElement("p",null,"These days, it is also known as Noughts and Crosses, Tick Tack Toe, Tick Tat Toe and Xs and Os."),i.a.createElement("p",null,"Learn more about the game on ",i.a.createElement("a",{href:"https://en.wikipedia.org/wiki/Tic-tac-toe",title:"Wikipedia page featuring Tic Tac Toe game"},"Wikipedia"),".")),i.a.createElement("div",{className:"cell medium-6"},i.a.createElement("p",null,"In this implementation you can chose to:"),i.a.createElement("ul",null,i.a.createElement("li",null,"play against another human opponent,"),i.a.createElement("li",null,"or play against an AI opponent.")),i.a.createElement("p",null,"There are three difficulties available:"),i.a.createElement("ul",null,i.a.createElement("li",null,"Easy: AI plays totally random"),i.a.createElement("li",null,"Medium: AI occassionally makes mistakes"),i.a.createElement("li",null,"Hard: AI makes no mistakes")),i.a.createElement("p",null,"There's also a demo mode which lets you watch two AI players playing against each other on medium difficulty."),i.a.createElement("p",null,"You can find out more about the ",i.a.createElement("a",{title:"Show Tab with Rules of the Game",onClick:function(){return e.setState({tabSelected:m.a.instructions.tabs.rules})}},"rules of the game"),".")))),i.a.createElement("div",{className:"callout cell"},i.a.createElement("h3",{className:"text-center"},"Rules"),i.a.createElement("p",null,"You can win Tic Tac Toe in one of the following ways:"),i.a.createElement("div",{className:"grid-x"},m.a.instructions.boards.map(function(t,a){return e.renderBoard(t.location,t.board,a)})))))}}]),t}(i.a.Component);t.a=y},86:function(e,t,a){"use strict";var n=a(6),r=a.n(n),l=a(31),o=a(12),i=function(e){var t=e.currentPlayer,a=e.difficulty,n=e.gameHistory,i=e.gameMode,u=e.gameStatus,s=e.player1,c=e.player2,m=e.onChangeAvatar,p=e.onChangeDifficulty,y=e.onChangeGameMode,f=function(){for(var e=[],t=0;t<9;t++){var a={};a.content="",a.onClick=null,a.key=t,e.push(a)}return e},d=function(e,t,a,n,r){for(var l=0;l<t.length;l++)!function(l){e[t[l]].content=a[l],n===a[l]?e[t[l]].status="active":e[t[l]].onClick=function(e){return r(a[l])}}(l);return e},h=function(e,t){return e[t].status="static",null===i?e[t].content="Chose Players":null===s.avatar?e[t].content="Chose Avatar":null===a&&i!==o.a.gameMode.twoPlayer?e[t].content="Chose Difficulty":e[t].content="Change Options",e};return r.a.createElement(l.a,{cellSpex:function(){var e=f(),t=[o.a.gameMode.onePlayer,o.a.gameMode.twoPlayer];if(e=d(e,[0,2],t,i,y),null!==i){var n=[o.a.avatar.x,o.a.avatar.o];e=d(e,[3,5],n,s.avatar,m)}if(null!==s.avatar&&i!==o.a.gameMode.twoPlayer){var r=[o.a.difficulty.easy,o.a.difficulty.medium,o.a.difficulty.hard];e=d(e,[6,7,8],r,a,p)}return e=h(e,4)}(),currentPlayer:t,difficulty:a,gameHistory:n,gameMode:i,gameStatus:u,player1:s,player2:c})};t.a=i},87:function(e,t,a){"use strict";var n=a(6),r=a.n(n),l=a(12),o=a(95),i=(a.n(o),function(e){var t=e.currentPlayer,a=e.difficulty,n=e.player1,o=e.player2;return r.a.createElement("div",{className:"t3-status grid-x text-center"},r.a.createElement("h4",{className:"cell small-2"+(null!==t&&t===l.a.player.name.player1?" status-avatar-active":"")},n.avatar),r.a.createElement("h4",{className:"cell small-8"},function(){return a?a[0].toUpperCase()+a.substr(1):null}()),r.a.createElement("h4",{className:"cell small-2"+(null!==t&&t===l.a.player.name.player2?" status-avatar-active":"")},o.avatar))});t.a=i},88:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(6),r=a.n(n),l=a(30),o=(a.n(l),a(81)),i=(a.n(o),a(80));a.i(l.render)(r.a.createElement(i.a,null),document.getElementById("root"))},89:function(e,t,a){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var o=a(6),i=a.n(o),u=a(91),s=(a.n(u),function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}()),c=function(e){function t(e){n(this,t);var a=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={tabSelected:0},a}return l(t,e),s(t,[{key:"render",value:function(){var e=this,t=this.state.tabSelected,a=this.props,n=a.onToggleTabsContainer,r=a.tabs;return i.a.createElement("div",{className:"tabs-container grid-x"},i.a.createElement("div",{className:"cell"},i.a.createElement("ul",{className:"menu horizontal"},r.map(function(a,n){return i.a.createElement("li",{className:t===n?"active":null,key:a},i.a.createElement("a",{onClick:function(){return e.setState({tabSelected:n})}},a))})),this.props.children.map(function(e,a){return a===t?e:null})),i.a.createElement("div",{className:"close-instructions cell"},i.a.createElement("ul",{className:"menu horizontal align-right"},i.a.createElement("li",null,i.a.createElement("a",{onClick:n},"Close Instructions")))))}}]),t}(o.Component);t.a=c},91:function(e,t){},92:function(e,t){},93:function(e,t){},94:function(e,t){},95:function(e,t){}},[88]);