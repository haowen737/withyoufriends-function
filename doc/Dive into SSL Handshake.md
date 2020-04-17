# Unfinished

> Using wireshark 
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
client send
- TLS Version
- Random
- Cipher Suites
to server.

## Server Hello
```
TLSv1.3 Record Layer: Handshake Protocol: Server Hello
    Content Type: Handshake (22)
    Version: TLS 1.2 (0x0303)
    Length: 122
    Handshake Protocol: Server Hello
        Handshake Type: Server Hello (2)
        Version: TLS 1.2 (0x0303)
        Random: a99874164470ecda4d8229fa13236c60704583bacf8d1b61...
        Session ID: d9546e7b55b17bbd85fb6ba72026e492eb2f4d703502f809...
        Cipher Suite: TLS_AES_128_GCM_SHA256 (0x1301)
        Extensions Length: 46
        Extension: supported_versions (len=2)
            Type: supported_versions (43)
            Length: 2
            Supported Version: TLS 1.3 (0x0304)
        Extension: key_share (len=36)
            Type: key_share (51)
            Length: 36
            Key Share extension
                Key Share Entry: Group: x25519, Key Exchange length: 32
                    Group: x25519 (29)
                    Key Exchange Length: 32
                    Key Exchange: 3eab99e380c77876a324b87eea3f97567cade7c003688a16...

```

[TCP segment of a reassembled PDU] "protocol data unit"
Server may send multiple tcp segment here since server response a lot of data, that won't fit in a single TCP segment.

## 

