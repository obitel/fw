import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const screens = [
  { id: "enter-phone", name: "EnterPhoneNumber", status: "Draft" },
  { id: "payment", name: "PayMoney", status: "Ready" },
  { id: "success", name: "Proceed", status: "Stable" },
  { id: "insurance", name: "OSAGO flow", status: "Review" },
];

const components = [
  { id: "phone-input", name: "phoneInput", type: "Input", version: "v2.4" },
  { id: "money-input", name: "moneyInput", type: "Hardware", version: "v1.7" },
  { id: "cta-button", name: "primaryButton", type: "Action", version: "v3.1" },
  { id: "stepper", name: "stepper", type: "Layout", version: "v2.2" },
  { id: "osago-wizard", name: "osagoWizard", type: "Template", version: "v0.9" },
  { id: "event-router", name: "eventRouter", type: "Integration", version: "v1.1" },
];

const events = [
  { id: "evt-1", title: "phoneInput.valid", action: "scenario.next", target: "PayMoney" },
  { id: "evt-2", title: "payButton.click", action: "api.payment", target: "Event Router" },
  { id: "evt-3", title: "payment.success", action: "scenario.goto", target: "Proceed" },
  { id: "evt-4", title: "session.timeout", action: "scenario.back", target: "EnterPhoneNumber" },
];

const scenarios = [
  { id: "sc-1", name: "Оплата телефона", steps: 4, status: "Live" },
  { id: "sc-2", name: "ОСАГО/КАСКО", steps: 6, status: "Draft" },
  { id: "sc-3", name: "Регистрация", steps: 5, status: "Review" },
];

const logs = [
  "10:24:11 · scenario.start · EnterPhoneNumber",
  "10:24:14 · state.update · phone=+7 999 555-45-45",
  "10:24:18 · event.fire · phoneInput.valid",
  "10:24:18 · scenario.next · PayMoney",
  "10:24:31 · api.request · payments/confirm",
];

const environments = ["mock", "stage", "prod"];

export function StudioApp() {
  const [selectedScreen, setSelectedScreen] = useState(screens[0]);
  const [activeEnv, setActiveEnv] = useState(environments[0]);

  const screenComponents = useMemo(() => (
    [
      { name: "phoneInput", status: "linked" },
      { name: "primaryButton", status: "linked" },
      { name: "disclaimer", status: "draft" },
    ]
  ), []);

  return (
    <div className="min-h-screen bg-base text-white">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-surface/80 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/20 text-center text-lg font-semibold leading-10 text-primary">
            FW
          </div>
          <div>
            <div className="text-sm text-slate-400">FW Visual Flow Studio</div>
            <div className="text-lg font-semibold">Insurance Flow Builder</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="uppercase">{activeEnv}</Badge>
          <Badge variant="primary">Live collaboration</Badge>
          <Button variant="secondary">Publish</Button>
          <Button>Run tests</Button>
        </div>
      </header>

      <div className="grid gap-6 px-6 py-6 lg:grid-cols-[280px_1fr_320px]">
        <aside className="space-y-6">
          <Card className="bg-gradient-to-br from-white/10 to-transparent p-4">
            <div className="text-xs uppercase tracking-wide text-slate-400">Проекты</div>
            <div className="mt-3 grid gap-3">
              {screens.map((screen) => (
                <button
                  key={screen.id}
                  type="button"
                  onClick={() => setSelectedScreen(screen)}
                  className={`rounded-2xl border px-4 py-3 text-left transition ${
                    selectedScreen.id === screen.id
                      ? "border-primary/60 bg-primary/10"
                      : "border-white/10 bg-white/5 hover:border-white/30"
                  }`}
                >
                  <div className="text-sm font-semibold">{screen.name}</div>
                  <div className="text-xs text-slate-400">{screen.status}</div>
                </button>
              ))}
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-white/10 to-transparent p-4">
            <div className="text-xs uppercase tracking-wide text-slate-400">Каталог компонентов</div>
            <div className="mt-3 grid gap-3">
              {components.map((component) => (
                <div
                  key={component.id}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span>{component.name}</span>
                    <span className="text-xs text-slate-400">{component.version}</span>
                  </div>
                  <div className="text-xs text-slate-400">{component.type}</div>
                </div>
              ))}
            </div>
          </Card>
        </aside>

        <main className="space-y-6">
          <Card className="bg-gradient-to-br from-white/10 to-transparent p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-slate-400">Canvas</div>
                <div className="text-2xl font-semibold">{selectedScreen.name}</div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {environments.map((env) => (
                  <button
                    key={env}
                    type="button"
                    onClick={() => setActiveEnv(env)}
                    className={`rounded-full border px-4 py-1 text-xs uppercase tracking-wide transition ${
                      activeEnv === env
                        ? "border-primary/50 bg-primary/20 text-primary"
                        : "border-white/10 bg-white/5 text-slate-200 hover:border-white/30"
                    }`}
                  >
                    {env}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
              <div className="rounded-3xl border border-dashed border-white/20 bg-white/5 p-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">Состояние экрана</div>
                  <Badge variant="secondary">Autosave 2s ago</Badge>
                </div>
                <div className="mt-4 grid gap-3 text-sm text-slate-200">
                  <div className="flex items-center justify-between">
                    <span>phone</span>
                    <span className="text-primary">+7 (999) 555-45-45</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>operator</span>
                    <span>MTS</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>amount</span>
                    <span>2 450 ₽</span>
                  </div>
                </div>
                <div className="mt-6 grid gap-2">
                  {screenComponents.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-surface/70 px-4 py-3 text-xs"
                    >
                      <span>{item.name}</span>
                      <span className="rounded-full bg-primary/20 px-3 py-1 text-primary">{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="text-sm font-semibold">Сценарные переходы</div>
                <div className="mt-4 grid gap-3">
                  {events.map((event) => (
                    <div key={event.id} className="rounded-2xl border border-white/10 bg-base/60 px-4 py-3">
                      <div className="text-xs uppercase tracking-wide text-slate-400">{event.title}</div>
                      <div className="mt-1 text-sm text-slate-200">{event.action}</div>
                      <div className="text-xs text-slate-400">→ {event.target}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <Card className="bg-gradient-to-br from-white/10 to-transparent p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wide text-slate-400">Scenario Engine</div>
                  <div className="text-lg font-semibold">Активные сценарии</div>
                </div>
                <Badge variant="primary">3 сценария</Badge>
              </div>
              <div className="mt-4 grid gap-3">
                {scenarios.map((scenario) => (
                  <div
                    key={scenario.id}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <div>
                      <div className="text-sm font-semibold">{scenario.name}</div>
                      <div className="text-xs text-slate-400">{scenario.steps} шагов</div>
                    </div>
                    <Badge variant="secondary">{scenario.status}</Badge>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="bg-gradient-to-br from-white/10 to-transparent p-6">
              <div className="text-xs uppercase tracking-wide text-slate-400">Event router</div>
              <div className="text-lg font-semibold">Live feed</div>
              <div className="mt-4 grid gap-2 text-xs text-slate-200">
                {logs.map((log) => (
                  <div key={log} className="rounded-2xl border border-white/10 bg-base/70 px-4 py-3">
                    {log}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>

        <aside className="space-y-6">
          <Card className="bg-gradient-to-br from-white/10 to-transparent p-4">
            <div className="text-xs uppercase tracking-wide text-slate-400">Inspector</div>
            <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="text-sm font-semibold">phoneInput</div>
              <div className="text-xs text-slate-400">Props</div>
              <div className="mt-3 grid gap-2 text-xs text-slate-200">
                <div className="flex items-center justify-between">
                  <span>operator</span>
                  <span>auto</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>mask</span>
                  <span>+7 (___) ___-__-__</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>validation</span>
                  <span>strict</span>
                </div>
              </div>
            </div>
            <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="text-xs uppercase tracking-wide text-slate-400">Events</div>
              <div className="mt-2 grid gap-2 text-xs text-slate-200">
                <div className="flex items-center justify-between">
                  <span>valid</span>
                  <span className="text-primary">scenario.next</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>focus</span>
                  <span>analytics.track</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-white/10 to-transparent p-4">
            <div className="text-xs uppercase tracking-wide text-slate-400">Test recorder</div>
            <div className="mt-3 grid gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-200">
                Recording session: 04:18
              </div>
              <Button variant="secondary" className="w-full">Stop recording</Button>
              <Button className="w-full">Generate test</Button>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
