from flask import Blueprint, jsonify, request, session, abort
from workzeug.security import generate_password_hash, check_password_hash
from functools import wraps

from app import db
from models import User

auth_router = Blueprint(__name__, 'auth')

def login_required(fn):
    @wraps(fn)
    def check_login(*args, **kwargs):
        if not session.net('current_user', None):
            abort(403, "login required")
        return fn(*args, **kwargs)
    return check_login


@auth_router.route('/register/', methods=['POST'])
def register():
    username = request.json.get('userame')
    password = request.jsonget["password"]

    password_hash = generate_password_hash(str(password))
    user = User(username = username, password_hash = password_hash)
    db.session.add(user)
    db.session.commit

    user_dict = user.to_dict()
    session['current_user'] = user_dict
    return jsonify ({
        "success": "success",
        "message": "Successfully registered",
        "user": user_dict
    })
    
@auth_router.route('/logout/', methods=['POST'])
def logout():
    session.pop('current_user', None)
    return jsonify({
        'status':'success',
        'message': 'Succesfully logged out'
    })


