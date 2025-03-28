const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const puppeteer = require("puppeteer");
const userAgent = require("user-agents");

const router = express.Router();

let browser;
let page;
let activeConnections = 0;

// Function to launch Puppeteer once
const launchBrowser = async () => {
  if (!browser) {
    browser = await puppeteer.launch({
      headless: false,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-extensions",
        "--disable-popup-blocking",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    });
    page = await browser.newPage();
    await page.setUserAgent(userAgent.random().toString());
    await page.goto("https://gemini.google.com/app", {
      waitUntil: "networkidle2",
    });
  }
};

// Route to handle user input
router.get("/", authMiddleware, async (req, res) => {
  try {
    const message = req.query.message;
    if (!message) {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    await launchBrowser(); // Ensure browser is running

    activeConnections++; // Track active connections

    await page.waitForSelector(".ql-container");

    await page.evaluate((msg) => {
      const quillInstance = window.Quill?.find(
        document.querySelector(".ql-container")
      );

      if (quillInstance) {
        quillInstance.setSelection(quillInstance.getLength());
        quillInstance.insertText(quillInstance.getLength(), msg, "user");
      } else {
        console.error("Quill instance not found!");
      }

      const sendButton = document.querySelector(
        ".mdc-icon-button.mat-mdc-icon-button.mat-mdc-button-base.send-button.submit.mat-unthemed"
      );

      if (sendButton) {
        sendButton.click();
      } else {
        console.error("Send button not found!");
      }
    }, message);

    let prevText = "";
    let newText = "";

    await page.waitForSelector(".markdown.markdown-main-panel");

    while (true) {
      prevText = newText;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      newText = await page.evaluate(() => {
        const panel = document.getElementsByClassName(
          "presented-response-container"
        );
        return panel[0]?.innerHTML || "";
      });

      if (prevText === newText) {
        break;
      }
    }

    return res.json({ newText });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Handle frontend disconnection
router.post("/disconnect", async (req, res) => {
  activeConnections--;
  if (activeConnections <= 0 && browser) {
    await browser.close();
    browser = null;
    console.log("Puppeteer browser closed.");
  }
  res.json({ message: "Disconnected successfully" });
});

module.exports = router;
