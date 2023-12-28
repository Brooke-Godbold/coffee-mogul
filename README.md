# CoffeeMogul

CoffeeMogul is an E-Commerce Website for selling various coffee. It is built in NextJS, uses a Mongo Database, and utilises Typescript. It features OAuth Integration with Google Oauth using NextAuth, and uses Stripe as a Payment Gateway. User accounts are tracked once they have logged in, with current baskets, previous orders, and saved addresses among the data being stored within Mongo.

## Important Notes

If you are working on this Project and require access for installation/development, contact the owner for the MongoDB, Stripe, and Google OAuth API Keys.

## Installation

Pull or Download the Repository to local machine

Create your local .env.local file and add the required Environment Variables to this file

```yaml
MONGO_USERNAME
MONGO_PASSWORD

MONGO_ITEM_DATABASE
MONGO_USER_DATABASE
MONGO_AUTH_DATABASE

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY

GOOGLE_PAY_MERCHANT_ID
GOOGLE_PAY_MERCHANT_NAME
GOOGLE_PAY_ENV

GOOGLE_OAUTH_CLIENT_ID
GOOGLE_OAUTH_CLIENT_SECRET
NEXTAUTH_SECRET
```

Install the modules:

```bash
npm install
```

To run the development server:

```bash
npm run dev
```

To create a local NextJS build:

```bash
npx next build
```

## Technical Configuration

### Website

[https://coffee-mogul.vercel.app/](https://coffee-mogul.vercel.app/)

### Hosting

[Vercel Admin](https://vercel.com/brookes-projects-d1333658/coffee-mogul)

The Live Website is hosted on Vercel. The dashboard can be used to configure the deployment, such as setting up Environment Variables.

### Database

[Mongo Atlas](https://cloud.mongodb.com/v2)

The Database and App Functions are hosted on Mongo Atlas, under Data Services and App Services. In addition to serving as Database, Mongo also has functions set up for receiving events from Stripe related to payment updates.

### Payment Gateway

[Stripe Dashboard](https://dashboard.stripe.com/test/dashboard)

Stripe is the chosen payment gateway for this App, and can be managed via the dashboard. In the case of this App, this is where the API Keys can be managed, as well as the Webhooks for updating Mongo when a payment has been completed.

### Testing the Payment Gateway

[Stripe Test Cards](https://stripe.com/docs/testing?testing-method=card-numbers#cards)

The current configuration for Stripe is in Test Mode, preventing real cards from being used. To test the payment gateway, test cards from Stripe can be used within the payment form.

### OAuth

[Google OAuth](https://console.cloud.google.com/apis)

Google OAuth can be managed via the Google Developer Dashboard. This can be used to manage or update the API Keys, as well as allowed origins and allowed callback URLs.
