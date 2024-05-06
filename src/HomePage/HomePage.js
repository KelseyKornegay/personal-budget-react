
import React from "react";

export default function HomePage() {
  return (
    <>
    {/* This link is hidden by default and becomes visible when it receives focus (e.g., when a user tabs to it). 
    It allows users to skip over navigation and other elements at the top of the page and go straight to the main content. */}
    <a href="#main" className="skip-link" style={{position: 'absolute', top: '-1000px'}}>Skip to content</a>

    {/* The main content area of the page. The role="main" attribute helps screen readers understand what this section of the page is for. */}
        <main className="center" id="main" role="main">

        {/* This div contains the main content of the page. The role="region" attribute and aria-label help screen readers understand what this section of the page is for. */}
        <div className="page-area" role="region" aria-label="Main Content">

            {/* Each article has a heading and a paragraph. The id on the heading and the aria-labelledby on the paragraph associate each paragraph with its heading, which can help screen readers provide more context to users. */}
            <article>
                <h1 id="track-heading">Stay on track </h1>
                <p aria-labelledby="track-heading">
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </article>

            <article>
                <h1 id="alerts-heading">Alerts</h1>
                <p aria-labelledby="alerts-heading">
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </article>

            <article>
                <h1 id="free-heading">Free</h1>
                <p aria-labelledby="free-heading">
                    This app is free!!! And you are the only one holding your data!
                </p>
            </article>
            
            <article>
                <h1 id="results-heading">Results</h1>
                <p aria-labelledby="results-heading">
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </article>
         
        </div>
    </main>
    </>
  );
}
