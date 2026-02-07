import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const templates = [
  {
    title: "Оплата телефона",
    description: "Готовый flow с проверкой номера, оплатой и экраном успеха.",
  },
  {
    title: "ОСАГО оформление",
    description: "Пошаговая анкета с выбором авто и адаптивной логикой.",
  },
  {
    title: "Услуги и подписки",
    description: "Сценарий повторной оплаты с напоминаниями и upsell-блоками.",
  },
  {
    title: "Customer support",
    description: "Интерфейс для терминала с быстрым доступом к инструкциям и чату.",
  },
];

export function TemplateLibrary() {
  return (
    <section className="container-x py-20">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-4">
          <Badge className="w-fit">Шаблоны</Badge>
          <h2 className="text-3xl font-semibold md:text-4xl">Библиотека заготовок и flow-паттернов</h2>
          <p className="max-w-2xl text-slate-300">
            Используйте готовые экраны, виджеты и сценарии. Каждый шаблон включает компоненты, события и тестовые
            состояния, чтобы ускорить запуск в продакшн.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
          48 новых шаблонов за квартал
        </div>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {templates.map((template) => (
          <Card key={template.title} className="bg-gradient-to-b from-white/10 to-transparent">
            <CardHeader>
              <CardTitle>{template.title}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
