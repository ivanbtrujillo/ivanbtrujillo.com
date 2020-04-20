![alt text](./docs/header.svg "Next with super powers")

This is a boilerplate with some awesome tools pre-configured:

- [Next](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/index.html) with custom paths to make easy import elements.
- [Jest](https://jestjs.io/en/) and [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro)
- [TailwindCSS](https://tailwindcss.com/) configured with PurgueCSS

I've added some components and examples.

[Check the Codesandbox with the example](https://codesandbox.io/s/awesome-borg-x165z?file=/pages/index.tsx)

## How to use

```
git clone https://github.com/ivanbtrujillo/next-typescript-tailwind.git
```

```
npm install
```

```
npm run dev
```

## Customize TailwindCSS

Take a look to tailwind documentation. In this project you will find a tailwind.js file that will be your guide to
customize Tailwind (we read the config from tailwind.js). For example you can add a custom color this way:

```javascript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "my-orange": "#efb300",
        "my-blue": "rgba(58,168,190, 0.75)",
      },
    },
  },
};
```

## Customize TS Paths

In tsconfig.json, you will be able to add your custom paths or change the current ones in the paths section.
