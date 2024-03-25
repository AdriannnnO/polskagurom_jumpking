let jd = 0
let koronka = "git.png"
let koronka2 = "git2.png"
let koronka3 = "git3.png"

divy = document.querySelectorAll("div")
// console.log(divy.length)


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

            var grajek = (data.data.players.data[i].names.international);

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

            if (krajGrajka == "Poland") {

                const formattedData = {
                    place: jd++,
                    player: grajek,
                    time: `${minutes}m ${sekundes}s ${milliseconds}ms`,
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
        document.body.style.backgroundImage = "url('jk2.png')";
        loadyn();
        
        const apiUrl = 'https://www.speedrun.com/api/v1/leaderboards/268ekxy6/category/n2y7rvz2?embed=players,variables';
        const collectedData = await collectData(apiUrl);

        const table = zrob_tabele_whuj(1);

        collectedData.forEach((rowData, index) => {
            const { place, player, time, wind, videoLink, top } = rowData;
            const row = table.insertRow(-1);
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


fetchSpeedrunData();
async function fetchSpeedrunData_NewBabePlus() {
    try {
        document.body.style.backgroundImage = "url('jk3.png')";
        loadyn();
        
        const apiUrl = 'https://www.speedrun.com/api/v1/leaderboards/268ekxy6/category/9d8x83q2?embed=players,variables';
        const collectedData = await collectData(apiUrl);

        const table = zrob_tabele_whuj(1);

        collectedData.forEach((rowData, index) => {
            const { place, player, time, wind, videoLink, top } = rowData;
            const row = table.insertRow(-1);
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



async function fetchSpeedrunData_gotb() {
    try {
        document.body.style.backgroundImage = "url('jk4.png')";
        loadyn();
        
        const apiUrl = 'https://www.speedrun.com/api/v1/leaderboards/268ekxy6/category/mke9q6jd?embed=players';
        const collectedData = await collectData(apiUrl);

        const table = zrob_tabele_whuj(0);

        collectedData.forEach((rowData, index) => {
            const { place, player, time, videoLink, top } = rowData;
            const row = table.insertRow(-1);
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