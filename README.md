# AI Chatbot - Make everyone a prompt engineer

This is an open source AI Chatbot with [awesome prompts](https://github.com/f/awesome-chatgpt-prompts) powered by [TiDB Serverless](https://tidbcloud.com/).

> This project is built based on [ai-chatbot](https://github.com/vercel-labs/ai-chatbot). Thanks for the great work!

## Features

- Awesome prompts for you to chat with AI.
- Share your chat powered by TiDB Serverless.
- Isolated chat (and the chat history) from different users.

## How it works

### Auth

Use GitHub OAuth App and [next-auth](https://github.com/nextauthjs/next-auth) GitHub provider to authenticate users. 

### Chat & Prompts

The chat is powered by ChatGPT. [Vercel AI SDK](https://sdk.vercel.ai/docs) is used for streaming chat UI.

The prompts come from [awesome prompts](https://github.com/f/awesome-chatgpt-prompts).

### Storage

Chat history, prompts and userID are stored in a TiDB Serverless. This provides:

- Share your chat with others and the chat history will be kept forever.
- Isolated chat from different users.
- Prompts management

### Deployment

The project can be deployed on Vercel.

## Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fshiyuhang0%2Fai-chat&env=OPENAI_API_KEY,AUTH_SECRET,AUTH_GITHUB_ID,AUTH_GITHUB_SECRET&envDescription=How%20to%20get%20these%20env%20vars&envLink=https%3A%2F%2Fgithub.com%2Fshiyuhang0%2Fai-chat%2Fblob%2Fmain%2F.env.example&integration-ids=oac_coKBVWCXNjJnCEth1zzKoF1j&skippable-integrations=1)

### Environment Variables

Here are the environment variables you need to set:

- AUTH_SECRET: Generate a random secret: https://generate-secret.vercel.app/32 or `openssl rand -base64 32`
- AUTH_GITHUB_ID: Create a GitHub OAuth app here: https://github.com/settings/applications/new
- AUTH_GITHUB_SECRET: Authorization callback URL: https://authjs.dev/reference/core/providers_github#callback-url
- OPENAI_API_KEY: The OpenAI API key

If you skip the Vercel TiDB integration, you need add the following environment variables by yourself:

- TIDB_HOST: The host of your TiDB Serverless
- TIDB_USER: The user of your TiDB Serverless
- TIDB_PASSWORD: The password of your TiDB Serverless






