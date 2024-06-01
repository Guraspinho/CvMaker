const puppeteer = require('puppeteer');

async function convertToPdf(req,res)
{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(        
        `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Name - Resume</title>
          <style>
            body
            {
                background-color: orange;
            }
            .header
            {
                background-color: white;
                padding: 20px;
                text-align: center;
            }
            .content
            {
                padding: 20px;
            }
            .h3
            {
                margin-top: 50px;
            }
          </style>
          </head>
        <body>
          <header class="header">
            <h1>Your Name</h1>
            <p class="contact">
              <a href="mailto:youremail@example.com">youremail@example.com</a> | +123 456 7890
            </p>
          </header>
          <main class="content">
            <section class="section experience">
              <h2>Experience</h2>
              <ul>
                <li>
                  <h3>Job Title</h3>
                  <h4>Company Name - City, State</h4>
                  <p>Start Date - End Date</p>
                  <ul>
                    <li>List accomplishment 1</li>
                    <li>List accomplishment 2</li>
                  </ul>
                </li>
                </ul>
            </section>
            <section class="section education">
            <button>some random button</button>
            <a href="https://www.w3schools.com">Visit W3Schools.com!</a>
              <h2>Education</h2>
              <ul>
                <li>
                  <h3>Degree</h3>
                  <h4>University Name - City, State</h4>
                  <p>Graduation Year</p>
                </li>
                </ul>
            </section>
            </main>
        </body>
        </html>
        `
    );

    console.log('page content set');
    const pdf = await page.pdf({format: 'A4'});

    await browser.close();


    return pdf;
}


module.exports = {convertToPdf};


//create a style that makes background colour orange
