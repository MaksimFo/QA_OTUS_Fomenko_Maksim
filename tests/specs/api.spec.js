describe('Создание пользователя', () => {
  test('Успешное создание пользователя', async () => {
    const response = await fetch('https://demoqa.com/Account/v1/User', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName: 'Maxim' + Date.now(),
        password: 'Maxim222!'
      })
    })
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data).toHaveProperty('userID')
    expect(data).toHaveProperty('username')
  })
  test('Создание пользователя (не валидный пароль)', async () => {
    const response = await fetch('https://demoqa.com/Account/v1/User', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName: 'Maxim' + Date.now(),
        password: '       '
      })
    })
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.code).toBe('1300')
    expect(data.message).toBe(
      "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer."
    )
  })
  test('Создание пользователя (логин уже используется)', async () => {
    const response = await fetch('https://demoqa.com/Account/v1/User', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName: 'Maxim',
        password: 'Maxim222!'
      })
    })
    const data = await response.json()

    expect(response.status).toBe(406)
    expect(data.code).toBe('1204')
    expect(data.message).toBe('User exists!')
  })
})
describe('Генерация токена', () => {
  test('Генерация токена (успех)', async () => {
    const response = await fetch('https://demoqa.com/Account/v1/GenerateToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName: 'Maxim',
        password: 'Maxim222!'
      })
    })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty('token')
    expect(data.status).toBe('Success')
    expect(data.result).toBe('User authorized successfully.')
  })
  test('Генерация токена (ошибка)', async () => {
    const response = await fetch('https://demoqa.com/Account/v1/GenerateToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName: 'Maxim',
        password: 'Maxim221!'
      })
    })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.token).toBe(null)
    expect(data.status).toBe('Failed')
    expect(data.result).toBe('User authorization failed.')
  })
})
