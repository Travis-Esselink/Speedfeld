from flask import Blueprint, jsonify, request, session, abort
from models import Quote
from sqlalchemy.sql.expression import func


routes_router = Blueprint(__name__, 'routes')

@routes_router.route('/api/quotes')
def show_quotes():
    quotes = Quote.query.filter(func.length(Quote.text) >= 130).order_by(func.random()).all()
    quote_dicts = [quote.to_dict() for quote in quotes]
    return jsonify(quote_dicts)