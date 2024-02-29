let jd = 0

divy = document.querySelectorAll("div")
console.log(divy.length)


function loadyn(){
    let costampierdoli= document.getElementById("speedrunData");
    costampierdoli.innerHTML = "<p>Loading Data...</p>";
}

function hide_loadyn(){
    let wiadomosc = document.querySelector("#speedrunData p")
    if (wiadomosc){
        wiadomosc.remove();
    }
}

async function fetchSpeedrunData() {
    try {

        loadyn();

        const response = await fetch('https://www.speedrun.com/api/v1/leaderboards/268ekxy6/category/n2y7rvz2?embed=players');
        const data = await response.json();
        
        for (i=0; i < data.data.runs.length; i++){
            const decimalTime = data.data.runs[i].run.times.realtime_t;
            const userId = data.data.runs[i].run.players[0].id;

            var totalSeconds = Math.floor(decimalTime);
            var minutes = Math.floor(totalSeconds / 60);
            var seconds = totalSeconds % 60;
            var milliseconds = Math.round((decimalTime - totalSeconds) * 1000);

			var grajek = (data.data.players.data[i].names.international)

            try {
                var krajGrajka = (data.data.players.data[i].location.country.names.international)
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
                    <h2 id="mjsc">TOP ${jd} POLUS</h2>
                    <p>${grajek}</p>
                    <p>${minutes}m ${sekundes}s ${milliseconds}ms</p>
                    <p>Miejsce na tabeli: ${i+1}</p>
                `;

                const speedrunDataContainer = document.getElementById('speedrunData');
                speedrunDataContainer.appendChild(runDiv);
		}}
        hide_loadyn();
        
    } catch (error) {
        console.error('Error fetching speedrun data:', error);
    }
}
fetchSpeedrunData();




