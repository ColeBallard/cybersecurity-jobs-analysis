#!/usr/bin/env python
# coding: utf-8

# In[1]:


import requests
from bs4 import BeautifulSoup

#setup the soup
url = 'http://www.indeed.com/jobs?q=cyber%20security&from=searchOnHP&redirected=1'
headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36 Vivaldi/5.3.2679.70.'}

response = requests.get(url, headers=headers)

print(response.status_code)

rawhtml = response.text

#parse the HTML
soup = BeautifulSoup(rawhtml, 'html.parser')


# In[3]:


jobs = []


# In[17]:


ResultsList = soup.find_all('ul', attrs = {'class':'jobsearch-ResultsList css-0'})
for text in ResultsList:
    salary = ResultsList.find('svg')
    print(salary)
    
    jobs = jobs(salary)
# for job_element in job_elements:
#     salary = job_element.find('span')
#     name = span.text
#     print(name)

#     jobs = jobs(name)
#     print(jobs)


# In[18]:


jobs


# In[ ]:




