import React, {useState, useEffect} from 'react'
import "./coments.scss"

const Coments = ({comment}) => {
    const [hudMessage, setHudMessage] = useState("")

	const handleHudSet = (message) => {
		setHudMessage('');
		const messageArray = message.split('');
		let counter = 0;
		const messageDisplay = [];
		const typingMessageEmulator = setInterval(() => {
			messageDisplay.push(messageArray[counter]);
			setHudMessage(messageDisplay.join(''));
			counter++;
			if (counter >= messageArray.length) clearInterval(typingMessageEmulator);
		}, 30);
	};

	useEffect(() => {
		if (comment) handleHudSet(comment);
	}, [comment]);

    return (
        <div className="coments">
            {hudMessage}
        </div>
    )
}

export default Coments
