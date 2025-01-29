export default function sCompose(...streams) {
  if (streams.every((stream) => stream instanceof TransformStream)) {
    return composeTransformStreams(streams);
  }

  const [first, ...rest] = streams;
  if (
    first instanceof ReadableStream &&
    rest.every((stream) => stream instanceof TransformStream)
  ) {
    return composeToReadable(first, rest);
  }

  if (
    streams.at(-1) instanceof WritableStream &&
    streams.slice(0, -1).every((stream) => stream instanceof TransformStream)
  ) {
    return composeToWritable(streams.slice(0, -1), streams.at(-1));
  }

  throw new Error("Invalid streams");
}

/**
 * Compose a chain of TransformStreams.
 * @param {TransformStream[]} streams
 * @returns {TransformStream}
 */
function composeTransformStreams(streams) {
  if (streams.length === 0) {
    return new TransformStream();
  }
  const [first, ...rest] = streams;

  const lastReadable = rest.reduce(
    (acc, stream) => acc.pipeThrough(stream),
    first.readable
  );

  return {
    writable: first.writable,
    readable: lastReadable,
  };
}

function composeToWritable(streams, writable) {
  const transformStream = composeTransformStreams(streams);

  const writer = transformStream.writable.getWriter();

  let pipeToPromise;

  const proxy = new WritableStream({
    async start() {
      pipeToPromise = transformStream.readable.pipeTo(writable);
      await writer.ready;
    },
    async write(chunk) {
      await writer.write(chunk);
    },
    async close() {
      await writer.ready;
      await writer.close();
      await pipeToPromise;
    },
    async abort(reason) {
      await writer.abort(reason);
    },
  });

  return proxy;
}

function composeToReadable(readable, streams) {
  return readable.pipeThrough(composeTransformStreams(streams));
}
