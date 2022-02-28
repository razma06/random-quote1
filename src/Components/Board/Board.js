import React from 'react'
import "./Board.css"
// import variables from './Board.scss'
import { useState, useEffect } from 'react';

var k = 0;
export default function Board() {
    const colors = ["#181D31", "#864879", "#1F1D36", "#3F3351", "#512D6D"]
    const [quoteAuthor, setQuoteAuthor] = useState({ quote: '', author: '' });
    const [color, setColor] = useState(colors[k]);


    function fetchRandomData() {
        fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json').then(async (response) => {
            const data = await response.json();
            const quotes = await data.quotes;
            const random = await quotes[Math.floor(Math.random() * quotes.length)]
            setQuoteAuthor({ quote: random.quote, author: random.author })
        })
    }

    useEffect(() => {
        fetchRandomData();
    }, [])

    function handleClick() {
        k = (k + 1) % (colors.length - 1)
        console.log(k);
        setColor(colors[k]);
        fetchRandomData();
    }


    return (
        <div className="wrapper" style={{ backgroundColor: `${color}` }}>
            <div className="board" style={{ color: `${color}` }}>
                <h1 className="quote">{quoteAuthor.quote}</h1>
                <p className="name">- {quoteAuthor.author}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: "2rem" }}>
                    <section>
                        <button style={{ backgroundColor: `${color}` }}>Twitter</button>
                        <button style={{ backgroundColor: `${color}`, marginLeft: ".5rem" }}>Tumbrl</button>
                    </section>

                    <section>
                        <button onClick={handleClick} style={{ backgroundColor: `${color}` }}>New quote</button>
                    </section>
                </div>
            </div>
        </div >
    )
}
