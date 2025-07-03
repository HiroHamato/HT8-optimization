(function () {
  "use strict";

  const Header = React.memo(function Header() {
    const [expanded, setExpanded] = React.useState(false);
    const [toggled, setToggled] = React.useState(false);

    const onClick = React.useCallback(() => {
      if (!toggled) setToggled(true);
      setExpanded(!expanded);
    }, [expanded, toggled]);

    return React.createElement(
      "header",
      { className: "header" },
      React.createElement("a", {
        href: "/",
        className: "header__logo",
        "aria-label": "Яндекс.Дом",
      }),
      React.createElement(
        "button",
        {
          className: "header__menu",
          "aria-expanded": expanded ? "true" : "false",
          onClick: onClick,
        },
        React.createElement(
          "span",
          { className: "header__menu-text a11y-hidden" },
          expanded ? "Закрыть меню" : "Открыть меню"
        )
      ),
      React.createElement(
        "ul",
        {
          className:
            "header__links" +
            (expanded ? " header__links_opened" : "") +
            (toggled ? " header__links-toggled" : ""),
        },
        React.createElement(
          "li",
          { className: "header__item" },
          React.createElement(
            "a",
            {
              className: "header__link header__link_current",
              href: "/",
              "aria-current": "page",
            },
            "Сводка"
          )
        ),
        React.createElement(
          "li",
          { className: "header__item" },
          React.createElement(
            "a",
            { className: "header__link", href: "/devices" },
            "Устройства"
          )
        ),
        React.createElement(
          "li",
          { className: "header__item" },
          React.createElement(
            "a",
            { className: "header__link", href: "/scripts" },
            "Сценарии"
          )
        )
      )
    );
  });

  const Event = React.memo(function Event(props) {
    const ref = React.useRef();
    const prevSize = React.useRef({ width: 0, height: 0 });

    React.useLayoutEffect(() => {
      if (!ref.current || !props.onSize) return;

      const width = ref.current.offsetWidth;
      const height = ref.current.offsetHeight;

      if (
        width !== prevSize.current.width ||
        height !== prevSize.current.height
      ) {
        prevSize.current = { width, height };
        props.onSize(props.id, { width, height });
      }
    }, [props.onSize, props.id]);

    const buttonChildren = [
      React.createElement("span", {
        key: "icon",
        className: "event__icon event__icon_" + props.icon,
        role: "img",
        "aria-label": props.iconLabel || "",
      }),
      React.createElement(
        "h4",
        { key: "title", className: "event__title" },
        props.title
      ),
    ];

    if (props.subtitle) {
      buttonChildren.push(
        React.createElement(
          "span",
          { key: "subtitle", className: "event__subtitle" },
          props.subtitle
        )
      );
    }

    return React.createElement(
      "li",
      {
        ref: ref,
        className: props.slim ? "event event_slim" : "event",
      },
      React.createElement(
        "button",
        { className: "event__button" },
        buttonChildren
      )
    );
  });

  const TABS = {
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

  const baseItems = TABS.all.items;
  const newItems = [];
  for (let i = 0; i < 64; i++) {
    for (let j = 0; j < baseItems.length; j++) {
      newItems.push(baseItems[j]);
    }
  }
  TABS.all.items = newItems;

  const TABS_KEYS = Object.keys(TABS);

  function Main() {
    const [activeTab, setActiveTab] = React.useState("");
    const [hasRightScroll, setHasRightScroll] = React.useState(false);
    const [sizes, setSizes] = React.useState({});
    const [renderedTabs, setRenderedTabs] = React.useState({});
    const containerRef = React.useRef();
    const initialized = React.useRef(false);

    React.useEffect(() => {
      if (!initialized.current) {
        initialized.current = true;
        const params = new URLSearchParams(window.location.search);
        setActiveTab(params.get("tab") || "all");
      }
    }, []);

    const onSelectInput = React.useCallback((event) => {
      setActiveTab(event.target.value);
    }, []);

    const handleSize = React.useCallback((id, size) => {
      setSizes((prev) => {
        if (
          prev[id] &&
          prev[id].width === size.width &&
          prev[id].height === size.height
        ) {
          return prev;
        }
        return { ...prev, [id]: size };
      });
    }, []);

    React.useLayoutEffect(() => {
      if (!activeTab || !containerRef.current) return;

      const panel = containerRef.current.querySelector(
        ".section__panel:not(.section__panel_hidden)"
      );
      if (!panel) return;

      let totalWidth = 0;
      const currentItems = TABS[activeTab].items;
      for (let i = 0; i < currentItems.length; i++) {
        const id = activeTab + "-" + i;
        if (sizes[id]) {
          totalWidth += sizes[id].width;
        }
      }

      setHasRightScroll(totalWidth > panel.clientWidth);
    }, [sizes, activeTab]);

    const onArrowClick = React.useCallback(() => {
      const panel = containerRef.current.querySelector(
        ".section__panel:not(.section__panel_hidden)"
      );
      if (panel) {
        panel.scrollBy({ left: 400, behavior: "smooth" });
      }
    }, []);

    const createDeviceElements = React.useCallback(
      (tabKey) => {
        const items = TABS[tabKey].items;
        return items.map((item, index) => {
          const id = tabKey + "-" + index;
          return React.createElement(Event, {
            key: id,
            id: id,
            icon: item.icon,
            iconLabel: item.iconLabel,
            title: item.title,
            subtitle: item.subtitle,
            onSize: handleSize,
          });
        });
      },
      [handleSize]
    );

    React.useEffect(() => {
      if (activeTab && !renderedTabs[activeTab]) {
        setRenderedTabs((prev) => ({
          ...prev,
          [activeTab]: createDeviceElements(activeTab),
        }));
      }
    }, [activeTab, createDeviceElements, renderedTabs]);

    return React.createElement(
      "main",
      { className: "main" },
      React.createElement(
        "section",
        { className: "section main__general" },
        React.createElement(
          "h2",
          {
            className:
              "section__title section__title-header section__main-title",
          },
          "Главное"
        ),
        React.createElement(
          "div",
          { className: "hero-dashboard" },
          React.createElement(
            "div",
            { className: "hero-dashboard__primary" },
            React.createElement(
              "h3",
              { className: "hero-dashboard__title" },
              "Привет, Геннадий!"
            ),
            React.createElement(
              "p",
              { className: "hero-dashboard__subtitle" },
              "Двери и окна закрыты, сигнализация включена."
            ),
            React.createElement(
              "ul",
              { className: "hero-dashboard__info" },
              React.createElement(
                "li",
                { className: "hero-dashboard__item" },
                React.createElement(
                  "div",
                  { className: "hero-dashboard__item-title" },
                  "Дома"
                ),
                React.createElement(
                  "div",
                  { className: "hero-dashboard__item-details" },
                  "+23",
                  React.createElement("span", { className: "a11y-hidden" }, "°")
                )
              ),
              React.createElement(
                "li",
                { className: "hero-dashboard__item" },
                React.createElement(
                  "div",
                  { className: "hero-dashboard__item-title" },
                  "За окном"
                ),
                React.createElement(
                  "div",
                  { className: "hero-dashboard__item-details" },
                  "+19",
                  React.createElement(
                    "span",
                    { className: "a11y-hidden" },
                    "°"
                  ),
                  React.createElement("div", {
                    className: "hero-dashboard__icon hero-dashboard__icon_rain",
                    role: "img",
                    "aria-label": "Дождь",
                  })
                )
              )
            )
          ),
          React.createElement(
            "ul",
            { className: "hero-dashboard__schedule" },
            React.createElement(Event, {
              icon: "temp",
              iconLabel: "Температура",
              title: "Philips Cooler",
              subtitle: "Начнет охлаждать в 16:30",
            }),
            React.createElement(Event, {
              icon: "light",
              iconLabel: "Освещение",
              title: "Xiaomi Yeelight LED Smart Bulb",
              subtitle: "Включится в 17:00",
            }),
            React.createElement(Event, {
              icon: "light",
              iconLabel: "Освещение",
              title: "Xiaomi Yeelight LED Smart Bulb",
              subtitle: "Включится в 17:00",
            })
          )
        )
      ),
      React.createElement(
        "section",
        { className: "section main__scripts" },
        React.createElement(
          "h2",
          { className: "section__title section__title-header" },
          "Избранные сценарии"
        ),
        React.createElement(
          "ul",
          { className: "event-grid" },
          React.createElement(Event, {
            slim: true,
            icon: "light2",
            iconLabel: "Освещение",
            title: "Выключить весь свет в доме и во дворе",
          }),
          React.createElement(Event, {
            slim: true,
            icon: "schedule",
            iconLabel: "Расписание",
            title: "Я ухожу",
          }),
          React.createElement(Event, {
            slim: true,
            icon: "light2",
            iconLabel: "Освещение",
            title: "Включить свет в коридоре",
          }),
          React.createElement(Event, {
            slim: true,
            icon: "temp2",
            iconLabel: "Температура",
            title: "Набрать горячую ванну",
            subtitle: "Начнётся в 18:00",
          }),
          React.createElement(Event, {
            slim: true,
            icon: "temp2",
            iconLabel: "Температура",
            title: "Сделать пол тёплым во всей квартире",
          })
        )
      ),
      React.createElement(
        "section",
        { className: "section main__devices" },
        React.createElement(
          "div",
          { className: "section__title" },
          React.createElement(
            "h2",
            { className: "section__title-header" },
            "Избранные устройства"
          ),
          React.createElement(
            "select",
            {
              className: "section__select",
              value: activeTab || "all",
              onInput: onSelectInput,
            },
            TABS_KEYS.map((key) =>
              React.createElement(
                "option",
                { key: key, value: key },
                TABS[key].title
              )
            )
          ),
          React.createElement(
            "ul",
            { role: "tablist", className: "section__tabs" },
            TABS_KEYS.map((key) =>
              React.createElement(
                "li",
                {
                  key: key,
                  role: "tab",
                  "aria-selected": key === activeTab ? "true" : "false",
                  className:
                    "section__tab" +
                    (key === activeTab ? " section__tab_active" : ""),
                  id: "tab_" + key,
                  "aria-controls": "panel_" + key,
                  onClick: () => setActiveTab(key),
                },
                TABS[key].title
              )
            )
          )
        ),
        React.createElement(
          "div",
          { className: "section__panel-wrapper", ref: containerRef },
          TABS_KEYS.map((key) =>
            React.createElement(
              "div",
              {
                key: key,
                role: "tabpanel",
                className:
                  "section__panel" +
                  (key === activeTab ? "" : " section__panel_hidden"),
                "aria-hidden": key !== activeTab ? "true" : "false",
                id: "panel_" + key,
                "aria-labelledby": "tab_" + key,
              },
              React.createElement(
                "ul",
                { className: "section__panel-list" },
                renderedTabs[key] || null
              )
            )
          ),
          hasRightScroll &&
            React.createElement("div", {
              className: "section__arrow",
              onClick: onArrowClick,
            })
        )
      )
    );
  }

  document.addEventListener("DOMContentLoaded", function () {
    const setTimeout(()=>{M(),window.addEventListener("resize",M);let e=new URLSearchParams(window.location.search),t=e.get("tab");t&&l.includes(t)&&P(t)},0)root = ReactDOM.createRoot(document.getElementById("app"));
    root.render(
      React.createElement(
        React.Fragment,
        null,
        React.createElement(Header, null),
        React.createElement(Main, null)
      )
    );
  });
})();
