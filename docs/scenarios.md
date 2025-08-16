# Сценарии и потоки UIF

## Обзор сценариев

Сценарии в UIF - это последовательности экранов и действий, которые описывают пользовательский путь через приложение.

## Структура сценария

```javascript
scenario ScenarioName:
  // Последовательность экранов
  screen1: ScreenComponent
  screen2: ScreenComponent
  screen3: ScreenComponent
  
  // Условная логика
  if condition
    screen4: ScreenComponent
  else
    screen5: ScreenComponent
  
  // Обработка результатов
  .onComplete: (data) -> handler
  .onError: (error) -> handler
```

## Базовые сценарии

### 1. Сценарий оплаты телефона

```javascript
scenario PhonePayment:
  EnterPhoneNumber // Получаем phone, operator
  PayMoney // Получаем сумму
  Proceed // Показываем результат
```

### 2. Сценарий страховки

```javascript
scenario InsuranceFlow:
  ChooseInsuranceType // Выбор типа страховки
  
  if type == 'request'
    EnterPhoneNumber
    query('callback', store.serialize())
  else if type == 'buy_osago'
    OSAGO_data_screen // Комплексный экран с подэкранами
    PayMoney
    DeliveryAddress
    query('buy_osago', store.serialize())
  else if type == 'pay_casco'
    CASCO_user_info
    PayMoney
    query('pay_casco', store.serialize())
```

## Экраны страховки

### ChooseInsuranceType
```javascript
ChooseInsuranceType:
  #title: Выберите тип страховки
  #hbox
    button: Оставить заявку ОСАГО\КАСКО
      .click: () ->
        screen.next({type: 'request'})
    button: Покупка ОСАГО
      .click: () ->
        screen.next({type: 'buy_osago'})
    button: Оплата рассрочки КАСКО
      .click: () ->
        screen.next({type: 'pay_casco'})
  
  center
    button: Отмена
      .click: () ->
        screen.back()
```

### OSAGO_personal_data_screen
```javascript
OSAGO_personal_data_screen:
  #title: Заполните личные данные
  form form1
    input name: Имя
      type: text
      keyboard: cyrilic
    input surname: Фамилия
      type: text
      keyboard: cyrilic
    input midname: Отчество
      type: text
      keyboard: cyrilic
  
  center
    button: Далее
      .click: () ->
        store(form1.serialize())
        screen.next('OSAGO_reg_place_screen')
    button: Отмена
      .click: () ->
        screen.back()
```

### OSAGO_car_info
```javascript
OSAGO_car_info:
  #title: Информация об автомобиле
  input year: Год выпуска
    type: year
    keyboard: year
    max: date.get('year')
    min: date.get('year') - 6
    afterMin: 
      older: Старше
  
  input brand: Марка автомобиля
    values:
      alfa_romeo: {name: 'Alfa Romeo', models: {
          mito: {name: 'MiTo', formfactors: [
            {name: '2.4 i (133.00 л.с.)'}
          ]},
          159: {name: '159'},
          giulietta: {name: 'Giulietta'}
        }}
      audi: {name: 'Audi', models: [
          a1: {name: 'A1'},
          a3: {name: 'A3'},
          // ... другие модели
        ]}
      vaz: {name: 'ВАЗ', group: 'Отечественные автомобили', models: [
          1117_kalina: {name: '1117 Kalina'},
          2190_granta: {name: '2190 Granta'},
          // ... другие модели
        ]}
    type: filteredEnum
    keyboard: english\cyrilic
    group: item.group || item.name.substr(0,1)
    sort: alfabet(item.name)
    .change: () ->
      model.show()
  
  input model: Модель машины
    hidden: true
    values: brand.value.models
    sort: alfabet(item.name)
    keyboard: english\cyrilic
    .change: () ->
      formfactor.show()
  
  input formfactor: Тип кузова
    hidden: true
    values: model.value.formfactors
    sort: alfabet(item.name)
    .change: () ->
      next.show()
  
  center
    button next: Далее
      .click: () ->
        store({
          year: form1.year.value,
          brand: brand.value.key,
          model: model.value.key,
          formfactor: formfactor.value.name,
        })
        screen.next('OSAGO_car_price')
    button: Отмена
      .click: () ->
        screen.back()
```

### CASCO_user_info
```javascript
CASCO_user_info:
  #title: Введите ваш номер клиента
  input client_id: Номер клиента
    type: number
    keyboard: number
    validate: this.value.length > 10
    .valid: (valid) ->
      next[valid ? 'show' : 'hide']()
  
  center
    button next: Далее
      hidden: true
      .click: () ->
        query('getUserInfo', {id: client_id.value}, function(data) {
          if(data) {
            store({
              $doubleAuthorizePhone: data.phone,
              $PRICE: data.price
            })
            screen.next('DoubleAuthorize')
          } else {
            dialog.error('Клиент с таким номером не найден')
          }
        })
```

## Системные переменные

### Специальные переменные
- `$PRICE` - цена услуги (используется стандартным экраном приёма денег)
- `$doubleAuthorizePhone` - номер телефона для двойной авторизации

### Управление состоянием
```javascript
// Сохранение данных
store({
  key: value,
  nested: {
    property: value
  }
})

// Получение данных
store('key')
store('nested.property')

// Сериализация формы
store(form1.serialize())
```

## Навигация между экранами

### Методы навигации
```javascript
// Переход к следующему экрану
screen.next()
screen.next('ScreenName')
screen.next({param: value})

// Возврат к предыдущему экрану
screen.back()

// Переход к предыдущему экрану
screen.prev()
```

### Условная навигация
```javascript
if condition
  screen.next('ScreenA')
else
  screen.next('ScreenB')
```

## Интеграция с внешними системами

### Query API
```javascript
query('endpoint', data, callback)
```

**Примеры:**
```javascript
// Получение цены
query('getPrice', store.serialize(), function(value) {
  store({$PRICE: value})
  screen.next()
})

// Обработка ошибок
query('getUserInfo', {id: client_id.value}, function(data) {
  if(data) {
    // Успешная обработка
    screen.next()
  } else {
    dialog.error('Клиент не найден')
  }
})
```

## Обработка ошибок

### Валидация данных
```javascript
input field: Label
  validate: this.value.length > 0
  .valid: (status) ->
    next[status ? 'show' : 'hide']()
```

### Диалоги ошибок
```javascript
dialog.error('Сообщение об ошибке')
dialog.warning('Предупреждение')
dialog.info('Информация')
```

## Тестирование сценариев

### Автоматическая генерация тестов
```javascript
test PhonePaymentScenario:
  // Запись действий пользователя
  record:
    EnterPhoneNumber:
      input: "1234567890"
      expect: {phone: "1234567890", operator: "unknown"}
    
    PayMoney:
      input: 100
      expect: {amount: 100}
    
    Proceed:
      expect: {status: "success"}
```

### Валидация состояний
```javascript
validate:
  EnterPhoneNumber:
    required: ["phone", "operator"]
    types: {
      phone: "string",
      operator: "string"
    }
  
  PayMoney:
    required: ["amount"]
    types: {
      amount: "number"
    }
    constraints: {
      amount: ">= 0"
    }
```

## Лучшие практики

### 1. Структурирование сценариев
- Разбивайте сложные сценарии на подэкраны
- Используйте условную логику для ветвления
- Группируйте связанные экраны

### 2. Управление состоянием
- Используйте системные переменные для общих данных
- Сериализуйте формы для передачи данных
- Валидируйте данные на каждом этапе

### 3. Обработка ошибок
- Предусматривайте все возможные ошибки
- Используйте информативные сообщения
- Предоставляйте пути восстановления

### 4. Производительность
- Минимизируйте количество запросов к серверу
- Кэшируйте часто используемые данные
- Оптимизируйте переходы между экранами