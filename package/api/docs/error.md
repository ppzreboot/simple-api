# Errors

Report error from the server's perspective.  
Categorise error for the convenience of the caller.  

## Network Errors

Errors that occur outside the server.
+ Client network issues
+ Proxy or gateway failures
+ Load balancer or reverse proxy errors
+ Timeouts before reaching the server

In short, when such an error occurs,
it means that the actual service never received the request.

This type of errors are naturally indicated by HTTP status code.

> When the server app receives a request
> and detects insufficient permissions,
> it does not use HTTP status codes like 401 or 403.
> This is to **explicitly inform** the caller
> that the error **originates from the server app itself**,
> rather than from the communication process (e.g., Nginx).

## Developer's Errors

### Parsing Error

For example, the Content-Type is JSON,
but the body actually contains FormData.
This will result in a Parsing Error.

### Format Error

### Not Login Error

### Permission Error

## Infrastructure Error

+ Database crash
+ OSS service expired/unpaid
+ Third-party API unavailable
+ Cloud service quota exceeded
+ ...

## internal unknown Error

`try` the whole process of handling requests,
`catch` the error.
The Error is internal unknown error.
