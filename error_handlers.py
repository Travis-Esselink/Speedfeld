from flask import jsonify

from app import app

@app.errorhandler(404)
def handle_404(e):
    return jsonify({
        'status': 'error',
        'message': e.description
    }), 404

@app.errorhandler(403)
def handle_403(e):
    return jsonify({
        'status': 'error',
        'message': e.description
    }), 403
