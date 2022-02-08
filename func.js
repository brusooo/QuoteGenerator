let quotesData;
let val;

const bgColors = [
    "linear-gradient(to right, #373b44, #4286f4)",
    "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
    "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
    "linear-gradient(to right, #41295a, #2f0743)",
    "linear-gradient(to right, #000428, #004e92)",
    "linear-gradient(to right, #2c3e50, #4ca1af)",
    "linear-gradient(to right, #e53935, #e35d5b)",
    "linear-gradient(to right, #870000, #190a05)",
    "linear-gradient(to right, #616161, #9bc5c3)",
    "linear-gradient(to right, #2C5364, #203A43, #0F2027)",
    "linear-gradient(to right, #232526, #414345)",
    "linear-gradient(to right, #0f0c29, #302b63, #24243e)"
]

const getQuotes = () => {
    return $.ajax({
        url: 'https://raw.githubusercontent.com/brusooo/QuoteGenerator/master/quotes.json',
        success: function (jsonQuotes) {
            if (typeof jsonQuotes === 'string') {
                quotesData = JSON.parse(jsonQuotes);
            }
        }
    });
}

const getRandomQuote = () =>{
    return quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)]
}

const getQuote = () =>{
    let randomQuote = getRandomQuote();

    let currentQuote = randomQuote.quote;

    console.log(currentQuote.length)
    let currentAuthor = randomQuote.author;

    $(".tweet").attr(
        'href',
        'http://twitter.com/intent/tweet?hashtags=todayQuote&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
    );

    $('.quote').animate({ opacity: 0 }, 300, 
    function (){
        $(this).animate({ opacity: 1 }, 300)}
    );
    $(".quote").text(randomQuote.quote)


    $('.author').animate({ opacity: 0 }, 300, 
    function () {
        $(this).animate({ opacity: 1 }, 300)}
    );
    $(".author").text("- " + randomQuote.author)


    let randomBgColor = bgColors[Math.floor(Math.random() * bgColors.length)];
    $("html body").animate({
        color : "#FFF"
    },
    10,
    function(){
            $(this).css("background",randomBgColor)
    })

    $(".new_quote").css("background",randomBgColor)
    $(".tweet").css("background",randomBgColor)
    $(".copy").css("background",randomBgColor)
}




$(document).ready(function(){
    getQuotes().then(()=>getQuote())
});

$(".new_quote").click(function () {
    getQuote()
})

$(".copy").click(function(){
    let $temp = $("<input />");
    $("body").append($temp);
    val = ($(".quote").text().length )-1;
    $temp.val('"' + $(".quote").text().slice(0,val) + '" ' + $(".author").text().slice(2)).select();
    document.execCommand("copy");
    $temp.remove();


    $(this).css("transform","scale(0.85)")
    $(".tooltip").css("display","flex")

    $(this).animate({
        color: "#FFF"
    },150,function(){
            $(this).css("transform","scale(1)")
            $(".tooltip").css("display","none")
        }
    )
})


