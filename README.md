# Uniswap Dashboard

A Next.js frontend interface that visualizes data from the [Uniswap V3 subgraph](https://github.com/Uniswap/v3-subgraph). This application fetches data from the subgraph and displays it in paginated tables.

## Running the dashboard

Ensure that a recent version of [Node.js](https://nodejs.org/en) is installed on your system. To set up and run the dashboard, run the following script:
```
npm install
npm run build
npm run start
```

Once finished, navigate to [localhost:3000](http://localhost:3000) in your browser.

## Libraries

This project is made with [Next.js](https://nextjs.org/).

Other notable libraries used include the following:
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Headless UI](https://headlessui.com/) for accessible, unstyled UI components
- [Heroicons](https://heroicons.com/) for icons
- [urql](https://formidable.com/open-source/urql/) for GraphQL queries
- [GraphQL Code Generator](https://the-guild.dev/graphql/codegen) for type-safe GraphQL query documents
- [viem](https://viem.sh/) for Ethereum utilities
- [ESLint](https://eslint.org/) for linting
- [Prettier](https://prettier.io/) for formatting
