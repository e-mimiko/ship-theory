function makeCharts(pairings) {
  // players is an array of objects where each object is something like:
  // {
  //   "seme_name": "William",
  //   "seme_age": "21",
  //   "production_house": "GMMTV"
  // }

var seme_name = pairings.map(function(d) {
return d.seme_name;
});

var seme_age = pairings.map(function(d) {
return d.seme_age;
});

var uke_name = pairings.map(function(d) {
return d.uke_name;
});

var uke_age = pairings.map(function(d) {
return d.uke_age;
});

var production_houses = pairings.map(function(d) {
return d.production_house;
});

var seme_taller = pairings.map(function(d) {
return d.seme_is_taller1_same0_shorter2;
});

var seme_older = pairings.map(function(d) {
return d.seme_is_older1_same0_younger2;
});


var ship_name = pairings.map(function(d) {
return d.ship_name;
});

var fan_engagement = pairings.map(function(d) {
return d.fan_engagement_1_5;
});

// create count for production houses
const prodsCount = production_houses.reduce((acc, item) =>
    {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
    }, {}
);

// get age difference for each couple
const age_gap = seme_age.map((num, index) => Math.abs(num-uke_age[index]));

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

// // create dict for production houses with engagement scores 
// const highest_engagement_by_agency = fan_engagement.reduce((acc, item) =>
//     {
//         // const key = tallerMap[item] || 'unknown';
//         // acc[key] = (acc[key] || 0) + 1;
//         acc[item] = (acc[item] || 0) + 1;
//         return acc;
//     }, {}
// );

// create dict for production houses with highest engagement scores 
const highest_engagement_by_agency = production_houses.reduce((acc, agency, i) => {
  if (fan_engagement[i] >= 4) {
    acc[agency] = (acc[agency] || 0) + 1;
  }
  return acc;
}, {});


// pie chart for production houses 
    var chart = new Chart('production-count', {
    type: "pie",
    options: {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true
            }
        }
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
    var chart = new Chart('seme_taller_chart', {
    type: "doughnut",
    options: {
        maintainAspectRatio: false,
        plugins: {
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
    var chart = new Chart('seme_older_chart', {
    type: "pie",
    options: {
        maintainAspectRatio: false,
        plugins: {
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
    var chart = new Chart('agency_engagement', {
    type: "bar",
    options: {
        maintainAspectRatio: false,
        plugins: {
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




// // line chart for fan engagement by company
// var chart = new Chart('age_gap_chart', {
// type: "bar",
// options: {
//     maintainAspectRatio: false,
//     legend: {
//     display: false
//     }
// },
// data: {
//     labels: ship_name,
//     datasets: [
//     {
//         data: age_gap
//     }
//     ]
// }
// });


// // barchart for seme_name and seme_age
//     var chart = new Chart('age-bar', {
//     type: "bar",
//     options: {
//         maintainAspectRatio: false,
//         legend: {
//         display: false
//         }
//     },
//     data: {
//         labels: ship_name,
//         datasets: [
//         {
//             label: "Seme",
//             data: seme_age
//         },
//         {
//             label: "Uke",
//             data: uke_age
//         }
//         ]
//     }
// });

// // line chart for age gap of ships
//     var chart = new Chart('age_gap_chart', {
//     type: "bar",
//     options: {
//         maintainAspectRatio: false,
//         plugins: {
//             legend: {
//                 display: true
//             }
//         }
//     },
//     data: {
//         labels: ship_name,
//         datasets: [
//             {
//                 data: age_gap
//             }
//         ]
//     }
//     });

}

// Request data using D3
d3.csv("https://cdn.jsdelivr.net/gh/e-mimiko/shiptheory.github.io@latest/dataset/bl-pairings.csv").then(makeCharts);
