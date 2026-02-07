import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function CTA() {
  return (
    <section className="container-x py-20">
      <Card className="relative overflow-hidden border-white/15 bg-gradient-to-r from-primary/20 via-white/5 to-accent/20">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/40 blur-3xl" />
        <div className="relative grid gap-6 md:grid-cols-[1.2fr_auto] md:items-center">
          <div>
            <h3 className="text-2xl font-semibold md:text-3xl">Готовы ускорить выпуск интерфейсов?</h3>
            <p className="mt-3 text-slate-200">
              Запросите демо, чтобы увидеть, как сценарии, компоненты и тесты живут в единой среде.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Button size="lg">Запросить демонстрацию</Button>
            <Button size="lg" variant="secondary">Скачать one-pager</Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
