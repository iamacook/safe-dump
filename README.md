# Safe Dump

A Safe App for dumping Safe Accounts. Dumping an Account transfers ownership to a specified address.

The current version is deployed at: [https://safe-dump.netlify.app](https://safe-dump.netlify.app).

## Motivation

When building on _Safe_, you often end up creating unwated Accounts. Too many can overload the Safe{Wallet} interface. This App allows you to remove unwanted Accounts by renouncing their ownership.

## Usage

This App uses `yarn` as a package manager. To setup and run it locally, use the following commands:

```
yarn install
yarn dev
```

Once running, add [http://localhost:3000](http://localhost:3000) as a custom Safe App in the Safe{Wallet} interface.
