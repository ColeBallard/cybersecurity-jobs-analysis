# Cybersecurity Jobs Analysis

## Description

Project which aims to analyze cybersecurity job data in the United States. Project management board [here](https://trello.com/b/qGnBwsSO/cybersecuirty-jobs-analysis).

## Scrape

All of the data was scraped from Indeed on 09/22/2022 at 3pm EST.

Here are the steps to replicate the scrape.

1. Clone the repository.

```shell
git clone https://github.com/ColeBallard/cybersecurity-jobs-analysis
```

2. Install the latest version of python. [Downloads.](https://www.python.org/downloads/)

3. Install dependencies (depends on your version of pip).

```shell
pip install beautifulsoup4
pip install requests
```

4. Run the python file.

```shell
python YourFileLocation/cybersecurity-jobs-analysis/scrape/scrape.py
```

## Data Guide

**company_name**|**company_rating**|**remote**|**city**|**state**|**low_salary**|**high_salary**|**post_age_days**
:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:
Company name| Company rating| 0 = not remote, 1 = remote, 2 = hybrid, 3 = temporarily remote| City| State| Lower end of salary range| Higher end of salary range| The number of days ago the job was posted

## **[Contact](https://coleb.io/contact)**
