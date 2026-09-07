# Brief for the Chandra & Co. app

Paste the block below as the first message of the new chat. Everything after it
is context for you, not for that chat.

---

## The prompt

> I want to build a **native mobile app** for Chandra & Co., a New Delhi
> corporate gifting supplier — going on the **Google Play Store and the Apple
> App Store**, with **push notifications**. Smooth, and with a genuinely useful
> AI assistant in it.
>
> This is decided; do not re-open it. The website is already an installable PWA,
> and this is being built for the store listing and for push, which the PWA
> cannot give us.
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
> Because it is going to both stores with push, tell me in the plan:
>
> - which framework, and why (I expect Expo unless you have a reason against it)
> - how push is sent — what server piece is needed, and what I have to register
>   with Google and Apple
> - what the two store accounts cost and what each review will want from me
> - whether a catalogue app risks rejection for being too thin, and what we put
>   in it so that it is not
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

## Decided: native, both stores, with push

The PWA stays as it is — it costs nothing to keep and it serves anyone who
finds the site on a phone. The native app is for the store listing and for
push, which is exactly what a PWA cannot do.

### What that adds, beyond writing the app

**Two accounts, and they are not instant.**

| | Cost | Note |
| --- | --- | --- |
| Google Play Console | about $25, once | Identity verification; allow a few days |
| Apple Developer Program | about $99 a year | Slower to approve, and it lapses if unpaid |

Verify both before planning a launch date — these are the current figures but
they are Apple's and Google's to change.

**Push needs a server, not just app code.** The app can receive a notification;
something has to send it. Expo's push service is the short path and it is free,
but either way there must be a place that holds the device tokens and triggers
the send. You already have a Cloudflare Worker in the plan for the AI
assistant's API key — the same Worker can do this, and then there is one server
piece rather than two.

Also worth settling early: **what a notification is actually for.** "New range
added" and "your quote is ready" are worth a push. Anything more frequent and
people turn them off, and a notification permission is only asked once.

**The real risk is Apple's review, not the code.** Apple rejects apps that are a
website in a wrapper — the guideline is 4.2, Minimum Functionality, and a plain
product catalogue is squarely the kind of thing it is aimed at. This is worth
planning for rather than discovering after the build.

What answers it is already in your plan, which is lucky: the AI assistant that
helps a buyer choose, the offline catalogue, and push. Those are native reasons
to exist. Say so in the review notes when you submit, and make sure the app
opens on something that is not simply the website's home page.

Ask the new chat to design for that from the start.
