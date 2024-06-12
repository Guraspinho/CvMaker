const puppeteer = require('puppeteer');
const fs = require('fs').promises;
// const Resume = require('../models/resumes');
const path = require('path'); 


async function convertToPdf(req,res)
{
	
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	try
	{
		// Construct absolute paths to the files
		const htmlPath = path.join('utils/template1', 'index.html');
		const cssPath = path.join('utils/template1', 'style.css');
		const jsPath = path.join('utils/template1', 'script.js');


		// Read HTML, CSS, and JS files asynchronously
		const htmlContent = await fs.readFile('utils//template1/index.html', 'utf8');
		const cssContent = await fs.readFile('utils//template1/style.css', 'utf8');
		const jsContent = await fs.readFile('utils/templates/template1/script.js', 'utf8');
			
		const combinedContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resume</title>
        <style>${cssContent}</style>
      </head>
      <body>
        ${htmlContent}
        <script>${jsContent}</script>
      </body>
      </html>`;
	
	
		await page.setContent(combinedContent);
	
		console.log('page content set');
		const pdf = await page.pdf({format: 'A4'});
		return pdf;
	}
	catch(error)
	{
		console.error('Error reading files:', error);
	}
	finally
	{
		await browser.close();
	}
}


module.exports = {convertToPdf};





