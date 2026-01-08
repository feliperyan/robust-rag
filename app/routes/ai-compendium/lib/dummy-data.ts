import type { ResearchPaper, SearchQuery } from "./types";

export const researchPapers: ResearchPaper[] = [
	{
		id: "paper-1",
		title: "Attention Is All You Need",
		publishDate: "June 2017",
		authors: "Vaswani et al.",
		sourceUrl: "https://arxiv.org/abs/1706.03762",
		abstract: "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks.",
	},
	{
		id: "paper-2",
		title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
		publishDate: "October 2018",
		authors: "Devlin et al.",
		sourceUrl: "https://arxiv.org/abs/1810.04805",
		abstract: "We introduce a new language representation model called BERT.",
	},
	{
		id: "paper-3",
		title: "Language Models are Few-Shot Learners",
		publishDate: "May 2020",
		authors: "Brown et al.",
		sourceUrl: "https://arxiv.org/abs/2005.14165",
		abstract: "Recent work has demonstrated substantial gains on many NLP tasks and benchmarks by pre-training on a large corpus.",
	},
	{
		id: "paper-4",
		title: "Deep Residual Learning for Image Recognition",
		publishDate: "December 2015",
		authors: "He et al.",
		sourceUrl: "https://arxiv.org/abs/1512.03385",
		abstract: "Deeper neural networks are more difficult to train.",
	},
	{
		id: "paper-5",
		title: "Generative Adversarial Networks",
		publishDate: "June 2014",
		authors: "Goodfellow et al.",
		sourceUrl: "https://arxiv.org/abs/1406.2661",
		abstract: "We propose a new framework for estimating generative models via an adversarial process.",
	},
	{
		id: "paper-6",
		title: "Neural Machine Translation by Jointly Learning to Align and Translate",
		publishDate: "September 2014",
		authors: "Bahdanau et al.",
		sourceUrl: "https://arxiv.org/abs/1409.0473",
		abstract: "Neural machine translation is a recently proposed approach to machine translation.",
	},
	{
		id: "paper-7",
		title: "ImageNet Classification with Deep Convolutional Neural Networks",
		publishDate: "December 2012",
		authors: "Krizhevsky et al.",
		sourceUrl: "https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks",
		abstract: "We trained a large, deep convolutional neural network to classify the 1.2 million high-resolution images in the ImageNet LSVRC-2010 contest.",
	},
	{
		id: "paper-8",
		title: "Llama 2: Open Foundation and Fine-Tuned Chat Models",
		publishDate: "July 2023",
		authors: "Touvron et al.",
		sourceUrl: "https://arxiv.org/abs/2307.09288",
		abstract: "In this work, we develop and release Llama 2, a collection of pretrained and fine-tuned large language models.",
	},
	{
		id: "paper-9",
		title: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
		publishDate: "January 2022",
		authors: "Wei et al.",
		sourceUrl: "https://arxiv.org/abs/2201.11903",
		abstract: "We explore how generating a chain of thought can improve the ability of large language models to perform complex reasoning.",
	},
	{
		id: "paper-10",
		title: "Constitutional AI: Harmlessness from AI Feedback",
		publishDate: "December 2022",
		authors: "Bai et al.",
		sourceUrl: "https://arxiv.org/abs/2212.08073",
		abstract: "We propose a method for training AI assistants to be helpful, harmless, and honest.",
	},
	{
		id: "paper-11",
		title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
		publishDate: "May 2020",
		authors: "Lewis et al.",
		sourceUrl: "https://arxiv.org/abs/2005.11401",
		abstract: "Large pre-trained language models have been shown to store factual knowledge in their parameters.",
	},
	{
		id: "paper-12",
		title: "Training Compute-Optimal Large Language Models",
		publishDate: "March 2022",
		authors: "Hoffmann et al.",
		sourceUrl: "https://arxiv.org/abs/2203.15556",
		abstract: "We investigate the optimal model size and number of tokens for training a transformer language model under a given compute budget.",
	},
];

export const searchQueries: SearchQuery[] = [
	{
		object: "vector_store.search_results.page",
		search_query: "What are transformer models?",
		response: "Transformer models are a type of neural network architecture that revolutionized natural language processing and other sequence-to-sequence tasks. Introduced in the seminal paper 'Attention Is All You Need' by Vaswani et al., transformers rely entirely on attention mechanisms, dispensing with recurrence and convolutions entirely.\n\nThe key innovation of transformers is the self-attention mechanism, which allows the model to weigh the importance of different parts of the input sequence when processing each element. This enables transformers to capture long-range dependencies more effectively than previous architectures like RNNs and LSTMs. Transformers have become the foundation for many modern language models, including BERT, GPT, and more recent large language models like Llama 2.",
		data: [
			{
				file_id: "paper-1",
				filename: "attention-is-all-you-need.pdf",
				score: 0.95,
				attributes: {
					modified_date: 1497484800000,
					folder: "transformers/",
				},
				content: [
					{
						id: "paper-1",
						type: "text",
						text: "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks.",
					},
				],
			},
			{
				file_id: "paper-2",
				filename: "bert-pretraining.pdf",
				score: 0.88,
				attributes: {
					modified_date: 1539129600000,
					folder: "transformers/",
				},
				content: [
					{
						id: "paper-2",
						type: "text",
						text: "We introduce a new language representation model called BERT.",
					},
				],
			},
		],
		has_more: false,
		next_page: null,
	},
	{
		object: "vector_store.search_results.page",
		search_query: "How does attention mechanism work?",
		response: "The attention mechanism is a fundamental component that allows neural networks to focus on specific parts of the input when producing an output. In the context of transformers, the self-attention mechanism computes a weighted sum of all input representations, where the weights are determined by the similarity between different positions in the sequence.\n\nThe attention mechanism works through three main components: queries, keys, and values. For each position in the sequence, the model computes attention scores by comparing the query vector with all key vectors, then uses these scores to create a weighted combination of value vectors. This was first effectively demonstrated in neural machine translation tasks and later became the cornerstone of the transformer architecture, enabling models to handle complex dependencies in sequences without the sequential processing limitations of recurrent networks.",
		data: [
			{
				file_id: "paper-1",
				filename: "attention-is-all-you-need.pdf",
				score: 0.92,
				attributes: {
					modified_date: 1497484800000,
					folder: "transformers/",
				},
				content: [
					{
						id: "paper-1",
						type: "text",
						text: "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks.",
					},
				],
			},
			{
				file_id: "paper-6",
				filename: "neural-machine-translation.pdf",
				score: 0.85,
				attributes: {
					modified_date: 1410307200000,
					folder: "nmt/",
				},
				content: [
					{
						id: "paper-6",
						type: "text",
						text: "Neural machine translation is a recently proposed approach to machine translation.",
					},
				],
			},
		],
		has_more: false,
		next_page: null,
	},
	{
		object: "vector_store.search_results.page",
		search_query: "What is the difference between BERT and GPT?",
		response: "BERT (Bidirectional Encoder Representations from Transformers) and GPT (Generative Pre-trained Transformer) are both transformer-based language models, but they differ in their architecture and training objectives. BERT uses a bidirectional approach, meaning it considers context from both left and right when processing each token, making it particularly effective for understanding tasks like question answering and classification.\n\nIn contrast, GPT models like GPT-3 are autoregressive and unidirectional, processing text from left to right and trained to predict the next token in a sequence. This makes GPT models especially powerful for text generation tasks. BERT is pre-trained using masked language modeling (predicting masked tokens) and next sentence prediction, while GPT models are trained purely on next-token prediction. The few-shot learning capabilities demonstrated by GPT-3 have shown that large language models can perform many tasks without fine-tuning, which differs from BERT's typical usage pattern of fine-tuning for specific downstream tasks.",
		data: [
			{
				file_id: "paper-2",
				filename: "bert-pretraining.pdf",
				score: 0.93,
				attributes: {
					modified_date: 1539129600000,
					folder: "transformers/",
				},
				content: [
					{
						id: "paper-2",
						type: "text",
						text: "We introduce a new language representation model called BERT.",
					},
				],
			},
			{
				file_id: "paper-3",
				filename: "gpt3-few-shot-learners.pdf",
				score: 0.91,
				attributes: {
					modified_date: 1590969600000,
					folder: "llm/",
				},
				content: [
					{
						id: "paper-3",
						type: "text",
						text: "Recent work has demonstrated substantial gains on many NLP tasks and benchmarks by pre-training on a large corpus.",
					},
				],
			},
		],
		has_more: false,
		next_page: null,
	},
];
