f = open("input", "r")
text = f.read().split('\n')


timestamp = int(text[0])
busses = text[1].split(',')

# bussesf = filter(lambda x: x != 'x', busses)
# busses = list(bussesf)


def filter_int(x):
    if x != 'x':
        return int(x)
    else:
        return 1


bussesf = map(filter_int, busses)
busses = list(bussesf)

print(busses)

time = 0
stepsize = busses[0]
for i, bus in enumerate(busses):
    if i > 0:
        while (time + i) % bus != 0:
            time += stepsize
        stepsize *= bus

print(time)
