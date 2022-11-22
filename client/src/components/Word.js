import Letter from './Letter'

const Word = ({ word }) => {

    const wordArray = word.split("")


    return (
        <div className="word">

            {wordArray.map((letter) => {
                return (
                    <Letter letter={letter}></Letter>
                )
            })}

        </div>
    )

}

export default Word