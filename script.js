let jd = 0
async function fetchSpeedrunData() {
    try {
        const response = await fetch('https://www.speedrun.com/api/v1/leaderboards/268ekxy6/category/n2y7rvz2?top=100');
        const data = await response.json();
        
        for (i=0; i < data.data.runs.length; i++){
            const decimalTime = data.data.runs[i].run.times.realtime_t;
            const userId = data.data.runs[i].run.players[0].id;

            var totalSeconds = Math.floor(decimalTime);
            var minutes = Math.floor(totalSeconds / 60);
            var seconds = totalSeconds % 60;
            var milliseconds = Math.round((decimalTime - totalSeconds) * 1000); // Round milliseconds

            const userResponse = await fetch(`https://www.speedrun.com/api/v1/users/${userId}`);
            const userData = await userResponse.json();

            var grajek = (userData.data.names.international)

            try {
                var krajGrajka = (userData.data.location.country.names.international)
            } catch(error){
                var krajGrajka = "jd";
            }

            if (String(seconds).length==2){
                sekundes = seconds
            } else {
                sekundes = "0" + String(seconds);
            }
            
            if (krajGrajka=="Poland"){
                jd = jd + 1
                const runDiv = document.createElement('div');
                runDiv.setAttribute("class", "run-entry");

                runDiv.innerHTML = `
                    <h2>TOP ${jd} POLUS</h3>
                    <p>${grajek}</p>
                    <p>${minutes}m ${sekundes}s ${milliseconds}ms</p>
                    <p>Miejsce na tabeli: ${i+1}</p>
                `;

                const speedrunDataContainer = document.getElementById('speedrunData');
                speedrunDataContainer.appendChild(runDiv);
            }
        }
    } catch (error) {
        console.error('Error fetching speedrun data:', error);
    }
}
fetchSpeedrunData();
