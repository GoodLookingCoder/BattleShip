const arrToIterate = []

for (let i = 0; i < 100; i++) {
    arrToIterate.push(i)
}

export const hoverStyles = (i, x, selectedShip, axis) => {
    if(x===null) return
    if(axis==="x"){
        if(selectedShip === "carrier"){
            if(i >= x && i < x+5) {
                return {
                    backgroundColor: "lightgrey"
                }
            }
        }else if(selectedShip === "battleship"){
            if(i >= x && i < x + 4 ) {
                return {
                    backgroundColor: "lightgrey"
                }
            }
        }else if(selectedShip === "destroyer"){
            if(i >= x && i < x + 3 ) {
                return {
                    backgroundColor: "lightgrey"
                }
            }
        }else if(selectedShip === "submarine"){
            if(i >= x && i < x + 3 ) {
                return {
                    backgroundColor: "lightgrey"
                }
            }
        }else if(selectedShip === "patrol"){
            if(i >= x && i < x + 2 ) {
                return {
                    backgroundColor: "lightgrey"
                }
            }
        }
    }else{
        if(selectedShip === "carrier"){
            if(i === x || i === x + 10 || i === x + 20 || i === x + 30 || i=== x + 40) {
                return {
                    backgroundColor: "lightgrey"
                }
            }
        }else if(selectedShip === "battleship"){
            if(i === x || i === x + 10 || i === x + 20 || i === x + 30) {
                return {
                    backgroundColor: "lightgrey"
                }
            }
        }else if(selectedShip === "destroyer"){
            if(i === x || i === x + 10 || i === x + 20) {
                return {
                    backgroundColor: "lightgrey"
                }
            }
        }else if(selectedShip === "submarine"){
            if(i === x || i === x + 10 || i === x + 20) {
                return {
                    backgroundColor: "lightgrey"
                }
            }
        }else if(selectedShip === "patrol"){
            if(i === x || i === x + 10) {
                return {
                    backgroundColor: "lightgrey"
                }
            }
        }
    }
}

export const isAllowed = (start, numOfPositions, axis) => {
    if(numOfPositions === 5){
        if(axis==="x"){
            if(Number(start.toString()[start.toString().length - 1]) < 6) return true
        }else {
            if(start + 50 <= 109) return true
        }
    }else if(numOfPositions === 4){
        if(axis==="x"){
            if(Number(start.toString()[start.toString().length - 1]) < 7) return true
        }else{
            if(start + 40 <= 109) return true
        }
    }else if(numOfPositions === 3){
        if(axis==="x"){
            if(Number(start.toString()[start.toString().length - 1]) < 8) return true
        }else{
            if(start + 30 <= 109) return true
        }
    }else if(numOfPositions === 2){
        if(axis==="x"){
            if(Number(start.toString()[start.toString().length - 1]) < 9) return true
        }else{
            if(start + 20 <= 109) return true
        }
    }
}

export default arrToIterate



