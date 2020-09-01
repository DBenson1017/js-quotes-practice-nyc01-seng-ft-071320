

document.addEventListener('DOMContentLoaded', function(){
    let quoteContainer = document.querySelector('#quote-list')
    let form = document.querySelector('#new-quote-form')
    let deleteURL = 'http://localhost:3000/quotes/'

    // grab input from form 
    document.addEventListener("submit", function(e){
        e.preventDefault()
        console.log('click registered')
        console.log(e.target)
        if (e.target.id === 'new-quote-form'){
            console.log('submit click confirmed')
            let newQuote = form.quote.value
            let newAuthor = form.author.value
            postQuote(newQuote, newAuthor) 
        }
    }) // end of submit listener

    //click handler (likes)
    document.addEventListener('click', function(e){
        // let bttn = e.target 
        console.log(e.target)
        if (e.target.matches('.btn-success')){
            console.log('like button pressed')
            let li = e.target.closest('li')
            console.log(li.dataset.id)
            let Id= li.dataset.id
            addLike(Id)

        } else if ( e.target.matches('.btn-danger')){
            console.log("delete button pressed" )
            let li = e.target.closest('li')
            console.log(li.dataset.id)
            let Id= li.dataset.id
            // deleteQ(Id)

        }
    })

    function addLike(){

    }// end of like 

    function deleteQ(Id){
        console.log('entered delete quote function')

        let options = {
            method: 'DELETE'
        }

        fetch(deleteURL + Id, options)

    }// end of delete 
 

const getQuotes = () => {
    fetch('http://localhost:3000/quotes?_embed=likes')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            iterateQuotes(data)
        })
    } // end of getquotes


const iterateQuotes = (data) => {
    data.forEach(quote => renderQuotes(quote))
} // end of iterateQuotes 

const renderQuotes = (quote) => {
    console.log(quote.likes.length)
    let content = quote.quote
    let author = quote.author
    //the value that renders the likes in the span 
    let likes = quote.likes.length
    let id = quote.id

    // creates the quote-card 
    let quoteCard = document.createElement('li')
    quoteCard.setAttribute('class','quote-card')
    quoteCard.setAttribute('data-id',id )
    quoteCard.innerHTML=`<blockquote class="blockquote">
            <p class="mb-0">${content}</p>
            <footer class="blockquote-footer">${author}</footer>
        <br>
            <button class='btn-success'>Likes: <span>${likes}</span></button>
            <button class='btn-danger'>Delete</button>
        </blockquote>`
     quoteContainer.append(quoteCard)
} // end of renderQuotes 

function postQuote(newQuote, newAuthor){
                    console.log('entered new post function')
    let configObj = {
        method: 'POST',
        headers: {
            'content-type':'application/json',
            'accept':'application/json'
        },
        body: JSON.stringify({quote: newQuote, author: newAuthor})
    }

    fetch('http://localhost:3000/quotes/', configObj)
        .then(function (response){
            return response.json()
        })
        .then(function (creation){
            console.log(creation)
        })
        getQuotes()
} // end of post/create request 























getQuotes() // original content pull request 
}) // end of DOM Content 