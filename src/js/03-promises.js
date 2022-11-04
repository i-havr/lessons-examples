// ===============ПЕРВЫЙ ПРИМЕР РЕПЕТЫ=================
// const promise = new Promise((resolve, reject) => {
//   const canFulfill = Math.random() > 0.5;
//   console.log(canFulfill);

//   setTimeout(() => {
//     if (canFulfill) {
//       resolve('Промис выполнился успешно, с результатом (исполнен, fulfilled)');
//     }
//     reject('Промис выполнился с ошибкой(отклонен, rejected)');
//   }, 1000);
// });

// promise
//   .then(onFulfilled)
//   .then(x => {
//     console.log(x);
//     return 10;
//   })
//   .then(y => {
//     console.log(y);
//   })
//   .catch(error => console.log(error))
//   .finally(() => {
//     console.log('Я буду выполнен в любом случае');
//   });

// function onFulfilled(result) {
//   console.log(`✅ ${result}`);
// }

// function onRejected(error) {
//   console.log(`❌ ${error}`);
// }

// ===============ВТОРОЙ ПРИМЕР РЕПЕТЫ=================

// const makeOrder = dish => {
//   const DELAY = 1000;

//   return new Promise((resolve, reject) => {
//     const passed = Math.random() > 0.5;

//     setTimeout(() => {
//       if (passed) {
//         resolve(`✅ Вот ваше блюдо: ${dish}`);
//       }
//       reject('❌ Упс, у нас закончились продукты');
//     }, DELAY);
//   });
// };

// makeOrder('Пирожок').then(onMakeOrderSuccess).catch(onMakeOrderError);

// function onMakeOrderSuccess(result) {
//   console.log(result);
// }

// function onMakeOrderError(result) {
//   console.log(result);
// }

// ===============ТРЕТИЙ ПРИМЕР РЕПЕТЫ=================

// const fetchPokemonById = id => {
//   return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(r => r.json());
// };

// fetchPokemonById(1).then(onFetchSuccess).catch(onFetchError);
// fetchPokemonById(2).then(onFetchSuccess).catch(onFetchError);
// fetchPokemonById(3).then(onFetchSuccess).catch(onFetchError);

// function onFetchSuccess(pokemon) {
//   console.log('onFetchSuccess -> onFetchSuccess');
//   console.log(pokemon);
// }

// function onFetchError(error) {
//   console.log('onFetchError -> onFetchError');
//   console.log('Это в блоке catch');
//   console.log(error);
// }

// ===============ЧЕТВЕРТЫЙ ПРИМЕР РЕПЕТЫ=================

const horses = [
  'Secretariat',
  'Eclipse',
  'West Australian',
  'Flying Fox',
  'Seabiscuit',
];

let raceCounter = 0;

const refs = {
  startBtn: document.querySelector('.js-start-race'),
  winnerField: document.querySelector('.js-winner'),
  progressField: document.querySelector('.js-progress'),
  tableBody: document.querySelector('.js-results-table > tbody'),
};

refs.startBtn.addEventListener('click', onStartButton);

function onStartButton() {
  raceCounter += 1;
  const promises = horses.map(run);

  updateWinnerField('');
  updateProgressField('🐴 Заезд начался, ставки не принимаются!');
  determineWinner(promises);
  waitForAllHorses(promises);
}

function determineWinner(horsesP) {
  Promise.race(horsesP).then(({ horse, time }) => {
    updateWinnerField(`🥇 Победил ${horse}, финишировав за ${time} времени`);
    updateResultsTable({ horse, time, raceCounter });
  });
}

function waitForAllHorses(horsesP) {
  Promise.all(horsesP).then(() => {
    updateProgressField('🏁 Заезд окончен, принимаются ставки');
  });
}

function updateWinnerField(message) {
  refs.winnerField.textContent = message;
}

function updateProgressField(message) {
  refs.progressField.textContent = message;
}

function updateResultsTable({ horse, time, raceCounter }) {
  const tr = `<tr><td>${raceCounter}</td><td>${horse}</td><td>${time}</td></tr>`;
  refs.tableBody.insertAdjacentHTML('beforeend', tr);
}

function run(horse) {
  return new Promise((resolve, reject) => {
    const time = getRandomTime(2000, 3500);

    setTimeout(() => {
      resolve({ horse, time });
    }, time);
  });
}

function getRandomTime(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
