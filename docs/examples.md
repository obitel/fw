# Примеры использования UIF

## Простые примеры

### 1. Форма регистрации

```javascript
RegistrationForm:
  #title: Регистрация пользователя
  
  form userForm
    input name: Имя
      type: text
      keyboard: cyrilic
      validate: this.value.length > 0
      .valid: (status) ->
        submit.setEnabled(status && email.valid && password.valid)
    
    input email: Email
      type: email
      keyboard: english
      validate: this.value.includes('@')
      .valid: (status) ->
        submit.setEnabled(status && name.valid && password.valid)
    
    input password: Пароль
      type: password
      keyboard: english
      validate: this.value.length >= 6
      .valid: (status) ->
        submit.setEnabled(status && name.valid && email.valid)
  
  center
    button submit: Зарегистрироваться
      enabled: false
      .click: () ->
        const userData = userForm.serialize()
        query('register', userData, (response, error) -> {
          if (error) {
            dialog.error('Ошибка регистрации: ' + error.message)
          } else {
            store.set('user', response.user)
            screen.next('WelcomeScreen')
          }
        })
    
    button: Отмена
      .click: () ->
        screen.back()
```

### 2. Список с поиском

```javascript
UserList:
  #title: Список пользователей
  
  input search: Поиск
    type: text
    placeholder: Введите имя пользователя
    .change: (value) ->
      filterUsers(value)
  
  list userList
    for user in filteredUsers
      listItem
        title: {{user.name}}
        subtitle: {{user.email}}
        .click: () ->
          store.set('selectedUser', user)
          screen.next('UserDetails')
  
  center
    button addUser: Добавить пользователя
      .click: () ->
        screen.next('AddUser')
    
    button: Назад
      .click: () ->
        screen.back()
  
  .init: () ->
    loadUsers()
  
  methods:
    loadUsers: () ->
      query('getUsers', {}, (users) -> {
        store.set('allUsers', users)
        store.set('filteredUsers', users)
      })
    
    filterUsers: (searchTerm) ->
      const allUsers = store.get('allUsers')
      const filtered = allUsers.filter(user -> 
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      store.set('filteredUsers', filtered)
```

### 3. Календарь событий

```javascript
EventCalendar:
  #title: Календарь событий
  
  calendar eventCalendar
    .dateSelect: (date) ->
      loadEventsForDate(date)
    .eventClick: (event) ->
      store.set('selectedEvent', event)
      screen.next('EventDetails')
  
  list eventList
    for event in events
      listItem
        title: {{event.title}}
        subtitle: {{event.time}} - {{event.location}}
        .click: () ->
          store.set('selectedEvent', event)
          screen.next('EventDetails')
  
  center
    button addEvent: Добавить событие
      .click: () ->
        screen.next('AddEvent')
    
    button: Назад
      .click: () ->
        screen.back()
  
  .init: () ->
    const today = date.get('today')
    loadEventsForDate(today)
  
  methods:
    loadEventsForDate: (date) ->
      query('getEvents', {date: date}, (events) -> {
        store.set('events', events)
        eventCalendar.setEvents(events)
      })
```

## Сложные примеры

### 1. Онлайн-магазин

```javascript
OnlineStore:
  scenario
    StoreHome
    if action == 'browse'
      ProductCatalog
      ProductDetails
      AddToCart
    else if action == 'search'
      SearchResults
      ProductDetails
      AddToCart
    else if action == 'cart'
      ShoppingCart
      Checkout
      Payment
      OrderConfirmation

StoreHome:
  #title: Добро пожаловать в наш магазин
  
  #searchBar
    placeholder: Поиск товаров
    .search: (query) ->
      screen.next('SearchResults', {query: query})
  
  #categoryGrid
    for category in categories
      categoryCard
        title: {{category.name}}
        image: {{category.image}}
        .click: () ->
          screen.next('ProductCatalog', {category: category.id})
  
  #featuredProducts
    title: Популярные товары
    for product in featuredProducts
      productCard
        title: {{product.name}}
        price: {{product.price}}
        image: {{product.image}}
        .click: () ->
          screen.next('ProductDetails', {product: product.id})

ProductCatalog:
  #title: {{category.name}}
  
  #filterPanel
    input priceMin: Цена от
      type: number
      .change: (value) ->
        applyFilters()
    
    input priceMax: Цена до
      type: number
      .change: (value) ->
        applyFilters()
    
    checkbox inStock: Только в наличии
      .change: (value) ->
        applyFilters()
  
  #productGrid
    for product in filteredProducts
      productCard
        title: {{product.name}}
        price: {{product.price}}
        image: {{product.image}}
        inStock: {{product.inStock}}
        .click: () ->
          screen.next('ProductDetails', {product: product.id})
  
  methods:
    applyFilters: () ->
      const filters = {
        category: store.get('category'),
        priceMin: priceMin.value,
        priceMax: priceMax.value,
        inStock: inStock.value
      }
      query('getProducts', filters, (products) -> {
        store.set('filteredProducts', products)
      })
```

### 2. Система управления задачами

```javascript
TaskManager:
  scenario
    TaskDashboard
    if action == 'create'
      CreateTask
    else if action == 'edit'
      EditTask
    else if action == 'view'
      TaskDetails
    else if action == 'complete'
      CompleteTask

TaskDashboard:
  #title: Управление задачами
  
  #statsPanel
    statCard
      title: Всего задач
      value: {{totalTasks}}
    statCard
      title: В работе
      value: {{inProgressTasks}}
    statCard
      title: Завершено
      value: {{completedTasks}}
  
  #filterTabs
    tab all: Все
      .click: () ->
        filterTasks('all')
    tab inProgress: В работе
      .click: () ->
        filterTasks('inProgress')
    tab completed: Завершено
      .click: () ->
        filterTasks('completed')
  
  #taskList
    for task in filteredTasks
      taskCard
        title: {{task.title}}
        priority: {{task.priority}}
        status: {{task.status}}
        assignee: {{task.assignee}}
        dueDate: {{task.dueDate}}
        .click: () ->
          store.set('selectedTask', task)
          screen.next('TaskDetails')
  
  center
    button createTask: Создать задачу
      .click: () ->
        screen.next('CreateTask')
  
  methods:
    filterTasks: (status) ->
      const allTasks = store.get('allTasks')
      let filtered
      if status == 'all'
        filtered = allTasks
      else
        filtered = allTasks.filter(task -> task.status == status)
      store.set('filteredTasks', filtered)
```

### 3. Система аналитики

```javascript
AnalyticsDashboard:
  #title: Аналитика
  
  #dateRange
    input startDate: Дата начала
      type: date
      .change: (value) ->
        updateCharts()
    
    input endDate: Дата окончания
      type: date
      .change: (value) ->
        updateCharts()
  
  #metricsGrid
    metricCard
      title: Общий доход
      value: {{totalRevenue}}
      trend: {{revenueTrend}}
    
    metricCard
      title: Количество заказов
      value: {{totalOrders}}
      trend: {{ordersTrend}}
    
    metricCard
      title: Средний чек
      value: {{averageOrder}}
      trend: {{averageTrend}}
  
  #charts
    chart revenueChart
      type: line
      data: {{revenueData}}
      title: Динамика доходов
    
    chart ordersChart
      type: bar
      data: {{ordersData}}
      title: Количество заказов
    
    chart categoryChart
      type: pie
      data: {{categoryData}}
      title: Распределение по категориям
  
  methods:
    updateCharts: () ->
      const params = {
        startDate: startDate.value,
        endDate: endDate.value
      }
      query('getAnalytics', params, (data) -> {
        store.set('totalRevenue', data.revenue)
        store.set('totalOrders', data.orders)
        store.set('averageOrder', data.average)
        store.set('revenueData', data.revenueChart)
        store.set('ordersData', data.ordersChart)
        store.set('categoryData', data.categoryChart)
      })
```

## Интеграционные примеры

### 1. Интеграция с платежной системой

```javascript
PaymentIntegration:
  #title: Оплата
  
  #paymentMethods
    radioGroup paymentMethod
      option card: Банковская карта
      option wallet: Электронный кошелек
      option cash: Наличные
      .change: (value) ->
        showPaymentForm(value)
  
  #cardForm
    hidden: true
    input cardNumber: Номер карты
      type: card
      .valid: (status) ->
        validateCardForm()
    
    input expiryDate: Срок действия
      type: date
      format: MM/YY
      .valid: (status) ->
        validateCardForm()
    
    input cvv: CVV
      type: password
      maxLength: 3
      .valid: (status) ->
        validateCardForm()
  
  #walletForm
    hidden: true
    input walletNumber: Номер кошелька
      type: text
      .valid: (status) ->
        validateWalletForm()
  
  center
    button pay: Оплатить {{amount}}
      enabled: false
      .click: () ->
        processPayment()
    
    button: Отмена
      .click: () ->
        screen.back()
  
  methods:
    showPaymentForm: (method) ->
      if method == 'card'
        cardForm.setVisible(true)
        walletForm.setVisible(false)
      else if method == 'wallet'
        cardForm.setVisible(false)
        walletForm.setVisible(true)
      else
        cardForm.setVisible(false)
        walletForm.setVisible(false)
        pay.setEnabled(true)
    
    validateCardForm: () ->
      const isValid = cardNumber.valid && expiryDate.valid && cvv.valid
      pay.setEnabled(isValid)
    
    validateWalletForm: () ->
      const isValid = walletNumber.valid
      pay.setEnabled(isValid)
    
    processPayment: () ->
      const paymentData = {
        method: paymentMethod.value,
        amount: store.get('amount'),
        cardNumber: cardNumber.value,
        expiryDate: expiryDate.value,
        cvv: cvv.value,
        walletNumber: walletNumber.value
      }
      
      query('processPayment', paymentData, (response, error) -> {
        if (error) {
          dialog.error('Ошибка оплаты: ' + error.message)
        } else {
          store.set('paymentResult', response)
          screen.next('PaymentSuccess')
        }
      })
```

### 2. Интеграция с социальными сетями

```javascript
SocialIntegration:
  #title: Войти через социальную сеть
  
  #socialButtons
    button facebook: Войти через Facebook
      .click: () ->
        loginWithSocial('facebook')
    
    button google: Войти через Google
      .click: () ->
        loginWithSocial('google')
    
    button vk: Войти через VK
      .click: () ->
        loginWithSocial('vk')
  
  #divider
    text: или
  
  #emailForm
    input email: Email
      type: email
      .valid: (status) ->
        validateEmailForm()
    
    input password: Пароль
      type: password
      .valid: (status) ->
        validateEmailForm()
  
  center
    button login: Войти
      enabled: false
      .click: () ->
        loginWithEmail()
    
    button register: Зарегистрироваться
      .click: () ->
        screen.next('Registration')
  
  methods:
    loginWithSocial: (provider) ->
      query('socialAuth', {provider: provider}, (response, error) -> {
        if (error) {
          dialog.error('Ошибка авторизации: ' + error.message)
        } else {
          store.set('user', response.user)
          store.set('token', response.token)
          screen.next('Dashboard')
        }
      })
    
    validateEmailForm: () ->
      const isValid = email.valid && password.valid
      login.setEnabled(isValid)
    
    loginWithEmail: () ->
      const loginData = {
        email: email.value,
        password: password.value
      }
      
      query('emailAuth', loginData, (response, error) -> {
        if (error) {
          dialog.error('Ошибка входа: ' + error.message)
        } else {
          store.set('user', response.user)
          store.set('token', response.token)
          screen.next('Dashboard')
        }
      })
```

## Лучшие практики в примерах

### 1. Обработка ошибок
```javascript
// Всегда обрабатывайте ошибки
query('apiCall', data, (response, error) -> {
  if (error) {
    dialog.error('Произошла ошибка: ' + error.message)
    return
  }
  // Обработка успешного ответа
})
```

### 2. Валидация данных
```javascript
// Валидируйте данные на клиенте
input field
  validate: this.value.length > 0
  .valid: (status) ->
    submit.setEnabled(status)
```

### 3. Управление состоянием
```javascript
// Используйте store для глобального состояния
store.set('user', userData)
const user = store.get('user')
```

### 4. Компонентная архитектура
```javascript
// Разбивайте сложные экраны на компоненты
MyScreen:
  #header
    title: {{title}}
    subtitle: {{subtitle}}
  
  #content
    #mainContent
      // Основной контент
  
  #footer
    button: Действие
```