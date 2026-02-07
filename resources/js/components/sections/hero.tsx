import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-dots opacity-40" />
      <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-primary/30 blur-[140px]" />
      <div className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-accent/30 blur-[140px]" />
      <div className="container-x relative py-24">
        <div className="flex flex-col gap-8">
          <Badge variant="primary" className="w-fit">Визуальный конструктор интерфейсов</Badge>
          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
              FW Visual Flow Studio — среда, где интерфейсы собираются мышью и сразу работают в вебе,
              десктопе и терминалах.
            </h1>
            <p className="text-lg text-slate-300">
              Мы превращаем сценарии в интерактивные экраны, события и тесты. Компоненты живут в едином
              каталоге, синхронизированы с данными и автоматически документируются.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button>Запросить демо</Button>
            <Button variant="secondary">Скачать презентацию</Button>
            <Button variant="ghost">Изучить документацию</Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Платформы", value: "Web / Desktop / POS" },
              { label: "Время прототипа", value: "20 минут" },
              { label: "Сценарии", value: "Без кода + автоматические тесты" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-wide text-slate-400">{stat.label}</div>
                <div className="text-lg font-semibold">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
