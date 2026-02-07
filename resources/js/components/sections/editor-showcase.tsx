import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const lanes = [
  "Canvas",
  "Inspector",
  "Data",
  "Events",
  "Testing",
];

const components = [
  { name: "phoneInput", type: "Input" },
  { name: "moneyInput", type: "Hardware" },
  { name: "scenario", type: "Flow" },
  { name: "osagoWizard", type: "Template" },
];

export function EditorShowcase() {
  return (
    <section className="container-x py-20">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <Badge variant="accent" className="w-fit">Визуальный редактор</Badge>
          <h2 className="text-3xl font-semibold md:text-4xl">
            Редактируйте экраны, события и данные в одном канвасе.
          </h2>
          <p className="text-slate-300">
            Интерфейс студии объединяет каталог компонентов, инспектор данных и сценарный редактор.
            Всё синхронизируется в реальном времени, а каждый экран хранит состояние и историю действий.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button>Открыть демо-редактор</Button>
            <Button variant="secondary">Смотреть гайд</Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {lanes.map((lane) => (
              <div key={lane} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
                <span className="text-xs uppercase tracking-wide text-slate-400">Lane</span>
                <div className="text-base font-semibold">{lane}</div>
              </div>
            ))}
          </div>
        </div>
        <Card className="bg-gradient-to-br from-white/10 to-transparent">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-wide text-slate-400">Workspace</div>
                <div className="text-lg font-semibold">Insurance Flow Builder</div>
              </div>
              <Badge>Live</Badge>
            </div>
            <div className="grid gap-3">
              {components.map((component) => (
                <div
                  key={component.name}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-surface/60 px-4 py-3"
                >
                  <div>
                    <div className="text-sm font-semibold">{component.name}</div>
                    <div className="text-xs text-slate-400">{component.type}</div>
                  </div>
                  <span className="rounded-full bg-primary/20 px-3 py-1 text-xs text-primary">Drag</span>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span>Состояние экрана</span>
                <span className="text-slate-400">last updated 2s ago</span>
              </div>
              <div className="mt-3 grid gap-2">
                <div className="flex items-center justify-between">
                  <span>phone</span>
                  <span className="text-primary">+7 (999) 555-45-45</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>operator</span>
                  <span className="text-slate-200">MTS</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>amount</span>
                  <span className="text-slate-200">2 450 ₽</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
