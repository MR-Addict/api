# API Center

- [API Center](#api-center)
  - [1. Screenshot API](#1-screenshot-api)
    - [`/screenshot`](#screenshot)
  - [2. Daily quotes API](#2-daily-quotes-api)
    - [`/quote`](#quote)
  - [3. Qndxx screenshot API](#3-qndxx-screenshot-api)
    - [`/qndxx/current`](#qndxxcurrent)
    - [`/qndxx/list`](#qndxxlist)
  - [4. Lamp API](#4-lamp-api)
    - [`/lamp`](#lamp)
  - [5. OpenAI](#5-openai)
    - [`/openai/chat`](#openaichat)

## 1. Screenshot API

### `/screenshot`

Take any website screenshot from url

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
curl https://api.mraddict.one/screenshot -X POST -d 'url=https://example.com'
```

## 2. Daily quotes API

### `/quote`

Get daily quotes

Method:

| Key      | Value            |
| :------- | :--------------- |
| Method   | GET              |
| Response | application/json |

Search params:

| Search params | Value  | Default | Requirements |
| :------------ | :----- | :------ | :----------- |
| date          | string | Today   | optional     |

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
curl https://api.mraddict.one/quote?date=2023-02-20
```

## 3. Qndxx screenshot API

### `/qndxx/current`

Get **current** Qndxx data.

Method:

| Key      | Value            |
| :------- | :--------------- |
| Method   | GET              |
| Response | application/json |

Response:

```json
{
  "status": true,
  "data": {
    "id": "C0126",
    "title": "2023年第3期",
    "startTime": "2023-03-13 09:56:40",
    "endTime": "2023-03-19 22:00:00",
    "uri": "https://h5.cyol.com/special/daxuexi/fe3ao1cm3k/index.html",
    "cover": "https://st-file.yunbanos.cn/uploadsoss/qczj-youth-learning/2023-03-13/bf51cb5ead3fcc30ee9557a86250398b.png",
    "screenshot": "https://h5.cyol.com/special/daxuexi/fe3ao1cm3k/images/end.jpg"
  }
}
```

Example:

```bash
curl https://api.mraddict.one/qndxx/current
```

### `/qndxx/list`

Get the latest **10** of Qndxx data.

Method:

| Key      | Value            |
| :------- | :--------------- |
| Method   | GET              |
| Response | application/json |

Response:

```json
{
  "status": true,
  "data": [
    {
    "id": "C0126",
    "title": "2023年第3期",
    "startTime": "2023-03-13 09:56:40",
    "endTime": "2023-03-19 22:00:00",
    "uri": "https://h5.cyol.com/special/daxuexi/fe3ao1cm3k/index.html",
    "cover": "https://st-file.yunbanos.cn/uploadsoss/qczj-youth-learning/2023-03-13/bf51cb5ead3fcc30ee9557a86250398b.png",
    "screenshot": "https://h5.cyol.com/special/daxuexi/fe3ao1cm3k/images/end.jpg"
  },
  ...
  ]
}
```

Example:

```bash
curl https://api.mraddict.one/qndxx/list
```

## 4. Lamp API

### `/lamp`

Control my room desktop lamp:

Method:

| Key          | Value                             |
| :----------- | :-------------------------------- |
| Method       | POST                              |
| Content-Type | application/x-www-form-urlencoded |
| Response     | No response                       |

Body:

| Body   | Value             | Default | Requirements |
| :----- | :---------------- | :------ | :----------- |
| token  | string            | None    | required     |
| status | on,off            | None    | required     |
| mode   | Bright,Night,Warm | Bright  | optional     |

Response:

No response.

Example:

```bash
# turn lamp on
curl -X POST https://api.mraddict.one/lamp -d "token=authorizedToken&status=on&mode=Bright"
# turn lamp off
curl -X POST https://api.mraddict.one/lamp -d "token=authorizedToken&status=off"
```

## 5. OpenAI

### `/openai/chat`

Communication with openAI:

Method:

| Key          | Value            |
| :----------- | :--------------- |
| Method       | POST             |
| Content-Type | application/json |
| Response     | application/json |

Header:

| Key           | Value        |
| :------------ | :----------- |
| authorization | openAIApiKey |

Body:

| Body              | Value   | Default | Requirements |
| :---------------- | :------ | :------ | :----------- |
| model             | string  | None    | required     |
| messages          | array   | None    | required     |
| temperature       | number  | None    | optional     |
| top_p             | number  | None    | optional     |
| n                 | number  | None    | optional     |
| stream            | boolean | None    | optional     |
| max_tokens        | number  | None    | optional     |
| presence_penalty  | number  | None    | optional     |
| frequency_penalty | number  | None    | optional     |

Response:

```json
{
  "status": true,
  "data": {
    "id": "chatcmpl-123",
    "object": "chat.completion",
    "created": 1677652288,
    "choices": [
      {
        "index": 0,
        "message": {
          "role": "assistant",
          "content": "\n\nHello there, how may I assist you today?"
        },
        "finish_reason": "stop"
      }
    ],
    "usage": {
      "prompt_tokens": 9,
      "completion_tokens": 12,
      "total_tokens": 21
    }
  }
}
```

Example:

```js
fetch("https://api.mraddict.one/openai/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "openAIApiKey",
  },
  body: JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: "Tell me a joke",
      },
    ],
  }),
})
  .then((res) => res.json())
  .then((res) => console.log(res));
```
