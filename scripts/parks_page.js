function addPark(parkTypeName, parkTypeSelect) {
    parkTypeSelect.appendChild(new Option(parkTypeName));
}

function addLocation(text, target) {
    target.appendChild(new Option(text));
}

function Park(parkObject) {
    const e = document.createElement("div");
    e.innerHTML = parkObject.LocationName;
    return e;
}

function renderParks() {
    const results = document.getElementById("results");
    const selectedType = parkTypeSelect.value;
    const selectedLocation = parkLocationSelect.value;
    results.innerHTML = ""; 
    let filtered = nationalParksArray;
    
    if (selectedType) {
        filtered = filtered.filter(p => p.LocationName.toLowerCase().includes(selectedType.toLowerCase()));
    }
    if (selectedLocation) {
        filtered = filtered.filter(p => p.State.toLowerCase() === selectedLocation.toLowerCase());
    }
    
    filtered.forEach(p => results.appendChild(Park(p)));
    if (filtered.length < 1) {
        results.innerHTML = "No results found matching the filter.";
    }
}

function clearForm() {
    // Clear the selection for both dropdowns
    document.getElementById("parkTypeSelect").selectedIndex = 0;
    document.getElementById("parkLocationSelect").selectedIndex = 0;
    
    // Clear the results div to make the page blank
    document.getElementById("results").innerHTML = "";
}

function onContent() {
    const parkTypeSelect = document.getElementById("parkTypeSelect");
    const parkLocationSelect = document.getElementById("parkLocationSelect");
    const results = document.getElementById("results");

    parkTypesArray.forEach(parkTypeName => addPark(parkTypeName, parkTypeSelect));
    locationsArray.forEach(parkLocationName => addLocation(parkLocationName, parkLocationSelect));
    renderParks();

    filterButton.addEventListener("click", renderParks);
    parkTypeSelect.addEventListener("change", renderParks);
    parkLocationSelect.addEventListener("change", renderParks);

    clearButton.addEventListener("click", clearForm);
}

document.addEventListener("DOMContentLoaded", onContent);
