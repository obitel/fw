# Компоненты UIF

## Обзор компонентов

Компоненты в UIF - это переиспользуемые блоки интерфейса, которые можно комбинировать для создания сложных приложений.

## Структура компонента

Каждый компонент имеет четко определенную структуру:

```javascript
ComponentName:
  // Свойства компонента
  properties:
    prop1: type
    prop2: type
  
  // Состояние компонента
  state:
    state1: initialValue
    state2: initialValue
  
  // События компонента
  events:
    event1: handler
    event2: handler
  
  // Методы компонента
  methods:
    method1: implementation
    method2: implementation
```

## Встроенные компоненты

### Базовые компоненты

#### 1. Input (Поле ввода)
```javascript
input fieldName: Label
  type: text|number|email|phone|date|password
  placeholder: Placeholder text
  keyboard: cyrilic|english|number|year
  validate: validationFunction
  .change: (value) -> handler
  .valid: (status) -> handler
```

#### 2. Button (Кнопка)
```javascript
button buttonName: Button Text
  enabled: true|false
  hidden: true|false
  .click: () -> handler
```

#### 3. Title (Заголовок)
```javascript
title: Title Text
  size: h1|h2|h3|h4|h5|h6
  align: left|center|right
```

#### 4. Form (Форма)
```javascript
form formName
  // Содержит input компоненты
  .serialize: () -> object
  .validate: () -> boolean
```

### Специализированные компоненты

#### 1. PhoneInput (Ввод телефона)
```javascript
phoneInput phone
  #icon.{{operator}}
  input
    type: number
    placeholder: (XXX) XXX-XX-XX
    .change: (value) ->
      this.ctx.set('operator', db('def').get(value).operator || 'unknown')
```

#### 2. MoneyInput (Работа с деньгами)
```javascript
moneyInput:
  returnCount: 2
  .init: () ->
    store({
      amount: 0,
      billCount: 0,
      canReturn: this.returnCount
    })
  .income: (amount) ->
    store({amount: store('amount') + amount})
    store({billCount: store('billCount') + 1})
    var count = this.returnCount - store('billCount')
    store({canReturn: count > 0 ? count : false})
```

#### 3. Keyboard (Виртуальная клавиатура)
```javascript
keyboard
  type: number|cyrilic|english
  layout: qwerty|numpad
  .keyPress: (key) -> handler
```

### Композитные компоненты

#### 1. EnterPhoneNumber (Экран ввода телефона)
```javascript
EnterPhoneNumber:
  center
    #title: Введите номер телефона
    #phoneInput phone
      .valid: (status) ->
        next.set('enabled', status)
    
    #keyboard
      type: number
    
    #hbox
      button: Назад
        .click: () ->
          screen.back()
      button next: Далее
        enabled: false
        .click: () ->
          store({
            operator: phone.get('operator'),
            phone: phone.get('phone')
          })
          screen.next()
```

#### 2. PayMoney (Экран оплаты)
```javascript
PayMoney:
  #hardware money
    type: moneyInput
    .canReturn: (can) ->
      cancel[can ? 'show' : 'hide']()
  
  center
    #title: Внесите деньги
    
    if $PRICE
      #subtitle: Необходимая сумма: {{$PRICE}}
    
    #subTitle: Внесённая сумма
      div.label: {{amount}}
    
    if canReturn
      #subTitle: Вы можете сделать возврат {{canReturn}} {{Plural(canReturn, ['купюры', 'купюр','купюр'])}}
    
    if $PRICE
      #subtitle: Осталось внести: {{$PRICE-amount}}
    
    #hbox
      button: Назад
        .click: () ->
          screen.prev()
      button next: Далее
        .click: () ->
          screen.next()
      button cancel: Вернуть средства
        .click: () ->
          money.cashBack()
```

## Создание собственных компонентов

### Шаблон компонента
```javascript
MyCustomComponent:
  // Документация компонента
  description: "Описание компонента"
  author: "Автор"
  version: "1.0.0"
  
  // Входные параметры
  props:
    title: string
    data: array
    config: object
  
  // Состояние
  state:
    isLoading: false
    selectedItem: null
  
  // События
  events:
    onSelect: (item) -> void
    onLoad: () -> void
  
  // Методы
  methods:
    loadData: () ->
      this.setState({isLoading: true})
      // Логика загрузки
      this.setState({isLoading: false})
  
  // UI структура
  render:
    container
      title: {{title}}
      if isLoading
        spinner
      else
        list
          for item in data
            listItem
              text: {{item.name}}
              .click: () ->
                this.setState({selectedItem: item})
                this.emit('onSelect', item)
```

### Публикация компонента

1. Создать компонент в IDE
2. Добавить документацию
3. Протестировать в Sandbox
4. Опубликовать в Component Library

## Лучшие практики

### 1. Именование
- Используйте PascalCase для названий компонентов
- Описательные имена для свойств
- Консистентное именование событий

### 2. Документация
- Обязательно документируйте все компоненты
- Указывайте примеры использования
- Описывайте все свойства и события

### 3. Переиспользование
- Создавайте универсальные компоненты
- Избегайте жесткой привязки к бизнес-логике
- Используйте композицию вместо наследования

### 4. Производительность
- Минимизируйте количество перерендеров
- Используйте мемоизацию для тяжелых вычислений
- Оптимизируйте размер компонентов

## Интеграция с внешними системами

### API компоненты
```javascript
ApiComponent:
  props:
    endpoint: string
    method: GET|POST|PUT|DELETE
  
  methods:
    fetch: () ->
      api.call(this.props.endpoint, this.props.method)
        .then(response => this.setState({data: response}))
        .catch(error => this.setState({error: error}))
```

### Database компоненты
```javascript
DbComponent:
  props:
    table: string
    query: string
  
  methods:
    query: () ->
      db.query(this.props.table, this.props.query)
        .then(result => this.setState({data: result}))
```

## Тестирование компонентов

### Автоматическое тестирование
```javascript
test MyCustomComponent:
  // Тест инициализации
  init:
    expect(component.state.isLoading).toBe(false)
  
  // Тест загрузки данных
  loadData:
    component.loadData()
    expect(component.state.isLoading).toBe(true)
    // Ждем завершения загрузки
    expect(component.state.data).toBeDefined()
  
  // Тест событий
  events:
    component.emit('onSelect', testItem)
    expect(mockHandler).toHaveBeenCalledWith(testItem)
```