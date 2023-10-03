# Uniswap Dashboard

A Next.js frontend interface that visualizes data from the [Uniswap V3 subgraph](https://github.com/Uniswap/v3-subgraph). This application fetches data from the subgraph and displays it in paginated tables.

![Screenshot 2023-10-02 185050](https://github.com/nextremy/uniswap-dashboard/assets/99709675/24caa728-4119-4286-9583-67c39a838245)
![Screenshot 2023-10-02 184942](https://github.com/nextremy/uniswap-dashboard/assets/99709675/325b770b-7e02-4133-bb48-985685d3ede9)

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
