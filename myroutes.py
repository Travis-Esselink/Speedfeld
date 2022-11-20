from flask import Blueprint, jsonify, request, session, abort
from models import Quote
from sqlalchemy.sql.expression import func


myroutes_router = Blueprint(__name__, 'routes')

@myroutes_router.route('/')
def show_quotes():
    quotes = Quote.query.filter(func.length(Quote.text) >= 130).order_by(func.random()).limit(1).all()
    quote_dicts = [quote.to_dict() for quote in quotes]
    return jsonify(quote_dicts)