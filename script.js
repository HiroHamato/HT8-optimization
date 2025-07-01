const TABS_BASE = {
  all: {
    title: "Все",
    items: [
      {
        icon: "light2",
        iconLabel: "Освещение",
        title: "Xiaomi Yeelight LED Smart Bulb",
        subtitle: "Включено",
      },
      {
        icon: "light",
        iconLabel: "Освещение",
        title: "D-Link Omna 180 Cam",
        subtitle: "Включится в 17:00",
      },
      {
        icon: "temp",
        iconLabel: "Температура",
        title: "Elgato Eve Degree Connected",
        subtitle: "Выключено до 17:00",
      },
      {
        icon: "light",
        iconLabel: "Освещение",
        title: "LIFX Mini Day & Dusk A60 E27",
        subtitle: "Включится в 17:00",
      },
      {
        icon: "light2",
        iconLabel: "Освещение",
        title: "Xiaomi Mi Air Purifier 2S",
        subtitle: "Включено",
      },
      {
        icon: "light",
        iconLabel: "Освещение",
        title: "Philips Zhirui",
        subtitle: "Включено",
      },
      {
        icon: "light",
        iconLabel: "Освещение",
        title: "Philips Zhirui",
        subtitle: "Включено",
      },
      {
        icon: "light2",
        iconLabel: "Освещение",
        title: "Xiaomi Mi Air Purifier 2S",
        subtitle: "Включено",
      },
    ],
  },
  kitchen: {
    title: "Кухня",
    items: [
      {
        icon: "light2",
        iconLabel: "Освещение",
        title: "Xiaomi Yeelight LED Smart Bulb",
        subtitle: "Включено",
      },
      {
        icon: "temp",
        iconLabel: "Температура",
        title: "Elgato Eve Degree Connected",
        subtitle: "Выключено до 17:00",
      },
    ],
  },
  hall: {
    title: "Зал",
    items: [
      {
        icon: "light",
        iconLabel: "Освещение",
        title: "Philips Zhirui",
        subtitle: "Выключено",
      },
      {
        icon: "light2",
        iconLabel: "Освещение",
        title: "Xiaomi Mi Air Purifier 2S",
        subtitle: "Выключено",
      },
    ],
  },
  lights: {
    title: "Лампочки",
    items: [
      {
        icon: "light",
        iconLabel: "Освещение",
        title: "D-Link Omna 180 Cam",
        subtitle: "Включится в 17:00",
      },
      {
        icon: "light",
        iconLabel: "Освещение",
        title: "LIFX Mini Day & Dusk A60 E27",
        subtitle: "Включится в 17:00",
      },
      {
        icon: "light2",
        iconLabel: "Освещение",
        title: "Xiaomi Mi Air Purifier 2S",
        subtitle: "Включено",
      },
      {
        icon: "light",
        iconLabel: "Освещение",
        title: "Philips Zhirui",
        subtitle: "Включено",
      },
    ],
  },
  cameras: {
    title: "Камеры",
    items: [
      {
        icon: "light2",
        iconLabel: "Освещение",
        title: "Xiaomi Mi Air Purifier 2S",
        subtitle: "Включено",
      },
    ],
  },
};

function generateAllItems() {
  let items = [...TABS_BASE.all.items];
  for (let i = 0; i < 6; i++) {
    items = [...items, ...items];
  }
  return items;
}

const TABS = {
  ...TABS_BASE,
  all: {
    ...TABS_BASE.all,
    items: generateAllItems(),
  },
};
const TABS_KEYS = Object.keys(TABS);

const el = (tag, attrs = {}, children = []) => {
  const element = document.createElement(tag);

  Object.entries(attrs).forEach(([key, value]) => {
    if (key === "className") {
      element.className = value;
    } else if (key.startsWith("on")) {
      element.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (key === "textContent") {
      element.textContent = value;
    } else {
      element.setAttribute(key, value);
    }
  });

  children.forEach((child) => {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
    } else if (child) {
      element.appendChild(child);
    }
  });

  return element;
};

function createHeader() {
  const linksData = [
    { text: "Сводка", href: "/", current: true },
    { text: "Устройства", href: "/devices" },
    { text: "Сценарии", href: "/scripts" },
  ];

  const linksList = el(
    "ul",
    { className: "header__links" },
    linksData.map((linkData) =>
      el("li", { className: "header__item" }, [
        el(
          "a",
          {
            className: `header__link${
              linkData.current ? " header__link_current" : ""
            }`,
            href: linkData.href,
            ...(linkData.current ? { "aria-current": "page" } : {}),
          },
          [linkData.text]
        ),
      ])
    )
  );

  const menuButton = el(
    "button",
    {
      className: "header__menu",
      "aria-expanded": "false",
      onclick: function () {
        const expanded = this.getAttribute("aria-expanded") === "true";
        this.setAttribute("aria-expanded", String(!expanded));
        this.firstChild.textContent = expanded
          ? "Открыть меню"
          : "Закрыть меню";
        linksList.classList.toggle("header__links_opened", !expanded);

        if (!this.dataset.toggled) {
          this.dataset.toggled = true;
          linksList.classList.add("header__links-toggled");
        }
      },
    },
    [
      el("span", {
        className: "header__menu-text a11y-hidden",
        textContent: "Открыть меню",
      }),
    ]
  );

  return el("header", { className: "header" }, [
    el("a", {
      className: "header__logo",
      href: "/",
      "aria-label": "Яндекс.Дом",
    }),
    menuButton,
    linksList,
  ]);
}

function createEvent(props) {
  return el("li", { className: props.slim ? "event event_slim" : "event" }, [
    el("button", { className: "event__button" }, [
      el("span", {
        className: `event__icon event__icon_${props.icon}`,
        role: "img",
        "aria-label": props.iconLabel || "",
      }),
      el("h4", { className: "event__title" }, [props.title]),
      ...(props.subtitle
        ? [el("span", { className: "event__subtitle" }, [props.subtitle])]
        : []),
    ]),
  ]);
}

function createMain() {
  const heroDashboard = el("div", { className: "hero-dashboard" }, [
    el("div", { className: "hero-dashboard__primary" }, [
      el("h3", { className: "hero-dashboard__title" }, ["Привет, Геннадий!"]),
      el("p", { className: "hero-dashboard__subtitle" }, [
        "Двери и окна закрыты, сигнализация включена.",
      ]),
      el("ul", { className: "hero-dashboard__info" }, [
        el("li", { className: "hero-dashboard__item" }, [
          el("div", { className: "hero-dashboard__item-title" }, ["Дома"]),
          el("div", { className: "hero-dashboard__item-details" }, [
            "+23",
            el("span", { className: "a11y-hidden" }, ["°"]),
          ]),
        ]),
        el("li", { className: "hero-dashboard__item" }, [
          el("div", { className: "hero-dashboard__item-title" }, ["За окном"]),
          el("div", { className: "hero-dashboard__item-details" }, [
            "+19",
            el("span", { className: "a11y-hidden" }, ["°"]),
            el("div", {
              className: "hero-dashboard__icon hero-dashboard__icon_rain",
              role: "img",
              "aria-label": "Дождь",
            }),
          ]),
        ]),
      ]),
    ]),
    el("ul", { className: "hero-dashboard__schedule" }, [
      createEvent({
        icon: "temp",
        iconLabel: "Температура",
        title: "Philips Cooler",
        subtitle: "Начнет охлаждать в 16:30",
      }),
      createEvent({
        icon: "light",
        iconLabel: "Освещение",
        title: "Xiaomi Yeelight LED Smart Bulb",
        subtitle: "Включится в 17:00",
      }),
      createEvent({
        icon: "light",
        iconLabel: "Освещение",
        title: "Xiaomi Yeelight LED Smart Bulb",
        subtitle: "Включится в 17:00",
      }),
    ]),
  ]);

  const scriptsGrid = el("ul", { className: "event-grid" }, [
    createEvent({
      slim: true,
      icon: "light2",
      iconLabel: "Освещение",
      title: "Выключить весь свет в доме и во дворе",
    }),
    createEvent({
      slim: true,
      icon: "schedule",
      iconLabel: "Расписание",
      title: "Я ухожу",
    }),
    createEvent({
      slim: true,
      icon: "light2",
      iconLabel: "Освещение",
      title: "Включить свет в коридоре",
    }),
    createEvent({
      slim: true,
      icon: "temp2",
      iconLabel: "Температура",
      title: "Набрать горячую ванну",
      subtitle: "Начнётся в 18:00",
    }),
    createEvent({
      slim: true,
      icon: "temp2",
      iconLabel: "Температура",
      title: "Сделать пол тёплым во всей квартире",
    }),
  ]);

  const select = el(
    "select",
    { className: "section__select" },
    TABS_KEYS.map((key) => el("option", { value: key }, [TABS[key].title]))
  );

  const tabsList = el(
    "ul",
    { className: "section__tabs", role: "tablist" },
    TABS_KEYS.map((key) =>
      el(
        "li",
        {
          className: `section__tab${
            key === "all" ? " section__tab_active" : ""
          }`,
          role: "tab",
          "aria-selected": key === "all" ? "true" : "false",
          tabindex: key === "all" ? "0" : "-1",
          id: `tab_${key}`,
          "aria-controls": `panel_${key}`,
          "data-tabkey": key,
        },
        [TABS[key].title]
      )
    )
  );

  const panelWrapper = el("div", { className: "section__panel-wrapper" }, [
    ...TABS_KEYS.map((key) =>
      el(
        "div",
        {
          className: `section__panel${
            key === "all" ? "" : " section__panel_hidden"
          }`,
          role: "tabpanel",
          "aria-hidden": key === "all" ? "false" : "true",
          id: `panel_${key}`,
          "aria-labelledby": `tab_${key}`,
        },
        [el("ul", { className: "section__panel-list" })]
      )
    ),
    el("div", { className: "section__arrow", style: "display: none" }),
  ]);

  return el("main", { className: "main" }, [
    el("section", { className: "section main__general" }, [
      el(
        "h2",
        {
          className: "section__title section__title-header section__main-title",
        },
        ["Главное"]
      ),
      heroDashboard,
    ]),
    el("section", { className: "section main__scripts" }, [
      el("h2", { className: "section__title section__title-header" }, [
        "Избранные сценарии",
      ]),
      scriptsGrid,
    ]),
    el("section", { className: "section main__devices" }, [
      el("div", { className: "section__title" }, [
        el("h2", { className: "section__title-header" }, [
          "Избранные устройства",
        ]),
        select,
        tabsList,
      ]),
      panelWrapper,
    ]),
  ]);
}

document.addEventListener("DOMContentLoaded", function () {
  const appContainer = document.getElementById("app");
  appContainer.appendChild(createHeader());
  appContainer.appendChild(createMain());

  let activeTab = "all";
  const panelWrapper = document.querySelector(".section__panel-wrapper");
  const arrow = panelWrapper.querySelector(".section__arrow");
  const tabs = document.querySelectorAll(".section__tab");
  const select = document.querySelector(".section__select");

  function fillTab(tabKey) {
    const panel = document.querySelector(`#panel_${tabKey}`);
    const list = panel.querySelector(".section__panel-list");

    if (list.children.length > 0) {
      list.innerHTML = "";
    }

    const fragment = document.createDocumentFragment();

    TABS[tabKey].items.forEach((item) => {
      fragment.appendChild(createEvent(item));
    });

    list.appendChild(fragment);
  }

  function checkScrollNeeded() {
    const activePanel = panelWrapper.querySelector(`#panel_${activeTab}`);
    if (!activePanel) return;

    const list = activePanel.querySelector(".section__panel-list");
    if (!list) return;

    const hasScroll = list.scrollWidth > activePanel.offsetWidth;
    arrow.style.display = hasScroll ? "block" : "none";
  }

  function setActiveTab(tabKey) {
    if (activeTab === tabKey) return;

    document
      .querySelector(`.section__tab[data-tabkey="${activeTab}"]`)
      .classList.remove("section__tab_active");
    document
      .querySelector(`.section__tab[data-tabkey="${activeTab}"]`)
      .setAttribute("aria-selected", "false");
    document
      .querySelector(`.section__tab[data-tabkey="${activeTab}"]`)
      .setAttribute("tabindex", "-1");

    document
      .querySelector(`.section__tab[data-tabkey="${tabKey}"]`)
      .classList.add("section__tab_active");
    document
      .querySelector(`.section__tab[data-tabkey="${tabKey}"]`)
      .setAttribute("aria-selected", "true");
    document
      .querySelector(`.section__tab[data-tabkey="${tabKey}"]`)
      .setAttribute("tabindex", "0");

    document
      .querySelector(`#panel_${activeTab}`)
      .classList.add("section__panel_hidden");
    document
      .querySelector(`#panel_${activeTab}`)
      .setAttribute("aria-hidden", "true");

    document
      .querySelector(`#panel_${tabKey}`)
      .classList.remove("section__panel_hidden");
    document
      .querySelector(`#panel_${tabKey}`)
      .setAttribute("aria-hidden", "false");

    activeTab = tabKey;
    select.value = tabKey;

    fillTab(tabKey);

    setTimeout(checkScrollNeeded, 10);
  }

  select.addEventListener("change", (e) => setActiveTab(e.target.value));

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => setActiveTab(tab.dataset.tabkey));
  });

  arrow.addEventListener("click", () => {
    const activePanel = panelWrapper.querySelector(`#panel_${activeTab}`);
    if (activePanel) {
      activePanel.scrollBy({ left: 400, behavior: "smooth" });
    }
  });

  TABS_KEYS.forEach((key) => fillTab(key));

  setTimeout(() => {
    checkScrollNeeded();
    window.addEventListener("resize", checkScrollNeeded);
  }, 100);
});
