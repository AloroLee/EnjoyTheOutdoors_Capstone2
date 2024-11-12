document.addEventListener("DOMContentLoaded", () => {
    const mountainsSelect = document.getElementById("mountainsSelect");
    mountainsArray.forEach(m => mountainsSelect.appendChild(new Option(m.name)));
    
    mountainsSelect.addEventListener("change", e => {
        const selectedIndex = mountainsSelect.selectedIndex;
        if (selectedIndex) {
            const m = mountainsArray[selectedIndex - 1];

            const coords = m.coords.lat.toFixed(3) + 
                    ", " + 
                    m.coords.lng.toFixed(3);

            // Calculate sunrise and sunset using SunCalc
            const now = new Date();
            const times = SunCalc.getTimes(now, m.coords.lat, m.coords.lng);
            const sunrise = times.sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const sunset = times.sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });


            // Populate results with mountain details
            results.innerHTML = `
                <h1>${m.name}</h1>
                Elevation: <b>${m.elevation}</b><br>
                Effort: <b>${m.effort}</b><br>
                Coordinates: <b>(${coords})</b><br>
                Sunrise: <b>${sunrise}</b><br>
                Sunset: <b>${sunset}</b><br>
                <br>
                ${m.desc}
                <br><br>
            `;

            // Add image if available
            if (m.img) {
                const img = document.createElement("img");
                img.alt = `${m.name} Image`;
                img.src = `data/images/${m.img}`;
                img.style.maxWidth = "100%"; // Optional: scale image to container
                results.appendChild(img);
            }
        }
    });
});
