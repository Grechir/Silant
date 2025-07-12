// отправляет логин и пароль, получает токены и сохраняет их
export async function loginUser(credentials) {
    const response = await fetch('http://127.0.0.1:8000/api/token/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Ошибка авторизации');
    }

    const data = await response.json();
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);

    return data;
}


// функция для обновления токена
export async function refreshAccessToken() {
    const refreshToken = localStorage.getItem('refresh_token');

    if (!refreshToken) {
      throw new Error('Отсутствует refresh токен')
    }

    const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({refresh: refreshToken}),
    })

    if (!response.ok) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      throw new Error('Не удалось обновить токен, попробуйте войти снова');
    }

    const data = await response.json();
    localStorage.setItem('access_token', data.access);
    return data.access
}


// универсальная функция для запросов с автоматической подстановкой access-токена
export async function fetchWithToken(url, options = {}) {
    let token = localStorage.getItem('access_token');
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };

    // если токен есть, но он просрочен, то обновляем его
    if (token && isTokenExpired(token)) {
        try {
          token = await refreshAccessToken();
          localStorage.setItem('access_token', token);
        } catch (error) {
          throw error;
        }
      }

    // если есть токен, то вставляем его в заголовок
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    let response = await fetch(url, { ...options, headers });

    // проверка авторизации
    if (response.status === 401) {
      try {
        token = await refreshAccessToken();
        headers['Authorization'] = `Bearer ${token}`;
        response = await fetch(url, { ...options, headers });
      } catch (error) {
        throw (error);
      }
    }

    // токен есть, но нет прав доступа
    if (response.status === 403) {
        console.error('У вас недостаточно прав')
      }

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail || 'Ошибка запроса');
    }

    return response.json();
}

// функция проверки токена на истечение
function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    // exp — это UNIX-время в секундах
    return payload.exp * 1000 < Date.now();
  } catch (e) {
    // невалидный токен
    return true;
  }
}