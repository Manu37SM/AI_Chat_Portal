# AI Chat Portal

## Backend
1. `cd backend`
2. `python -m venv venv`
3. `source venv/bin/activate` (Linux/Mac) or `venv\Scripts\activate` (Windows)
4. `pip install -r requirements.txt`
5. Configure PostgreSQL database in `settings.py` and configure your OPENAPIKEY in `ai_module.py`
6. `python manage.py makemigrations && python manage.py migrate`
7. `python manage.py runserver`

## Frontend
1. `cd frontend`
2. `npm install`
3. `npm start`