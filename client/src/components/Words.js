import Word from './Word'
 
const Words = ({ quote, field }) => {

    const quoteArray = quote.split(" ")
    const fieldArray = field.split("")
    const fieldWordArray = field.split(" ")
    const charArray = quote.split("")


    return (
        <div className="words">
            {quoteArray.map((word) => {
               return (
                <Word word={word} fieldArray={fieldArray} charArray={charArray} quoteArray={quoteArray} fieldWordArray={fieldWordArray} />
               )
        })}
        
        </div>
    )

}

export default Words