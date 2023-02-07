# Chrome AWS Lambda API

## 1. Screenshot API

Method:

| Key          | Value                             |
| :----------- | :-------------------------------- |
| Method       | POST                              |
| Content-Type | application/x-www-form-urlencoded |
| Response     | application/json                  |

Body:

| Body              | Value    | Default | Requirements |
| :---------------- | :------- | :------ | :----------- |
| url               | string   | None    | required     |
| type              | png,jpeg | png     | optional     |
| width             | 320~3840 | 1280    | optional     |
| height            | 240~2160 | 800     | optional     |
| delay             | 0~10     | 0       | optional     |
| timeout           | 10~60    | 30      | optional     |
| fullPage          | booelan  | false   | optional     |
| disableAnimations | boolean  | false   | optional     |

Response:

```json
{
  "status": true,
  "data": {
    "type": "png",
    "runtime": "1.534s",
    "url": "https://example.com",
    "base64": "data:image/png;base64,AFSDS4545aHR0cHM6Ly9leGFtcGxlLmNvbQ=="
  }
}
```

Example:

```bash
curl https://chromeawslambdaapi.vercel.app/api/screenshot -X POST -d 'url=https://example.com'
```
