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

For storybook:

```bash
npm run storybook
# or
yarn storybook
# or
pnpm storybook
# or
bun storybook
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

## Folder structure

While trying to imitate how I would divide packages in a monorepo I created 4 main folders:

### app

Everything regarding the setup and layouts for the next app or any wrapper or provider for libraries, a multi-zone would've been great to separate non authed section from authed section.

### collections

Our layer of communication to our endpoints or services, right now only hosts a reducer and because the data structure was so simple I saw no necessity to divide in schema folders (Users, Transactions, Notifications) YET, however for scalability this is a domain sensitive folder so in the future most like would expand that way, also for sure with real EPs SWR is really useful

### ui

Our beautiful design system folder, serves our stories for storybook, only one component is relatively well documented and exported, however many more like the modals, inputs and icons should reside here, making them more configurable and reusable, this folder is domain agnostic

### components

Where our organisms and logic filled components live, normally this components are tied to business logic, so they're a bit less reusable nonetheless there are examples like `SignupForm` that can be used once or twice, this folder is for more ad-hoc components.

### tests

While it doesn't exist yet, this one should host all tests for the project, needless to say it's a extremely important package.

### Why no monorepo??

Couldn't find a solution that works out of the box, it was very time consuming trying to setup one so this is a WIP.

## Notes and To do's

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

