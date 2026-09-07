# Brief for the Chandra & Co. app

Paste the block below as the first message of the new chat. Everything after it
is context for you, not for that chat.

---

## The prompt

> I want to build a mobile app for Chandra & Co., a New Delhi corporate gifting
> supplier. Smooth, and with a genuinely useful AI assistant in it.
>
> **All the content already exists** in another folder on this machine:
> `C:\Users\jinanshh\Desktop\Chandra & co Website`
> That is the company's live website (React + Vite, on Cloudflare Pages). Read
> its `README.md` first — it documents the whole thing.
>
> What is in there that the app needs:
>
> - `src/data/products.ts` — all 126 products: name, slug, category, SKU, type,
>   description, features, customisation options, minimum order
> - `src/data/categories.ts` — the 9 ranges
> - `src/data/content.ts` and `src/data/guides.ts` — the written copy and four
>   buying guides
> - `src/config/site.ts` — brand name, phone numbers, WhatsApp number, email,
>   address
> - `public/products/` — 252 product photographs (each product at 600px and
>   1200px, 4:5 portrait, 17 MB total)
> - `public/editorial/` — 26 hero and section photographs
>
> **Do not retype or re-photograph any of it.** Before writing app code, tell me
> how you plan to share that data and those images between the website and the
> app so that adding a product later means adding it in one place, not two.
>
> How the business works, so the app matches it: there is no cart and no
> pricing. Price depends on quantity and branding method, so every route ends in
> a WhatsApp conversation with the product and quantity pre-filled. Never
> describe the products as premium or the best — the site's rule is to talk
> about the customer's problem and their brand, never ours. And always make
> clear the catalogue is a part of what we stock, not all of it.
>
> The AI assistant should help a buyer choose — "I need 500 gifts for a dealer
> meet, budget around ₹200 each" should get real suggestions from the actual 126
> products, then hand off to WhatsApp. Tell me what that needs on the server
> side before you build it; I know the API key must not sit in the app.
>
> Start by reading the README and the data files, then come back with a plan.
> Do not write app code until we have agreed on it.

---

## Three things to know before that chat

### 1. The new folder will not see this one

Claude Code only reads the folder you open it in. The prompt gives the absolute
path, and the session will ask permission to read it — say yes. If it cannot,
the alternative is to copy `src/data/`, `src/config/site.ts` and
`public/products/` across, and then you own two copies of everything.

### 2. One copy of the data, or it will drift

This is the decision that matters most and the one to settle before any code is
written. 126 products and 252 images kept in two places stay identical for about
a month. Then a product is added on one side, a price rule changes on the other,
and the app shows a catalogue the website does not.

Best arrangement is one repository with the data and images shared:

```
data/       products, categories, content   ← website and app both read this
assets/     the product photographs         ← both
web/        the current site
app/        the new app
```

Ask the new chat to propose this before it starts building.

### 3. The API key cannot live in the app

Anything shipped inside a mobile app can be read out of it — an API key in the
bundle is a key anyone can extract and spend on your account. The assistant has
to call Claude through a small server you control, which holds the key and
forwards the request.

You are already on Cloudflare, so a Cloudflare Worker is the natural place:
the app calls your Worker, the Worker calls Claude, the key never leaves it.
That Worker is also where you would keep a rate limit, so one person cannot run
up a bill.

---

## Worth deciding: do you need a native app at all?

The website is now installable — it goes on the home screen, opens without
browser chrome, and works offline. That is already an app for most purposes, and
it is one codebase.

A native app is worth building when you specifically want:

- a listing on the Play Store and App Store, where people search for you
- push notifications
- something the web genuinely cannot do

It costs a separate codebase, a Google Play account (about ₹2,000 once) and an
Apple developer account (about $99 a year), plus review time on every update.

If what you want is the store listing, build it. If what you want is "an app on
the phone", you have one. Either way the brief above holds — the data and the
photographs are the asset, and they should only ever live in one place.
