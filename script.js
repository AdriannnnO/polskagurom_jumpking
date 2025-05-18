let jd = 0
let koronka = "assets/git.png"
let koronka2 = "assets/git2.png"
let koronka3 = "assets/git3.png"

divy = document.querySelectorAll("div")
// console.log(divy.length)

async function getLatestBestTimes(playerId,kategoria) {
    const url = `https://www.speedrun.com/api/v1/runs?user=${playerId}&game=268ekxy6&category=${kategoria}&orderby=date&status=verified`;

    try {
        const response = await fetch(url);
        if (!response.ok) { 
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const runs = data.data.map(run => ({
            time: run.times.primary_t,
            date: run.date,
        }));

        const sortedRuns = runs.sort((a, b) => a.time - b.time);
        return sortedRuns.slice(0, 5);
    } catch (error) {
        console.error("Error fetching or processing data:", error);
        return [];
    }
}

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

function zrob_tabele_whuj(a){
    const table = document.createElement('table');
    table.setAttribute('id', 'speedrunTable');
    if (a==0){
    table.innerHTML = `
        <tr>
            <th>Miejsce</th>
            <th>Grajek</th>
            <th>Czas</th>
            <th>Filmik</th>
            <th>Top</th>
        </tr>
    `;
    }
    else{
        table.innerHTML = `
        <tr>
            <th>Miejsce</th>
            <th>Grajek</th>
            <th>Czas</th>
            <th>Cykl</th>
            <th>Filmik</th>
            <th>Top</th>
        </tr>
    `;
    }
    return table
}


async function collectData(apiUrl) {
    let jd = 1
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const collectedData = [];

        for (let i = 0; i < data.data.runs.length; i++) {
            const decimalTime = data.data.runs[i].run.times.realtime_t;
            const userId = data.data.runs[i].run.players[0].id;

            var totalSeconds = Math.floor(decimalTime);
            var minutes = Math.floor(totalSeconds / 60);
            var seconds = totalSeconds % 60;
            var milliseconds = Math.round((decimalTime - totalSeconds) * 1000);

            try {
                var grajek = data.data.players.data[i].names.international;
              } catch (e) {
                continue;
              }

            try {
                var video = data.data.runs[i].run.videos.links[0].uri;
            } catch (error) {
                var video = "Null";
            }

            // console.log(data.data.category)
            try {
                var cyklson = data.data.runs[i].run.values;
                var cykl = cyklson["68kokwqn"];

                if (typeof cykl !== "undefined"){
                }
                else{
                    var cykl = cyklson["onvvmx0n"];
                }
                // console.log(cykl)
                switch (cykl){
                    case "810yj92l":
                        real_cykl = "-1";
                        break;
                    case "9qjone3l":
                        real_cykl = "0";
                        break;
                    case "jq6wrgjl":
                        real_cykl = "1";
                        break
                    case "5lme6wmq":
                        real_cykl = "2";
                        break
                    case "81wjo3vq":
                        real_cykl = "3+"
                        break
                    case "5q8n7g3q":
                        real_cykl = "-1"
                        break;
                    case "4qyken21":
                        real_cykl = "0"
                        break;
                    case "mlng65j1":
                        real_cykl = "1"
                        break;
                    case "8102ex2q":
                        real_cykl = "2"
                        break
                    case "9qjpyg3q":
                        real_cykl = "3+"
                        break

                    
                }
                // console.log(real_cykl)
            
            } catch (error) {
                var real_cykl = "Null";
            }

            try {
                var krajGrajka = (data.data.players.data[i].location.country.names.international);
            } catch(error) {
                var krajGrajka = "jd";
            }

            if (String(seconds).length == 2) {
                sekundes = seconds;
            } else {
                sekundes = "0" + String(seconds);
            }
            if (String(milliseconds).length == 3) {
                milisekundes = milliseconds;
            } else if ((String(milliseconds).length == 2)) {
                milisekundes = "0" + String(milliseconds);
            }else if ((String(milliseconds).length == 1)) {
                milisekundes = "00" + String(milliseconds);
            }
            if (krajGrajka == "Poland") {

                const formattedData = {
                    userid: userId,
                    place: jd++,
                    player: grajek,
                    time: `${minutes}m ${sekundes}s ${milisekundes}ms`,
                    wind: real_cykl,
                    videoLink: video,
                    top: i + 1
                };
                collectedData.push(formattedData);
            }
        }
        return collectedData;
    } catch (error) {
        console.error('Error collecting data:', error);
        return [];
    }
}


async function fetchSpeedrunData() {
    try {
        document.body.style.backgroundImage = "url('assets/jk3.png')";
        // document.body.style.backgroundColor = "black";

        loadyn();
        
        const apiUrl = 'https://www.speedrun.com/api/v1/leaderboards/268ekxy6/category/n2y7rvz2?embed=players,variables';
        const collectedData = await collectData(apiUrl);

        const table = zrob_tabele_whuj(1);

        collectedData.forEach((rowData, index) => {
            const { place, player, time, wind, videoLink, top } = rowData;
        
            const playerId = rowData.userid || "defaultId";
        
            const row = table.insertRow(-1);
            row.setAttribute('data-player-id', playerId); 
            row.setAttribute('kategoria', 'n2y7rvz2'); 

            row.innerHTML = `
                <td>${place}</td>
                <td>${player}</td>
                <td>${time}</td>
                <td>${wind}</td>
                <td><a href="${videoLink}" target="_blank">link</a></td>
                <td>${top}</td>
            `;
        });
        

        const speedrunDataContainer = document.getElementById('speedrunData');
        speedrunDataContainer.innerHTML = '';
        speedrunDataContainer.appendChild(table);
        hide_loadyn();
    } catch (error) {
        console.error('Error fetching speedrun data:', error);
    }
}


async function fetchSpeedrunData_NewBabePlus() {
    try {
        document.body.style.backgroundImage = "url('assets/jk3.png')";
        loadyn();
        
        const apiUrl = 'https://www.speedrun.com/api/v1/leaderboards/268ekxy6/category/9d8x83q2?embed=players,variables';
        const collectedData = await collectData(apiUrl);

        const table = zrob_tabele_whuj(1);

        collectedData.forEach((rowData, index) => {
            const { place, player, time, wind, videoLink, top } = rowData;
            const row = table.insertRow(-1);

            const playerId = rowData.userid || "defaultId";
        
            row.setAttribute('data-player-id', playerId); 
            row.setAttribute('kategoria', '9d8x83q2'); 
            row.innerHTML = `
                <td>${place}</td>
                <td>${player}</td>
                <td>${time}</td>
                <td>${wind}</td>
                <td><a href="${videoLink}" target="_blank">link</a></td>
                <td>${top}</td>
            `;
        });

        const speedrunDataContainer = document.getElementById('speedrunData');
        speedrunDataContainer.innerHTML = '';
        speedrunDataContainer.appendChild(table);
        hide_loadyn();
        speedrunDataContainer.style.minHeight="40vh";
        
    } catch (error) {
        console.error('Error fetching speedrun data:', error);
    }
}

function formatTime(seconds) {
    const totalSeconds = Math.floor(seconds);
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    const milliseconds = Math.round((seconds - totalSeconds) * 1000);


    if (String(remainingSeconds).length == 2) {
        sekundes = remainingSeconds;
    } else {
        sekundes = "0" + String(remainingSeconds);
    }

    if (String(milliseconds).length == 3) {
        milisekundes = milliseconds;
    } else if ((String(milliseconds).length == 2)) {
        milisekundes = "0" + String(milliseconds);
    }else if ((String(milliseconds).length == 1)) {
        milisekundes = "00" + String(milliseconds);
    }

    return `${minutes}m ${sekundes}s ${milisekundes}ms`;
}


async function fetchSpeedrunData_gotb() {
    try {
        document.body.style.backgroundImage = "url('assets/jk3.png')";
        // document.body.style.backgroundColor = "black";
        loadyn();
        
        const apiUrl = 'https://www.speedrun.com/api/v1/leaderboards/268ekxy6/category/mke9q6jd?embed=players';
        const collectedData = await collectData(apiUrl);

        const table = zrob_tabele_whuj(0);

        collectedData.forEach((rowData, index) => {
            const { place, player, time, videoLink, top } = rowData;
            const row = table.insertRow(-1);
            const playerId = rowData.userid || "defaultId";
        
            row.setAttribute('data-player-id', playerId); 
            row.setAttribute('kategoria', 'mke9q6jd'); 
            row.innerHTML = `
                <td>${place}</td>
                <td>${player}</td>
                <td>${time}</td>
                <td><a href="${videoLink}" target="_blank">link</a></td>
                <td>${top}</td>
            `;
        });

        const speedrunDataContainer = document.getElementById('speedrunData');
        speedrunDataContainer.innerHTML = '';
        speedrunDataContainer.appendChild(table);
        hide_loadyn();
    } catch (error) {
        console.error('Error fetching speedrun data:', error);
    }
}
function showBestTimesModal(bestTimes) {
    let modal = document.getElementById('bestTimesModal');
    if (modal) {
        document.body.removeChild(modal);
    }

    modal = document.createElement('div');
    modal.setAttribute('id', 'bestTimesModal');
    // modal.style.position = 'fixed';
    // modal.style.top = '50%';
    // modal.style.left = '50%';
    // modal.style.transform = 'translate(-50%, -50%)';
    // modal.style.backgroundColor = 'white';
    // modal.style.padding = '20px';
    // modal.style.border = '3px solid red';
    // modal.style.zIndex = '1000';

    const content = `
        <h2>Ostatnie PB</h2>
        <ul>
            ${bestTimes.map(run => `<li>${run.date}: ${formatTime(run.time)}</li>`).join('')}
        </ul>
        <button id="closeModal">Zamknij</button>
    `;
    modal.innerHTML = content;
    document.body.appendChild(modal);

    document.getElementById('closeModal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
}


async function addRowEventListeners() {
    const rows = document.querySelectorAll('#speedrunTable tr');
    rows.forEach(row => {
        row.addEventListener('click', async () => {
            const ajdi = row.getAttribute('data-player-id'); // Get player ID
            const kategorson = row.getAttribute('kategoria')
            if (ajdi) {
                const bestTimes = await getLatestBestTimes(ajdi,kategorson); // Fletch best times
                showBestTimesModal(bestTimes); // Show moda with the times
            }
        });
    });
}


async function fetchSpeedrunDataWithEvents() {
    await fetchSpeedrunData(); 
    addRowEventListeners();    
}

async function fetchSpeedrunData_NewBabePlusa(){
    await fetchSpeedrunData_NewBabePlus();
    addRowEventListeners();    

}

async function fetchSpeedrunData_gotba(){
    await fetchSpeedrunData_gotb();
    addRowEventListeners();    

}


fetchSpeedrunDataWithEvents()
