import os
from flask import (Flask, render_template)
from flask_sqlalchemy import SQLAlchemy

app = Flask(
    __name__,
    static_folder='client/build/static',
    template_folder='client/build'
)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')

DATABASE_URL = os.environ.get('DATABASE_URL')



if DATABASE_URL.startswith('postgres://'):
    DATABASE_URL = DATABASE_URL.replace('postgres://', 'postgresql://', 1)

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL

db = SQLAlchemy(app)

from routes import routes_router
from auth import auth_router
app.register_blueprint(routes_router)
app.register_blueprint(auth_router)

import error_handlers

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react_app(path):
    return render_template('index.html')

# test