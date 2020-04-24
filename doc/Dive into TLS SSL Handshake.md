# Dive into TLS/SSL Handshake

TLS/SSL handshake happens after TCP handshake, the difference between SSL and TLS will not be discussed in this article. This article will only focus on the handshake.

NOTE: Using Wireshark follow the TCP Stream

## Client Hello
```
TLSv1.3 Record Layer: Handshake Protocol: Client Hello
    Content Type: Handshake (22)
    Version: TLS 1.0 (0x0301)
    Handshake Protocol: Client Hello
        Handshake Type: Client Hello (1)
        Version: TLS 1.2 (0x0303)
        Random: c595548206b8b084d2aaafd6ea8891e996431d9b3fdbd57e...
        Session ID: d9546e7b55b17bbd85fb6ba72026e492eb2f4d703502f809...
        Cipher Suites (17 suites)
          Cipher Suite: TLS_RSA_WITH_3DES_EDE_CBC_SHA (0x000a)
          ...
```
In the above log, the Client sends `TLS Version`, `Random`, `Cipher Suites`, etc. to server.

## Server Hello
```
TLSv1.2 1361  Server Hello, Certificate, Certificate Status, Server Key Exchange, Server Hello Done 88
Secure Sockets Layer
    TLSv1.2 Record Layer: Handshake Protocol: Multiple Handshake Messages
        Content Type: Handshake (22)
        Version: TLS 1.2 (0x0303)
        Length: 9119
        Handshake Protocol: Server Hello
        Handshake Protocol: Certificate
        Handshake Protocol: Certificate Status
        Handshake Protocol: Server Key Exchange
        Handshake Protocol: Server Hello Done
```
### Handshake Protocol: Server Hello
The server will select the TLS version based on client TLS version, and send back a `Server Hello` response with a Cipher Suite.

#### Random
random will be used to generate `pre-master key`,

### Handshake Protocol: Certificate
The client will validate this certificate following certificate chain in the certificate (Web Browser like Chrome already stored Root CA inside the browser, this Root CA is trusted by the browser, the certificate client received was issued by Root CA or intermediate CA).

- validate expire date
- validate issuer
- validate signature (using public key inside certificate)
- validate domain inside the certificate

```
My Certificate -> Intermediate CA -> Root CA
```

### public key and signature

The public key is included in the certificate(we use public-key validate certificate signature). 
The client and the server encrypt the message with the public key and it can only be decrypted with the private key. The server never shares its private key with anyone.

[TCP segment of a reassembled PDU] "protocol data unit"
Service may send multiple TCP segments here since server response a lot of data, that won't fit in a single TCP segment.

## Client Key Exchange
```
TLSv1.2 159 Client Key Exchange, Change Cipher Spec, Encrypted Handshake Message  94
Secure Sockets Layer
    TLSv1.2 Record Layer: Handshake Protocol: Client Key Exchange
        Content Type: Handshake (22)
        Version: TLS 1.2 (0x0303)
        Length: 37
        Handshake Protocol: Client Key Exchange
    TLSv1.2 Record Layer: Change Cipher Spec Protocol: Change Cipher Spec
    TLSv1.2 Record Layer: Handshake Protocol: Encrypted Handshake Message

```
All TSL handshake process is unencrypted before client key exchange. The client generates a pre-master key and encrypted it by the public key, the pre-master key can only be decrypted by server-side private key (this encrypt end decrypted process called Asymmetric Encryption). The server can generate a master key based on the pre-master key(Symmetric Encryption).

### Change Cipher Spec
Notify the Server to accept using the negotiated CipherSpec and keys.

### Encrypted Handshake Message
Using the negotiated CipherSpec encrypt a message to Server to ensure the message can be encrypted and decrypted properly.

## Server Finish
```
TLSv1.2 186 Change Cipher Spec, Encrypted Handshake Message, Application Data 110
Secure Sockets Layer
    TLSv1.2 Record Layer: Change Cipher Spec Protocol: Change Cipher Spec
    TLSv1.2 Record Layer: Handshake Protocol: Encrypted Handshake Message
    TLSv1.2 Record Layer: Application Data Protocol: http2
```
The server decrypts the pre-master key by using the private key.

### Record Layer: Change Cipher Spec
Sending Change Cipher Spec is to let the Client know that server agrees to send subsequent messages under the just-negotiated CipherSpec and keys.

### Record Layer: Encrypted Handshake Message
Sending Encrypted Handshake Message lets the Client know the key information is correct. TLS handshake is finished the client and server can transferring encrypted data next.

## Keywords
Keywords like `cipher suite`, `pre-master key`, `master key` have different appears between TLS and SSL, this will be discussed in a separate article.
