function cleanNumber(value) {
    return parseInt(String(value).replace(/[^0-9]/g, ""), 10) || "";
}

async function bmw(sheetGid, containerID){
    const baseUrl= "https://docs.google.com/spreadsheets/d/e/2PACX-1vRkAO6ndTpVfuHLRwsdFnFhlQBBEMvsHT3ab8ooGoM-HDmh7czslbF37Y6gyIVz7iVgftTXIFjmbLXr/pub";
    const url= `${baseUrl}?gid=${sheetGid}&single=true&output=csv`;
    
    const respond = await fetch(url);
    const csvText = await respond.text();

    const parsed = Papa.parse(csvText, {header:true});
    const rows = parsed.data;

    const container = document.getElementById(containerID);
    container.innerHTML = "";

    rows.forEach((row,i)=>{
        if(!row.Model) return;
        const div = document.createElement("div");
        div.className = "grid grid-cols-11 border-b text-center";
        div.innerHTML= `
            <p>${row.Model || ""}</p>
            <p>${row.Year || ""}</p>
            <p>${row.Region || ""}</p>
            <p>${row.Color || ""}</p>
            <p>${row.FuelType || ""}</p>
            <p>${row.Transmission || ""}</p>
            <p>${cleanNumber(row.EngineSize)}</p>
            <p>${cleanNumber(row.MileageKM)}</p>
            <p>${cleanNumber(row.PriceUSD)}</p>
            <p>${cleanNumber(row.SalesVolume)}</p>
            <p>${row.SalesClassification || ""}</p>
        `;
        
        container.appendChild(div);
    });
}

bmw(0, "databmw");

