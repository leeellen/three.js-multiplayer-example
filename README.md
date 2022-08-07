# 시작하기

## package manager

### yarn berry

```
$ npm install -g yarn // 있으면 생략
$ yarn install

/* 프로젝트에 typescript 버전 vscode 따르게 하기 위한 설정 */
$ yarn dlx @yarnpkg/sdks vscode

$ yarn dev // localhost:3000
```

### npm

```
$ npm install
$ npm run dev
```

## 프로젝트명 바꾸기

-   `package.json` 에서 해당 프로젝트명으로 변경

## gitignore

-   선택한 package manager dependency 파일 지우기

```
/* npm 선택 */
package-lock.json

/* yarn 선택 */

yarn.lock
.yarn
.yarnrc.yml
.vscode
```
