f = open("input", "r")
text = f.readlines()


def create_data(text):
    data = {}
    for i in range(len(text)):
        data[i] = {
            'value': int(text[i].strip()),
            'prev_25': []
        }
        for j in range(1, 26):
            data[i]['prev_25'].append(int(text[i - j].strip()))
    return data


def check_number(line_data):
    val = line_data['value']
    p_25 = line_data['prev_25']
    for i in range(len(p_25)):
        for j in range(len(p_25)):
            if i != j:
                if p_25[i] + p_25[j] == val:
                    return (p_25[i], p_25[j])
    return False


def check_all_nums(data):
    for i in range(26, len(text)):
        if check_number(data[i]) == False:
            return data[i]['value']


data = create_data(text)
value = check_all_nums(data)


def find_contiuous(data):
    for num_to_check in range(2, len(data)):
        for i in range(num_to_check, len(data)):
            nums = []
            for l in range(num_to_check):
                nums.append(data[i-l]['value'])
            if sum(nums) == value:
                return nums


sorted = find_contiuous(data)

sorted.sort()

print(sorted[0] + sorted[-1])
