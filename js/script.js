function makeCharts(pairings) {

const seme_name = pairings.map(function(d) {
return d.seme_name;
});

const seme_age = pairings.map(function(d) {
return d.seme_age;
});

const uke_name = pairings.map(function(d) {
return d.uke_name;
});

const uke_age = pairings.map(function(d) {
return d.uke_age;
});

const production_houses = pairings.map(function(d) {
return d.production_house;
});

const seme_taller = pairings.map(function(d) {
return d.seme_is_taller1_same0_shorter2;
});

const seme_older = pairings.map(function(d) {
return d.seme_is_older1_same0_younger2;
});


const ship_name = pairings.map(function(d) {
return d.ship_name;
});

const fan_engagement = pairings.map(function(d) {
return d.fan_engagement_1_5;
});

// create count for production houses
const prodsCount = production_houses.reduce((acc, item) =>
    {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
    }, {}
);

const tallerMap = {
    "0": 'Same',
    "1": 'Taller',
    "2": 'Shorter'
};

const olderMap = {
    "0": 'Same',
    "1": 'Older',
    "2": 'Younger'
};

// create count for taller breakdown
const seme_taller_count = seme_taller.reduce((acc, item) =>
    {
        const key = tallerMap[item] || 'unknown';
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {}
);

// create count for older breakdown
const seme_older_count = seme_older.reduce((acc, item) =>
    {
        const key = olderMap[item] || 'unknown';
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {}
);


// create dict for production houses with highest engagement scores 
const highest_engagement_by_agency = production_houses.reduce((acc, agency, i) => {
  if (fan_engagement[i] >= 4) {
    acc[agency] = (acc[agency] || 0) + 1;
  }
  return acc;
}, {});


// pie chart for production houses 
    const chart_prod = new Chart('production-count', {
    type: "pie",
    options: {
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "Agencies with the most active ships",
                position: "top"
            }
        },
    },
    data: {
        labels: Object.keys(prodsCount),
        datasets: [
        {
            data: Object.values(prodsCount)
        }
        ]
    }
    });

// doughnut chart for number of seme's taller than uke's 
    const chart_height = new Chart('seme_taller_chart', {
    type: "doughnut",
    options: {
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "Height Gap by Ship Position"
            },
            legend: {
                display: true
            }
        }
    },
    data: {
        labels: Object.keys(seme_taller_count),
        datasets: [
        {
            data: Object.values(seme_taller_count)
        }
        ]
    }
    });

// doughnut chart for number of seme's older than uke's 
    const chart_age = new Chart('seme_older_chart', {
    type: "pie",
    options: {
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "Age Gap by Ship Position"
            },
            legend: {
                display: true
            }
        }
    },
    data: {
        labels: Object.keys(seme_older_count),
        datasets: [
        {
            data: Object.values(seme_older_count)
        }
        ]
    }
    });


// line chart for agency with highest engagement
    const chart_engage = new Chart('agency_engagement', {
    type: "bar",
    options: {
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "Agencies and Fan Engagement"
            },
            legend: {
                display: false
            }
        }
    },
    data: {
        labels: Object.keys(highest_engagement_by_agency),
        datasets: [
        {
            data: Object.values(highest_engagement_by_agency)
        }
        ]
    },
    });


}


document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const navbar = document.getElementById('collapsibleNavbar');
    const bsCollapse = bootstrap.Collapse.getInstance(navbar);
    if (bsCollapse) bsCollapse.hide();
  });
});

// Request data using D3
d3.csv("https://cdn.jsdelivr.net/gh/e-mimiko/ship-theory@latest/dataset/bl-pairings.csv").then(makeCharts);
