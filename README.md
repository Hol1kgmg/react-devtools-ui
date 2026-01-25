# react-web-inspector-ui

A React component library for debugging in environments where browser DevTools are unavailable (mobile browsers, WebViews, embedded browsers, etc.). View console logs and network requests directly in your app.

## Features

- **Console Panel**: View `console.log`, `console.warn`, `console.error` and other console outputs
- **Network Panel**: Monitor fetch/XHR requests and responses
- **Draggable Toggle Button**: Position the inspector button anywhere on screen
- **Resizable Panel**: Adjust panel height by dragging
- **Mobile Friendly**: Responsive design for all screen sizes

## Installation

```bash
npm install react-web-inspector-ui
```

```bash
yarn add react-web-inspector-ui
```

```bash
pnpm add react-web-inspector-ui
```

## Usage

### Basic Usage (Recommended)

Just wrap your app with `<WebInspector>` - that's all you need!

```tsx
import { WebInspector } from 'react-web-inspector-ui';

function App() {
  return (
    <WebInspector>
      <YourApp />
    </WebInspector>
  );
}
```

### Next.js App Router

Works directly in `layout.tsx` - no wrapper needed:

```tsx
// app/layout.tsx
import { WebInspector } from 'react-web-inspector-ui';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <WebInspector>
          {children}
        </WebInspector>
      </body>
    </html>
  );
}
```

### Advanced Usage

For more control, you can use individual components:

```tsx
import {
  WebInspectorProvider,
  WebInspectorButton,
  WebInspectorPanel,
} from 'react-web-inspector-ui';

function App() {
  return (
    <WebInspectorProvider>
      <YourApp />
      <WebInspectorButton />
      <WebInspectorPanel />
    </WebInspectorProvider>
  );
}
```

### Custom Control with Hooks

```tsx
import { useWebInspector } from 'react-web-inspector-ui';

function CustomControls() {
  const { isOpen, open, close, toggle } = useWebInspector();

  return (
    <div>
      <button onClick={toggle}>{isOpen ? 'Close Inspector' : 'Open Inspector'}</button>
    </div>
  );
}
```

## API

### `<WebInspector>` (Recommended)

All-in-one component that includes Provider, Button, and Panel. The simplest way to add the inspector to your app.

| Prop          | Type                      | Default | Description                          |
| ------------- | ------------------------- | ------- | ------------------------------------ |
| `children`    | `ReactNode`               | -       | Child elements                       |
| `defaultOpen` | `boolean`                 | `false` | Whether the panel is open by default |
| `showButton`  | `boolean`                 | `true`  | Show the toggle button               |
| `showPanel`   | `boolean`                 | `true`  | Show the panel                       |
| `buttonProps` | `WebInspectorButtonProps` | -       | Props to pass to the button          |
| `panelProps`  | `WebInspectorPanelProps`  | -       | Props to pass to the panel           |

### `<WebInspectorProvider>`

Provider component that manages the inspector state. Use this when you need more control over component placement.

| Prop          | Type        | Default | Description                          |
| ------------- | ----------- | ------- | ------------------------------------ |
| `children`    | `ReactNode` | -       | Child elements                       |
| `defaultOpen` | `boolean`   | `false` | Whether the panel is open by default |

### `<WebInspectorButton>`

A draggable button that toggles the inspector panel.

| Prop        | Type     | Default | Description       |
| ----------- | -------- | ------- | ----------------- |
| `className` | `string` | -       | Custom class name |

### `<WebInspectorPanel>`

Panel displaying console logs and network information.

| Prop        | Type     | Default | Description       |
| ----------- | -------- | ------- | ----------------- |
| `className` | `string` | -       | Custom class name |

### `useWebInspector()`

Hook that provides inspector state and control functions.

```tsx
const {
  isOpen, // boolean - Whether the panel is open
  open, // () => void - Open the panel
  close, // () => void - Close the panel
  toggle, // () => void - Toggle the panel
} = useWebInspector();
```

## Requirements

- React 18.x or 19.x
- React DOM 18.x or 19.x

## Development

```bash
# Start development server
npm run dev

# Build
npm run build

# Run tests
npm run test

# Lint
npm run lint
```

## License

MIT
