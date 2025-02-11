// File generated from our OpenAPI spec by Stainless.

import * as Core from '@anthropic-ai/sdk/core';
import { APIResource } from '@anthropic-ai/sdk/resource';
import * as API from './';
import { Stream } from '@anthropic-ai/sdk/streaming';

export class Completions extends APIResource {
  /**
   * Create a completion
   */
  create(
    body: CompletionCreateParams.CompletionRequestNonStreaming,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<Completion>>;
  create(
    body: CompletionCreateParams.CompletionRequestStreaming,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<Stream<Completion>>>;
  create(
    body: CompletionCreateParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<Completion | Stream<Completion>>> {
    return this.post('/v1/complete', { body, timeout: 600000, ...options, stream: body.stream ?? false });
  }
}

export interface Completion {
  /**
   * The resulting completion up to and excluding the stop sequences.
   */
  completion: string;

  /**
   * The model that performed the completion.
   */
  model: string;

  /**
   * The reason that we stopped sampling.
   *
   * This may be one the following values:
   *
   * - `"stop_sequence"`: we reached a stop sequence — either provided by you via the
   *   `stop_sequences` parameter, or a stop sequence built into the model
   * - `"max_tokens"`: we exceeded `max_tokens_to_sample` or the model's maximum
   */
  stop_reason: string;
}

export type CompletionCreateParams =
  | CompletionCreateParams.CompletionRequestNonStreaming
  | CompletionCreateParams.CompletionRequestStreaming;

export namespace CompletionCreateParams {
  export interface CompletionRequestNonStreaming {
    /**
     * The maximum number of tokens to generate before stopping.
     *
     * Note that our models may stop _before_ reaching this maximum. This parameter
     * only specifies the absolute maximum number of tokens to generate.
     */
    max_tokens_to_sample: number;

    /**
     * The model that will complete your prompt.
     *
     * As we improve Claude, we develop new versions of it that you can query. This
     * parameter controls which version of Claude answers your request. Right now we
     * are offering two model families: Claude, and Claude Instant. You can use them by
     * setting `model` to `"claude-2"` or `"claude-instant-1"`, respectively. See
     * [models](https://docs.anthropic.com/claude/reference/selecting-a-model) for
     * additional details.
     */
    model: string;

    /**
     * The prompt that you want Claude to complete.
     *
     * For proper response generation you will need to format your prompt as follows:
     *
     * ```javascript
     * const userQuestion = r"Why is the sky blue?";
     * const prompt = `\n\nHuman: ${userQuestion}\n\nAssistant:`;
     * ```
     *
     * See our
     * [comments on prompts](https://docs.anthropic.com/claude/docs/introduction-to-prompt-design)
     * for more context.
     */
    prompt: string;

    /**
     * An object describing metadata about the request.
     */
    metadata?: CompletionCreateParams.CompletionRequestNonStreaming.Metadata;

    /**
     * Sequences that will cause the model to stop generating completion text.
     *
     * Our models stop on `"\n\nHuman:"`, and may include additional built-in stop
     * sequences in the future. By providing the stop_sequences parameter, you may
     * include additional strings that will cause the model to stop generating.
     */
    stop_sequences?: Array<string>;

    /**
     * Whether to incrementally stream the response using server-sent events.
     *
     * See
     * [this guide to SSE events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)
     * for details.
     */
    stream?: false;

    /**
     * Amount of randomness injected into the response.
     *
     * Defaults to 1. Ranges from 0 to 1. Use temp closer to 0 for analytical /
     * multiple choice, and closer to 1 for creative and generative tasks.
     */
    temperature?: number;

    /**
     * Only sample from the top K options for each subsequent token.
     *
     * Used to remove "long tail" low probability responses.
     * [Learn more technical details here](https://towardsdatascience.com/how-to-sample-from-language-models-682bceb97277).
     */
    top_k?: number;

    /**
     * Use nucleus sampling.
     *
     * In nucleus sampling, we compute the cumulative distribution over all the options
     * for each subsequent token in decreasing probability order and cut it off once it
     * reaches a particular probability specified by `top_p`. You should either alter
     * `temperature` or `top_p`, but not both.
     */
    top_p?: number;
  }

  export namespace CompletionRequestNonStreaming {
    /**
     * An object describing metadata about the request.
     */
    export interface Metadata {
      /**
       * An external identifier for the user who is associated with the request.
       *
       * This should be a uuid, hash value, or other opaque identifier. Anthropic may use
       * this id to help detect abuse. Do not include any identifying information such as
       * name, email address, or phone number.
       */
      user_id?: string;
    }
  }

  export interface CompletionRequestStreaming {
    /**
     * The maximum number of tokens to generate before stopping.
     *
     * Note that our models may stop _before_ reaching this maximum. This parameter
     * only specifies the absolute maximum number of tokens to generate.
     */
    max_tokens_to_sample: number;

    /**
     * The model that will complete your prompt.
     *
     * As we improve Claude, we develop new versions of it that you can query. This
     * parameter controls which version of Claude answers your request. Right now we
     * are offering two model families: Claude, and Claude Instant. You can use them by
     * setting `model` to `"claude-2"` or `"claude-instant-1"`, respectively. See
     * [models](https://docs.anthropic.com/claude/reference/selecting-a-model) for
     * additional details.
     */
    model: string;

    /**
     * The prompt that you want Claude to complete.
     *
     * For proper response generation you will need to format your prompt as follows:
     *
     * ```javascript
     * const userQuestion = r"Why is the sky blue?";
     * const prompt = `\n\nHuman: ${userQuestion}\n\nAssistant:`;
     * ```
     *
     * See our
     * [comments on prompts](https://docs.anthropic.com/claude/docs/introduction-to-prompt-design)
     * for more context.
     */
    prompt: string;

    /**
     * Whether to incrementally stream the response using server-sent events.
     *
     * See
     * [this guide to SSE events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)
     * for details.
     */
    stream: true;

    /**
     * An object describing metadata about the request.
     */
    metadata?: CompletionCreateParams.CompletionRequestStreaming.Metadata;

    /**
     * Sequences that will cause the model to stop generating completion text.
     *
     * Our models stop on `"\n\nHuman:"`, and may include additional built-in stop
     * sequences in the future. By providing the stop_sequences parameter, you may
     * include additional strings that will cause the model to stop generating.
     */
    stop_sequences?: Array<string>;

    /**
     * Amount of randomness injected into the response.
     *
     * Defaults to 1. Ranges from 0 to 1. Use temp closer to 0 for analytical /
     * multiple choice, and closer to 1 for creative and generative tasks.
     */
    temperature?: number;

    /**
     * Only sample from the top K options for each subsequent token.
     *
     * Used to remove "long tail" low probability responses.
     * [Learn more technical details here](https://towardsdatascience.com/how-to-sample-from-language-models-682bceb97277).
     */
    top_k?: number;

    /**
     * Use nucleus sampling.
     *
     * In nucleus sampling, we compute the cumulative distribution over all the options
     * for each subsequent token in decreasing probability order and cut it off once it
     * reaches a particular probability specified by `top_p`. You should either alter
     * `temperature` or `top_p`, but not both.
     */
    top_p?: number;
  }

  export namespace CompletionRequestStreaming {
    /**
     * An object describing metadata about the request.
     */
    export interface Metadata {
      /**
       * An external identifier for the user who is associated with the request.
       *
       * This should be a uuid, hash value, or other opaque identifier. Anthropic may use
       * this id to help detect abuse. Do not include any identifying information such as
       * name, email address, or phone number.
       */
      user_id?: string;
    }
  }
}

export namespace Completions {
  export import Completion = API.Completion;
  export import CompletionCreateParams = API.CompletionCreateParams;
}
