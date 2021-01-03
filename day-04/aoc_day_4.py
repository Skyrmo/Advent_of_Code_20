f = open("input", "r")

text = f.read()
text = text.split('\n\n')

passports = []
count = 0


def check_passport(pp):
    byr = int(pp['byr'])
    iyr = int(pp['iyr'])
    eyr = int(pp['eyr'])
    hgt = [pp['hgt'][:-2], pp['hgt'][-2:]]
    hcl = pp['hcl']
    ecl = pp['ecl']
    pid = pp['pid']
    eyes = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']

    if byr < 1920 or byr > 2002:
        return False
    elif iyr < 2010 or iyr > 2020:
        return False
    elif eyr < 2020 or eyr > 2030:
        return False
    elif hgt[1] != "cm" and hgt[1] != 'in':
        return False
    elif hgt[1] == 'cm' and (int(hgt[0]) < 150 or int(hgt[0]) > 193):
        return False
    elif hgt[1] == 'in' and (int(hgt[0]) < 59 or int(hgt[0]) > 76):
        return False
    elif hcl[0] != "#" or len(hcl[1:]) != 6:
        return False
    elif ecl not in eyes:
        return False
    elif len(pid) != 9:
        return False
    else:
        return True


for person in text:
    person_dict = {}
    for item in [item for item in person.split()]:
        key = item.split(':')[0]
        value = item.split(':')[1]
        person_dict[key] = value

    passports.append(person_dict)

for passport in passports:
    if len(passport.keys()) == 8:
        if check_passport(passport):
            count += 1
    elif len(passport.keys()) == 7 and 'cid' not in passport.keys():
        if check_passport(passport):
            count += 1

print(count)
