import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const flows = [
  {
    title: "Оплата телефона",
    steps: ["EnterPhoneNumber", "PayMoney", "Proceed"],
    description: "Классический сценарий оплаты с подтверждением и отображением статуса.",
  },
  {
    title: "ОСАГО / КАСКО",
    steps: ["ChooseInsuranceType", "OSAGO data", "PayMoney", "DeliveryAddress"],
    description: "Гибкая ветка сценариев с разными путями и серверными запросами.",
  },
  {
    title: "Scenario Engine + Test Recorder",
    steps: ["Record", "Validate", "Publish"],
    description: "Сценарии записываются как тесты и прогоняются в CI перед публикацией.",
  },
  {
    title: "Кастомный flow",
    steps: ["Scene A", "Scene B", "Scene C"],
    description: "Собирайте свои цепочки и подключайте события к кнопкам, клавишам и датчикам.",
  },
];

export function ScenarioFlow() {
  return (
    <section className="container-x py-20">
      <div className="flex flex-col gap-6">
        <Badge variant="primary" className="w-fit">Сценарии</Badge>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-2xl text-3xl font-semibold md:text-4xl">
            Сценарии = карта экранов, событий и данных.
          </h2>
          <p className="max-w-lg text-slate-300">
            Записывайте последовательности действий и получайте живые тесты, которые проходят при каждом релизе.
          </p>
        </div>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {flows.map((flow) => (
          <Card key={flow.title} className="bg-gradient-to-br from-white/5 to-transparent">
            <CardHeader>
              <CardTitle>{flow.title}</CardTitle>
              <CardDescription>{flow.description}</CardDescription>
              <div className="mt-4 flex flex-wrap gap-2">
                {flow.steps.map((step) => (
                  <span
                    key={step}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
                  >
                    {step}
                  </span>
                ))}
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
