from flask import Blueprint, render_template, request, jsonify
from .algorithms import genetic_algorithm

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/solve', methods=['POST'])
def solve():
    data = request.json
    max_weight = data.get('maxWeight')
    items = data.get('items')
    solution = genetic_algorithm(items, max_weight)
    return jsonify(solution)
