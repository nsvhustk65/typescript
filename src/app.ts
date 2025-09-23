interface Pokemon {
  id: number;
  name: string;
  image: string;
  type: string;
}

// Fisher-Yates shuffle
function shuffleArray<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function getPokemons(limit: number = 12): Promise<Pokemon[]> {
  const pokemons: Pokemon[] = [];
  for (let i = 1; i <= limit; i++) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const data = await res.json();
    pokemons.push({
      id: data.id,
      name: data.name,
      image: data.sprites.front_default,
      type: data.types[0].type.name,
    });
  }
  return pokemons;
}

// tạo element .card
function createCardElement(p: Pokemon, copyIndex: number): HTMLElement {
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
function shuffleDom(container: HTMLElement) {
  const nodes = Array.from(container.children) as HTMLElement[];
  if (nodes.length <= 1) return;

  let shuffled = shuffleArray(nodes);

  let tries = 0;
  const originalOrder = nodes.map(n => n.getAttribute("data-card"));
  while (
    JSON.stringify(shuffled.map(n => n.getAttribute("data-card"))) ===
      JSON.stringify(originalOrder) &&
    tries < 6
  ) {
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
const show = (pokemons: Pokemon[], container: HTMLElement): void => {
  container.innerHTML = ""; // clear trước
  pokemons.forEach(p => {
    container.appendChild(createCardElement(p, 0));
    container.appendChild(createCardElement(p, 1));
  });
};

// khởi tạo
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("pokemon-list")!;
  const shuffleBtn = document.getElementById("shuffle-btn")!;

  const pokemons = await getPokemons(12);

  // dùng arrow function show
  show(pokemons, container);

  shuffleBtn.addEventListener("click", () => {
    shuffleDom(container);
  });
});
