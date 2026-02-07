export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface/60">
      <div className="container-x grid gap-8 py-12 md:grid-cols-3">
        <div>
          <div className="text-lg font-semibold">FW Visual Flow Studio</div>
          <p className="mt-2 text-sm text-slate-400">
            Среда визуального проектирования интерфейсов, сценариев и тестов.
          </p>
        </div>
        <div className="text-sm text-slate-300">
          <div className="font-semibold text-white">Документация</div>
          <ul className="mt-3 space-y-2">
            <li>Введение и концепция</li>
            <li>Каталог компонентов</li>
            <li>Сценарии и тесты</li>
          </ul>
        </div>
        <div className="text-sm text-slate-300">
          <div className="font-semibold text-white">Контакты</div>
          <ul className="mt-3 space-y-2">
            <li>hello@fw.studio</li>
            <li>+7 (495) 000-00-00</li>
            <li>Москва · Санкт-Петербург</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
