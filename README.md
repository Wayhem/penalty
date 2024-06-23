This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server in `localhost:3000`:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

For production:

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```


## Getting Started

This project tries to imitate a monorepo while not acting like one. There are MANY things to improve, however they key ones (which I didn't have enough time to finish) would be:

* Testing E2E
* Extend design system package (Inputs, navbar, modals) with documentation and configuration
* Better use of SSR (not used to work on Next, first time after almost 4 years)
* Virtualization of all lists as they lack pagination
* Simulation for auth cookies / social login 
* More validation on inputs
* Better form handling on dialogs (they close by default on `<form></form>` components with buttons)
* Simulated loaders and optimistic ui rendering for some functionality
* Ability to swap dark and light theme (However by default it follows if you change your system theme)
* String and i18n for texts
* A lot of organization work regarding several components

