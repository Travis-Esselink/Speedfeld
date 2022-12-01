from flask import Blueprint, jsonify, request, session, abort
from app import db
from auth import login_required
from models import Quote, User, Tests
from sqlalchemy.sql.expression import func


routes_router = Blueprint(__name__, 'routes')

@routes_router.route('/api/quotes')
def show_quotes():
    quotes = Quote.query.filter(func.length(Quote.text) >= 100).order_by(func.random()).all()
    quote_dicts = [quote.to_dict() for quote in quotes]
    return jsonify(quote_dicts)

# @routes_router.route('/<username>')
# def user_profile(username):
#     user = User.query.filter(User.username == username).first()
#     if not user:
#         abort(404, "User not found")
#     user_dict = user.to_dict()
#     return jsonify(user_dict)

@routes_router.route('/api/updatetests', methods=["POST"])
def tests():
    test_data = request.get_json()
    test = Tests(
        user_id=test_data["user_id"], 
        user_name=test_data["user_name"], 
        WPM=test_data["WPM"]
    )
    db.session.add(test)
    db.session.commit()

    return jsonify({
        'status': 'success',
        'message': 'tests updated'
    })



@routes_router.route('/api/usertests')
def show_tests():
    current_user = session.get('current_user', None)
    user_tests = Tests.query.filter(Tests.user_id == current_user["id"]).order_by(Tests.WPM.desc())
    test_dicts = [test.to_dict() for test in user_tests]
    print(test_dicts)


    return jsonify(test_dicts)




