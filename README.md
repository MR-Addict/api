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
| height            | 240~2160      | 1080    | optional     |
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

## 2. Daily quotes

Method:

| Key      | Value            |
| :------- | :--------------- |
| Method   | GET              |
| Response | application/json |

Search params:

| Search params | Value  | Default | Requirements |
| :------------ | :----- | :------ | :----------- |
| date          | string | None    | optional     |

Response:

```json
{
  "status": true,
  "data": {
    "date": "2023-02-20",
    "zh": "你每生气一分钟，也就失去了六十秒的幸福。",
    "en": "For every minute you are angry, you lose sixty seconds of happiness.",
    "img": "https://staticedu-wps.cache.iciba.com/image/d486eb38c2ccb2a54de3d155a66eb31f.jpg",
    "preview": "https://staticedu-wps.cache.iciba.com/image/d411ef78a741e412b9c8fe238b7faa5c.jpg"
  }
}
```

Example:

```bash
curl https://chromeawslambdaapi.mraddict.one/quote?date=2023-02-20
```
