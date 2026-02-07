#!/usr/bin/env node
import { readFileSync } from "node:fs";

type Screen = {
  name: string;
  components: string[];
};

type Scenario = {
  name: string;
  steps: string[];
  onComplete: string;
};

const screens: Screen[] = [
  { name: "EnterPhoneNumber", components: ["phoneInput", "keypad", "primaryButton"] },
  { name: "PayMoney", components: ["moneyInput", "receipt", "statusPanel"] },
  { name: "OSAGO_data_screen", components: ["forms", "keyboard", "summary"] },
  { name: "DeliveryAddress", components: ["addressForm", "mapPicker", "confirmButton"] },
];

const scenarios: Scenario[] = [
  {
    name: "PhonePayment",
    steps: ["EnterPhoneNumber", "PayMoney", "Proceed"],
    onComplete: "query('payment', store.serialize())",
  },
  {
    name: "OSAGO_purchase",
    steps: ["ChooseInsuranceType", "OSAGO_data_screen", "PayMoney", "DeliveryAddress"],
    onComplete: "query('buy_osago', store.serialize())",
  },
  {
    name: "Insurance_request",
    steps: ["ChooseInsuranceType", "EnterPhoneNumber", "RequestCallback"],
    onComplete: "query('callback', store.serialize())",
  },
];

const commands = {
  "list:screens": "Показать все экраны прототипа",
  "list:scenarios": "Показать все сценарии прототипа",
  "describe:system": "Кратко описать ключевые модули системы",
  "show:scenario": "Показать шаги сценария по имени (используйте --name)",
  "help": "Показать справку",
} as const;

function usage() {
  const list = Object.entries(commands)
    .map(([cmd, desc]) => `  ${cmd.padEnd(16)}${desc}`)
    .join("\n");
  return `FW Visual Flow CLI\n\nКоманды:\n${list}\n\nПримеры:\n  fw-cli list:screens\n  fw-cli show:scenario --name OSAGO_purchase\n`;
}

function loadModules() {
  try {
    const contents = readFileSync(new URL("../docs/system.md", import.meta.url), "utf8");
    const lines = contents.split("\n");
    const startIndex = lines.findIndex((line) => line.includes("Состав системы"));
    if (startIndex === -1) {
      return [];
    }
    return lines
      .slice(startIndex + 1)
      .filter((line) => line.trim().startsWith("1.") || line.trim().startsWith("- **"))
      .slice(0, 8)
      .map((line) => line.replace(/^[\\s-\\d.]+\\*\\*/g, "").replace(/\\*\\*/g, "").trim());
  } catch {
    return [];
  }
}

function showSystem() {
  const modules = loadModules();
  if (modules.length === 0) {
    console.log("Модули системы не найдены, проверьте docs/system.md.");
    return;
  }
  console.log("Ключевые модули FW Visual Flow Studio:");
  modules.forEach((module, index) => {
    console.log(` ${index + 1}. ${module}`);
  });
}

function listScreens() {
  console.log("Экраны прототипа:");
  screens.forEach((screen) => {
    console.log(` • ${screen.name} (${screen.components.join(", ")})`);
  });
}

function listScenarios() {
  console.log("Сценарии прототипа:");
  scenarios.forEach((scenario) => {
    console.log(` • ${scenario.name} → ${scenario.steps.join(" → ")}`);
  });
}

function showScenario(name: string | null) {
  if (!name) {
    console.log("Укажите имя сценария через --name.");
    return;
  }
  const scenario = scenarios.find((item) => item.name === name);
  if (!scenario) {
    console.log(`Сценарий ${name} не найден.`);
    return;
  }
  console.log(`${scenario.name}:`);
  scenario.steps.forEach((step, index) => {
    console.log(` ${index + 1}. ${step}`);
  });
  console.log(` Завершение: ${scenario.onComplete}`);
}

const args = process.argv.slice(2);
const command = args[0] ?? "help";
const nameIndex = args.indexOf("--name");
const nameArg = nameIndex >= 0 ? args[nameIndex + 1] : null;

switch (command) {
  case "list:screens":
    listScreens();
    break;
  case "list:scenarios":
    listScenarios();
    break;
  case "describe:system":
    showSystem();
    break;
  case "show:scenario":
    showScenario(nameArg);
    break;
  default:
    console.log(usage());
}
