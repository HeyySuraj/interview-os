

# OAuth 2.0 & Spring Boot Security — Senior Developer Interview Guide

> A practical interview guide covering OAuth 2.0, OpenID Connect, JWT, Authorization Server, Resource Server, clients, grants, token validation, microservices architecture, Spring Boot implementation, security pitfalls, and senior-level interview questions.

---

## 1. OAuth 2.0 in One Sentence

**OAuth 2.0 is an authorization framework that allows a client application to obtain limited access to protected resources on behalf of a user or as itself, without sharing the user's credentials with the client.**

### Important distinction

- **Authentication** = Who are you?
- **Authorization** = What are you allowed to access?
- **OAuth 2.0** = Primarily an **authorization** framework.
- **OpenID Connect (OIDC)** = Authentication/identity layer built on top of OAuth 2.0.

A strong senior-level answer should avoid saying that OAuth2 itself is an authentication protocol.

---

# 2. OAuth 2.0 Architecture

The core OAuth actors are:

```text
                    +----------------------+
                    |   Resource Owner     |
                    |       (User)         |
                    +----------+-----------+
                               |
                               | Login / Consent
                               v
                    +----------------------+
                    | Authorization Server |
                    | Keycloak/Auth0/Okta   |
                    +----------+-----------+
                               |
                         Access Token
                               |
                               v
+----------------+      +----------------------+
| Client         | ---> | Resource Server      |
| Web/Mobile/API |      | Spring Boot API      |
+----------------+      +----------+-----------+
                                  |
                                  v
                           Protected Data
```

### Components

### Resource Owner
Usually the user who owns the protected data.

### Client
The application requesting access.

Examples:

- React frontend
- Mobile application
- Backend application
- Another microservice

### Authorization Server
Authenticates the user/client, obtains consent where applicable, and issues tokens.

Examples:

- Keycloak
- Auth0
- Okta
- Microsoft Entra ID
- Amazon Cognito

### Resource Server
The API that protects resources and validates access tokens.

Examples:

```text
order-service
payment-service
user-service
```

---

# 3. Typical Microservices OAuth2 Flow

Suppose we have:

```text
React
  |
  v
Authorization Server
  |
  | Access Token
  v
API Gateway
  |
  +------> Order Service
  |
  +------> Payment Service
  |
  +------> User Service
```

A typical flow:

1. User opens the frontend.
2. Frontend redirects the user to the Authorization Server.
3. User authenticates there.
4. Authorization Server returns an authorization code.
5. Client exchanges the code for tokens.
6. Client calls APIs using:

```http
Authorization: Bearer <access-token>
```

7. Gateway/resource server validates the access token.
8. API checks scopes/roles.
9. Request is allowed or rejected.

---

# 4. Authorization Code Flow

This is one of the most important OAuth2 flows for interviews.

```text
User
 |
 | 1. Open application
 v
Client
 |
 | 2. Authorization request
 v
Authorization Server
 |
 | 3. Login + consent
 |
 | 4. Authorization Code
 v
Client
 |
 | 5. Exchange code + PKCE verifier
 v
Authorization Server
 |
 | 6. Access Token / ID Token
 v
Client
 |
 | 7. Bearer Access Token
 v
Resource Server
```

### Why authorization code?

The client does not directly receive the user's password.

The modern recommendation for public clients is:

**Authorization Code + PKCE**

---

# 5. What is PKCE?

PKCE means:

**Proof Key for Code Exchange**

It protects the authorization-code flow against authorization-code interception.

The client generates:

```text
code_verifier
```

Then derives:

```text
code_challenge
```

The authorization request contains the challenge.

Later, during token exchange, the client sends the verifier.

The authorization server verifies:

```text
challenge == transform(code_verifier)
```

If someone steals the authorization code but does not have the verifier, they cannot successfully exchange it.

### Senior interview answer

> PKCE adds a dynamically generated proof to the authorization-code flow. It is especially important for public clients such as SPAs and mobile applications because they cannot safely keep a client secret.

---

# 6. Client Credentials Flow

Used mainly for machine-to-machine communication.

Example:

```text
Order Service
      |
      | client_id + client_secret
      v
Authorization Server
      |
      | access token
      v
Order Service
      |
      | Bearer token
      v
Payment Service
```

There is normally no end-user involved.

Example:

```text
POST /oauth2/token

grant_type=client_credentials
client_id=order-service
client_secret=******
scope=payment.read
```

Use this for:

- Service-to-service APIs
- Background workers
- Scheduled jobs
- Machine clients

---

# 7. Resource Owner Password Credentials Grant

The password grant is **deprecated** and should not be used in new systems.

Bad architecture:

```text
Application
   |
   | username + password
   v
Application -> Authorization Server
```

The application should not collect the user's authorization-server password.

Prefer:

```text
Authorization Code + PKCE
```

---

# 8. Refresh Token

An access token should generally be short-lived.

When it expires, the client can use a refresh token to obtain a new access token.

```text
Access Token
   |
   | expires
   v
Refresh Token
   |
   v
Authorization Server
   |
   v
New Access Token
```

### Why?

It reduces the lifetime of a bearer credential while avoiding frequent user login.

Refresh tokens require stronger protection because they can be used to obtain new access tokens.

---

# 9. Access Token vs Refresh Token

| Feature | Access Token | Refresh Token |
|---|---|---|
| Used for API calls | Yes | No |
| Usually short-lived | Yes | Usually longer-lived |
| Sent to resource server | Yes | No |
| Can obtain new access token | No | Yes |
| Should be protected | Yes | Very strongly |

---

# 10. OAuth2 vs JWT

This is a very common interview question.

### OAuth2

OAuth2 is an **authorization framework/protocol**.

### JWT

JWT is a **token format**.

Therefore:

```text
OAuth2 != JWT
```

OAuth2 can use different token formats.

A JWT can also be used outside OAuth2.

### Good interview answer

> OAuth2 defines how authorization is obtained and how tokens are used. JWT defines a compact token representation containing claims that can be signed and verified.

---

# 11. JWT Structure

JWT has three parts:

```text
HEADER.PAYLOAD.SIGNATURE
```

Example:

```text
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9
.
eyJzdWIiOiIxMjMiLCJzY29wZSI6InJlYWQifQ
.
signature
```

### Header

Contains metadata such as:

```json
{
  "alg": "RS256",
  "typ": "JWT",
  "kid": "key-1"
}
```

### Payload

Contains claims:

```json
{
  "sub": "123",
  "iss": "https://auth.example.com",
  "aud": "orders-api",
  "exp": 1770000000,
  "scope": "orders.read"
}
```

### Signature

Used to verify integrity and authenticity.

---

# 12. JWT Is Encoded, Not Encrypted

This is a common trap.

Anyone holding a normal signed JWT can decode its header and payload.

Therefore:

**Do not put secrets or sensitive information in JWT claims.**

Signature protects integrity.

Encryption is a separate concept, such as JWE.

---

# 13. Important JWT Claims

### iss

Issuer.

```text
Who issued this token?
```

### sub

Subject.

```text
Who does this token represent?
```

### aud

Audience.

```text
Which API/client is this token intended for?
```

### exp

Expiration time.

### iat

Issued-at time.

### nbf

Not-before time.

### scope

Permissions/scopes granted to the token.

Example:

```text
orders.read orders.write
```

---

# 14. JWT Signing Algorithms

Common algorithms:

```text
HS256
RS256
ES256
```

### HS256

Symmetric key.

Same secret is used to sign and verify.

```text
Auth Server
     |
   secret
     |
Resource Server
```

### RS256

Asymmetric cryptography.

Authorization server signs using:

```text
Private Key
```

Resource server verifies using:

```text
Public Key
```

This is often preferable for distributed microservices.

```text
             Private Key
                  |
                  v
         Authorization Server
                  |
             signed JWT
                  |
                  v
        +------------------+
        | Resource Servers |
        +------------------+
          ^      ^      ^
          |      |      |
       public  public  public
        key     key     key
```

---

# 15. Why Asymmetric Keys Are Useful

Suppose there are 30 microservices.

With symmetric signing, every service needs the shared secret.

If one service is compromised, the attacker may gain the ability to forge tokens.

With asymmetric signing:

```text
Authorization Server
       |
 private key
       |
    signs JWT
       |
       v
Microservices
       |
 public key
       |
   verify JWT
```

Resource servers only need the public key.

They cannot use the public key to create valid signatures.

---

# 16. JWKS

JWKS means:

**JSON Web Key Set**

An authorization server can publish public keys through a JWKS endpoint.

Conceptually:

```text
Authorization Server
       |
       +----> /.well-known/jwks.json
                         |
                         v
                 Public Keys
```

The JWT header can contain:

```json
{
  "kid": "key-2026-01",
  "alg": "RS256"
}
```

`kid` helps the resource server select the correct public key during key rotation.

---

# 17. Key Rotation

Keys should periodically be rotated.

Example:

```text
Old key: key-1
New key: key-2
```

During rotation:

```text
Authorization Server
        |
        +--> signs with key-2
        |
        +--> publishes key-1 + key-2
```

Resource servers can continue validating old tokens until they expire.

After old tokens expire:

```text
Remove key-1
```

This is an important production consideration.

---

# 18. OAuth2 Scopes

Scopes represent permissions.

Example:

```text
orders.read
orders.write
payments.read
payments.refund
```

A token might contain:

```json
{
  "scope": "orders.read orders.write"
}
```

The API can enforce:

```text
orders.read
```

for GET requests and:

```text
orders.write
```

for write operations.

### Principle

**Least privilege**

Only grant the permissions required.

---

# 19. Roles vs Scopes

### Role

Describes what a user/application is.

```text
ADMIN
MANAGER
USER
```

### Scope

Describes what the token can do.

```text
orders.read
orders.write
```

A practical system may use both.

```text
Role:
ADMIN

Scopes:
orders.read
orders.write
users.read
users.write
```

---

# 20. Authentication vs Authorization

Example:

```text
User logs in successfully
        |
        v
Authentication
        |
        v
"Suraj is authenticated"
        |
        v
Authorization
        |
        v
"Suraj can read orders but cannot refund payments"
```

---

# 21. OAuth2 + OpenID Connect

OAuth2 does not standardize user identity information.

OIDC adds authentication on top of OAuth2.

OIDC introduces an:

**ID Token**

Usually a JWT.

Typical token set:

```text
Access Token -> API authorization
ID Token     -> Client identity/login information
Refresh Token -> Obtain new access token
```

### Important

Do not use an ID token as an API access token just because both may be JWTs.

The API should validate the **access token** intended for it.

---

# 22. Access Token vs ID Token

| Token | Purpose |
|---|---|
| Access Token | Authorize API access |
| ID Token | Tell the client about the authenticated user |
| Refresh Token | Obtain new access tokens |

A senior developer should know this distinction very well.

---

# 23. Spring Boot Resource Server

For a Spring Boot API, a common dependency is:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-oauth2-resource-server</artifactId>
</dependency>
```

The API can validate JWT access tokens issued by the authorization server.

Typical configuration:

```yaml
spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: https://auth.example.com/realms/company
```

Spring Security can use the issuer metadata to discover signing keys and validate JWTs.

---

# 24. Basic Spring Security Configuration

Example:

```java
@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/public/**").permitAll()
                .requestMatchers("/admin/**")
                    .hasRole("ADMIN")
                .anyRequest()
                    .authenticated()
            )
            .oauth2ResourceServer(
                oauth -> oauth.jwt()
            );

        return http.build();
    }
}
```

---

# 25. Scope-Based Authorization

Example:

```java
@PreAuthorize("hasAuthority('SCOPE_orders.read')")
@GetMapping("/orders")
public List<Order> getOrders() {
    return orderService.getOrders();
}
```

For writing:

```java
@PreAuthorize("hasAuthority('SCOPE_orders.write')")
@PostMapping("/orders")
public Order createOrder(@RequestBody OrderRequest request) {
    return orderService.create(request);
}
```

---

# 26. Role-Based Authorization

Example:

```java
@PreAuthorize("hasRole('ADMIN')")
@DeleteMapping("/users/{id}")
public void deleteUser(@PathVariable Long id) {
    userService.delete(id);
}
```

The exact claim-to-authority mapping depends on your JWT structure and Spring Security configuration.

---

# 27. What Happens Inside Spring Security?

Request:

```http
GET /orders
Authorization: Bearer eyJ...
```

Conceptually:

```text
HTTP Request
     |
     v
Bearer Token Filter
     |
     v
Extract JWT
     |
     v
JWT Decoder
     |
     +---- signature validation
     +---- issuer validation
     +---- expiration validation
     +---- audience validation/configuration
     |
     v
Authentication
     |
     v
Authorization Rules
     |
     +---- allowed -> Controller
     |
     +---- denied  -> 403
```

An invalid/missing authentication token commonly results in:

```text
401 Unauthorized
```

An authenticated principal without sufficient permission commonly results in:

```text
403 Forbidden
```

---

# 28. 401 vs 403

### 401 Unauthorized

The request does not have valid authentication credentials.

Examples:

- Missing token
- Expired token
- Invalid signature
- Invalid issuer

### 403 Forbidden

The caller is authenticated but does not have enough permission.

Example:

```text
User has:
orders.read

Endpoint requires:
orders.write
```

---

# 29. API Gateway + OAuth2

Common architecture:

```text
                 +-------------------+
                 | Authorization     |
                 | Server            |
                 +---------+---------+
                           |
                       Access Token
                           |
                           v
+---------+        +---------------+
| Client  | -----> | API Gateway   |
+---------+        +-------+-------+
                           |
                 +---------+---------+
                 |         |         |
                 v         v         v
              Order     Payment    User
              Service   Service    Service
```

There are multiple valid designs for where token validation happens.

---

# 30. Should Gateway Validate JWT?

It can.

One common design:

```text
Client
  |
  v
Gateway
  |
  | validate token
  v
Microservice
```

Benefits:

- Reject invalid requests early
- Centralized edge security
- Less repeated work at the gateway

But microservices should generally **not blindly trust the gateway**.

A strong defense-in-depth design is:

```text
Gateway validates
        +
Resource service validates authorization
```

For highly sensitive systems, every resource server should enforce its own authorization boundary.

---

# 31. Token Relay

Sometimes a gateway receives a user's access token and forwards it downstream.

```text
Client
  |
Bearer token
  v
Gateway
  |
Bearer token
  v
Order Service
```

This is called token relay.

The downstream service then evaluates the same user token.

Be careful about forwarding tokens to services that do not need them.

---

# 32. Service-to-Service Authentication

There are two common cases.

### Case 1: User context is required

```text
User
 |
Access Token
 v
Gateway
 |
 v
Order Service
 |
User's access token
 |
 v
Payment Service
```

### Case 2: Machine identity is enough

```text
Order Service
      |
      | Client Credentials
      v
Authorization Server
      |
      | Service access token
      v
Payment Service
```

Do not automatically use a user's token for every backend-to-backend operation.

---

# 33. JWT Validation: What Should Be Checked?

A robust resource server should validate more than just the JWT signature.

Important checks include:

```text
Signature
Issuer (iss)
Expiration (exp)
Not-before (nbf), when applicable
Audience (aud)
Algorithm policy
Required scopes/authorities
```

### Important interview point

**A valid signature does not automatically mean the token is valid for your API.**

A token signed by a trusted issuer could still be intended for another audience.

---

# 34. Audience Validation

Suppose a token says:

```json
{
  "iss": "https://auth.example.com",
  "aud": "payment-api"
}
```

If the request is sent to:

```text
order-api
```

the order API should not blindly accept the token simply because the signature is valid.

Audience validation helps prevent token confusion/misuse.

---

# 35. Authorization Code vs Client Credentials

| | Authorization Code + PKCE | Client Credentials |
|---|---|---|
| End user | Yes | No |
| Common use | Web/mobile login | Service-to-service |
| User consent | Possible | No |
| Client secret | Public clients don't rely on one | Confidential client authenticates |
| Typical token | User-context access token | Service-context access token |

---

# 36. Confidential vs Public Client

### Public Client

Cannot safely keep a secret.

Examples:

- Mobile application
- Browser-based SPA

Use:

```text
Authorization Code + PKCE
```

### Confidential Client

Can securely store credentials on a protected backend.

Examples:

- Server-side web application
- Backend service

---

# 37. Why Not Put Client Secret in React?

Because browser JavaScript is delivered to the user.

Anything shipped to the browser should be considered observable.

Therefore:

```text
React
  X
client_secret
```

Do not treat a browser client secret as confidential.

---

# 38. OAuth2 Authorization Server vs Resource Server

### Authorization Server

Responsible for:

- User/client authentication
- Consent
- Token issuance
- Token refresh
- Client registration
- Key management

### Resource Server

Responsible for:

- Protecting APIs
- Validating access tokens
- Enforcing authorization

One application can technically play multiple roles, but separating them is common in microservices.

---

# 39. Common Authorization Server Options

Popular providers include:

- Keycloak
- Auth0
- Okta
- Microsoft Entra ID
- Amazon Cognito

For self-hosted environments, Keycloak is commonly used.

For managed identity platforms, teams may choose a cloud/identity provider based on enterprise requirements.

---

# 40. Keycloak Example Architecture

```text
                     +----------------+
                     |    Keycloak    |
                     | Auth Server    |
                     +-------+--------+
                             |
                         JWT Token
                             |
                             v
+----------+          +-------------+
| React    | --------> | API Gateway |
+----------+          +------+------+ 
                              |
             +----------------+----------------+
             |                |                |
             v                v                v
       Order Service    Payment Service   User Service
       Resource Server  Resource Server   Resource Server
```

Keycloak can manage:

- Users
- Roles
- Clients
- Scopes
- Realms
- Identity federation
- Token issuance

---

# 41. Realm vs Client in Keycloak

### Realm

An isolated security domain containing users, roles, clients, and configuration.

### Client

An application/service registered with Keycloak.

Examples:

```text
frontend-client
order-service
payment-service
```

---

# 42. OAuth2 Authorization Server Endpoints

Exact URLs depend on the provider, but conceptually you will encounter:

```text
/authorize
/token
/introspect
/revoke
/.well-known/openid-configuration
/jwks.json
```

### Authorization endpoint

Starts authorization.

### Token endpoint

Issues tokens.

### Introspection endpoint

Allows a trusted caller to ask whether a token is active and obtain token metadata.

### Revocation endpoint

Requests token revocation.

### Discovery endpoint

Publishes authorization-server metadata.

### JWKS endpoint

Publishes public signing keys.

---

# 43. JWT Validation vs Token Introspection

## JWT validation

Resource server validates the token locally.

```text
Client
  |
JWT
  v
Resource Server
  |
  | verify locally
  v
Allow/Deny
```

### Advantages

- Fast
- No network call for every request
- Scales well

### Disadvantage

A self-contained JWT can remain valid until expiration unless additional mechanisms are used.

---

## Introspection

```text
Client
  |
Access Token
  v
Resource Server
  |
  | introspection request
  v
Authorization Server
  |
 active/inactive
  v
Resource Server
```

### Advantages

- Centralized token state
- Easier immediate revocation behavior

### Disadvantages

- Network dependency
- Added latency
- Authorization server can become a bottleneck if poorly designed

---

# 44. Stateless vs Stateful Security

### JWT Resource Server

Usually more stateless.

```text
Request
   |
JWT
   |
validate
   |
authorize
```

No server-side session is required for each request.

### Session-based authentication

Server maintains session state.

```text
Client
 |
Session ID
 |
Server Session Store
```

OAuth2 does not require JWT or statelessness.

---

# 45. Token Revocation Problem

Suppose:

```text
JWT expires in 30 minutes
```

User logs out after 1 minute.

If the resource server only performs local JWT validation, the token may still technically validate until it expires.

Possible strategies:

- Short-lived access tokens
- Refresh-token rotation
- Token revocation
- Introspection
- Server-side deny lists for special cases
- Risk-based session controls

There is always a trade-off between statelessness, immediate revocation, performance, and complexity.

---

# 46. Refresh Token Rotation

Instead of reusing one refresh token indefinitely:

```text
Refresh Token A
       |
       v
New Access Token
New Refresh Token B
       |
       X
Token A becomes invalid
```

If an old refresh token is reused unexpectedly, the authorization server can detect possible token theft and invalidate the token family/session.

---

# 47. CORS vs OAuth2

These are different security mechanisms.

### CORS

Controls which browser origins can make cross-origin requests.

### OAuth2

Controls authorization/access to protected resources.

Example:

```text
CORS:
https://frontend.example.com
```

does not mean:

```text
User is authorized to access /admin
```

You need both browser policy and application authorization where appropriate.

---

# 48. CSRF and OAuth2

CSRF protection and OAuth2 are also different concepts.

For browser applications using cookies, CSRF is important.

If an application uses bearer tokens in an architecture where the token is not automatically attached as a browser cookie, the CSRF threat model is different.

Do not simply say:

```text
"OAuth2 means CSRF is disabled."
```

That is incorrect.

---

# 49. Secure Token Storage

There is no universal one-line answer because storage depends on the application architecture.

For browser applications, avoid exposing long-lived credentials to JavaScript when possible.

A common secure architecture is:

```text
Browser
   |
   | secure session cookie
   v
Backend / BFF
   |
   | OAuth2 tokens
   v
Authorization Server / APIs
```

Cookie settings commonly include:

```text
Secure
HttpOnly
SameSite
```

with the exact SameSite policy chosen for the application's deployment and cross-site requirements.

---

# 50. BFF Pattern

BFF means:

**Backend for Frontend**

Architecture:

```text
Browser
   |
   | Session Cookie
   v
BFF
   |
   | Access Token
   v
Microservices
```

The browser does not need to directly manage the OAuth tokens.

Benefits can include:

- Reduced token exposure to browser JavaScript
- Centralized backend integration
- Better control over downstream tokens
- Easier server-side session management

Trade-off:

- Adds another backend component

---

# 51. Common OAuth2 Security Mistakes

### 1. Using Password Grant

Deprecated.

### 2. Putting client secret in frontend

Never treat browser code as confidential.

### 3. Accepting any JWT signed by a trusted issuer

Also validate token purpose/audience and other required claims.

### 4. Trusting roles from untrusted headers

Do not blindly trust:

```http
X-User-Role: ADMIN
```

### 5. Sending refresh tokens to APIs

Refresh tokens should normally stay with the authorization client and not be sent to resource APIs.

### 6. Putting secrets inside JWT payload

JWT payload is not secret merely because it is signed.

### 7. Very long-lived access tokens

Increase impact of token theft.

### 8. Ignoring key rotation

Production systems need key lifecycle management.

### 9. Treating ID token as access token

Different purposes.

### 10. Logging bearer tokens

Avoid logging authorization headers/tokens.

---

# 52. OAuth2 Threat Model

Senior developers should understand:

- Authorization code interception
- Token theft
- Token replay
- Token leakage
- Redirect URI attacks
- CSRF/login CSRF
- Open redirect vulnerabilities
- Client impersonation
- Insufficient scope validation
- Token substitution/confusion
- Stolen refresh tokens
- Weak client authentication

PKCE, strict redirect URI validation, short token lifetime, secure storage, audience validation, and refresh-token rotation help address different parts of this threat model.

---

# 53. Redirect URI

The authorization server redirects the browser back to the registered callback.

Example:

```text
https://app.example.com/oauth/callback
```

Do not accept arbitrary redirect URLs.

Bad:

```text
redirect_uri=https://attacker.example.com
```

The authorization server should validate the redirect URI against registered values.

---

# 54. State Parameter

The `state` parameter helps protect the authorization request/response flow against CSRF and request correlation attacks.

Conceptually:

```text
Client
 |
 | state = random-value
 v
Authorization Server
 |
 | state = random-value
 v
Client
 |
 | verify state
```

The returned state should match the value associated with the initiating authorization request.

---

# 55. Nonce in OIDC

OIDC commonly uses a `nonce` to bind an ID token to the authentication request and help prevent replay.

Remember:

```text
OAuth2 state -> request/response correlation and CSRF defense
OIDC nonce   -> ID token replay/request binding
PKCE         -> authorization code protection
```

These solve different problems.

---

# 56. OAuth2 Error Codes

Common errors include:

```text
invalid_request
unauthorized_client
access_denied
unsupported_response_type
invalid_scope
invalid_grant
invalid_client
```

For APIs, HTTP errors commonly include:

```text
401 Unauthorized
403 Forbidden
```

---

# 57. Scope Consent Example

Suppose a client requests:

```text
orders.read
orders.write
payments.refund
```

The authorization server may show:

```text
This application wants to:

✓ Read orders
✓ Create/update orders
✓ Refund payments
```

The user can grant or deny consent depending on the provider/policy.

---

# 58. OAuth2 in a Real E-Commerce System

Imagine:

```text
React
  |
  v
BFF / API Gateway
  |
  +------ Order Service
  |
  +------ Payment Service
  |
  +------ Inventory Service
  |
  +------ Notification Service
```

Authorization:

```text
Keycloak
 |
 +-- customer
 +-- admin
 +-- support
```

Scopes:

```text
orders.read
orders.write
payments.read
payments.refund
inventory.read
```

Example:

```text
Customer:
orders.read
orders.write
payments.read

Admin:
orders.read
orders.write
payments.read
payments.refund
inventory.read
```

---

# 59. How a Request Travels

```text
1. User logs in
       |
       v
2. Authorization Server
       |
       v
3. Access Token
       |
       v
4. Browser/BFF
       |
       v
5. API Gateway
       |
       v
6. Order Service
       |
       +--> validate JWT
       |
       +--> check orders.read
       |
       v
7. Controller
       |
       v
8. Database
```

---

# 60. What Happens If Token Is Expired?

Example:

```text
exp = 10:30
current time = 10:31
```

Resource server rejects it.

Usually:

```text
401 Unauthorized
```

The client may obtain a fresh access token using a refresh token, depending on its OAuth flow and architecture.

---

# 61. What Happens If Scope Is Missing?

Token:

```text
scope = orders.read
```

Request:

```text
POST /orders
```

Required:

```text
orders.write
```

The user may be authenticated, but authorization fails.

Typical response:

```text
403 Forbidden
```

---

# 62. OAuth2 with Spring Cloud Gateway

Conceptually:

```text
                    +-------------+
                    | Keycloak    |
                    +------+------+
                           |
                        JWT
                           |
React ---> Gateway --------+
             |
      +------+------+
      |             |
      v             v
 Orders          Payments
```

Gateway can:

- Authenticate requests
- Route requests
- Validate JWT
- Relay tokens where appropriate
- Apply rate limits
- Add security headers
- Centralize edge concerns

Microservices should still own business authorization.

---

# 63. Authentication vs Authorization at Different Layers

A mature architecture separates concerns:

```text
Identity Provider
    |
    | Authentication
    v
Gateway
    |
    | Token validation / edge policy
    v
Microservice
    |
    | Business authorization
    v
Database
```

Example:

```text
Gateway:
"Is this token valid?"

Order Service:
"Can this user update THIS order?"
```

The second question requires business context and should generally remain in the domain service.

---

# 64. Important Senior-Level Question: Can JWT Be Revoked?

### Answer

A self-contained JWT is generally not naturally revocable by simply deleting it from the authorization server's database because resource servers may validate it locally.

Solutions include:

- Short expiration
- Introspection
- Revocation mechanisms
- Deny lists
- Session/token version checks
- Refresh-token rotation

The correct answer is:

> JWT itself does not provide magical server-side revocation. Revocation is an architectural concern.

---

# 65. Important Senior-Level Question: Why Not Use One JWT Forever?

Because if it is stolen:

```text
Attacker
   |
   | stolen JWT
   v
API
```

The attacker can potentially use it until expiration.

Short-lived access tokens reduce the attack window.

---

# 66. Important Senior-Level Question: Where Should Authorization Logic Live?

Do not put all authorization logic in the frontend.

Frontend checks are useful for UX:

```text
Hide Admin button
```

But the backend must enforce:

```text
Admin-only operation
```

The final authorization decision must be made by a trusted backend/resource server.

---

# 67. Important Senior-Level Question: Can a Microservice Trust Another Microservice?

Not simply because it came through the internal network.

Use explicit service identity and authorization.

Examples:

```text
mTLS
OAuth2 Client Credentials
JWT service identity
Cloud IAM
```

Internal network != automatically trusted network.

---

# 68. OAuth2 + mTLS

For higher-security environments, mutual TLS can authenticate both sides:

```text
Service A
   |
   | TLS + client certificate
   v
Service B
```

OAuth2 access tokens can then provide authorization.

These mechanisms can complement each other:

```text
mTLS -> workload/channel identity
OAuth2 -> authorization/scopes
```

---

# 69. JWT vs Opaque Token

### JWT

Self-contained.

```text
header.payload.signature
```

Resource server can validate locally.

### Opaque token

Random-looking reference:

```text
8f92a7c1...
```

Resource server may need introspection to understand it.

### Trade-off

JWT:

```text
+ Fast local validation
+ Good scalability
- Revocation is harder
```

Opaque:

```text
+ Central token state
+ Easier immediate revocation
- Introspection dependency
```

---

# 70. OAuth2 Token Exchange

In complex distributed architectures, one service may exchange a token for another token with a narrower audience/scope.

Conceptually:

```text
User Token
    |
    v
Service A
    |
    | token exchange
    v
Authorization Server
    |
    | token for Service B
    v
Service B
```

This can reduce unnecessary propagation of a broad user token.

---

# 71. Least Privilege

A senior engineer should always think:

```text
Who can call this API?
What exact scope is required?
Which audience is intended?
How long should the token live?
Does the downstream service really need the user's token?
```

Avoid:

```text
scope = admin
```

for every client.

Prefer narrow permissions.

---

# 72. OAuth2 Interview Questions — Fundamentals

### Q1. What is OAuth2?

Authorization framework that allows delegated access without sharing credentials with the client.

### Q2. Is OAuth2 authentication or authorization?

Primarily authorization.

### Q3. What is OIDC?

An identity/authentication layer built on OAuth2.

### Q4. What are OAuth2 actors?

Resource Owner, Client, Authorization Server, Resource Server.

### Q5. What is an access token?

Credential used by a client to access protected resources.

### Q6. What is a refresh token?

Credential used to obtain new access tokens.

### Q7. What is a scope?

Permission requested/granted to a client/token.

### Q8. What is a bearer token?

A token where possession is generally sufficient to use it as a credential.

### Q9. What is JWT?

A compact token format containing claims that can be signed and optionally encrypted.

### Q10. Is JWT OAuth2?

No.

---

# 73. OAuth2 Interview Questions — Flows

### Q11. Explain Authorization Code flow.

Know every step from redirect through code exchange.

### Q12. Why is PKCE needed?

Protects authorization-code exchange, especially for public clients.

### Q13. What is Client Credentials?

Machine-to-machine authorization.

### Q14. Why is Password Grant deprecated?

It requires the client to handle user credentials and has poor security properties compared with modern flows.

### Q15. What is Refresh Token flow?

Exchange a refresh token for a new access token.

### Q16. Which flow should a SPA use?

Generally Authorization Code + PKCE.

### Q17. Which flow should service-to-service communication use?

Usually Client Credentials, when acting as the service itself.

---

# 74. OAuth2 Interview Questions — JWT

### Q18. Explain JWT structure.

Header, payload, signature.

### Q19. Is JWT encrypted?

Not by default.

### Q20. How do you validate JWT?

Validate signature and relevant claims such as issuer, expiration, audience, and authorization claims.

### Q21. HS256 vs RS256?

HS256 uses a shared secret; RS256 uses private/public keys.

### Q22. Why prefer asymmetric signing in microservices?

Resource servers can verify with public keys without receiving a private signing secret.

### Q23. What is JWKS?

A published set of JSON Web Keys, commonly public keys used for JWT verification.

### Q24. What is `kid`?

Key ID used to identify the signing key.

### Q25. What is key rotation?

Replacing signing keys while allowing old keys to remain available long enough to validate still-valid tokens.

---

# 75. OAuth2 Interview Questions — Spring Boot

### Q26. How do you configure Spring Boot as a Resource Server?

Use Spring Security's OAuth2 Resource Server support and configure the issuer/JWK source.

### Q27. What does `issuer-uri` do?

It identifies the trusted issuer and allows Spring Security to discover provider metadata and signing keys.

### Q28. How do you secure an endpoint?

Use request authorization configuration and/or method security such as `@PreAuthorize`.

### Q29. How do you check scopes?

Example:

```java
@PreAuthorize("hasAuthority('SCOPE_orders.read')")
```

### Q30. How do you check roles?

Example:

```java
@PreAuthorize("hasRole('ADMIN')")
```

### Q31. What is the difference between 401 and 403?

401 = authentication failed/missing.

403 = authenticated but insufficient permission.

### Q32. What happens when JWT signature validation fails?

The request is rejected as unauthenticated.

---

# 76. OAuth2 Interview Questions — Microservices

### Q33. How do microservices authenticate?

Use centralized identity/token issuance with each resource service validating access tokens.

### Q34. Should every service validate JWT?

For defense in depth, resource services should generally enforce their own authentication/authorization boundary rather than blindly trusting upstream headers.

### Q35. Should gateway pass the token downstream?

Only when downstream services need the user/service identity and token scope. Otherwise, avoid unnecessary token propagation.

### Q36. How do services authenticate without a user?

Client Credentials or another workload identity mechanism.

### Q37. What happens if Authorization Server goes down?

JWT resource servers can often continue validating already-issued JWTs locally until they need new metadata/keys or tokens, while new login/token issuance may fail. Introspection-based systems are more directly dependent on the authorization server.

### Q38. What happens if JWKS endpoint goes down?

Well-designed resource servers cache signing keys. Already-known keys may continue to validate tokens; behavior depends on cache/configuration and key rotation.

---

# 77. OAuth2 Interview Questions — Security

### Q39. Can you store secrets in JWT?

No.

### Q40. Can you revoke JWT?

Not inherently through the JWT format. Use architectural mechanisms.

### Q41. Why short-lived access tokens?

Reduce the damage window if stolen.

### Q42. Why refresh-token rotation?

Helps detect/reduce refresh-token replay and limits long-lived credential reuse.

### Q43. Why validate audience?

To ensure a token intended for another API is not accepted by your API.

### Q44. What is token replay?

Using a captured valid token again.

### Q45. What is redirect URI validation?

Ensures authorization responses are returned only to registered trusted locations.

### Q46. What is state?

A value used to correlate an authorization request with its callback and help protect against CSRF.

### Q47. What is nonce?

An OIDC value used to bind an ID token to an authentication request and mitigate replay.

---

# 78. Scenario-Based Interview Questions

These are especially important for senior interviews.

## Scenario 1

> User has a valid JWT but receives 403.

Possible reason:

```text
Authentication succeeded
Authorization failed
```

Check:

- Scope
- Role
- Authority mapping
- Endpoint policy
- Business authorization

---

## Scenario 2

> JWT signature is valid, but API should reject it.

Check:

```text
issuer
audience
expiration
not-before
algorithm policy
required scopes
```

---

## Scenario 3

> User logs out but old JWT still works.

Explain:

> Local JWT validation is stateless, so logout does not automatically invalidate an already-issued token. Use short-lived access tokens and appropriate revocation/introspection/session controls depending on requirements.

---

## Scenario 4

> 50 microservices need authentication.

Use:

```text
Central Authorization Server
+
JWT/OAuth2
+
Resource Server validation
+
central key distribution/JWKS
```

Avoid sharing one symmetric secret across all services.

---

## Scenario 5

> Payment service should only accept tokens intended for payment APIs.

Use:

```text
aud = payment-api
```

and validate audience.

---

## Scenario 6

> React application contains client_secret.

Explain:

> A browser application cannot keep a client secret confidential. Use Authorization Code + PKCE, or use a BFF architecture when appropriate.

---

# 79. Design Question: Build OAuth2 Architecture for 20 Microservices

A strong answer:

```text
                  +--------------------+
                  | Authorization      |
                  | Server / Keycloak  |
                  +---------+----------+
                            |
                       Access Tokens
                            |
                            v
+----------+        +-------------+
| Web/Mobile| -----> | API Gateway |
+----------+        +------+------+ 
                           |
       +-------------------+-------------------+
       |                   |                   |
       v                   v                   v
 Order Service       Payment Service     User Service
 Resource Server     Resource Server      Resource Server
       |                   |                   |
       v                   v                   v
   Database            Database            Database
```

### Security strategy

1. Authorization Server owns identity/token issuance.
2. Public clients use Authorization Code + PKCE.
3. Service-to-service calls use Client Credentials where appropriate.
4. APIs validate issuer/signature/audience/expiry.
5. Scopes enforce API permissions.
6. Business authorization stays inside the owning service.
7. Public keys are distributed through JWKS.
8. Signing keys are rotated.
9. Access tokens are short-lived.
10. Refresh tokens are protected and rotated where supported.
11. Gateway provides edge protection, but services do not blindly trust it.
12. Tokens are never logged.

---

# 80. Senior Developer Mental Model

When you see:

```http
Authorization: Bearer <token>
```

Think:

```text
WHO issued it?
       |
       v
iss

WHO is it about?
       |
       v
sub

WHO is it intended for?
       |
       v
aud

Is it still valid?
       |
       +--> exp
       +--> nbf

Was it modified?
       |
       v
signature

What can it do?
       |
       v
scope / roles

Which service should accept it?
       |
       v
audience + authorization policy
```

---

# 81. Quick Comparison Cheat Sheet

| Concept | Meaning |
|---|---|
| OAuth2 | Authorization framework |
| OIDC | Authentication/identity layer on OAuth2 |
| JWT | Token format |
| Access Token | API authorization credential |
| Refresh Token | Gets new access token |
| ID Token | Client identity information in OIDC |
| Scope | Permission |
| Role | User/service classification |
| Authorization Server | Issues tokens |
| Resource Server | Protects APIs |
| Client | Requests access |
| PKCE | Protects authorization-code flow |
| JWKS | Published signing/verification keys |
| `iss` | Issuer |
| `sub` | Subject |
| `aud` | Audience |
| `exp` | Expiration |
| `kid` | Signing-key identifier |
| 401 | Authentication problem |
| 403 | Authorization problem |

---

# 82. 30-Second Interview Answer

If the interviewer asks:

> "Explain OAuth2."

Say:

> OAuth2 is an authorization framework used to provide controlled access to protected resources without sharing user credentials with the client. The main components are the resource owner, client, authorization server, and resource server. The authorization server issues access tokens, and the resource server validates those tokens and applies authorization rules such as scopes or roles. For modern user-facing applications, Authorization Code with PKCE is commonly used, while Client Credentials is commonly used for service-to-service communication. JWT is often used as the access-token format, but OAuth2 and JWT are not the same thing. In microservices, we can use a centralized authorization server such as Keycloak and have each resource service validate the token and enforce its own authorization.

---

# 83. 60-Second Senior-Level Answer

> In a microservices architecture, I would separate identity and token issuance from resource protection. An authorization server such as Keycloak handles authentication, client registration, consent, and token issuance. Public applications would generally use Authorization Code with PKCE, while service-to-service communication can use Client Credentials. The APIs act as OAuth2 resource servers and validate access tokens using the issuer's public keys, typically through JWKS. I would validate signature, issuer, expiration, audience, and required scopes, rather than only checking that the JWT signature is valid. The API gateway can perform edge authentication and routing, but each microservice should still enforce its own authorization boundary and business-level permissions. I would use short-lived access tokens, protected and preferably rotated refresh tokens, key rotation, least-privilege scopes, and avoid logging or unnecessarily propagating tokens.

---

# 84. Final Interview Checklist

Before a senior interview, make sure you can explain without memorizing:

## OAuth Fundamentals

- [ ] OAuth2
- [ ] Authentication vs authorization
- [ ] OAuth actors
- [ ] Authorization Code + PKCE
- [ ] Client Credentials
- [ ] Refresh tokens
- [ ] Scopes

## JWT

- [ ] Header/payload/signature
- [ ] Claims
- [ ] `iss`
- [ ] `sub`
- [ ] `aud`
- [ ] `exp`
- [ ] `kid`
- [ ] HS256 vs RS256
- [ ] JWKS
- [ ] Key rotation

## OIDC

- [ ] OAuth2 vs OIDC
- [ ] Access token vs ID token
- [ ] Nonce
- [ ] User identity

## Spring Boot

- [ ] Resource Server
- [ ] `issuer-uri`
- [ ] JWT decoder
- [ ] `SecurityFilterChain`
- [ ] `@PreAuthorize`
- [ ] Scope authorities
- [ ] Role mapping
- [ ] 401 vs 403

## Microservices

- [ ] API Gateway
- [ ] Token relay
- [ ] Service-to-service authentication
- [ ] Client Credentials
- [ ] Audience validation
- [ ] Defense in depth
- [ ] Business authorization

## Security

- [ ] PKCE
- [ ] State
- [ ] Nonce
- [ ] Redirect URI validation
- [ ] Token replay
- [ ] Token theft
- [ ] Refresh-token rotation
- [ ] Revocation
- [ ] Secure storage
- [ ] No secrets in JWT
- [ ] No token logging
- [ ] Least privilege

---

# 85. Most Important Things to Remember

If you have very little time, remember these 15 points:

1. **OAuth2 = authorization framework.**
2. **OIDC = authentication/identity layer on OAuth2.**
3. **JWT = token format, not OAuth2.**
4. **Authorization Code + PKCE = modern user-facing flow.**
5. **Client Credentials = service-to-service flow.**
6. **Access token = call APIs.**
7. **Refresh token = obtain new access token.**
8. **ID token = client identity information, not an API authorization token.**
9. **Validate signature + issuer + audience + expiry + authorization claims.**
10. **RS256 uses private-key signing and public-key verification.**
11. **JWKS publishes public keys.**
12. **401 = authentication problem; 403 = authorization problem.**
13. **JWT logout/revocation is an architectural problem.**
14. **Never trust frontend authorization alone.**
15. **Microservices should enforce their own security boundary instead of blindly trusting the gateway.**

---

# 86. Suggested Practice Order

For interview preparation, study in this order:

```text
Day 1
 |
 +--> OAuth2 basics
 |
 +--> Authorization Code + PKCE
 |
 +--> Client Credentials
 |
 +--> Access vs Refresh vs ID Token
 |
 +--> JWT
 |
 +--> JWT claims
 |
 +--> RS256 + JWKS
 |
 +--> OIDC
 |
 +--> Spring Security Resource Server
 |
 +--> Gateway + Microservices
 |
 +--> Security scenarios
 |
 +--> Architecture design
 |
 +--> Mock interview
```

The goal is not just to memorize definitions. Be able to draw the architecture and explain **who issues the token, who receives it, who validates it, what claims are checked, and where authorization decisions are made**.
