import Letter from './Letter'


const Word = ({ word, fieldArray, charArray, quoteArray, fieldWordArray }) => {

    const wordArray = word.split("")

    return (
        <div className="word">

            {wordArray.map((letter, letterIndex) => {
        
                    return (
                        <Letter 
                        letterIndex={letterIndex} charArray={charArray} letter={letter} fieldArray={fieldArray}></Letter>
                    )
                }
            )}

        </div>
    )

}

export default Word