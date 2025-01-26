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

function composeTransformStreams(streams) {
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

  transformStream.readable.pipeTo(writable).catch((e) => {});

  return transformStream.writable;
}

function composeToReadable(readable, streams) {
  return readable.pipeThrough(composeTransformStreams(streams));
}
