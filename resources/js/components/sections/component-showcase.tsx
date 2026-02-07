import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const components = [
  {
    name: "phoneInput",
    tag: "Ввод номера",
    details:
      "Автоматически определяет оператора, валидирует формат и триггерит события валидности.",
  },
  {
    name: "moneyInput",
    tag: "Приём денег",
    details:
      "Отслеживает количество купюр, начисления и умеет инициировать возврат средств.",
  },
  {
    name: "scenario",
    tag: "Сценарий",
    details: "Ведёт пользователя по шагам, ожидает переходов и пишет историю действий.",
  },
  {
    name: "dataContract",
    tag: "Контракт",
    details: "Описывает входы/выходы, схему данных и позволяет валидировать связки компонентов.",
  },
  {
    name: "testRecorder",
    tag: "Автотесты",
    details: "Записывает клики, состояния и формирует тест-кейсы для CI.",
  },
];

export function ComponentShowcase() {
  return (
    <section className="container-x py-20">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-6">
          <Badge variant="accent" className="w-fit">
            Репозиторий компонентов
          </Badge>
          <h2 className="text-3xl font-semibold md:text-4xl">Компоненты, готовые к работе</h2>
          <p className="text-slate-300">
            Каждый компонент поставляется с описанием свойств, методов, событий и картой данных. Их можно
            комбинировать в составные экраны и переиспользовать в разных сценариях.
          </p>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Каталог</span>
              <span className="text-xs text-slate-400">1250 компонентов</span>
            </div>
            <div className="mt-4 grid gap-3">
              <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                <span>Rounded input</span>
                <span className="text-xs text-slate-400">★ 4.9</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                <span>Money acceptor</span>
                <span className="text-xs text-slate-400">★ 4.8</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                <span>OSAGO wizard</span>
                <span className="text-xs text-slate-400">★ 4.7</span>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {components.map((component) => (
            <Card key={component.name}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{component.name}</CardTitle>
                  <Badge>{component.tag}</Badge>
                </div>
                <CardDescription>{component.details}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
