const arrToIterate = []

for (let i = 0; i < 100; i++) {
    arrToIterate.push(i)
}

export const hoverStyles = (i, x, selectedShip, axis) => {
    if(x===null) return
    if(axis==="x"){
        if(selectedShip === "carrier"){
            if(isAllowed(x, 5, "x")){
                if(i >= x && i < x+5) {
                    return {
                        backgroundColor: "lightgrey",
                        cursor: "pointer"
                    }
                }
            }else{
                if(x===i){
                    return {
                        backgroundColor: "#80000078"
                    }
                }
            }
        }else if(selectedShip === "battleship"){
            if(isAllowed(x, 4, "x")){
                if(i >= x && i < x + 4 ) {
                    return {
                        backgroundColor: "lightgrey",
                        cursor: "pointer"
                    }
                }
            }else{
                if(x===i){
                    return {
                        backgroundColor: "#80000078"
                    }
                }
            }
        }else if(selectedShip === "destroyer"){
            if(isAllowed(x, 3, "x")){
                if(i >= x && i < x + 3 ) {
                    return {
                        backgroundColor: "lightgrey",
                        cursor: "pointer"
                    }
                }
            }else{
                if(x===i){
                    return {
                        backgroundColor: "#80000078"
                    }
                }
            }
        }else if(selectedShip === "submarine"){
            if(isAllowed(x, 3, "x")){
                if(i >= x && i < x + 3 ) {
                    return {
                        backgroundColor: "lightgrey",
                        cursor: "pointer"
                    }
                }
            }else{
                if(x===i){
                    return {
                        backgroundColor: "#80000078"
                    }
                }
            }
        }else if(selectedShip === "patrol"){
            if(isAllowed(x, 2, "x")){
                if(i >= x && i < x + 2 ) {
                    return {
                        backgroundColor: "lightgrey",
                        cursor: "pointer"
                    }
                }
            }else{
                if(x===i){
                    return {
                        backgroundColor: "#80000078"
                    }
                }
            }
        }
    }else{
        if(selectedShip === "carrier"){
            if(isAllowed(x, 5, "y")){
                if(i === x || i === x + 10 || i === x + 20 || i === x + 30 || i=== x + 40) {
                    return {
                        backgroundColor: "lightgrey",
                        cursor: "pointer"
                    }
                }
            }else{
                if(x===i){
                    return {
                        backgroundColor: "#80000078"
                    }
                }
            }
        }else if(selectedShip === "battleship"){
            if(isAllowed(x, 4, "y")){
                if(i === x || i === x + 10 || i === x + 20 || i === x + 30) {
                    return {
                        backgroundColor: "lightgrey",
                        cursor: "pointer"
                    }
                }
            }else{
                if(x===i){
                    return {
                        backgroundColor: "#80000078"
                    }
                }
            }
        }else if(selectedShip === "destroyer"){
            if(isAllowed(x, 3, "y")){
                if(i === x || i === x + 10 || i === x + 20) {
                    return {
                        backgroundColor: "lightgrey",
                        cursor: "pointer"
                    }
                }
            }else{
                if(x===i){
                    return {
                        backgroundColor: "#80000078"
                    }
                }
            }
        }else if(selectedShip === "submarine"){
            if(isAllowed(x, 3, "y")){
                if(i === x || i === x + 10 || i === x + 20) {
                    return {
                        backgroundColor: "lightgrey",
                        cursor: "pointer"
                    }
                }
            }else{
                if(x===i){
                    return {
                        backgroundColor: "#80000078"
                    }
                }
            }
        }else if(selectedShip === "patrol"){
            if(isAllowed(x, 2, "y")){
                if(i === x || i === x + 10) {
                    return {
                        backgroundColor: "lightgrey",
                        cursor: "pointer"
                    }
                }                
            }else{
                if(x===i){
                    return {
                        backgroundColor: "#80000078"
                    }
                }
            }
        }
    }
}

const isCollision = (placedShipLocations, currentShipLocations) => {
    if(!placedShipLocations)return false
    if(!currentShipLocations.filter(location => placedShipLocations.includes(location)).length) return false
    return true
}

export const isAllowed = (start, numOfPositions, axis, shipLocations) => {
    if(numOfPositions === 5){
        if(axis==="x"){
            if(Number(start.toString()[start.toString().length - 1]) < 6 && !isCollision(shipLocations, [start, start+1, start+2,start+3,start+4])) return true
        }else {
            if(start + 50 <= 109 && !isCollision(shipLocations, [start, start+10, start+20,start+30,start+40])) return true
        }
    }else if(numOfPositions === 4){
        if(axis==="x"){
            if(Number(start.toString()[start.toString().length - 1]) < 7 && !isCollision(shipLocations, [start, start+1, start+2,start+3])) return true
        }else{
            if(start + 40 <= 109 && !isCollision(shipLocations, [start, start+10, start+20,start+30])) return true
        }
    }else if(numOfPositions === 3){
        if(axis==="x"){
            if(Number(start.toString()[start.toString().length - 1]) < 8 && !isCollision(shipLocations, [start, start+1, start+2])) return true
        }else{
            if(start + 30 <= 109 && !isCollision(shipLocations, [start, start+10, start+20])) return true
        }
    }else if(numOfPositions === 2){
        if(axis==="x"){
            if(Number(start.toString()[start.toString().length - 1]) < 9 && !isCollision(shipLocations, [start, start+1])) return true
        }else{
            if(start + 20 <= 109 && !isCollision(shipLocations, [start, start+10])) return true
        }
    }
}

export default arrToIterate



