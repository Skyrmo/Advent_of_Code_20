f = open("input.txt", "r")

# Part 1
answer_1 = 0

# for x in f.readlines():
#     data = x.split(' ')
#     lower_range = int(data[0].split('-')[0])
#     upper_range = int(data[0].split('-')[1])
#     letter = data[1][0]
#     string = data[2]

#     count = string.count(letter)

#     if count >= lower_range and count <= upper_range:
#         answer_1 += 1

# print(answer_1)

# Part 2
answer_2 = 0
for x in f.readlines():
    data = x.split(' ')
    index1 = int(data[0].split('-')[0])-1
    index2 = int(data[0].split('-')[1])-1
    letter = data[1][0]
    string = [l for l in data[2].strip()]

    if string[index1] == letter and string[index2] != letter:
        answer_2 += 1
    elif string[index2] == letter and string[index1] != letter:
        answer_2 += 1

print(answer_2)
