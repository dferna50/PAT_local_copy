import http from 'k6/http';
import { check, sleep } from 'k6';

// Use the global open() function to read the JSON file
let cookies = JSON.parse(open('cookies.json')); // Ensure cookies.json is in the same directory

export let options = {
    scenarios: {
        ui: {
          executor: 'shared-iterations',
          options: {
            browser: {
              type: 'chromium',
            },
          },
        },
      },
      thresholds: {
        checks: ['rate==1.0'],
      },
    
    // stages: [
    //     { duration: '2m', target: 100 }, // ramp-up to 100 users over 2 minutes
    //     { duration: '5m', target: 100 }, // stay at 100 users for 5 minutes
    //     { duration: '2m', target: 0 },   // ramp-down to 0 users over 2 minutes
    // ],
    // cloud: {
    //     projectID: 3720275,
    //     // Test runs with the same name groups test runs together
    //     name: 'YOUR TEST NAME'
    //   }
    
};

export default function () {
    let url = 'https://pat-dev.apps.asu.edu/';

    // check(res, {
    //     'Programs summary text is present': (r) => r.body.includes('Programs summary'),
    // });

    
   // Construct cookie header from the loaded cookies
    let headers = {
        'Cookie': `${cookies.map(c => `${c.name}=${c.value}`).join('; ')}`,
    };

    
   // Make an HTTP request with cookies
    let res = http.get(url, { headers: headers });

    check(res, {
        'status is 200': (r) => r.status === 200,
    });

    sleep(10);
}
