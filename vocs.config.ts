import { defineConfig } from "vocs";

export default defineConfig({
  title: "FW Visual Flow Studio",
  description: "Документация и руководство по концептуальному прототипу визуальной среды",
  docsDir: "docs",
  sidebar: [
    {
      text: "Обзор",
      link: "/index",
    },
    {
      text: "Архитектура",
      link: "/architecture",
    },
    {
      text: "Система",
      link: "/system",
    },
    {
      text: "Сценарии",
      link: "/scenarios",
    },
    {
      text: "Компоненты",
      link: "/components",
    },
    {
      text: "Документация по компонентам",
      items: [
        { text: "Обзор", link: "/components/index" },
        { text: "phoneInput", link: "/components/phone-input" },
        { text: "moneyInput", link: "/components/money-input" },
        { text: "scenario", link: "/components/scenario" },
      ],
    },
  ],
});
