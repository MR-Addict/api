# Chrome AWS Lambda API

## 1. Screenshot API

Method:

| Key          | Value                             |
| :----------- | :-------------------------------- |
| Method       | POST                              |
| Content-Type | application/x-www-form-urlencoded |

Body:

| Body              | Value    | Requirements |
| :---------------- | :------- | :----------- |
| url               | string   | required     |
| type              | png,jpeg | optional     |
| width             | 320~3840 | optional     |
| height            | 240~2160 | optional     |
| delay             | 0~10     | optional     |
| timeout           | 10~60    | optional     |
| fullPage          | booelan  | optional     |
| disableAnimations | boolean  | optional     |

Example:

```bash
curl https://chromeawslambdaapi.vercel.app/api/screenshot -X POST -d 'url=http://google.com'
```
