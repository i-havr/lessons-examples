const e=["Secretariat","Eclipse","West Australian","Flying Fox","Seabiscuit"];let t=0;const r={startBtn:document.querySelector(".js-start-race"),winnerField:document.querySelector(".js-winner"),progressField:document.querySelector(".js-progress"),tableBody:document.querySelector(".js-results-table > tbody")};function n(e){r.winnerField.textContent=e}function o(e){r.progressField.textContent=e}function s(e){return new Promise(((t,r)=>{const n=(o=2e3,s=3500,Math.floor(Math.random()*(s-o+1)+o));var o,s;setTimeout((()=>{t({horse:e,time:n})}),n)}))}r.startBtn.addEventListener("click",(function(){t+=1;const i=e.map(s);n(""),o("🐴 Заезд начался, ставки не принимаются!"),c=i,Promise.race(c).then((({horse:e,time:o})=>{n(`🥇 Победил ${e}, финишировав за ${o} времени`),function({horse:e,time:t,raceCounter:n}){const o=`<tr><td>${n}</td><td>${e}</td><td>${t}</td></tr>`;r.tableBody.insertAdjacentHTML("beforeend",o)}({horse:e,time:o,raceCounter:t})})),function(e){Promise.all(e).then((()=>{o("🏁 Заезд окончен, принимаются ставки")}))}(i);var c}));
//# sourceMappingURL=03-promises.ca69186d.js.map
