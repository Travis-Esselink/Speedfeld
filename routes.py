from flask import Blueprint, jsonify, request, session, abort
from models import Quote, User
from sqlalchemy.sql.expression import func


routes_router = Blueprint(__name__, 'routes')

@routes_router.route('/api/quotes')
def show_quotes():
    quotes = Quote.query.filter(func.length(Quote.text) >= 100).order_by(func.random()).all()
    quote_dicts = [quote.to_dict() for quote in quotes]
    return jsonify(quote_dicts)

@routes_router.route('/<username>')
def user_profile(username):
    user = User.query.filter(User.username == username).first()
    if not user:
        abort(404, "User not found")
    user_dict = user.to_dict()
    return jsonify(user_dict)