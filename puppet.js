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

    await pageObj.goto('https://luther.health/Health-Audit.html#anaesthesia-risk-screener-results', {
      waitUntil: 'domcontentloaded',
      timeout: 0
    });

    // Wait 3 seconds
    await new Promise(resolve => setTimeout(resolve, 3000));

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

    // Add a page with the same dimensions as the screenshot
    const img = doc.openImage(screenshotPath);
    doc.addPage({ size: [img.width, img.height] });
    doc.image(img, 0, 0);

    doc.end();

    // Wait until PDF is fully written
    await new Promise(resolve => stream.on('finish', resolve));
    console.log('✅ PDF created:', pdfPath);

    // -----------------------------
    // 📤 STEP 3: Send Email with PDF
    // -----------------------------
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // e.g., smtp.gmail.com
      port: 465, // or 587 depending on your provider
      secure: true, // true for port 465, false for 587
      auth: {
        user: 'tehmanhassan@gmail.com', // your email
        pass: 'svnt xvfz fgee jbgy' // your email password or app password
      }
    });

    const mailOptions = {
      from: '"Luther Health Bot" <your_email@example.com>',
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

AnaesthesiaRiskResultsPage.tsx:

PaymentGate.tsx componetn:

import React, { useEffect, useState } from "react";

interface PaymentGateProps {
  children: React.ReactNode;
  requiredFunnel: string; // Which funnel this gate protects
  redirectUrl?: string;
}

export function PaymentGate({
  children,
  requiredFunnel,
  redirectUrl = "/payment-required"
}: PaymentGateProps) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // First, check if session_id is in URL (from Stripe redirect)
    const urlParams = new URLSearchParams(window.location.search);
    let urlSessionId = urlParams.get('session_id');

    // Also check in hash parameters (for SPA routing)
    if (!urlSessionId && window.location.hash.includes('?')) {
      const hashParams = new URLSearchParams(window.location.hash.split('?')[1]);
      urlSessionId = hashParams.get('session_id');
    }

    // If we have a session_id in URL, store it in sessionStorage
    if (urlSessionId) {
      sessionStorage.setItem("stripe_session_id", urlSessionId);
      console.log(`✅ Stored session ID from URL: ${urlSessionId}`);

      // Clean up URL by removing session_id parameter
      const hashBase = window.location.hash.split('?')[0];
      window.history.replaceState({}, document.title, window.location.pathname + hashBase);
    }

    // Now get session ID from sessionStorage
    const sessionId = sessionStorage.getItem("stripe_session_id");

    if (!sessionId) {
      setAllowed(false);
      setErrorMessage(`Payment required to access ${requiredFunnel} assessment`);
      setLoading(false);
      return;
    }

    // Check if user paid for this specific funnel
    fetch(`https://luther.health/api/check-payment?session_id=${sessionId}&funnel_type=${requiredFunnel}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.paid) {
          setAllowed(true);
          console.log(`✅ Access granted to ${requiredFunnel} funnel`);
        } else {
          setAllowed(false);
          setErrorMessage(`This payment doesn't include access to ${requiredFunnel}. Please purchase the correct assessment.`);
        }
      })
      .catch((err) => {
        console.error("Payment check failed:", err);
        setAllowed(false);
        setErrorMessage("Unable to verify payment. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [requiredFunnel, redirectUrl]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="ml-3">Verifying access...</p>
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-red-50 border border-red-200 rounded-lg text-center">
        <div className="text-red-600 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-red-800 mb-2">Access Denied</h3>
        <p className="text-red-700 mb-4">{errorMessage}</p>
        <button
          onClick={() => window.location.href = redirectUrl}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Purchase Access
        </button>
      </div>
    );
  }

  return <>{children}</>;
}