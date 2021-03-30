import {isAllowed} from "../board/utils"

export const generateRandomLocs = () => {
    const locations = []

    for (let i = 0; i < 4; i++) {
        if(i===0){
            let randomStart = generateRandomNum()
            let axis;
            
            if(randomStart % 2 === 0) axis = "x"
            else axis = "y"
            
            while(!isAllowed(randomStart, 5, axis, locations)){
                randomStart =  generateRandomNum()
            }   
            if(axis==="x")locations.push(randomStart, randomStart+1,randomStart+2,randomStart+3,randomStart+4)
            else locations.push(randomStart, randomStart+10,randomStart+20,randomStart+30,randomStart+40)
        
        }else if(i===1){
            let randomStart = generateRandomNum()
            let axis;
            
            if(randomStart % 2 === 0) axis = "x"
            else axis = "y"

            while(!isAllowed(randomStart, 4, axis, locations)){
                randomStart =  generateRandomNum()
            }   
            
            if(axis==="x")locations.push(randomStart, randomStart+1,randomStart+2,randomStart+3)
            else locations.push(randomStart, randomStart+10,randomStart+20,randomStart+30)
        
        }else if(i===2){
            for (let i = 0; i < 2; i++) {
                let randomStart = generateRandomNum()
                let axis;
            
                if(randomStart % 2 === 0) axis = "x"
                else axis = "y"

                while(!isAllowed(randomStart, 3, axis, locations)){
                    randomStart =  generateRandomNum()
                }   
        
                if(axis==="x")locations.push(randomStart, randomStart+1,randomStart+2)                
                else locations.push(randomStart, randomStart+10,randomStart+20)
            }
        }else if(i===3){
            let randomStart = generateRandomNum()
            let axis;
            
            if(randomStart % 2 === 0) axis = "x"
            else axis = "y"

            while(!isAllowed(randomStart, 2, axis, locations)){
                randomStart =  generateRandomNum()
            }   
    
            if(axis==="x")locations.push(randomStart, randomStart+1)
            else locations.push(randomStart, randomStart+10)
        }
    }


    return locations
}

const generateRandomNum = () => Math.floor(Math.random() * 100)