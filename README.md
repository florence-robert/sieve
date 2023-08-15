# Sieve Challenge

The goal of this challenge is to create a simple web app consisting of a frontend using React and a node backend using a framework of choice.

## Getting Started

- `npm install`
- `npm run dev`

### Main Dependencies

- **Express**
- **React**
- **SWR** - Data fetching hook
- **Zod**
- **usehooks-ts** - exclusively used to get a debounce hook

### Notable Dev Dependencies

- **Tailwind CSS + Daisy UI**: TW + Daisy are leveraged for their SSR capabilities. These would resolve issues related to FOUC and FART
- **TypeScript**
- **Vite**
- **Testing Libraries**: Includes `@testing-library/react`, `@testing-library/jest-dom`, `fast-check`, `jsdom`, and `supertest` for testing both client and server components.
- **ESLint**

### Server

- Located in the `server` directory.
- Built with Express for handling API requests.

### Client

- Source code is located in the `src` and `client` directories.
- Utilizes React for UI components.
- Tailwind CSS for styling.

### Testing

- `npm run test`

## Possible improvements

Here's a non-exhaustive list of improvements that could be made to this application with more time.

- Add caching on the server to avoid re-computing the prime numbers
- Add service discovery to allow distributed client/server.
- Add more styling to provide a more engaging user experience
- Pre-compute prime numbers to get an even faster server response time.
- Add client-side caching _and_ memoization
- Add some more useful tests on the client. Some of them are kind of unhelpful
