# Быстрый старт с UIF

## Обзор

Это руководство поможет вам быстро начать работу с Universal Interface Framework (UIF) и создать ваше первое приложение.

## Предварительные требования

### Системные требования
- **Операционная система**: Windows 10+, macOS 10.15+, Ubuntu 18.04+
- **Процессор**: Intel i5/AMD Ryzen 5 или выше
- **Память**: 8 GB RAM (рекомендуется 16 GB)
- **Дисковое пространство**: 2 GB свободного места

### Установленные программы
- **Node.js** 18+ ([скачать](https://nodejs.org/))
- **Git** ([скачать](https://git-scm.com/))
- **Docker** (опционально, для контейнеризации)

## Установка UIF

### 1. Клонирование репозитория
```bash
git clone https://github.com/your-org/uif.git
cd uif
```

### 2. Установка зависимостей
```bash
npm install
```

### 3. Запуск IDE
```bash
npm run dev
```

IDE будет доступна по адресу: http://localhost:3000

## Создание первого приложения

### Шаг 1: Создание нового проекта

1. Откройте UIF IDE в браузере
2. Нажмите "Создать новый проект"
3. Выберите шаблон "Пустой проект"
4. Введите название проекта: "Мое первое приложение"

### Шаг 2: Добавление компонентов

#### Добавление заголовка
1. Перетащите компонент `Title` из панели компонентов
2. В панели свойств измените текст на "Добро пожаловать в UIF"
3. Установите размер `h1`

#### Добавление формы
1. Перетащите компонент `Form` на экран
2. Добавьте поле ввода `Input` в форму
3. Настройте свойства:
   - Label: "Ваше имя"
   - Type: "text"
   - Placeholder: "Введите ваше имя"

#### Добавление кнопки
1. Перетащите компонент `Button` в форму
2. Установите текст: "Отправить"
3. Добавьте обработчик события:

```javascript
.click: () ->
  const name = nameInput.getValue()
  dialog.alert('Привет, ' + name + '!')
```

### Шаг 3: Связывание данных

1. Выберите поле ввода
2. В панели свойств найдите "Data Binding"
3. Создайте новую переменную `userName`
4. Свяжите поле ввода с этой переменной

### Шаг 4: Предварительный просмотр

1. Нажмите кнопку "Предварительный просмотр"
2. Протестируйте ваше приложение
3. Введите имя и нажмите "Отправить"

## Примеры проектов

### Проект 1: Калькулятор

```javascript
Calculator:
  #title: Простой калькулятор
  
  #display
    input result: Результат
      type: text
      readonly: true
      value: "0"
  
  #buttons
    #row1
      button btn7: 7
        .click: () -> appendNumber('7')
      button btn8: 8
        .click: () -> appendNumber('8')
      button btn9: 9
        .click: () -> appendNumber('9')
      button btnDivide: ÷
        .click: () -> setOperation('/')
    
    #row2
      button btn4: 4
        .click: () -> appendNumber('4')
      button btn5: 5
        .click: () -> appendNumber('5')
      button btn6: 6
        .click: () -> appendNumber('6')
      button btnMultiply: ×
        .click: () -> setOperation('*')
    
    #row3
      button btn1: 1
        .click: () -> appendNumber('1')
      button btn2: 2
        .click: () -> appendNumber('2')
      button btn3: 3
        .click: () -> appendNumber('3')
      button btnMinus: -
        .click: () -> setOperation('-')
    
    #row4
      button btn0: 0
        .click: () -> appendNumber('0')
      button btnDot: .
        .click: () -> appendNumber('.')
      button btnEquals: =
        .click: () -> calculate()
      button btnPlus: +
        .click: () -> setOperation('+')
    
    #row5
      button btnClear: C
        .click: () -> clear()
  
  methods:
    appendNumber: (num) ->
      const current = result.getValue()
      if current == '0' && num != '.'
        result.setValue(num)
      else
        result.setValue(current + num)
    
    setOperation: (op) ->
      store.set('operation', op)
      store.set('firstNumber', result.getValue())
      result.setValue('0')
    
    calculate: () ->
      const first = store.get('firstNumber')
      const second = result.getValue()
      const op = store.get('operation')
      
      let calculated
      switch op
        case '+'
          calculated = parseFloat(first) + parseFloat(second)
        case '-'
          calculated = parseFloat(first) - parseFloat(second)
        case '*'
          calculated = parseFloat(first) * parseFloat(second)
        case '/'
          calculated = parseFloat(first) / parseFloat(second)
      
      result.setValue(calculated.toString())
    
    clear: () ->
      result.setValue('0')
      store.set('operation', null)
      store.set('firstNumber', null)
```

### Проект 2: Список задач

```javascript
TodoList:
  #title: Список задач
  
  #addTask
    input newTask: Новая задача
      placeholder: "Введите задачу"
      .keydown: (event) ->
        if event.key == 'Enter'
          addTask()
    
    button addBtn: Добавить
      .click: () -> addTask()
  
  #taskList
    for task in tasks
      taskItem
        checkbox completed: {{task.completed}}
          .change: (checked) ->
            toggleTask(task.id, checked)
        
        text taskText: {{task.text}}
          className: task.completed ? "completed" : ""
        
        button deleteBtn: Удалить
          .click: () -> deleteTask(task.id)
  
  methods:
    addTask: () ->
      const text = newTask.getValue()
      if text.trim()
        const task = {
          id: Date.now(),
          text: text,
          completed: false
        }
        const currentTasks = store.get('tasks') || []
        store.set('tasks', [...currentTasks, task])
        newTask.setValue('')
    
    toggleTask: (id, completed) ->
      const tasks = store.get('tasks')
      const updatedTasks = tasks.map(task ->
        if task.id == id
          {...task, completed: completed}
        else
          task
      )
      store.set('tasks', updatedTasks)
    
    deleteTask: (id) ->
      const tasks = store.get('tasks')
      const filteredTasks = tasks.filter(task -> task.id != id)
      store.set('tasks', filteredTasks)
```

## Генерация кода

### Экспорт для Web
1. Нажмите "Экспорт" → "Web"
2. Выберите фреймворк (React/Vue.js)
3. Нажмите "Генерировать"
4. Скачайте архив с кодом

### Экспорт для Mobile
1. Нажмите "Экспорт" → "Mobile"
2. Выберите платформу (iOS/Android)
3. Выберите фреймворк (React Native/Flutter)
4. Нажмите "Генерировать"

### Экспорт для Desktop
1. Нажмите "Экспорт" → "Desktop"
2. Выберите платформу (Windows/macOS/Linux)
3. Выберите фреймворк (Electron/Tauri)
4. Нажмите "Генерировать"

## Тестирование

### Автоматическое тестирование
1. Нажмите "Тестирование" → "Записать тест"
2. Выполните действия в приложении
3. Нажмите "Остановить запись"
4. Просмотрите и отредактируйте тест
5. Запустите тест

### Ручное тестирование
1. Нажмите "Предварительный просмотр"
2. Протестируйте все функции приложения
3. Проверьте работу на разных размерах экрана
4. Убедитесь в корректности валидации

## Публикация компонентов

### Создание компонента
1. Выберите элементы на экране
2. Нажмите "Создать компонент"
3. Введите название и описание
4. Добавьте теги для поиска
5. Нажмите "Опубликовать"

### Использование компонентов
1. Откройте "Репозиторий компонентов"
2. Найдите нужный компонент
3. Нажмите "Добавить в проект"
4. Настройте свойства компонента

## Отладка

### Инструменты разработчика
1. Нажмите F12 для открытия DevTools
2. Перейдите на вкладку "UIF"
3. Просматривайте состояние приложения
4. Отслеживайте события и изменения

### Логирование
```javascript
// Добавьте логирование в методы
methods:
  myMethod: () ->
    console.log('Метод выполнен')
    logger.info('Пользовательское действие', {action: 'myMethod'})
```

## Следующие шаги

### Изучение документации
- [Архитектура](architecture.md)
- [Компоненты](components.md)
- [API Reference](api-reference.md)
- [Лучшие практики](best-practices.md)

### Примеры проектов
- [Примеры использования](examples.md)
- [Сценарии](scenarios.md)

### Сообщество
- [GitHub Issues](https://github.com/your-org/uif/issues)
- [Discord](https://discord.gg/uif)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/uif)

## Часто задаваемые вопросы

### Q: Как изменить тему приложения?
A: В настройках проекта выберите "Тема" и выберите нужную тему (светлая/темная).

### Q: Как добавить анимации?
A: Выберите компонент и в панели свойств найдите "Анимации". Выберите тип анимации и настройте параметры.

### Q: Как интегрировать с внешним API?
A: Используйте компонент `API` или функцию `query()` для отправки запросов к внешним сервисам.

### Q: Как оптимизировать производительность?
A: Используйте ленивую загрузку компонентов, мемоизацию и оптимизируйте размер бандла.

### Q: Как добавить многоязычность?
A: В настройках проекта включите "Интернационализация" и добавьте переводы для всех текстов.

## Поддержка

Если у вас возникли проблемы:

1. **Документация**: Изучите разделы документации
2. **Примеры**: Посмотрите готовые примеры проектов
3. **Сообщество**: Задайте вопрос в Discord или на Stack Overflow
4. **Issues**: Создайте issue на GitHub с подробным описанием проблемы

## Обновления

Следите за обновлениями UIF:

1. **GitHub Releases**: Подпишитесь на релизы
2. **Newsletter**: Подпишитесь на рассылку новостей
3. **Blog**: Читайте блог разработчиков
4. **Twitter**: Следите за официальным аккаунтом