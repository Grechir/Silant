# 🚜 Silant Project

Проект состоит из двух частей:  
- **Backend** (Django) — в папке `silant/project`
- **Frontend** (React) — в папке `silant/project_frontend`

---

## 📦 Установка

1. **Клонируем репозиторий:**
   ```bash
   git clone https://github.com/Grechir/Silant.git
   ```
2. **Открываем backend сервер**
   ```
   cd silant/project
   pip install -r requirements.txt
   python manage.py runserver
   ```
3. **Открываем frontend сервер**
   ```
   cd ../project_frontend
   npm i
   npm run start
   ```
   
Теперь бэкенд доступен по адресу
http://localhost:8000
а фронтенд — по адресу
http://localhost:3000

---

## 👥 Пользователи

Все пользователи уже созданы и доступны в админ-панели:  
**http://localhost:8000/admin**

- Их логины — это **имена пользователей**, указанные в списке пользователей.
- Пароль у всех одинаковый: `testpass123`

👉 Чтобы войти под любым пользователем, просто скопируйте его имя из админки и используйте как логин (за исключением пользователя manager).

### 👤 Manager

- **Логин:** manager 
- **Пароль:** manager

👉 имеет полный доступ к просмотру и изменению всех объектов
  
