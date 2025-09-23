"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Fisher-Yates shuffle
function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
function getPokemons() {
    return __awaiter(this, arguments, void 0, function* (limit = 12) {
        const pokemons = [];
        for (let i = 1; i <= limit; i++) {
            const res = yield fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            const data = yield res.json();
            pokemons.push({
                id: data.id,
                name: data.name,
                image: data.sprites.front_default,
                type: data.types[0].type.name,
            });
        }
        return pokemons;
    });
}
// tạo element .card
function createCardElement(p, copyIndex) {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("data-pair", String(p.id));
    card.setAttribute("data-card", `${p.id}-${copyIndex}`);
    card.innerHTML = `
    <span class="badge">#${p.id}</span>
    <img src="${p.image}" alt="${p.name}" />
    <h3>${p.name}</h3>
    <p class="type">${p.type}</p>
  `;
    return card;
}
// shuffle trực tiếp DOM
function shuffleDom(container) {
    const nodes = Array.from(container.children);
    if (nodes.length <= 1)
        return;
    let shuffled = shuffleArray(nodes);
    let tries = 0;
    const originalOrder = nodes.map(n => n.getAttribute("data-card"));
    while (JSON.stringify(shuffled.map(n => n.getAttribute("data-card"))) ===
        JSON.stringify(originalOrder) &&
        tries < 6) {
        shuffled = shuffleArray(nodes);
        tries++;
    }
    shuffled.forEach(n => n.classList.add("shuffling"));
    shuffled.forEach(n => container.appendChild(n));
    setTimeout(() => {
        shuffled.forEach(n => n.classList.remove("shuffling"));
    }, 420);
}
// 👉 arrow function show
const show = (pokemons, container) => {
    container.innerHTML = ""; // clear trước
    pokemons.forEach(p => {
        container.appendChild(createCardElement(p, 0));
        container.appendChild(createCardElement(p, 1));
    });
};
// khởi tạo
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    const container = document.getElementById("pokemon-list");
    const shuffleBtn = document.getElementById("shuffle-btn");
    const pokemons = yield getPokemons(12);
    // dùng arrow function show
    show(pokemons, container);
    shuffleBtn.addEventListener("click", () => {
        shuffleDom(container);
    });
}));
