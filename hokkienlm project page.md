
# title
OmniHokkien - A Large Audio-Language Model for Singaporean Hokkien

# links
Huggingface: https://huggingface.co/iNLP-Lab/OmniHokkien
Huggingface Models:
GitHub: 

# Introduction
OmniHokkien is iNLP-Lab's conversational speech model purpose-built for Singapore Hokkien, offering comprehensive support for spoken and written Hokkien understanding alongside natural, human-like Hokkien speech generation. It provides developers and users with a dedicated set of Hokkien speech capabilities that address a critically underserved language, accepting Hokkien, English and Chinese audio or text input and responding fluently in Hokkien speech.

Built on the Qwen2.5-Omni and Qwen3-Omni architectures, OmniHokkien is trained in stages, centered on authentic Singaporean Hokkien data to capture the everyday rhythms, code-switching, and local nuances that define how Hokkien is actually spoken in Singapore — building on Taiwanese Hokkien data to deepen its linguistic understanding and grounding. At the core of OmniHokkien, we include a custom-trained bridge adapter that connects the Qwen2.5-Omni understanding component with the Qwen3-Omni speech-generation component, enabling the model to comprehend Hokkien input with a robust multimodal understanding backbone while producing speech output that is both fluent and natural.

In essence, OmniHokkien aims to support the preservation and everyday use of Hokkien, opening up new possibilities for voice assistants, conversational agents, and accessibility tools for Singapore's Hokkien community.

# Key Features
**Bilingual Hokkien Coverage**: Trained in stages on authentic Singaporean and Taiwanese Hokkien data, OmniHokkien captures the vocabulary, tones, and conversational patterns distinct to both communities, enabling it to understand and generate Hokkien across regional variation rather than a single standardized dialect.
**Bridged Dual-Architecture Design**: A custom-trained bridge adapter connects the Qwen2.5-Omni understanding component with the Qwen3-Omni speech-generation component, allowing robust Hokkien comprehension to be paired directly with high-quality Hokkien speech synthesis without retraining either backbone from scratch.
**Multimodal Input Support**: Accepts Hokkien, English and Chinese audio or text as input and responds in kind, producing natural Hokkien speech, making it suitable for voice-first interactions as well as text-based conversation.
**Staged Training for Robust Singapore Hokkien Grounding**: A multi-stage training process progressively builds the model's Hokkien capabilities, moving from foundational language understanding to specialising in natural, human-like conversational Hokkien speech generation.
# Demo
Sample outputs showcasing OmniHokkien's Hokkien capabilities, against frontier audio-to-audio models.
> demo samples here

