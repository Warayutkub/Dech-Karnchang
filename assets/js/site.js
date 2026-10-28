// Work photos shown on the site. To add a job: put the photo in assets/images/ and add one line here.
const WORKS = {
  glass: [
    { file: "64084_0.jpg", caption: "งานกั้นห้องกระจกสำนักงาน", w: 1477, h: 1108 },
    { file: "64085_0.jpg", caption: "ผนังกั้นห้องกระจกบานใหญ่", w: 1477, h: 1108 },
    { file: "64090.jpg", caption: "ประตูกระจกสวิงคู่กั้นห้องโถง", w: 1108, h: 1477 },
    { file: "64094.jpg", caption: "กั้นห้องกระจกบานใหญ่หน้าร้าน", w: 1477, h: 1108 },
    { file: "64086_0.jpg", caption: "ฉากกั้นกระจกอาคารสำนักงาน", w: 1280, h: 720 },
    { file: "64091.jpg", caption: "ประตูกระจกบานเปิด กระจกเขียวตัดแสง", w: 1108, h: 1477 },
    { file: "64095.jpg", caption: "งานกั้นกระจกหน้าร้านค้า", w: 1477, h: 1108 },
    { file: "64087_0.jpg", caption: "โครงกั้นห้องกระจกภายใน", w: 720, h: 1280 },
    { file: "64093.jpg", caption: "ผนังกระจกบานติดตายและบานกระทุ้ง", w: 1108, h: 1477 },
    { file: "64088_0.jpg", caption: "ประตูอลูมิเนียมกระจกเงาคู่", w: 1477, h: 1108 },
  ],
  aluminium: [
    { file: "64099.jpg", caption: "ผนังกั้นห้องอลูมิเนียม ฉากกั้น", w: 1706, h: 960 },
    { file: "64080_0.jpg", caption: "ประตูบานเลื่อนลายตาราง", w: 1477, h: 1108 },
    { file: "64092.jpg", caption: "ชุดหน้าต่างอลูมิเนียมอบขาว", w: 1477, h: 1108 },
    { file: "64089_0.jpg", caption: "ประตูบานเลื่อนอลูมิเนียม", w: 1477, h: 1108 },
    { file: "64097.jpg", caption: "โครงสร้างอลูมิเนียมกั้นห้อง", w: 1706, h: 960 },
    { file: "64083_0.jpg", caption: "งานประกอบเฟรมอลูมิเนียม", w: 1477, h: 1108 },
    { file: "64082_0.jpg", caption: "ติดตั้งบานหน้าต่างอลูมิเนียม", w: 1477, h: 1108 },
    { file: "64098.jpg", caption: "ตู้แขวนผนังอลูมิเนียมบานเกล็ด", w: 960, h: 720 },
    { file: "64096.jpg", caption: "ประตูหน้าต่างอลูมิเนียมลายตาราง", w: 1477, h: 1108 },
    { file: "64081_0.jpg", caption: "งานหน้าต่างอลูมิเนียมรอบอาคาร", w: 1477, h: 1108 },
  ],
};
const GROUP_LABEL = { glass: "งานกระจก", aluminium: "งานอลูมิเนียม" };
const IMG = "./assets/images/";

// ---------- Works page grid + tabs ----------
function renderWorks(group) {
  const grid = document.querySelector("[data-works-grid]");
  if (!grid) return;
  grid.innerHTML = WORKS[group]
    .map(
      (w, i) => `
      <li>
        <button type="button" class="work-card group h-60 lg:h-[300px]" data-group="${group}" data-index="${i}">
          <img src="${IMG}${w.file}" alt="${w.caption}" width="${w.w}" height="${w.h}" loading="lazy"
            class="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]">
          <span class="work-card__caption">${w.caption}</span>
        </button>
      </li>`
    )
    .join("");
  document.querySelectorAll("[data-tab]").forEach((tab) => {
    const on = tab.dataset.tab === group;
    tab.setAttribute("aria-selected", on);
    tab.classList.toggle("bg-graphite", on);
    tab.classList.toggle("text-white", on);
    tab.classList.toggle("bg-white", !on);
  });
}

function initWorks() {
  if (!document.querySelector("[data-works-grid]")) return;
  const fromHash = () => (location.hash === "#aluminium" ? "aluminium" : "glass");
  document.querySelectorAll("[data-tab]").forEach((tab) =>
    tab.addEventListener("click", () => {
      history.replaceState(null, "", tab.dataset.tab === "aluminium" ? "#aluminium" : "#glass");
      renderWorks(tab.dataset.tab);
    })
  );
  window.addEventListener("hashchange", () => renderWorks(fromHash()));
  renderWorks(fromHash());
}

// ---------- Photo viewer ----------
function initViewer() {
  const dlg = document.querySelector("[data-viewer]");
  if (!dlg) return;
  const img = dlg.querySelector("[data-viewer-img]");
  const cap = dlg.querySelector("[data-viewer-caption]");
  const count = dlg.querySelector("[data-viewer-count]");
  let group = "glass", index = 0;

  const show = () => {
    const list = WORKS[group];
    index = (index + list.length) % list.length;
    const w = list[index];
    img.src = IMG + w.file;
    img.alt = w.caption;
    cap.textContent = w.caption;
    count.textContent = `${GROUP_LABEL[group]} · ${index + 1} / ${list.length}`;
  };

  document.addEventListener("click", (e) => {
    const card = e.target.closest("[data-group][data-index]");
    if (!card) return;
    group = card.dataset.group;
    index = Number(card.dataset.index);
    show();
    dlg.showModal();
  });
  dlg.querySelector("[data-viewer-prev]").addEventListener("click", () => { index--; show(); });
  dlg.querySelector("[data-viewer-next]").addEventListener("click", () => { index++; show(); });
  dlg.querySelector("[data-viewer-close]").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { index--; show(); }
    if (e.key === "ArrowRight") { index++; show(); }
  });
}

initWorks();
initViewer();
