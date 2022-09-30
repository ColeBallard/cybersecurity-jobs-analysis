import json

def detRemote(location):
    # 0 = not remote, 1 = remote, 2 = hybrid, 3 = temporarily remote

    if 'HYBRID' in location.upper():
        return 2

    elif 'TEMPORARILY REMOTE' in location.upper():
        return 3

    elif 'REMOTE' in location.upper():
        return 1

    else:
        return 0

def detCity(location):
    if ' in ' in location:
        return location[(location.find(' in ') + 4):(location.find(',', (location.find(' in ') + 4)))]

    elif ',' in location:
        return location[:(location.find(','))]

    else:
        return ''

def detState(location):
    if ',' in location:
        return location[(location.find(',') + 2):(location.find(',') + 4)]

    else: 
        return ''

def detLowSalary(salary):
    if 'ESTIMATED' in salary.upper():
        return salary[11:(salary.find('K - '))]

    else:
        return ''

def detHighSalary(salary):
    if 'ESTIMATED' in salary.upper():
        return salary[(salary.find('K - $') + 5):(salary.find('K a year'))]
    
    else:
        return ''

def detDatePosted(date_posted):
    if 'e ' in date_posted:
        return date_posted[2:(date_posted.find(' day'))]
    
    elif 'day' in date_posted:
        return date_posted[:(date_posted.find(' day'))]

    else:
        return ''

def cleanData(file):
    with open(f'../data/{file}.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    job_data = []

    for job in data:
        job_obj = {}

        job_obj['company_name'] = job['company_name']

        job_obj['company_rating'] = job['company_rating']

        job_obj['remote'] = detRemote(job['company_location'])

        job_obj['city'] = detCity(job['company_location'])

        job_obj['state'] = detState(job['company_location'])

        job_obj['low_salary'] = detLowSalary(job['estimated_salary'])

        job_obj['high_salary'] = detHighSalary(job['estimated_salary'])

        job_obj['post_age_days'] = detDatePosted(job['date_posted'])

        job_data.append(job_obj)

    with open(f'../data/{file}_new.json', 'w', encoding='utf-8') as f:
        json.dump(job_data, f)  

cleanData('us')
cleanData('ny')
cleanData('mp')
cleanData('mw')