const express = require("express");
const translate = require("google-translate-api-x");
const authMiddleware = require("../middleware/authMiddleware");
const puppeteer = require("puppeteer");
const userAgent = require("user-agents");
const Chat = require("../models/chats");
const User = require("../models/user");

const router = express.Router();

let browser;
let page;
let activeConnections = 0;
let currentPanel = 0;

// Function to launch Puppeteer once
const launchBrowser = async () => {
  if (!browser) {
    browser = await puppeteer.launch({
      headless: true,
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

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { chatId, userMessage } = req.body;
    const userId = req.user?.id;
    const user = await User.findById(userId);
    const target = user.languageToLearn;
    const native = user.nativeLanguage;
    console.log(userMessage);

    const message = `translate this word into ${target} and give me 10 scentnces that uses this word and thier translation youre entire response should be in ${native} word is ${userMessage}`;
    const result = await translate(message, { to: native });

    await launchBrowser();

    activeConnections++;

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
    }, result.text);

    let prevText = "";
    let newText = "";

    await page.waitForSelector(".markdown.markdown-main-panel");

    while (true) {
      prevText = newText;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      newText = await page.evaluate((panelIndex) => {
        const panels = document.getElementsByClassName(
          "presented-response-container"
        );
        return panels[panelIndex]?.innerHTML || "";
      }, currentPanel);

      if (prevText === newText) {
        currentPanel++;
        break;
      }
    }

    let chat;
    const newMessage = {
      message: userMessage,
      response: newText,
      key: Date.now(),
      userMessage: message,
    };

    if (chatId) {
      chat = await Chat.findById(chatId);
      if (chat) {
        chat.messages.push(newMessage);
        await chat.save();
      } else {
        chat = await Chat.create({
          userId,
          messages: [newMessage],
        });
        user.ChatsNumber++;
        await user.save();
      }
    } else {
      chat = await Chat.create({
        userId,
        messages: [newMessage],
      });
      user.ChatsNumber++;
      await user.save();
    }

    return res.json({ newText, chatId: chat._id });
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

router.get("/getUserChats", authMiddleware, async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: User ID missing" });
    }

    const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });

    res.json({ chats });
  } catch (error) {
    console.error("Error fetching chats:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getCurrentChat", authMiddleware, async (req, res) => {
  try {
    const { chatId } = req.query;

    if (!chatId) {
      return res.status(400).json({ error: "chatId is required" });
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    res.json(chat);
  } catch (error) {
    console.error("Error fetching chat:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
