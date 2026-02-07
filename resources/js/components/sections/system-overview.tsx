import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const modules = [
  {
    title: "Visual Editor",
    description: "Канвас, инспектор, слой данных и событий, история изменений и ревью.",
  },
  {
    title: "Scenario Engine",
    description: "Оркестрация экранов, условия, переходы и контракты входов/выходов.",
  },
  {
    title: "Component Repository",
    description: "Версии, рейтинги, совместимость и автолинтинг API компонентов.",
  },
  {
    title: "Data Model Layer",
    description: "Единые сущности, схемы и реактивные подписки на состояние.",
  },
  {
    title: "Test Recorder",
    description: "Запись пользовательских действий и генерация автотестов для CI.",
  },
  {
    title: "Publish Pipeline",
    description: "Сборка пакетов для web, desktop и терминальных интерфейсов.",
  },
  {
    title: "Event Router",
    description: "Маршрутизация событий между UI, backend API и аналитикой.",
  },
  {
    title: "Access & Collaboration",
    description: "RBAC, совместное редактирование, ревью и audit-log.",
  },
];

const roles = [
  { role: "Designer", focus: "Собирает экраны, связывает события и состояния." },
  { role: "Product", focus: "Управляет сценариями, метриками и шаблонами." },
  { role: "Developer", focus: "Развивает компоненты, интеграции и CI/CD." },
  { role: "QA", focus: "Записывает и запускает тесты, управляет окружениями." },
  { role: "Admin", focus: "Управляет каталогом, доступами и лицензиями." },
];

const integrations = [
  "REST / gRPC / GraphQL через Event Router",
  "Analytics для конверсий и таймингов",
  "CI/CD пайплайны с автотестами",
  "Marketplace для плагинов и SDK",
];

export function SystemOverview() {
  return (
    <section className="container-x py-20">
      <div className="flex flex-col gap-6">
        <Badge variant="primary" className="w-fit">Полная система</Badge>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Восемь модулей, которые закрывают весь цикл проектирования и публикации.
            </h2>
            <p className="mt-4 text-slate-300">
              FW Visual Flow Studio объединяет редактор, сценарный движок, каталог компонентов, модель данных,
              тестовый рантайм и пайплайны публикации в одну синхронизированную систему.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {integrations.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <Card className="bg-gradient-to-br from-white/10 to-transparent">
            <CardHeader>
              <CardTitle>Роли и доступы</CardTitle>
              <CardDescription>
                RBAC, совместные сессии и ревью обеспечивают контроль над артефактами.
              </CardDescription>
            </CardHeader>
            <div className="mt-4 grid gap-3 text-sm">
              {roles.map((role) => (
                <div key={role.role} className="rounded-2xl border border-white/10 bg-surface/70 px-4 py-3">
                  <div className="text-xs uppercase tracking-wide text-slate-400">{role.role}</div>
                  <div className="text-slate-200">{role.focus}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {modules.map((module) => (
          <Card key={module.title} className="bg-gradient-to-br from-white/5 to-transparent">
            <CardHeader>
              <CardTitle>{module.title}</CardTitle>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
