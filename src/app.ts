interface Pokemon {
  id: number;
  name: string;
  image: string;
  type: string;
}

// Fisher-Yates shuffle (dùng cho mảng bất kỳ)
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

// tạo element .card (tạo 2 bản sao bằng cách gọi 2 lần với copyIndex khác nhau)
function createCardElement(p: Pokemon, copyIndex: number): HTMLElement {
  const card = document.createElement("div");
  card.className = "card";
  // data-pair để nhận biết 2 bản sao cùng loại (ví dụ data-pair="25")
  card.setAttribute("data-pair", String(p.id));
  // data-card unique để debug/truy xuất nếu cần
  card.setAttribute("data-card", `${p.id}-${copyIndex}`);

  card.innerHTML = `
    <span class="badge">#${p.id}</span>
    <img src="${p.image}" alt="${p.name}" />
    <h3>${p.name}</h3>
    <p class="type">${p.type}</p>
  `;
  return card;
}

// shuffle trực tiếp DOM nodes (appendChild sẽ di chuyển node thay vì tạo mới)
function shuffleDom(container: HTMLElement) {
  const nodes = Array.from(container.children) as HTMLElement[];
  if (nodes.length <= 1) return;

  let shuffled = shuffleArray(nodes);

  // nếu vô tình shuffle ra cùng thứ tự ban đầu, shuffle lại vài lần (tối đa 6 lần)
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

  // add animation class nhanh để thấy effect
  shuffled.forEach(n => n.classList.add("shuffling"));

  // reorder DOM theo shuffled
  // appendChild sẽ move node hiện có
  shuffled.forEach(n => container.appendChild(n));

  // remove animation class sau 420ms
  setTimeout(() => {
    shuffled.forEach(n => n.classList.remove("shuffling"));
  }, 420);
}

// KHỞI TẠO sau khi DOM sẵn sàng
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("pokemon-list")!;
  const shuffleBtn = document.getElementById("shuffle-btn")!;

  // fetch 12 pokemon
  const pokemons = await getPokemons(12);

  // tạo 2 bản sao cho mỗi pokemon → push vào mảng cards
  const cards: HTMLElement[] = [];
  pokemons.forEach(p => {
    cards.push(createCardElement(p, 0));
    cards.push(createCardElement(p, 1));
  });

  // append tất cả (ban đầu theo thứ tự: mỗi cặp liên tiếp)
  cards.forEach(c => container.appendChild(c));

  console.log("Initial cards count:", container.children.length);

  // gán sự kiện shuffle — đảm bảo nút tồn tại
  shuffleBtn.addEventListener("click", () => {
    console.log("Shuffle button clicked");
    shuffleDom(container);
  });
});
