import * as fs from "fs";

import { sendTeamsMessage } from "./libs/sendmessage.js";

import Mustache from "mustache";

const ADDITIONAL_MESSAGE = process.env.ADDITIONAL_MESSAGE;

const config = {
  WEBHOOK_URL: process.env.WEBHOOK_URL,
  BRANCH: process.env.BRANCH,
  PROJECT: process.env.PROJECT,
  BUILD_STATUS: process.env.BUILD_STATUS,
  COMMIT_AUTHOR: process.env.COMMIT_AUTHOR,
  COMMIT_AUTHOR_EMAIL: process.env.COMMIT_AUTHOR_EMAIL,
  COMMIT_TIMESTAMP: process.env.COMMIT_TIMESTAMP,
};

for (const variable in config) {
  if (!config[variable]) {
    throw new Error(variable + " must be defined");
  }
}

const template = JSON.parse(
  fs.readFileSync("./templates/generic.json", "utf8")
);

if (ADDITIONAL_MESSAGE) {
  const additionalJson = JSON.parse(ADDITIONAL_MESSAGE);

  await template.attachments[0].content.body.push({
    type: "TextBlock",
    text: additionalJson.text,
    wrap: "true",
    style: "heading",
    color: additionalJson.color || "default",
    weight: "Bolder",
    size: "ExtraLarge",
  });

  if (additionalJson.url) {
    await template.attachments[0].content.body.push({
      type: "Container",
      items: [
        {
          type: "ActionSet",
          actions: [
            {
              type: "Action.OpenUrl",
              title: "Open URL",
              style: "positive",
              url: additionalJson.url,
            },
          ],
        },
      ],
    });
  }
}

const parsedCard = await Mustache.render(JSON.stringify(template), config);

sendTeamsMessage(config.WEBHOOK_URL, JSON.parse(parsedCard));
