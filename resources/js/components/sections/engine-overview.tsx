import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const engineBlocks = [
  {
    title: "Scenario Engine",
    description: "Выполняет условия, ветвления и переходы между экранами в реальном времени.",
  },
  {
    title: "State Engine",
    description: "Фиксирует начальные и конечные состояния экранов и преобразует их в автотесты.",
  },
  {
    title: "Event Router",
    description: "Распределяет события между компонентами и серверами, связывая UI и бизнес-логику.",
  },
  {
    title: "Render Targets",
    description: "Единый декларативный слой, который компилируется в web, desktop и терминальные UI.",
  },
  {
    title: "Data Contracts",
    description: "Контракты между компонентами, которые описывают входные и выходные данные.",
  },
];

export function EngineOverview() {
  return (
    <section className="container-x py-20">
      <div className="flex flex-col gap-6">
        <Badge variant="primary" className="w-fit">Движок системы</Badge>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-3xl font-semibold md:text-4xl">Внутренний движок, который связывает всё.</h2>
            <p className="mt-4 text-slate-300">
              Мы описываем интерфейсы через декларативные контракты. Движок синхронизирует состояние,
              маршрутизирует события и собирает тесты. В результате получаем одинаковое поведение на всех платформах.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200">
            <div className="text-xs uppercase tracking-wide text-slate-400">Flow runtime</div>
            <div className="mt-2 text-lg font-semibold">v0.9 · stable channel</div>
            <div className="mt-4 grid gap-3">
              <div className="flex items-center justify-between">
                <span>Scenario latency</span>
                <span className="text-primary">32ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span>State snapshots</span>
                <span className="text-slate-200">2 134</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Live devices</span>
                <span className="text-slate-200">84</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {engineBlocks.map((block) => (
          <Card key={block.title} className="bg-gradient-to-br from-white/5 to-transparent">
            <CardHeader>
              <CardTitle>{block.title}</CardTitle>
              <CardDescription>{block.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
