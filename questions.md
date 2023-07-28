### 1.  What is the difference between Component and PureComponent? Give an example where it might break my app.:
    -   Regular Component re-renders on every parent update.
    -   PureComponent re-renders only if props or state change.(It handles the shouldComponentUpdate method for you.)

### 2.  Context + ShouldComponentUpdate might be dangerous. Can think of why is that?:
    -   Using ShouldComponentUpdate with Context can lead to missed updates due to shallow comparisons.
            Since shouldComponentUpdate doesn't receive the Context updates, it won't know if the data in the Context has changed.

### 3.  Describe 3 ways to pass information from a component to its PARENT"
    -   Callback Functions
    -   HOC
    -   Using Context API

### 4.  Give 2 ways to prevent components from re-rendering:
    -   React.memo (Functional Components)
    -   React.PureComponent (Class Components)

### 5.  What is a fragment and why do we need it? Give an example where it might break my app.
    -   Fragment groups elements without extra DOM nodes.
    -   You can't pass a "key" prop to a fragment and it will break the app when printing a list.

### 6.  Give 3 examples of the HOC pattern:
    -   `memo` from `react`
    -   `withRouter` from `react-router-dom`
    -   `connect` from `react-redux`

### 7.  What's the difference in handling exceptions in promises, callbacks and async...await:
    -   Promises: Use `.catch()` to handle errors.
    -   Callbacks: Use `try`-`catch` blocks.
    -   async...await: Use `try`-`catch` within the `async` function.

### 8.  How many arguments does setState take and why is it async?:
    -   Class Components.
            1. An object or a function returning an object.
            2. Callback function.
    -   Function Components.
            1. An object or a function returning an object.
    -   It is asynchronous to batch state updates, avoid unnecessary intermediate re-renders and optimize rendering for better performance.

### 9.  List the steps needed to migrate a Class to Function Component:
    -   Replace the class component's render() method with a return statement in the function component.
    -   Replace state management using the useState hook in the function component.
    -   Replace class component lifecycle methods with equivalent hooks.
    -   Replace ref usage with the useRef hook.
    -   Access props directly as function arguments in the function component.
    -   Replace class methods with regular functions or arrow functions as needed (with const).

### 10. List a few ways styles can be used with components:
    -   Inline styles using `style` prop.
    -   CSS modules with `className`.
    -   Styled-components library.

### 11. How to render an HTML string coming from the server:
    -   Use `dangerouslySetInnerHTML` prop after beeing sure that the content is trusted to prevent XSS attacks.
    -   Using external libraries to sanitize content and print.