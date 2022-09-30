function getCOMB() {
    var COMB = [...NY];
    
    for (let i in MIN) {
        COMB.push(MIN[i]);
    }
    
    for (let i in MIL) {
        COMB.push(MIL[i]);
    }

    return COMB;
}

function genRemoteJobsPie(loc, dataset) {
    const ctx = document.getElementById(loc + '-remote-jobs-pie');

    var remote_num = Array(4).fill(0);

    for (let i in dataset) {
        if (dataset[i]['remote'] == 0) remote_num[0] += 1;
        else if (dataset[i]['remote'] == 1) remote_num[1] += 1;
        else if (dataset[i]['remote'] == 2) remote_num[2] += 1;
        else if (dataset[i]['remote'] == 3) remote_num[3] += 1;
    }

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Not Remote', 'Remote', 'Hybrid', 'Temporarily Remote'],
            datasets: [{
                data: remote_num,
                backgroundColor: [
                    '#ffa822',
                    '#134e6f',
                    '#ff6150',
                    '#1ac0c6'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Percentages of Different Workplaces Statuses',
                    font: {
                        size: 24,
                        
                    },
                    color: 'white'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label;
                            let value = context.formattedValue;
            
                            if (!label)
                                label = 'Unknown'
            
                            let sum = 0;
                            let dataArr = context.chart.data.datasets[0].data;
                            dataArr.map(data => {
                                sum += Number(data);
                            });
            
                            let percentage = (value * 100 / sum).toFixed(2) + '%';
                            return label + ": " + percentage;
                        }
                    }
                }
            }
        }
    });
}

function genSalaryRangesBar(loc, dataset) {
    const ctx = document.getElementById(loc + '-salary-ranges-bar');

    var low_salary_num = Array(8).fill(0);

    var high_salary_num = Array(8).fill(0);

    for (let i in dataset) {
        if (!isNaN(dataset[i]['low_salary'])) {
            if (parseFloat(dataset[i]['low_salary']) < 50) low_salary_num[0] += 1;
            else if (parseFloat(dataset[i]['low_salary']) < 60) low_salary_num[1] += 1;
            else if (parseFloat(dataset[i]['low_salary']) < 70) low_salary_num[2] += 1;
            else if (parseFloat(dataset[i]['low_salary']) < 80) low_salary_num[3] += 1;
            else if (parseFloat(dataset[i]['low_salary']) < 90) low_salary_num[4] += 1;
            else if (parseFloat(dataset[i]['low_salary']) < 100) low_salary_num[5] += 1;
            else if (parseFloat(dataset[i]['low_salary']) < 110) low_salary_num[6] += 1;
            else if (parseFloat(dataset[i]['low_salary']) >= 110) low_salary_num[7] += 1;
        }

        if (!isNaN(dataset[i]['high_salary'])) {
            if (parseFloat(dataset[i]['high_salary']) < 50) high_salary_num[0] += 1;
            else if (parseFloat(dataset[i]['high_salary']) < 60) high_salary_num[1] += 1;
            else if (parseFloat(dataset[i]['high_salary']) < 70) high_salary_num[2] += 1;
            else if (parseFloat(dataset[i]['high_salary']) < 80) high_salary_num[3] += 1;
            else if (parseFloat(dataset[i]['high_salary']) < 90) high_salary_num[4] += 1;
            else if (parseFloat(dataset[i]['high_salary']) < 100) high_salary_num[5] += 1;
            else if (parseFloat(dataset[i]['high_salary']) < 110) high_salary_num[6] += 1;
            else if (parseFloat(dataset[i]['high_salary']) >= 110) high_salary_num[7] += 1;
        }
    }

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['< $50k', '$50k-$59.9k', '$60k-$69.9k', '$70k-$79.9k', '$80k-$89.9k', '$90k-$99.9k', '$100k-$109.9k', '> $110k'],
            datasets: [{
                label: 'Low-end Salary',
                data: low_salary_num,
                backgroundColor: '#ffa822',
                borderWidth: 0
            },
            {
                label: 'High-end Salary',
                data: high_salary_num,
                backgroundColor: '#134e6f',
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Distribution of Low and High-end Salary Jobs',
                    font: {
                        size: 24,
                        
                    },
                    color: 'white'
                }
            }
        }
    });
}

function genTopCompaniesBar(loc, dataset) {
    const ctx = document.getElementById(loc + '-top-companies-bar');

    companies = []

    for (let i in dataset) {
        if (companies.some(e => e.name === dataset[i]['company_name'].toUpperCase())) {
            companies[companies.findIndex(e => e.name === dataset[i]['company_name'].toUpperCase())]['count'] += 1;
        }

        else {
            companies.push({'name':dataset[i]['company_name'].toUpperCase(), 'count': 1})
        }
    }

    companies.sort((a, b) => b.count - a.count)

    top_12_companies_name = []
    top_12_companies_count = []

    for (let i = 0; i < 12; i++) {
        top_12_companies_count.push(companies[i]['count']);
        top_12_companies_name.push(companies[i]['name']);
    }

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: top_12_companies_name,
            datasets: [{
                label: 'Number of Cybersecurity Job Postings',
                data: top_12_companies_count,
                backgroundColor: '#ff6150',
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Top 12 Companies with the Most Cybersecurity Job Postings',
                    font: {
                        size: 24,
                        
                    },
                    color: 'white'
                }
            }
        }
    });
}

function genHighRatedCompaniesBar(loc, dataset) {
    const ctx = document.getElementById(loc + '-high-companies-bar');

    dataset_sorted = [...dataset]

    dataset_sorted = [...new Map(dataset_sorted.map(v => [v.company_name, v])).values()]

    dataset_sorted.sort((a, b) => b.company_rating - a.company_rating)

    top_12_companies_name = []
    top_12_companies_rating = []

    for (let i = 0; i < 12; i++) {
        top_12_companies_name.push(dataset_sorted[i]['company_name'].toUpperCase());
        top_12_companies_rating.push(dataset_sorted[i]['company_rating']);
    }

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: top_12_companies_name,
            datasets: [{
                label: 'Rating out of 5',
                data: top_12_companies_rating,
                backgroundColor: '#1ac0c6',
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Top 12 Highest Rated Companies with Cybersecurity Job Postings',
                    font: {
                        size: 24,
                        
                    },
                    color: 'white'
                }
            },
            scales: {
                y: {
                    min: 4,
                    max: 5
                }
            },
        }
    });
}

function genAvgPostAge(loc, dataset) {
    const ctx = document.getElementById(loc + '-avg-post-age');

    let count = 0, total = 0;

    for (let i in dataset) {
        if (dataset[i]['post_age_days'] !== '30+' && !isNaN(dataset[i]['post_age_days']) && dataset[i]['post_age_days'] != '') {
            count++;
            total += parseInt(dataset[i]['post_age_days']);
        }
    }

    ctx.innerHTML = Math.round(total/count);
}

var COMB = getCOMB();

genRemoteJobsPie('com', COMB)

genSalaryRangesBar('com', COMB)

genTopCompaniesBar('com', COMB)

genHighRatedCompaniesBar('com', COMB)

genRemoteJobsPie('ny', NY)

genSalaryRangesBar('ny', NY)

genTopCompaniesBar('ny', NY)

genHighRatedCompaniesBar('ny', NY)

genRemoteJobsPie('min', MIN)

genSalaryRangesBar('min', MIN)

genTopCompaniesBar('min', MIN)

genHighRatedCompaniesBar('min', MIN)

genRemoteJobsPie('mil', MIL)

genSalaryRangesBar('mil', MIL)

genTopCompaniesBar('mil', MIL)

genHighRatedCompaniesBar('mil', MIL)

genRemoteJobsPie('nat', US)

genSalaryRangesBar('nat', US)

genTopCompaniesBar('nat', US)

genHighRatedCompaniesBar('nat', US)