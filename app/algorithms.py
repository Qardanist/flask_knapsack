import random

def genetic_algorithm(items, max_weight):
    # تهيئة السكان
    population_size = 100
    generations = 50
    population = [random.choices([0, 1], k=len(items)) for _ in range(population_size)]

    def fitness(individual):
        total_weight = sum(item['weight'] * selected for item, selected in zip(items, individual))
        total_value = sum(item['value'] * selected for item, selected in zip(items, individual))
        if total_weight > max_weight:
            return 0  # تجاوز الوزن الأقصى
        return total_value

    for _ in range(generations):
        population = sorted(population, key=fitness, reverse=True)[:population_size // 2]
        offspring = []
        for _ in range(len(population) // 2):
            parent1, parent2 = random.sample(population, 2)
            crossover_point = random.randint(0, len(items) - 1)
            child1 = parent1[:crossover_point] + parent2[crossover_point:]
            child2 = parent2[:crossover_point] + parent1[crossover_point:]
            offspring.append(child1)
            offspring.append(child2)
        population.extend(offspring)
        # تطبيق الطفرة
        for individual in population:
            if random.random() < 0.1:
                mutation_point = random.randint(0, len(items) - 1)
                individual[mutation_point] = 1 - individual[mutation_point]

    best_solution = max(population, key=fitness)
    selected_items = [items[i]['name'] for i, selected in enumerate(best_solution) if selected]
    total_value = fitness(best_solution)
    return {"items": selected_items, "value": total_value}
