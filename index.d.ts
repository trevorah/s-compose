export default function sCompose<T1, T2, T3>(
  transform1: TransformStream<T1, T2>,
  transform2: TransformStream<T2, T3>
): TransformStream<T1, T3>;
export default function sCompose<T1, T2, T3, T4>(
  transform1: TransformStream<T1, T2>,
  transform2: TransformStream<T2, T3>,
  transform3: TransformStream<T3, T4>
): TransformStream<T1, T4>;
export default function sCompose<T1, T2, T3, T4, T5>(
  transform1: TransformStream<T1, T2>,
  transform2: TransformStream<T2, T3>,
  transform3: TransformStream<T3, T4>,
  transform4: TransformStream<T4, T5>
): TransformStream<T1, T5>;
export default function sCompose<T1, T2, T3, T4, T5, T6>(
  transform1: TransformStream<T1, T2>,
  transform2: TransformStream<T2, T3>,
  transform3: TransformStream<T3, T4>,
  transform4: TransformStream<T4, T5>,
  transform5: TransformStream<T5, T6>
): TransformStream<T1, T6>;
export default function sCompose<T1, T2, T3, T4, T5, T6, T7>(
  transform1: TransformStream<T1, T2>,
  transform2: TransformStream<T2, T3>,
  transform3: TransformStream<T3, T4>,
  transform4: TransformStream<T4, T5>,
  transform5: TransformStream<T5, T6>,
  transform6: TransformStream<T6, T7>
): TransformStream<T1, T7>;
export default function sCompose<T1, T2, T3, T4, T5, T6, T7, T8>(
  transform1: TransformStream<T1, T2>,
  transform2: TransformStream<T2, T3>,
  transform3: TransformStream<T3, T4>,
  transform4: TransformStream<T4, T5>,
  transform5: TransformStream<T5, T6>,
  transform6: TransformStream<T6, T7>,
  transform7: TransformStream<T7, T8>
): TransformStream<T1, T8>;
export default function sCompose<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
  transform1: TransformStream<T1, T2>,
  transform2: TransformStream<T2, T3>,
  transform3: TransformStream<T3, T4>,
  transform4: TransformStream<T4, T5>,
  transform5: TransformStream<T5, T6>,
  transform6: TransformStream<T6, T7>,
  transform7: TransformStream<T7, T8>,
  transform8: TransformStream<T8, T9>
): TransformStream<T1, T9>;

export default function sCompose(
  ...streams: (TransformStream | ReadableStream | WritableStream)[]
): TransformStream | ReadableStream | WritableStream;
