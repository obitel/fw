import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Единая модель данных",
    description:
      "Все компоненты подписаны на одни и те же источники данных, поэтому изменения мгновенно отражаются на экране.",
  },
  {
    title: "Компоненты из коробки",
    description:
      "Телефонный ввод, денежный приёмник, формы регистрации — всё готово к использованию и имеет документацию.",
  },
  {
    title: "Сценарии как макросы",
    description:
      "Фиксируйте стартовое состояние, действие пользователя и получайте автотесты для каждого релиза.",
  },
  {
    title: "Каталог компонентов",
    description:
      "Поиск по ключевым словам, рейтинги, версии и совместимость. Компонент можно тянуть на экран мышью.",
  },
  {
    title: "События и автоматика",
    description:
      "Гибкие связи событий, реактивная логика и возможность собирать бизнес-потоки без кодинга.",
  },
  {
    title: "Публикация в один клик",
    description:
      "Экран адаптируется под веб, терминалы и мобильные устройства без дополнительных настроек.",
  },
];

export function FeatureGrid() {
  return (
    <section className="container-x py-20">
      <div className="mb-12 max-w-2xl">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Ключевые возможности</p>
        <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
          Всё, что нужно для создания сложных интерфейсов без боли.
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="bg-gradient-to-b from-white/10 to-transparent">
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
