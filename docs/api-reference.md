# API Reference UIF

## Обзор API

UIF предоставляет набор API для работы с компонентами, состоянием, навигацией и внешними системами.

## Core API

### Store API

Управление состоянием приложения.

#### store.set(key, value)
Устанавливает значение в хранилище.

```javascript
store.set('user', {name: 'John', age: 30})
store.set('settings.theme', 'dark')
```

#### store.get(key)
Получает значение из хранилища.

```javascript
const user = store.get('user')
const theme = store.get('settings.theme')
```

#### store.update(updates)
Обновляет несколько значений одновременно.

```javascript
store.update({
  user: {name: 'John', age: 30},
  settings: {theme: 'dark'}
})
```

#### store.watch(key, callback)
Подписывается на изменения значения.

```javascript
store.watch('user', (newValue, oldValue) => {
  console.log('User changed:', newValue)
})
```

#### store.unwatch(key, callback)
Отписывается от изменений значения.

```javascript
store.unwatch('user', callback)
```

### Screen API

Управление навигацией между экранами.

#### screen.next(screenName?, params?)
Переход к следующему экрану.

```javascript
screen.next() // Следующий экран в сценарии
screen.next('PaymentScreen') // Конкретный экран
screen.next({amount: 100}) // С параметрами
```

#### screen.back()
Возврат к предыдущему экрану.

```javascript
screen.back()
```

#### screen.prev()
Переход к предыдущему экрану.

```javascript
screen.prev()
```

#### screen.goto(screenName, params?)
Переход к конкретному экрану.

```javascript
screen.goto('HomeScreen')
screen.goto('PaymentScreen', {amount: 100})
```

### Component API

Работа с компонентами.

#### component.setState(updates)
Обновляет состояние компонента.

```javascript
component.setState({
  isLoading: true,
  data: newData
})
```

#### component.getState()
Получает текущее состояние компонента.

```javascript
const state = component.getState()
```

#### component.emit(eventName, data?)
Эмитит событие.

```javascript
component.emit('onSelect', selectedItem)
```

#### component.on(eventName, handler)
Подписывается на событие компонента.

```javascript
component.on('onSelect', (item) => {
  console.log('Selected:', item)
})
```

#### component.off(eventName, handler)
Отписывается от события компонента.

```javascript
component.off('onSelect', handler)
```

### Form API

Работа с формами.

#### form.serialize()
Сериализует данные формы.

```javascript
const data = form.serialize()
// {name: 'John', email: 'john@example.com'}
```

#### form.validate()
Валидирует форму.

```javascript
const isValid = form.validate()
```

#### form.reset()
Сбрасывает форму.

```javascript
form.reset()
```

#### form.setValues(values)
Устанавливает значения полей формы.

```javascript
form.setValues({
  name: 'John',
  email: 'john@example.com'
})
```

## Input API

### input.setValue(value)
Устанавливает значение поля ввода.

```javascript
input.setValue('new value')
```

### input.getValue()
Получает значение поля ввода.

```javascript
const value = input.getValue()
```

### input.validate()
Валидирует поле ввода.

```javascript
const isValid = input.validate()
```

### input.focus()
Устанавливает фокус на поле ввода.

```javascript
input.focus()
```

### input.blur()
Убирает фокус с поля ввода.

```javascript
input.blur()
```

## Button API

### button.setEnabled(enabled)
Включает/выключает кнопку.

```javascript
button.setEnabled(true)
button.setEnabled(false)
```

### button.setVisible(visible)
Показывает/скрывает кнопку.

```javascript
button.setVisible(true)
button.setVisible(false)
```

### button.setText(text)
Устанавливает текст кнопки.

```javascript
button.setText('New Text')
```

## Dialog API

### dialog.alert(message, title?)
Показывает диалог с сообщением.

```javascript
dialog.alert('Operation completed successfully')
dialog.alert('Error occurred', 'Error')
```

### dialog.confirm(message, title?)
Показывает диалог подтверждения.

```javascript
dialog.confirm('Are you sure?', 'Confirm').then((result) => {
  if (result) {
    // Пользователь подтвердил
  }
})
```

### dialog.prompt(message, defaultValue?, title?)
Показывает диалог ввода.

```javascript
dialog.prompt('Enter your name:', 'John').then((value) => {
  console.log('Entered:', value)
})
```

### dialog.error(message)
Показывает диалог ошибки.

```javascript
dialog.error('Something went wrong')
```

### dialog.warning(message)
Показывает диалог предупреждения.

```javascript
dialog.warning('Please check your input')
```

### dialog.info(message)
Показывает информационный диалог.

```javascript
dialog.info('Operation completed')
```

## Query API

### query(endpoint, data?, callback?)
Выполняет запрос к внешней системе.

```javascript
// Простой запрос
query('getUserInfo', {id: 123}, (data) => {
  console.log('User data:', data)
})

// Запрос с обработкой ошибок
query('getUserInfo', {id: 123}, (data, error) => {
  if (error) {
    dialog.error('Failed to get user info')
  } else {
    store.set('user', data)
  }
})
```

### query.get(endpoint, params?, callback?)
Выполняет GET запрос.

```javascript
query.get('users', {page: 1, limit: 10}, (data) => {
  console.log('Users:', data)
})
```

### query.post(endpoint, data?, callback?)
Выполняет POST запрос.

```javascript
query.post('users', {name: 'John', email: 'john@example.com'}, (data) => {
  console.log('Created user:', data)
})
```

### query.put(endpoint, data?, callback?)
Выполняет PUT запрос.

```javascript
query.put('users/123', {name: 'John Updated'}, (data) => {
  console.log('Updated user:', data)
})
```

### query.delete(endpoint, callback?)
Выполняет DELETE запрос.

```javascript
query.delete('users/123', (data) => {
  console.log('Deleted user:', data)
})
```

## Database API

### db.get(key)
Получает значение из базы данных.

```javascript
const operator = db.get('def').get(phoneNumber).operator
```

### db.set(key, value)
Устанавливает значение в базу данных.

```javascript
db.set('user:123', {name: 'John', email: 'john@example.com'})
```

### db.query(table, query)
Выполняет запрос к базе данных.

```javascript
const users = db.query('users', 'SELECT * FROM users WHERE active = true')
```

## Date API

### date.get(property)
Получает свойство даты.

```javascript
const year = date.get('year')
const month = date.get('month')
const day = date.get('day')
```

### date.format(format)
Форматирует дату.

```javascript
const formatted = date.format('YYYY-MM-DD')
```

### date.add(amount, unit)
Добавляет к дате.

```javascript
const future = date.add(1, 'year')
const past = date.add(-6, 'month')
```

## Utility API

### Plural(count, forms)
Возвращает правильную форму множественного числа.

```javascript
const text = Plural(count, ['купюра', 'купюры', 'купюр'])
```

### alfabet(item)
Сортирует элементы по алфавиту.

```javascript
const sorted = items.sort(alfabet)
```

## Event Handlers

### .click
Обработчик клика.

```javascript
button
  .click: () ->
    console.log('Button clicked')
```

### .change
Обработчик изменения значения.

```javascript
input
  .change: (value) ->
    console.log('Value changed:', value)
```

### .valid
Обработчик валидации.

```javascript
input
  .valid: (status) ->
    next.setEnabled(status)
```

### .init
Обработчик инициализации.

```javascript
component
  .init: () ->
    console.log('Component initialized')
```

## Error Handling

### try-catch
Обработка ошибок.

```javascript
try
  query('riskyOperation')
catch error
  dialog.error('Operation failed: ' + error.message)
```

### Error types
```javascript
// ValidationError
throw new ValidationError('Invalid input')

// NetworkError
throw new NetworkError('Connection failed')

// BusinessError
throw new BusinessError('Business rule violated')
```

## Best Practices

### 1. State Management
- Используйте store для глобального состояния
- Используйте component.setState для локального состояния
- Избегайте прямого изменения состояния

### 2. Event Handling
- Используйте именованные функции для обработчиков
- Отписывайтесь от событий при уничтожении компонента
- Обрабатывайте все возможные ошибки

### 3. API Calls
- Всегда обрабатывайте ошибки в query
- Используйте callback для асинхронных операций
- Кэшируйте результаты запросов

### 4. Validation
- Валидируйте данные на клиенте и сервере
- Предоставляйте понятные сообщения об ошибках
- Используйте .valid для динамической валидации