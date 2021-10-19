### Setup

```shell
yarn config set ignore-engines true 
yarn create react-app hello-react --template=typescript
yarn eject
yarn upgrade -R eslint 
# Prettier
yarn add eslint-config-prettier@8.3.0 eslint-plugin-prettier@4.0.0 prettier@2.3.2
```

- Add `.prettierrc`, `.eslintrc.json`, `.eslintignore`

`Eslint` is already added:

- https://github.com/facebook/create-react-app/blob/main/packages/eslint-config-react-app/package.json
- https://github.com/facebook/create-react-app/blob/main/packages/react-scripts/package.json#L46

```json
{
  "@typescript-eslint/eslint-plugin": "^4.30.0",
  "@typescript-eslint/parser": "^4.30.0",
  "babel-eslint": "^10.1.0",
  "eslint": "^7.32.0",
  "eslint-config-react-app": "^6.0.0",
  "eslint-plugin-flowtype": "^5.2.0",
  "eslint-plugin-import": "^2.22.1",
  "eslint-plugin-jest": "^24.1.0",
  "eslint-plugin-jsx-a11y": "^6.3.1",
  "eslint-plugin-react": "^7.21.5",
  "eslint-plugin-react-hooks": "^4.2.0",
  "eslint-plugin-testing-library": "^3.9.2",
  "eslint-webpack-plugin": "^2.5.2",
  "eslint-plugin-prettier": "4.0.0",
  "eslint-config-prettier": "8.3.0",
  "prettier": "2.3.2"
}
```

![](prettier.png)

### Find `eslint-plugin-prettier` properly version

- Get currently eslint version: `yarn list eslint`

```shell
❯ yarn list eslint                                                                 
yarn list v1.22.4
warning Filtering by arguments is deprecated. Please use the pattern option instead.
└─ eslint@7.20.0
✨  Done in 0.73s.
```

- Check required eslint version by tag: https://github.com/prettier/eslint-plugin-prettier/blob/v3.3.1/package.json#L34

```shell
yarn add eslint-plugin-prettier@3.3.1 eslint-config-prettier@8.3.0 prettier@2.3.2
```

### Eslint and Prettier

- Eslint is linter prettier is formatter
- eslint-config-prettier : Turn off Eslint rules that is conflict with Prettier
- eslint-plugin-prettier : Integrate Prettier rules into Eslint rules

```json
{
  "extends": [
    "prettier"
  ],
  "plugins": [
    "prettier"
  ],
  "rules": {
    "prettier/prettier": [
      "error"
    ]
  }
}
```

## Hook

### `useEffect`

- Run when component is mounted and re-rendered.
- To run only when mounted. Pass empty array as second parameter.

```typescript
useEffect(() => {
    // This will execute only coponent is moundted.
}, [])
``` 

- Avoid pass async function as first parameter. Create async function and invoke it instead.

```typescript
useEffect(() => {
    async function fetchMyAPI() {
        let response = await fetch('api/data')
        response = await response.json()
        dataSet(response)
    }

    fetchMyAPI()
}, [])

async function fetchData() {
    const res = await fetch("https://swapi.co/api/planets/4/");
    res
        .json()
        .then(res => setPosts(res)) // update state
        .catch(err => setErrors(err)); // update state
}

useEffect(() => {
    fetchData();
}, []);
```

### `useRef`

- Has null value when initialized and will not reset after re-rendered.
- Change ref value **_<ins>will not</ins>_** invoke component re-render.
- Value type of `useRef` can be value or DOM.

```tsx
const domRef = useRef<HTMLInputElement>(null);
const handleDomNodeChange = (domNode: HTMLInputElement | null) => {
    console.log(`Dom ref change: ${domNode}`);
};

return (
    <div>
        <input name="email" ref={domRef}/>
        <input name="name" ref={handleDomNodeChange}/>
    </div>
);
```

### Reference

- https://issueexplorer.com/issue/prettier/eslint-plugin-prettier/434
- https://viblo.asia/p/su-dung-prettier-ket-hop-voi-eslint-bWrZnwkwlxw
- Eslint 7.32 [CharlesStover/charlesstover.com](https://github.com/CharlesStover/charlesstover.com/blob/1fef52f3616173c81d8b6e95f55cb817bd055ca1/package.json)
- Eslint `8.0.1` [CharlesStover/charlesstover.com](https://github.com/CharlesStover/charlesstover.com/blob/main/package.json#L74)
- https://dev.to/viniciusmdias/easy-start-of-a-typescript-react-project-w-eslint-and-prettier-55d4
- https://www.alexey-nikiforov.name/setup-react-app-with-typescript-eslint-and-prettier
- https://dev.to/suprabhasupi/learn-to-configure-eslint-and-prettier-in-react-4gp0
- https://dev.to/mehmehmehlol/class-components-vs-functional-components-in-react-4hd3
