# Privacy notice

**Project:** Inbox Translator for Fiverr  
**Chrome Web Store publisher:** DCX  
**Publisher contact:** kontakt@dcx.rs  
**Maintainer:** Luka Paunović ([lukapaunovic](https://github.com/lukapaunovic))  
**Updated:** 2026-11-03

This independent Chrome extension translates Fiverr inbox messages and reply drafts. It is not affiliated with Fiverr or OpenAI.

## What is processed

The extension reads displayed message text, reply drafts and sender/conversation usernames to distinguish participants and remember reply-language preferences. After the user enables translation, uncached text is transmitted directly to OpenAI's API over HTTPS using the user's own API key. This can include personal or confidential information present in the text.

The project does not operate an intermediary translation server. It includes no analytics or advertising service and does not collect Fiverr authentication cookies or use the Fiverr API to send messages.

## What stays locally

The user's API key, consent, selected model and preferences are stored in the extension's local Chrome profile. Successful translations and detected languages are stored in local IndexedDB. Cache identifiers hash the original text and translation settings; the source message is not stored as a separate cache field. Translations may themselves contain personal or confidential information.

Chrome Sync is not used. Local browser storage is not an encrypted secrets vault.

## OpenAI processing

OpenAI receives translation inputs and the credentials needed to authorize API requests. Requests specify `store: false`, which does not mean the provider has no security or abuse-monitoring retention. OpenAI's own service terms and data practices apply. Fiverr processes normal website use independently.

## Retention and controls

Cached translations have no automatic expiry. Clear the cache in Settings, then refresh open Fiverr tabs to discard their in-memory copies. Disable translation to stop new automatic translation requests. Removing the extension removes its local browser-profile data; revoke the API key through your OpenAI account if necessary. Browser/device backups are outside the extension's control.

## Use and disclosure

The extension uses the data for the translation features described above. This build does not sell data, profile users for advertising, execute downloaded code, or automatically send Fiverr messages.

For non-sensitive questions, contact the maintainer through [GitHub issues](https://github.com/lukapaunovic/fiverr-inbox-translator-chrome-extension/issues). Do not post private conversations, API keys or session credentials publicly. Report security vulnerabilities through the repository's private vulnerability-reporting channel when available.
