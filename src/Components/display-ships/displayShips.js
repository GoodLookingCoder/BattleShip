import "./displayShips.scss"
import Axis from "../axis/axis"


const ShipsContainer = ({
    selectedShip,
    setSelectedShip, 
    hasCarrierPLaced,
    hasBattleshipPLaced,
    hasDestroyerPLaced,
    hasSubmarinePLaced,
    hasPatrolPLaced,
    generateRFLocs,
    axis,
    changeAxis
}) => {
    return (
        <div className="ships-container">
            <div className="explination-fl">
                <p>- Click over a Ship to select it</p>
                <p>- Place it by clicking on the Board</p>
                <p>- Click the AXIS button to change the orientation of the ships</p>
                <p>- Click the RANDOMLY button to place your ships in random locations</p>
                <div className="buttons-container">
                    <Axis axis={axis} changeAxis={changeAxis}/>
                    <button className="randomin" onClick={generateRFLocs}>RANDOMLY</button>                
                </div>
            </div>
            <div className="ships-fl">
                <p>Carrier: </p>
                <div  className="ship carrier">
                    <div
                        style={{
                            display: "flex",
                            height: "3rem",
                            width: "15rem",
                            cursor: hasCarrierPLaced ? "default" : "pointer" 
                        }}
                    >
                        <svg
                            onClick={()=>hasCarrierPLaced? null : setSelectedShip("carrier")}
                            xmlns='http://www.w3.org/2000/svg'
                            width='100%'
                            height='100%'
                            viewBox='0 0 299 95'
                            fill={`${hasCarrierPLaced ? "gray" : selectedShip==="carrier"? "#bdffff" : "skyblue"}`}
                            preserveAspectRatio='none'
                        >
                            <path
                                d='M213.9 7.5c0 1.1 0 4.1.1 6.8.1 3.5-.3 4.9-1.4 5.3-.9.3-1.3 1-1 1.5.3.5-.2 1.2-1 1.5-.9.3-1.6 1.4-1.6 2.4 0 3.2-4.2 13-5.6 13-.9 0-1.4-1.7-1.6-5.3l-.3-5.2h-13l.3 5.1c.3 4 0 5.3-1.2 5.7-1 .4-1.6 1.9-1.6 4.2V46h-23v14H31v2.5c0 2 .5 2.5 2.5 2.5 1.6 0 2.5.6 2.5 1.5 0 1.3-2.3 1.5-14.5 1.5-16.4 0-15.9-.3-13 7.9 2.1 6.1 5.1 9.8 9.8 12.4l4.2 2.2 128.2.3L279 91l.6-2.7c1.4-6.4 3.9-13.2 7.3-19.8 2-3.9 3.7-7.3 3.9-7.7.2-.4-11.3-.9-25.5-1l-25.8-.3-.2-4c-.6-9.7-1.5-14.5-2.6-14.5-.9 0-1.1-1.3-.9-4l.4-4h-5c-3 0-5.4.5-5.9 1.3-.4.7-2 1.8-3.5 2.4-1.6.7-2.8 1.9-2.8 2.8 0 .8-.5 1.5-1.1 1.5-.7 0-1-3.3-1-9.8.1-12.3-.8-23.4-2-24.7-.6-.5-.9-.2-1 1z'
                            />
                        </svg>
                    </div>
                </div>
                <p>Battleship: </p>
                <div className="ship battleship">
                    <div
                        style={{
                            display: "flex",
                            height: "3rem",
                            width: "12rem",
                            cursor: hasBattleshipPLaced ? "default" : "pointer" 
                        }}
                    >
                        <svg
                            onClick={()=>hasBattleshipPLaced? null : setSelectedShip("battleship")} 
                            xmlns='http://www.w3.org/2000/svg'
                            width='100%'
                            height='100%'
                            viewBox='0 0 302 98'
                            fill={`${hasBattleshipPLaced ? "gray" : selectedShip==="battleship"? "#bdffff" : "skyblue"}`}
                            preserveAspectRatio='none'
                        >
                            <path
                                d='M215 6.5c-.2 1.1-.2 2.3-.1 2.7 0 .4.3 2.5.7 4.7.6 3.4.4 4.1-1 4.1-1.3 0-1.6.5-1.1 2 .4 1.4.2 2-.8 2s-1.5 1.1-1.5 3.2c-.1 1.8-.9 5.8-2 8.8-1.8 5.2-2.1 5.5-5.5 5.8-2.8.2-3.6.8-3.9 2.5-.2 1.2-1 2.3-1.9 2.5-1.2.2-2.4-2.6-5.5-13.3L188.5 18h-4.2c-6.1 0-6.9 1.4-7.8 12.7-1 14.8-.8 14.3-7 14.3-4.8 0-5.4.3-5.8 2.2-.4 2-.4 1.9-.6-.5-.1-2-.6-2.7-2.1-2.7-1.4 0-2-.7-2-2.1 0-1.5-.5-2-2.2-1.7-1.6.2-2.2.9-2 2 .2 1-.2 1.8-.8 1.8-.5 0-1 1.1-1 2.5 0 2.4-.3 2.5-5.4 2.5-4.9 0-5.5.2-5.8 2.2-.2 1.5-1.1 2.4-2.5 2.6-1.5.2-2.3 1-2.3 2.3 0 1.8-.9 1.9-23.2 1.9-12.8 0-23.9-.4-24.7-.9-2.2-1.4 2-4.7 7.4-5.7 5-.9 6.9-2.9 4-4-.9-.4-2.1 0-2.8 1-.9 1.3-2.4 1.7-5.7 1.4-6.5-.5-6.4-2.8.2-2.9 8.1-.2 2-1.7-6.7-1.7-8.4 0-14.9 1.5-7.2 1.7 5.4.1 6 1.2 1.7 2.8-1.9.7-3 1.8-3 3.1 0 2.1 2.2 4.5 3.4 3.7.3-.3.2 0-.3.6-.5.7-5 .9-12.7.6-6.6-.3-13.5-.6-15.4-.6-2.7-.1-3.1-.3-2-1.1.8-.5 2.7-1 4.2-1 1.7 0 3.1-.8 3.8-2 .8-1.5 2.1-2 5.5-2 4.6 0 6.5-1.4 4.6-3.3-.9-.9-1.6-.8-3.1.1-2.4 1.4-11 1.6-11 .2 0-.6 2-1 4.5-1s4.5-.5 4.5-1c0-1.3-20.7-1.3-21.5-.1-.3.6 1.6 1.1 4.2 1.3 4.7.3 4.7.4 2 1.6-1.5.6-3 1.9-3.4 2.8-.7 2 1 5 2.7 4.6.6-.1.9.2.5.8-.3.5-3.7 1-7.6 1H33v2.9c0 2.4.5 3 2.5 3.3 1.4.2 2.5.7 2.5 1.3 0 .6-5.7 1.1-14.5 1.3-8 .1-14.5.6-14.5 1 0 .5.7 3.1 1.5 6 1.9 6.3 5.7 10.9 11 13.3 3.8 1.8 9.9 1.9 131 1.9h127l1.7-6.4c1.7-6.5 8.3-21.1 9.9-22.2 2.9-1.8-.5-2.4-13-2.4-11.7 0-14-.2-14.5-1.6-.9-2.4-.9-2.4 4.2-2.5l4.7-.2-6-.8c-10.6-1.6-13-1.7-15.2-1.2-2.2.5-3.3 3.3-1.3 3.3.6 0 1 .7 1 1.5 0 1.2-1.3 1.5-5.5 1.5H240v-5.3c0-7.3-1-12.7-2.4-12.7-.7 0-1-1.4-.8-4l.4-4h-4.6c-4.7 0-8.1 1.3-10.2 3.9-.9 1.2-1.3.5-1.9-3.6-.4-2.9-.4-6.1 0-7.2.4-1.4-.1-3.1-1.4-5-1.3-1.8-2.1-4.6-2.2-7.3 0-2.3-.4-5.2-.9-6.3l-.9-2-.1 2z'
                            />
                        </svg>
                    </div>
                </div>
                <p>Destroyer:  </p>
                <div className="ship destroyer">
                    <div
                        style={{
                            display: "flex",
                            height: "3rem",
                            width: "9rem",
                            cursor: hasDestroyerPLaced ? "default" : "pointer" 
                        }}
                    >
                        <svg
                            onClick={()=>hasDestroyerPLaced? null :  setSelectedShip("destroyer")}
                            xmlns='http://www.w3.org/2000/svg'
                            width='100%'
                            height='100%'
                            viewBox='0 0 153 69'
                            fill={`${hasDestroyerPLaced ? "gray" : selectedShip==="destroyer"? "#bdffff" : "skyblue"}`}
                            preserveAspectRatio='none'
                        >
                            <path
                                d='M53.6 20.4c-.5 2-1.3 2.5-4.4 2.8l-3.7.3-1 9.2c-.5 5-1.3 9.5-1.7 9.8-.4.4-2.5.4-4.7 0-3.9-.6-4.1-.9-4.1-4.1 0-2.8-.4-3.5-2.6-4-1.4-.4-3-.2-3.7.5-.6.6-2.5 1.1-4.2 1.2l-3 .1 3.3.9c1.9.6 3.2 1.6 3.2 2.6 0 1.4-1.2 1.5-10.5.9-5.8-.4-10.5-.5-10.5-.2s2.8 4.1 6.2 8.6l6.1 8h58.2c32.1 0 59.7-.3 61.4-.6 2.7-.6 3.1-1.1 3.1-3.8 0-2.6.5-3.4 2.7-4.2 2.5-.9 2.6-1 .9-2.6-1.1-1.2-3.3-1.8-6.2-1.8-4.2 0-5.9-1.2-3.1-2.3.6-.3.3-.6-.8-.7-1.7-.2-1.6-.3.5-.9 2.1-.7 1.7-.9-2.7-1.5-6.1-.9-7.3-.4-7.3 3 0 2.3-.2 2.4-7.5 2.4s-7.5-.1-7.5-2.5c0-2 .5-2.5 2.6-2.5 4.6 0 2-2.5-2.9-2.8-4.4-.3-4.7-.5-4.7-3.1 0-1.7-.7-3.1-1.6-3.5-2.5-1-6.2-.7-7 .5-.3.6-1.9.9-3.5.7-1.5-.3-2.6-.1-2.3.4.3.4 1.3.8 2.2.9 1.4 0 1.3.2-.3.9-1.7.7-1.7.9-.2.9.9.1 1.7.6 1.7 1.1 0 .7-2.2 1-5.7.8l-5.8-.3-.7-4.4c-.4-2.4-.9-4.5-1.1-4.7-.1-.2-2.2-.4-4.6-.6l-4.3-.3-1.7 5.3c-.9 3-2 5.3-2.5 5.3s-2-3.7-3.3-8.2c-1.3-4.5-2.6-8.6-2.9-9.1-.3-.4-2-.8-3.9-.8-2.6 0-3.4.5-3.9 2.4z'
                            />
                        </svg>
                    </div>
                </div>
                <p>Submarine: </p>
                <div className="ship submarine">
                    <div
                        style={{
                            display: "flex",
                            height: "3rem",
                            width: "9rem",
                            cursor: hasSubmarinePLaced ? "default" : "pointer" 
                        }}
                    >
                        <svg
                            onClick={()=>hasSubmarinePLaced? null: setSelectedShip("submarine")} 
                            xmlns='http://www.w3.org/2000/svg'
                            width='100%'
                            height='100%'
                            viewBox='0 0 302 98'
                            fill={`${hasSubmarinePLaced ? "gray" : selectedShip==="submarine"? "#bdffff" : "skyblue"}`}
                            preserveAspectRatio='none'
                        >
                            <path
                                d='M147.3 20.7l.2 4.8-5.1-.3c-6.1-.4-6.9.4-7.8 7.8-.4 3-.9 7-1.2 8.7l-.6 3.3h-11.9c-7.4 0-12-.4-12.5-1.1-.4-.7-2.2-.9-4.8-.5-2.2.3-4.9.6-5.8.5-2.7-.1-10.6 0-12.5.1-1 0-3.3-.2-5.1-.6-1.9-.4-4.3-.2-5.5.4-1.2.6-4.8 1.3-8 1.6-7.7.6-13.8 4.2-16.5 9.7-1.2 2.3-1.9 4.6-1.6 5.1.3.4 49.8.8 110.1.8h109.5l-.6-2.7c-.5-1.7-.3-2.9.6-3.5 1.1-.6 1-1-.1-1.7-.9-.6-1.1-1.8-.7-3.5.6-2.5.5-2.6-3.9-2.6H259V30h-17.9l-1.5 5.2c-.8 2.9-2.1 7.4-2.8 10-1.3 5.2-1.7 5.4-9 4.2-2.8-.5-3.8-1.1-3.8-2.5 0-1.6-.8-1.9-5.1-1.9-3.5 0-5.5.5-6.3 1.5-1 1.4-2.4 1.4-10.1.6-5-.5-15.4-1.3-23.2-1.6l-14.2-.7-6.2-9.4c-4.1-6.3-6.8-9.4-8-9.4-1.6 0-1.9-.8-1.9-5 0-2.8-.4-5-1-5-.5 0-.9 2.1-.7 4.7z'
                            />
                        </svg>
                    </div>
                </div>
                <p >Patrol: </p>
                <div style={{borderBottom: "none"}} className="ship patrol">
                    <div
                        style={{
                            display: "flex",
                            height: "3rem",
                            width: "6rem",
                            cursor: hasPatrolPLaced ? "default" : "pointer" 
                        }}
                    >
                        <svg
                            onClick={()=>hasPatrolPLaced? null: setSelectedShip("patrol")}
                            xmlns='http://www.w3.org/2000/svg'
                            width='100%'
                            height='100%'
                            viewBox="0 0 112 60"
                            fill={`${hasPatrolPLaced ? "gray" : selectedShip==="patrol"? "#bdffff" : "skyblue"}`}
                            preserveAspectRatio='none'
                        >
                            <path
                                d='M59.9 6.7c0 .4 0 5.9.1 12 .1 9.3-.1 11.3-1.3 11.3-.8 0-1.7-.7-2.1-1.5-.9-2.5-8-1.9-11 .9-1.5 1.3-2.6 2.8-2.6 3.5 0 .8-4.9 1.1-16.5 1.1H10l.1 4.2c0 2.4.8 7.2 1.7 10.8l1.7 6.5 38.9.3c28.7.2 39.2-.1 40.3-1 1.4-1.1 8.7-13.2 9.9-16.2.5-1.3-.4-1.6-5.5-1.6h-6L90 32.9c-.7-2.3-.9-5.1-.6-6.2.3-1.3-.1-2.1-1.5-2.4-1-.3-1.9-1.3-1.9-2.2-.1-1.4-.2-1.4-1.4.1-1.7 2.3-9.6 2.5-9.6.3 0-.9-1-1.5-2.7-1.6l-2.8-.1 3-.7 3-.6-4.3-1.3c-5.1-1.6-6.2-1-6.2 2.9 0 1.7-.7 3.8-1.6 4.6-1.4 1.5-1.5.7-1.3-8.7.2-7.4 0-10.5-.9-10.8-.7-.2-1.2 0-1.3.5z'
                            />
                        </svg>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default ShipsContainer