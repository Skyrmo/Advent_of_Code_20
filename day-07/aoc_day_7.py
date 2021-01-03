import re
f = open("input", "r")
text = f.readlines()
graph = {}


# def parse_line(line):
#     parsed_line = {}
#     split_front = line.split('contain')[0].split(' ')
#     split_back = line.split('contain')[1].split(' ')

#     parsed_line['parent'] = f'{split_front[0]} {split_front[1]}'
#     parsed_line['children'] = []

#     for i, value in enumerate(split_back):
#         value = re.sub(r'[^\w\s]', '', value).strip()
#         if value == 'bag' or value == 'bags':
#             bag = {}
#             bag[f'{split_back[i-2]} {split_back[i-1]}'] = split_back[i-3]
#             parsed_line['children'].append(bag)

#     return parsed_line


# for line in text:
#     parent, children = parse_line(line).values()

#     if parent not in graph:
#         graph[parent] = []

#     for child in children:
#         child_name = [*child][0]
#         if child_name not in graph:
#             # print(child_name)
#             graph[child_name] = []
#         graph[child_name].append(parent)


# def process_graph(graph, node, visited=set()):
#     if node in visited:
#         return 0

#     visited.add(node)

#     count = 1

#     for parent in graph[node]:
#         count += process_graph(graph, parent, visited)

#     return count


# print(process_graph(graph, 'shiny gold')-1)
# 'faded white': ['posh purple', 'striped yellow', 'drab green', 'striped lavender']


def parse_line(line):
    parsed_line = {}
    split_front = line.split('contain')[0].split(' ')
    split_back = line.split('contain')[1].split(' ')

    parsed_line['parent'] = f'{split_front[0]} {split_front[1]}'
    parsed_line['children'] = {}

    for i, value in enumerate(split_back):
        value = re.sub(r'[^\w\s]', '', value).strip()
        if value == 'bag' or value == 'bags':
            name = f'{split_back[i-2]} {split_back[i-1]}'
            number = split_back[i-3]
            if name != 'no other':
                parsed_line['children'][name] = number
            else:
                parsed_line['children'] = {}
    # print(parsed_line)
    return parsed_line


for line in text:
    parent, children = parse_line(line).values()

    graph[parent] = children

# print(graph)


def process_graph(graph, node):

    count = 1

    for child in graph[node]:
        amount = int(graph[node][child])
        count += amount * process_graph(graph, child)
        # print(graph[node], amount)

    return count


print(process_graph(graph, 'shiny gold')-1)
