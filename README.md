# Chrome AWS Lambda API

## 1. Screenshot API

Method:

| Key          | Value                             |
| :----------- | :-------------------------------- |
| Method       | POST                              |
| Content-Type | application/x-www-form-urlencoded |
| Response     | application/json                  |

Body:

| Body              | Value         | Default | Requirements |
| :---------------- | :------------ | :------ | :----------- |
| url               | string        | None    | required     |
| type              | png,jpeg,webp | webp    | optional     |
| width             | 320~3840      | 1920    | optional     |
| height            | 240~2160      | 800     | optional     |
| delay             | 0~10          | 0       | optional     |
| timeout           | 10~60         | 30      | optional     |
| fullPage          | booelan       | false   | optional     |
| disableAnimations | boolean       | false   | optional     |

Response:

```json
{
  "status": true,
  "data": {
    "type": "webp",
    "runtime": "1.534s",
    "url": "https://example.com",
    "base64": "data:image/webp;base64,AFSDS4545aHR0cHM6Ly9leGFtcGxlLmNvbQ=="
  }
}
```

Example:

```bash
curl https://chromeawslambdaapi.mraddict.one/screenshot -X POST -d 'url=https://example.com'
```
