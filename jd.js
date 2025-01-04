

    // URL of the API (replace with actual API endpoint)
const url = "https://www.speedrun.com/api/v1/runs?user=8rp60rgj&game=268ekxy6&category=n2y7rvz2&orderby=date&status=verified&offset=10"; // Replace with your actual API endpoint

// Function to fetch and process the data
async function getLatestBestTimes() {
    try {
        // Fetch the data
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Extract and sort runs by time
        const runs = data.data.map(run => ({

            time: run.times.primary_t, // The primary time in seconds
            date: run.date, // The date of the run
        }));

        const sortedRuns = runs.sort((a, b) => a.time - b.time);

        const latest5Best = sortedRuns.slice(0, 5);


        console.log("Latest 5 Best Times:");
        latest5Best.forEach((run, index) => {
            
        var totalSeconds = Math.floor(run.time);
            var minutes = Math.floor(totalSeconds / 60);
            var seconds = totalSeconds % 60;
            var milliseconds = Math.round((run.time - totalSeconds) * 1000);

            console.log(`#${index + 1}: Time: ${minutes}m ${seconds}s ${milliseconds}ms, Date: ${run.date}`);
        });
    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }
}

// Call the function
getLatestBestTimes();

