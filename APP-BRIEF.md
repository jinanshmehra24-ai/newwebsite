# Brief for the Chandra & Co. app

The working copy of this lives in the app folder, at
`C:\Users\jinanshh\Desktop\Chandra & co App\APP-BRIEF.md`. Open a session
there and tell it to read that file. This copy is kept here so the brief stays
version-controlled alongside the catalogue it describes.

---

## The prompt

> I want to build a **native mobile app** for Chandra & Co., a New Delhi
> corporate gifting supplier — going on the **Google Play Store and the Apple
> App Store**, with **push notifications**. A proper app, not a wrapped website.
>
> This is decided; do not re-open it. The website is already an installable PWA,
> and this is being built for the store listing and for push, which the PWA
> cannot give us.
>
> **What the app is.** A browsable product catalogue with **prices**, a **cart**,
> and an **AI assistant** that helps a buyer choose. This is a change from the
> website, which shows no prices and has no cart — read the note on pricing
> below before you design anything, because the answer is not settled.
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
> **There is no price data anywhere yet** — `products.ts` has a `moq` field and
> nothing else. Part of your plan must be the shape prices should take, and what
> exactly I have to give you to fill them in.
>
> Two things about the business, so the app matches it. Price depends on
> quantity and branding method, which is why the website never published a
> number. And never describe the products as premium or the best — the rule is
> to talk about the customer's problem and their brand, never ours. Always make
> clear the catalogue is a part of what we stock, not all of it.
>
> The AI assistant should help a buyer choose — "I need 500 gifts for a dealer
> meet, budget around ₹200 each" should get real suggestions from the actual 126
> products, and be able to put them in the cart. I know the API key must not sit
> in the app.
>
> Come back with a plan covering:
>
> - how the data and photographs are shared with the website, one copy only
> - **what a price is** here — see the pricing note below and give me your
>   recommendation, not a menu
> - **what the cart does at the end** — a quote request, or a real payment
> - which framework, and why (I expect Expo unless you have a reason against it)
> - how push is sent, and what I must register with Google and Apple
> - what the two store accounts cost and what each review will want
> - what we put in the app so Apple does not reject it as too thin
>
> Read the README and the data files first. Do not write app code until we have
> agreed on the plan.

---

## The two questions to settle first

Everything else in the build is ordinary work. These two decide what is being
built at all, and both are the owner's calls, not the developer's.

### 1. What is a price here?

The website publishes none, and that is not shyness — the number genuinely
changes with quantity and with branding method. A single figure next to a pen
will be wrong for most of the people reading it.

There is also nothing to show yet: `products.ts` has no price field. Whatever is
chosen, 126 numbers have to come from the business.

The shape that fits how corporate gifting is actually sold is **quantity slabs**:

| Quantity | Price each |
| --- | --- |
| 50 – 99 | ₹— |
| 100 – 499 | ₹— |
| 500 + | ₹— |

It matches the `moq` already in the data, it is honest about why the number
moves, and a buyer sees immediately that ordering more costs less each. Branding
method can ride on top as a stated addition — laser, screen and UV do not cost
the same — rather than being hidden in one blended figure.

Two things to decide with it:

- **GST inclusive or exclusive.** A B2B buyer expects exclusive, with the tax
  shown. Say which, on every screen that shows a number.
- **Whether the website starts showing prices too.** If the app does and the
  site does not, the same product has two stories. That is a business decision;
  just do not let it happen by accident.

### 2. What happens when the cart is full?

This is the fork that decides the size of the whole project.

**A quote basket** — the buyer collects products and quantities, and the app
sends the whole list as one enquiry, to WhatsApp or as an order for the team to
price and confirm. This is how the business already works, it needs no payment
gateway, no invoicing, no refunds policy, and it can be built now.

**A real checkout** — the buyer pays in the app. That brings a payment gateway
(Razorpay is the usual choice in India), GST invoices, order status and
tracking, a cancellation and refund policy, and a support path when something
goes wrong. Both stores will want a privacy policy, and if there are user
accounts Apple requires in-app account deletion.

One useful fact: Apple's 30% commission applies to digital goods, not physical
ones. A gifting order is physical, so an ordinary payment gateway is allowed and
expected — that is not the obstacle. The obstacle is everything a real order
needs behind it.

**Recommendation: build the quote basket first.** It is the honest version of
how the business sells today, it is a fraction of the work, and it does not stop
you adding payment later once you know people are using it.

---

## What a proper app of this kind should have

Beyond the catalogue, the prices and the cart, these are worth building. The
first four are what stop Apple reading the app as a website in a wrapper.

- **An AI assistant that can actually act** — not a chat box bolted on. It
  should search the real 126 products, respect budget and quantity, and add what
  it suggests to the cart.
- **The catalogue offline.** A buyer on a client's floor with no signal can
  still show the range. This is the clearest thing a website cannot do.
- **Saved products and a saved cart**, surviving reinstall if there is a login.
- **Enquiry history, and reorder** — most corporate gifting is repeat business,
  and "order what we did last Diwali" should be one tap.
- **Colour variants as real data.** Seventeen product descriptions mention
  colour ranges but no colours are stored as data. Picking a colour should be a
  choice in the app, not a sentence to read.
- **Filters worth having**: by range, by budget, by minimum order, by branding
  method.
- **Share a product** — a buyer forwards it to whoever signs off. Make that one
  tap with a decent preview.
- **Your logo on the product**, if you ever have artwork to upload. This is the
  single feature that would make the app genuinely worth installing, and it is
  worth asking the new session what it would take.

---

## Decided already, do not re-open

**Native, both stores, push.** The PWA stays as it is and costs nothing to keep.

**Two accounts, and they take time.**

| | Cost | Note |
| --- | --- | --- |
| Google Play Console | about $25, once | Identity verification; allow a few days |
| Apple Developer Program | about $99 a year | Slower to approve, and it lapses if unpaid |

Verify both before promising a launch date — these are Apple's and Google's
figures to change.

**One copy of the data, or it drifts.** 126 products and 252 images kept in two
places stay identical for about a month. Then a product is added on one side and
the app shows a catalogue the website does not. One repository, data and images
shared:

```
data/       products, categories, content, prices   ← website and app both read this
assets/     the product photographs                 ← both
web/        the current site
app/        the new app
```

**The API key cannot live in the app.** Anything shipped inside an app can be
read out of it. The assistant must call Claude through a small server you
control. You are already on Cloudflare, so a Worker is the natural place — and
the same Worker can hold the push tokens and send notifications, so there is one
server piece rather than two. Put a rate limit on it, so one person cannot run
up a bill.

**Push needs something worth pushing.** "New range added" and "your quote is
ready" earn a notification. More than that and people turn them off — and the
permission is only asked once.

**Apple's review is the real risk, not the code.** Apple rejects apps that are a
website in a wrapper, under guideline 4.2, Minimum Functionality, and a plain
product catalogue is exactly what that is aimed at. The answer is already in the
plan — the assistant, the offline catalogue, the cart and push are native
reasons to exist — but design for it from the start, say so plainly in the
review notes, and do not have the app open on something that looks like the
website's home page.
