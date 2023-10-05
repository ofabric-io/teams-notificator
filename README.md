# teams-notificator README

## Introduction

This project is designed to be seamlessly integrated into Continuous Integration and Continuous Deployment (CI/CD) pipelines. It provides a Node.js application that sends messages to a Microsoft Teams channel using a webhook, making it suitable for use within various CI/CD tools. The message contains essential information about a build process, including the branch, project, build status, commit author, and more. Additionally, it allows you to include custom messages and URLs in the Teams message.

## Prerequisites

To use this project within your CI/CD tool, ensure you have the following prerequisites:

1. **Docker**: Docker must be installed and configured on your CI/CD server or environment. Docker allows you to run the project as a container, making it compatible with various CI/CD tools.

2. **Microsoft Teams Webhook URL**: Obtain a Microsoft Teams webhook URL that corresponds to the channel where you want to send build notifications.

## Usage with CI/CD Tools

Integrating this project into your CI/CD pipeline is straightforward. You can use Docker to run the application within your pipeline. Here's a general guide:

1. **Pull the Docker Image**: Pull the Docker image from your preferred container registry. Ensure you have access to the image.

   ```bash
   docker pull 0fabricio/teams-notificator:latest
   ```

2. **Run the Docker Container**: Use the `docker run` command to execute the application and pass the required environment variables. These variables should be set within your CI/CD tool's configuration or secrets management.

   ```bash
   docker run -e WEBHOOK_URL=<your-webhook-url> \
              -e BRANCH=<branch-name> \
              -e PROJECT=<project-name> \
              -e BUILD_STATUS=<build-status> \
              -e COMMIT_AUTHOR=<commit-author-name> \
              -e COMMIT_AUTHOR_EMAIL=<commit-author-email> \
              -e COMMIT_TIMESTAMP=<commit-timestamp> \
              -e ADDITIONAL_MESSAGE=<additional-message-json> \
              0fabricio/teams-notificator:latest
   ```

   Replace the placeholders with the actual values. The `ADDITIONAL_MESSAGE` variable is a optional JSON string. It can be provided with the following structure:

   ```
   {
    "text": "SAMPLE TEXT",
    "color": "Attention",
    "url": "https://google.com"
   }
   ```

   - Check the [AdaptiveCards](https://adaptivecards.io/explorer/TextBlock.html) schema explorer to check all available colors.

3. **Integrate with Your CI/CD Workflow**: Add the Docker container execution step within your CI/CD tool's workflow or configuration. Typically, this step will execute when a build or deployment event occurs.

4. **Monitor Teams Channel**: After integration, monitor the designated Teams channel for build notifications. The application will send messages containing build information, along with any custom messages or URLs you specify.

## Customization

You can customize the message template by modifying the `generic.json` file located in the `templates` folder within the Docker image. This file defines the structure of the Teams message, allowing you to tailor it to your requirements. To apply custom templates, you may need to create a custom Docker image with your modified template file.

## Error Handling

The application checks for the presence of required environment variables and throws an error if any are missing. Ensure that all required environment variables are properly configured in your CI/CD tool's settings to prevent errors during the build notification process.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Node.js](https://nodejs.org/)
- [Microsoft Teams Webhooks](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook)

Feel free to contribute to this project or report any issues on the GitHub repository. Your contributions can enhance its functionality and compatibility with a wide range of CI/CD tools.
