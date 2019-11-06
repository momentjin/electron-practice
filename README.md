# ReZoom Client  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Click to open the demo version](http://15.164.44.50:8081/)
- id : test@test.test
- pw : test

## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [License](#license)


## About The Project

<img src="https://github.com/momentjin/study/blob/master/resource/image/rezoom-screenshot1.png" width="400px"> <img src="https://github.com/momentjin/study/blob/master/resource/image/rezoom-screenshot3.png" width="400px">

자기소개서 관리 어플리케이션의 Client입니다. [여기](https://github.com/momentjin/study/blob/master/%ED%86%A0%EC%9D%B4%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%ED%9A%8C%EA%B3%A0%EB%A1%9D.md)를 참고하면 프로젝트 회고록을 볼 수 있습니다.

현재 지원하는 기능
- 자기소개서 CRUD
- 해시태그를 이용한 문항 검색
- 서류 마감 N일전 알림 (현재는 Email 알림 기능만 지원)
- .txt파일로 작성된 자기소개서 마이그레이션 (내용 형식 일치할 때만 가능)

앞으로 추가할 기능
- [issue link 참고](https://github.com/Nexters/rezoom-backend/issues?q=is%3Aopen+is%3Aissue+label%3Aenhancement)

### Built With
- html5, css3, javascript(es6)
- vue 2, vuex, vue-router, vuetify

## Getting Started

### Prerequisites

- npm
 
### Installation

1. Clone the repository
```sh
~/$ git clone https://github.com/momentjin/rezoom-desktop.git
```

2. Install dependencies
```sh
~/$ cd rezoom-desktop
~/rezoom-desktop$ npm install
```

3. Run the application
```sh
~/rezoom-desktop$ npm run serve
```

### Usage

Get ready for this..

## License

Copyright 2019 momentjin.

Licensed under the MIT license:

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.