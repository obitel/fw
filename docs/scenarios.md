# Сценарии и экраны

## Базовый сценарий оплаты телефона
```text
scenario
  EnterPhoneNumber
  PayMoney
  Proceed
```

## Сценарий оплаты страховки
```text
scenario
  ChooseInsuranceType
  if type == 'request'
    EnterPhoneNumber
    query('callback', store.serialize())
  else if type == 'buy_osago'
    OSAGO_data_screen
    PayMoney
    DeliveryAddress
    query('buy_osago', store.serialize())
  else if type == 'pay_casco'
    CASCO_user_info
    PayMoney
    query('pay_casco', store.serialize())
```

## Каркас экранов ОСАГО
- **ChooseInsuranceType** — выбор типа страховки.
- **OSAGO_personal_data_screen** — ФИО, клавиатура, формы.
- **OSAGO_reg_place_screen** — место регистрации.
- **OSAGO_car_info** — данные автомобиля и модели.
- **OSAGO_car_price** — стоимость автомобиля.

## Как живёт сценарий в редакторе
1. Дизайнер собирает экран из компонентов и сохраняет базовое состояние.
2. События кнопок и клавиш связываются с `screen.next()` / `screen.back()`.
3. Рантайм фиксирует переходы и сохраняет цепочку действий как тестовый сценарий.

## Тестирование сценариев (PoC)
- [ ] Пройти сценарий в UI и зафиксировать переходы.
- [ ] Сохранить последовательность событий в JSON.
- [ ] Прогнать сценарий в тестовом рантайме (минимальный режим).
- [ ] Зафиксировать успешные/неуспешные ветки.

