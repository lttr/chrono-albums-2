# Release Notes for Outdated Packages

## @nuxt/eslint (1.3.0 → 1.12.1)
https://github.com/nuxt/eslint/releases

## @nuxtjs/seo (3.0.3 → 3.2.2)
https://github.com/harlan-zw/nuxt-seo/releases

## eslint (9.25.1 → 9.39.1)
https://github.com/eslint/eslint/blob/main/CHANGELOG.md

## exifreader (4.30.0 → 4.33.1)
https://github.com/mattiasw/ExifReader/releases

## prettier (3.5.3 → 3.7.4)
https://github.com/prettier/prettier/blob/main/CHANGELOG.md

## tsx (4.19.4 → 4.21.0)
https://github.com/privatenumber/tsx/releases

## typescript (5.8.3 → 5.9.3)
https://github.com/microsoft/TypeScript/releases

## @nuxt/icon (1.12.0 → 2.1.0)
https://github.com/nuxt/icon/releases

## @nuxt/image (1.10.0 → 2.0.0)
https://github.com/nuxt/image/blob/main/CHANGELOG.md

## @nuxtjs/plausible (1.2.0 → 2.0.1)
https://github.com/nuxt-modules/plausible/releases

## @vueuse/core (13.1.0 → 14.1.0)
https://github.com/vueuse/vueuse/releases

## @vueuse/nuxt (13.1.0 → 14.1.0)
https://github.com/vueuse/vueuse/releases

## nuxt (3.16.2 → 4.2.2)
https://github.com/nuxt/nuxt/releases

## vitest (3.2.4 → 4.0.15)
https://github.com/vitest-dev/vitest/releases

## vue-tsc (2.2.10 → 3.1.8)
https://github.com/vuejs/language-tools/blob/master/CHANGELOG.md

## @libsql/client (0.15.4 → 0.15.15)
https://github.com/libsql/libsql-client-ts/blob/main/CHANGELOG.md

## @lttr/nuxt-config-eslint (0.3.0 → 0.4.0)
https://github.com/lttr/nuxt-config-eslint/blob/master/CHANGELOG.md

## @lttr/puleo (0.5.0 → 0.8.1)
https://github.com/lttr/puleo/blob/master/CHANGELOG.md

## @nuxt/fonts (0.11.1 → 0.12.1)
https://github.com/nuxt/fonts/blob/main/CHANGELOG.md

## @zod/core (0.9.0 → 0.11.6)
https://github.com/colinhacks/zod/releases

## db0 (0.3.2 → 0.3.4)
https://github.com/unjs/db0/blob/main/CHANGELOG.md

## drizzle-kit (0.31.1 → 0.31.8)
https://github.com/drizzle-team/drizzle-orm/releases

## drizzle-orm (0.43.1 → 0.45.1)
https://github.com/drizzle-team/drizzle-orm/releases

## drizzle-zod (0.7.1 → 0.8.3)
https://github.com/drizzle-team/drizzle-orm/releases

## unplugin-vue-router (0.12.0 → 0.19.0)
https://github.com/posva/unplugin-vue-router/blob/main/CHANGELOG.md


---

# Detailed Release Notes

## @nuxt/eslint Release Notes (1.3.0 → 1.12.1)

### v1.4.0
*Released: 5/16/2025*

### &nbsp;&nbsp;&nbsp;🚀 Features

- Update deps &nbsp;-&nbsp; by @antfu [<samp>(afc42)</samp>](https://github.com/nuxt/eslint/commit/afc42f9)
- Support type-aware rules, fix #499 &nbsp;-&nbsp; by @antfu in https://github.com/nuxt/eslint/issues/499 [<samp>(70d23)</samp>](https://github.com/nuxt/eslint/commit/70d2371)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/nuxt/eslint/compare/v1.3.1...v1.4.0)

---

### v1.5.0
*Released: 7/2/2025*

### &nbsp;&nbsp;&nbsp;🚀 Features

- Switch to `eslint-plugin-import-lite`, update deps &nbsp;-&nbsp; by @antfu [<samp>(31bd8)</samp>](https://github.com/nuxt/eslint/commit/31bd8a0)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **eslint-config**: Add file type restrictions to prevent CSS parsing errors &nbsp;-&nbsp; by @amery in https://github.com/nuxt/eslint/issues/584 [<samp>(40521)</samp>](https://github.com/nuxt/eslint/commit/40521a1)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/nuxt/eslint/compare/v1.4.1...v1.5.0)

---

### v1.6.0
*Released: 7/18/2025*

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- Bring back `eslint-plugin-import-x` as default, close #590 &nbsp;-&nbsp; by @antfu in https://github.com/nuxt/eslint/issues/590 [<samp>(e43d6)</samp>](https://github.com/nuxt/eslint/commit/e43d6de)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/nuxt/eslint/compare/v1.5.2...v1.6.0)

---

### v1.7.0
*Released: 7/22/2025*

### &nbsp;&nbsp;&nbsp;🚀 Features

- Upgrade eslint-plugin-unicorn &nbsp;-&nbsp; by @antfu [<samp>(b3b7d)</samp>](https://github.com/nuxt/eslint/commit/b3b7d93)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/nuxt/eslint/compare/v1.6.0...v1.7.0)

---

### v1.8.0
*Released: 8/6/2025*

### &nbsp;&nbsp;&nbsp;🚀 Features

- Update plugins &nbsp;-&nbsp; by @antfu [<samp>(932a7)</samp>](https://github.com/nuxt/eslint/commit/932a760)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/nuxt/eslint/compare/v1.7.1...v1.8.0)

---

### v1.9.0
*Released: 8/18/2025*

### &nbsp;&nbsp;&nbsp;🚀 Features

- Update plugins &nbsp;-&nbsp; by @antfu [<samp>(b80cb)</samp>](https://github.com/nuxt/eslint/commit/b80cbeb)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- Add `defineNuxtConfig` as ESLint's globals, close #603 &nbsp;-&nbsp; by @antfu in https://github.com/nuxt/eslint/issues/603 [<samp>(2e67f)</samp>](https://github.com/nuxt/eslint/commit/2e67f94)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/nuxt/eslint/compare/v1.8.0...v1.9.0)

---

### v1.10.0
*Released: 10/28/2025*

### &nbsp;&nbsp;&nbsp;🚀 Features

- Update deps &nbsp;-&nbsp; by @antfu [<samp>(23b8b)</samp>](https://github.com/nuxt/eslint/commit/23b8b3d)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- Update icon path &nbsp;-&nbsp; by @antfu [<samp>(3f185)</samp>](https://github.com/nuxt/eslint/commit/3f18575)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/nuxt/eslint/compare/v1.9.0...v1.10.0)

---

### v1.11.0
*Released: 11/27/2025*

### &nbsp;&nbsp;&nbsp;🚀 Features

- Allow config key sorting on files not named `nuxt.config` &nbsp;-&nbsp; by @benedictleejh in https://github.com/nuxt/eslint/issues/630 [<samp>(be2e9)</samp>](https://github.com/nuxt/eslint/commit/be2e993)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/nuxt/eslint/compare/v1.10.0...v1.11.0)

---

### v1.12.0
*Released: 12/10/2025*

### &nbsp;&nbsp;&nbsp;🚀 Features

- Add `nuxt/no-nuxt-config-test-key` &nbsp;-&nbsp; by @danielroe in https://github.com/nuxt/eslint/issues/633 [<samp>(3be8a)</samp>](https://github.com/nuxt/eslint/commit/3be8ab8)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/nuxt/eslint/compare/v1.11.0...v1.12.0)

---

## @nuxtjs/seo Release Notes (3.0.3 → 3.2.2)

### v3.1.0
*Released: 6/26/2025*

## 📦 Dependencies

Updated SEO related packages:

- [@nuxtjs/robots](https://github.com/nuxt-modules/robots): 5.2.10 → 5.2.11
- [@nuxtjs/sitemap](https://github.com/nuxt-modules/sitemap): 7.2.10 → 7.4.2 (minor version bump)
- [nuxt-link-checker](https://github.com/harlan-zw/nuxt-link-checker): 4.3.0 → 4.3.1
- [nuxt-og-image](https://github.com/harlan-zw/nuxt-og-image): 5.1.2 → 5.1.8
- [nuxt-schema-org](https://github.com/harlan-zw/nuxt-schema-org): 5.0.5 → 5.0.6
- [nuxt-seo-utils](https://github.com/harlan-zw/nuxt-seo-utils): 7.0.9 → 7.0.12
- [nuxt-site-config](https://github.com/harlan-zw/nuxt-site-config): 3.1.9 → 3.2.2 (minor version bump)

These updates bring the latest bug fixes and improvements from the Nuxt SEO ecosystem, namely:
- :bug: Improved stability for I18n integration
- :bug: Nuxt Content v3.6.0 compatibility

---

### v3.2.0
*Released: 9/17/2025*

This version implements [module dependencies](https://nuxt.com/blog/v4-1#module-development-enhancements) that are available with Nuxt v4.1, and improved [Nuxt Content v3.7 compatibility](https://github.com/nuxt/content/releases/tag/v3.7.0) and [NPM trusted publishing](https://docs.npmjs.com/trusted-publishers) for all modules for improved security.

It bumps the Nuxt Robots versions, which include the new features: 
- `Content-Usage` directive https://github.com/nuxt-modules/robots/pull/226
- Bot Detection https://github.com/nuxt-modules/robots/pull/210

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- Nuxt Content v3.7 compatibility &nbsp;-&nbsp; by @harlan-zw [<samp>(90214)</samp>](https://github.com/harlan-zw/nuxt-seo/commit/9021496)
- Explicit `moduleDependencies` &nbsp;-&nbsp; by @harlan-zw [<samp>(73fd6)</samp>](https://github.com/harlan-zw/nuxt-seo/commit/73fd636)
- NPM Trusted Publishing &nbsp;-&nbsp; by @harlan-zw [<samp>(ed173)</samp>](https://github.com/harlan-zw/nuxt-seo/commit/ed17362)

### &nbsp;&nbsp;&nbsp;📦 Dependencies

Updated SEO related packages:

- [@nuxtjs/robots](https://github.com/nuxt-modules/robots): 5.2.11 → 5.5.5
- [@nuxtjs/sitemap](https://github.com/nuxt-modules/sitemap): 7.4.2 → 7.4.7
- [nuxt-link-checker](https://github.com/harlan-zw/nuxt-link-checker): 4.3.1 → 4.3.2
- [nuxt-og-image](https://github.com/harlan-zw/nuxt-og-image): 5.1.8 → 5.1.11
- [nuxt-schema-org](https://github.com/harlan-zw/nuxt-schema-org): 5.0.6 → 5.0.9
- [nuxt-seo-utils](https://github.com/harlan-zw/nuxt-seo-utils): 7.0.12 → 7.0.16
- [nuxt-site-config](https://github.com/harlan-zw/nuxt-site-config): 3.2.2 → 3.2.7

These updates bring the latest bug fixes and improvements from the Nuxt SEO ecosystem.

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/harlan-zw/nuxt-seo/compare/v3.1.0...v3.2.0)

---

## eslint Release Notes (9.25.1 → 9.39.1)

### v9.26.0
*Released: 5/2/2025*

## Features
* [`e9754e7`](https://github.com/eslint/eslint/commit/e9754e7433edf665602ceba4f7f8fbca559c974f) feat: add reportGlobalThis to no-shadow-restricted-names (#19670) (sethamus)
* [`0fa2b7a`](https://github.com/eslint/eslint/commit/0fa2b7a3666f1eedcc091446dc860037c9bafa5c) feat: add suggestions for `eqeqeq` rule (#19640) (Nitin Kumar)
* [`dcbdcc9`](https://github.com/eslint/eslint/commit/dcbdcc9c6be628240269b41f7bb576dde1e6f5b3) feat: Add MCP server (#19592) (Nicholas C. Zakas)
* [`2dfd83e`](https://github.com/eslint/eslint/commit/2dfd83ef4ee054f748732581c422508c45d6f1bf) feat: add `ignoreDirectives` option in `no-unused-expressions` (#19645) (sethamus)

## Bug Fixes
* [`96e84de`](https://github.com/eslint/eslint/commit/96e84de55ad17c96e5b6f2dece75145542505469) fix: check cache file existence before deletion (#19648) (sethamus)
* [`d683aeb`](https://github.com/eslint/eslint/commit/d683aebc8e0792e4f80bd1488c705c90f22c317e) fix: don't crash on tests with circular references in `RuleTester` (#19664) (Milos Djermanovic)
* [`9736d5d`](https://github.com/eslint/eslint/commit/9736d5d15870c9185da7d140becb9a15aa69057d) fix: add `namespace` to `Plugin.meta` type (#19661) (Milos Djermanovic)
* [`17bae69`](https://github.com/eslint/eslint/commit/17bae69e02fff6f26487a3cbd9c3c3218088949c) fix: update `RuleTester.run()` type (#19634) (Nitin Kumar)

## Documentation
* [`dd98d63`](https://github.com/eslint/eslint/commit/dd98d63f09c9324124734206d904d31d433a7c92) docs: Update README (GitHub Actions Bot)
* [`c25e858`](https://github.com/eslint/eslint/commit/c25e858d2d7e9bd3e53dcb32c9af5251d6f0569e) docs: Update README (GitHub Actions Bot)
* [`b2397e9`](https://github.com/eslint/eslint/commit/b2397e9bef5ca7faf7e100ecebc20e457bf0b588) docs: Update README (GitHub Actions Bot)
* [`addd0a6`](https://github.com/eslint/eslint/commit/addd0a6a62d1b89dc7ab49cbd08c5a6af3e7da29) docs: fix formatting of unordered lists in Markdown (#19660) (Milos Djermanovic)
* [`a21b38d`](https://github.com/eslint/eslint/commit/a21b38db0276ab3373c95ebc7b1ef1910b79dfe6) docs: Update README (GitHub Actions Bot)
* [`c0721a7`](https://github.com/eslint/eslint/commit/c0721a7f34264da0a32ade8432511eeda4a2c1b9) docs: fix double space in command (#19657) (CamWass)

## Chores
* [`5b247c8`](https://github.com/eslint/eslint/commit/5b247c859f1b653297a9b9135d92a59742a669cc) chore: upgrade to `@eslint/js@9.26.0` (#19681) (Francesco Trotta)
* [`d6fa4ac`](https://github.com/eslint/eslint/commit/d6fa4ac031c2fe24fb778e84940393fbda3ddf77) chore: package.json update for @eslint/js release (Jenkins)
* [`0958690`](https://github.com/eslint/eslint/commit/09586905be394c05839996a5ea812adfac44d320) chore: disambiguate internal types `LanguageOptions` and `Rule` (#19669) (Francesco Trotta)
* [`f1c858e`](https://github.com/eslint/eslint/commit/f1c858e3c1e9712ef398588bf5ed68bc19fad3f2) chore: fix internal type references to `Plugin` and `Rule` (#19665) (Francesco Trotta)
* [`40dd299`](https://github.com/eslint/eslint/commit/40dd2998cedddb75e0514b2c5cc855293c85da41) refactor: One-shot ESQuery selector analysis (#19652) (Nicholas C. Zakas)
* [`1cfd702`](https://github.com/eslint/eslint/commit/1cfd7024226cd9c42ceb75732f79e3bc36e8305c) chore: update dependency @eslint/json to ^0.12.0 (#19656) (renovate[bot])

---

### v9.27.0
*Released: 5/16/2025*

## Features
* [`d71e37f`](https://github.com/eslint/eslint/commit/d71e37f450f4ae115ec394615e21523685f0d370) feat: Allow flags to be set in ESLINT_FLAGS env variable (#19717) (Nicholas C. Zakas)
* [`ba456e0`](https://github.com/eslint/eslint/commit/ba456e000e104fd7f2dbd27eebbd4f35e6c18934) feat: Externalize MCP server (#19699) (Nicholas C. Zakas)
* [`07c1a7e`](https://github.com/eslint/eslint/commit/07c1a7e839ec61bd706c651428606ea5955b2bb0) feat: add `allowRegexCharacters` to `no-useless-escape` (#19705) (sethamus)
* [`7bc6c71`](https://github.com/eslint/eslint/commit/7bc6c71ca350fa37531291e1d704be6ed408c5dc) feat: add no-unassigned-vars rule (#19618) (Jacob Bandes-Storch)
* [`ee40364`](https://github.com/eslint/eslint/commit/ee4036429758cdaf7f77c52f1c2b74b5a2bb7b66) feat: convert no-array-constructor suggestions to autofixes (#19621) (sethamus)
* [`32957cd`](https://github.com/eslint/eslint/commit/32957cde72196c7e41741db311786d881c1613a1) feat: support TS syntax in `max-params` (#19557) (Nitin Kumar)

## Bug Fixes
* [`5687ce7`](https://github.com/eslint/eslint/commit/5687ce7055d30e2d5ef800b3d5c3096c3fc42c0e) fix: correct mismatched removed rules (#19734) (루밀LuMir)
* [`dc5ed33`](https://github.com/eslint/eslint/commit/dc5ed337fd18cb59801e4afaf394f6b84057b601) fix: correct types and tighten type definitions in `SourceCode` class (#19731) (루밀LuMir)
* [`de1b5de`](https://github.com/eslint/eslint/commit/de1b5deba069f770140f3a7dba2702c1016dcc2a) fix: correct `service` property name in `Linter.ESLintParseResult` type (#19713) (Francesco Trotta)
* [`60c3e2c`](https://github.com/eslint/eslint/commit/60c3e2cf9256f3676b7934e26ff178aaf19c9e97) fix: sort keys in eslint-suppressions.json to avoid git churn (#19711) (Ron Waldon-Howe)
* [`9da90ca`](https://github.com/eslint/eslint/commit/9da90ca3c163adb23a9cc52421f59dedfce34fc9) fix: add `allowReserved` to `Linter.ParserOptions` type (#19710) (Francesco Trotta)
* [`fbb8be9`](https://github.com/eslint/eslint/commit/fbb8be9256dc7613fa0b87e87974714284b78a94) fix: add `info` to `ESLint.DeprecatedRuleUse` type (#19701) (Francesco Trotta)

## Documentation
* [`25de550`](https://github.com/eslint/eslint/commit/25de55055d420d7c8b794ae5fdaeb67947c613d9) docs: Update description of frozen rules to mention TypeScript (#19736) (Nicholas C. Zakas)
* [`bd5def6`](https://github.com/eslint/eslint/commit/bd5def66d1a3f9bad7da3547b5dff6003e67d9d3) docs: Clean up configuration files docs (#19735) (Nicholas C. Zakas)
* [`4d0c60d`](https://github.com/eslint/eslint/commit/4d0c60d0738cb32c12e4ea132caa6fab6d5ed0a7) docs: Add Neovim to editor integrations (#19729) (Maria José Solano)
* [`71317eb`](https://github.com/eslint/eslint/commit/71317ebeaf1c542114e4fcda99ee26115d8e4a27) docs: Update README (GitHub Actions Bot)
* [`4c289e6`](https://github.com/eslint/eslint/commit/4c289e685e6cf87331f4b1e6afe34a4feb8e6cc8) docs: Update README (GitHub Actions Bot)
* [`f0f0d46`](https://github.com/eslint/eslint/commit/f0f0d46ab2f87e439642abd84b6948b447b66349) docs: clarify that unused suppressions cause non-zero exit code (#19698) (Milos Djermanovic)
* [`8ed3273`](https://github.com/eslint/eslint/commit/8ed32734cc22988173f99fd0703d50f94c60feb8) docs: fix internal usages of `ConfigData` type (#19688) (Francesco Trotta)
* [`eb316a8`](https://github.com/eslint/eslint/commit/eb316a83a49347ab47ae965ff95f81dd620d074c) docs: add `fmt` and `check` sections to `Package.json Conventions` (#19686) (루밀LuMir)
* [`a3a2559`](https://github.com/eslint/eslint/commit/a3a255924866b94ef8d604e91636547600edec56) docs: fix wording in Combine Configs (#19685) (Milos Djermanovic)
* [`c8d17e1`](https://github.com/eslint/eslint/commit/c8d17e11dc63909e693eaed5b5ccc50e698ac3b3) docs: Update README (GitHub Actions Bot)

## Chores
* [`f8f1560`](https://github.com/eslint/eslint/commit/f8f1560de633aaf24a7099f89cbbfed12a762a32) chore: upgrade @eslint/js@9.27.0 (#19739) (Milos Djermanovic)
* [`ecaef73`](https://github.com/eslint/eslint/commit/ecaef7351f9f3220aa57409bf98db3e55b07a02a) chore: package.json update for @eslint/js release (Jenkins)
* [`596fdc6`](https://github.com/eslint/eslint/commit/596fdc62047dff863e990c3246b32da97ae9a14e) chore: update dependency @arethetypeswrong/cli to ^0.18.0 (#19732) (renovate[bot])
* [`f791da0`](https://github.com/eslint/eslint/commit/f791da040189ada1b1ec15856557b939ffcd978b) chore: remove unbalanced curly brace from `.editorconfig` (#19730) (Maria José Solano)
* [`e86edee`](https://github.com/eslint/eslint/commit/e86edee0918107e4e41e908fe59c937b83f00d4e) refactor: Consolidate Config helpers (#19675) (Nicholas C. Zakas)
* [`cf36352`](https://github.com/eslint/eslint/commit/cf3635299e09570b7472286f25dacd8ab24e0517) chore: remove shared types (#19718) (Francesco Trotta)
* [`f60f276`](https://github.com/eslint/eslint/commit/f60f2764971a33e252be13e560dccf21f554dbf1) refactor: Easier RuleContext creation (#19709) (Nicholas C. Zakas)
* [`58a171e`](https://github.com/eslint/eslint/commit/58a171e8f0dcc1e599ac22bf8c386abacdbee424) chore: update dependency @eslint/plugin-kit to ^0.3.1 (#19712) (renovate[bot])
* [`3a075a2`](https://github.com/eslint/eslint/commit/3a075a29cfb43ef08711c2e433fb6f218855886d) chore: update dependency @eslint/core to ^0.14.0 (#19715) (renovate[bot])
* [`44bac9d`](https://github.com/eslint/eslint/commit/44bac9d15c4e0ca099d0b0d85e601f3b55d4e167) ci: run tests in Node.js 24 (#19702) (Francesco Trotta)
* [`35304dd`](https://github.com/eslint/eslint/commit/35304dd2b0d8a4b640b9a25ae27ebdcb5e124cde) chore: add missing `funding` field to packages (#19684) (루밀LuMir)
* [`f305beb`](https://github.com/eslint/eslint/commit/f305beb82c51215ad48c5c860f02be1b34bcce32) test: mock `process.emitWarning` to prevent output disruption (#19687) (Francesco Trotta)

---

### v9.28.0
*Released: 5/30/2025*

## Features
* [`b0674be`](https://github.com/eslint/eslint/commit/b0674be94e4394401b4f668453a473572c321023) feat: Customization of serialization for languageOptions (#19760) (Nicholas C. Zakas)
* [`a95721f`](https://github.com/eslint/eslint/commit/a95721f1064fdbfe0e392b955ce3053a24551f80) feat: Add `--pass-on-unpruned-suppressions` CLI option (#19773) (Milos Djermanovic)
* [`bfd0e7a`](https://github.com/eslint/eslint/commit/bfd0e7a39535b3c1ddc742dfffa6bdcdc93079e2) feat: support TypeScript syntax in `no-use-before-define` (#19566) (Tanuj Kanti)
* [`68c61c0`](https://github.com/eslint/eslint/commit/68c61c093a885623e48f38026e3f3a05bfa403de) feat: support TS syntax in `no-shadow` (#19565) (Nitin Kumar)
* [`0f773ef`](https://github.com/eslint/eslint/commit/0f773ef248af0301a410fee11e1b22174100cf6a) feat: support TS syntax in `no-magic-numbers` (#19561) (Nitin Kumar)
* [`c4a6b60`](https://github.com/eslint/eslint/commit/c4a6b6051889b1cb668d4d2ae29e9c27c74993d6) feat: add allowTypeAnnotation to func-style (#19754) (sethamus)
* [`b03ad17`](https://github.com/eslint/eslint/commit/b03ad176f158afdd921f0af5126c398012b10559) feat: add TypeScript support to `prefer-arrow-callback` (#19678) (Tanuj Kanti)
* [`bc3c331`](https://github.com/eslint/eslint/commit/bc3c3313ce2719062805b6849d29f9a375cf23f2) feat: ignore overloaded function declarations in func-style rule (#19755) (sethamus)

## Bug Fixes
* [`eea3e7e`](https://github.com/eslint/eslint/commit/eea3e7eb1ca84f9e8870e1190d65d5235d9d8429) fix: Remove configured global variables from `GlobalScope#implicit` (#19779) (Milos Djermanovic)
* [`a467de3`](https://github.com/eslint/eslint/commit/a467de39f6e509af95a7963904326635c1bf7116) fix: update context.report types (#19751) (Nitin Kumar)
* [`fd467bb`](https://github.com/eslint/eslint/commit/fd467bb892d735a4a8863beabd181a3f3152689a) fix: remove interopDefault to use jiti's default (#19697) (sethamus)
* [`72d16e3`](https://github.com/eslint/eslint/commit/72d16e3066aac2f1c74f4150ba43dfa8cf532584) fix: avoid false positive in `no-unassigned-vars` for declare module (#19746) (Azat S.)
* [`81c3c93`](https://github.com/eslint/eslint/commit/81c3c936266474c2081f310098084bd0eb1768d2) fix: curly types (#19750) (Eli)

## Documentation
* [`3ec2082`](https://github.com/eslint/eslint/commit/3ec208233f29c161aae8f99f9f091e371fe83a62) docs: Nested arrays in files config entry (#19799) (Nicholas C. Zakas)
* [`89a65b0`](https://github.com/eslint/eslint/commit/89a65b07f6171a860284b62d97c8b3edf312b98c) docs: clarify how config arrays can apply to subsets of files (#19788) (Shais Ch)
* [`2ba8a0d`](https://github.com/eslint/eslint/commit/2ba8a0d75c7a8e6aa4798275126698be40391d37) docs: Add description of meta.namespace to plugin docs (#19798) (Nicholas C. Zakas)
* [`59dd7e6`](https://github.com/eslint/eslint/commit/59dd7e6b28507053bde985ea2311dca8ec0db681) docs: update `func-style` with examples (#19793) (Tanuj Kanti)
* [`e9129e0`](https://github.com/eslint/eslint/commit/e9129e0799d068c377d63d59a0a800e7d1fea8dd) docs: add global scope's `implicit` field to Scope Manager docs (#19770) (Milos Djermanovic)
* [`52f5b7a`](https://github.com/eslint/eslint/commit/52f5b7a0af48a2f143f0bccfd4e036025b08280d) docs: fix minor typos and add links (#19743) (루밀LuMir)
* [`00716a3`](https://github.com/eslint/eslint/commit/00716a339ede24ed5a76aceed833f38a6c4e8d3a) docs: upfront recommend against using the no-return-await rule (#19727) (Mike DiDomizio)

## Chores
* [`175b7b8`](https://github.com/eslint/eslint/commit/175b7b83fcdc8f3f84821510dd7e04d120402317) chore: upgrade to `@eslint/js@9.28.0` (#19802) (Francesco Trotta)
* [`844f5a6`](https://github.com/eslint/eslint/commit/844f5a69dc78ca38f856c137e061e8facc9d00ba) chore: package.json update for @eslint/js release (Jenkins)
* [`62b1c1b`](https://github.com/eslint/eslint/commit/62b1c1bc7981798c3aec2dd430c200c797a25629) chore: update globals to v16 (#19791) (Nitin Kumar)
* [`e8a1cb8`](https://github.com/eslint/eslint/commit/e8a1cb8f7fbc18efa589bfedea5326de636b4868) chore: ignore jiti-v2.0 & jiti-v2.1 for renovate (#19786) (Nitin Kumar)
* [`43d3975`](https://github.com/eslint/eslint/commit/43d39754b6d315954f46a70dbd53d1fa0eea1619) chore: Add Copilot Instructions file (#19753) (Nicholas C. Zakas)
* [`2dfb5eb`](https://github.com/eslint/eslint/commit/2dfb5ebef4c14d552d10a6c7c2c2ce376e63654a) test: update `SourceCodeTraverser` tests (#19763) (Milos Djermanovic)
* [`5bc21f9`](https://github.com/eslint/eslint/commit/5bc21f9e8e00f9e49442d1b6520b307ce94f3518) chore: add `*.code-workspace` to `.gitignore` (#19771) (루밀LuMir)
* [`f4fa40e`](https://github.com/eslint/eslint/commit/f4fa40eb4bd6f4dba3b2e7fff259d0780ef6becf) refactor: NodeEventGenerator -> SourceCodeTraverser (#19679) (Nicholas C. Zakas)
* [`0f49329`](https://github.com/eslint/eslint/commit/0f49329b4a7f91714f2cd1e9ce532d32202c47f4) refactor: use a service to emit warnings (#19725) (Francesco Trotta)
* [`20a9e59`](https://github.com/eslint/eslint/commit/20a9e59438fde3642ab058cc55ee1b9fa02b6391) chore: update dependency shelljs to ^0.10.0 (#19740) (renovate[bot])

---

### v9.29.0
*Released: 6/13/2025*

## Features
* [`f686fcb`](https://github.com/eslint/eslint/commit/f686fcb51e47cf53b891ae595684afe8a0ef584d) feat: add `ecmaVersion: 2026`, parsing `using` and `await using` (#19832) (Milos Djermanovic)
* [`19cdd22`](https://github.com/eslint/eslint/commit/19cdd226bb5957f8f7e8cb4e92d38aafe47f8ff4) feat: prune suppressions for non-existent files (#19825) (TKDev7)
* [`b3d720f`](https://github.com/eslint/eslint/commit/b3d720f82f08022a33b10f0437111e7d270b8e3c) feat: add ES2025 globals (#19835) (fisker Cheung)
* [`677a283`](https://github.com/eslint/eslint/commit/677a2837a17320f54a8869682af128a2a7d77579) feat: add auto-accessor fields support to class-methods-use-this (#19789) (sethamus)
* [`dbba058`](https://github.com/eslint/eslint/commit/dbba0589f5509223658b73de6eb721f659bcec47) feat: allow global type declaration in `no-var` (#19714) (Remco Haszing)
* [`342bd29`](https://github.com/eslint/eslint/commit/342bd29e1a10a4b521ed0dbb6d889dcfc137e863) feat: ignore type annotations in no-restricted-globals (#19781) (sethamus)
* [`786bcd1`](https://github.com/eslint/eslint/commit/786bcd13652b90c5bd0c7201610b856ad1b87542) feat: add allowProperties option to no-restricted-properties (#19772) (sethamus)
* [`05b66d0`](https://github.com/eslint/eslint/commit/05b66d05bd68214f2fa1ab53fb2734c9d9e5348a) feat: add `sourceCode.isGlobalReference(node)` method (#19695) (Nitin Kumar)

## Bug Fixes
* [`85c082c`](https://github.com/eslint/eslint/commit/85c082c54bd42ad818f5938b8fb1fb2aa0a1912f) fix: explicit matching behavior with negated patterns and arrays (#19845) (Milos Djermanovic)
* [`9bda4a9`](https://github.com/eslint/eslint/commit/9bda4a9bf18c9fef91cdd93921a0935ffcf9a9fc) fix: fix `LintOptions.filterCodeBlock` types (#19837) (ntnyq)
* [`7ab77a2`](https://github.com/eslint/eslint/commit/7ab77a2c7605126daaa7e7f7ab75b5c252677d12) fix: correct breaking deprecation of FlatConfig type (#19826) (Logicer)
* [`1ba3318`](https://github.com/eslint/eslint/commit/1ba33181ab300588a803434884c054ed003f0bbd) fix: add `language` and `dialects` to `no-use-before-define` (#19808) (Francesco Trotta)

## Documentation
* [`00e3e6a`](https://github.com/eslint/eslint/commit/00e3e6ad1357df7d46be51d3f305efecb90244a7) docs: add support for custom name parameter to `includeIgnoreFile` (#19795) (루밀LuMir)
* [`3aed075`](https://github.com/eslint/eslint/commit/3aed0756ed3669ac27fc243c81fd82e3d0e6973b) docs: Update README (GitHub Actions Bot)
* [`a2f888d`](https://github.com/eslint/eslint/commit/a2f888d679e2a44964da596a4158911819e1d31d) docs: enhance documentation with links and fix typos (#19761) (루밀LuMir)
* [`53c3235`](https://github.com/eslint/eslint/commit/53c3235ba1c90a85a44f0abd18998ccc4e0445bf) docs: update to clarify prompt usage (#19748) (Jennifer Davis)

## Chores
* [`5c114c9`](https://github.com/eslint/eslint/commit/5c114c962f29d0b33e6439e9ab0985014af06b9f) chore: upgrade @eslint/js@9.29.0 (#19851) (Milos Djermanovic)
* [`acf2201`](https://github.com/eslint/eslint/commit/acf2201a067d062e007b1b7b164b8e96fa1af50f) chore: package.json update for @eslint/js release (Jenkins)
* [`a806994`](https://github.com/eslint/eslint/commit/a806994263e54e4bc1481736b1c0626c8b770808) refactor: Remove eslintrc from flat config functionality (#19833) (Nicholas C. Zakas)
* [`152ed51`](https://github.com/eslint/eslint/commit/152ed51329d82c6e7375f41a105e01b31750e17f) test: switch to flat config mode in code path analysis tests (#19824) (Milos Djermanovic)
* [`b647239`](https://github.com/eslint/eslint/commit/b647239272931e0a947500b2f554fc8ccdf8adfd) chore: Update first-party dependencies faster with Renovate (#19822) (Nicholas C. Zakas)
* [`7abe42e`](https://github.com/eslint/eslint/commit/7abe42e2de931289e19e34e390d16936cf6faf64) refactor: SafeEmitter -> SourceCodeVisitor (#19708) (Nicholas C. Zakas)
* [`e392895`](https://github.com/eslint/eslint/commit/e39289596757702b6c8d747d5ab9c1a7820c108f) perf: improve time complexity of `getLocFromIndex` (#19782) (루밀LuMir)
* [`0ed289c`](https://github.com/eslint/eslint/commit/0ed289c5ceed1c10b599b22c8b9374a5a3a144dd) chore: remove accidentally committed file (#19807) (Francesco Trotta)

---

### v9.30.0
*Released: 6/27/2025*

## Features
* [`52a5fca`](https://github.com/eslint/eslint/commit/52a5fcaa4e0bb4e55c014c20ed47d6c93b107635) feat: Support `basePath` property in config objects (#19879) (Milos Djermanovic)
* [`4ab4482`](https://github.com/eslint/eslint/commit/4ab44823df4d4b47d3650da949077a0551e7579e) feat: add `allowSeparateTypeImports` option to `no-duplicate-imports` (#19872) (sethamus)
* [`b8a7e7a`](https://github.com/eslint/eslint/commit/b8a7e7aeb5f0ed2e1670771ab4dda6fd723d96eb) feat: throw error when column is negative in `getIndexFromLoc` (#19831) (루밀LuMir)

## Bug Fixes
* [`6a0f164`](https://github.com/eslint/eslint/commit/6a0f164543bf8461d6a27a740c9e08aa77cbe42d) fix: handle `null` type `loc` in `getIndexFromLoc` method (#19862) (루밀LuMir)
* [`3fbcd70`](https://github.com/eslint/eslint/commit/3fbcd704a0b2aef2a6c1fc34d2bc4b35f6425067) fix: update error message for `no-restricted-properties` (#19855) (Tanuj Kanti)
* [`7ef4cf7`](https://github.com/eslint/eslint/commit/7ef4cf76610d42727a404e495ac6d47868cf5040) fix: remove unnecessary semicolon from fixes (#19857) (Francesco Trotta)
* [`7dabc38`](https://github.com/eslint/eslint/commit/7dabc38a8406d470fb2389eec2f0ad1ad214173e) fix: use `process.version` in `--env-info` (#19865) (TKDev7)

## Documentation
* [`8662ed1`](https://github.com/eslint/eslint/commit/8662ed1f6debc358e22812b145e117aa4a907d78) docs: adopt eslint-stylistic sub packages related changes (#19887) (ntnyq)
* [`20158b0`](https://github.com/eslint/eslint/commit/20158b09db3430cf00b202ba8c25ce874bbaf00a) docs: typo in comment for unused variables handling (#19870) (leopardracer)
* [`ebfb5b4`](https://github.com/eslint/eslint/commit/ebfb5b46136c4d737c9783333e3057421d1a0bef) docs: Fixed Typo in configuration-files.md (#19873) (0-20)
* [`4112fd0`](https://github.com/eslint/eslint/commit/4112fd09531092e9651e9981205bcd603dc56acf) docs: clarify that boolean is still allowed for rule `meta.deprecated` (#19866) (Bryan Mishkin)

## Chores
* [`2b6491c`](https://github.com/eslint/eslint/commit/2b6491cd4b8eec44d4a3f8dea1b71151e8dd0230) chore: upgrade to `@eslint/js@9.30.0` (#19889) (Francesco Trotta)
* [`5a5d526`](https://github.com/eslint/eslint/commit/5a5d5261037fdf84a91f2f22d3726d58572453f4) chore: package.json update for @eslint/js release (Jenkins)
* [`eaf8a41`](https://github.com/eslint/eslint/commit/eaf8a418af32b3190494e4a2284533353c28ccfa) chore: Correct typos in linter tests (#19878) (kilavvy)

---

### v9.31.0
*Released: 7/11/2025*

## Features
* [`35cf44c`](https://github.com/eslint/eslint/commit/35cf44c22e36b1554486e7a75c870e86c10b83f8) feat: output full actual location in rule tester if different (#19904) (ST-DDT)
* [`a6a6325`](https://github.com/eslint/eslint/commit/a6a63259de6cb5642f69c7be429554bbcedca4c0) feat: support explicit resource management in `no-loop-func` (#19895) (Milos Djermanovic)
* [`4682cdc`](https://github.com/eslint/eslint/commit/4682cdc6960279ee17f23899fbab6f58d881eadf) feat: support explicit resource management in `no-undef-init` (#19894) (Milos Djermanovic)
* [`5848216`](https://github.com/eslint/eslint/commit/58482165eaf597cc5c58216a956c301ae87520b3) feat: support explicit resource management in `init-declarations` (#19893) (Milos Djermanovic)
* [`bb370b8`](https://github.com/eslint/eslint/commit/bb370b8e79f65ee32d9d89ecf249fb74a141ad22) feat: support explicit resource management in `no-const-assign` (#19892) (Milos Djermanovic)

## Bug Fixes
* [`07fac6c`](https://github.com/eslint/eslint/commit/07fac6cafa0426b4d1ea12d9001f3955f19b286d) fix: retry on EMFILE when writing autofix results (#19926) (TKDev7)
* [`28cc7ab`](https://github.com/eslint/eslint/commit/28cc7abbb72b29b1cac6fc4253646a7839586064) fix: Remove incorrect RuleContext types (#19910) (Nicholas C. Zakas)

## Documentation
* [`664cb44`](https://github.com/eslint/eslint/commit/664cb44ab03785bd200a792607a7e20faa2d4b28) docs: Update README (GitHub Actions Bot)
* [`40dbe2a`](https://github.com/eslint/eslint/commit/40dbe2a43f83d366e9026faec70293512fb61ca2) docs: fix mismatch between `globalIgnores()` code and text (#19914) (MaoShizhong)
* [`5a0069d`](https://github.com/eslint/eslint/commit/5a0069d60815246cf24e1c96125540792c2507ef) docs: Update README (GitHub Actions Bot)
* [`fef04b5`](https://github.com/eslint/eslint/commit/fef04b5c7fea99362d67b31b8e98cd4914020ed3) docs: Update working on issues info (#19902) (Nicholas C. Zakas)

## Chores
* [`3ddd454`](https://github.com/eslint/eslint/commit/3ddd454c1c73294e5af7905d60d03fac162f1b3e) chore: upgrade to `@eslint/js@9.31.0` (#19935) (Francesco Trotta)
* [`d5054e5`](https://github.com/eslint/eslint/commit/d5054e5454a537e9ade238c768c262c6c592cbc1) chore: package.json update for @eslint/js release (Jenkins)
* [`0f4a378`](https://github.com/eslint/eslint/commit/0f4a3781fe7c11fad7b206c3c694655486ddd187) chore: update eslint (#19933) (renovate[bot])
* [`76c2340`](https://github.com/eslint/eslint/commit/76c2340c368f96db77439b5cd1df0196cc39bf3e) chore: bump mocha to v11 (#19917) (루밀LuMir)

---

### v9.32.0
*Released: 7/25/2025*

## Features
* [`1245000`](https://github.com/eslint/eslint/commit/1245000c5a81954d42f0c7eb670efe450c3bbad5) feat: support explicit resource management in core rules (#19828) (fnx)
* [`0e957a7`](https://github.com/eslint/eslint/commit/0e957a7b5528f375a51e7c1a2fd1b03cdcd2af2d) feat: support typescript types in accessor rules (#19882) (fnx)

## Bug Fixes
* [`960fd40`](https://github.com/eslint/eslint/commit/960fd40dfd204af30726b49b6bec714fe49a606e) fix: Upgrade @eslint/js (#19971) (Nicholas C. Zakas)
* [`bbf23fa`](https://github.com/eslint/eslint/commit/bbf23fa2f1c6058f6cb5c9f2f32460a15e75e596) fix: Refactor reporting into FileReport (#19877) (Nicholas C. Zakas)
* [`d498887`](https://github.com/eslint/eslint/commit/d4988872f375890bf677ce1a1d92a505085b51fa) fix: bump @eslint/plugin-kit to 0.3.4 to resolve vulnerability (#19965) (Milos Djermanovic)
* [`f46fc6c`](https://github.com/eslint/eslint/commit/f46fc6c137c951bc73cf3bd9446053c1b11f769b) fix: report only global references in no-implied-eval (#19932) (Nitin Kumar)
* [`7863d26`](https://github.com/eslint/eslint/commit/7863d26b7cfb03a81ec86f93439757ff60bf6afb) fix: remove outdated types in `ParserOptions.ecmaFeatures` (#19944) (ntnyq)
* [`3173305`](https://github.com/eslint/eslint/commit/317330552e2d276221c7f2dd9c1516ad8b41cc3c) fix: update execScript message in no-implied-eval rule (#19937) (TKDev7)

## Documentation
* [`86e7426`](https://github.com/eslint/eslint/commit/86e7426e4463ca49ffa5c82e825ecb6aa19ca8a0) docs: Update README (GitHub Actions Bot)

## Chores
* [`50de1ce`](https://github.com/eslint/eslint/commit/50de1ced9df2b1ee48ee6843c8cfe0f5d8edbc27) chore: package.json update for @eslint/js release (Jenkins)
* [`74f01a3`](https://github.com/eslint/eslint/commit/74f01a3f5905aaa0902837ced2425209c09c048f) ci: unpin `jiti` to version `^2.5.1` (#19970) (루밀LuMir)
* [`2ab1381`](https://github.com/eslint/eslint/commit/2ab13813a7e7f3014c35490b351447ec43229951) ci: pin `jiti` to version 2.4.2 (#19964) (Francesco Trotta)
* [`b7f7545`](https://github.com/eslint/eslint/commit/b7f75454695079f54b77fcdc9ebe3b9199d5ad30) test: switch to flat config mode in `SourceCode` tests (#19953) (Milos Djermanovic)
* [`f5a35e3`](https://github.com/eslint/eslint/commit/f5a35e3b7cee17cd31fc02c24c3e74b42ee202bc) test: switch to flat config mode in eslint-fuzzer (#19960) (Milos Djermanovic)
* [`e22af8c`](https://github.com/eslint/eslint/commit/e22af8c42d622d8d912ee7bedf49bf4283247fdc) refactor: use `CustomRuleDefinitionType` in `JSRuleDefinition` (#19949) (Francesco Trotta)
* [`e855717`](https://github.com/eslint/eslint/commit/e85571730f1360464b7ee00695c678d551f9c643) chore: switch performance tests to hyperfine (#19919) (Francesco Trotta)
* [`2f73a23`](https://github.com/eslint/eslint/commit/2f73a23655092a41780859ffe0a07c44a2f1b5f5) test: switch to flat config mode in `ast-utils` tests (#19948) (Milos Djermanovic)
* [`c565a53`](https://github.com/eslint/eslint/commit/c565a530f50c96dacd44e096f7d531b073aa4dc7) chore: exclude `further_reading_links.json` from Prettier formatting (#19943) (Milos Djermanovic)

---

### v9.33.0
*Released: 8/8/2025*

## Features
* [`e07820e`](https://github.com/eslint/eslint/commit/e07820e66fd1fceaf2620dc931154955a706cc0f) feat: add global object access detection to no-restricted-globals (#19939) (sethamus)
* [`90b050e`](https://github.com/eslint/eslint/commit/90b050ec11557cab08b6be9f05fabf97dba6a63d) feat: support explicit resource management in `one-var` (#19941) (Sweta Tanwar)

## Bug Fixes
* [`732433c`](https://github.com/eslint/eslint/commit/732433c4fb023f45154b825cdc8cdaf1979d4336) fix: allow any type for `meta.docs.recommended` in custom rules (#19995) (Francesco Trotta)
* [`e8a6914`](https://github.com/eslint/eslint/commit/e8a6914a249d036e12494004e586b2a2b6e104d1) fix: Fixed potential bug in check-emfile-handling.js (#19975) (諏訪原慶斗)

## Documentation
* [`34f0723`](https://github.com/eslint/eslint/commit/34f0723e2d0faf8ac8dc95ec56e6d181bd6b67f2) docs: playground button for TypeScript code example (#19671) (Tanuj Kanti)
* [`dc942a4`](https://github.com/eslint/eslint/commit/dc942a47daf41228d69072c52f1be20789426862) docs: Update README (GitHub Actions Bot)
* [`5a4b6f7`](https://github.com/eslint/eslint/commit/5a4b6f74320b72f9b6ad8b30f5c463b2b71315af) docs: Update no-multi-assign.md (#19979) (Yuki Takada (Yukinosuke Takada))
* [`247e156`](https://github.com/eslint/eslint/commit/247e15698e34919a0cd411842fb3e14ac7a8f1ba) docs: add missing let declarations in `no-plusplus` (#19980) (Yuki Takada (Yukinosuke Takada))
* [`0d17242`](https://github.com/eslint/eslint/commit/0d17242b3c25c2ddf8363f4560641acd1ae82ca9) docs: Update README (GitHub Actions Bot)
* [`fa20b9d`](https://github.com/eslint/eslint/commit/fa20b9db8ff90ea9f0527118114dda17c656d095) docs: Clarify when to open an issue for a PR (#19974) (Nicholas C. Zakas)

## Build Related
* [`27fa865`](https://github.com/eslint/eslint/commit/27fa86551bd173387e29a139293de78b0e14f0f3) build: use `ESLint` class to generate formatter examples (#19972) (Milos Djermanovic)

## Chores
* [`4258046`](https://github.com/eslint/eslint/commit/425804602ecb9ee5f54d1c38a473cf20538420c5) chore: update dependency @eslint/js to v9.33.0 (#19998) (renovate[bot])
* [`ad28371`](https://github.com/eslint/eslint/commit/ad283717ed4764a171120ca7c6cba82a78fa024c) chore: package.json update for @eslint/js release (Jenkins)
* [`06a22f1`](https://github.com/eslint/eslint/commit/06a22f154c08ea044b3172b357b226d34dfefc6a) test: resolve flakiness in --mcp flag test (#19993) (Pixel998)
* [`54920ed`](https://github.com/eslint/eslint/commit/54920ed229693f23650dace6e567bf44413aaf98) test: switch to `Linter.Config` in `ESLintRules` type tests (#19977) (Francesco Trotta)

---

### v9.34.0
*Released: 8/22/2025*

## Features
* [`0bb777a`](https://github.com/eslint/eslint/commit/0bb777a82b533df595cd520d9c89d291efa14a33) feat: multithread linting (#19794) (Francesco Trotta)
* [`43a5f9e`](https://github.com/eslint/eslint/commit/43a5f9e36f1aade16f81fc49ef4b333660faadab) feat: add eslint-plugin-regexp to eslint-config-eslint base config (#19951) (Pixel998)

## Bug Fixes
* [`9b89903`](https://github.com/eslint/eslint/commit/9b8990397b2d2ed70771bb0e2070261a0c41782c) fix: default value of accessor-pairs option in rule.d.ts file (#20024) (Tanuj Kanti)
* [`6c07420`](https://github.com/eslint/eslint/commit/6c074206ae0eae4816197a57648b415832a20e1d) fix: fix spurious failure in neostandard integration test (#20023) (Kirk Waiblinger)
* [`676f4ac`](https://github.com/eslint/eslint/commit/676f4acaaed6e4f6ffe0c2e21272d4702b311a7b) fix: allow scientific notation with trailing zeros matching exponent (#20002) (Sweta Tanwar)

## Documentation
* [`0b4a590`](https://github.com/eslint/eslint/commit/0b4a590333b73a21b9e0ddc98462680e09fe3232) docs: make rulesdir deprecation clearer (#20018) (Domenico Gemoli)
* [`327c672`](https://github.com/eslint/eslint/commit/327c67256fbeaf9d5e365802c2a11f5d32a16522) docs: Update README (GitHub Actions Bot)
* [`bf26229`](https://github.com/eslint/eslint/commit/bf2622991f5b892610a8c3343ff16519e5fd7a79) docs: Fix typo in core-concepts/index.md (#20009) (Tobias Hernstig)
* [`2309327`](https://github.com/eslint/eslint/commit/2309327554acbf011f0d17e7b36fdd68e43adf3a) docs: fix typo in the "Configuring Rules" section (#20001) (ghazi-git)
* [`2b87e21`](https://github.com/eslint/eslint/commit/2b87e21321422c120c2248dae25cac7f9eec0f29) docs: [no-else-return] clarify sample code. (#19991) (Yuki Takada (Yukinosuke Takada))
* [`c36570c`](https://github.com/eslint/eslint/commit/c36570c6657c2a92dbb4f09a8166a4d9909a091a) docs: Update README (GitHub Actions Bot)

## Chores
* [`f19ad94`](https://github.com/eslint/eslint/commit/f19ad9493e0ca04c2c1455fbb3402eaad993a8be) chore: upgrade to `@eslint/js@9.34.0` (#20030) (Francesco Trotta)
* [`b48fa20`](https://github.com/eslint/eslint/commit/b48fa20034e53bc65d1a58f3d834705e3087b00c) chore: package.json update for @eslint/js release (Jenkins)
* [`4bce8a2`](https://github.com/eslint/eslint/commit/4bce8a250262ec47207bc260581f979e40c86bda) chore: package.json update for eslint-config-eslint release (Jenkins)
* [`0c9999c`](https://github.com/eslint/eslint/commit/0c9999c2a682151cf13bb3a4f8916930678c2f9b) refactor: prefer default options in `grouped-accessor-pairs` (#20028) (루밀LuMir)
* [`d503f19`](https://github.com/eslint/eslint/commit/d503f1981354c7b86e423879846c61e0405af8fe) ci: fix `stale.yml` (#20010) (루밀LuMir)
* [`e2dc67d`](https://github.com/eslint/eslint/commit/e2dc67d8b028147de4da35c64efe1d74c9f6a883) ci: centralize `stale.yml` (#19994) (루밀LuMir)
* [`7093cb8`](https://github.com/eslint/eslint/commit/7093cb8f590ec2a1b5364d7b5687e9b5f4e06f8a) ci: bump actions/checkout from 4 to 5 (#20005) (dependabot[bot])

---

### v9.35.0
*Released: 9/5/2025*

## Features
* [`42761fa`](https://github.com/eslint/eslint/commit/42761fa7c872fb9e14c144b692af6967b3662082) feat: implement suggestions for no-empty-function (#20057) (jaymarvelz)
* [`102f444`](https://github.com/eslint/eslint/commit/102f44442ac9bf1fcd4ba6ab9fae43ce09199df6) feat: implement suggestions for no-empty-static-block (#20056) (jaymarvelz)
* [`e51ffff`](https://github.com/eslint/eslint/commit/e51ffff737ca245b3a1d115cb11e1c99737249a3) feat: add `preserve-caught-error` rule (#19913) (Amnish Singh Arora)

## Bug Fixes
* [`10e7ae2`](https://github.com/eslint/eslint/commit/10e7ae23e30ea0834d9fdeb3a2a1db8103c36cd2) fix: update uncloneable options error message (#20059) (soda-sorcery)
* [`bfa4601`](https://github.com/eslint/eslint/commit/bfa46013e7ea9a522c02f72250fa07160f96a6b8) fix: ignore empty switch statements with comments in no-empty rule (#20045) (jaymarvelz)
* [`dfd11de`](https://github.com/eslint/eslint/commit/dfd11deb24fc733faa5db751a2f615eb04e48b15) fix: add `before` and `after` to test case types (#20049) (Francesco Trotta)
* [`dabbe95`](https://github.com/eslint/eslint/commit/dabbe95c39671c5fa272da012ee1432aa088650f) fix: correct types for `no-restricted-imports` rule (#20034) (Milos Djermanovic)
* [`ea789c7`](https://github.com/eslint/eslint/commit/ea789c7dd234c1a6be499a4644dd0f5c97615972) fix: no-loss-of-precision false positive with uppercase exponent (#20032) (sethamus)

## Documentation
* [`d265515`](https://github.com/eslint/eslint/commit/d265515642f65246bcd45c17979f67c2afb12f95) docs: improve phrasing - "if" → "even if" from getting-started section (#20074) (jjangga0214)
* [`a355a0e`](https://github.com/eslint/eslint/commit/a355a0e5b2e6a47cda099b31dc7d112cfb5c4315) docs: invert comparison logic for example in `no-var` doc page (#20064) (OTonGitHub)
* [`5082fc2`](https://github.com/eslint/eslint/commit/5082fc206de6946d9d4c20e57301f78839b3b9f2) docs: Update README (GitHub Actions Bot)
* [`99cfd7e`](https://github.com/eslint/eslint/commit/99cfd7e056e1703941c9eb8ca1ae7fdb1987ba9d) docs: add missing "the" in rule deprecation docs (#20050) (Josh Goldberg ✨)
* [`6ad8973`](https://github.com/eslint/eslint/commit/6ad8973e5d3c94b8e100b7266f55f8eb0757eb00) docs: update `--no-ignore` and `--ignore-pattern` documentation (#20036) (Francesco Trotta)
* [`8033b19`](https://github.com/eslint/eslint/commit/8033b195299a1eaa4a0ed6553d9e034a457bb577) docs: add documentation for `--no-config-lookup` (#20033) (Francesco Trotta)

## Chores
* [`da87f2f`](https://github.com/eslint/eslint/commit/da87f2fe792cab5b69b62bf5c15e69ab4f433087) chore: upgrade @eslint/js@9.35.0 (#20077) (Milos Djermanovic)
* [`af2a087`](https://github.com/eslint/eslint/commit/af2a0870fdc646091d027516601888923e5bc202) chore: package.json update for @eslint/js release (Jenkins)
* [`7055764`](https://github.com/eslint/eslint/commit/70557649e3111c55d8cddf678b6c4079aa6f0ccc) test: remove `tests/lib/eslint/eslint.config.js` (#20065) (Milos Djermanovic)
* [`84ffb96`](https://github.com/eslint/eslint/commit/84ffb9680b15e45bfd8c8a5db4731576ddd16fc4) chore: update `@eslint-community/eslint-utils` (#20069) (Francesco Trotta)
* [`d5ef939`](https://github.com/eslint/eslint/commit/d5ef9397150cc178e1f9891c3ff49ac4871ec786) refactor: remove deprecated `context.parserOptions` usage across rules (#20060) (sethamus)
* [`1b3881d`](https://github.com/eslint/eslint/commit/1b3881d7e859bec9589e39888656c33c914a8302) chore: remove redundant word (#20058) (pxwanglu)

---

### v9.36.0
*Released: 9/19/2025*

## Features
* [`47afcf6`](https://github.com/eslint/eslint/commit/47afcf668df65eac68d7b04145d037037010a076) feat: correct `preserve-caught-error` edge cases (#20109) (Francesco Trotta)

## Bug Fixes
* [`75b74d8`](https://github.com/eslint/eslint/commit/75b74d865d3b8e7fa3bcf5ad29f4bf6d18d1310e) fix: add missing rule option types (#20127) (ntnyq)
* [`1c0d850`](https://github.com/eslint/eslint/commit/1c0d85049e3f30a8809340c1abc881c63b7812ff) fix: update `eslint-all.js` to use `Object.freeze` for `rules` object (#20116) (루밀LuMir)
* [`7d61b7f`](https://github.com/eslint/eslint/commit/7d61b7fadc9c5c6f2b131e37e8a3cffa5aae8ee6) fix: add missing scope types to `Scope.type` (#20110) (Pixel998)
* [`7a670c3`](https://github.com/eslint/eslint/commit/7a670c301b58609017ce8cfda99ee81f95de3898) fix: correct rule option typings in `rules.d.ts` (#20084) (Pixel998)

## Documentation
* [`b73ab12`](https://github.com/eslint/eslint/commit/b73ab12acd3e87f8d8173cda03499f6cd1f26db6) docs: update examples to use `defineConfig` (#20131) (sethamus)
* [`31d9392`](https://github.com/eslint/eslint/commit/31d93926990fba536846ec727d7a2625fc844649) docs: fix typos (#20118) (Pixel998)
* [`c7f861b`](https://github.com/eslint/eslint/commit/c7f861b3f8c1ac961b4cd4f22483798f3324c62b) docs: Update README (GitHub Actions Bot)
* [`6b0c08b`](https://github.com/eslint/eslint/commit/6b0c08b106aa66f2e9fa484282f0eb63c64a1215) docs: Update README (GitHub Actions Bot)
* [`91f97c5`](https://github.com/eslint/eslint/commit/91f97c50468fbdc089c91e99c2ea0fe821911df2) docs: Update README (GitHub Actions Bot)

## Chores
* [`12411e8`](https://github.com/eslint/eslint/commit/12411e8d450ed26a5f7cca6a78ec05323c9323e8) chore: upgrade @eslint/js@9.36.0 (#20139) (Milos Djermanovic)
* [`488cba6`](https://github.com/eslint/eslint/commit/488cba6b391b97b2cfc74bbb46fdeacb1361949e) chore: package.json update for @eslint/js release (Jenkins)
* [`bac82a2`](https://github.com/eslint/eslint/commit/bac82a2a9c80a3f69087852758d7737aea371f09) ci: simplify renovate configuration (#19907) (唯然)
* [`c00bb37`](https://github.com/eslint/eslint/commit/c00bb37d62c1bcc0a37f094371be9c40064009f1) ci: bump actions/labeler from 5 to 6 (#20090) (dependabot[bot])
* [`fee751d`](https://github.com/eslint/eslint/commit/fee751dc8aeab54547af4538332ea5c069ef28b6) refactor: use `defaultOptions` in rules (#20121) (Pixel998)
* [`1ace67d`](https://github.com/eslint/eslint/commit/1ace67d9f7903adc3d3f09868aa05b673e7d3f3b) chore: update example to use `defineConfig` (#20111) (루밀LuMir)
* [`4821963`](https://github.com/eslint/eslint/commit/4821963bf765532069c49e9da9ecbe9485b073fc) test: add missing loc information to error objects in rule tests (#20112) (루밀LuMir)
* [`b42c42e`](https://github.com/eslint/eslint/commit/b42c42e7cd3ac9ee1b5a15f16ff25b325d0482e4) chore: disallow use of deprecated `type` property in core rule tests (#20094) (Milos Djermanovic)
* [`7bb498d`](https://github.com/eslint/eslint/commit/7bb498d720dcd054cc042ca4b60b138d8485f07c) test: remove deprecated `type` property from core rule tests (#20093) (Pixel998)
* [`e10cf2a`](https://github.com/eslint/eslint/commit/e10cf2ab42fe5b481d980dc652f7504414747733) ci: bump actions/setup-node from 4 to 5 (#20089) (dependabot[bot])
* [`5cb0ce4`](https://github.com/eslint/eslint/commit/5cb0ce48ef6cfbbe6d09131c33a53f9d66fe9bd4) refactor: use `meta.defaultOptions` in `preserve-caught-error` (#20080) (Pixel998)
* [`f9f7cb5`](https://github.com/eslint/eslint/commit/f9f7cb578dced3c14f635e17c75aa6744d291f4d) chore: package.json update for eslint-config-eslint release (Jenkins)
* [`81764b2`](https://github.com/eslint/eslint/commit/81764b298065a328038cd067bc8fedef97e57500) chore: update `eslint` peer dependency in `eslint-config-eslint` (#20079) (Milos Djermanovic)

---

### v9.37.0
*Released: 10/3/2025*

## Features
* [`39f7fb4`](https://github.com/eslint/eslint/commit/39f7fb493a6924ff7dc638fd4d6e7b3d8eb95383) feat: `preserve-caught-error` should recognize all static "cause" keys (#20163) (Pixel998)
* [`f81eabc`](https://github.com/eslint/eslint/commit/f81eabc5849ece98b8ca054f96b29f038a69bcf8) feat: support TS syntax in `no-restricted-imports` (#19562) (Nitin Kumar)

## Bug Fixes
* [`a129cce`](https://github.com/eslint/eslint/commit/a129cced7a86ea2518eb9be6990fa18af39694ca) fix: correct `no-loss-of-precision` false positives for leading zeros (#20164) (Francesco Trotta)
* [`09e04fc`](https://github.com/eslint/eslint/commit/09e04fcc3f4cc963eea7c9c579391de5e231595b) fix: add missing AST token types (#20172) (Pixel998)
* [`861c6da`](https://github.com/eslint/eslint/commit/861c6da2bd2796414e6eed782155ec34e2ed6344) fix: correct `ESLint` typings (#20122) (Pixel998)

## Documentation
* [`b950359`](https://github.com/eslint/eslint/commit/b950359c5f39085483c3137a6a160e582ef32007) docs: fix typos across the docs (#20182) (루밀LuMir)
* [`42498a2`](https://github.com/eslint/eslint/commit/42498a27981d50750dd15ae8660dbe85c4f4587c) docs: improve ToC accessibility by hiding non-semantic character (#20181) (Percy Ma)
* [`29ea092`](https://github.com/eslint/eslint/commit/29ea092b93608756350b1e9c5a4f29c8a49264ab) docs: Update README (GitHub Actions Bot)
* [`5c97a04`](https://github.com/eslint/eslint/commit/5c97a04578e6280c2395f642c2d8d6bdf30eec18) docs: show `availableUntil` in deprecated rule banner (#20170) (Pixel998)
* [`90a71bf`](https://github.com/eslint/eslint/commit/90a71bf5024a86fc232cd2e05f96811e2a18fd0f) docs: update `README` files to add badge and instructions (#20115) (루밀LuMir)
* [`1603ae1`](https://github.com/eslint/eslint/commit/1603ae1526d9b6f557c7d5534a4f40f46842edd6) docs: update references from `master` to `main` (#20153) (루밀LuMir)

## Chores
* [`afe8a13`](https://github.com/eslint/eslint/commit/afe8a1346958242031fea66fdfbb239e8bf408b7) chore: update `@eslint/js` dependency to version 9.37.0 (#20183) (Francesco Trotta)
* [`abee4ca`](https://github.com/eslint/eslint/commit/abee4ca1fa10da733b1cc4a7d5e765b912a9de82) chore: package.json update for @eslint/js release (Jenkins)
* [`fc9381f`](https://github.com/eslint/eslint/commit/fc9381f6ca57b824e82d118c14631c17bea79d7e) chore: fix typos in comments (#20175) (overlookmotel)
* [`e1574a2`](https://github.com/eslint/eslint/commit/e1574a22d38fd7e1891f86f8db0b09053f8963cb) chore: unpin jiti (#20173) (renovate[bot])
* [`e1ac05e`](https://github.com/eslint/eslint/commit/e1ac05e2fae779e738f85bd47dda1cc2b7099346) refactor: mark `ESLint.findConfigFile()` as `async`, add missing docs (#20157) (Pixel998)
* [`347906d`](https://github.com/eslint/eslint/commit/347906d627c53bf45d63ba831d2fd2b83fb0a749) chore: update eslint (#20149) (renovate[bot])
* [`0cb5897`](https://github.com/eslint/eslint/commit/0cb5897e24059bacadb8d2e6458184904759fda1) test: remove tmp dir created for circular fixes in multithread mode test (#20146) (Milos Djermanovic)
* [`bb99566`](https://github.com/eslint/eslint/commit/bb995665e32b3a958e78006c9fd75744c5604f1b) ci: pin `jiti` to version 2.5.1 (#20151) (Pixel998)
* [`177f669`](https://github.com/eslint/eslint/commit/177f669adc0f96d14ae1a71cde7786f327515863) perf: improve worker count calculation for `"auto"` concurrency (#20067) (Francesco Trotta)
* [`448b57b`](https://github.com/eslint/eslint/commit/448b57bca3406ee12c4e44e9298fc0c99d3ee10c) chore: Mark deprecated formatting rules as available until v11.0.0 (#20144) (Milos Djermanovic)

---

### v9.38.0
*Released: 10/17/2025*

## Features
* [`ce40f74`](https://github.com/eslint/eslint/commit/ce40f74efd45f66d9fbfc6f78ce622ee72008485) feat: update `complexity` rule to only highlight function header (#20048) (Atul Nair)
* [`e37e590`](https://github.com/eslint/eslint/commit/e37e590aae2a7fcca4d3a9adc1379ad466e5c5d1) feat: correct `no-loss-of-precision` false positives with `e` notation (#20187) (Francesco Trotta)

## Bug Fixes
* [`50c3dfd`](https://github.com/eslint/eslint/commit/50c3dfd98065622765a51a8ddb1e70c44fc5a4cb) fix: improve type support for isolated dependencies in pnpm (#20201) (Francesco Trotta)
* [`a1f06a3`](https://github.com/eslint/eslint/commit/a1f06a350c4155c4dbf39bf932a38d71d70f1b65) fix: correct SourceCode typings (#20114) (Pixel998)

## Documentation
* [`462675a`](https://github.com/eslint/eslint/commit/462675af8a811f9ca984efaedbdc5b46b13ced7a) docs: improve web accessibility by hiding non-semantic character (#20205) (루밀LuMir)
* [`c070e65`](https://github.com/eslint/eslint/commit/c070e65f6bb9e38d06a89ba2b3261781bec3d397) docs: correct formatting in `no-irregular-whitespace` rule documentation (#20203) (루밀LuMir)
* [`b39e71a`](https://github.com/eslint/eslint/commit/b39e71a2130ae1ea3fbc19b19f5b951eb625722a) docs: Update README (GitHub Actions Bot)
* [`cd39983`](https://github.com/eslint/eslint/commit/cd3998314876a4fad6463d9011bc73778ccc1fd9) docs: move `custom-formatters` type descriptions to `nodejs-api` (#20190) (Percy Ma)

## Chores
* [`d17c795`](https://github.com/eslint/eslint/commit/d17c795bf1624e0604998482b98e6bb6bff39045) chore: upgrade @eslint/js@9.38.0 (#20221) (Milos Djermanovic)
* [`25d0e33`](https://github.com/eslint/eslint/commit/25d0e33270e08baed09dbee2cdd56a8e5cd9da0f) chore: package.json update for @eslint/js release (Jenkins)
* [`c82b5ef`](https://github.com/eslint/eslint/commit/c82b5efa1fc91900e029efa23e688fad67fc17fa) refactor: Use types from @eslint/core (#20168) (Nicholas C. Zakas)
* [`ff31609`](https://github.com/eslint/eslint/commit/ff31609f195654d448954210ba4d31e921d463e8) ci: add Node.js 25 to `ci.yml` (#20220) (루밀LuMir)
* [`004577e`](https://github.com/eslint/eslint/commit/004577eda2f2f4b2829e0364f8b41893cebfc859) ci: bump github/codeql-action from 3 to 4 (#20211) (dependabot[bot])
* [`eac71fb`](https://github.com/eslint/eslint/commit/eac71fb77113de7bf199ff20c6ee44cefcb59848) test: remove use of `nodejsScope` option of eslint-scope from tests (#20206) (Milos Djermanovic)
* [`4168a18`](https://github.com/eslint/eslint/commit/4168a18b7efd8facbbd71cd44a62942a9f656a30) chore: fix typo in legacy-eslint.js (#20202) (Sweta Tanwar)
* [`205dbd2`](https://github.com/eslint/eslint/commit/205dbd2d9272e761574c478e3b0181f7b89ed0f6) chore: fix typos (#20200) (ntnyq)
* [`dbb200e`](https://github.com/eslint/eslint/commit/dbb200e3604e63bba23a18d40089ca44604835ed) chore: use team member's username when name is not available in data (#20194) (Milos Djermanovic)
* [`8962089`](https://github.com/eslint/eslint/commit/8962089edbd978b43513576387a134036b8e2d36) chore: mark deprecated rules as available until v11.0.0 (#20184) (Pixel998)

---

### v9.39.0
*Released: 10/31/2025*

## Features
* [`cc57d87`](https://github.com/eslint/eslint/commit/cc57d87a3f119e9d39c55e044e526ae067fa31ce) feat: update error loc to key in `no-dupe-class-members` (#20259) (Tanuj Kanti)
* [`126552f`](https://github.com/eslint/eslint/commit/126552fcf35da3ddcefa527db06dabc54c04041c) feat: update error location in `for-direction` and `no-dupe-args` (#20258) (Tanuj Kanti)
* [`167d097`](https://github.com/eslint/eslint/commit/167d0970d3802a66910e9820f31dcd717fab0b2a) feat: update `complexity` rule to highlight only static block header (#20245) (jaymarvelz)

## Bug Fixes
* [`15f5c7c`](https://github.com/eslint/eslint/commit/15f5c7c168d0698683943f51dd617f14a5e6815c) fix: forward traversal `step.args` to visitors (#20253) (jaymarvelz)
* [`5a1a534`](https://github.com/eslint/eslint/commit/5a1a534e877f7c4c992885867f923df307c3929d) fix: allow JSDoc comments in object-shorthand rule (#20167) (Nitin Kumar)
* [`e86b813`](https://github.com/eslint/eslint/commit/e86b813eb660f1a5adc8e143a70d9b683cd12362) fix: Use more types from @eslint/core (#20257) (Nicholas C. Zakas)
* [`927272d`](https://github.com/eslint/eslint/commit/927272d1f0d5683b029b729d368a96527f283323) fix: correct `Scope` typings (#20198) (jaymarvelz)
* [`37f76d9`](https://github.com/eslint/eslint/commit/37f76d9c539bb6fc816fedb7be4486b71a58620a) fix: use `AST.Program` type for Program node (#20244) (Francesco Trotta)
* [`ae07f0b`](https://github.com/eslint/eslint/commit/ae07f0b3334ebd22ae2e7b09bca5973b96aa9768) fix: unify timing report for concurrent linting (#20188) (jaymarvelz)
* [`b165d47`](https://github.com/eslint/eslint/commit/b165d471be6062f4475b972155b02654a974a0e9) fix: correct `Rule` typings (#20199) (jaymarvelz)
* [`fb97cda`](https://github.com/eslint/eslint/commit/fb97cda70d87286a7dbd2457f578ef578d6905e8) fix: improve error message for missing fix function in suggestions (#20218) (jaymarvelz)

## Documentation
* [`d3e81e3`](https://github.com/eslint/eslint/commit/d3e81e30ee6be5a21151b7a17ef10a714b6059c0) docs: Always recommend to include a files property (#20158) (Percy Ma)
* [`0f0385f`](https://github.com/eslint/eslint/commit/0f0385f1404dcadaba4812120b1ad02334dbd66a) docs: use consistent naming recommendation (#20250) (Alex M. Spieslechner)
* [`a3b1456`](https://github.com/eslint/eslint/commit/a3b145609ac649fac837c8c0515cbb2a9321ca40) docs: Update README (GitHub Actions Bot)
* [`cf5f2dd`](https://github.com/eslint/eslint/commit/cf5f2dd58dd98084a21da04fe7b9054b9478d552) docs: fix correct tag of `no-useless-constructor` (#20255) (Tanuj Kanti)
* [`10b995c`](https://github.com/eslint/eslint/commit/10b995c8e5473de8d66d3cd99d816e046f35e3ec) docs: add TS options and examples for `nofunc` in `no-use-before-define` (#20249) (Tanuj Kanti)
* [`2584187`](https://github.com/eslint/eslint/commit/2584187e4a305ea7a98e1a5bd4dca2a60ad132f8) docs: remove repetitive word in comment (#20242) (reddaisyy)
* [`637216b`](https://github.com/eslint/eslint/commit/637216bd4f2aae7c928ad04a4e40eecffb50c9e5) docs: update CLI flags migration instructions (#20238) (jaymarvelz)
* [`e7cda3b`](https://github.com/eslint/eslint/commit/e7cda3bdf1bdd664e6033503a3315ad81736b200) docs: Update README (GitHub Actions Bot)
* [`7b9446f`](https://github.com/eslint/eslint/commit/7b9446f7cc2054aa2cdf8e6225f4ac15a03671a8) docs: handle empty flags sections on the feature flags page (#20222) (sethamus)

## Chores
* [`dfe3c1b`](https://github.com/eslint/eslint/commit/dfe3c1b2034228765c48c8a445554223767dd16d) chore: update `@eslint/js` version to 9.39.0 (#20270) (Francesco Trotta)
* [`2375a6d`](https://github.com/eslint/eslint/commit/2375a6de8263393c129d41cac1b407b40111a73c) chore: package.json update for @eslint/js release (Jenkins)
* [`a1f4e52`](https://github.com/eslint/eslint/commit/a1f4e52d67c94bef61edd1607dcd130047c1baf0) chore: update `@eslint` dependencies (#20265) (Francesco Trotta)
* [`c7d3229`](https://github.com/eslint/eslint/commit/c7d32298482752eeac9fb46378d4f1ea095f3836) chore: update dependency @eslint/core to ^0.17.0 (#20256) (renovate[bot])
* [`27549bc`](https://github.com/eslint/eslint/commit/27549bc774c7c2dc5c569070a3e87c62f602bf7d) chore: update fuzz testing to not error if code sample minimizer fails (#20252) (Milos Djermanovic)
* [`a1370ee`](https://github.com/eslint/eslint/commit/a1370ee40e9d8e0e41843f3278cd745fc1ad543f) ci: bump actions/setup-node from 5 to 6 (#20230) (dependabot[bot])
* [`9e7fad4`](https://github.com/eslint/eslint/commit/9e7fad4a1867709060686d03e0ec1d0d69671cfb) chore: add script to auto-generate eslint:recommended configuration (#20208) (唯然)

---

## exifreader Release Notes (4.30.0 → 4.33.1)

### 4.31.0: Better FieldOfView calculation, new tag FocalLength35efl
*Released: 5/27/2025*

`FocalLength35efl` is the 35 mm equivalent focal length when it has been calculated from other values in the metadata. Beware that if the image has been resized it might have the wrong value because the original dimensions have been lost.

---

### 4.32.0: Correct repeatable IPTC tags types
*Released: 9/20/2025*

This type bug fix might cause issues if you have relied on any of these IPTC tags always being a scalar value: `Destination`, `Subject Reference`, `Supplemental Category`, `Content Location Code`, `Content Location Name`, `Reference Service`, `Reference Date`, `Reference Number`, `By-line`, `By-line Title`, `Contact`, `Writer/Editor`

---

## prettier Release Notes (3.5.3 → 3.7.4)

### 3.6.0
*Released: 6/23/2025*

[diff](https://github.com/prettier/prettier/compare/3.5.3...3.6.0)

🔗 [Release note "Prettier 3.6: Experimental fast CLI and new OXC and Hermes plugins!"](https://prettier.io/blog/2025/06/23/3.6.0)

---

### 3.7.0
*Released: 11/27/2025*

[diff](https://github.com/prettier/prettier/compare/3.6.2...3.7.0)

🔗 [Release note](https://prettier.io/blog/2025/11/27/3.7.0)

---

## tsx Release Notes (4.19.4 → 4.21.0)

### v4.20.0
*Released: 6/11/2025*

# [4.20.0](https://github.com/privatenumber/tsx/compare/v4.19.4...v4.20.0) (2025-06-11)


### Bug Fixes

* **esm:** only set json attribute if missing ([714e00b](https://github.com/privatenumber/tsx/commit/714e00b31ec2b22d092ab682edd7572e3632c8a3))


### Features

* support latest Node versions ([ec316d3](https://github.com/privatenumber/tsx/commit/ec316d3efa2ae4ffbc367c9cdd84df869bf5f96f))




---
This release is also available on:
- [npm package (@latest dist-tag)](https://www.npmjs.com/package/tsx/v/4.20.0)

---

### v4.21.0
*Released: 11/30/2025*

# [4.21.0](https://github.com/privatenumber/tsx/compare/v4.20.6...v4.21.0) (2025-11-30)


### Features

* upgrade esbuild ([#748](https://github.com/privatenumber/tsx/issues/748)) ([048fb62](https://github.com/privatenumber/tsx/commit/048fb623870f22c5026ad84187b545d418d2dfe8))




---
This release is also available on:
- [npm package (@latest dist-tag)](https://www.npmjs.com/package/tsx/v/4.21.0)

---

## @nuxt/icon Release Notes (1.12.0 → 2.1.0)

### v1.13.0
*Released: 5/16/2025*

### &nbsp;&nbsp;&nbsp;🚀 Features

- Update deps &nbsp;-&nbsp; by @antfu [<samp>(2ff1d)</samp>](https://github.com/nuxt/icon/commit/2ff1d7b)
- Support `provider: none`, close #393 &nbsp;-&nbsp; by @antfu in https://github.com/nuxt/icon/issues/393 [<samp>(06167)</samp>](https://github.com/nuxt/icon/commit/0616758)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- Make the build output of the component regain its type &nbsp;-&nbsp; by @KazariEX in https://github.com/nuxt/icon/issues/389 [<samp>(3a044)</samp>](https://github.com/nuxt/icon/commit/3a04406)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/nuxt/icon/compare/v1.12.0...v1.13.0)

---

### v1.14.0
*Released: 6/19/2025*

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- Prefer `nitro.static` over `_generate` &nbsp;-&nbsp; by @danielroe in https://github.com/nuxt/icon/issues/406 [<samp>(272e4)</samp>](https://github.com/nuxt/icon/commit/272e43a)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/nuxt/icon/compare/v1.13.0...v1.14.0)

---

### v1.15.0
*Released: 6/29/2025*

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- Drop use of private `_build` flag &nbsp;-&nbsp; by @danielroe in https://github.com/nuxt/icon/issues/409 [<samp>(aaa6c)</samp>](https://github.com/nuxt/icon/commit/aaa6c5e)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/nuxt/icon/compare/v1.14.0...v1.15.0)

---

### v2.0.0
*Released: 8/11/2025*

### &nbsp;&nbsp;&nbsp;🚨 Breaking Changes

- Upgrade to nuxt v4 &nbsp;-&nbsp; by @DerYeger in https://github.com/nuxt/icon/issues/419 [<samp>(6f236)</samp>](https://github.com/nuxt/icon/commit/6f2369d)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/nuxt/icon/compare/v1.15.0...v2.0.0)

---

### v2.1.0
*Released: 10/22/2025*

### &nbsp;&nbsp;&nbsp;🚀 Features

- Scan nested subfolders for custom collections &nbsp;-&nbsp; by @svifty7 and @antfu in https://github.com/nuxt/icon/issues/407 [<samp>(f9f5b)</samp>](https://github.com/nuxt/icon/commit/f9f5ba1)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- Clean up debug code &nbsp;-&nbsp; by @okj579 in https://github.com/nuxt/icon/issues/421 [<samp>(7e8f8)</samp>](https://github.com/nuxt/icon/commit/7e8f87b)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/nuxt/icon/compare/v2.0.0...v2.1.0)

---

## @nuxt/image Release Notes (1.10.0 → 2.0.0)

### v1.11.0
*Released: 7/30/2025*

[compare changes](https://github.com/nuxt/image/compare/v1.10.0...v1.11.0)

### 🚀 Enhancements

- Add support for image helpers in nitro endpoints ([#1473](https://github.com/nuxt/image/pull/1473))
- **ipx:** Log the architecture of the build ([#1808](https://github.com/nuxt/image/pull/1808))

### 🩹 Fixes

- Remove layer0 and edgio providers ([#1763](https://github.com/nuxt/image/pull/1763))
- Add back layer0 and edgio providers (without) tests ([a99ce09](https://github.com/nuxt/image/commit/a99ce09))
- **cloudflare:** Don't add baseURL if there are no operations ([#1790](https://github.com/nuxt/image/pull/1790))
- **ipx:** Always use ipx provider if external baseURL is provided ([#1800](https://github.com/nuxt/image/pull/1800))
- **ipxStatic:** Strip repeated slashes from image path ([#1801](https://github.com/nuxt/image/pull/1801))
- Avoid deep type instantiation ([12b37a2](https://github.com/nuxt/image/commit/12b37a2))

### 📖 Documentation

- Fix typo ([#1762](https://github.com/nuxt/image/pull/1762))
- Fix link to runtime/providers ([#1819](https://github.com/nuxt/image/pull/1819))

### 🏡 Chore

- Disable shamefully-hoist ([#1795](https://github.com/nuxt/image/pull/1795))
- Do not ignore typescript upgrades ([0809991](https://github.com/nuxt/image/commit/0809991))
- Switch to using typesVersions field ([b4af05a](https://github.com/nuxt/image/commit/b4af05a))
- Allow major bumps in changelog ([d486587](https://github.com/nuxt/image/commit/d486587))
- Enable oxc-resolver build ([4be31c7](https://github.com/nuxt/image/commit/4be31c7))
- Release v1.11.0 ([3123997](https://github.com/nuxt/image/commit/3123997))

### ✅ Tests

- Exclude layer0 + edgio from unit tests ([3682a90](https://github.com/nuxt/image/commit/3682a90))

### 🤖 CI

- Run tests against 1.x branch ([0c83646](https://github.com/nuxt/image/commit/0c83646))
- Add release workflow and add pkg.pr.new ([#1791](https://github.com/nuxt/image/pull/1791))
- Set fetch-depth ([18ae6c7](https://github.com/nuxt/image/commit/18ae6c7))
- Test vs node 20 ([e6babef](https://github.com/nuxt/image/commit/e6babef))

### ❤️ Contributors

- Daniel Roe (@danielroe)
- Matis (@matisbag)
- Amir Afshar (@Afshar07)
- Sébastien Chopin (@atinux)
- Nicolas Großmann (@grossmann94)

---

### v2.0.0
*Released: 11/5/2025*

We're excited to announce **Nuxt Image v2**! 🎉 This release focuses on TypeScript support, performance improvements, and better developer experience.

## 👀 Highlights

> [!NOTE]
> Nuxt Image v2 requires Nuxt 3.1+. If you're on Nuxt 3.0.x, you'll need to upgrade to at least 3.1 first.

### 🎯 TypeScript support

The biggest change in v2 is full TypeScript support throughout the module ([#1802](https://github.com/nuxt/image/pull/1802)).

#### Typed providers

Image providers now use `defineProvider` for type-safe configuration:

```ts
// Before (v1)
export const getImage = (src, { modifiers, baseURL }) => {
  // ...
  return { url }
}

// After (v2)
import { defineProvider } from '@nuxt/image/runtime'

export default defineProvider({
  getImage(src, { modifiers, baseURL }) {
    // Fully typed modifiers
    // ...
    return { url }
  }
})
```

#### Type-safe configuration

Module options are now fully typed. For example, providers that require a `baseURL` will enforce it at the type level in your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  image: {
    provider: 'cloudinary',
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/...' // TypeScript error if missing!
    }
  }
})
```

#### Typed composables

The `$img` helper and `useImage()` composable have full type inference ([#1844](https://github.com/nuxt/image/pull/1844)):

```ts
const img = useImage()

// Full autocomplete for modifiers
const url = img('/image.jpg', { 
  width: 300,
  height: 200,
  fit: 'cover' // TypeScript knows the valid values!
})
```

### 🚀 IPX v3

We've upgraded to IPX v3 ([#1799](https://github.com/nuxt/image/pull/1799)) for better performance and better `sharp` binary handling. The upgrade includes automatic detection of the correct `sharp` binaries for your deployment architecture.

### 🔌 Server-side utilities

You can now use image helpers directly in Nitro server endpoints ([#1473](https://github.com/nuxt/image/pull/1473)).

```ts
// server/api/og-image.ts
export default defineEventHandler((event) => {
  const img = useImage()
  
  return {
    url: img('/hero.jpg', { 
      width: 1200, 
      height: 630,
      fit: 'cover' 
    })
  }
})
```

### 🎨 Component improvements

#### Template refs

`<NuxtImg>` now exposes the underlying `<img>` element via template refs:

```vue
<template>
  <NuxtImg ref="imgEl" src="/image.jpg" />
</template>

<script setup>
const imgEl = ref()

onMounted(() => {
  // Direct access to the native img element
  console.log(imgEl.value)
})
</script>
```

#### Typed slots

Both `<NuxtImg>` and `<NuxtPicture>` now have properly typed default slots.

### 🌐 New providers

We've added two new providers:

- **Shopify** ([#1890](https://github.com/nuxt/image/pull/1890)) - for Shopify store images
- **GitHub** ([#1990](https://github.com/nuxt/image/pull/1990)) - for GitHub avatars and user content

```ts
export default defineNuxtConfig({
  image: {
    provider: 'shopify',
    shopify: {
      baseURL: 'https://your-store.myshopify.com'
    }
  }
})
```

### ⚡ Performance

We've made several optimizations to reduce bundle size and improve runtime performance:

- **Better URL encoding** ([#1813](https://github.com/nuxt/image/pull/1813)) - Switched to `URLSearchParams` for more reliable parameter handling
- **Reduced runtime utilities** ([#1816](https://github.com/nuxt/image/pull/1816)) - Removed unused code and simplified implementations
- **Streamlined screen sizes** ([#1931](https://github.com/nuxt/image/pull/1931)) - Aligned default breakpoints with Tailwind CSS


### 🎯 Better layer support

Nuxt Image now properly supports custom image directories within Nuxt layers ([#1880](https://github.com/nuxt/image/pull/1880)), making it easier to organize images in modular projects.


### ⚠️ Breaking changes

#### Provider API


The biggest breaking change is how providers are defined. All providers now use a default export with the `defineProvider` wrapper:

```diff
- export const getImage = (src, { modifiers }) => { ... }
+ export default defineProvider({
+   name: 'my-provider',
+   getImage(src, { modifiers }) { ... }
+ })
```

If you maintain a custom provider, you'll need to update it. But you get full TypeScript support in return!

#### Removed providers

The deprecated `layer0` and `edgio` providers have been removed.

#### URL formatters

If you have custom providers using `joinWith` for parameter formatting, you'll need to update them to use the `formatter` function with `createOperationsGenerator`. See the [migration guide](https://image.nuxt.com/getting-started/migration#url-formatter-changes) for details.
```

#### Screen sizes

Default screen sizes now match Tailwind CSS. We've removed `xs` (320px) and `xxl` (2560px). See the [migration guide](https://image.nuxt.com/getting-started/migration#screen-size-changes) for how to add them back if needed.
```

#### Removed utilities

We've removed several unused runtime utilities. If you were importing internal utilities directly, check if they still exist.

### ✅ Upgrading

Check out our comprehensive [migration guide](https://image.nuxt.com/getting-started/migration) for step-by-step upgrade instructions.

The quick version:

```bash
npm install @nuxt/image@latest
```

Most apps can upgrade with no code changes. If you have custom providers, you'll need to update them to use `defineProvider` - see the [migration guide](https://image.nuxt.com/getting-started/migration#custom-provider-updates) for examples.

### 🐛 Bug fixes

This release includes several fixes:

- **Preload links**: Fixed preload for multiple densities with single size ([#1851](https://github.com/nuxt/image/pull/1851))
- **Crossorigin attributes**: Correct crossorigin on preload links ([#1836](https://github.com/nuxt/image/pull/1836))
- **Provider-specific formats**: AWS Amplify and Vercel providers now have proper format allow lists ([#1996](https://github.com/nuxt/image/pull/1996))
- **Hygraph**: Prevented broken image URLs ([#1999](https://github.com/nuxt/image/pull/1999))
- **Preset sizes**: Fixed preset size application when component sizes prop is undefined ([#1919](https://github.com/nuxt/image/pull/1919))
- **Cloudflare**: Don't add baseURL if there are no operations ([#1790](https://github.com/nuxt/image/pull/1790))
- **IPX**: Always use IPX provider if external baseURL is provided ([#1800](https://github.com/nuxt/image/pull/1800))

### 🙏 Thank you

Thank you to all the contributors who made this release possible! This includes contributions from dozens of community members who helped with features, bug fixes, documentation improvements, and feedback.

## 👉 Changelog

[compare changes](https://github.com/nuxt/image/compare/v1.11.0...v2.0.0)

### 🚀 Enhancements

- Add support for image helpers in nitro endpoints ([#1473](https://github.com/nuxt/image/pull/1473))
- **deps:** Upgrade to ipx v3 ([#1799](https://github.com/nuxt/image/pull/1799))
- **ipx:** Log the architecture of the build ([#1808](https://github.com/nuxt/image/pull/1808))
- ⚠️  Typed providers + modifiers ([#1802](https://github.com/nuxt/image/pull/1802))
- Add type for default nuxt-picture slots ([0e4f174](https://github.com/nuxt/image/commit/0e4f174))
- **nuxt-img:** Add types for default slot ([c4bba1b](https://github.com/nuxt/image/commit/c4bba1b))
- Add shopify provider ([#1890](https://github.com/nuxt/image/pull/1890))
- Add support for image helpers in nitro endpoints ([#1473](https://github.com/nuxt/image/pull/1473))
- **ipx:** Log the architecture of the build ([#1808](https://github.com/nuxt/image/pull/1808))
- **cloudimage:** Make baseURL optional with cdn ([#1951](https://github.com/nuxt/image/pull/1951))
- **github:** Add provider for github avatars ([#1990](https://github.com/nuxt/image/pull/1990))
- **nuxt-img:** Expose <img> element ([#1834](https://github.com/nuxt/image/pull/1834))
- Support custom image dirs within layers ([#1880](https://github.com/nuxt/image/pull/1880))
- Strongly type $Img/useImage methods ([#1844](https://github.com/nuxt/image/pull/1844))
- Add type hints for provider option ([64c76ee](https://github.com/nuxt/image/commit/64c76ee))

### 🔥 Performance

- **nuxt-img:** Call decode before swapping from placeholder ([#2008](https://github.com/nuxt/image/pull/2008))

### 🩹 Fixes

- Remove layer0 and edgio providers ([#1763](https://github.com/nuxt/image/pull/1763))
- Add back layer0 and edgio providers (without) tests ([fee826c](https://github.com/nuxt/image/commit/fee826c))
- **cloudflare:** Don't add baseURL if there are no operations ([#1790](https://github.com/nuxt/image/pull/1790))
- **ipx:** Always use ipx provider if external baseURL is provided ([#1800](https://github.com/nuxt/image/pull/1800))
- **ipxStatic:** Strip repeated slashes from image path ([#1801](https://github.com/nuxt/image/pull/1801))
- **edgio,layer0:** ⚠️  Remove providers ([#1809](https://github.com/nuxt/image/pull/1809))
- ⚠️  Use URLSearchParams as default formatter ([#1813](https://github.com/nuxt/image/pull/1813))
- **nuxt-picture:** Export DefaultSlotProps ([891d79a](https://github.com/nuxt/image/commit/891d79a))
- **aliyun:** Explicitly import useRuntimeConfig ([268eb9c](https://github.com/nuxt/image/commit/268eb9c))
- Remove layer0 and edgio providers ([#1763](https://github.com/nuxt/image/pull/1763))
- Add back layer0 and edgio providers (without) tests ([a99ce09](https://github.com/nuxt/image/commit/a99ce09))
- **cloudflare:** Don't add baseURL if there are no operations ([#1790](https://github.com/nuxt/image/pull/1790))
- **ipx:** Always use ipx provider if external baseURL is provided ([#1800](https://github.com/nuxt/image/pull/1800))
- **ipxStatic:** Strip repeated slashes from image path ([#1801](https://github.com/nuxt/image/pull/1801))
- Avoid deep type instantiation ([12b37a2](https://github.com/nuxt/image/commit/12b37a2))
- Add types to new node + shared contexts ([#1907](https://github.com/nuxt/image/pull/1907))
- **nuxt-img:** Correct preload link for multiple densities + single size ([#1851](https://github.com/nuxt/image/pull/1851))
- **nuxt-img:** Add appropriate crossorigin attribute to preload link ([#1836](https://github.com/nuxt/image/pull/1836))
- **awsAmplify,vercel:** Set allow list of formats for providers ([#1996](https://github.com/nuxt/image/pull/1996))
- **hygraph:** Prevent broken image urls ([#1999](https://github.com/nuxt/image/pull/1999))
- **nuxt-img:** Apply preset sizes when component sizes prop is undefined ([#1919](https://github.com/nuxt/image/pull/1919))

### 💅 Refactors

- ⚠️  Remove unused runtime utilities and simplify code ([#1816](https://github.com/nuxt/image/pull/1816))
- ⚠️  Remove xs and xxl screen sizes ([#1931](https://github.com/nuxt/image/pull/1931))

### 📖 Documentation

- Fix typo ([#1762](https://github.com/nuxt/image/pull/1762))
- Fix link to runtime/providers ([#1819](https://github.com/nuxt/image/pull/1819))
- Refactor to use docus v3 ([#1868](https://github.com/nuxt/image/pull/1868))
- Put back social card ([#1870](https://github.com/nuxt/image/pull/1870))
- Fix typo ([#1762](https://github.com/nuxt/image/pull/1762))
- Fix link to runtime/providers ([#1819](https://github.com/nuxt/image/pull/1819))
- Add back plausible for stats ([42cbf6f](https://github.com/nuxt/image/commit/42cbf6f))
- **deps:** Upgrade to docus v4 ([#1916](https://github.com/nuxt/image/pull/1916))
- Update README, add section for how to install ([#1929](https://github.com/nuxt/image/pull/1929))
- Use nuxt rather than nuxi ([809e726](https://github.com/nuxt/image/commit/809e726))
- Fix getImage in the example of custom provider ([#1949](https://github.com/nuxt/image/pull/1949))
- Fix components source file link ([#1955](https://github.com/nuxt/image/pull/1955))
- Upgrade to docus v5 ([#1975](https://github.com/nuxt/image/pull/1975))
- Add example for densities prop usage ([#1937](https://github.com/nuxt/image/pull/1937))
- Adjust grammar and improve clarity in providers page ([#1945](https://github.com/nuxt/image/pull/1945))
- Explain how to configure ipx at runtime ([#1738](https://github.com/nuxt/image/pull/1738))
- Add none provider documentation ([#2002](https://github.com/nuxt/image/pull/2002))
- Fix link to css file ([f87793f](https://github.com/nuxt/image/commit/f87793f))
- Add baseURL to bunny example ([3654b3e](https://github.com/nuxt/image/commit/3654b3e))

### 📦 Build

- Pull in types from index ([533b927](https://github.com/nuxt/image/commit/533b927))
- Update ambient type hint ([62998ab](https://github.com/nuxt/image/commit/62998ab))

### 🏡 Chore

- Disable shamefully-hoist ([#1795](https://github.com/nuxt/image/pull/1795))
- Do not ignore typescript upgrades ([9421fa5](https://github.com/nuxt/image/commit/9421fa5))
- Switch to using typesVersions field ([aa39ef4](https://github.com/nuxt/image/commit/aa39ef4))
- Allow major bumps in changelog ([3989629](https://github.com/nuxt/image/commit/3989629))
- Prefer nuxt over nuxi ([#1857](https://github.com/nuxt/image/pull/1857))
- Test against node 20 ([5507c0d](https://github.com/nuxt/image/commit/5507c0d))
- Disable shamefully-hoist ([#1795](https://github.com/nuxt/image/pull/1795))
- Do not ignore typescript upgrades ([0809991](https://github.com/nuxt/image/commit/0809991))
- Switch to using typesVersions field ([b4af05a](https://github.com/nuxt/image/commit/b4af05a))
- Allow major bumps in changelog ([d486587](https://github.com/nuxt/image/commit/d486587))
- Enable oxc-resolver build ([4be31c7](https://github.com/nuxt/image/commit/4be31c7))
- Release v1.11.0 ([3123997](https://github.com/nuxt/image/commit/3123997))
- **config:** Migrate renovate config ([#1906](https://github.com/nuxt/image/pull/1906))
- Add plausible to knip ([a988f40](https://github.com/nuxt/image/commit/a988f40))
- Add verifyDepsBeforeRun: install ([#2000](https://github.com/nuxt/image/pull/2000))
- Remove .npmrc ([578c04b](https://github.com/nuxt/image/commit/578c04b))
- Update redirected URL ([#2006](https://github.com/nuxt/image/pull/2006))

### ✅ Tests

- Exclude layer0 + edgio from unit tests ([ffe2177](https://github.com/nuxt/image/commit/ffe2177))
- Add size snapshot ([#1815](https://github.com/nuxt/image/pull/1815))
- Bump timeout ([6fe8401](https://github.com/nuxt/image/commit/6fe8401))
- Skip bundle size tests in ecosystem ci ([301c504](https://github.com/nuxt/image/commit/301c504))
- Explicitly import runtime utils ([0c729e2](https://github.com/nuxt/image/commit/0c729e2))
- Migrate to vitest projects ([0fc2980](https://github.com/nuxt/image/commit/0fc2980))
- Exclude layer0 + edgio from unit tests ([3682a90](https://github.com/nuxt/image/commit/3682a90))
- Add 3x retries for e2e tests ([cfdf83a](https://github.com/nuxt/image/commit/cfdf83a))
- Add snapshots for image/picture rendering without sizes ([b4b8b0e](https://github.com/nuxt/image/commit/b4b8b0e))

### 🤖 CI

- Add release workflow and add pkg.pr.new ([#1791](https://github.com/nuxt/image/pull/1791))
- Set fetch-depth ([ec565cd](https://github.com/nuxt/image/commit/ec565cd))
- Remove forced corepack installation ([86dc4a6](https://github.com/nuxt/image/commit/86dc4a6))
- Run tests against 1.x branch ([0c83646](https://github.com/nuxt/image/commit/0c83646))
- Add release workflow and add pkg.pr.new ([#1791](https://github.com/nuxt/image/pull/1791))
- Set fetch-depth ([18ae6c7](https://github.com/nuxt/image/commit/18ae6c7))
- Test vs node 20 ([e6babef](https://github.com/nuxt/image/commit/e6babef))
- Run tests on last node LTS ([fa391c5](https://github.com/nuxt/image/commit/fa391c5))
- Use npm trusted publishing ([49ad2b7](https://github.com/nuxt/image/commit/49ad2b7))
- Add provenance action to check for downgrades in provenance ([7edc44a](https://github.com/nuxt/image/commit/7edc44a))
- Always release on pkg.pr.new ([30eb4a3](https://github.com/nuxt/image/commit/30eb4a3))
- Use push of tag as release trigger ([195cec0](https://github.com/nuxt/image/commit/195cec0))

#### ⚠️ Breaking Changes

- ⚠️  Typed providers + modifiers ([#1802](https://github.com/nuxt/image/pull/1802))
- **edgio,layer0:** ⚠️  Remove providers ([#1809](https://github.com/nuxt/image/pull/1809))
- ⚠️  Use URLSearchParams as default formatter ([#1813](https://github.com/nuxt/image/pull/1813))
- ⚠️  Remove unused runtime utilities and simplify code ([#1816](https://github.com/nuxt/image/pull/1816))
- ⚠️  Remove xs and xxl screen sizes ([#1931](https://github.com/nuxt/image/pull/1931))

### ❤️ Contributors

- Abeer0 (@iiio2)
- Daniel Roe (@danielroe)
- Tomer Danan (@Dananz)
- Nathan Chase (@nathanchase)
- Maxim Tyminko (@tyminko)
- Damian Głowala (@DamianGlowala)
- Sebastian Langer (@screeny05)
- Haruaki OTAKE (@aaharu)
- MHG (@Iran-110)
- wuiyang (@wuiyang)
- Sōta (@sotasan)
- Leonardo Rick (@LeonardoRick)
- Luke Nelson (@luc122c)
- Mike Repeć (@Flexicon)
- Amr Mohamed (@s8n11c)
- Amir Afshar (@Afshar07)
- Baptiste Leproux (@larbish)
- Julien Huang (@huang-julien)
- Chad Adams (@cadamsdev)
- Paulo Queiroz (@raggesilver)
- Sébastien Chopin (@atinux)
- Matis (@matisbag)
- Nicolas Großmann (@grossmann94)
- Frederik Bußmann (@freb97)

---

## @nuxtjs/plausible Release Notes (1.2.0 → 2.0.1)

### v2.0.0
*Released: 8/28/2025*

### &nbsp;&nbsp;&nbsp;🚨 Breaking Changes

- Upgrade to Nuxt v4 &nbsp;-&nbsp; by @johannschopplich [<samp>(7c19e)</samp>](https://github.com/nuxt-modules/plausible/commit/7c19e2b)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/nuxt-modules/plausible/compare/v1.2.0...v2.0.0)

---

## @vueuse/core Release Notes (13.1.0 → 14.1.0)

### v13.2.0
*Released: 5/14/2025*

### &nbsp;&nbsp;&nbsp;🚀 Features

- **computedAsync**: Add option to control watcher's flush timing &nbsp;-&nbsp; by @ferferga in https://github.com/vueuse/vueuse/issues/4746 [<samp>(b1bc8)</samp>](https://github.com/vueuse/vueuse/commit/b1bc8047)
- **useFileDialog**: Allow custom input element for file dialog &nbsp;-&nbsp; by @ishakhorski in https://github.com/vueuse/vueuse/issues/4679 [<samp>(0ea16)</samp>](https://github.com/vueuse/vueuse/commit/0ea16e05)
- **useScroll**: Add missing measure documentation &nbsp;-&nbsp; by @Matkolit and **Mateusz Kołodziej** in https://github.com/vueuse/vueuse/issues/4727 [<samp>(dd98a)</samp>](https://github.com/vueuse/vueuse/commit/dd98a7a7)
- **useStyleTag**: Support passing `nonce` &nbsp;-&nbsp; by @1-dilikelei and **董梁玮** in https://github.com/vueuse/vueuse/issues/4749 [<samp>(fa2c0)</samp>](https://github.com/vueuse/vueuse/commit/fa2c00ac)
- **watchOnce**: Use vue's native once behaviour &nbsp;-&nbsp; by @ferferga in https://github.com/vueuse/vueuse/issues/4750 [<samp>(08f7d)</samp>](https://github.com/vueuse/vueuse/commit/08f7dc4a)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- Allow vertical scroll in usePointerSwipe &nbsp;-&nbsp; by @2nofa11 in https://github.com/vueuse/vueuse/issues/4637 and https://github.com/vueuse/vueuse/issues/4720 [<samp>(d3ed6)</samp>](https://github.com/vueuse/vueuse/commit/d3ed667f)
- Always mount listeners in useStorage &nbsp;-&nbsp; by @43081j in https://github.com/vueuse/vueuse/issues/4730 [<samp>(65a99)</samp>](https://github.com/vueuse/vueuse/commit/65a99c41)
- **UseArrayFindReturn**: Missing template type &nbsp;-&nbsp; by @michaelcozzolino in https://github.com/vueuse/vueuse/issues/4715 [<samp>(43903)</samp>](https://github.com/vueuse/vueuse/commit/43903a0a)
- **computedAsync**: Return `ComputedRef<T>` type when `lazy: true` &nbsp;-&nbsp; by @ferferga in https://github.com/vueuse/vueuse/issues/4751 [<samp>(b1718)</samp>](https://github.com/vueuse/vueuse/commit/b1718930)
- **docs**: Grammar in /packages/nuxt/README.md &nbsp;-&nbsp; by @neeko-cat in https://github.com/vueuse/vueuse/issues/4701 [<samp>(44b40)</samp>](https://github.com/vueuse/vueuse/commit/44b402ef)
- **fromEvent**: Fix type error of element reference &nbsp;-&nbsp; by @ywenhao and @antfu in https://github.com/vueuse/vueuse/issues/4728 [<samp>(94fea)</samp>](https://github.com/vueuse/vueuse/commit/94fea430)
- **onClickOutside**: Workaround for iOS &nbsp;-&nbsp; by @ferferga in https://github.com/vueuse/vueuse/issues/4735 [<samp>(1c60c)</samp>](https://github.com/vueuse/vueuse/commit/1c60c68b)
- **useElementSize**: Component type warning &nbsp;-&nbsp; by @menghany in https://github.com/vueuse/vueuse/issues/4722 [<samp>(9889f)</samp>](https://github.com/vueuse/vueuse/commit/9889fa0c)
- **useEventSource**: Add missing data generic &nbsp;-&nbsp; by @OrbisK in https://github.com/vueuse/vueuse/issues/4726 [<samp>(a969e)</samp>](https://github.com/vueuse/vueuse/commit/a969e257)
- **useFullscreen**: Get the correct initial state while mounted &nbsp;-&nbsp; by @ben-lau and **liubaobin** in https://github.com/vueuse/vueuse/issues/4745 [<samp>(09cbd)</samp>](https://github.com/vueuse/vueuse/commit/09cbd3e7)
- **useMagicKeys**: Correctly clear current pressed keys when releasing Shift &nbsp;-&nbsp; by @Kedlingar and **Skstud5** in https://github.com/vueuse/vueuse/issues/4731 [<samp>(ab7ac)</samp>](https://github.com/vueuse/vueuse/commit/ab7acd91)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/vueuse/vueuse/compare/v13.1.0...v13.2.0)

---

### v13.3.0
*Released: 5/27/2025*

### &nbsp;&nbsp;&nbsp;🚀 Features

- **useNow**: Expose immediate option &nbsp;-&nbsp; by @scottbedard in https://github.com/vueuse/vueuse/issues/4768 [<samp>(44660)</samp>](https://github.com/vueuse/vueuse/commit/4466058d)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **asyncComputed**: Fix types for `AsyncComputedOptions` &nbsp;-&nbsp; by @antfu [<samp>(217cc)</samp>](https://github.com/vueuse/vueuse/commit/217cc54d)
- **useFetch**: Use `globalThis.fetch` when `defaultWindow.fetch` not exist &nbsp;-&nbsp; by @Groupguanfang, **Naily** and @OrbisK in https://github.com/vueuse/vueuse/issues/4765 [<samp>(bf354)</samp>](https://github.com/vueuse/vueuse/commit/bf35416c)
- **useSortable**: Fix type misalignment &nbsp;-&nbsp; by @michaelcozzolino in https://github.com/vueuse/vueuse/issues/4760 [<samp>(16692)</samp>](https://github.com/vueuse/vueuse/commit/16692a0e)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/vueuse/vueuse/compare/v13.2.0...v13.3.0)

---

### v13.4.0
*Released: 6/19/2025*

### &nbsp;&nbsp;&nbsp;🚀 Features

- **shared**: Introduce `TimerHandle` for setTimeout type &nbsp;-&nbsp; by @ilyaliao in https://github.com/vueuse/vueuse/issues/4801 [<samp>(319d8)</samp>](https://github.com/vueuse/vueuse/commit/319d821a)
- **useAsyncState**: Add executeImmediate with the same type as the promise fn &nbsp;-&nbsp; by @davidglezz in https://github.com/vueuse/vueuse/issues/4716 [<samp>(82740)</samp>](https://github.com/vueuse/vueuse/commit/827403eb)
- **useEventSource**: Added lastEventId for named events &nbsp;-&nbsp; by @whiteyebrw in https://github.com/vueuse/vueuse/issues/4791 [<samp>(f6f0b)</samp>](https://github.com/vueuse/vueuse/commit/f6f0bc1a)
- **useFetch**: Support for custom abort reason &nbsp;-&nbsp; by @doyuli in https://github.com/vueuse/vueuse/issues/4820 [<samp>(44c0b)</samp>](https://github.com/vueuse/vueuse/commit/44c0ba82)
- **useRefHistory**: Add `shouldCommit` &nbsp;-&nbsp; by @JonathanSchndr, **Anthony Fu** and **Robin** in https://github.com/vueuse/vueuse/issues/4471 [<samp>(18acf)</samp>](https://github.com/vueuse/vueuse/commit/18acfabf)
- **useUrlSearchParams**: Add a stringify option for users to provide stringify logic &nbsp;-&nbsp; by @mingXta, **Robin** and **Anthony Fu** in https://github.com/vueuse/vueuse/issues/4773 [<samp>(6a523)</samp>](https://github.com/vueuse/vueuse/commit/6a523345)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **computedWithControl**: Allow deeply watching source &nbsp;-&nbsp; by @MetRonnie and **Anthony Fu** in https://github.com/vueuse/vueuse/issues/4786 [<samp>(ffc1a)</samp>](https://github.com/vueuse/vueuse/commit/ffc1ae3d)
- **useDevicesList**: Check for device availability before requesting permissions &nbsp;-&nbsp; by @ilyaliao in https://github.com/vueuse/vueuse/issues/4818 [<samp>(c424f)</samp>](https://github.com/vueuse/vueuse/commit/c424f984)
- **useEventListener**: Improve types &nbsp;-&nbsp; by @ArthurDarkstone, **liliang18** and @Alfred-Skyblue in https://github.com/vueuse/vueuse/issues/4787 [<samp>(6f565)</samp>](https://github.com/vueuse/vueuse/commit/6f565833)
- **useIdle**: Changed the `reset` call when the initial value is true &nbsp;-&nbsp; by @whiteyebrw in https://github.com/vueuse/vueuse/issues/4800 [<samp>(c6469)</samp>](https://github.com/vueuse/vueuse/commit/c6469d5d)
- **useMouseInElement**: Fixing the issue where target element updates were not considered. &nbsp;-&nbsp; by @Codfisher and **bgm.cod** in https://github.com/vueuse/vueuse/issues/4782 [<samp>(04af9)</samp>](https://github.com/vueuse/vueuse/commit/04af98c8)
- **useScreenSafeArea**: Сhanged initial value update &nbsp;-&nbsp; by @whiteyebrw in https://github.com/vueuse/vueuse/issues/4789 [<samp>(ae573)</samp>](https://github.com/vueuse/vueuse/commit/ae573a0f)
- **useScriptTag**: Support passing nonce &nbsp;-&nbsp; by @1-dilikelei and **董梁玮** in https://github.com/vueuse/vueuse/issues/4753 [<samp>(57370)</samp>](https://github.com/vueuse/vueuse/commit/573707f3)
- **useScroll**: Use mutationObserver to update arrivedState when the DOM is changed &nbsp;-&nbsp; by @andylou0102, **AndyLuo**, **Robin** and **Anthony Fu** in https://github.com/vueuse/vueuse/issues/4433 [<samp>(135d5)</samp>](https://github.com/vueuse/vueuse/commit/135d5071)
- **watchIgnorable**: Add and export types &nbsp;-&nbsp; by @ArthurDarkstone, **liliang18** and **Robin** in https://github.com/vueuse/vueuse/issues/4809 [<samp>(0e10e)</samp>](https://github.com/vueuse/vueuse/commit/0e10eb25)

### &nbsp;&nbsp;&nbsp;🏎 Performance

- **computedWithControl**: Optimize with shallowRef &nbsp;-&nbsp; by @broBinChen and **binge_c-admin** in https://github.com/vueuse/vueuse/issues/4826 [<samp>(2c91a)</samp>](https://github.com/vueuse/vueuse/commit/2c91ad8e)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/vueuse/vueuse/compare/v13.3.0...v13.4.0)

---

### v13.5.0
*Released: 7/2/2025*

### &nbsp;&nbsp;&nbsp;🚀 Features

- **useSpeechSynthesis**: Add reactivity for volume &nbsp;-&nbsp; by @whiteyebrw in https://github.com/vueuse/vueuse/issues/4837 [<samp>(4d125)</samp>](https://github.com/vueuse/vueuse/commit/4d125f24)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **useCookie**: Update `universal-cookie` range to `^7 || ^8` #4834

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/vueuse/vueuse/compare/v13.4.0...v13.5.0)

---

### v13.6.0
*Released: 7/28/2025*

### &nbsp;&nbsp;&nbsp;🚀 Features

- Mark templateRef as deprecated &nbsp;-&nbsp; by @ilyaliao in https://github.com/vueuse/vueuse/issues/4894 [<samp>(0271e)</samp>](https://github.com/vueuse/vueuse/commit/0271eef9)
- **useFileDialog**: Add MaybRef to multiple, accept, capture, reset, and directory &nbsp;-&nbsp; by @hunterwilhelm, **Anthony Fu** and @antfu in https://github.com/vueuse/vueuse/issues/4813 [<samp>(a44bd)</samp>](https://github.com/vueuse/vueuse/commit/a44bdc2c)
- **useFocusTrap**: Expose updateContainerElements for dynamic contai… &nbsp;-&nbsp; by @PeikyLiu and @ilyaliao in https://github.com/vueuse/vueuse/issues/4849 [<samp>(3d5e5)</samp>](https://github.com/vueuse/vueuse/commit/3d5e511a)
- **useIDBKeyval**: Add `options.serializer` &nbsp;-&nbsp; by @matthewjumpsoffbuildings, @OrbisK and @43081j in https://github.com/vueuse/vueuse/issues/4781 [<samp>(bb831)</samp>](https://github.com/vueuse/vueuse/commit/bb831783)
- **useStorageAsync**: Add `onReady` option and Promise return &nbsp;-&nbsp; by @asika32764, **Fernando Fernández**, @OrbisK and **Anthony Fu** in https://github.com/vueuse/vueuse/issues/4158 [<samp>(3a2df)</samp>](https://github.com/vueuse/vueuse/commit/3a2df2e1)
- **useTransition**: Support custom  window &nbsp;-&nbsp; by @byronogis and **Anthony Fu** in https://github.com/vueuse/vueuse/issues/4850 [<samp>(a75f4)</samp>](https://github.com/vueuse/vueuse/commit/a75f40c8)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **onClickOutside**: The order of overload signatures &nbsp;-&nbsp; by @whiteyebrw, @ilyaliao and **Anthony Fu** in https://github.com/vueuse/vueuse/issues/4839 [<samp>(d5812)</samp>](https://github.com/vueuse/vueuse/commit/d5812393)
- **types**: Use Vue's native `MaybeRef` and `MaybeRefOrGetter` instead &nbsp;-&nbsp; by @RYGRIT in https://github.com/vueuse/vueuse/issues/4913 [<samp>(2d179)</samp>](https://github.com/vueuse/vueuse/commit/2d1797b9)
- **useDraggable**: Add capture prop to component &nbsp;-&nbsp; by @wgh970312 in https://github.com/vueuse/vueuse/issues/4911 [<samp>(547f8)</samp>](https://github.com/vueuse/vueuse/commit/547f8fa8)
- **useMagicKeys**: Prevent incorrect clearing of other keys after releasing shift &nbsp;-&nbsp; by @keeplearning66 in https://github.com/vueuse/vueuse/issues/4916 [<samp>(d7f28)</samp>](https://github.com/vueuse/vueuse/commit/d7f284af)
- **useMouseInElement**: Correctly update elementX and elementY &nbsp;-&nbsp; by @cszhjh and @ilyaliao in https://github.com/vueuse/vueuse/issues/4846 [<samp>(cf02b)</samp>](https://github.com/vueuse/vueuse/commit/cf02b997)
- **useVirtualList**: Resolve invalid watch source &nbsp;-&nbsp; by @cszhjh and @OrbisK in https://github.com/vueuse/vueuse/issues/4857 [<samp>(d2381)</samp>](https://github.com/vueuse/vueuse/commit/d23812db)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/vueuse/vueuse/compare/v13.5.0...v13.6.0)

---

### v13.7.0
*Released: 8/18/2025*

### &nbsp;&nbsp;&nbsp;🚨 Breaking Changes

- **useAsyncState**: Set globalThis.reportError as default onError &nbsp;-&nbsp; by @kalu5 in https://github.com/vueuse/vueuse/issues/4951 [<samp>(f6e88)</samp>](https://github.com/vueuse/vueuse/commit/f6e88984)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **computedAsync**: Use globalThis.reportError as default onError &nbsp;-&nbsp; by @babu-ch in https://github.com/vueuse/vueuse/issues/4943 [<samp>(226a2)</samp>](https://github.com/vueuse/vueuse/commit/226a229b)
- **useClipboardItems**: Expose `read()` &nbsp;-&nbsp; by @OrbisK in https://github.com/vueuse/vueuse/issues/4954 [<samp>(d03b2)</samp>](https://github.com/vueuse/vueuse/commit/d03b2a42)
- **useDevicePixelRatio**: Improve types &nbsp;-&nbsp; by @doyuli in https://github.com/vueuse/vueuse/issues/4927 [<samp>(1b3d4)</samp>](https://github.com/vueuse/vueuse/commit/1b3d4e6a)
- **useSpeechSynthesisOptions**: Add option `onBoundary` &nbsp;-&nbsp; by @pkc918 in https://github.com/vueuse/vueuse/issues/4960 [<samp>(c0dca)</samp>](https://github.com/vueuse/vueuse/commit/c0dca935)
- **useTimeAgoIntl**: Add `useTimaAgoIntl` &nbsp;-&nbsp; by @northword and **Anthony Fu** in https://github.com/vueuse/vueuse/issues/4821 [<samp>(81815)</samp>](https://github.com/vueuse/vueuse/commit/81815762)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **ci**: Avoid duplicate `nr update` execution in `docs:build` &nbsp;-&nbsp; by @serkodev in https://github.com/vueuse/vueuse/issues/4925 [<samp>(a73ee)</samp>](https://github.com/vueuse/vueuse/commit/a73eedd0)
- **useAnimate**: Respect `immediate: false` with conditionally rendered elements &nbsp;-&nbsp; by @curtgrimes in https://github.com/vueuse/vueuse/issues/4947 [<samp>(90c7f)</samp>](https://github.com/vueuse/vueuse/commit/90c7f5b9)
- **useGamepad**: Correct type assertion for vibrationActuator &nbsp;-&nbsp; by @ArthurDarkstone in https://github.com/vueuse/vueuse/issues/4964 [<samp>(c5277)</samp>](https://github.com/vueuse/vueuse/commit/c5277625)
- **useStorage**: Make sure to always read data if new value is `undefined` &nbsp;-&nbsp; by @OrbisK in https://github.com/vueuse/vueuse/issues/4957 [<samp>(22116)</samp>](https://github.com/vueuse/vueuse/commit/22116b69)

### &nbsp;&nbsp;&nbsp;🏎 Performance

- **twoslash**: Optimize twoslash cache &nbsp;-&nbsp; by @doyuli in https://github.com/vueuse/vueuse/issues/4939 [<samp>(93064)</samp>](https://github.com/vueuse/vueuse/commit/930648d5)
- **useMutationObserver**: Watch ref directly &nbsp;-&nbsp; by @VividLemon in https://github.com/vueuse/vueuse/issues/4940 [<samp>(01cd9)</samp>](https://github.com/vueuse/vueuse/commit/01cd9cf9)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/vueuse/vueuse/compare/v13.6.0...v13.7.0)

---

### v13.8.0
*Released: 8/27/2025*

### &nbsp;&nbsp;&nbsp;🚀 Features

- **useEventSource**: Add `serializer` &nbsp;-&nbsp; by @imddc and @ilyaliao in https://github.com/vueuse/vueuse/issues/4953 [<samp>(64651)</samp>](https://github.com/vueuse/vueuse/commit/64651a33)

### &nbsp;&nbsp;&nbsp;🏎 Performance

- **docs**: Replace `twoslash` with own function for comparing js snippet &nbsp;-&nbsp; by @serkodev in https://github.com/vueuse/vueuse/issues/4977 [<samp>(909fd)</samp>](https://github.com/vueuse/vueuse/commit/909fd253)
- **usePointer**: Use shallowRef for better performance &nbsp;-&nbsp; by @broBinChen and **xiaobin** in https://github.com/vueuse/vueuse/issues/4980 [<samp>(ce09e)</samp>](https://github.com/vueuse/vueuse/commit/ce09e0d0)
- **usePreferredLanguages**: Use shallowRef for better performance &nbsp;-&nbsp; by @ilyaliao in https://github.com/vueuse/vueuse/issues/4973 [<samp>(361c8)</samp>](https://github.com/vueuse/vueuse/commit/361c8431)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/vueuse/vueuse/compare/v13.7.0...v13.8.0)

---

### v13.9.0
*Released: 9/1/2025*

### &nbsp;&nbsp;&nbsp;🚀 Features

- **onLongPress**: Allow function as value in delay &nbsp;-&nbsp; by @keeplearning66 in https://github.com/vueuse/vueuse/issues/4979 [<samp>(415f3)</samp>](https://github.com/vueuse/vueuse/commit/415f376f)
- **useAsyncState**: Allow initial value to be a ref &nbsp;-&nbsp; by @43081j in https://github.com/vueuse/vueuse/issues/4992 [<samp>(e38e8)</samp>](https://github.com/vueuse/vueuse/commit/e38e8d9c)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **types**: Update type casting for watch functions to use WatchSource<T> &nbsp;-&nbsp; by @ArthurDarkstone in https://github.com/vueuse/vueuse/issues/4966 [<samp>(00a72)</samp>](https://github.com/vueuse/vueuse/commit/00a72919)
- **useUrlSearchParams**: Restore proper history and navigation behavior &nbsp;-&nbsp; by @yosong-github and @ilyaliao in https://github.com/vueuse/vueuse/issues/4969 [<samp>(1cff4)</samp>](https://github.com/vueuse/vueuse/commit/1cff4c40)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/vueuse/vueuse/compare/v13.8.0...v13.9.0)

---

### v14.0.0
*Released: 10/22/2025*

### &nbsp;&nbsp;&nbsp;🚨 Breaking Changes

- Migrate to `tsdown`, move dist files &nbsp;-&nbsp; by @9romise and **Anthony Fu** in https://github.com/vueuse/vueuse/issues/5004 [<samp>(a2e2c)</samp>](https://github.com/vueuse/vueuse/commit/a2e2cedb)
- Deprecate alias exports in favor of original function names &nbsp;-&nbsp; by @9romise in https://github.com/vueuse/vueuse/issues/5009 [<samp>(e5f74)</samp>](https://github.com/vueuse/vueuse/commit/e5f74fb4)
- Requires Vue 3.5 &nbsp;-&nbsp; by @antfu [<samp>(fe458)</samp>](https://github.com/vueuse/vueuse/commit/fe45820e)
- **components**: Refactor components and make them consistent &nbsp;-&nbsp; by @ilyaliao in https://github.com/vueuse/vueuse/issues/4912 [<samp>(8c521)</samp>](https://github.com/vueuse/vueuse/commit/8c521d4e)
- **computedAsync**: Default to `flush: sync` &nbsp;-&nbsp; by @ferferga in https://github.com/vueuse/vueuse/issues/4752 [<samp>(573bf)</samp>](https://github.com/vueuse/vueuse/commit/573bfb07)
- **createSharedComposable**: Return only the sharedComposable on client side &nbsp;-&nbsp; by @9romise in https://github.com/vueuse/vueuse/issues/4997 [<samp>(73aad)</samp>](https://github.com/vueuse/vueuse/commit/73aad317)
- **firebase**: Upgrade to firebase v12 &nbsp;-&nbsp; by @antfu [<samp>(8cb0b)</samp>](https://github.com/vueuse/vueuse/commit/8cb0b4b9)
- **nuxt**: Use Nuxt v4 kit &nbsp;-&nbsp; by @antfu [<samp>(070fc)</samp>](https://github.com/vueuse/vueuse/commit/070fc8cf)
- **shared**: Drop some deprecated apis &nbsp;-&nbsp; by @9romise in https://github.com/vueuse/vueuse/issues/5010 [<samp>(971b2)</samp>](https://github.com/vueuse/vueuse/commit/971b2a00)
- **useClipboard**: Use `readonly()` instead of type assertion `Computed` &nbsp;-&nbsp; by @9romise in https://github.com/vueuse/vueuse/issues/5081 [<samp>(67812)</samp>](https://github.com/vueuse/vueuse/commit/67812c66)
- **useSwipe**: Remove isPassiveEventSupported &nbsp;-&nbsp; by @pkc918 in https://github.com/vueuse/vueuse/issues/4886 [<samp>(620a9)</samp>](https://github.com/vueuse/vueuse/commit/620a9491)
- **useThrottleFn**: Align with traditional throttle behavior &nbsp;-&nbsp; by @IceMooncake and @ilyaliao in https://github.com/vueuse/vueuse/issues/4923 [<samp>(cefd2)</samp>](https://github.com/vueuse/vueuse/commit/cefd228b)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **computedEager**: Deprecate `computedEager` &nbsp;-&nbsp; by @ilyaliao in https://github.com/vueuse/vueuse/issues/5034 [<samp>(26a7d)</samp>](https://github.com/vueuse/vueuse/commit/26a7d34f)
- **onClickOutside**: Allow the value of target to be a getter &nbsp;-&nbsp; by @keeplearning66 in https://github.com/vueuse/vueuse/issues/5098 [<samp>(7133c)</samp>](https://github.com/vueuse/vueuse/commit/7133cfe4)
- **onLongPress**: Allow function as value in delay &nbsp;-&nbsp; by @keeplearning66 in https://github.com/vueuse/vueuse/issues/4979 [<samp>(415f3)</samp>](https://github.com/vueuse/vueuse/commit/415f376f)
- **refManualReset**: New function &nbsp;-&nbsp; by @phk422, @OrbisK, @ilyaliao and **Anthony Fu** in https://github.com/vueuse/vueuse/issues/4644 [<samp>(81bb3)</samp>](https://github.com/vueuse/vueuse/commit/81bb3cde)
- **useAsyncState**: Allow initial value to be a ref &nbsp;-&nbsp; by @43081j in https://github.com/vueuse/vueuse/issues/4992 [<samp>(e38e8)</samp>](https://github.com/vueuse/vueuse/commit/e38e8d9c)
- **useIdle**: Implement `Stoppable` interface &nbsp;-&nbsp; by @dpbs-715 and **Anthony Fu** in https://github.com/vueuse/vueuse/issues/5068 [<samp>(3f96a)</samp>](https://github.com/vueuse/vueuse/commit/3f96a1fe)
- **useTextSelection**: Set initial value for use text selection &nbsp;-&nbsp; by @kevinluo201 in https://github.com/vueuse/vueuse/issues/5092 [<samp>(dbb3e)</samp>](https://github.com/vueuse/vueuse/commit/dbb3ed07)
- **useTransition**: Add support for custom interpolator functions &nbsp;-&nbsp; by @scottbedard and **Anthony Fu** in https://github.com/vueuse/vueuse/issues/5011 [<samp>(cf905)</samp>](https://github.com/vueuse/vueuse/commit/cf905ccf)
- **watch**: Update watch return typo in watchExtractedObservable, watchDebounced, watchDeep, watchImmediate, watchOnce, watchThrottled and watchWithFilter &nbsp;-&nbsp; by @ArthurDarkstone in https://github.com/vueuse/vueuse/issues/4896 [<samp>(b8102)</samp>](https://github.com/vueuse/vueuse/commit/b8102b5e)
- **watchAtMost**: Add pause and resume to return value &nbsp;-&nbsp; by @ArthurDarkstone in https://github.com/vueuse/vueuse/issues/4897 [<samp>(d3176)</samp>](https://github.com/vueuse/vueuse/commit/d317610e)
- **watchPausable**: Deprecate `watchPausable` &nbsp;-&nbsp; by @ilyaliao in https://github.com/vueuse/vueuse/issues/5040 [<samp>(4a28b)</samp>](https://github.com/vueuse/vueuse/commit/4a28be90)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- Update return type of createReusableTemplate and createTemplateP… &nbsp;-&nbsp; by @ArthurDarkstone in https://github.com/vueuse/vueuse/issues/4962 [<samp>(5fd3a)</samp>](https://github.com/vueuse/vueuse/commit/5fd3a935)
- Update return types for createTemplatePromise, useMagicKeys, use… &nbsp;-&nbsp; by @ArthurDarkstone in https://github.com/vueuse/vueuse/issues/4963 [<samp>(554b7)</samp>](https://github.com/vueuse/vueuse/commit/554b74e9)
- Update parameter types to use ComponentInternalInstance in lifec… &nbsp;-&nbsp; by @ArthurDarkstone in https://github.com/vueuse/vueuse/issues/5060 [<samp>(a49a3)</samp>](https://github.com/vueuse/vueuse/commit/a49a3ede)
- **integrations**: Use relative import in `component.ts` &nbsp;-&nbsp; by @9romise in https://github.com/vueuse/vueuse/issues/5025 [<samp>(d5bcd)</samp>](https://github.com/vueuse/vueuse/commit/d5bcd50b)
- **shared**: Support provideLocal/injectLocal in vapor mode &nbsp;-&nbsp; by @ZKunZhang and **Zhaokun Zhang** in https://github.com/vueuse/vueuse/issues/5050 [<samp>(51872)</samp>](https://github.com/vueuse/vueuse/commit/51872941)
- **tryOnScopeDispose**: Add optional failSilently parameter and updat… &nbsp;-&nbsp; by @ArthurDarkstone and @ilyaliao in https://github.com/vueuse/vueuse/issues/5061 [<samp>(a4862)</samp>](https://github.com/vueuse/vueuse/commit/a4862a44)
- **types**: Update type casting for watch functions to use WatchSource<T> &nbsp;-&nbsp; by @ArthurDarkstone in https://github.com/vueuse/vueuse/issues/4966 [<samp>(00a72)</samp>](https://github.com/vueuse/vueuse/commit/00a72919)
- **useAsyncState**: Track latest execution to avoid newer results being replaced by outdated ones &nbsp;-&nbsp; by @andreww2012 in https://github.com/vueuse/vueuse/issues/5047 [<samp>(3e6cb)</samp>](https://github.com/vueuse/vueuse/commit/3e6cbf12)
- **useFullscreen**: Specify return types for request, exit, and enabl… &nbsp;-&nbsp; by @ArthurDarkstone in https://github.com/vueuse/vueuse/issues/4965 [<samp>(8ac73)</samp>](https://github.com/vueuse/vueuse/commit/8ac73870)
- **useMagicKeys**: Clearing of other keys after releasing alt &nbsp;-&nbsp; by @NoiseFan in https://github.com/vueuse/vueuse/issues/5037 [<samp>(3f113)</samp>](https://github.com/vueuse/vueuse/commit/3f113f5e)
- **useShare**: Improve the accuracy of sharing logic &nbsp;-&nbsp; by @ArthurDarkstone in https://github.com/vueuse/vueuse/issues/5048 [<samp>(61e1b)</samp>](https://github.com/vueuse/vueuse/commit/61e1be05)
- **useUrlSearchParams**: Restore proper history and navigation behavior &nbsp;-&nbsp; by @yosong-github and @ilyaliao in https://github.com/vueuse/vueuse/issues/4969 [<samp>(1cff4)</samp>](https://github.com/vueuse/vueuse/commit/1cff4c40)
- **useUserMedia**: Add deep watch to constraints &nbsp;-&nbsp; by @babu-ch and @ilyaliao in https://github.com/vueuse/vueuse/issues/5046 [<samp>(4b3e9)</samp>](https://github.com/vueuse/vueuse/commit/4b3e976d)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/vueuse/vueuse/compare/v13.8.0...v14.0.0)

---

### v14.1.0
*Released: 11/27/2025*

### &nbsp;&nbsp;&nbsp;🚀 Features

- **useDropZone**: Add checkValidity function &nbsp;-&nbsp; by @kolaente in https://github.com/vueuse/vueuse/issues/5169 [<samp>(aee84)</samp>](https://github.com/vueuse/vueuse/commit/aee846cb)
- **useElementVisibility**: Add `initialValue` option &nbsp;-&nbsp; by @kricsleo and @9romise in https://github.com/vueuse/vueuse/issues/5159 [<samp>(13f36)</samp>](https://github.com/vueuse/vueuse/commit/13f361fa)
- **useMouseInElement**: Add support for tracking inline-level elements &nbsp;-&nbsp; by @siavava and @9romise in https://github.com/vueuse/vueuse/issues/5049 [<samp>(62dfb)</samp>](https://github.com/vueuse/vueuse/commit/62dfb80a)
- **useTimeAgoIntl**: Custom units &nbsp;-&nbsp; by @Menci in https://github.com/vueuse/vueuse/issues/5188 [<samp>(c7d09)</samp>](https://github.com/vueuse/vueuse/commit/c7d09ef4)
- **useWebSocket**: `autoConnect.delay` support function &nbsp;-&nbsp; by @YuchenWell, **Anthony Fu** and @9romise in https://github.com/vueuse/vueuse/issues/5089 [<samp>(176f2)</samp>](https://github.com/vueuse/vueuse/commit/176f2515)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- Typescript type of `isIOS` constant &nbsp;-&nbsp; by @toofishes in https://github.com/vueuse/vueuse/issues/5163 [<samp>(60888)</samp>](https://github.com/vueuse/vueuse/commit/60888d43)
- **computedWithControl**: Allow different types in watch sources array &nbsp;-&nbsp; by @kricsleo in https://github.com/vueuse/vueuse/issues/5184 [<samp>(bc4ac)</samp>](https://github.com/vueuse/vueuse/commit/bc4aca90)
- **types**: Allow async functions in useDebounceFn and useThrottleFn &nbsp;-&nbsp; by @xiaoxiaohuayu in https://github.com/vueuse/vueuse/issues/5131 [<samp>(7fb7a)</samp>](https://github.com/vueuse/vueuse/commit/7fb7a05a)
- **types**: Deprecate embeded `ResizeObserverSize` types &nbsp;-&nbsp; by @9romise in https://github.com/vueuse/vueuse/issues/5127 [<samp>(d7a07)</samp>](https://github.com/vueuse/vueuse/commit/d7a07010)
- **useArrayReduce**: Export `UseArrayReduceReturn` type &nbsp;-&nbsp; by @michaelcozzolino in https://github.com/vueuse/vueuse/issues/5177 [<samp>(e1204)</samp>](https://github.com/vueuse/vueuse/commit/e1204722)
- **useAsyncQueue**: Trigger onFinished when the last task is rejected &nbsp;-&nbsp; by @keeplearning66 and @9romise in https://github.com/vueuse/vueuse/issues/5144 [<samp>(c4a46)</samp>](https://github.com/vueuse/vueuse/commit/c4a46025)
- **useClipboard**: Add readonly attribute to textarea fallback to support Safari 15 &nbsp;-&nbsp; by @huajianjiu in https://github.com/vueuse/vueuse/issues/5179 [<samp>(ef0c4)</samp>](https://github.com/vueuse/vueuse/commit/ef0c4f82)
- **useInfiniteScroll**: Make canLoadMore reactive &nbsp;-&nbsp; by @nhquyss in https://github.com/vueuse/vueuse/issues/5110 [<samp>(3dc2d)</samp>](https://github.com/vueuse/vueuse/commit/3dc2d831)
- **useMagicKeys**: Handle empty key events to prevent errors &nbsp;-&nbsp; by @babu-ch and @9romise in https://github.com/vueuse/vueuse/issues/5149 [<samp>(f8aec)</samp>](https://github.com/vueuse/vueuse/commit/f8aecd82)
- **useScroll**: Use configurable window's `getComputedStyle` &nbsp;-&nbsp; by @9romise in https://github.com/vueuse/vueuse/issues/5150 [<samp>(f74a6)</samp>](https://github.com/vueuse/vueuse/commit/f74a68d4)
- **useSpeechRecognition**: Catch the error while calling method start &nbsp;-&nbsp; by @ben-lau, **liubaobin** and @9romise in https://github.com/vueuse/vueuse/issues/5142 [<samp>(94f1e)</samp>](https://github.com/vueuse/vueuse/commit/94f1e9e7)
- **useTimeout**: Fix type typo &nbsp;-&nbsp; by @keeplearning66, **Robin** and **Anthony Fu** in https://github.com/vueuse/vueuse/issues/5147 [<samp>(31e5c)</samp>](https://github.com/vueuse/vueuse/commit/31e5cb0c)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/vueuse/vueuse/compare/v14.0.0...v14.1.0)

---

## @vueuse/nuxt Release Notes (13.1.0 → 14.1.0)

### v13.2.0
*Released: 5/14/2025*

### &nbsp;&nbsp;&nbsp;🚀 Features

- **computedAsync**: Add option to control watcher's flush timing &nbsp;-&nbsp; by @ferferga in https://github.com/vueuse/vueuse/issues/4746 [<samp>(b1bc8)</samp>](https://github.com/vueuse/vueuse/commit/b1bc8047)
- **useFileDialog**: Allow custom input element for file dialog &nbsp;-&nbsp; by @ishakhorski in https://github.com/vueuse/vueuse/issues/4679 [<samp>(0ea16)</samp>](https://github.com/vueuse/vueuse/commit/0ea16e05)
- **useScroll**: Add missing measure documentation &nbsp;-&nbsp; by @Matkolit and **Mateusz Kołodziej** in https://github.com/vueuse/vueuse/issues/4727 [<samp>(dd98a)</samp>](https://github.com/vueuse/vueuse/commit/dd98a7a7)
- **useStyleTag**: Support passing `nonce` &nbsp;-&nbsp; by @1-dilikelei and **董梁玮** in https://github.com/vueuse/vueuse/issues/4749 [<samp>(fa2c0)</samp>](https://github.com/vueuse/vueuse/commit/fa2c00ac)
- **watchOnce**: Use vue's native once behaviour &nbsp;-&nbsp; by @ferferga in https://github.com/vueuse/vueuse/issues/4750 [<samp>(08f7d)</samp>](https://github.com/vueuse/vueuse/commit/08f7dc4a)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- Allow vertical scroll in usePointerSwipe &nbsp;-&nbsp; by @2nofa11 in https://github.com/vueuse/vueuse/issues/4637 and https://github.com/vueuse/vueuse/issues/4720 [<samp>(d3ed6)</samp>](https://github.com/vueuse/vueuse/commit/d3ed667f)
- Always mount listeners in useStorage &nbsp;-&nbsp; by @43081j in https://github.com/vueuse/vueuse/issues/4730 [<samp>(65a99)</samp>](https://github.com/vueuse/vueuse/commit/65a99c41)
- **UseArrayFindReturn**: Missing template type &nbsp;-&nbsp; by @michaelcozzolino in https://github.com/vueuse/vueuse/issues/4715 [<samp>(43903)</samp>](https://github.com/vueuse/vueuse/commit/43903a0a)
- **computedAsync**: Return `ComputedRef<T>` type when `lazy: true` &nbsp;-&nbsp; by @ferferga in https://github.com/vueuse/vueuse/issues/4751 [<samp>(b1718)</samp>](https://github.com/vueuse/vueuse/commit/b1718930)
- **docs**: Grammar in /packages/nuxt/README.md &nbsp;-&nbsp; by @neeko-cat in https://github.com/vueuse/vueuse/issues/4701 [<samp>(44b40)</samp>](https://github.com/vueuse/vueuse/commit/44b402ef)
- **fromEvent**: Fix type error of element reference &nbsp;-&nbsp; by @ywenhao and @antfu in https://github.com/vueuse/vueuse/issues/4728 [<samp>(94fea)</samp>](https://github.com/vueuse/vueuse/commit/94fea430)
- **onClickOutside**: Workaround for iOS &nbsp;-&nbsp; by @ferferga in https://github.com/vueuse/vueuse/issues/4735 [<samp>(1c60c)</samp>](https://github.com/vueuse/vueuse/commit/1c60c68b)
- **useElementSize**: Component type warning &nbsp;-&nbsp; by @menghany in https://github.com/vueuse/vueuse/issues/4722 [<samp>(9889f)</samp>](https://github.com/vueuse/vueuse/commit/9889fa0c)
- **useEventSource**: Add missing data generic &nbsp;-&nbsp; by @OrbisK in https://github.com/vueuse/vueuse/issues/4726 [<samp>(a969e)</samp>](https://github.com/vueuse/vueuse/commit/a969e257)
- **useFullscreen**: Get the correct initial state while mounted &nbsp;-&nbsp; by @ben-lau and **liubaobin** in https://github.com/vueuse/vueuse/issues/4745 [<samp>(09cbd)</samp>](https://github.com/vueuse/vueuse/commit/09cbd3e7)
- **useMagicKeys**: Correctly clear current pressed keys when releasing Shift &nbsp;-&nbsp; by @Kedlingar and **Skstud5** in https://github.com/vueuse/vueuse/issues/4731 [<samp>(ab7ac)</samp>](https://github.com/vueuse/vueuse/commit/ab7acd91)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/vueuse/vueuse/compare/v13.1.0...v13.2.0)

---

### v13.3.0
*Released: 5/27/2025*

### &nbsp;&nbsp;&nbsp;🚀 Features

- **useNow**: Expose immediate option &nbsp;-&nbsp; by @scottbedard in https://github.com/vueuse/vueuse/issues/4768 [<samp>(44660)</samp>](https://github.com/vueuse/vueuse/commit/4466058d)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **asyncComputed**: Fix types for `AsyncComputedOptions` &nbsp;-&nbsp; by @antfu [<samp>(217cc)</samp>](https://github.com/vueuse/vueuse/commit/217cc54d)
- **useFetch**: Use `globalThis.fetch` when `defaultWindow.fetch` not exist &nbsp;-&nbsp; by @Groupguanfang, **Naily** and @OrbisK in https://github.com/vueuse/vueuse/issues/4765 [<samp>(bf354)</samp>](https://github.com/vueuse/vueuse/commit/bf35416c)
- **useSortable**: Fix type misalignment &nbsp;-&nbsp; by @michaelcozzolino in https://github.com/vueuse/vueuse/issues/4760 [<samp>(16692)</samp>](https://github.com/vueuse/vueuse/commit/16692a0e)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/vueuse/vueuse/compare/v13.2.0...v13.3.0)

---

### v13.4.0
*Released: 6/19/2025*

### &nbsp;&nbsp;&nbsp;🚀 Features

- **shared**: Introduce `TimerHandle` for setTimeout type &nbsp;-&nbsp; by @ilyaliao in https://github.com/vueuse/vueuse/issues/4801 [<samp>(319d8)</samp>](https://github.com/vueuse/vueuse/commit/319d821a)
- **useAsyncState**: Add executeImmediate with the same type as the promise fn &nbsp;-&nbsp; by @davidglezz in https://github.com/vueuse/vueuse/issues/4716 [<samp>(82740)</samp>](https://github.com/vueuse/vueuse/commit/827403eb)
- **useEventSource**: Added lastEventId for named events &nbsp;-&nbsp; by @whiteyebrw in https://github.com/vueuse/vueuse/issues/4791 [<samp>(f6f0b)</samp>](https://github.com/vueuse/vueuse/commit/f6f0bc1a)
- **useFetch**: Support for custom abort reason &nbsp;-&nbsp; by @doyuli in https://github.com/vueuse/vueuse/issues/4820 [<samp>(44c0b)</samp>](https://github.com/vueuse/vueuse/commit/44c0ba82)
- **useRefHistory**: Add `shouldCommit` &nbsp;-&nbsp; by @JonathanSchndr, **Anthony Fu** and **Robin** in https://github.com/vueuse/vueuse/issues/4471 [<samp>(18acf)</samp>](https://github.com/vueuse/vueuse/commit/18acfabf)
- **useUrlSearchParams**: Add a stringify option for users to provide stringify logic &nbsp;-&nbsp; by @mingXta, **Robin** and **Anthony Fu** in https://github.com/vueuse/vueuse/issues/4773 [<samp>(6a523)</samp>](https://github.com/vueuse/vueuse/commit/6a523345)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **computedWithControl**: Allow deeply watching source &nbsp;-&nbsp; by @MetRonnie and **Anthony Fu** in https://github.com/vueuse/vueuse/issues/4786 [<samp>(ffc1a)</samp>](https://github.com/vueuse/vueuse/commit/ffc1ae3d)
- **useDevicesList**: Check for device availability before requesting permissions &nbsp;-&nbsp; by @ilyaliao in https://github.com/vueuse/vueuse/issues/4818 [<samp>(c424f)</samp>](https://github.com/vueuse/vueuse/commit/c424f984)
- **useEventListener**: Improve types &nbsp;-&nbsp; by @ArthurDarkstone, **liliang18** and @Alfred-Skyblue in https://github.com/vueuse/vueuse/issues/4787 [<samp>(6f565)</samp>](https://github.com/vueuse/vueuse/commit/6f565833)
- **useIdle**: Changed the `reset` call when the initial value is true &nbsp;-&nbsp; by @whiteyebrw in https://github.com/vueuse/vueuse/issues/4800 [<samp>(c6469)</samp>](https://github.com/vueuse/vueuse/commit/c6469d5d)
- **useMouseInElement**: Fixing the issue where target element updates were not considered. &nbsp;-&nbsp; by @Codfisher and **bgm.cod** in https://github.com/vueuse/vueuse/issues/4782 [<samp>(04af9)</samp>](https://github.com/vueuse/vueuse/commit/04af98c8)
- **useScreenSafeArea**: Сhanged initial value update &nbsp;-&nbsp; by @whiteyebrw in https://github.com/vueuse/vueuse/issues/4789 [<samp>(ae573)</samp>](https://github.com/vueuse/vueuse/commit/ae573a0f)
- **useScriptTag**: Support passing nonce &nbsp;-&nbsp; by @1-dilikelei and **董梁玮** in https://github.com/vueuse/vueuse/issues/4753 [<samp>(57370)</samp>](https://github.com/vueuse/vueuse/commit/573707f3)
- **useScroll**: Use mutationObserver to update arrivedState when the DOM is changed &nbsp;-&nbsp; by @andylou0102, **AndyLuo**, **Robin** and **Anthony Fu** in https://github.com/vueuse/vueuse/issues/4433 [<samp>(135d5)</samp>](https://github.com/vueuse/vueuse/commit/135d5071)
- **watchIgnorable**: Add and export types &nbsp;-&nbsp; by @ArthurDarkstone, **liliang18** and **Robin** in https://github.com/vueuse/vueuse/issues/4809 [<samp>(0e10e)</samp>](https://github.com/vueuse/vueuse/commit/0e10eb25)

### &nbsp;&nbsp;&nbsp;🏎 Performance

- **computedWithControl**: Optimize with shallowRef &nbsp;-&nbsp; by @broBinChen and **binge_c-admin** in https://github.com/vueuse/vueuse/issues/4826 [<samp>(2c91a)</samp>](https://github.com/vueuse/vueuse/commit/2c91ad8e)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/vueuse/vueuse/compare/v13.3.0...v13.4.0)

---

### v13.5.0
*Released: 7/2/2025*

### &nbsp;&nbsp;&nbsp;🚀 Features

- **useSpeechSynthesis**: Add reactivity for volume &nbsp;-&nbsp; by @whiteyebrw in https://github.com/vueuse/vueuse/issues/4837 [<samp>(4d125)</samp>](https://github.com/vueuse/vueuse/commit/4d125f24)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **useCookie**: Update `universal-cookie` range to `^7 || ^8` #4834

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/vueuse/vueuse/compare/v13.4.0...v13.5.0)

---

### v13.6.0
*Released: 7/28/2025*

### &nbsp;&nbsp;&nbsp;🚀 Features

- Mark templateRef as deprecated &nbsp;-&nbsp; by @ilyaliao in https://github.com/vueuse/vueuse/issues/4894 [<samp>(0271e)</samp>](https://github.com/vueuse/vueuse/commit/0271eef9)
- **useFileDialog**: Add MaybRef to multiple, accept, capture, reset, and directory &nbsp;-&nbsp; by @hunterwilhelm, **Anthony Fu** and @antfu in https://github.com/vueuse/vueuse/issues/4813 [<samp>(a44bd)</samp>](https://github.com/vueuse/vueuse/commit/a44bdc2c)
- **useFocusTrap**: Expose updateContainerElements for dynamic contai… &nbsp;-&nbsp; by @PeikyLiu and @ilyaliao in https://github.com/vueuse/vueuse/issues/4849 [<samp>(3d5e5)</samp>](https://github.com/vueuse/vueuse/commit/3d5e511a)
- **useIDBKeyval**: Add `options.serializer` &nbsp;-&nbsp; by @matthewjumpsoffbuildings, @OrbisK and @43081j in https://github.com/vueuse/vueuse/issues/4781 [<samp>(bb831)</samp>](https://github.com/vueuse/vueuse/commit/bb831783)
- **useStorageAsync**: Add `onReady` option and Promise return &nbsp;-&nbsp; by @asika32764, **Fernando Fernández**, @OrbisK and **Anthony Fu** in https://github.com/vueuse/vueuse/issues/4158 [<samp>(3a2df)</samp>](https://github.com/vueuse/vueuse/commit/3a2df2e1)
- **useTransition**: Support custom  window &nbsp;-&nbsp; by @byronogis and **Anthony Fu** in https://github.com/vueuse/vueuse/issues/4850 [<samp>(a75f4)</samp>](https://github.com/vueuse/vueuse/commit/a75f40c8)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **onClickOutside**: The order of overload signatures &nbsp;-&nbsp; by @whiteyebrw, @ilyaliao and **Anthony Fu** in https://github.com/vueuse/vueuse/issues/4839 [<samp>(d5812)</samp>](https://github.com/vueuse/vueuse/commit/d5812393)
- **types**: Use Vue's native `MaybeRef` and `MaybeRefOrGetter` instead &nbsp;-&nbsp; by @RYGRIT in https://github.com/vueuse/vueuse/issues/4913 [<samp>(2d179)</samp>](https://github.com/vueuse/vueuse/commit/2d1797b9)
- **useDraggable**: Add capture prop to component &nbsp;-&nbsp; by @wgh970312 in https://github.com/vueuse/vueuse/issues/4911 [<samp>(547f8)</samp>](https://github.com/vueuse/vueuse/commit/547f8fa8)
- **useMagicKeys**: Prevent incorrect clearing of other keys after releasing shift &nbsp;-&nbsp; by @keeplearning66 in https://github.com/vueuse/vueuse/issues/4916 [<samp>(d7f28)</samp>](https://github.com/vueuse/vueuse/commit/d7f284af)
- **useMouseInElement**: Correctly update elementX and elementY &nbsp;-&nbsp; by @cszhjh and @ilyaliao in https://github.com/vueuse/vueuse/issues/4846 [<samp>(cf02b)</samp>](https://github.com/vueuse/vueuse/commit/cf02b997)
- **useVirtualList**: Resolve invalid watch source &nbsp;-&nbsp; by @cszhjh and @OrbisK in https://github.com/vueuse/vueuse/issues/4857 [<samp>(d2381)</samp>](https://github.com/vueuse/vueuse/commit/d23812db)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/vueuse/vueuse/compare/v13.5.0...v13.6.0)

---

### v13.7.0
*Released: 8/18/2025*

### &nbsp;&nbsp;&nbsp;🚨 Breaking Changes

- **useAsyncState**: Set globalThis.reportError as default onError &nbsp;-&nbsp; by @kalu5 in https://github.com/vueuse/vueuse/issues/4951 [<samp>(f6e88)</samp>](https://github.com/vueuse/vueuse/commit/f6e88984)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **computedAsync**: Use globalThis.reportError as default onError &nbsp;-&nbsp; by @babu-ch in https://github.com/vueuse/vueuse/issues/4943 [<samp>(226a2)</samp>](https://github.com/vueuse/vueuse/commit/226a229b)
- **useClipboardItems**: Expose `read()` &nbsp;-&nbsp; by @OrbisK in https://github.com/vueuse/vueuse/issues/4954 [<samp>(d03b2)</samp>](https://github.com/vueuse/vueuse/commit/d03b2a42)
- **useDevicePixelRatio**: Improve types &nbsp;-&nbsp; by @doyuli in https://github.com/vueuse/vueuse/issues/4927 [<samp>(1b3d4)</samp>](https://github.com/vueuse/vueuse/commit/1b3d4e6a)
- **useSpeechSynthesisOptions**: Add option `onBoundary` &nbsp;-&nbsp; by @pkc918 in https://github.com/vueuse/vueuse/issues/4960 [<samp>(c0dca)</samp>](https://github.com/vueuse/vueuse/commit/c0dca935)
- **useTimeAgoIntl**: Add `useTimaAgoIntl` &nbsp;-&nbsp; by @northword and **Anthony Fu** in https://github.com/vueuse/vueuse/issues/4821 [<samp>(81815)</samp>](https://github.com/vueuse/vueuse/commit/81815762)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **ci**: Avoid duplicate `nr update` execution in `docs:build` &nbsp;-&nbsp; by @serkodev in https://github.com/vueuse/vueuse/issues/4925 [<samp>(a73ee)</samp>](https://github.com/vueuse/vueuse/commit/a73eedd0)
- **useAnimate**: Respect `immediate: false` with conditionally rendered elements &nbsp;-&nbsp; by @curtgrimes in https://github.com/vueuse/vueuse/issues/4947 [<samp>(90c7f)</samp>](https://github.com/vueuse/vueuse/commit/90c7f5b9)
- **useGamepad**: Correct type assertion for vibrationActuator &nbsp;-&nbsp; by @ArthurDarkstone in https://github.com/vueuse/vueuse/issues/4964 [<samp>(c5277)</samp>](https://github.com/vueuse/vueuse/commit/c5277625)
- **useStorage**: Make sure to always read data if new value is `undefined` &nbsp;-&nbsp; by @OrbisK in https://github.com/vueuse/vueuse/issues/4957 [<samp>(22116)</samp>](https://github.com/vueuse/vueuse/commit/22116b69)

### &nbsp;&nbsp;&nbsp;🏎 Performance

- **twoslash**: Optimize twoslash cache &nbsp;-&nbsp; by @doyuli in https://github.com/vueuse/vueuse/issues/4939 [<samp>(93064)</samp>](https://github.com/vueuse/vueuse/commit/930648d5)
- **useMutationObserver**: Watch ref directly &nbsp;-&nbsp; by @VividLemon in https://github.com/vueuse/vueuse/issues/4940 [<samp>(01cd9)</samp>](https://github.com/vueuse/vueuse/commit/01cd9cf9)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/vueuse/vueuse/compare/v13.6.0...v13.7.0)

---

### v13.8.0
*Released: 8/27/2025*

### &nbsp;&nbsp;&nbsp;🚀 Features

- **useEventSource**: Add `serializer` &nbsp;-&nbsp; by @imddc and @ilyaliao in https://github.com/vueuse/vueuse/issues/4953 [<samp>(64651)</samp>](https://github.com/vueuse/vueuse/commit/64651a33)

### &nbsp;&nbsp;&nbsp;🏎 Performance

- **docs**: Replace `twoslash` with own function for comparing js snippet &nbsp;-&nbsp; by @serkodev in https://github.com/vueuse/vueuse/issues/4977 [<samp>(909fd)</samp>](https://github.com/vueuse/vueuse/commit/909fd253)
- **usePointer**: Use shallowRef for better performance &nbsp;-&nbsp; by @broBinChen and **xiaobin** in https://github.com/vueuse/vueuse/issues/4980 [<samp>(ce09e)</samp>](https://github.com/vueuse/vueuse/commit/ce09e0d0)
- **usePreferredLanguages**: Use shallowRef for better performance &nbsp;-&nbsp; by @ilyaliao in https://github.com/vueuse/vueuse/issues/4973 [<samp>(361c8)</samp>](https://github.com/vueuse/vueuse/commit/361c8431)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/vueuse/vueuse/compare/v13.7.0...v13.8.0)

---

### v13.9.0
*Released: 9/1/2025*

### &nbsp;&nbsp;&nbsp;🚀 Features

- **onLongPress**: Allow function as value in delay &nbsp;-&nbsp; by @keeplearning66 in https://github.com/vueuse/vueuse/issues/4979 [<samp>(415f3)</samp>](https://github.com/vueuse/vueuse/commit/415f376f)
- **useAsyncState**: Allow initial value to be a ref &nbsp;-&nbsp; by @43081j in https://github.com/vueuse/vueuse/issues/4992 [<samp>(e38e8)</samp>](https://github.com/vueuse/vueuse/commit/e38e8d9c)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **types**: Update type casting for watch functions to use WatchSource<T> &nbsp;-&nbsp; by @ArthurDarkstone in https://github.com/vueuse/vueuse/issues/4966 [<samp>(00a72)</samp>](https://github.com/vueuse/vueuse/commit/00a72919)
- **useUrlSearchParams**: Restore proper history and navigation behavior &nbsp;-&nbsp; by @yosong-github and @ilyaliao in https://github.com/vueuse/vueuse/issues/4969 [<samp>(1cff4)</samp>](https://github.com/vueuse/vueuse/commit/1cff4c40)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/vueuse/vueuse/compare/v13.8.0...v13.9.0)

---

### v14.0.0
*Released: 10/22/2025*

### &nbsp;&nbsp;&nbsp;🚨 Breaking Changes

- Migrate to `tsdown`, move dist files &nbsp;-&nbsp; by @9romise and **Anthony Fu** in https://github.com/vueuse/vueuse/issues/5004 [<samp>(a2e2c)</samp>](https://github.com/vueuse/vueuse/commit/a2e2cedb)
- Deprecate alias exports in favor of original function names &nbsp;-&nbsp; by @9romise in https://github.com/vueuse/vueuse/issues/5009 [<samp>(e5f74)</samp>](https://github.com/vueuse/vueuse/commit/e5f74fb4)
- Requires Vue 3.5 &nbsp;-&nbsp; by @antfu [<samp>(fe458)</samp>](https://github.com/vueuse/vueuse/commit/fe45820e)
- **components**: Refactor components and make them consistent &nbsp;-&nbsp; by @ilyaliao in https://github.com/vueuse/vueuse/issues/4912 [<samp>(8c521)</samp>](https://github.com/vueuse/vueuse/commit/8c521d4e)
- **computedAsync**: Default to `flush: sync` &nbsp;-&nbsp; by @ferferga in https://github.com/vueuse/vueuse/issues/4752 [<samp>(573bf)</samp>](https://github.com/vueuse/vueuse/commit/573bfb07)
- **createSharedComposable**: Return only the sharedComposable on client side &nbsp;-&nbsp; by @9romise in https://github.com/vueuse/vueuse/issues/4997 [<samp>(73aad)</samp>](https://github.com/vueuse/vueuse/commit/73aad317)
- **firebase**: Upgrade to firebase v12 &nbsp;-&nbsp; by @antfu [<samp>(8cb0b)</samp>](https://github.com/vueuse/vueuse/commit/8cb0b4b9)
- **nuxt**: Use Nuxt v4 kit &nbsp;-&nbsp; by @antfu [<samp>(070fc)</samp>](https://github.com/vueuse/vueuse/commit/070fc8cf)
- **shared**: Drop some deprecated apis &nbsp;-&nbsp; by @9romise in https://github.com/vueuse/vueuse/issues/5010 [<samp>(971b2)</samp>](https://github.com/vueuse/vueuse/commit/971b2a00)
- **useClipboard**: Use `readonly()` instead of type assertion `Computed` &nbsp;-&nbsp; by @9romise in https://github.com/vueuse/vueuse/issues/5081 [<samp>(67812)</samp>](https://github.com/vueuse/vueuse/commit/67812c66)
- **useSwipe**: Remove isPassiveEventSupported &nbsp;-&nbsp; by @pkc918 in https://github.com/vueuse/vueuse/issues/4886 [<samp>(620a9)</samp>](https://github.com/vueuse/vueuse/commit/620a9491)
- **useThrottleFn**: Align with traditional throttle behavior &nbsp;-&nbsp; by @IceMooncake and @ilyaliao in https://github.com/vueuse/vueuse/issues/4923 [<samp>(cefd2)</samp>](https://github.com/vueuse/vueuse/commit/cefd228b)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **computedEager**: Deprecate `computedEager` &nbsp;-&nbsp; by @ilyaliao in https://github.com/vueuse/vueuse/issues/5034 [<samp>(26a7d)</samp>](https://github.com/vueuse/vueuse/commit/26a7d34f)
- **onClickOutside**: Allow the value of target to be a getter &nbsp;-&nbsp; by @keeplearning66 in https://github.com/vueuse/vueuse/issues/5098 [<samp>(7133c)</samp>](https://github.com/vueuse/vueuse/commit/7133cfe4)
- **onLongPress**: Allow function as value in delay &nbsp;-&nbsp; by @keeplearning66 in https://github.com/vueuse/vueuse/issues/4979 [<samp>(415f3)</samp>](https://github.com/vueuse/vueuse/commit/415f376f)
- **refManualReset**: New function &nbsp;-&nbsp; by @phk422, @OrbisK, @ilyaliao and **Anthony Fu** in https://github.com/vueuse/vueuse/issues/4644 [<samp>(81bb3)</samp>](https://github.com/vueuse/vueuse/commit/81bb3cde)
- **useAsyncState**: Allow initial value to be a ref &nbsp;-&nbsp; by @43081j in https://github.com/vueuse/vueuse/issues/4992 [<samp>(e38e8)</samp>](https://github.com/vueuse/vueuse/commit/e38e8d9c)
- **useIdle**: Implement `Stoppable` interface &nbsp;-&nbsp; by @dpbs-715 and **Anthony Fu** in https://github.com/vueuse/vueuse/issues/5068 [<samp>(3f96a)</samp>](https://github.com/vueuse/vueuse/commit/3f96a1fe)
- **useTextSelection**: Set initial value for use text selection &nbsp;-&nbsp; by @kevinluo201 in https://github.com/vueuse/vueuse/issues/5092 [<samp>(dbb3e)</samp>](https://github.com/vueuse/vueuse/commit/dbb3ed07)
- **useTransition**: Add support for custom interpolator functions &nbsp;-&nbsp; by @scottbedard and **Anthony Fu** in https://github.com/vueuse/vueuse/issues/5011 [<samp>(cf905)</samp>](https://github.com/vueuse/vueuse/commit/cf905ccf)
- **watch**: Update watch return typo in watchExtractedObservable, watchDebounced, watchDeep, watchImmediate, watchOnce, watchThrottled and watchWithFilter &nbsp;-&nbsp; by @ArthurDarkstone in https://github.com/vueuse/vueuse/issues/4896 [<samp>(b8102)</samp>](https://github.com/vueuse/vueuse/commit/b8102b5e)
- **watchAtMost**: Add pause and resume to return value &nbsp;-&nbsp; by @ArthurDarkstone in https://github.com/vueuse/vueuse/issues/4897 [<samp>(d3176)</samp>](https://github.com/vueuse/vueuse/commit/d317610e)
- **watchPausable**: Deprecate `watchPausable` &nbsp;-&nbsp; by @ilyaliao in https://github.com/vueuse/vueuse/issues/5040 [<samp>(4a28b)</samp>](https://github.com/vueuse/vueuse/commit/4a28be90)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- Update return type of createReusableTemplate and createTemplateP… &nbsp;-&nbsp; by @ArthurDarkstone in https://github.com/vueuse/vueuse/issues/4962 [<samp>(5fd3a)</samp>](https://github.com/vueuse/vueuse/commit/5fd3a935)
- Update return types for createTemplatePromise, useMagicKeys, use… &nbsp;-&nbsp; by @ArthurDarkstone in https://github.com/vueuse/vueuse/issues/4963 [<samp>(554b7)</samp>](https://github.com/vueuse/vueuse/commit/554b74e9)
- Update parameter types to use ComponentInternalInstance in lifec… &nbsp;-&nbsp; by @ArthurDarkstone in https://github.com/vueuse/vueuse/issues/5060 [<samp>(a49a3)</samp>](https://github.com/vueuse/vueuse/commit/a49a3ede)
- **integrations**: Use relative import in `component.ts` &nbsp;-&nbsp; by @9romise in https://github.com/vueuse/vueuse/issues/5025 [<samp>(d5bcd)</samp>](https://github.com/vueuse/vueuse/commit/d5bcd50b)
- **shared**: Support provideLocal/injectLocal in vapor mode &nbsp;-&nbsp; by @ZKunZhang and **Zhaokun Zhang** in https://github.com/vueuse/vueuse/issues/5050 [<samp>(51872)</samp>](https://github.com/vueuse/vueuse/commit/51872941)
- **tryOnScopeDispose**: Add optional failSilently parameter and updat… &nbsp;-&nbsp; by @ArthurDarkstone and @ilyaliao in https://github.com/vueuse/vueuse/issues/5061 [<samp>(a4862)</samp>](https://github.com/vueuse/vueuse/commit/a4862a44)
- **types**: Update type casting for watch functions to use WatchSource<T> &nbsp;-&nbsp; by @ArthurDarkstone in https://github.com/vueuse/vueuse/issues/4966 [<samp>(00a72)</samp>](https://github.com/vueuse/vueuse/commit/00a72919)
- **useAsyncState**: Track latest execution to avoid newer results being replaced by outdated ones &nbsp;-&nbsp; by @andreww2012 in https://github.com/vueuse/vueuse/issues/5047 [<samp>(3e6cb)</samp>](https://github.com/vueuse/vueuse/commit/3e6cbf12)
- **useFullscreen**: Specify return types for request, exit, and enabl… &nbsp;-&nbsp; by @ArthurDarkstone in https://github.com/vueuse/vueuse/issues/4965 [<samp>(8ac73)</samp>](https://github.com/vueuse/vueuse/commit/8ac73870)
- **useMagicKeys**: Clearing of other keys after releasing alt &nbsp;-&nbsp; by @NoiseFan in https://github.com/vueuse/vueuse/issues/5037 [<samp>(3f113)</samp>](https://github.com/vueuse/vueuse/commit/3f113f5e)
- **useShare**: Improve the accuracy of sharing logic &nbsp;-&nbsp; by @ArthurDarkstone in https://github.com/vueuse/vueuse/issues/5048 [<samp>(61e1b)</samp>](https://github.com/vueuse/vueuse/commit/61e1be05)
- **useUrlSearchParams**: Restore proper history and navigation behavior &nbsp;-&nbsp; by @yosong-github and @ilyaliao in https://github.com/vueuse/vueuse/issues/4969 [<samp>(1cff4)</samp>](https://github.com/vueuse/vueuse/commit/1cff4c40)
- **useUserMedia**: Add deep watch to constraints &nbsp;-&nbsp; by @babu-ch and @ilyaliao in https://github.com/vueuse/vueuse/issues/5046 [<samp>(4b3e9)</samp>](https://github.com/vueuse/vueuse/commit/4b3e976d)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/vueuse/vueuse/compare/v13.8.0...v14.0.0)

---

### v14.1.0
*Released: 11/27/2025*

### &nbsp;&nbsp;&nbsp;🚀 Features

- **useDropZone**: Add checkValidity function &nbsp;-&nbsp; by @kolaente in https://github.com/vueuse/vueuse/issues/5169 [<samp>(aee84)</samp>](https://github.com/vueuse/vueuse/commit/aee846cb)
- **useElementVisibility**: Add `initialValue` option &nbsp;-&nbsp; by @kricsleo and @9romise in https://github.com/vueuse/vueuse/issues/5159 [<samp>(13f36)</samp>](https://github.com/vueuse/vueuse/commit/13f361fa)
- **useMouseInElement**: Add support for tracking inline-level elements &nbsp;-&nbsp; by @siavava and @9romise in https://github.com/vueuse/vueuse/issues/5049 [<samp>(62dfb)</samp>](https://github.com/vueuse/vueuse/commit/62dfb80a)
- **useTimeAgoIntl**: Custom units &nbsp;-&nbsp; by @Menci in https://github.com/vueuse/vueuse/issues/5188 [<samp>(c7d09)</samp>](https://github.com/vueuse/vueuse/commit/c7d09ef4)
- **useWebSocket**: `autoConnect.delay` support function &nbsp;-&nbsp; by @YuchenWell, **Anthony Fu** and @9romise in https://github.com/vueuse/vueuse/issues/5089 [<samp>(176f2)</samp>](https://github.com/vueuse/vueuse/commit/176f2515)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- Typescript type of `isIOS` constant &nbsp;-&nbsp; by @toofishes in https://github.com/vueuse/vueuse/issues/5163 [<samp>(60888)</samp>](https://github.com/vueuse/vueuse/commit/60888d43)
- **computedWithControl**: Allow different types in watch sources array &nbsp;-&nbsp; by @kricsleo in https://github.com/vueuse/vueuse/issues/5184 [<samp>(bc4ac)</samp>](https://github.com/vueuse/vueuse/commit/bc4aca90)
- **types**: Allow async functions in useDebounceFn and useThrottleFn &nbsp;-&nbsp; by @xiaoxiaohuayu in https://github.com/vueuse/vueuse/issues/5131 [<samp>(7fb7a)</samp>](https://github.com/vueuse/vueuse/commit/7fb7a05a)
- **types**: Deprecate embeded `ResizeObserverSize` types &nbsp;-&nbsp; by @9romise in https://github.com/vueuse/vueuse/issues/5127 [<samp>(d7a07)</samp>](https://github.com/vueuse/vueuse/commit/d7a07010)
- **useArrayReduce**: Export `UseArrayReduceReturn` type &nbsp;-&nbsp; by @michaelcozzolino in https://github.com/vueuse/vueuse/issues/5177 [<samp>(e1204)</samp>](https://github.com/vueuse/vueuse/commit/e1204722)
- **useAsyncQueue**: Trigger onFinished when the last task is rejected &nbsp;-&nbsp; by @keeplearning66 and @9romise in https://github.com/vueuse/vueuse/issues/5144 [<samp>(c4a46)</samp>](https://github.com/vueuse/vueuse/commit/c4a46025)
- **useClipboard**: Add readonly attribute to textarea fallback to support Safari 15 &nbsp;-&nbsp; by @huajianjiu in https://github.com/vueuse/vueuse/issues/5179 [<samp>(ef0c4)</samp>](https://github.com/vueuse/vueuse/commit/ef0c4f82)
- **useInfiniteScroll**: Make canLoadMore reactive &nbsp;-&nbsp; by @nhquyss in https://github.com/vueuse/vueuse/issues/5110 [<samp>(3dc2d)</samp>](https://github.com/vueuse/vueuse/commit/3dc2d831)
- **useMagicKeys**: Handle empty key events to prevent errors &nbsp;-&nbsp; by @babu-ch and @9romise in https://github.com/vueuse/vueuse/issues/5149 [<samp>(f8aec)</samp>](https://github.com/vueuse/vueuse/commit/f8aecd82)
- **useScroll**: Use configurable window's `getComputedStyle` &nbsp;-&nbsp; by @9romise in https://github.com/vueuse/vueuse/issues/5150 [<samp>(f74a6)</samp>](https://github.com/vueuse/vueuse/commit/f74a68d4)
- **useSpeechRecognition**: Catch the error while calling method start &nbsp;-&nbsp; by @ben-lau, **liubaobin** and @9romise in https://github.com/vueuse/vueuse/issues/5142 [<samp>(94f1e)</samp>](https://github.com/vueuse/vueuse/commit/94f1e9e7)
- **useTimeout**: Fix type typo &nbsp;-&nbsp; by @keeplearning66, **Robin** and **Anthony Fu** in https://github.com/vueuse/vueuse/issues/5147 [<samp>(31e5c)</samp>](https://github.com/vueuse/vueuse/commit/31e5cb0c)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/vueuse/vueuse/compare/v14.0.0...v14.1.0)

---

## nuxt Release Notes (3.16.2 → 4.2.2)

### v3.18.0
*Released: 7/29/2025*

> 3.18.0 is the next minor release.

## 👀 Highlights

A huge thank you to everyone who's been a part of this release, which is mostly about backporting features + bugfixes from Nuxt v4.

Over the next six months, we'll continue backporting compatible v4 features and bug fixes, so please keep the feedback coming! ❤️

### 🧪 Lazy Hydration Macros

Building on the delayed hydration support from v3.16, we now support **lazy hydration macros** ([#31192](https://github.com/nuxt/nuxt/pull/31192))! These provide a more ergonomic way to control component hydration:


```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'visible',
  () => import('./components/MyComponent.vue')
)
</script>
<template>
  <div>
    <!-- 
      Hydration will be triggered when
      the element(s) is 100px away from entering the viewport.
    -->
    <LazyHydrationMyComponent :hydrate-on-visible="{ rootMargin: '100px' }" />
  </div>
</template>
```

These macros make it possible to use Nuxt's lazy hydration utilities alongside explicit component imports.

### ♿️ Accessibility Improvements

We've enhanced accessibility by including `<NuxtRouteAnnouncer>` in the built-in `app.vue` ([#32621](https://github.com/nuxt/nuxt/pull/32621)). This means page changes will be announced to screen readers, making navigation more accessible for users with visual impairments. (This only applies if you do not have an `app.vue` in your project. If you do, please keep `<NuxtRouteAnnouncer>` in your `app.vue`!)

### 🛠️ Enhanced Development Experience

#### Chrome DevTools Workspace Integration

We've added **Chrome DevTools workspace integration** ([#32084](https://github.com/nuxt/nuxt/pull/32084)), allowing you to edit your Nuxt source files directly from Chrome DevTools. This creates a better debugging experience where changes made in DevTools are reflected in your actual source files.

#### Better Component Type Safety

Component type safety has been improved with:

- **Typed slots for `<ClientOnly>` and `<DevOnly>`** ([#32707](https://github.com/nuxt/nuxt/pull/32707)) - better IntelliSense and error checking
- **Exported `<NuxtTime>` prop types** ([#32547](https://github.com/nuxt/nuxt/pull/32547)) - easier to extend and customize

#### New Auto-Import: `onWatcherCleanup`

The `onWatcherCleanup` function from `vue` is now available as an auto-import ([#32396](https://github.com/nuxt/nuxt/pull/32396)), making it easier to clean up watchers and prevent memory leaks:

```ts
const { data } = useAsyncData('users', fetchUsers)

watch(data, (newData) => {
  const interval = setInterval(() => {
    // Some periodic task
  }, 1000)
  
  // Clean up when the watcher is stopped
  onWatcherCleanup(() => {
    clearInterval(interval)
  })
})
```

### 📊 Observability Enhancements

Page routes are now **exposed to Nitro for observability** ([#32617](https://github.com/nuxt/nuxt/pull/32617)), enabling better monitoring and analytics integration with supported platforms. This allows observability tools to track page-level metrics more effectively.

### 🔧 Module Development Improvements

Module authors get several quality-of-life improvements:

#### Simplified Server Imports

The `addServerImports` kit utility now **supports single imports** ([#32289](https://github.com/nuxt/nuxt/pull/32289)), making it easier to add individual server utilities:

```ts
// Before: had to wrap in array
addServerImports([{ from: 'my-package', name: 'myUtility' }])

// Now: can pass directly
addServerImports({ from: 'my-package', name: 'myUtility' })
```

#### TypeScript Configuration

Modules can now **add to `typescript.hoist`** ([#32601](https://github.com/nuxt/nuxt/pull/32601)), giving them more control over TypeScript configuration and type generation.

### ⚡️ Performance Improvements

We've made several performance optimizations:

- **Improved Vite-node communication** via internal socket ([#32417](https://github.com/nuxt/nuxt/pull/32417)) for faster development builds
- **Migration to `oxc-walker`** ([#32250](https://github.com/nuxt/nuxt/pull/32250)) and **oxc for `onPrehydrate` transforms** ([#32045](https://github.com/nuxt/nuxt/pull/32045)) for faster code transformations

### 🐛 Bug Fixes

This release also includes several important fixes:

- **Improved data fetching**: When computed keys change, old data is now properly retained ([#32616](https://github.com/nuxt/nuxt/pull/32616))
- **Better scroll behavior**: `scrollBehaviorType` is now only used for hash scrolling ([#32622](https://github.com/nuxt/nuxt/pull/32622))
- **Fixed directory aliases**: Added trailing slashes to some directory aliases for better consistency ([#32755](https://github.com/nuxt/nuxt/pull/32755))

### ✅ Upgrading

As usual, our recommendation for upgrading is to run:

```sh
npx nuxi@latest upgrade --dedupe
```

This refreshes your lockfile and pulls in all the latest dependencies that Nuxt relies on, especially from the unjs ecosystem.


## 👉 Changelog

[compare changes](https://github.com/nuxt/nuxt/compare/v3.17.7...v3.18.0)
### 🚀 Enhancements
- **nuxt:** Expose page routes to nitro for o11y ([#32617](https://github.com/nuxt/nuxt/pull/32617))
- **nuxt:** Export `<NuxtTime>` prop types ([#32547](https://github.com/nuxt/nuxt/pull/32547))
- **nuxt:** Add integration with chrome devtools workspaces ([#32084](https://github.com/nuxt/nuxt/pull/32084))
- **kit:** Support single import in `addServerImports` ([#32289](https://github.com/nuxt/nuxt/pull/32289))
- **nuxt:** Add `onWatcherCleanup` to imports presets ([#32396](https://github.com/nuxt/nuxt/pull/32396))
- **nuxt:** Add route announcer to default app.vue ([#32621](https://github.com/nuxt/nuxt/pull/32621))
- **nuxt:** Support lazy hydration macros ([#31192](https://github.com/nuxt/nuxt/pull/31192))
### 🔥 Performance
- **vite:** Communicate with vite-node via internal socket ([#32417](https://github.com/nuxt/nuxt/pull/32417))
- **kit:** Update env expansion regex to match nitro ([#30766](https://github.com/nuxt/nuxt/pull/30766))
### 🩹 Fixes
- **nuxt:** Allow modules to add to `typescript.hoist` ([#32601](https://github.com/nuxt/nuxt/pull/32601))
- **nuxt:** Retain old data when computed key changes ([#32616](https://github.com/nuxt/nuxt/pull/32616))
- **nuxt:** Only use `scrollBehaviorType` for hash scrolling ([#32622](https://github.com/nuxt/nuxt/pull/32622))
- **nuxt:** Add missing `async` ([fd312af03](https://github.com/nuxt/nuxt/commit/fd312af03))
- **nuxt:** Fix transform/minify types + bump oxc-transform ([d2ba19963](https://github.com/nuxt/nuxt/commit/d2ba19963))
- **nuxt:** Provide typed slots for `<ClientOnly>` and `<DevOnly>` ([#32707](https://github.com/nuxt/nuxt/pull/32707))
- **kit,nuxt,schema:** Add trailing slash to some dir aliases ([#32755](https://github.com/nuxt/nuxt/pull/32755))
- **nuxt:** Include source base url for remote islands ([#32772](https://github.com/nuxt/nuxt/pull/32772))
- **vite:** Use vite node server to transform requests ([#32791](https://github.com/nuxt/nuxt/pull/32791))
- **kit:** Use `mlly` to parse module paths ([#32386](https://github.com/nuxt/nuxt/pull/32386))
- **nuxt:** Execute all plugins after error rendering error.vue ([#32744](https://github.com/nuxt/nuxt/pull/32744))
### 💅 Refactors
- **nuxt:** Migrate to `oxc-walker` ([#32250](https://github.com/nuxt/nuxt/pull/32250))
- **nuxt,schema:** Use oxc for `onPrehydrate` transform ([#32045](https://github.com/nuxt/nuxt/pull/32045))
- **nuxt:** Pass file language directly to parser options ([#32665](https://github.com/nuxt/nuxt/pull/32665))
- **nuxt:** Use direct import of `installNuxtModule` ([228e3585e](https://github.com/nuxt/nuxt/commit/228e3585e))
### 📖 Documentation
- Pass `v3` template to create nuxt examples ([03182202f](https://github.com/nuxt/nuxt/commit/03182202f))
- Add reference to `useNuxtData` in data fetching composable pages ([#32589](https://github.com/nuxt/nuxt/pull/32589))
- Document the --modules flag in the init command ([#32599](https://github.com/nuxt/nuxt/pull/32599))
- Added new Shared folder to the example of v4 folder structure ([#32630](https://github.com/nuxt/nuxt/pull/32630))
- Improve grammar ([#32640](https://github.com/nuxt/nuxt/pull/32640))
- Typos ([#32567](https://github.com/nuxt/nuxt/pull/32567))
- Fix abbreviation ([#32613](https://github.com/nuxt/nuxt/pull/32613))
- Reference `noUncheckedIndexedAccess` rule change in v4 guide ([#32643](https://github.com/nuxt/nuxt/pull/32643))
- Fix links to Nitro docs ([#32691](https://github.com/nuxt/nuxt/pull/32691))
- Add best practices section ([#31609](https://github.com/nuxt/nuxt/pull/31609))
- Correct alias for local fonts in styling guide ([#32680](https://github.com/nuxt/nuxt/pull/32680))
- Update nuxt.new links to v4 ([#32639](https://github.com/nuxt/nuxt/pull/32639))
- Set correct default value for deep option in usefetch ([#32724](https://github.com/nuxt/nuxt/pull/32724))
- Fix link to issue ([ca03f533f](https://github.com/nuxt/nuxt/commit/ca03f533f))
- Add AI-assisted contribution guidelines ([#32725](https://github.com/nuxt/nuxt/pull/32725))
- Update Nuxt installation command to use `npm create nuxt@latest` ([#32726](https://github.com/nuxt/nuxt/pull/32726))
- Hydration best practice ([#32746](https://github.com/nuxt/nuxt/pull/32746))
- Add example for module `.with()` ([#32757](https://github.com/nuxt/nuxt/pull/32757))
- Replace dead Vue Router docs links ([#32779](https://github.com/nuxt/nuxt/pull/32779))
### 🏡 Chore
- Handle missing commit details ([0af98763d](https://github.com/nuxt/nuxt/commit/0af98763d))
- Update reproduction links for bug-report template ([#32722](https://github.com/nuxt/nuxt/pull/32722))
- Update `unbuild` and use absolute path in dev stubs ([#32759](https://github.com/nuxt/nuxt/pull/32759))
### ✅ Tests
- Also assert status ([4b4b224f7](https://github.com/nuxt/nuxt/commit/4b4b224f7))
- Ignore vue `module.exports` export ([ac8b02d09](https://github.com/nuxt/nuxt/commit/ac8b02d09))
- Extend timeout when waiting for hydration ([49c01ba81](https://github.com/nuxt/nuxt/commit/49c01ba81))
- Benchmark minimal fixture instead ([#31174](https://github.com/nuxt/nuxt/pull/31174))
- Add minimal pages fixture ([#30457](https://github.com/nuxt/nuxt/pull/30457))
- Bump bundle size ([bafa953c3](https://github.com/nuxt/nuxt/commit/bafa953c3))
### 🤖 CI
- Trigger website redeploy on main branch ([#32695](https://github.com/nuxt/nuxt/pull/32695))
- Release `pkg.pr.new` for `main`/`3.x` branches as well ([ca4f0b1da](https://github.com/nuxt/nuxt/commit/ca4f0b1da))
- Apply `3x` tag to latest v3 release ([5e8dfc150](https://github.com/nuxt/nuxt/commit/5e8dfc150))

### ❤️ Contributors
- Daniel Roe (@danielroe)
- Bobbie Goede (@BobbieGoede)
- Damian Głowala (@DamianGlowala)
- Dog (@dgxo)
- Julien Huang (@huang-julien)
- Yauheni Vasiukevich (@EvgenyWas)
- Alex Liu (@Mini-ghost)
- Robin (@OrbisK)
- Mateleo (@Mateleo)
- Stephen Jason Wang (@stephenjason89)
- Maurits Meester (@mmeester)
- Igor Kononenko (@igorexa34314)
- Alex (@hywax)
- Matej Černý (@cernymatej)
- Alexander Lichter (@TheAlexLichter)
- Hashim Kalam (@hashimkalam)
- Alois Sečkár (@AloisSeckar)
- Haythem Frikha (@Flamenate)
- abeer0 (@iiio2)
- Thomas (@ThomasWT)
- Connor Pearson (@cjpearson)
- dwood-csi (@dwood-csi)

---

### v3.19.0
*Released: 9/3/2025*

## 👀 Highlights

Please see the release notes for [Nuxt v4.1](https://github.com/nuxt/nuxt/releases/tag/v4.1.0) for full details on the features and fixes in Nuxt v3.19.

## ✅ Upgrading

As usual, our recommendation for upgrading is to run:

```sh
npx nuxt upgrade --dedupe
```

This will refresh your lockfile and pull in all the latest dependencies that Nuxt relies on, especially from the unjs ecosystem.

## 👉 Changelog

[compare changes](https://github.com/nuxt/nuxt/compare/v3.18.1...v3.19.0)
### 🚀 Enhancements
- **kit:** Add `ignore` option to `resolveFiles` ([#32858](https://github.com/nuxt/nuxt/pull/32858))
- **kit:** Add `onInstall` and `onUpgrade` module hooks ([#32397](https://github.com/nuxt/nuxt/pull/32397))
- **nuxt,vite:** Add experimental support for `rolldown-vite` ([#31812](https://github.com/nuxt/nuxt/pull/31812))
- **nuxt:** Extract `defineRouteRules` to page `rules` property ([#32897](https://github.com/nuxt/nuxt/pull/32897))
- **nuxt,vite:** Use importmap to increase chunk stability ([#33075](https://github.com/nuxt/nuxt/pull/33075))
- **nuxt:** Lazy hydration macros without auto-imports ([#33037](https://github.com/nuxt/nuxt/pull/33037))
- **kit,nuxt,schema:** Allow modules to specify dependencies ([#33063](https://github.com/nuxt/nuxt/pull/33063))
- **kit,nuxt:** Add `getLayerDirectories` util and refactor to use it ([#33098](https://github.com/nuxt/nuxt/pull/33098))
### 🔥 Performance
- **nuxt:** Clear inline route rules cache when pages change ([#32877](https://github.com/nuxt/nuxt/pull/32877))
- **nuxt:** Stop watching app manifest once a change has been detected ([#32880](https://github.com/nuxt/nuxt/pull/32880))
### 🩹 Fixes
- **nuxt:** Handle `satisfies` in page augmentation ([#32902](https://github.com/nuxt/nuxt/pull/32902))
- **nuxt:** Type response in `useFetch` hooks ([#32891](https://github.com/nuxt/nuxt/pull/32891))
- **nuxt:** Add TS parenthesis and as expression for page meta extraction ([#32914](https://github.com/nuxt/nuxt/pull/32914))
- **nuxt:** Use correct unit thresholds for relative time ([#32893](https://github.com/nuxt/nuxt/pull/32893))
- **nuxt:** Handle uncached current build manifests ([#32913](https://github.com/nuxt/nuxt/pull/32913))
- **kit:** Resolve directories in `resolvePath` and normalize file extensions ([#32857](https://github.com/nuxt/nuxt/pull/32857))
- **schema,vite:** Bump `requestTimeout` + allow configuration ([#32874](https://github.com/nuxt/nuxt/pull/32874))
- **nuxt:** Deep merge extracted route meta ([#32887](https://github.com/nuxt/nuxt/pull/32887))
- **nuxt:** Do not expose app components until fully resolved ([#32993](https://github.com/nuxt/nuxt/pull/32993))
- **kit:** Only exclude `node_modules/` if no custom `srcDir` ([#32987](https://github.com/nuxt/nuxt/pull/32987))
- **nuxt:** Compare final matched routes when syncing `route` object ([#32899](https://github.com/nuxt/nuxt/pull/32899))
- **nuxt:** Make vue server warnings much less verbose in dev mode ([#33018](https://github.com/nuxt/nuxt/pull/33018))
- **schema:** Allow disabling cssnano/autoprefixer postcss plugins ([#33016](https://github.com/nuxt/nuxt/pull/33016))
- **kit:** Ensure local layers are prioritised alphabetically ([#33030](https://github.com/nuxt/nuxt/pull/33030))
- **kit,nuxt:** Expose global types to vue compiler ([#33026](https://github.com/nuxt/nuxt/pull/33026))
- **nuxt:** Support config type inference for `defineNuxtModule().with()` ([#33081](https://github.com/nuxt/nuxt/pull/33081))
- **nuxt:** Search for colliding names in route children ([31a9282c2](https://github.com/nuxt/nuxt/commit/31a9282c2))
- **nuxt:** Delete `nuxtApp._runningTransition` on resolve ([#33025](https://github.com/nuxt/nuxt/pull/33025))
- **nuxt:** Add validation for nuxt island reviver key ([#33069](https://github.com/nuxt/nuxt/pull/33069))
- **kit:** Prioritise local layers over extended layers ([ae8b0d2b8](https://github.com/nuxt/nuxt/commit/ae8b0d2b8))
- **kit:** Address merge conflict ([89ccbbebb](https://github.com/nuxt/nuxt/commit/89ccbbebb))
- **kit:** Do not resolve public dir aliases ([5d87d3a80](https://github.com/nuxt/nuxt/commit/5d87d3a80))
### 💅 Refactors
- **nuxt:** Simplify page segment parsing ([#32901](https://github.com/nuxt/nuxt/pull/32901))
- **nuxt:** Remove unnecessary `async/await` in `afterEach` ([#32999](https://github.com/nuxt/nuxt/pull/32999))
- **vite:** Simplify inline chunk iteration ([9ea90fc33](https://github.com/nuxt/nuxt/commit/9ea90fc33))
- **kit,nuxt,ui-templates,vite:** Address deprecations + improve regexp perf ([#33093](https://github.com/nuxt/nuxt/pull/33093))
### 📖 Documentation
- Add a section about augmenting types with TS project references ([#32843](https://github.com/nuxt/nuxt/pull/32843))
- Switch example to use vitest projects ([#32863](https://github.com/nuxt/nuxt/pull/32863))
- Update testing `setupTimeout` and add `teardownTimeout` ([#32868](https://github.com/nuxt/nuxt/pull/32868))
- Add middleware to layers guide ([fa516d440](https://github.com/nuxt/nuxt/commit/fa516d440))
- Add documentation for `--nightly` command ([#32907](https://github.com/nuxt/nuxt/pull/32907))
- Update package information in roadmap section ([#32881](https://github.com/nuxt/nuxt/pull/32881))
- Add more info about nuxt spa loader element attributes ([#32871](https://github.com/nuxt/nuxt/pull/32871))
- Correct filename in example ([#33000](https://github.com/nuxt/nuxt/pull/33000))
- Add more information about using `useRoute` and accessing route in middleware ([#33004](https://github.com/nuxt/nuxt/pull/33004))
- Avoid variable shadowing in locale example ([#33031](https://github.com/nuxt/nuxt/pull/33031))
### 🏡 Chore
- Remove stray test file ([42fd247a4](https://github.com/nuxt/nuxt/commit/42fd247a4))
- Ignore webpagetest.org when scanning links ([cb18f4960](https://github.com/nuxt/nuxt/commit/cb18f4960))
- Add `type: 'module'` in playground ([#33099](https://github.com/nuxt/nuxt/pull/33099))
### ✅ Tests
- Add failing test for link component duplication ([#32792](https://github.com/nuxt/nuxt/pull/32792))
- Simplify module hook tests ([#32950](https://github.com/nuxt/nuxt/pull/32950))
- Refactor stubbing of `import.meta.dev` ([#33023](https://github.com/nuxt/nuxt/pull/33023))
- Use `findWorkspaceDir` rather than relative paths to repo root ([c4c3ada96](https://github.com/nuxt/nuxt/commit/c4c3ada96))
- Improve router test for global transitions ([7e6a6fc35](https://github.com/nuxt/nuxt/commit/7e6a6fc35))
- Use `expect.poll` ([f4354203a](https://github.com/nuxt/nuxt/commit/f4354203a))
- Use `expect.poll` instead of `expectWithPolling` ([15ca5be95](https://github.com/nuxt/nuxt/commit/15ca5be95))
- Use `vi.waitUntil` instead of custom retry logic ([4c8c13090](https://github.com/nuxt/nuxt/commit/4c8c13090))
- Update test for app creation ([9a3b44515](https://github.com/nuxt/nuxt/commit/9a3b44515))
- Update bundle size snapshot ([76988ce97](https://github.com/nuxt/nuxt/commit/76988ce97))
### 🤖 CI
- Remove double set of tests for docs prs ([14c006ac4](https://github.com/nuxt/nuxt/commit/14c006ac4))
- Add workflow for discord team discussion threads ([f14854fc3](https://github.com/nuxt/nuxt/commit/f14854fc3))
- Fix some syntax issues with discord + github integrations ([c059f7cd1](https://github.com/nuxt/nuxt/commit/c059f7cd1))
- Use token for adding issue to project ([51661bac3](https://github.com/nuxt/nuxt/commit/51661bac3))
- Use discord bot to create thread automatically ([37f9eb27b](https://github.com/nuxt/nuxt/commit/37f9eb27b))
- Only use discord bot ([38ce2dcbb](https://github.com/nuxt/nuxt/commit/38ce2dcbb))
- Update format of discord message ([0047b3059](https://github.com/nuxt/nuxt/commit/0047b3059))
- Try bolding entire line ([6e9f40eb9](https://github.com/nuxt/nuxt/commit/6e9f40eb9))
- Oops ([8b044cad2](https://github.com/nuxt/nuxt/commit/8b044cad2))
- Add delay after adding each reaction ([37b7e2108](https://github.com/nuxt/nuxt/commit/37b7e2108))
- Use last lts node version for testing ([98719c065](https://github.com/nuxt/nuxt/commit/98719c065))
- Try npm trusted publisher ([ea33502c3](https://github.com/nuxt/nuxt/commit/ea33502c3))
- Use npm trusted publisher for main releases ([31a55437f](https://github.com/nuxt/nuxt/commit/31a55437f))
- Change wording ([#32979](https://github.com/nuxt/nuxt/pull/32979))
- Add github ai moderator ([#33077](https://github.com/nuxt/nuxt/pull/33077))

### ❤️ Contributors
- Daniel Roe (@danielroe)
- abeer0 (@iiio2)
- Julien Huang (@huang-julien)
- kyumoon (@kyumoon)
- Alexander Lichter (@TheAlexLichter)
- Bobbie Goede (@BobbieGoede)
- mustafa60x (@mustafa60x)
- Matej Černý (@cernymatej)
- Alex Liu (@Mini-ghost)
- Amitav Chris Mostafa (@semibroiled)
- Romain Hamel (@romhml)
- Jacky Lam (@jackylamhk)
- Mukund Shah (@mukundshah)
- Luke Nelson (@luc122c)
- letianpailove (@letianpailove)
- Erwan Jugand (@erwanjugand)
- Alexander (@TheColorman)
- Ryota Watanabe (@wattanx)
- Yizack Rangel (@Yizack)

---

### v3.20.0
*Released: 10/28/2025*

> **3.20.0** is the next minor release.

## ✅ Upgrading

Our recommendation for upgrading is to run:

```sh
npx nuxt upgrade --dedupe --channel=v3
```

This will deduplicate your lockfile as well, and help ensure that you pull in updates from other dependencies that Nuxt relies on, particularly in the unjs ecosystem.


## 👉 Changelog

[compare changes](https://github.com/nuxt/nuxt/compare/v3.19.3...v3.20.0)

### 🚀 Enhancements
- **nuxt:** Allow specifying component `declarationPath` ([#33419](https://github.com/nuxt/nuxt/pull/33419))
- **kit:** Add `extensions` option for `resolveModule` ([#33328](https://github.com/nuxt/nuxt/pull/33328))
- **nuxt:** Add abortController option to `useAsyncData` ([#32531](https://github.com/nuxt/nuxt/pull/32531))
- **nuxt:** Display youch error page w/ user error page in dev ([#33359](https://github.com/nuxt/nuxt/pull/33359))
- **nuxt:** Experimental typescript plugin support ([#33314](https://github.com/nuxt/nuxt/pull/33314))
- **nuxt,schema:** Extract asyncData handlers to chunks ([#33131](https://github.com/nuxt/nuxt/pull/33131))
- **kit:** Add `setGlobalHead` utility ([#33512](https://github.com/nuxt/nuxt/pull/33512))
- **kit,vite:** Allow enabling vite environment api ([#33492](https://github.com/nuxt/nuxt/pull/33492))
### 🔥 Performance
- **nuxt:** Precompute renderer dependencies at build time ([#33361](https://github.com/nuxt/nuxt/pull/33361))
- **kit,schema:** Remove some unnecessary dependencies ([bdf34c263](https://github.com/nuxt/nuxt/commit/bdf34c263))
### 🩹 Fixes
- **nuxt:** Preserve hash with redirecting based on `routeRules` ([#33222](https://github.com/nuxt/nuxt/pull/33222))
- **kit:** Safely cleanup `loadNuxtConfig` in concurrent calls ([#33420](https://github.com/nuxt/nuxt/pull/33420))
- **nuxt:** Allow object-format `href` in `<NuxtLink>` ([b97ae2f70](https://github.com/nuxt/nuxt/commit/b97ae2f70))
- **nuxt:** Remove `mergeModels` from auto imports ([#33344](https://github.com/nuxt/nuxt/pull/33344))
- **nuxt:** Add back `shortPath` property ([#33384](https://github.com/nuxt/nuxt/pull/33384))
- **nuxt:** Do not allow native attrs to shadow nuxt link props ([0981990a7](https://github.com/nuxt/nuxt/commit/0981990a7))
- **nuxt:** Remove `declarationPath` from component dirs ([e384ba3cb](https://github.com/nuxt/nuxt/commit/e384ba3cb))
- **nuxt:** Preserve root route in `isPrerendered` check ([#33476](https://github.com/nuxt/nuxt/pull/33476))
- **nuxt:** Exempt webpack vfs from pkg lookup ([4df1e8275](https://github.com/nuxt/nuxt/commit/4df1e8275))
- **nitro:** Exempt nightly release from import protections ([272d9abbe](https://github.com/nuxt/nuxt/commit/272d9abbe))
- **webpack,rspack:** Preserve prerender + nitro flags in server builds ([#33503](https://github.com/nuxt/nuxt/pull/33503))
- **nuxt:** Support component auto-imports as arguments of `h()` ([#33509](https://github.com/nuxt/nuxt/pull/33509))
- **vite:** Prevent assignment for rolldown's replacement plugin ([#33526](https://github.com/nuxt/nuxt/pull/33526))
- **nuxt:** Use sha256 hash for prerender cache keys ([#33505](https://github.com/nuxt/nuxt/pull/33505))
- **nuxt:** Add `NuxtTime` relative time `numeric` prop ([#33552](https://github.com/nuxt/nuxt/pull/33552))
- **nuxt:** Add `NuxtTime` relative time `relativeStyle` prop ([#33557](https://github.com/nuxt/nuxt/pull/33557))
- **nuxt:** Handle arrays in app config correctly during HMR ([#33555](https://github.com/nuxt/nuxt/pull/33555))
### 💅 Refactors
- Remove obsolete `shortPath` property ([#33384](https://github.com/nuxt/nuxt/pull/33384))
- **kit:** Extract trace utilities ([ddaedfa51](https://github.com/nuxt/nuxt/commit/ddaedfa51))
- **nuxt,vite,webpack:** Allow builders to augment types ([#33427](https://github.com/nuxt/nuxt/pull/33427))
- **schema:** Deprecate `extend`, `extendConfig`, and `configResolved` hooks ([932a80dc6](https://github.com/nuxt/nuxt/commit/932a80dc6))
- **nitro,nuxt:** Extract `@nuxt/nitro-server` package ([#33462](https://github.com/nuxt/nuxt/pull/33462))
- **nuxt:** Use `RouteLocationNormalizedLoadedGeneric` internally ([aa211fb4f](https://github.com/nuxt/nuxt/commit/aa211fb4f))
- **vite:** Make vite plugins environment-compatible ([#33445](https://github.com/nuxt/nuxt/pull/33445))
### 📖 Documentation
- Add nuxt module `addServerPlugin` note ([#33409](https://github.com/nuxt/nuxt/pull/33409))
- Remove deprecated node version ([#33411](https://github.com/nuxt/nuxt/pull/33411))
- Update `declarationPath` in `addComponent` ([#33380](https://github.com/nuxt/nuxt/pull/33380))
- Add some notes/deprecations for vite hooks ([2c6912d2f](https://github.com/nuxt/nuxt/commit/2c6912d2f))
- Fix incorrect ESM module field info ([#33451](https://github.com/nuxt/nuxt/pull/33451))
- Recommend `getLayerDirectories()` instead of `nuxt.options._layers` ([#33484](https://github.com/nuxt/nuxt/pull/33484))
- Add docs for `moduleDependencies` ([#33499](https://github.com/nuxt/nuxt/pull/33499))
- Pin codemod to v0.18.7 for migration recipe ([#33522](https://github.com/nuxt/nuxt/pull/33522))
### 🏡 Chore
- Migrate gitpod to ona ([#33159](https://github.com/nuxt/nuxt/pull/33159))
- Use native node to run `test:prepare` ([cbad63c02](https://github.com/nuxt/nuxt/commit/cbad63c02))
- Do not use native node to run `test:prepare` ([672c09423](https://github.com/nuxt/nuxt/commit/672c09423))
- Update valid semantic scopes ([4ca29168b](https://github.com/nuxt/nuxt/commit/4ca29168b))
- Ignore nitro templates ([ec59aceeb](https://github.com/nuxt/nuxt/commit/ec59aceeb))
- Remove `vue-demi` from `ignoredBuiltDependencies` ([#33494](https://github.com/nuxt/nuxt/pull/33494))
- Update vscode url ([#33360](https://github.com/nuxt/nuxt/pull/33360))
- Correct jsdoc location for function used as parameters ([#33507](https://github.com/nuxt/nuxt/pull/33507))
- Remove code comment ([#33515](https://github.com/nuxt/nuxt/pull/33515))
- Patch changelogen for large numbers of commits ([b6530b5b6](https://github.com/nuxt/nuxt/commit/b6530b5b6))
- Filter out commits before last tag when constructing changelog ([257049712](https://github.com/nuxt/nuxt/commit/257049712))
- Ignore `@rollup/plugin-commonjs` ([c2bd323b8](https://github.com/nuxt/nuxt/commit/c2bd323b8))
- Pin `@rollup/plugin-commonjs` ([a524522ea](https://github.com/nuxt/nuxt/commit/a524522ea))
### ✅ Tests
- Update runtime test to use `asyncDataDefaults.errorValue` ([b6f1c9b0d](https://github.com/nuxt/nuxt/commit/b6f1c9b0d))
- Refactor suite to use common matrix utils ([#33483](https://github.com/nuxt/nuxt/pull/33483))
- Update typed router test ([c55db2854](https://github.com/nuxt/nuxt/commit/c55db2854))
### 🤖 CI
- Publish `@nuxt/nitro-server` on pkg-pr-new ([d37ef17b0](https://github.com/nuxt/nuxt/commit/d37ef17b0))
- Remove nitro-server publish until v4.2 is released ([e34c2f52f](https://github.com/nuxt/nuxt/commit/e34c2f52f))
- For now, use tag push to trigger release ([0705b835f](https://github.com/nuxt/nuxt/commit/0705b835f))

### ❤️ Contributors
- Daniel Roe (@danielroe)
- 山吹色御守 (@KazariEX)
- Matej Černý (@cernymatej)
- Trung Dang (@NamesMT)
- 纸鹿/Zhilu (@L33Z22L11)
- Florian Heuberger (@Flo0806)
- Alexander Lichter (@TheAlexLichter)
- Julien Huang (@huang-julien)
- abeer0 (@iiio2)
- Max (@onmax)
- Octavio Araiza (@8ctavio)
- Bobbie Goede (@BobbieGoede)
- DipakHalkude (@DipakHalkude)
- Aleksander Błaszkiewicz (@ablaszkiewicz)

---

### v4.0.0
*Released: 7/16/2025*

**Nuxt 4.0 is here!** 🎉

After a year of real-world testing, we're excited to announce the official release of Nuxt 4. This is a stability-focused major release, introducing a few thoughtful breaking changes in order to improve development experience.

If you've been following along, you'll recognize many of these features and changes &mdash; and if you're new to them, we hope you'll welcome them.

### 🔥 What's new?

Nuxt 4 is all about making your development experience smoother:

- **Cleaner project organization** with the new `app/` directory structure
- **Smarter data fetching** - we've taken the opportunity to address some inconsistencies and improve performance with the data layer
- **Better TypeScript support** with project-based separation between the different contexts in your project - app code, server code, `shared/` folder, and configuration
- **Faster CLI and development** with adoption of internal sockets and a faster CLI

Why these features in particular? Mostly because these kind of improvements have required making changes that are technically breaking.

In general, we aim for a hype-free approach to releases. Rather than save up features for a big release, we've been shipping improvements in Nuxt 3 minor releases.

We've also spent a lot of time figuring out how to implement these changes in a backwards-compatible way, and I hope that means that most Nuxt 3 projects can upgrade with a minimum of effort.

I'd advise reading through the [upgrade guide](https://nuxt.com/docs/4.x/getting-started/upgrade) before you start, to understand what areas of your app might be affected.

#### 🗂️ New project structure

The biggest visible change is how projects are organized. Your application code now lives in an `app/` directory by default:

```bash
my-nuxt-app/
├─ app/
│  ├─ components/
│  ├─ pages/
│  ├─ layouts/
│  └─ app.vue
├─ public/
├─ shared/
├─ server/
└─ nuxt.config.ts
```

This helps keep your code separate from `node_modules/` and `.git/`, which makes file watchers faster (especially on Windows and Linux). It also gives your IDE better context about whether you're working with client or server code.

> [!TIP]
> **Don't want to migrate?** That's totally fine! Nuxt will detect your existing structure and keep working exactly as before.

##### 🎨 Updated UI templates

Nuxt’s starter templates have an all new look, with improved accessibility, default titles, and template polish ([#27843](https://github.com/nuxt/nuxt/pull/27843)).

#### 🔄 Smarter data fetching

We've made `useAsyncData` and `useFetch` work better. Multiple components using the same key now share their data automatically. There's also automatic cleanup when components unmount, and you can use reactive keys to refetch data when needed. Plus, we've given you more control over when cached data gets used.

Some of these features have already been made available in Nuxt v3 minor releases, because we've been rolling this out gradually. Nuxt v4 brings different defaults, and we expect to continue to work on this data layer in the days to come.

#### 🔧 Better TypeScript experience

Nuxt now creates separate TypeScript projects for your app code, server code, `shared/` folder, and builder code. This should mean better autocompletion, more accurate type inference and fewer confusing errors when you're working in different contexts.

> [!TIP]
> With Nuxt 4, you will only need one `tsconfig.json` file in your project root!

This is probably the single issue that is most likely to cause surprises when upgrading, but it should also make your TypeScript experience much smoother in the long run. Please report any issues you encounter. 🙏

#### ⚡ Faster CLI and development

In parallel with the release of v4, we've been working on speeding up `@nuxt/cli`.

- **Faster cold starts** - Development server startup is noticeably faster
- **Node.js compile cache** - Automatic reuse of the v8 compile cache
- **Native file watching** - Uses `fs.watch` APIs for fewer system resources
- **Socket-based communication** - The CLI and Vite dev server now communicate via internal sockets instead of network ports, reducing overhead &mdash; particularly on Windows

These improvements combined can make a really noticeable difference in your day-to-day development experience, and we have more planned.

### 🚀 How to upgrade

Although any major release brings breaking changes, one of our main aims for this release is to ensure that the upgrade path is as smooth as possible. Most of the breaking changes have been testable with a compatibility flag for over a year.

Most projects should upgrade smoothly, but there are a few things to be aware of:

- Nuxt 2 compatibility has been removed from `@nuxt/kit`. (This will particularly affect module authors.)
- Some legacy utilities and deprecated features have been cleaned up.
- The new TypeScript setup might surface some type issues that were hidden before.
- A few modules might need further updates for full Nuxt 4 compatibility.

Don't worry though &mdash; for most breaking changes, there are configuration options to revert to the old behavior while you adjust.

#### 1. Update Nuxt

Our recommendation for upgrading is to run:

```sh
npx nuxt upgrade --dedupe
```

This will deduplicate your lockfile as well, and help ensure that you pull in updates from other dependencies that Nuxt relies on, particularly in the unjs ecosystem.

#### 2. Optional: use migration tools

We’ve also partnered with [Codemod](https://github.com/codemod-com/codemod) to automate many, though not all, migration steps:

```bash
npx codemod@latest nuxt/4/migration-recipe
```

#### 3. Test and adjust

Run your tests, check that everything builds correctly, and fix any issues that come up. The [upgrade guide](/docs/4.x/getting-started/upgrade) has detailed migration steps for specific scenarios.

We'd recommend reading through it in full before starting your upgrade, to understand what areas of your app might be affected.

### 🗺️ What's next?

We're planning quick patch releases to address any issues that come up. Nuxt 3 will continue to receive maintenance updates (both bug fixes and backports of features from Nuxt 4) until the end of January 2026, so there's no rush if you need time to migrate.

Looking ahead, we plan to release Nuxt 5 on the sooner side, which will bring Nitro v3 and h3 v2 for even better performance, as well as adopting the Vite Environment API for an improved (and faster!) development experience. And there's a lot more in the works too!

And, quite apart from major releases, we have a lot of exciting features planned to make their way into Nuxt 3.x and 4.x release branches, including support for SSR streaming ([#4753](https://github.com/nuxt/nuxt/issues/4753)), a first-party accessibility module ([#23255](https://github.com/nuxt/nuxt/issues/23255)), built-in fetch caching strategies ([#26017](https://github.com/nuxt/nuxt/issues/26017)), more strongly typed fetch calls (landing in Nitro v3), dynamic route discovery ([#32196](https://github.com/nuxt/nuxt/issues/32196)), multi-app support ([#21635](https://github.com/nuxt/nuxt/issues/21635)) and more.

### ❤️ Thank you

This release is credit to so many people, particularly those who have been testing v4 compatibility mode over the past year. I'm really grateful &mdash; thank you for all your help!

Happy coding with Nuxt 4! 🚀

## 👉 Changelog

[compare changes](https://github.com/nuxt/nuxt/compare/v3.17.7...v4.0.0)

### 🚀 Enhancements
- **ui-templates:** Update template branding for v4 ([#27843](https://github.com/nuxt/nuxt/pull/27843))
- **deps:** Upgrade to latest versions of c12, jiti and unbuild ([#27995](https://github.com/nuxt/nuxt/pull/27995))
- **kit:** Reimplement cjs utils using `mlly` ([#28012](https://github.com/nuxt/nuxt/pull/28012))
- **nuxt:** Generate basic jsdoc for module config entry ([#27689](https://github.com/nuxt/nuxt/pull/27689))
- **schema:** Split dev/prod build directories ([#28594](https://github.com/nuxt/nuxt/pull/28594))
- **nuxt:** Cache vue app build outputs ([#28726](https://github.com/nuxt/nuxt/pull/28726))
- **deps:** Update dependency vite to v6 (main) ([#30042](https://github.com/nuxt/nuxt/pull/30042))
- **nuxt:** Add integration with chrome devtools workspaces ([#32084](https://github.com/nuxt/nuxt/pull/32084))
- **kit:** Support single import in `addServerImports` ([#32289](https://github.com/nuxt/nuxt/pull/32289))
- **nuxt:** Add `onWatcherCleanup` to imports presets ([#32396](https://github.com/nuxt/nuxt/pull/32396))
- **kit,nuxt,schema:** Separate ts projects for node/app/nitro ([#30665](https://github.com/nuxt/nuxt/pull/30665))
- **nuxt:** Support lazy hydration macros ([#31192](https://github.com/nuxt/nuxt/pull/31192))
- **nuxt:** Export `<NuxtTime>` prop types ([#32547](https://github.com/nuxt/nuxt/pull/32547))
- **nuxt:** Add route announcer to default app.vue ([#32621](https://github.com/nuxt/nuxt/pull/32621))
- **nuxt:** Expose page routes to nitro for o11y ([#32617](https://github.com/nuxt/nuxt/pull/32617))
### 🔥 Performance
- **nuxt:** ⚠️  Don't call `render:html` for server islands ([#27889](https://github.com/nuxt/nuxt/pull/27889))
- **vite:** Don't write stub manifest for legacy bundler ([#27957](https://github.com/nuxt/nuxt/pull/27957))
- **kit:** Update env expansion regex to match nitro ([#30766](https://github.com/nuxt/nuxt/pull/30766))
- **vite:** Communicate with vite-node via internal socket ([#32417](https://github.com/nuxt/nuxt/pull/32417))
### 🩹 Fixes
- **schema,vite:** ⚠️  Do not allow configuring vite dev bundler ([#27707](https://github.com/nuxt/nuxt/pull/27707))
- **schema:** ⚠️  Default to `compatibilityVersion: 4` ([#27710](https://github.com/nuxt/nuxt/pull/27710))
- **nuxt:** ⚠️  Emit absolute paths in `builder:watch` hook ([#27709](https://github.com/nuxt/nuxt/pull/27709))
- **nuxt:** ⚠️  Improve default `asyncData` value behaviour ([#27718](https://github.com/nuxt/nuxt/pull/27718))
- **nuxt:** ⚠️  Remove old experimental options ([#27749](https://github.com/nuxt/nuxt/pull/27749))
- **kit:** ⚠️  Support loading nuxt 4 and drop support for <=2 ([#27837](https://github.com/nuxt/nuxt/pull/27837))
- **nuxt:** ⚠️  Remove `__NUXT__` after hydration ([#27745](https://github.com/nuxt/nuxt/pull/27745))
- **ui-templates:** Add default title back ([3415241a6](https://github.com/nuxt/nuxt/commit/3415241a6))
- **kit:** ⚠️  Drop support for building nuxt 2 projects ([1beddba6a](https://github.com/nuxt/nuxt/commit/1beddba6a))
- **nuxt:** ⚠️  Bump internal majorVersion to `4` ([7aae4033b](https://github.com/nuxt/nuxt/commit/7aae4033b))
- **kit:** Mark `resolvePath` utils as sync ([655e1473d](https://github.com/nuxt/nuxt/commit/655e1473d))
- **kit:** Revert change to `tryResolveModule` ([2d136e04c](https://github.com/nuxt/nuxt/commit/2d136e04c))
- **kit:** Add back `requireModule` and `tryRequireModule` ([#28013](https://github.com/nuxt/nuxt/pull/28013))
- **nuxt:** Hide unhandled error messages in prod ([#28156](https://github.com/nuxt/nuxt/pull/28156))
- **nuxt:** Add `useScriptCrisp` scripts stub ([0c3cc4cf3](https://github.com/nuxt/nuxt/commit/0c3cc4cf3))
- **nuxt:** ⚠️  Remove unused `globalName` property ([#28391](https://github.com/nuxt/nuxt/pull/28391))
- **nuxt:** Use static import for `updateAppConfig` in HMR ([#28349](https://github.com/nuxt/nuxt/pull/28349))
- **vite:** Write dev manifest when `ssr: false` ([#28488](https://github.com/nuxt/nuxt/pull/28488))
- **kit,nuxt,schema:** ⚠️  Remove other support for nuxt2/bridge ([#28936](https://github.com/nuxt/nuxt/pull/28936))
- **webpack:** Only insert dynamic require plugin when building ([b619b35e9](https://github.com/nuxt/nuxt/commit/b619b35e9))
- **nuxt:** Guard `window` access ([d874726ff](https://github.com/nuxt/nuxt/commit/d874726ff))
- **nuxt:** Remove unneeded subpath import ([18a6ef1ca](https://github.com/nuxt/nuxt/commit/18a6ef1ca))
- **webpack:** Handle new webpack chunk format ([d293c06d2](https://github.com/nuxt/nuxt/commit/d293c06d2))
- **kit:** ⚠️  Do not check compatibility for nuxt version < 2.13 ([f94cda4c8](https://github.com/nuxt/nuxt/commit/f94cda4c8))
- **ui-templates:** Fix examples link and add bluesky ([#30866](https://github.com/nuxt/nuxt/pull/30866))
- **vite:** Use `resolveId` from `vite-node` to resolve deps ([#30922](https://github.com/nuxt/nuxt/pull/30922))
- **nuxt:** Import `isEqual` from main `ohash` export ([3ec1a1e5e](https://github.com/nuxt/nuxt/commit/3ec1a1e5e))
- **vite:** Don't set `output.preserveModules` ([ce49734aa](https://github.com/nuxt/nuxt/commit/ce49734aa))
- **nuxt:** Ignore `#app-manifest` import in dev mode ([#31539](https://github.com/nuxt/nuxt/pull/31539))
- **nuxt:** Ensure layer array-type config is merged in order ([#31507](https://github.com/nuxt/nuxt/pull/31507))
- **schema:** Turn off `purgeCachedData` until v4 ([7aa3a01ae](https://github.com/nuxt/nuxt/commit/7aa3a01ae))
- **schema:** Re-enable `purgeCachedData` by default ([06745604c](https://github.com/nuxt/nuxt/commit/06745604c))
- **webpack:** Expand dynamic require regexp to match new pattern ([62e700daa](https://github.com/nuxt/nuxt/commit/62e700daa))
- **nuxt:** Add back missing reset of `.execute` ([d79e14612](https://github.com/nuxt/nuxt/commit/d79e14612))
- **nuxt,schema:** ⚠️  Remove support for `compatibilityVersion: 3` ([#32255](https://github.com/nuxt/nuxt/pull/32255))
- **kit,nuxt,schema,vite:** ⚠️  Remove support for some deprecated options ([#32257](https://github.com/nuxt/nuxt/pull/32257))
- **nuxt:** ⚠️  Don't rerun asyncdata w/ existing data in `useAsyncData` ([#32170](https://github.com/nuxt/nuxt/pull/32170))
- **nuxt:** Scan nitro handlers before writing types ([a3698c08b](https://github.com/nuxt/nuxt/commit/a3698c08b))
- **nuxt:** Force asyncData `errorValue`/`value` to be undefined ([7e4eac655](https://github.com/nuxt/nuxt/commit/7e4eac655))
- **nuxt:** ⚠️  Remove public and assets aliases ([#32119](https://github.com/nuxt/nuxt/pull/32119))
- **webpack:** Update dynamic require pattern ([#32278](https://github.com/nuxt/nuxt/pull/32278))
- **schema:** ⚠️  Remove top level generate option ([#32355](https://github.com/nuxt/nuxt/pull/32355))
- **ui-templates:** Add aria tag on Nuxt logo ([#32429](https://github.com/nuxt/nuxt/pull/32429))
- **nuxt:** Augment runtime config in server context ([#32482](https://github.com/nuxt/nuxt/pull/32482))
- **kit:** Do not skip layer with defined `srcDir` ([#32487](https://github.com/nuxt/nuxt/pull/32487))
- **deps:** Upgrade to rc version of `@nuxt/cli` ([#32488](https://github.com/nuxt/nuxt/pull/32488))
- **kit:** Ensure legacy `tsConfig` doesn't exclude too many types ([#32528](https://github.com/nuxt/nuxt/pull/32528))
- **kit:** Ensure types of module entrypoints are in node project ([#32551](https://github.com/nuxt/nuxt/pull/32551))
- **kit:** Add layer `app/` and `server/` folders into tsconfigs ([#32592](https://github.com/nuxt/nuxt/pull/32592))
- **schema:** Disable changing compat version ([#32600](https://github.com/nuxt/nuxt/pull/32600))
- **nuxt:** Allow modules to add to `typescript.hoist` ([#32601](https://github.com/nuxt/nuxt/pull/32601))
- **nuxt:** Include shared declarations in `tsconfig.server.json` ([#32594](https://github.com/nuxt/nuxt/pull/32594))
- **nuxt:** Retain old data when computed key changes ([#32616](https://github.com/nuxt/nuxt/pull/32616))
- **nuxt:** ⚠️  Bump `compatibilityDate` to `2025-07-15` ([e35e1ccb9](https://github.com/nuxt/nuxt/commit/e35e1ccb9))
- **nuxt:** Only use `scrollBehaviorType` for hash scrolling ([#32622](https://github.com/nuxt/nuxt/pull/32622))
### 💅 Refactors
- **kit,nuxt:** ⚠️  Drop nuxt 2 + ejs template compile support ([#27706](https://github.com/nuxt/nuxt/pull/27706))
- **nuxt:** ⚠️  Move `#app/components/layout` -> `#app/components/nuxt-layout` ([209e81b60](https://github.com/nuxt/nuxt/commit/209e81b60))
- **kit,nuxt,vite,webpack:** ⚠️  Remove legacy require utils ([#28008](https://github.com/nuxt/nuxt/pull/28008))
- **nuxt:** Simplify check of `dedupe` option ([#28151](https://github.com/nuxt/nuxt/pull/28151))
- **nuxt:** Use direct import of `installNuxtModule` ([501ccc375](https://github.com/nuxt/nuxt/commit/501ccc375))
- **kit:** Remove internal function ([#32189](https://github.com/nuxt/nuxt/pull/32189))
- **schema:** ⚠️  Remove config.schema.json export + defaults ([#32254](https://github.com/nuxt/nuxt/pull/32254))
- **nuxt:** Migrate to `oxc-walker` ([#32250](https://github.com/nuxt/nuxt/pull/32250))
- **nuxt,schema:** Use oxc for `onPrehydrate` transform ([#32045](https://github.com/nuxt/nuxt/pull/32045))
### 📖 Documentation
- Indicate what `useAsyncData` must return ([#28259](https://github.com/nuxt/nuxt/pull/28259))
- Update `deep` default for `useAsyncData` & `useFetch` ([#28564](https://github.com/nuxt/nuxt/pull/28564))
- Fix link to issue ([4d13f1027](https://github.com/nuxt/nuxt/commit/4d13f1027))
- Improve wording for `deep` option ([bec85dfcd](https://github.com/nuxt/nuxt/commit/bec85dfcd))
- Update v4 docs with new folder structure ([#32348](https://github.com/nuxt/nuxt/pull/32348))
- Update `.nuxtignore` examples for v4 structure ([#32489](https://github.com/nuxt/nuxt/pull/32489))
- Add reference to `useNuxtData` in data fetching composable pages ([#32589](https://github.com/nuxt/nuxt/pull/32589))
- Temporarily use v4 template for v4 docs ([850a879d3](https://github.com/nuxt/nuxt/commit/850a879d3))
- Document the --modules flag in the init command ([#32599](https://github.com/nuxt/nuxt/pull/32599))
### 📦 Build
- **deps:** Bump esbuild from 0.23.1 to 0.25.0 ([#31247](https://github.com/nuxt/nuxt/pull/31247))
### 🏡 Chore
- Manage update to `vite-plugin-checker` separately ([02d46dd3d](https://github.com/nuxt/nuxt/commit/02d46dd3d))
- Update docs typecheck command ([#28433](https://github.com/nuxt/nuxt/pull/28433))
- Improve accuracy of 4.x changelog ([#28706](https://github.com/nuxt/nuxt/pull/28706))
- Bump package versions internally to v4 ([16fab7778](https://github.com/nuxt/nuxt/commit/16fab7778))
- **kit:** Fix regressed version v4 ([a1c052057](https://github.com/nuxt/nuxt/commit/a1c052057))
- Dedupe lockfile ([f14ef6bc9](https://github.com/nuxt/nuxt/commit/f14ef6bc9))
- Update once more ([4d22f4d5a](https://github.com/nuxt/nuxt/commit/4d22f4d5a))
- Specify workspace `engines.node` compatibility ([a26322f5f](https://github.com/nuxt/nuxt/commit/a26322f5f))
- Remove special treatment for typescript ([08766a0cd](https://github.com/nuxt/nuxt/commit/08766a0cd))
- Reenable quarantine for webpack/memfs (for 3.x benefit) ([9cb94e55e](https://github.com/nuxt/nuxt/commit/9cb94e55e))
- Remove extra dep ([f0ec34298](https://github.com/nuxt/nuxt/commit/f0ec34298))
- Add back `nuxi` ([9aa4c7c3b](https://github.com/nuxt/nuxt/commit/9aa4c7c3b))
- Remove stray `nuxi` version again ([#30547](https://github.com/nuxt/nuxt/pull/30547))
- Fix lockfile ([7d345c714](https://github.com/nuxt/nuxt/commit/7d345c714))
- Remove second version of vitest ([#30868](https://github.com/nuxt/nuxt/pull/30868))
- Ignore `oxc-parser` updates temporarily ([1cd0fb5cb](https://github.com/nuxt/nuxt/commit/1cd0fb5cb))
- Ignore `nitro/templates` directory ([e531477f8](https://github.com/nuxt/nuxt/commit/e531477f8))
- Fix ui-templates build ([c8a1b9e80](https://github.com/nuxt/nuxt/commit/c8a1b9e80))
- Mkdir for ui-templates ([853408a1e](https://github.com/nuxt/nuxt/commit/853408a1e))
- Add webpack resolution ([088bcd459](https://github.com/nuxt/nuxt/commit/088bcd459))
- Migrate playground + test fixtures to new directory format ([#32357](https://github.com/nuxt/nuxt/pull/32357))
- **schema:** Remove duplicated documentation ([349f75447](https://github.com/nuxt/nuxt/commit/349f75447))
### ✅ Tests
- Remove unused experimental options ([6d971ddc9](https://github.com/nuxt/nuxt/commit/6d971ddc9))
- Add additional `attw` test for built packages ([#30206](https://github.com/nuxt/nuxt/pull/30206))
- Add minimal pages fixture ([#30457](https://github.com/nuxt/nuxt/pull/30457))
- Update bundle size assertion ([f458153d9](https://github.com/nuxt/nuxt/commit/f458153d9))
- Update bundle size assertion ([4cce6bf8d](https://github.com/nuxt/nuxt/commit/4cce6bf8d))
- Benchmark minimal fixture instead ([#31174](https://github.com/nuxt/nuxt/pull/31174))
- Normalise scoped css + pass logger to `configResolved` ([8d3bd4f9f](https://github.com/nuxt/nuxt/commit/8d3bd4f9f))
- More precise asyncData tests ([023fb13eb](https://github.com/nuxt/nuxt/commit/023fb13eb))
- Extend timeout when waiting for hydration ([f34c6c240](https://github.com/nuxt/nuxt/commit/f34c6c240))
- Also assert status ([4f6bdf755](https://github.com/nuxt/nuxt/commit/4f6bdf755))
### 🤖 CI
- Bump node v22 ([#30251](https://github.com/nuxt/nuxt/pull/30251))
- Run workflows on merge groups ([ff37ad9df](https://github.com/nuxt/nuxt/commit/ff37ad9df))
- Do not invoke semantic-pr test on merge groups ([fadd618d1](https://github.com/nuxt/nuxt/commit/fadd618d1))
#### ⚠️ Breaking Changes
- **nuxt:** ⚠️  Don't call `render:html` for server islands ([#27889](https://github.com/nuxt/nuxt/pull/27889))
- **schema,vite:** ⚠️  Do not allow configuring vite dev bundler ([#27707](https://github.com/nuxt/nuxt/pull/27707))
- **schema:** ⚠️  Default to `compatibilityVersion: 4` ([#27710](https://github.com/nuxt/nuxt/pull/27710))
- **nuxt:** ⚠️  Emit absolute paths in `builder:watch` hook ([#27709](https://github.com/nuxt/nuxt/pull/27709))
- **nuxt:** ⚠️  Improve default `asyncData` value behaviour ([#27718](https://github.com/nuxt/nuxt/pull/27718))
- **nuxt:** ⚠️  Remove old experimental options ([#27749](https://github.com/nuxt/nuxt/pull/27749))
- **kit:** ⚠️  Support loading nuxt 4 and drop support for <=2 ([#27837](https://github.com/nuxt/nuxt/pull/27837))
- **nuxt:** ⚠️  Remove `__NUXT__` after hydration ([#27745](https://github.com/nuxt/nuxt/pull/27745))
- **kit:** ⚠️  Drop support for building nuxt 2 projects ([1beddba6a](https://github.com/nuxt/nuxt/commit/1beddba6a))
- **nuxt:** ⚠️  Bump internal majorVersion to `4` ([7aae4033b](https://github.com/nuxt/nuxt/commit/7aae4033b))
- **nuxt:** ⚠️  Remove unused `globalName` property ([#28391](https://github.com/nuxt/nuxt/pull/28391))
- **kit,nuxt,schema:** ⚠️  Remove other support for nuxt2/bridge ([#28936](https://github.com/nuxt/nuxt/pull/28936))
- **kit:** ⚠️  Do not check compatibility for nuxt version < 2.13 ([f94cda4c8](https://github.com/nuxt/nuxt/commit/f94cda4c8))
- **nuxt,schema:** ⚠️  Remove support for `compatibilityVersion: 3` ([#32255](https://github.com/nuxt/nuxt/pull/32255))
- **kit,nuxt,schema,vite:** ⚠️  Remove support for some deprecated options ([#32257](https://github.com/nuxt/nuxt/pull/32257))
- **nuxt:** ⚠️  Don't rerun asyncdata w/ existing data in `useAsyncData` ([#32170](https://github.com/nuxt/nuxt/pull/32170))
- **nuxt:** ⚠️  Remove public and assets aliases ([#32119](https://github.com/nuxt/nuxt/pull/32119))
- **schema:** ⚠️  Remove top level generate option ([#32355](https://github.com/nuxt/nuxt/pull/32355))
- **nuxt:** ⚠️  Bump `compatibilityDate` to `2025-07-15` ([e35e1ccb9](https://github.com/nuxt/nuxt/commit/e35e1ccb9))
- **kit,nuxt:** ⚠️  Drop nuxt 2 + ejs template compile support ([#27706](https://github.com/nuxt/nuxt/pull/27706))
- **nuxt:** ⚠️  Move `#app/components/layout` -> `#app/components/nuxt-layout` ([209e81b60](https://github.com/nuxt/nuxt/commit/209e81b60))
- **kit,nuxt,vite,webpack:** ⚠️  Remove legacy require utils ([#28008](https://github.com/nuxt/nuxt/pull/28008))
- **schema:** ⚠️  Remove config.schema.json export + defaults ([#32254](https://github.com/nuxt/nuxt/pull/32254))

### ❤️ Contributors
- Daniel Roe (@danielroe)
- Connor Pearson (@cjpearson)
- Stephen Jason Wang (@stephenjason89)
- dwood-csi (@dwood-csi)
- Alex (@hywax)
- Alex Liu (@Mini-ghost)
- Bobbie Goede (@BobbieGoede)
- Marko (@aussieboi)
- Igor Kononenko (@igorexa34314)
- Alexander Lichter (@TheAlexLichter)
- Robin (@OrbisK)
- Matej Černý (@cernymatej)
- Michael Brevard (@GalacticHypernova)
- Andrej Adamcik (@adamcikado)
- dependabot[bot] (@dependabot[bot])
- Sébastien Chopin (@atinux)
- Yauheni Vasiukevich (@EvgenyWas)
- @beer (@iiio2)
- Anthony Fu (@antfu)
- pan93412 (@pan93412)
- Tobias Diez (@tobiasdiez)
- Aleksei Nagovitsyn (@al3xnag)
- xjccc (@xjccc)
- Julien Huang (@huang-julien)

---

### v4.1.0
*Released: 9/3/2025*

## 👀 Highlights

### 🔥 Build and Performance Improvements

#### 🍫 Enhanced Chunk Stability

Build stability has been significantly improved with import maps ([#33075](https://github.com/nuxt/nuxt/pull/33075)). This prevents cascading hash changes that could invalidate large portions of your build when small changes are made:

```html
<!-- Automatically injected import map -->
<script type="importmap">{"imports":{"#entry":"/_nuxt/DC5HVSK5.js"}}</script>
```

By default, JS chunks emitted in a Vite build are hashed, which means they can be cached immutably. However, this can cause a significant issue: a change to a single component can cause _every_ hash to be invalidated, massively increasing the chance of 404s.

In short:

1. a component is changed slightly - the hash of its JS chunk changes
2. the page which uses the component has to be updated to reference the new file name
3. the _entry_ now has its hash changed because it dynamically imports the page
4. _**every other file**_ which imports the entry has its hash changed because the entry file name is changed

Obviously this wasn't optimal. With this new feature, the hash of (otherwise) unchanged files which import the entry won't be affected.

This feature is automatically enabled and helps maintain better cache efficiency in production. It does require [native import map support](https://caniuse.com/import-maps), but Nuxt will automatically disable it if you have configured `vite.build.target` to include a browser that doesn't support import maps.

And of course you can disable it if needed:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  experimental: {
    entryImportMap: false
  }
})
```

#### 🦀 Experimental Rolldown Support

Nuxt now includes experimental support for `rolldown-vite` ([#31812](https://github.com/nuxt/nuxt/pull/31812)), bringing Rust-powered bundling for potentially faster builds.

To try Rolldown in your Nuxt project, you need to override Vite with the rolldown-powered version since Vite is a dependency of Nuxt. Add the following to your `package.json`:


**npm**:
```json
{
  "overrides": {
    "vite": "npm:rolldown-vite@latest"
  }
}
```

**pnpm**:
```json
{
  "pnpm": {
    "overrides": {
      "vite": "npm:rolldown-vite@latest"
    }
  }
}
```

**yarn**:
```json
{
  "resolutions": {
    "vite": "npm:rolldown-vite@latest"
  }
}
```

**bun**:
```json
{
  "overrides": {
    "vite": "npm:rolldown-vite@latest"
  }
}
```

After adding the override, reinstall your dependencies. Nuxt will automatically detect when Rolldown is available and adjust its build configuration accordingly.

For more details on Rolldown integration, see the [Vite Rolldown guide](https://vite.dev/guide/rolldown).

> [!NOTE]
> This is experimental and may have some limitations, but offers a glimpse into the future of high-performance bundling in Nuxt.

### 🧪 Improved Lazy Hydration

Lazy hydration macros now work without auto-imports ([#33037](https://github.com/nuxt/nuxt/pull/33037)), making them more reliable when component auto-discovery is disabled:

```vue
<script setup>
// Works even with components: false
const LazyComponent = defineLazyHydrationComponent(
  'visible',
  () => import('./MyComponent.vue')
)
</script>
```

This ensures that components that are not "discovered" through Nuxt (e.g., because `components` is set to `false` in the config) can still be used in lazy hydration macros.

### 📄 Enhanced Page Rules

If you have enabled experimental extraction of route rules, these are now exposed on a dedicated `rules` property on `NuxtPage` objects ([#32897](https://github.com/nuxt/nuxt/pull/32897)), making them more accessible to modules and improving the overall architecture:

```ts
// In your module
nuxt.hook('pages:extend', pages => {
  pages.push({
    path: '/api-docs',
    rules: { 
      prerender: true,
      cors: true,
      headers: { 'Cache-Control': 's-maxage=31536000' }
    }
  })
})
```

The `defineRouteRules` function continues to work exactly as before, but now provides better integration possibilities for modules.

### 🚀 Module Development Enhancements

#### 🪾 Module Dependencies and Integration

Modules can now specify dependencies and modify options for other modules ([#33063](https://github.com/nuxt/nuxt/pull/33063)). This enables better module integration and ensures proper setup order:

```ts
export default defineNuxtModule({
  meta: {
    name: 'my-module',
  },
  moduleDependencies: {
    'some-module': {
      // You can specify a version constraint for the module
      version: '>=2',
      // By default moduleDependencies will be added to the list of modules 
      // to be installed by Nuxt unless `optional` is set.
      optional: true,
      // Any configuration that should override `nuxt.options`.
      overrides: {},
      // Any configuration that should be set. It will override module defaults but
      // will not override any configuration set in `nuxt.options`.
      defaults: {}
    }
  },
  setup (options, nuxt) {
    // Your module setup logic
  }
})
```

This replaces the deprecated `installModule` function and provides a more robust way to handle module dependencies with version constraints and configuration merging.

#### 🪝 Module Lifecycle Hooks

Module authors now have access to two new lifecycle hooks: `onInstall` and `onUpgrade` ([#32397](https://github.com/nuxt/nuxt/pull/32397)). These hooks allow modules to perform additional setup steps when first installed or when upgraded to a new version:

```ts
export default defineNuxtModule({
  meta: {
    name: 'my-module',
    version: '1.0.0',
  },

  onInstall(nuxt) {
    // This will be run when the module is first installed
    console.log('Setting up my-module for the first time!')
  },

  onUpgrade(inlineOptions, nuxt, previousVersion) {
    // This will be run when the module is upgraded
    console.log(`Upgrading my-module from v${previousVersion}`)
  }
})
```

The hooks are only triggered when both `name` and `version` are provided in the module metadata. Nuxt uses the `.nuxtrc` file internally to track module versions and trigger the appropriate hooks. (If you haven't come across it before, the `.nuxtrc` file should be committed to version control.)

> [!TIP]
> This means module authors can begin implementing their own 'setup wizards' to provide a better experience when some setup is required after installing a module.

#### 🙈 Enhanced File Resolution

The new `ignore` option for `resolveFiles` ([#32858](https://github.com/nuxt/nuxt/pull/32858)) allows module authors to exclude specific files based on glob patterns:

```ts
// Resolve all .vue files except test files
const files = await resolveFiles(srcDir, '**/*.vue', {
  ignore: ['**/*.test.vue', '**/__tests__/**']
})
```

#### 📂 Layer Directories Utility

A new `getLayerDirectories` utility ([#33098](https://github.com/nuxt/nuxt/pull/33098)) provides a clean interface for accessing layer directories without directly accessing private APIs:

```ts
import { getLayerDirectories } from '@nuxt/kit'

const layerDirs = await getLayerDirectories(nuxt)
// Access key directories:
// layerDirs.app        - /app/ by default
// layerDirs.appPages   - /app/pages by default
// layerDirs.server     - /server by default
// layerDirs.public     - /public by default
```

### ✨ Developer Experience Improvements

#### 🎱 Simplified Kit Utilities

Several kit utilities have been improved for better developer experience:

- `addServerImports` now supports single imports ([#32289](https://github.com/nuxt/nuxt/pull/32289)):

```ts
// Before: required array
addServerImports([{ from: 'my-package', name: 'myUtility' }])

// Now: can pass directly
addServerImports({ from: 'my-package', name: 'myUtility' })
```

#### 🔥 Performance Optimizations

This release includes several internal performance optimizations:

- Improved route rules cache management ([#32877](https://github.com/nuxt/nuxt/pull/32877))
- Optimized app manifest watching ([#32880](https://github.com/nuxt/nuxt/pull/32880))
- Better TypeScript processing for page metadata ([#32920](https://github.com/nuxt/nuxt/pull/32920))

### 🐛 Notable Fixes

- Improved `useFetch` hook typing ([#32891](https://github.com/nuxt/nuxt/pull/32891))
- Better handling of TypeScript expressions in page metadata ([#32902](https://github.com/nuxt/nuxt/pull/32902), [#32914](https://github.com/nuxt/nuxt/pull/32914))
- Enhanced route matching and synchronization ([#32899](https://github.com/nuxt/nuxt/pull/32899))
- Reduced verbosity of Vue server warnings in development ([#33018](https://github.com/nuxt/nuxt/pull/33018))
- Better handling of relative time calculations in `<NuxtTime>` ([#32893](https://github.com/nuxt/nuxt/pull/32893))

## ✅ Upgrading

As usual, our recommendation for upgrading is to run:

```sh
npx nuxt upgrade --dedupe
```

This will refresh your lockfile and pull in all the latest dependencies that Nuxt relies on, especially from the unjs ecosystem.

## 👉 Changelog

[compare changes](https://github.com/nuxt/nuxt/compare/v4.0.3...v4.1.0)
### 🚀 Enhancements
- **kit:** Add `ignore` option to `resolveFiles` ([#32858](https://github.com/nuxt/nuxt/pull/32858))
- **kit:** Add `onInstall` and `onUpgrade` module hooks ([#32397](https://github.com/nuxt/nuxt/pull/32397))
- **nuxt,vite:** Add experimental support for `rolldown-vite` ([#31812](https://github.com/nuxt/nuxt/pull/31812))
- **nuxt:** Extract `defineRouteRules` to page `rules` property ([#32897](https://github.com/nuxt/nuxt/pull/32897))
- **nuxt,vite:** Use importmap to increase chunk stability ([#33075](https://github.com/nuxt/nuxt/pull/33075))
- **nuxt:** Lazy hydration macros without auto-imports ([#33037](https://github.com/nuxt/nuxt/pull/33037))
- **kit,nuxt,schema:** Allow modules to specify dependencies ([#33063](https://github.com/nuxt/nuxt/pull/33063))
- **kit,nuxt:** Add `getLayerDirectories` util and refactor to use it ([#33098](https://github.com/nuxt/nuxt/pull/33098))
### 🔥 Performance
- **nuxt:** Clear inline route rules cache when pages change ([#32877](https://github.com/nuxt/nuxt/pull/32877))
- **nuxt:** Stop watching app manifest once a change has been detected ([#32880](https://github.com/nuxt/nuxt/pull/32880))
### 🩹 Fixes
- **nuxt:** Handle `satisfies` in page augmentation ([#32902](https://github.com/nuxt/nuxt/pull/32902))
- **nuxt:** Type response in `useFetch` hooks ([#32891](https://github.com/nuxt/nuxt/pull/32891))
- **nuxt:** Add TS parenthesis and as expression for page meta extraction ([#32914](https://github.com/nuxt/nuxt/pull/32914))
- **nuxt:** Use correct unit thresholds for relative time ([#32893](https://github.com/nuxt/nuxt/pull/32893))
- **nuxt:** Handle uncached current build manifests ([#32913](https://github.com/nuxt/nuxt/pull/32913))
- **kit:** Resolve directories in `resolvePath` and normalize file extensions ([#32857](https://github.com/nuxt/nuxt/pull/32857))
- **schema,vite:** Bump `requestTimeout` + allow configuration ([#32874](https://github.com/nuxt/nuxt/pull/32874))
- **nuxt:** Deep merge extracted route meta ([#32887](https://github.com/nuxt/nuxt/pull/32887))
- **nuxt:** Do not expose app components until fully resolved ([#32993](https://github.com/nuxt/nuxt/pull/32993))
- **kit:** Only exclude `node_modules/` if no custom `srcDir` ([#32987](https://github.com/nuxt/nuxt/pull/32987))
- **nuxt:** Transform ts before page meta extraction ([#32920](https://github.com/nuxt/nuxt/pull/32920))
- **nuxt:** Compare final matched routes when syncing `route` object ([#32899](https://github.com/nuxt/nuxt/pull/32899))
- **nuxt:** Make vue server warnings much less verbose in dev mode ([#33018](https://github.com/nuxt/nuxt/pull/33018))
- **schema:** Allow disabling cssnano/autoprefixer postcss plugins ([#33016](https://github.com/nuxt/nuxt/pull/33016))
- **kit:** Ensure local layers are prioritised alphabetically ([#33030](https://github.com/nuxt/nuxt/pull/33030))
- **kit,nuxt:** Expose global types to vue compiler ([#33026](https://github.com/nuxt/nuxt/pull/33026))
- **deps:** Bump devalue ([#33072](https://github.com/nuxt/nuxt/pull/33072))
- **nuxt:** Support config type inference for `defineNuxtModule().with()` ([#33081](https://github.com/nuxt/nuxt/pull/33081))
- **nuxt:** Search for colliding names in route children ([b58c139d2](https://github.com/nuxt/nuxt/commit/b58c139d2))
- **nuxt:** Delete `nuxtApp._runningTransition` on resolve ([#33025](https://github.com/nuxt/nuxt/pull/33025))
- **nuxt:** Add validation for nuxt island reviver key ([#33069](https://github.com/nuxt/nuxt/pull/33069))
### 💅 Refactors
- **nuxt:** Simplify page segment parsing ([#32901](https://github.com/nuxt/nuxt/pull/32901))
- **nuxt:** Remove unnecessary `async/await` in `afterEach` ([#32999](https://github.com/nuxt/nuxt/pull/32999))
- **vite:** Simplify inline chunk iteration ([6f4da1b8c](https://github.com/nuxt/nuxt/commit/6f4da1b8c))
- **kit,nuxt,ui-templates,vite:** Address deprecations + improve regexp perf ([#33093](https://github.com/nuxt/nuxt/pull/33093))
### 📖 Documentation
- Switch example to use vitest projects ([#32863](https://github.com/nuxt/nuxt/pull/32863))
- Update testing `setupTimeout` and add `teardownTimeout` ([#32868](https://github.com/nuxt/nuxt/pull/32868))
- Update `webRoot` to use new app directory ([df7177bff](https://github.com/nuxt/nuxt/commit/df7177bff))
- Add middleware to layers guide ([6fc25ff79](https://github.com/nuxt/nuxt/commit/6fc25ff79))
- Use `app/` directory in layer guide ([eee55ea41](https://github.com/nuxt/nuxt/commit/eee55ea41))
- Add documentation for `--nightly` command ([#32907](https://github.com/nuxt/nuxt/pull/32907))
- Update package information in roadmap section ([#32881](https://github.com/nuxt/nuxt/pull/32881))
- Add more info about nuxt spa loader element attributes ([#32871](https://github.com/nuxt/nuxt/pull/32871))
- Update `features.inlineStyles` default value ([6ff3fbebb](https://github.com/nuxt/nuxt/commit/6ff3fbebb))
- Correct filename in example ([#33000](https://github.com/nuxt/nuxt/pull/33000))
- Add more information about using `useRoute` and accessing route in middleware ([#33004](https://github.com/nuxt/nuxt/pull/33004))
- Avoid variable shadowing in locale example ([#33031](https://github.com/nuxt/nuxt/pull/33031))
- Add documentation for module lifecycle hooks ([#33115](https://github.com/nuxt/nuxt/pull/33115))
### 🏡 Chore
- **config:** Migrate renovate config ([#32861](https://github.com/nuxt/nuxt/pull/32861))
- Remove stray test file ([ca84285cc](https://github.com/nuxt/nuxt/commit/ca84285cc))
- Ignore webpagetest.org when scanning links ([6c974f0be](https://github.com/nuxt/nuxt/commit/6c974f0be))
- Add `type: 'module'` in playground ([#33099](https://github.com/nuxt/nuxt/pull/33099))
### ✅ Tests
- Add failing test for link component duplication ([#32792](https://github.com/nuxt/nuxt/pull/32792))
- Simplify module hook tests ([#32950](https://github.com/nuxt/nuxt/pull/32950))
- Refactor stubbing of `import.meta.dev` ([#33023](https://github.com/nuxt/nuxt/pull/33023))
- Use `findWorkspaceDir` rather than relative paths to repo root ([a6dec5bd9](https://github.com/nuxt/nuxt/commit/a6dec5bd9))
- Improve router test for global transitions ([5d783662c](https://github.com/nuxt/nuxt/commit/5d783662c))
- Use `expect.poll` ([53fb61d5d](https://github.com/nuxt/nuxt/commit/53fb61d5d))
- Use `expect.poll` instead of `expectWithPolling` ([357492ca7](https://github.com/nuxt/nuxt/commit/357492ca7))
- Use `vi.waitUntil` instead of custom retry logic ([611e66a47](https://github.com/nuxt/nuxt/commit/611e66a47))
### 🤖 CI
- Remove double set of tests for docs prs ([6bc9dccf4](https://github.com/nuxt/nuxt/commit/6bc9dccf4))
- Add workflow for discord team discussion threads ([bc656a24d](https://github.com/nuxt/nuxt/commit/bc656a24d))
- Fix some syntax issues with discord + github integrations ([f5f01b8c1](https://github.com/nuxt/nuxt/commit/f5f01b8c1))
- Use token for adding issue to project ([66afbe0a2](https://github.com/nuxt/nuxt/commit/66afbe0a2))
- Use discord bot to create thread automatically ([618a3cd40](https://github.com/nuxt/nuxt/commit/618a3cd40))
- Only use discord bot ([bfd30d8ce](https://github.com/nuxt/nuxt/commit/bfd30d8ce))
- Update format of discord message ([eb79a2f07](https://github.com/nuxt/nuxt/commit/eb79a2f07))
- Try bolding entire line ([c66124d7b](https://github.com/nuxt/nuxt/commit/c66124d7b))
- Oops ([38644b933](https://github.com/nuxt/nuxt/commit/38644b933))
- Add delay after adding each reaction ([ecb49019f](https://github.com/nuxt/nuxt/commit/ecb49019f))
- Use last lts node version for testing ([e06e37d02](https://github.com/nuxt/nuxt/commit/e06e37d02))
- Try npm trusted publisher ([85f1e05eb](https://github.com/nuxt/nuxt/commit/85f1e05eb))
- Use npm trusted publisher for main releases ([abf5d9e9f](https://github.com/nuxt/nuxt/commit/abf5d9e9f))
- Change wording ([#32979](https://github.com/nuxt/nuxt/pull/32979))
- Add github ai moderator ([#33077](https://github.com/nuxt/nuxt/pull/33077))

### ❤️ Contributors
- Daniel Roe (@danielroe)
- abeer0 (@iiio2)
- Julien Huang (@huang-julien)
- kyumoon (@kyumoon)
- Alexander Lichter (@TheAlexLichter)
- Bobbie Goede (@BobbieGoede)
- Rich Harris (@Rich-Harris)
- mustafa60x (@mustafa60x)
- Matej Černý (@cernymatej)
- Alex Liu (@Mini-ghost)
- Amitav Chris Mostafa (@semibroiled)
- Romain Hamel (@romhml)
- Jacky Lam (@jackylamhk)
- Mukund Shah (@mukundshah)
- Luke Nelson (@luc122c)
- letianpailove (@letianpailove)
- Erwan Jugand (@erwanjugand)
- Alexander (@TheColorman)
- Ryota Watanabe (@wattanx)
- Yizack Rangel (@Yizack)

---

### v4.2.0
*Released: 10/25/2025*

> 4.2.0 is the next minor release.

## 👀 Highlights

We're excited to announce Nuxt 4.2, bringing new capabilities for better TypeScript DX, enhanced error handling, and improved control over data fetching! 🎉

### 🎯 Abort Control for Data Fetching

You can now use `AbortController` signals directly within `useAsyncData`, giving you fine-grained control over request cancellation ([#32531](https://github.com/nuxt/nuxt/pull/32531)).

This works by passing an internal signal to your `useAsyncData` `handler` to cancel any promise that can be canceled, such as `$fetch`.

```vue
<script setup lang="ts">
const controller = new AbortController()

const { data, error, clear, refresh } = await useAsyncData('users', (_nuxtApp, { signal }) => $fetch('/api/users', {
  signal
}))

refresh() // will actually cancel the $fetch request (if dedupe: cancel)
refresh() // will actually cancel the $fetch request (if dedupe: cancel)
refresh()
  
clear() // will cancel the latest pending handler
</script>
```

You also pass an `AbortController` signal directly to `refresh`/`execute`, giving you fine-grained control over request cancellation. This is particularly useful when you need to abort requests based on user actions or component lifecycle events.

```ts
const { data, refresh } = await useAsyncData('posts', fetchPosts)

// Abort an ongoing refresh
const abortController = new AbortController()
refresh({ signal: abortController.signal })

// Later...
abortController.abort()
```

### 🎨 Better Error Pages in Development

When an error occurs during development, Nuxt will now display both your custom error page _and_ a detailed technical error overlay ([#33359](https://github.com/nuxt/nuxt/pull/33359)). This gives you the best of both worlds &ndash; you can see what your users will experience while also having immediate access to stack traces and debugging information.

![Screenshot of the new development error page](https://github.com/user-attachments/assets/397d0a52-3f59-4923-91de-c9dfcb5fa624)

The technical overlay appears as a toggleable panel that doesn't interfere with your custom error page, making it easier to debug issues while maintaining a realistic preview of your error handling.

### 🔮 Opt-in Vite Environment API

For those wanting to experiment with cutting-edge features, you can now opt into the [Vite Environment API](https://vite.dev/guide/api-environment) ([#33492](https://github.com/nuxt/nuxt/pull/33492)).

The Vite Environment API is a major architectural improvement in Vite 6. It closes the gap between development and production by allowing the Vite dev server to handle multiple environments concurrently (rather than requiring multiple Vite dev servers, as we have done previously in Nuxt).

This should improve performance when developing and eliminate some edge case bugs.

... and it is the foundation for implementing Nitro as a Vite environment, which should speed up the dev server still further, as well as allowing more greater alignment in development with your Nitro preset.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  experimental: {
    viteEnvironmentApi: true
  }
})
```

This is also the first breaking change for Nuxt v5. You can opt in to these breaking changes by setting `compatibilityVersion` to `5`:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 5
  },
})
```

Please only use this for testing, as this opts in to unlimited future breaking changes, including updating to Nitro v3 once we ship the Nuxt integration.

> [!WARNING]
> This is highly experimental and the API may change. Only enable if you're prepared for potential breaking changes and want to help shape the future of Nuxt!

### 📦 New `@nuxt/nitro-server` Package

We've extracted Nitro server integration into its own package: `@nuxt/nitro-server` ([#33462](https://github.com/nuxt/nuxt/pull/33462)). This architectural change allows for different Nitro integration patterns and paves the way for future innovations in server-side rendering.

While this change is mostly internal, it's part of our ongoing effort to make Nuxt more modular and flexible. The new package provides standalone Nitro integration and sets the foundation for alternative integration approaches (such as using Nitro as a Vite plugin in Nuxt v5+).

> [!NOTE]
> This is an internal refactor &ndash; no changes should be required in your code.

### ⚡ Performance Improvements

We've also shipped several performance enhancements:

- **Precomputed renderer dependencies** &ndash; We now compute renderer dependencies at build time rather than runtime, improving cold start and initial render performance ([#33361](https://github.com/nuxt/nuxt/pull/33361))
- **Reduced dependencies** &ndash; Removed unnecessary dependencies from kit and schema packages ([7ae2cf563](https://github.com/nuxt/nuxt/commit/7ae2cf563))

#### 📉 Async Data Handler Extraction

One of the most exciting performance improvements is the new experimental async data handler extraction ([#33131](https://github.com/nuxt/nuxt/pull/33131)). When enabled, handler functions passed to `useAsyncData` and `useLazyAsyncData` are automatically extracted into separate chunks and dynamically imported.

This is **particularly effective for prerendered static sites**, as the data fetching logic is only needed at build time and can be completely excluded from the client bundle.

> [!NOTE]
> In testing with a previous version of nuxt.com, this feature **reduced JavaScript bundle size by 39%**! Of course, your mileage may vary depending on how much data fetching logic you have.

```vue [pages/blog/[slug\\].vue]
<script setup lang="ts">
// This handler will be extracted into a separate chunk
// and only loaded when needed
const { data: post } = await useAsyncData('post', async () => {
  const content = await queryContent(`/blog/${route.params.slug}`).findOne()
  
  // Complex data processing that you don't want in the client bundle
  const processed = await processMarkdown(content)
  const related = await findRelatedPosts(content.tags)
  
  return {
    ...processed,
    related
  }
})
</script>
```

For static/prerendered sites, enable it in your config:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  experimental: {
    extractAsyncDataHandlers: true
  }
})
```

The extracted handlers are then tree-shaken from your client bundle when prerendering, as the data is already available in the payload. This results in significantly smaller JavaScript files shipped to your users.

### 🔧 Experimental TypeScript Plugin Support

We're introducing experimental support for enhanced TypeScript developer experience through the [`@dxup/nuxt`](https://github.com/KazariEX/dxup) module.

This module adds a number of TypeScript plugins that aim to improve your experience when using Nuxt-specific features:

- **Smart component renaming**: Automatically updates all references when you rename auto-imported component files
- **Go to definition for dynamic imports**: Navigate directly to files when using glob patterns like `import(\`~/assets/${name}.webp\`)`
- **Nitro route navigation**: Jump to server route handlers from data fetching functions (`$fetch`, `useFetch`, `useLazyFetch`)
- **Runtime config navigation**: Go to definition works seamlessly with runtime config properties
- **Enhanced auto-import support**: Includes the [`@dxup/unimport`](https://github.com/KazariEX/dxup/tree/main/packages/unimport) plugin for better navigation with auto-imported composables and utilities

> [!NOTE]
> Read more in **[the documentation](https://nuxt.com/docs/guide/directory-structure/nuxt-config#typescript-plugin)**.

To enable this feature, set `experimental.typescriptPlugin` to `true` in your Nuxt configuration:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  experimental: {
    typescriptPlugin: true
  }
})
```

Once enabled, the module will be automatically installed and configured by Nuxt.

> [!IMPORTANT]
> This feature also requires selecting the workspace TypeScript version in VS Code. Run the "TypeScript: Select TypeScript Version" command and choose "Use Workspace Version".

### 🎁 Other Improvements

- **Component `declarationPath`** &ndash; You can now specify a custom declaration path for components ([#33419](https://github.com/nuxt/nuxt/pull/33419))
- **Module resolution extensions** &ndash; Kit's `resolveModule` now accepts an `extensions` option ([#33328](https://github.com/nuxt/nuxt/pull/33328))
- **Global head utility** &ndash; New `setGlobalHead` utility in kit for easier head management ([#33512](https://github.com/nuxt/nuxt/pull/33512))

### 🩹 Important Fixes

- Route hash is now preserved when redirecting based on `routeRules` ([#33222](https://github.com/nuxt/nuxt/pull/33222))
- Fixed concurrent calls to `loadNuxtConfig` with proper cleanup ([#33420](https://github.com/nuxt/nuxt/pull/33420))
- Object-format `href` now works correctly in `<NuxtLink>` ([c69e4c30d](https://github.com/nuxt/nuxt/commit/c69e4c30d))
- Component auto-imports now work as arguments to Vue's `h()` function ([#33509](https://github.com/nuxt/nuxt/pull/33509))
- Fixed app config array handling during HMR ([#33555](https://github.com/nuxt/nuxt/pull/33555))

### ✅ Upgrading

Our recommendation for upgrading is to run:

```sh
npx nuxt upgrade --dedupe
```

This will refresh your lockfile and pull in all the latest dependencies that Nuxt relies on, especially from the unjs ecosystem.

## 👉 Changelog

[compare changes](https://github.com/nuxt/nuxt/compare/v4.1.3...v4.2.0)
### 🚀 Enhancements
- **nuxt:** Allow specifying component `declarationPath` ([#33419](https://github.com/nuxt/nuxt/pull/33419))
- **kit:** Add `extensions` option for `resolveModule` ([#33328](https://github.com/nuxt/nuxt/pull/33328))
- **nuxt:** Add abortController option to `useAsyncData` ([#32531](https://github.com/nuxt/nuxt/pull/32531))
- **nuxt:** Display youch error page w/ user error page in dev ([#33359](https://github.com/nuxt/nuxt/pull/33359))
- **nuxt:** Experimental typescript plugin support ([#33314](https://github.com/nuxt/nuxt/pull/33314))
- **nuxt,schema:** Extract asyncData handlers to chunks ([#33131](https://github.com/nuxt/nuxt/pull/33131))
- **schema:** Enable setting `future.compatibilityVersion` to `5` ([22f4693a1](https://github.com/nuxt/nuxt/commit/22f4693a1))
- **kit,vite:** Allow enabling vite environment api ([#33492](https://github.com/nuxt/nuxt/pull/33492))
- **kit:** Add `setGlobalHead` utility ([#33512](https://github.com/nuxt/nuxt/pull/33512))
### 🔥 Performance
- **nuxt:** Precompute renderer dependencies at build time ([#33361](https://github.com/nuxt/nuxt/pull/33361))
- **kit,schema:** Remove some unnecessary dependencies ([7ae2cf563](https://github.com/nuxt/nuxt/commit/7ae2cf563))
### 🩹 Fixes
- **nuxt:** Preserve hash with redirecting based on `routeRules` ([#33222](https://github.com/nuxt/nuxt/pull/33222))
- **kit:** Safely cleanup `loadNuxtConfig` in concurrent calls ([#33420](https://github.com/nuxt/nuxt/pull/33420))
- **nuxt:** Allow object-format `href` in `<NuxtLink>` ([c69e4c30d](https://github.com/nuxt/nuxt/commit/c69e4c30d))
- **nuxt:** Remove `mergeModels` from auto imports ([#33344](https://github.com/nuxt/nuxt/pull/33344))
- **nuxt:** Add back `shortPath` property ([#33384](https://github.com/nuxt/nuxt/pull/33384))
- **nuxt:** Do not allow native attrs to shadow nuxt link props ([4751a6aca](https://github.com/nuxt/nuxt/commit/4751a6aca))
- **nuxt:** Remove `declarationPath` from component dirs ([191bcb7e9](https://github.com/nuxt/nuxt/commit/191bcb7e9))
- **nuxt:** Preserve root route in `isPrerendered` check ([#33476](https://github.com/nuxt/nuxt/pull/33476))
- **nuxt:** Exempt webpack vfs from pkg lookup ([285eac31c](https://github.com/nuxt/nuxt/commit/285eac31c))
- **nitro:** Exempt nightly release from import protections ([dd522394a](https://github.com/nuxt/nuxt/commit/dd522394a))
- **webpack,rspack:** Preserve prerender + nitro flags in server builds ([#33503](https://github.com/nuxt/nuxt/pull/33503))
- **nuxt:** Support component auto-imports as arguments of `h()` ([#33509](https://github.com/nuxt/nuxt/pull/33509))
- **vite:** Prevent assignment for rolldown's replacement plugin ([#33526](https://github.com/nuxt/nuxt/pull/33526))
- **nuxt:** Use sha256 hash for prerender cache keys ([#33505](https://github.com/nuxt/nuxt/pull/33505))
- **nuxt:** Add `NuxtTime` relative time `numeric` prop ([#33552](https://github.com/nuxt/nuxt/pull/33552))
- **nuxt:** Add `NuxtTime` relative time `relativeStyle` prop ([#33557](https://github.com/nuxt/nuxt/pull/33557))
- **nuxt:** Handle arrays in app config correctly during HMR ([#33555](https://github.com/nuxt/nuxt/pull/33555))
- **vite:** Unset `optimizeDeps.include` for server environment ([#33550](https://github.com/nuxt/nuxt/pull/33550))
### 💅 Refactors
- Remove obsolete `shortPath` property ([#33384](https://github.com/nuxt/nuxt/pull/33384))
- **kit:** Extract trace utilities ([9687505ac](https://github.com/nuxt/nuxt/commit/9687505ac))
- **nuxt,vite,webpack:** Allow builders to augment types ([#33427](https://github.com/nuxt/nuxt/pull/33427))
- **schema:** Deprecate `extend`, `extendConfig`, and `configResolved` hooks ([e060b9695](https://github.com/nuxt/nuxt/commit/e060b9695))
- **vite:** Make vite plugins environment-compatible ([#33445](https://github.com/nuxt/nuxt/pull/33445))
- **nitro,nuxt:** Extract `@nuxt/nitro-server` package ([#33462](https://github.com/nuxt/nuxt/pull/33462))
- **nuxt:** Use `RouteLocationNormalizedLoadedGeneric` internally ([b51cb3067](https://github.com/nuxt/nuxt/commit/b51cb3067))
### 📖 Documentation
- Update link to localisation issue ([d32859da2](https://github.com/nuxt/nuxt/commit/d32859da2))
- Add nuxt module `addServerPlugin` note ([#33409](https://github.com/nuxt/nuxt/pull/33409))
- Remove deprecated node version ([#33411](https://github.com/nuxt/nuxt/pull/33411))
- Update `declarationPath` in `addComponent` ([#33380](https://github.com/nuxt/nuxt/pull/33380))
- Reproduction links for Nuxt v4 ([#33429](https://github.com/nuxt/nuxt/pull/33429))
- Add some notes/deprecations for vite hooks ([31c5f26a2](https://github.com/nuxt/nuxt/commit/31c5f26a2))
- Fix incorrect ESM module field info ([#33451](https://github.com/nuxt/nuxt/pull/33451))
- Recommend `getLayerDirectories()` instead of `nuxt.options._layers` ([#33484](https://github.com/nuxt/nuxt/pull/33484))
- Add `4.x` prefix ([5c0bb9285](https://github.com/nuxt/nuxt/commit/5c0bb9285))
- Add docs for `moduleDependencies` ([#33499](https://github.com/nuxt/nuxt/pull/33499))
- Clarify extends removal in TypeScript config migration ([#33523](https://github.com/nuxt/nuxt/pull/33523))
- Pin codemod to v0.18.7 for migration recipe ([#33522](https://github.com/nuxt/nuxt/pull/33522))
- Fix links ([#33554](https://github.com/nuxt/nuxt/pull/33554))
### 🏡 Chore
- Migrate gitpod to ona ([#33159](https://github.com/nuxt/nuxt/pull/33159))
- Use native node to run `test:prepare` ([6ef632b82](https://github.com/nuxt/nuxt/commit/6ef632b82))
- Do not use native node to run `test:prepare` ([eca36cfe5](https://github.com/nuxt/nuxt/commit/eca36cfe5))
- Lint docs ([3b9784111](https://github.com/nuxt/nuxt/commit/3b9784111))
- Update valid semantic scopes ([3c38d1f8b](https://github.com/nuxt/nuxt/commit/3c38d1f8b))
- Ignore nitro templates ([27cf85bdc](https://github.com/nuxt/nuxt/commit/27cf85bdc))
- Update internal links ([aac763017](https://github.com/nuxt/nuxt/commit/aac763017))
- Remove `vue-demi` from `ignoredBuiltDependencies` ([#33494](https://github.com/nuxt/nuxt/pull/33494))
- Update vscode url ([#33360](https://github.com/nuxt/nuxt/pull/33360))
- Correct jsdoc location for function used as parameters ([#33507](https://github.com/nuxt/nuxt/pull/33507))
- Remove code comment ([#33515](https://github.com/nuxt/nuxt/pull/33515))
- Patch changelogen for large numbers of commits ([bd36738b8](https://github.com/nuxt/nuxt/commit/bd36738b8))
- Link Nuxt 1.x and 2.x (2016–2022) history to main ([85838dfd9](https://github.com/nuxt/nuxt/commit/85838dfd9))
- Filter out commits before last tag when constructing changelog ([1c561daeb](https://github.com/nuxt/nuxt/commit/1c561daeb))
- Also respect since date for bump type ([08900f610](https://github.com/nuxt/nuxt/commit/08900f610))
- Also respect `since` in nightly releases ([74ca73ca1](https://github.com/nuxt/nuxt/commit/74ca73ca1))
- Ignore `@rollup/plugin-commonjs` ([cd12980ce](https://github.com/nuxt/nuxt/commit/cd12980ce))
### ✅ Tests
- Refactor suite to use common matrix utils ([#33483](https://github.com/nuxt/nuxt/pull/33483))
### 🤖 CI
- Publish `@nuxt/nitro-server` on pkg-pr-new ([b7ccf17bf](https://github.com/nuxt/nuxt/commit/b7ccf17bf))
- Remove nitro-server publish until v4.2 is released ([904d4f6ec](https://github.com/nuxt/nuxt/commit/904d4f6ec))

### ❤️ Contributors
- 山吹色御守 (@KazariEX)
- Florian Heuberger (@Flo0806)
- Daniel Roe (@danielroe)
- Matej Černý (@cernymatej)
- Trung Dang (@NamesMT)
- 纸鹿/Zhilu (@L33Z22L11)
- Julien Huang (@huang-julien)
- Alexander Lichter (@TheAlexLichter)
- abeer0 (@iiio2)
- Max (@onmax)
- Daniel Slepov (@imslepov)
- Octavio Araiza (@8ctavio)
- Bobbie Goede (@BobbieGoede)
- DipakHalkude (@DipakHalkude)
- Aleksander Błaszkiewicz (@ablaszkiewicz)

---

## vitest Release Notes (3.2.4 → 4.0.15)

### v4.0.0
*Released: 10/22/2025*

Vitest 4.0 is out!

To stay updated, read our [blog post](https://vitest.dev/blog/vitest-4) and check the [migration guide](https://vitest.dev/guide/migration).

### &nbsp;&nbsp;&nbsp;🚨 Breaking Changes

- Remove `'basic'` reporter &nbsp;-&nbsp; by @AriPerkkio in https://github.com/vitest-dev/vitest/issues/7884 [<samp>(82fcf)</samp>](https://github.com/vitest-dev/vitest/commit/82fcf5d53)
- Simplify default exclude pattern &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/6287 [<samp>(14c50)</samp>](https://github.com/vitest-dev/vitest/commit/14c507200)
- Remove deprecated getSourceMap &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8194 [<samp>(ff934)</samp>](https://github.com/vitest-dev/vitest/commit/ff93444f8)
- Replace deprecated ErrorWithDiff with TestError &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8195 [<samp>(da59e)</samp>](https://github.com/vitest-dev/vitest/commit/da59eb887)
- Remove UserConfig type in favor of ViteUserConfig &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8196 [<samp>(22f7f)</samp>](https://github.com/vitest-dev/vitest/commit/22f7f2db5)
- Remove deprecated coverage options in favor of `vitest/node` exports &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8197 [<samp>(dc848)</samp>](https://github.com/vitest-dev/vitest/commit/dc8486d22)
- Remove deprecated internal helpers and environment exports &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8198 [<samp>(4703c)</samp>](https://github.com/vitest-dev/vitest/commit/4703cf850)
- Remove deprecated typecheck and runner types &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8199 [<samp>(89a1c)</samp>](https://github.com/vitest-dev/vitest/commit/89a1cb626)
- Remove Node types from the main entry point, use `vitest/node` instead &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8200 [<samp>(1e60c)</samp>](https://github.com/vitest-dev/vitest/commit/1e60c4f44)
- Remove support for Vite 5 &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8202 [<samp>(cb8b0)</samp>](https://github.com/vitest-dev/vitest/commit/cb8b03bac)
- Remove deprecated types &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8203 [<samp>(66bee)</samp>](https://github.com/vitest-dev/vitest/commit/66bee836f)
- Remove deprecated environmentMatchGlobs and poolMatchGlobs &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8205 [<samp>(be11d)</samp>](https://github.com/vitest-dev/vitest/commit/be11d374c)
- Remove deprecated `workspace` option in favor of `projects` &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8218 [<samp>(76fb7)</samp>](https://github.com/vitest-dev/vitest/commit/76fb75d42)
- Ignore `--standalone` when CLI filename filter is used &nbsp;-&nbsp; by @AriPerkkio in https://github.com/vitest-dev/vitest/issues/8262 [<samp>(013bf)</samp>](https://github.com/vitest-dev/vitest/commit/013bf2cb2)
- Use module-runner instead of vite-node &nbsp;-&nbsp; by @sheremet-va and @AriPerkkio in https://github.com/vitest-dev/vitest/issues/8208 [<samp>(9be01)</samp>](https://github.com/vitest-dev/vitest/commit/9be01ba59)
- Rewrite spying implementation to make module mocking more intuitive &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8363 [<samp>(9e412)</samp>](https://github.com/vitest-dev/vitest/commit/9e412de35)
- Remove deprecated APIs &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8428 [<samp>(a1cb9)</samp>](https://github.com/vitest-dev/vitest/commit/a1cb9719a)
- Remove `minWorkers` and set it automatically to 0 in non watch mode &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8454 [<samp>(2c2d1)</samp>](https://github.com/vitest-dev/vitest/commit/2c2d1d4ce)
- Verbose reporter prints tests in a list, introduce `tree` reporter &nbsp;-&nbsp; by @sheremet-va and @AriPerkkio in https://github.com/vitest-dev/vitest/issues/8500 [<samp>(25fd3)</samp>](https://github.com/vitest-dev/vitest/commit/25fd32bf0)
- Include shadow root contents in pretty-format output &nbsp;-&nbsp; by @wkillerud in https://github.com/vitest-dev/vitest/issues/8545 [<samp>(9e722)</samp>](https://github.com/vitest-dev/vitest/commit/9e722834a)
- Remove deprecated order from test() API &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8594 [<samp>(4d419)</samp>](https://github.com/vitest-dev/vitest/commit/4d41928c6)
- Rewrite pools without `tinypool` &nbsp;-&nbsp; by @AriPerkkio and @sheremet-va in https://github.com/vitest-dev/vitest/issues/8705 [<samp>(4822d)</samp>](https://github.com/vitest-dev/vitest/commit/4822d047a)
- **browser**: Require a provider factory instead of a string &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8445 [<samp>(606cb)</samp>](https://github.com/vitest-dev/vitest/commit/606cb9e3e)
- **expect**: Pass current equality testers to asymmetric matcher &nbsp;-&nbsp; by @hi-ogawa in https://github.com/vitest-dev/vitest/issues/6825 [<samp>(965ce)</samp>](https://github.com/vitest-dev/vitest/commit/965cefc19)
- **projects**: Allow only files that have "vitest.config" or "vite.config" in the name &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8542 [<samp>(304bc)</samp>](https://github.com/vitest-dev/vitest/commit/304bc20f0)
- **reporter**: Remove deprecated APIs &nbsp;-&nbsp; by @AriPerkkio and @sheremet-va in https://github.com/vitest-dev/vitest/issues/8223 [<samp>(149f8)</samp>](https://github.com/vitest-dev/vitest/commit/149f8e509)
- **runner**: Set mode to `todo` if no function is passed down to `test` or `describe` &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8346 [<samp>(1a81c)</samp>](https://github.com/vitest-dev/vitest/commit/1a81c21d2)
- **snapshot**: Fail test with obsolete snapshot on CI &nbsp;-&nbsp; by @hi-ogawa in https://github.com/vitest-dev/vitest/issues/7963 [<samp>(4d84f)</samp>](https://github.com/vitest-dev/vitest/commit/4d84f0ac6)
- **spy**: Support spying on classes &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/6160 [<samp>(abc0d)</samp>](https://github.com/vitest-dev/vitest/commit/abc0d8273)

### &nbsp;&nbsp;&nbsp;🚀 Features

- Provide entity to onConsoleLog &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8159 [<samp>(437d4)</samp>](https://github.com/vitest-dev/vitest/commit/437d461aa)
- Add `onUnhandledError` callback &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8162 [<samp>(924cb)</samp>](https://github.com/vitest-dev/vitest/commit/924cb6961)
- Add spy option to vi.mockObject &nbsp;-&nbsp; by @rChaoz in https://github.com/vitest-dev/vitest/issues/8285 [<samp>(81d76)</samp>](https://github.com/vitest-dev/vitest/commit/81d7601e4)
- Don't use vite-node in coverage packages &nbsp;-&nbsp; by @sheremet-va [<samp>(ffdb4)</samp>](https://github.com/vitest-dev/vitest/commit/ffdb4d5fd)
- Clickable dashboard numbers &nbsp;-&nbsp; by @shairez in https://github.com/vitest-dev/vitest/issues/7406 [<samp>(2344c)</samp>](https://github.com/vitest-dev/vitest/commit/2344c1f6e)
- Display test "path" when filtering &nbsp;-&nbsp; by @userquin in https://github.com/vitest-dev/vitest/issues/8547 [<samp>(2e491)</samp>](https://github.com/vitest-dev/vitest/commit/2e4918954)
- Introduce separate packages for browser mode providers &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8629 [<samp>(0dc93)</samp>](https://github.com/vitest-dev/vitest/commit/0dc93ea98)
- Add hooks with type-safe extra context to TestAPI &nbsp;-&nbsp; by @ysfaran in https://github.com/vitest-dev/vitest/issues/8623 [<samp>(6b21c)</samp>](https://github.com/vitest-dev/vitest/commit/6b21cfe55)
- Support `expect.assert` for type narrowing &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8695 [<samp>(fe589)</samp>](https://github.com/vitest-dev/vitest/commit/fe5895d2b)
- Add `displayAnnotations` option to `github-options` &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8706 [<samp>(4a66d)</samp>](https://github.com/vitest-dev/vitest/commit/4a66df625)
- Add schema validation matchers &nbsp;-&nbsp; by @zirkelc in https://github.com/vitest-dev/vitest/issues/8527 [<samp>(c0b25)</samp>](https://github.com/vitest-dev/vitest/commit/c0b250e5c)
- Add a way to dump transformed content &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8711 [<samp>(931c0)</samp>](https://github.com/vitest-dev/vitest/commit/931c0ee63)
- **api**:
  - Expose `experimental_parseSpecifications` &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8408 [<samp>(fdeb2)</samp>](https://github.com/vitest-dev/vitest/commit/fdeb2f482)
  - Expose Vitest watcher &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8413 [<samp>(aaa6e)</samp>](https://github.com/vitest-dev/vitest/commit/aaa6e6512)
  - Add `enableCoverage` and `disableCoverage` methods &nbsp;-&nbsp; by @sheremet-va and @AriPerkkio in https://github.com/vitest-dev/vitest/issues/8412 [<samp>(61eb7)</samp>](https://github.com/vitest-dev/vitest/commit/61eb7dd9c)
  - Add `getGlobalTestNamePattern` method &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8438 [<samp>(bdb70)</samp>](https://github.com/vitest-dev/vitest/commit/bdb7067f1)
  - Add `relativeModuleId` to `TestModule` &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8505 [<samp>(3be09)</samp>](https://github.com/vitest-dev/vitest/commit/3be0986aa)
  - Add `getSeed` method &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8592 [<samp>(438c4)</samp>](https://github.com/vitest-dev/vitest/commit/438c44e7f)
- **browser**:
  - Support `toBeInViewport` utility method to assert element is in viewport or not &nbsp;-&nbsp; by @Shinyaigeek in https://github.com/vitest-dev/vitest/issues/8234 [<samp>(ceed5)</samp>](https://github.com/vitest-dev/vitest/commit/ceed5b622)
  - Add qwik to the `vitest init` cli command &nbsp;-&nbsp; by @thejackshelton in https://github.com/vitest-dev/vitest/issues/8330 [<samp>(1638b)</samp>](https://github.com/vitest-dev/vitest/commit/1638b44e8)
  - Introduce `toMatchScreenshot` for Visual Regression Testing &nbsp;-&nbsp; by @macarie in https://github.com/vitest-dev/vitest/issues/8041 [<samp>(d45f9)</samp>](https://github.com/vitest-dev/vitest/commit/d45f964c1)
  - Add `trackUnhandledErrors` option &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8386 [<samp>(c0ec0)</samp>](https://github.com/vitest-dev/vitest/commit/c0ec08a90)
  - Support iframe locator with playwright provider &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8016 [<samp>(57b2c)</samp>](https://github.com/vitest-dev/vitest/commit/57b2cca2e)
  - Add `length` property to locators, `toHaveLength` now accepts locators &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8512 [<samp>(2308c)</samp>](https://github.com/vitest-dev/vitest/commit/2308cbf13)
  - Support playwright tracing &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8584 [<samp>(1aac5)</samp>](https://github.com/vitest-dev/vitest/commit/1aac59cd2)
  - Expose `options` on `BrowserProviderOption` &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8609 [<samp>(0d0e5)</samp>](https://github.com/vitest-dev/vitest/commit/0d0e5cdf6)
  - Support `--inspect` option in webdriverio &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8613 [<samp>(38adc)</samp>](https://github.com/vitest-dev/vitest/commit/38adc86cf)
  - Support custom screenshot comparison algorithms &nbsp;-&nbsp; by @macarie in https://github.com/vitest-dev/vitest/issues/8687 [<samp>(e63b1)</samp>](https://github.com/vitest-dev/vitest/commit/e63b17efc)
- **coverage**:
  - `autoUpdate` to support percentage formatting &nbsp;-&nbsp; by @Battjmo and @AriPerkkio in https://github.com/vitest-dev/vitest/issues/8456 [<samp>(99e01)</samp>](https://github.com/vitest-dev/vitest/commit/99e016bec)
- **expect**:
  - Support `toBeNullable` expect function to check provided value is nullish &nbsp;-&nbsp; by @Shinyaigeek and @sheremet-va in https://github.com/vitest-dev/vitest/issues/8294 [<samp>(eeec5)</samp>](https://github.com/vitest-dev/vitest/commit/eeec501de)
- **mocker**:
  - Add `automocker` entry &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8301 [<samp>(e9c92)</samp>](https://github.com/vitest-dev/vitest/commit/e9c928252)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- Allow overriding globals in types &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8215 [<samp>(2248b)</samp>](https://github.com/vitest-dev/vitest/commit/2248b06d4)
- Remove unused dependencies &nbsp;-&nbsp; by @AriPerkkio in https://github.com/vitest-dev/vitest/issues/8184 [<samp>(feadc)</samp>](https://github.com/vitest-dev/vitest/commit/feadc60af)
- Distribute test files to shards more evenly &nbsp;-&nbsp; by @Shinyaigeek and @AriPerkkio in https://github.com/vitest-dev/vitest/issues/8288 [<samp>(7b489)</samp>](https://github.com/vitest-dev/vitest/commit/7b489959a)
- Use suite's timeout when `test.extend` &nbsp;-&nbsp; by @AriPerkkio in https://github.com/vitest-dev/vitest/issues/8278 [<samp>(43977)</samp>](https://github.com/vitest-dev/vitest/commit/43977c2b8)
- Support snapshot with no object key sorting &nbsp;-&nbsp; by @hi-ogawa and @sheremet-va in https://github.com/vitest-dev/vitest/issues/8136 [<samp>(e85e3)</samp>](https://github.com/vitest-dev/vitest/commit/e85e396f0)
- Annotation location always points to the test file &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8315 [<samp>(88071)</samp>](https://github.com/vitest-dev/vitest/commit/88071a8f2)
- Add `--changed` flag support to `vitest list` command &nbsp;-&nbsp; by @haakonjackfloat in https://github.com/vitest-dev/vitest/issues/8270 and https://github.com/vitest-dev/vitest/issues/8272 [<samp>(e71a5)</samp>](https://github.com/vitest-dev/vitest/commit/e71a5d0ec)
- Prevent rpc timeout on slow thread blocking synchronous methods &nbsp;-&nbsp; by @AriPerkkio and @sheremet-va in https://github.com/vitest-dev/vitest/issues/8297 [<samp>(bea87)</samp>](https://github.com/vitest-dev/vitest/commit/bea874610)
- Forbid setting environment to `browser` &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8334 [<samp>(0417a)</samp>](https://github.com/vitest-dev/vitest/commit/0417a2c1a)
- Invalidate modules in all module graphs when the file is changed &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8352 [<samp>(94ab3)</samp>](https://github.com/vitest-dev/vitest/commit/94ab392b3)
- Screenshot masks with Playwright provider &nbsp;-&nbsp; by @macarie in https://github.com/vitest-dev/vitest/issues/8357 [<samp>(459ef)</samp>](https://github.com/vitest-dev/vitest/commit/459efba6b)
- Configure `oxc` instead of `esbuild` on `rolldown-vite` &nbsp;-&nbsp; by @hi-ogawa in https://github.com/vitest-dev/vitest/issues/8378 [<samp>(e922e)</samp>](https://github.com/vitest-dev/vitest/commit/e922e9266)
- Make sure test errors always have `stacks` property in Node.js context &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8392 [<samp>(b825e)</samp>](https://github.com/vitest-dev/vitest/commit/b825ef87c)
- Support `import.meta.resolve` on Vite 7 &nbsp;-&nbsp; by @hi-ogawa in https://github.com/vitest-dev/vitest/issues/8493 [<samp>(549d3)</samp>](https://github.com/vitest-dev/vitest/commit/549d321e2)
- Show the assertion error first when `expect.poll` assertion fails &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8483 [<samp>(fb450)</samp>](https://github.com/vitest-dev/vitest/commit/fb4500bec)
- Override fake timers when `useFakeTimers` is called multiple times &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8504 [<samp>(ed7e3)</samp>](https://github.com/vitest-dev/vitest/commit/ed7e3ad5d)
- Custom expect messages for `expect.extend` matchers &nbsp;-&nbsp; by @lzl0304 in https://github.com/vitest-dev/vitest/issues/8520 [<samp>(96945)</samp>](https://github.com/vitest-dev/vitest/commit/969456b4a)
- Process sourcemaps for stack traces from `globalSetup` files &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8534 [<samp>(8978a)</samp>](https://github.com/vitest-dev/vitest/commit/8978a23b7)
- Resolve performance issue when throwing errors with stackTraceLimit = 0 &nbsp;-&nbsp; by @Copilot, **sheremet-va** and @AriPerkkio in https://github.com/vitest-dev/vitest/issues/8531 [<samp>(6d5b5)</samp>](https://github.com/vitest-dev/vitest/commit/6d5b5b1a5)
- Avoid recursively applying `$` and `%` formatting to `test.for/each` title &nbsp;-&nbsp; by @hi-ogawa in https://github.com/vitest-dev/vitest/issues/8557 [<samp>(ea6d7)</samp>](https://github.com/vitest-dev/vitest/commit/ea6d7322e)
- Replace wildcard exports `"./*"` with specific files in vitest package &nbsp;-&nbsp; by @hi-ogawa in https://github.com/vitest-dev/vitest/issues/8560 [<samp>(ce746)</samp>](https://github.com/vitest-dev/vitest/commit/ce7466408)
- Don't publish unused d.ts files &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8562 [<samp>(42dfd)</samp>](https://github.com/vitest-dev/vitest/commit/42dfd1c43)
- Remove loupe dependencies from `optimizeDeps.include` for browser mode &nbsp;-&nbsp; by @jake-danton in https://github.com/vitest-dev/vitest/issues/8570 [<samp>(cdcf7)</samp>](https://github.com/vitest-dev/vitest/commit/cdcf7e854)
- Update `engines` field to drop Node 18 support &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8608 [<samp>(9a0bf)</samp>](https://github.com/vitest-dev/vitest/commit/9a0bf2254)
- Correctly inherit test options on extended tests &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8618 [<samp>(15c09)</samp>](https://github.com/vitest-dev/vitest/commit/15c091a99)
- Update @types/node peer deps &nbsp;-&nbsp; by @sheremet-va [<samp>(ee6b2)</samp>](https://github.com/vitest-dev/vitest/commit/ee6b27b5f)
- Re-export CDP Session directly from playwright &nbsp;-&nbsp; by @mrginglymus in https://github.com/vitest-dev/vitest/issues/8702 [<samp>(9553a)</samp>](https://github.com/vitest-dev/vitest/commit/9553ab923)
- Disable trackUnhandledErrors if inspector is enabled &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8732 [<samp>(acac7)</samp>](https://github.com/vitest-dev/vitest/commit/acac7104d)
- `base` option doesn't crash vitest &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8760 [<samp>(9f0ec)</samp>](https://github.com/vitest-dev/vitest/commit/9f0ecccb8)
- **browser**:
  - Run in-source tests only when the file itsels is a test file &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8204 [<samp>(bdd2e)</samp>](https://github.com/vitest-dev/vitest/commit/bdd2e01c3)
  - `locator.element()` returns `HTMLElement` or `SVGElement` &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8440 [<samp>(c1ac1)</samp>](https://github.com/vitest-dev/vitest/commit/c1ac15c6b)
  - Don't import from `vite` directly &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8541 [<samp>(d7fca)</samp>](https://github.com/vitest-dev/vitest/commit/d7fca0389)
  - Update expect.element type to match the implementation &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8597 [<samp>(b2804)</samp>](https://github.com/vitest-dev/vitest/commit/b2804a1f9)
  - Throw an error if iframe is not accessible anymore &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8601 [<samp>(6acdc)</samp>](https://github.com/vitest-dev/vitest/commit/6acdc3a5e)
  - Stop creating unnecessary directories when taking screenshots &nbsp;-&nbsp; by @macarie in https://github.com/vitest-dev/vitest/issues/8605 [<samp>(b1c8f)</samp>](https://github.com/vitest-dev/vitest/commit/b1c8fdbe9)
  - Always define commands &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8626 [<samp>(acbe0)</samp>](https://github.com/vitest-dev/vitest/commit/acbe0e973)
  - Exclude deprecated context import from optimization &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8658 [<samp>(a96ea)</samp>](https://github.com/vitest-dev/vitest/commit/a96ea140e)
  - Allow importing BrowserCommand if no browser package is installed &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8666 [<samp>(95c36)</samp>](https://github.com/vitest-dev/vitest/commit/95c367f5e)
  - Define an export for browser/utils &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8678 [<samp>(529ab)</samp>](https://github.com/vitest-dev/vitest/commit/529ab46ac)
  - Allow service workers to mock the network in chromium without breaking vi.mock &nbsp;-&nbsp; by @Georgegriff and @sheremet-va in https://github.com/vitest-dev/vitest/issues/8668 [<samp>(87108)</samp>](https://github.com/vitest-dev/vitest/commit/87108db33)
  - Support sync `not.toBeInTheDocument()` &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8751 [<samp>(f5d06)</samp>](https://github.com/vitest-dev/vitest/commit/f5d06434f)
- **core**:
  - Fix `objectContaining` expect utility to have more compatibility to jest's one &nbsp;-&nbsp; by @Shinyaigeek in https://github.com/vitest-dev/vitest/issues/8241 [<samp>(480be)</samp>](https://github.com/vitest-dev/vitest/commit/480be1a78)
- **coverage**:
  - Include files based on `--project` filter &nbsp;-&nbsp; by @gtbuchanan in https://github.com/vitest-dev/vitest/issues/7885 [<samp>(761be)</samp>](https://github.com/vitest-dev/vitest/commit/761beeeea)
  - Prevent encoding filenames of uncovered files &nbsp;-&nbsp; by @AriPerkkio in https://github.com/vitest-dev/vitest/issues/8239 [<samp>(8a998)</samp>](https://github.com/vitest-dev/vitest/commit/8a9988043)
  - Handle query param based transforms correctly &nbsp;-&nbsp; by @AriPerkkio in https://github.com/vitest-dev/vitest/issues/8418 [<samp>(a400a)</samp>](https://github.com/vitest-dev/vitest/commit/a400a9d2a)
  - Enforce order of `vitest:coverage-transform` plugin &nbsp;-&nbsp; by @AriPerkkio in https://github.com/vitest-dev/vitest/issues/8477 [<samp>(ff517)</samp>](https://github.com/vitest-dev/vitest/commit/ff5170cff)
  - V8 to ignore Vite's generated cjs import helpers &nbsp;-&nbsp; by @mrginglymus and @AriPerkkio in https://github.com/vitest-dev/vitest/issues/8718 [<samp>(35816)</samp>](https://github.com/vitest-dev/vitest/commit/35816fe8d)
  - Keep only strings in `coverage.exclude` &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8731 [<samp>(c9c30)</samp>](https://github.com/vitest-dev/vitest/commit/c9c303178)
- **deps**:
  - Update all non-major dependencies &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8235 [<samp>(a1e57)</samp>](https://github.com/vitest-dev/vitest/commit/a1e576ae0)
  - Update all non-major dependencies &nbsp;-&nbsp; in https://github.com/vitest-dev/vitest/issues/8328 [<samp>(aa79e)</samp>](https://github.com/vitest-dev/vitest/commit/aa79e2733)
  - Update all non-major dependencies &nbsp;-&nbsp; in https://github.com/vitest-dev/vitest/issues/8348 [<samp>(13f94)</samp>](https://github.com/vitest-dev/vitest/commit/13f946229)
  - Update all non-major dependencies &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8382 [<samp>(704eb)</samp>](https://github.com/vitest-dev/vitest/commit/704eba24b)
  - Update all non-major dependencies &nbsp;-&nbsp; in https://github.com/vitest-dev/vitest/issues/8550 [<samp>(048f7)</samp>](https://github.com/vitest-dev/vitest/commit/048f7a1ca)
- **jsdom**:
  - Override globals that Fetch API relies on &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8390 [<samp>(05b41)</samp>](https://github.com/vitest-dev/vitest/commit/05b4178e8)
  - Support AbortSignal API &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8704 [<samp>(f6690)</samp>](https://github.com/vitest-dev/vitest/commit/f6690ed46)
- **mocker**:
  - Fix `regexpHoistable` to allow whitespace before parentheses &nbsp;-&nbsp; by @cszhjh in https://github.com/vitest-dev/vitest/issues/8231 [<samp>(a0f9a)</samp>](https://github.com/vitest-dev/vitest/commit/a0f9ae3f0)
- **module-runner**:
  - Resolve `resolvedSources` correctly &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8736 [<samp>(8fc52)</samp>](https://github.com/vitest-dev/vitest/commit/8fc52974f)
  - Support getBuiltins &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8746 [<samp>(87bb8)</samp>](https://github.com/vitest-dev/vitest/commit/87bb8f49c)
- **pool**:
  - Properly reuse the vm pool &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8758 [<samp>(08498)</samp>](https://github.com/vitest-dev/vitest/commit/08498f0e9)
- **reporter**:
  - Invisible CLI menus when `vitest --standalone` &nbsp;-&nbsp; by @AriPerkkio in https://github.com/vitest-dev/vitest/issues/8248 [<samp>(37cc2)</samp>](https://github.com/vitest-dev/vitest/commit/37cc26994)
- **rolldown-vite**:
  - Properly disable minifier in the browser client &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8306 [<samp>(f55bb)</samp>](https://github.com/vitest-dev/vitest/commit/f55bb81e6)
- **runner**:
  - Don't bundle runner with utils &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8496 [<samp>(2b4b0)</samp>](https://github.com/vitest-dev/vitest/commit/2b4b05823)
- **spy**:
  - Fix spyOn types with optional method &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8499 [<samp>(d3afa)</samp>](https://github.com/vitest-dev/vitest/commit/d3afa601a)
  - Can respy on an exported method &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8521 [<samp>(bf450)</samp>](https://github.com/vitest-dev/vitest/commit/bf450b433)
  - Don't fail when spying on static getters &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8589 [<samp>(ac1d9)</samp>](https://github.com/vitest-dev/vitest/commit/ac1d92f14)
- **types**:
  - Ensure Chai declaration merge works with TS-Go &nbsp;-&nbsp; by @LukeAbby in https://github.com/vitest-dev/vitest/issues/8188 [<samp>(5261d)</samp>](https://github.com/vitest-dev/vitest/commit/5261df0b9)
  - Allow returning a promise from defineConfig &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8651 [<samp>(c3474)</samp>](https://github.com/vitest-dev/vitest/commit/c347487e6)
- **ui**:
  - Keep the same tab open when clicking on different tests &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8599 [<samp>(3e535)</samp>](https://github.com/vitest-dev/vitest/commit/3e535f78b)
- **utils**:
  - Remove ast export &nbsp;-&nbsp; by @bluwy in https://github.com/vitest-dev/vitest/issues/8435 [<samp>(21622)</samp>](https://github.com/vitest-dev/vitest/commit/21622b5ae)
- **vitest**:
  - Override `config.include` option with `config.browser.instances[].include` option if it is specified &nbsp;-&nbsp; by @Shinyaigeek in https://github.com/vitest-dev/vitest/issues/8260 [<samp>(010fc)</samp>](https://github.com/vitest-dev/vitest/commit/010fc55b5)
- **watch**:
  - Filename filter runs duplicate tests in workspaces &nbsp;-&nbsp; by @AriPerkkio in https://github.com/vitest-dev/vitest/issues/8250 [<samp>(932d8)</samp>](https://github.com/vitest-dev/vitest/commit/932d837c6)
- **wdio**:
  - Wait for the driver to be properly closed &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8305 [<samp>(c16ab)</samp>](https://github.com/vitest-dev/vitest/commit/c16abe71e)
  - Properly construct the shadow root selector if there are multiple elements &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8354 [<samp>(28765)</samp>](https://github.com/vitest-dev/vitest/commit/28765b4bb)

### &nbsp;&nbsp;&nbsp;🏎 Performance

- Avoid spawning extra workers if no tests will run there &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8446 [<samp>(3fb3e)</samp>](https://github.com/vitest-dev/vitest/commit/3fb3e8036)
- Don't set `process.title` &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8453 [<samp>(0a766)</samp>](https://github.com/vitest-dev/vitest/commit/0a7666323)
- Remove chai as a direct dependency, keep it in `@vitest/expect` &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8461 [<samp>(cc98c)</samp>](https://github.com/vitest-dev/vitest/commit/cc98c611f)
- Reduce the amount of dynamic imports &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8465 [<samp>(db6cd)</samp>](https://github.com/vitest-dev/vitest/commit/db6cd73ba)
- Use ES2022 language features &nbsp;-&nbsp; by @TrevorBurnham in https://github.com/vitest-dev/vitest/issues/8492 [<samp>(bb34c)</samp>](https://github.com/vitest-dev/vitest/commit/bb34c64dc)
- Delay populating node-globals &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8506 [<samp>(41cbc)</samp>](https://github.com/vitest-dev/vitest/commit/41cbc5328)
- Get `workerId` from a global object &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8507 [<samp>(46b13)</samp>](https://github.com/vitest-dev/vitest/commit/46b13f669)
- Replace startsWith with strict equality &nbsp;-&nbsp; by @btea in https://github.com/vitest-dev/vitest/issues/8546 [<samp>(c42e6)</samp>](https://github.com/vitest-dev/vitest/commit/c42e64e62)
- Reduce the number of unused imports &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8508 [<samp>(9a79b)</samp>](https://github.com/vitest-dev/vitest/commit/9a79b90c9)
- Use experimental `meta.resolve` flag instead of a custom loader &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8567 [<samp>(2e063)</samp>](https://github.com/vitest-dev/vitest/commit/2e0630b76)
- Create only one fetcher per project &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8762 [<samp>(8e15b)</samp>](https://github.com/vitest-dev/vitest/commit/8e15bc8f9)
- **pool**: Resolve all environments first &nbsp;-&nbsp; by @sheremet-va in https://github.com/vitest-dev/vitest/issues/8759 [<samp>(d3ef4)</samp>](https://github.com/vitest-dev/vitest/commit/d3ef4f29c)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/vitest-dev/vitest/compare/v3.2.4...v4.0.0)

---

## vue-tsc Release Notes (2.2.10 → 3.1.8)

### v3.0.0
*Released: 7/1/2025*

> [!IMPORTANT]  
> **Deprecation Notice:** Dropping Vue 2 and vue-class-component Support in **v3.1**: #5455

> [!TIP]  
> Language Server Upgrade guide for non-vscode editors: #5456

## Stability Improvements

- **Hybrid Mode Always On**: Now always enabled to make the system simpler and more reliable. (PR: #5248)
- **Better Connection**: Improved how Vue talks to TypeScript server, making it more stable. (PR: #5252, #5395, #5443)
- **Version Matching**: Vue language server now requires specific Volar versions to work the same in all editors. (PR: #5345)
- **Fixed Startup Issue**: Solved problems when both TypeScript and Vue extensions start together. (PR: #5260)

## UX & DX Improvements

### Navigation & Tooling
- Global components now jump to their source files rather than type definitions. (PR: #5221)
- Added support for TypeScript's `sortImports` and `removeUnusedImports` commands. (PR: #5444)
- Implemented template refs document linking. (PR: #5385)

### Localization Support
- VSCode extension added multilingual support for:
  - Chinese (Simplified/Traditional)
  - Russian
  - Japanese

(PR: #5330, #5340, #5404)

### Streamlined UI
- v3 does not have any status bar items
![Group 1 (2)](https://github.com/user-attachments/assets/7328ed67-73f2-4aa0-8092-06211c8ad5d2)

## Compiler Options Updates

New TSConfig options:
- `strictSlotChildren`: Strict type constraints of slot children. (PR: #5137)
- `strictVModel`:  Strict type constraints of `v-model`. (PR: #5229)
- `strictCssModules`: Strict type checking of CSS modules. (PR: #5164)
- `resolveStyleImports`: Specifies whether to generate type imports for external CSS files by `<style src=\"...\">` or `@import \"...\"`. (PR: #5136)

## Renamed Settings

Some settings have new names:
- `vue.complete.casing.props` → `vue.suggest.propNameCasing`  
- `vue.complete.casing.tags` → `vue.suggest.componentNameCasing`  
- `vue.complete.defineAssignment` → `vue.suggest.defineAssignment`

## Details

Please refer to [CHANGELOG.md](https://github.com/vuejs/language-tools/blob/master/CHANGELOG.md) for details.

Thanks to @johnsoncodehk, @KazariEX, @alex-snezhko, @PurplePlanen, @zyoshoka, @Dylancyclone, @tomblachut, @brc-dd, @zhiyuanzmj, @Akryum, @so1ve, @kshksdrt, @marktlinn, @lukashass, @menuRivera, @RayGuo-ergou!

## ❤️ Thanks to Our Sponsors

<p align="center">This project is made possible thanks to our generous sponsors:</p>

<table>
  <tbody>
    <tr>
      <td align="center" valign="middle" colspan="6">
        <b>Special Sponsor</b>
      </td>
    </tr>
    <tr>
      <td align="center" valign="middle" colspan="6">
        <br>
        <a href="https://voidzero.dev/">
          <img src="https://raw.githubusercontent.com/johnsoncodehk/sponsors/master/logos/VoidZero.svg" height="60" />
        </a>
        <h3>Next Generation Tooling</h3>
      </td>
    </tr>
    <tr>
      <td align="center" valign="middle" colspan="6">
        <b>Platinum Sponsors</b>
      </td>
    </tr>
    <tr>
      <td align="center" valign="middle" width="50%"  colspan="3">
        <a href="https://vuejs.org/">
          <img src="https://raw.githubusercontent.com/johnsoncodehk/sponsors/master/logos/Vue.svg" height="80" />
        </a>
        <p>An approachable, performant and versatile framework for building web user interfaces.</p>
      </td>
      <td align="center" valign="middle" width="50%" colspan="6">
        <a href="https://stackblitz.com/">
          <img src="https://raw.githubusercontent.com/johnsoncodehk/sponsors/master/logos/StackBlitz.svg" width="240" />
        </a>
        <p>Stay in the flow with instant dev experiences.<br>No more hours stashing/pulling/installing locally</p>
        <p><b> — just click, and start coding.</b></p>
      </td>
    </tr>
    <tr>
      <td align="center" valign="middle" colspan="6">
        <b>Gold Sponsors</b>
      </td>
    </tr>
    <tr>
      <td align="center" valign="middle" colspan="6">
        <a href="https://www.jetbrains.com/">
          <img src="https://raw.githubusercontent.com/johnsoncodehk/sponsors/master/logos/JetBrains.svg" width="80" />
        </a>
      </td>
    </tr>
    <tr>
      <td align="center" valign="middle" colspan="6">
        <b>Silver Sponsors</b>
      </td>
    </tr>
    <tr>
      <td align="center" valign="middle" width="33.3%" colspan="2">
      </td>
      <td align="center" valign="middle" width="33.3%" colspan="2">
        <a href="https://www.prefect.io/"><img src="https://raw.githubusercontent.com/johnsoncodehk/sponsors/master/logos/Prefect.svg" width="200" /></a>
      </td>
      <td align="center" valign="middle" width="33.3%" colspan="2">
      </td>
    </tr>
  </tbody>
</table>

<p align="center">
	<a href="https://github.com/sponsors/johnsoncodehk" target="_blank">Become a sponsor</a> to support Vue
	tooling development
</p>

---

### v3.1.0
*Released: 9/28/2025*

> [!IMPORTANT]  
> Vue 2 and `vue-class-component` support has been removed, please refer to <a href="https://github.com/vuejs/language-tools/discussions/5455" target="_blank">Discussion #5455</a> for detail.

### Performance

- perf(language-core): drop internal component (#5532) - Thanks to @KazariEX!

### Other Changes

- refactor: drop Vue 2 support (#5636) - Thanks to @KazariEX!
- chore(lint): enforce use of type-only imports (#5658) - Thanks to @so1ve!
- ci: upgrade node version (#5668) - Thanks to @so1ve!
- refactor(typescript-plugin): move reactivity analysis logic to a seperate typescript plugin (#5672) - Thanks to @KazariEX!

> Also, thanks to the motivating launch of Vue ECharts v8!

## ❤️ Thanks to Our Sponsors

<p align="center">This project is made possible thanks to our generous sponsors:</p>

<table>
  <tbody>
    <tr>
      <td align="center" valign="middle" colspan="6">
        <b>Special Sponsor</b>
      </td>
    </tr>
    <tr>
      <td align="center" valign="middle" colspan="6">
        <br>
        <a href="https://voidzero.dev/">
          <img src="https://raw.githubusercontent.com/johnsoncodehk/sponsors/master/logos/VoidZero.svg" height="60" />
        </a>
        <h3>Next Generation Tooling</h3>
      </td>
    </tr>
    <tr>
      <td align="center" valign="middle" colspan="6">
        <b>Platinum Sponsors</b>
      </td>
    </tr>
    <tr>
      <td align="center" valign="middle" width="50%"  colspan="3">
        <a href="https://vuejs.org/">
          <img src="https://raw.githubusercontent.com/johnsoncodehk/sponsors/master/logos/Vue.svg" height="80" />
        </a>
        <p>An approachable, performant and versatile framework for building web user interfaces.</p>
      </td>
      <td align="center" valign="middle" width="50%" colspan="6">
        <a href="https://stackblitz.com/">
          <img src="https://raw.githubusercontent.com/johnsoncodehk/sponsors/master/logos/StackBlitz.svg" width="240" />
        </a>
        <p>Stay in the flow with instant dev experiences.<br>No more hours stashing/pulling/installing locally</p>
        <p><b> — just click, and start coding.</b></p>
      </td>
    </tr>
    <tr>
      <td align="center" valign="middle" colspan="6">
        <b>Gold Sponsors</b>
      </td>
    </tr>
    <tr>
      <td align="center" valign="middle" colspan="6">
        <a href="https://www.jetbrains.com/">
          <img src="https://raw.githubusercontent.com/johnsoncodehk/sponsors/master/logos/JetBrains.svg" width="80" />
        </a>
      </td>
    </tr>
    <tr>
      <td align="center" valign="middle" colspan="6">
        <b>Silver Sponsors</b>
      </td>
    </tr>
    <tr>
      <td align="center" valign="middle" width="33.3%" colspan="2">
      </td>
      <td align="center" valign="middle" width="33.3%" colspan="2">
        <a href="https://www.prefect.io/"><img src="https://raw.githubusercontent.com/johnsoncodehk/sponsors/master/logos/Prefect.svg" width="200" /></a>
      </td>
      <td align="center" valign="middle" width="33.3%" colspan="2">
      </td>
    </tr>
  </tbody>
</table>

<p align="center">
	<a href="https://github.com/sponsors/johnsoncodehk" target="_blank">Become a sponsor</a> to support Vue
	tooling development
</p>

---

## @lttr/nuxt-config-eslint Release Notes (0.3.0 → 0.4.0)

### v0.4.0
*Released: 11/3/2025*

[compare changes](https://github.com/lttr/nuxt-config-eslint/compare/v0.3.0...v0.4.0)

### 🚀 Enhancements

- ⚠️  Update all dependencies to latest versions ([2b296ba](https://github.com/lttr/nuxt-config-eslint/commit/2b296ba))

### 🏡 Chore

- Update pnpm version ([c0ef96b](https://github.com/lttr/nuxt-config-eslint/commit/c0ef96b))

#### ⚠️ Breaking Changes

- ⚠️  Update all dependencies to latest versions ([2b296ba](https://github.com/lttr/nuxt-config-eslint/commit/2b296ba))

### ❤️ Contributors

- Lukas Trumm <lukas.trumm@gmail.com>

---

## @lttr/puleo Release Notes (0.5.0 → 0.8.1)

### v0.6.0
*Released: 9/11/2025*

[compare changes](https://github.com/lttr/puleo/compare/v0.5.0...v0.6.0)

### 🚀 Enhancements

- Split rootSelector config into useWhere and rootSelector ([c4c76f2](https://github.com/lttr/puleo/commit/c4c76f2))
- ⚠️  Update all dependencies ([101356a](https://github.com/lttr/puleo/commit/101356a))
- Let PostCSS plugin know about :where config ([cbf67bf](https://github.com/lttr/puleo/commit/cbf67bf))

### 🩹 Fixes

- Convert CSS files to JavaScript generators with proper quote handling ([99fd37f](https://github.com/lttr/puleo/commit/99fd37f))

### 💅 Refactors

- Convert brand.css to JavaScript generator ([c66900a](https://github.com/lttr/puleo/commit/c66900a))
- Add CSS template literal utility with dedent ([0cc95db](https://github.com/lttr/puleo/commit/0cc95db))
- Simplify where functions and eliminate duplication ([fb58d9f](https://github.com/lttr/puleo/commit/fb58d9f))
- Extract build functions into separate modules ([00e8b9d](https://github.com/lttr/puleo/commit/00e8b9d))
- Use configurable where option from defaultConfig ([5e7de56](https://github.com/lttr/puleo/commit/5e7de56))

### 📖 Documentation

- Add CLAUDE.md with project guidance and update button styles ([0c9f1f9](https://github.com/lttr/puleo/commit/0c9f1f9))

### 🏡 Chore

- Update node version ([e168842](https://github.com/lttr/puleo/commit/e168842))
- Update pnpm version ([77dae18](https://github.com/lttr/puleo/commit/77dae18))
- Apply eslint:fix and prettier ([15c2252](https://github.com/lttr/puleo/commit/15c2252))
- Add verify script and improve format script ([7f6ecd7](https://github.com/lttr/puleo/commit/7f6ecd7))
- Verify before release ([d7812d3](https://github.com/lttr/puleo/commit/d7812d3))
- Clean unused vars ([4af8718](https://github.com/lttr/puleo/commit/4af8718))

#### ⚠️ Breaking Changes

- ⚠️  Update all dependencies ([101356a](https://github.com/lttr/puleo/commit/101356a))

### ❤️ Contributors

- Lukas Trumm <lukas.trumm@gmail.com>

---

### v0.6.1
*Released: 9/11/2025*

[compare changes](https://github.com/lttr/puleo/compare/v0.6.0...v0.6.1)

### 🚀 Enhancements

- Support alternative output with :host selector ([03811de](https://github.com/lttr/puleo/commit/03811de))

### ❤️ Contributors

- Lukas Trumm <lukas.trumm@gmail.com>

---

### v0.6.2
*Released: 9/13/2025*

[compare changes](https://github.com/lttr/puleo/compare/v0.6.1...v0.6.2)

### 🚀 Enhancements

- Make class prefix configurable ([324837f](https://github.com/lttr/puleo/commit/324837f))

### 🩹 Fixes

- Separate :host variant files to prevent selector conflicts ([1197caf](https://github.com/lttr/puleo/commit/1197caf))

### 📦 Build

- Update host variant scripts to use separate index file ([6923d4a](https://github.com/lttr/puleo/commit/6923d4a))

### ❤️ Contributors

- Lukas Trumm <lukas.trumm@gmail.com>

---

### v0.7.0
*Released: 9/26/2025*

[compare changes](https://github.com/lttr/puleo/compare/v0.6.2...v0.7.0)

### 🚀 Enhancements

- ⚠️  Consolidate :host selector support to single CSS output ([9b045ed](https://github.com/lttr/puleo/commit/9b045ed))

### 💅 Refactors

- Replace defu with object spread and fix CSS generation ([cfd25f3](https://github.com/lttr/puleo/commit/cfd25f3))
- Use array for rootSelector ([c98ebf1](https://github.com/lttr/puleo/commit/c98ebf1))

### 🏡 Chore

- Update Node.js and package manager versions ([2188aba](https://github.com/lttr/puleo/commit/2188aba))

#### ⚠️ Breaking Changes

- ⚠️  Consolidate :host selector support to single CSS output ([9b045ed](https://github.com/lttr/puleo/commit/9b045ed))

### ❤️ Contributors

- Lukas Trumm <lukas.trumm@gmail.com>

---

### v0.8.0
*Released: 9/27/2025*

[compare changes](https://github.com/lttr/puleo/compare/v0.7.0...v0.8.0)

### 🚀 Enhancements

- ⚠️  Consolidate :root and :host selectors to hardcoded builds ([5457258](https://github.com/lttr/puleo/commit/5457258))

### 🩹 Fixes

- Remove duplicate selector in forms CSS ([ab76286](https://github.com/lttr/puleo/commit/ab76286))

### 🏡 Chore

- Add web component example page ([f1a4095](https://github.com/lttr/puleo/commit/f1a4095))
- Update changelog formatting and remove unused defu dependency ([7811805](https://github.com/lttr/puleo/commit/7811805))
- Add @eslint/js dependency ([4a0f9af](https://github.com/lttr/puleo/commit/4a0f9af))

#### ⚠️ Breaking Changes

- ⚠️  Consolidate :root and :host selectors to hardcoded builds ([5457258](https://github.com/lttr/puleo/commit/5457258))

### ❤️ Contributors

- Lukas Trumm <lukas.trumm@gmail.com>

---

## @nuxt/fonts Release Notes (0.11.1 → 0.12.1)

### v0.11.2
*Released: 4/24/2025*

## 👉 Changelog

[compare changes](https://github.com/nuxt/fonts/compare/v0.11.1...v0.11.2)

### 🩹 Fixes

- Deduplicate default weights, styles and subsets ([#604](https://github.com/nuxt/fonts/pull/604))

### 📖 Documentation

- Add config for use with UnoCSS Wind4 preset ([#589](https://github.com/nuxt/fonts/pull/589))
- Use tailwind v3 url ([#596](https://github.com/nuxt/fonts/pull/596))

### 🏡 Chore

- Add better-sqlite3 ([e52c330](https://github.com/nuxt/fonts/commit/e52c330))
- Remove release script ([2633ad8](https://github.com/nuxt/fonts/commit/2633ad8))
- Use `latest` specifier for nuxt/fonts within repo ([e6d716d](https://github.com/nuxt/fonts/commit/e6d716d))

### ✅ Tests

- Update poppins snapshots ([#605](https://github.com/nuxt/fonts/pull/605))

### 🤖 CI

- Run pkg.pr.new on prs too ([df3636f](https://github.com/nuxt/fonts/commit/df3636f))


### ❤️ Contributors
- Guillaume Chau (@Akryum)
- Daniel Roe (@danielroe)
- Ezra Ashenafi (@Eazash)
- Joe Paolicelli (@joepaolicelli)

---

### v0.11.3
*Released: 5/9/2025*

> 0.11.3 is the next patch release.
>
> **Timetable**: to be announced.











## 👉 Changelog

[compare changes](https://github.com/nuxt/fonts/compare/v0.11.2...v0.11.3)

### 🩹 Fixes

- Respect custom `baseURL` in devtools ([29cdb31](https://github.com/nuxt/fonts/commit/29cdb31))
- Handle duplicate preloaded fonts correctly ([3c3594c](https://github.com/nuxt/fonts/commit/3c3594c))
- Register font middleware for `storybook` module ([db5fbf1](https://github.com/nuxt/fonts/commit/db5fbf1))
- Only preload top priority fonts ([#617](https://github.com/nuxt/fonts/pull/617))

### 🏡 Chore

- **deps-dev:** Bump vite from 6.2.6 to 6.2.7 in the npm_and_yarn group across 1 directory ([#611](https://github.com/nuxt/fonts/pull/611))
- Unpin vite version ([83fe597](https://github.com/nuxt/fonts/commit/83fe597))
- Dedupe + upgrade vite ([9d78888](https://github.com/nuxt/fonts/commit/9d78888))


### ❤️ Contributors
- Daniel Roe (@danielroe)
- dependabot[bot] (@dependabot[bot])

---

### v0.11.4
*Released: 5/14/2025*

> 0.11.4 is a hotfix release to address a breaking change with variable fonts

## 👉 Changelog

[compare changes](https://github.com/nuxt/fonts/compare/v0.11.3...v0.11.4)

### 🩹 Fixes

- **deps:** Revert `unifont` upgrade ([76a8f0d](https://github.com/nuxt/fonts/commit/76a8f0d))


### ❤️ Contributors
- Daniel Roe (@danielroe)

---

### v0.12.0
*Released: 11/7/2025*

> 0.12.0 is the next major release.

## 👀 Highlights

There are a few breaking changes here, including major upgrades in unifont, fontaine + moving to a new fontless abstraction, setting default font weight, and more.

A visual check on upgrade is important - and let me know if you encounter any issues.

## 👉 Changelog

[compare changes](https://github.com/nuxt/fonts/compare/v0.11.4...v0.12.0)

### 🔥 Performance

- Implement plugin hook filter ([#683](https://github.com/nuxt/fonts/pull/683))
- Use code filter when `processCSSVariables` is disabled ([509adfd](https://github.com/nuxt/fonts/commit/509adfd))
- Initialise providers in parallel with nuxt setup ([#688](https://github.com/nuxt/fonts/pull/688))

### 🩹 Fixes

- **deps:** ⚠️  Upgrade `unifont` ([f0584d0](https://github.com/nuxt/fonts/commit/f0584d0))
- ⚠️  Set default font weight to `400 700` ([#658](https://github.com/nuxt/fonts/pull/658))

### 💅 Refactors

- Extract core utilities in preparation for `fontless` ([#627](https://github.com/nuxt/fonts/pull/627))
- Use new `fontless` package ([#645](https://github.com/nuxt/fonts/pull/645))
- Use `extendViteConfig` to set up devtools ([05212ff](https://github.com/nuxt/fonts/commit/05212ff))

### 📖 Documentation

- Add callout for variable font weight ([#635](https://github.com/nuxt/fonts/pull/635))
- Add Installation section ([#677](https://github.com/nuxt/fonts/pull/677))
- Refactor using docus ([#679](https://github.com/nuxt/fonts/pull/679))
- Add warning note about font-family in template ([78bbb42](https://github.com/nuxt/fonts/commit/78bbb42))
- Upgrade to docus v5 ([#697](https://github.com/nuxt/fonts/pull/697))

### 🏡 Chore

- Prefer `nuxt` over `nuxi` ([#643](https://github.com/nuxt/fonts/pull/643))
- Update tailwind separately ([4bbca61](https://github.com/nuxt/fonts/commit/4bbca61))
- Pin `@types/node` ([cbc4215](https://github.com/nuxt/fonts/commit/cbc4215))
- Prefer `nuxt` to `nuxi` ([68f0ea9](https://github.com/nuxt/fonts/commit/68f0ea9))
- Prefer nuxt over nuxi ([dea205c](https://github.com/nuxt/fonts/commit/dea205c))
- **deps-dev:** Bump vite from 7.1.9 to 7.1.11 in the npm_and_yarn group across 1 directory ([#710](https://github.com/nuxt/fonts/pull/710))

### ✅ Tests

- Allow for global font to be inlined in v4+ ([934c71c](https://github.com/nuxt/fonts/commit/934c71c))
- Inline global styles for test suite ([56d8f51](https://github.com/nuxt/fonts/commit/56d8f51))
- Add test for css variable processing ([#719](https://github.com/nuxt/fonts/pull/719))

### 🤖 CI

- Remove forced corepack installation ([6b1c7bf](https://github.com/nuxt/fonts/commit/6b1c7bf))
- Bump to lts node versions ([5a43a2d](https://github.com/nuxt/fonts/commit/5a43a2d))
- Do not fail fast in matrix ([ff92f48](https://github.com/nuxt/fonts/commit/ff92f48))
- Run tests on node 20 ([873beb4](https://github.com/nuxt/fonts/commit/873beb4))
- Use npm trusted publishing ([db9e7d7](https://github.com/nuxt/fonts/commit/db9e7d7))
- Always publish via pkg-pr-new ([6f07c42](https://github.com/nuxt/fonts/commit/6f07c42))
- Add provenance action to check for downgrades in provenance ([22dce94](https://github.com/nuxt/fonts/commit/22dce94))

#### ⚠️ Breaking Changes

- **deps:** ⚠️  Upgrade `unifont` ([f0584d0](https://github.com/nuxt/fonts/commit/f0584d0))
- ⚠️  Set default font weight to `400 700` ([#658](https://github.com/nuxt/fonts/pull/658))


### ❤️ Contributors
- Daniel Roe (@danielroe)
- Alexandru Teodor (@alexieremia)
- dependabot[bot] (@dependabot[bot])
- Baptiste Leproux (@larbish)
- Tom Tang (@qwerzl)
- Chad Adams (@cadamsdev)

---

### v0.12.1
*Released: 11/7/2025*

> 0.12.1 is the next patch release.

This is a rerelease of 0.12.0, which encountered an issue in the publishing process. See release notes for [v0.12.0](https://github.com/nuxt/fonts/releases/tag/v0.12.0).

## 👉 Changelog

[compare changes](https://github.com/nuxt/fonts/compare/v0.12.0...v0.12.1)

### 🏡 Chore

- Update workspace version for devtools ([#724](https://github.com/nuxt/fonts/pull/724))


### ❤️ Contributors
- Alexandru Teodor (@alexieremia)

---

## db0 Release Notes (0.3.2 → 0.3.4)

### v0.3.3
*Released: 10/1/2025*

[compare changes](https://github.com/unjs/db0/compare/v0.3.2...v0.3.3)

### 🚀 Enhancements

- Support `dispose` and `using createDatabase()` ([#178](https://github.com/unjs/db0/pull/178))
- Cloudflare hyperdrive ([#164](https://github.com/unjs/db0/pull/164))

### 💅 Refactors

- Strict types ([#179](https://github.com/unjs/db0/pull/179))

### 📖 Documentation

- Improve drizzle integration example with drizzle-kit usage ([#170](https://github.com/unjs/db0/pull/170))

### ❤️ Contributors

- Pooya Parsa (@pi0)
- Fayaz Ahmed (@fayazara)
- Rihan Arfan (@RihanArfan)

---

### v0.3.4
*Released: 10/1/2025*

[compare changes](https://github.com/unjs/db0/compare/v0.3.3...v0.3.4)

### 📦 Build

- Migrate to obuild ([8586320](https://github.com/unjs/db0/commit/8586320))

---

## drizzle-kit Release Notes (0.31.1 → 0.31.8)

### drizzle-kit@0.31.2
*Released: 6/23/2025*

### Bug fixes

- Fixed relations extraction to not interfere with Drizzle Studio.

---

### drizzle-kit@0.31.3
*Released: 6/26/2025*

- Internal changes to Studio context. Added `databaseName` and `packageName` properties for Studio

---

### drizzle-kit@0.31.4
*Released: 6/27/2025*

- Fixed `halfvec`, `bit` and `sparsevec` type generation bug in drizzle-kit

---

### drizzle-kit@0.31.5
*Released: 9/26/2025*

- Add casing support to studio configuration and related functions

---

### drizzle-kit@0.31.6
*Released: 10/28/2025*

### Bug fixes

- [[BUG]: Importing drizzle-kit/api fails in ESM modules](https://github.com/drizzle-team/drizzle-orm/issues/2853)

---

### drizzle-kit@0.31.7
*Released: 11/17/2025*

### Bug fixes

- [[BUG]: Drizzle Kit push to Postgres 18 produces unecessary DROP SQL when the schema was NOT changed](https://github.com/drizzle-team/drizzle-orm/issues/4944)

---

### drizzle-kit@0.31.8
*Released: 12/4/2025*

### Bug fixes

- Fixed `algorythm` => `algorithm` typo.
- Fixed external dependencies in build configuration.

---

## drizzle-orm Release Notes (0.43.1 → 0.45.1)

### 0.44.0
*Released: 5/28/2025*

## Error handling

Starting from this version, we’ve introduced a new `DrizzleQueryError` that wraps all errors from database drivers and provides a set of useful information:

1. A proper stack trace to identify which exact `Drizzle` query failed
2. The generated SQL string and its parameters
3. The original stack trace from the driver that caused the DrizzleQueryError

## Drizzle `cache` module

Drizzle sends every query straight to your database by default. There are no hidden actions, no automatic caching or invalidation - you’ll always see exactly what runs. If you want caching, you must opt in.

By default, Drizzle uses a explicit caching strategy (i.e. `global: false`), so nothing is ever cached unless you ask. This prevents surprises or hidden performance traps in your application. Alternatively, you can flip on all caching (global: true) so that every select will look in cache first.

Out first native integration was built together with Upstash team and let you natively use `upstash` as a cache for your drizzle queries

```ts
import { upstashCache } from "drizzle-orm/cache/upstash";
import { drizzle } from "drizzle-orm/...";

const db = drizzle(process.env.DB_URL!, {
  cache: upstashCache({
    // 👇 Redis credentials (optional — can also be pulled from env vars)
    url: '<UPSTASH_URL>',
    token: '<UPSTASH_TOKEN>',
    // 👇 Enable caching for all queries by default (optional)
    global: true,
    // 👇 Default cache behavior (optional)
    config: { ex: 60 }
  })
});
```

You can also implement your own cache, as Drizzle exposes all the necessary APIs, such as get, put, mutate, etc.
You can find full implementation details on the [website](https://orm.drizzle.team/docs/cache#custom-cache)

```ts
import Keyv from "keyv";
export class TestGlobalCache extends Cache {
  private globalTtl: number = 1000;
  // This object will be used to store which query keys were used
  // for a specific table, so we can later use it for invalidation.
  private usedTablesPerKey: Record<string, string[]> = {};
  constructor(private kv: Keyv = new Keyv()) {
    super();
  }
  // For the strategy, we have two options:
  // - 'explicit': The cache is used only when .$withCache() is added to a query.
  // - 'all': All queries are cached globally.
  // The default behavior is 'explicit'.
  override strategy(): "explicit" | "all" {
    return "all";
  }
  // This function accepts query and parameters that cached into key param,
  // allowing you to retrieve response values for this query from the cache.
  override async get(key: string): Promise<any[] | undefined> {
    ...
  }
  // This function accepts several options to define how cached data will be stored:
  // - 'key': A hashed query and parameters.
  // - 'response': An array of values returned by Drizzle from the database.
  // - 'tables': An array of tables involved in the select queries. This information is needed for cache invalidation.
  //
  // For example, if a query uses the "users" and "posts" tables, you can store this information. Later, when the app executes
  // any mutation statements on these tables, you can remove the corresponding key from the cache.
  // If you're okay with eventual consistency for your queries, you can skip this option.
  override async put(
    key: string,
    response: any,
    tables: string[],
    config?: CacheConfig,
  ): Promise<void> {
    ...
  }
  // This function is called when insert, update, or delete statements are executed.
  // You can either skip this step or invalidate queries that used the affected tables.
  //
  // The function receives an object with two keys:
  // - 'tags': Used for queries labeled with a specific tag, allowing you to invalidate by that tag.
  // - 'tables': The actual tables affected by the insert, update, or delete statements,
  //   helping you track which tables have changed since the last cache update.
  override async onMutate(params: {
    tags: string | string[];
    tables: string | string[] | Table<any> | Table<any>[];
  }): Promise<void> {
    ...
  }
}
```

For more usage example you can check our [docs](https://orm.drizzle.team/docs/cache#cache-usage-examples)

---

### 0.44.1
*Released: 5/30/2025*

- [[BUG]: Drizzle can no longer run on Durable Objects](https://github.com/drizzle-team/drizzle-orm/issues/4586)

---

### 0.44.2
*Released: 6/4/2025*

- [BUG]: Fixed type issues with joins with certain variations of `tsconfig`: [#4535](https://github.com/drizzle-team/drizzle-orm/issues/4535), [#4457](https://github.com/drizzle-team/drizzle-orm/issues/4457)

---

### 0.44.3
*Released: 7/14/2025*

- Fixed types of `$client` for clients created by drizzle function

```ts
await db.$client.[...]
```

- Added the `updated_at` column to the `neon_auth.users_sync` table definition.

---

### 0.44.4
*Released: 7/29/2025*

- Fix wrong DrizzleQueryError export. thanks @nathankleyn

---

### 0.44.5
*Released: 8/25/2025*

- Fixed invalid usage of `.one()` in `durable-sqlite` session
- Fixed spread operator related crash in sqlite `blob` columns
- Better browser support for sqlite `blob` columns 
- Improved sqlite `blob` mapping

---

### 0.44.6
*Released: 10/2/2025*

- feat: add $replicas reference #4874

---

### 0.44.7
*Released: 10/23/2025*

- fix durable sqlite transaction return value #3746 - thanks @joaocstro

---

### 0.45.0
*Released: 12/4/2025*

- Fixed pg-native Pool detection in node-postgres transactions  
- Allowed subqueries in select fields  
- Updated typo algorythm => algorithm  
- Fixed `$onUpdate` not handling `SQL` values (fixes [#2388](https://github.com/drizzle-team/drizzle-orm/issues/2388), tests implemented by [L-Mario564](https://github.com/L-Mario564) in [#2911](https://github.com/drizzle-team/drizzle-orm/pull/2911))
- Fixed `pg` mappers not handling `Date` instances in `bun-sql:postgresql` driver responses for `date`, `timestamp` types (fixes [#4493](https://github.com/drizzle-team/drizzle-orm/issues/4493))

---

### 0.45.1
*Released: 12/10/2025*

- Fixed pg-native Pool detection in node-postgres transactions breaking in environments with forbidden `require()` ([#5107](https://github.com/drizzle-team/drizzle-orm/issues/5107))

---

## unplugin-vue-router Release Notes (0.12.0 → 0.19.0)

### v0.13.0
*Released: 6/29/2025*

Please refer to [CHANGELOG.md](https://github.com/posva/unplugin-vue-router/blob/main/CHANGELOG.md) for details.

---

### v0.14.0
*Released: 6/29/2025*

Please refer to [CHANGELOG.md](https://github.com/posva/unplugin-vue-router/blob/main/CHANGELOG.md) for details.

---

### v0.15.0
*Released: 8/4/2025*

Please refer to [CHANGELOG.md](https://github.com/posva/unplugin-vue-router/blob/main/CHANGELOG.md) for details.

---

### v0.16.0
*Released: 10/14/2025*

Please refer to [CHANGELOG.md](https://github.com/posva/unplugin-vue-router/blob/main/CHANGELOG.md) for details.

---

### v0.16.1
*Released: 10/30/2025*

Please refer to [CHANGELOG.md](https://github.com/posva/unplugin-vue-router/blob/main/CHANGELOG.md) for details.

---

### v0.16.2
*Released: 11/14/2025*

Please refer to [CHANGELOG.md](https://github.com/posva/unplugin-vue-router/blob/main/CHANGELOG.md) for details.

---

### v0.17.0
*Released: 11/14/2025*

Please refer to [CHANGELOG.md](https://github.com/posva/unplugin-vue-router/blob/main/CHANGELOG.md) for details.

---

### v0.17.1
*Released: 11/21/2025*

Please refer to [CHANGELOG.md](https://github.com/posva/unplugin-vue-router/blob/main/CHANGELOG.md) for details.

---

### v0.17.2
*Released: 11/27/2025*

Please refer to [CHANGELOG.md](https://github.com/posva/unplugin-vue-router/blob/main/CHANGELOG.md) for details.

---

### v0.18.0
*Released: 11/28/2025*

Please refer to [CHANGELOG.md](https://github.com/posva/unplugin-vue-router/blob/main/CHANGELOG.md) for details.

---

### v0.19.0
*Released: 12/4/2025*

Please refer to [CHANGELOG.md](https://github.com/posva/unplugin-vue-router/blob/main/CHANGELOG.md) for details.

---

