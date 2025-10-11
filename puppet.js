import puppeteer from 'puppeteer';
import fs from 'fs';
import nodemailer from 'nodemailer';
import path from 'path';
import PDFDocument from 'pdfkit';

(async () => {
  try {
    // -----------------------------
    // 🧭 STEP 1: Launch Puppeteer
    // -----------------------------
    const browser = await puppeteer.launch({ headless: true });
    const pageObj = await browser.newPage();
    await pageObj.setViewport({ width: 1280, height: 800 });

    // Add screenshot token to URL
    const SCREENSHOT_TOKEN = 'YOUR_SECRET_TOKEN_HERE_12345'; // Match the token in PaymentGate
    await pageObj.goto(
      `https://luther.health/Health-Audit.html#anaesthesia-risk-screener-results?screenshot_token=${SCREENSHOT_TOKEN}`,
      {
        waitUntil: 'networkidle0', // Wait for network to be idle
        timeout: 30000
      }
    );

    // Wait for content to load
    await pageObj.waitForSelector('.container', { timeout: 10000 });

    // Additional wait for any animations
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Take screenshot
    const screenshotPath = path.resolve('./screenshot.png');
    await pageObj.screenshot({ path: screenshotPath, fullPage: true });

    await pageObj.close();
    await browser.close();
    console.log('✅ Screenshot captured');

    // -----------------------------
    // 🧾 STEP 2: Convert Screenshot to PDF
    // -----------------------------
    const pdfPath = path.resolve('./page-capture.pdf');
    const doc = new PDFDocument({ autoFirstPage: false });

    const stream = fs.createWriteStream(pdfPath);
    doc.pipe(stream);

    const img = doc.openImage(screenshotPath);
    doc.addPage({ size: [img.width, img.height] });
    doc.image(img, 0, 0);

    doc.end();

    await new Promise(resolve => stream.on('finish', resolve));
    console.log('✅ PDF created:', pdfPath);

    // -----------------------------
    // 📤 STEP 3: Send Email with PDF
    // -----------------------------
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'tehmanhassan@gmail.com',
        pass: 'svnt xvfz fgee jbgy'
      }
    });

    const mailOptions = {
      from: '"Luther Health Bot" <tehmanhassan@gmail.com>',
      to: 'tehmanfast@gmail.com',
      subject: 'Luther Health Page PDF',
      text: 'Here is the PDF generated from the page.',
      attachments: [
        {
          filename: 'page-capture.pdf',
          path: pdfPath
        }
      ]
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Email sent:', info.messageId);

  } catch (err) {
    console.error('❌ Error:', err);
  }
})();