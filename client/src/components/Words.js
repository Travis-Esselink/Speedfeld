import Word from './Word'
 
const Words = ({ quote, field }) => {

    const quoteArray = quote.split(" ")
    const fieldArray = field.split("")
    console.log(fieldArray)

    return (
        <div className="words">
            {quoteArray.map((word) => {
               return (
                <Word word={word} />
               )
        })}
        
        </div>
    )

}

export default Words