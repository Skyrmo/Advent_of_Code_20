f = open("input", "r")
text = f.read().split('\n')

nums = []

answer = {
    3: 1,
    1: 0
}

for line in text:
    nums.append(int(line))

nums.sort()

nums = [0] + nums + [nums[len(nums)-1] + 3]

memo = {}


def calculate(i):
    if i in memo:
        return memo[i]

    # # print(i)
    if i == len(nums)-1:
        return 1

    total = 0

    if i + 1 < len(nums) and nums[i + 1] - nums[i] <= 3:
        total += calculate(i + 1)
    if i + 2 < len(nums) and nums[i + 2] - nums[i] <= 3:
        total += calculate(i + 2)
    if i + 3 < len(nums) and nums[i + 3] - nums[i] <= 3:
        total += calculate(i + 3)

    memo[i] = total
    return total


answer = calculate(0)

print(answer)
