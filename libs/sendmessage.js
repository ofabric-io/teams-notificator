import axios from "axios";

export async function sendTeamsMessage(webhookUrl, cardTemplate) {
  try {
    const response = await axios.post(webhookUrl, cardTemplate);

    if (response.status === 200) {
      console.log("Message sent!");
    } else {
      console.error(`Something has happened. Status code: ${response.status}`);
    }
  } catch (error) {
    console.error("Something has happened. Error:", error);
  }
}
