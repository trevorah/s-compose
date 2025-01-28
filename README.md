# s-compose

Compose web streams together

## Installation

```bash
npm install s-compose
```

## Usage

### Compose multiple TransformStreams into a single TransformStream

```js
import sCompose from "s-compose";

// transform a string by appending "a" and then "b"
const transform = sCompose(
  new TransformStream({
    transform(chunk, controller) {
      controller.enqueue(chunk + "a");
    },
  }),
  new TransformStream({
    transform(chunk, controller) {
      controller.enqueue(chunk + "b");
    },
  })
);
```

### Prepend a TransformStream to a WritableStream

```js
import sCompose from "s-compose";
import sBatch from "s-batch";

// create a writable stream that batches up items and then uploads them to an API in bulk
const writable = sCompose(
  sBatch(100),
  new WritableStream({
    async write(chunks) {
      await api.bulkUpload(chunks);
    },
  })
);
```

## API
```ts
function sCompose(...streams: TransformStream): TransformStream
```

```ts
function sCompose(...streams: TransformStream, sink: WritableStream): WritableStream
```

```ts
function sCompose(source: ReadableStream, ...streams: TransformStream): ReadableStream
```
