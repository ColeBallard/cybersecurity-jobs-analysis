#batch scraping approach
import requests
import json

api_url = 'https://www.page2api.com/api/v1/scrape'
# The following example will show how to scrape 5 pages of job postings from Indeed.com

payload = {
  "api_key": "3a36c1735899cd76538662bc3dc1bddea0ee27f8",
  "real_browser": False,
  "batch": {
    "urls": [
    "https://www.indeed.com/jobs?q=cybersecurity&l=New+York%2C+NY&radius=25&start=0",
    "https://www.indeed.com/jobs?q=cybersecurity&l=New+York%2C+NY&radius=25&start=10",
    "https://www.indeed.com/jobs?q=cybersecurity&l=New+York%2C+NY&radius=25&start=20"
    ],
    "concurrency": 1,
    "merge_results": True
  },
  "parse": {
    "jobs": [
      {
        "_parent": ".resultContent",
        "url": "a >> href",
        "title": "h2.jobTitle >> text",
        "company": ".companyName >> text",
        "location": ".companyLocation >> text",
        "rating": ".ratingNumber span[aria-hidden=true] >> text",
        "additional_info": [
            ".metadata div >> text"
        ]
      }
    ]
  }
}

headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
response = requests.post(api_url, data=json.dumps(payload), headers=headers)
result = json.loads(response.text)

print(result)