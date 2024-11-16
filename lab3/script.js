document.addEventListener("DOMContentLoaded", function() {
    // Request location and notification permissions
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(() => {}, () => {});
    }
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }

    let map = L.map('map').setView([53.430127, 14.564802], 18);
    L.tileLayer.provider('Esri.WorldImagery').addTo(map);

    document.getElementById("getLocation").addEventListener("click", function() {
        if (!navigator.geolocation) {
            console.log("No geolocation.");
            return;
        }

        navigator.geolocation.getCurrentPosition(position => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            map.setView([lat, lon]);
            // L.marker([lat, lon]).addTo(map).bindPopup(`Lat: ${lat}, Lon: ${lon}`).openPopup();
        }, positionError => {
            console.error(positionError);
        });
    });

    document.getElementById("saveButton").addEventListener("click", function() {
        leafletImage(map, function (err, imageCanvas) {
            let rasterMap = document.getElementById("rasterMap");
            let rasterContext = rasterMap.getContext("2d");
            rasterContext.drawImage(imageCanvas, 0, 0, 600, 300);

            // Split the raster map into 16 pieces
            let pieces = [];
            for (let y = 0; y < 4; y++) {
                for (let x = 0; x < 4; x++) {
                    let pieceCanvas = document.createElement("canvas");
                    pieceCanvas.width = 150;
                    pieceCanvas.height = 75;
                    let pieceContext = pieceCanvas.getContext("2d");
                    pieceContext.drawImage(rasterMap, x * 150, y * 75, 150, 75, 0, 0, 150, 75);
                    pieces.push({canvas: pieceCanvas, destIndex: y * 4 + x});
                }
            }

            // Shuffle pieces
            pieces = pieces.sort(() => Math.random() - 0.5);

            // Place pieces on the table
            let table = document.getElementById("table");
            table.innerHTML = "";
            pieces.forEach((piece, index) => {
                let pieceDiv = document.createElement("div");
                pieceDiv.className = "piece";
                pieceDiv.id = `piece-${index}-${piece.destIndex}`;
                pieceDiv.style.position = "absolute";
                pieceDiv.style.left = `${(index % 4) * 150}px`;
                pieceDiv.style.top = `${Math.floor(index / 4) * 75}px`;
                pieceDiv.appendChild(piece.canvas);
                pieceDiv.draggable = true;
                pieceDiv.addEventListener("dragstart", dragStart);
                table.appendChild(pieceDiv);
            });

            // Create drop zones on the canvas
            let canvas = document.getElementById("canvas");
            canvas.innerHTML = "";
            for (let y = 0; y < 4; y++) {
                for (let x = 0; x < 4; x++) {
                    let dropZone = document.createElement("div");
                    dropZone.className = "drop-zone";
                    dropZone.id = `drop-${y * 4 + x}`;
                    dropZone.style.position = "absolute";
                    dropZone.style.left = `${x * 150}px`;
                    dropZone.style.top = `${y * 75}px`;
                    dropZone.style.width = "150px";
                    dropZone.style.height = "75px";
                    dropZone.addEventListener("dragover", dragOver);
                    dropZone.addEventListener("drop", drop);
                    canvas.appendChild(dropZone);
                }
            }
        });
    });

    function dragStart(event) {
        event.dataTransfer.setData("text/plain", event.target.id);
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        let id = event.dataTransfer.getData("text/plain");
        let draggedElement = document.getElementById(id);
        let dropTarget = event.target.closest(".drop-zone");

        if (dropTarget && dropTarget !== draggedElement && !dropTarget.querySelector(".piece")) {
            dropTarget.appendChild(draggedElement);
            draggedElement.style.position = "absolute";
            draggedElement.style.left = "-1px";
            draggedElement.style.top = "-1px";
            draggedElement.style.border = "none";
            // dropTarget.style.border = "none";
        }
        checkCompletion();
    }
    function checkCompletion() {
        let pieces = document.querySelectorAll(".drop-zone .piece");
        if (pieces.length !== 16) return;

        let correct = true;
        pieces.forEach((piece, index) => {
            let x = parseInt(piece.parentElement.style.left) / 150;
            let y = parseInt(piece.parentElement.style.top) / 75;
            let destinedPosition = parseInt(piece.id.split("-")[2]);
            if (x + y * 4 !== destinedPosition) {
                correct = false;
            }
        });
        if (correct) {
            console.log("Puzzle completed!");
            new Notification("Puzzle completed!");
        }
    }
});