# Express Session Authentication boilerplate

An API/boilerplate for session-based authentication. Functionality includes creating and authenticating users.

### Flow:

1. Login details are sent to API
2. Credentials are verified against MongoDB store.
3. If verified, server creates a user session and saves to a Redis session store
4. Server issues a cookie
5. Cookie is verified against session store for any further auth requests
6. When user logs out, the session is destroyed
