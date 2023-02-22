import requests
from bs4 import BeautifulSoup
import json

headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36 Vivaldi/5.3.2679.70.'}

def getJobData(location, loc_url):
    jobs_obj = []

    for pagenum in range(0, 11):
        url = f'{loc_url}{pagenum*10}'

        response = requests.get(url, headers=headers)

        if response.status_code != 200:
            print(f'Bad response. Error {response.status_code}')

            break

        soup = BeautifulSoup(response.text, 'html.parser')

        jobs = soup.find_all("div", class_="job_seen_beacon")

        for job in jobs:
            job_obj = {}

            if job.find('span', class_='companyName'):
                job_obj['company_name'] = job.find('span', class_='companyName').text

            else:
                job_obj['company_name'] = ''

            if job.find('span', class_='ratingsDisplay'):
                job_obj['company_rating'] = job.find('span', class_='ratingsDisplay').text

            else:
                job_obj['company_rating'] = ''

            if job.find('div', class_='companyLocation'):
                job_obj['company_location'] = job.find('div', class_='companyLocation').text

            else: 
                job_obj['company_location'] = ''

            if job.find('span', class_='estimated-salary'):
                job_obj['estimated_salary'] = job.find('span', class_='estimated-salary').text

            else:
                job_obj['estimated_salary'] = ''

            if job.find('div', class_='job-snippet'):
                job_obj['job_snippet'] = job.find('div', class_='job-snippet').text.replace('\n', '')

            else:
                job_obj['job_snippet'] = ''

            if job.find('span', class_='date'):
                job_obj['date_posted'] = (job.find('span', class_='date').text)[13:]

            else:
                job_obj['date_posted'] = ''

            jobs_obj.append(job_obj)

    with open(f'./data/{location}.json', 'w', encoding='utf-8') as f:
        json.dump(jobs_obj, f)  

getJobData('us', 'http://www.indeed.com/jobs?q=cyber+security&start=')

getJobData('ny', 'http://www.indeed.com/jobs?q=cyber+security&rbl=New+York%2C+NY&jlid=45f6c4ded55c00bf&start=')

# job range within 25 miles
getJobData('min', 'http://www.indeed.com/jobs?q=cyber+security&l=Minneapolis%2C+MN&start=')

# job range within 25 miles
getJobData('mil', 'http://www.indeed.com/jobs?q=cyber+security&l=Milwaukee%2C+WI&start=')