// @ts-check
import sCompose from "./index.js";
import { test } from "node:test";
import assert from "node:assert";

test("easy compose", async () => {
  const transform = sCompose(append("a"), append("b"));

  const result = await Array.fromAsync(
    ReadableStream.from(["1", "2", "3"]).pipeThrough(transform)
  );

  assert.deepEqual(result, ["1ab", "2ab", "3ab"]);
});

test("compose with readable", async () => {
  const readable = ReadableStream.from(["1", "2", "3"]);
  const readable2 = sCompose(readable, append("a"), append("b"));

  const result = await Array.fromAsync(readable2);

  assert.deepEqual(result, ["1ab", "2ab", "3ab"]);
});

test("compose with writable", async () => {
  const result = [];
  const writable = new WritableStream({
    write(chunk) {
      result.push(chunk);
    },
  });
  const composedWritable = sCompose(append("a"), append("b"), writable);

  await ReadableStream.from(["1", "2", "3"]).pipeTo(composedWritable);

  assert.deepEqual(result, ["1ab", "2ab", "3ab"]);
});

function append(str) {
  return new TransformStream({
    transform(chunk, controller) {
      controller.enqueue(chunk + str);
    },
  });
}
