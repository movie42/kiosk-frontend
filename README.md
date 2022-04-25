# 누구나 키오스크 프로젝트

프로젝트 진행 전에 꼭 읽어보세요!
다른 문의 사항은 채팅방에 남기거나 이슈로 남겨야할 사항은 이슈로 남겨주세요.

## 개요

웹을 통해 키오스크를 만들어 언제 어디서 누구나 쉽게 사용할 수 있는 키오스크 웹 어플리케이션을 만듭니다.

1. Front
   - React v17.0.2
   - React Dom v17.0.2
2. Back
   - NodeJS v16.14.2
   - ExpressJS v4.17.3

## 시작하기

1. github에서 프로젝트 팀원 초대롤 승인합니다.
2. project를 clone합니다.

```shell
$ git clone https://github.com/movie42/kiosk
```

3. clone한 깃 프로젝트 안에서 자신의 브랜치를 만듭니다.

```shell
$ git branch <이름>-main
```

4. github project 탭을 확인합니다.
5. 팀원과 협의하여 자신이 진행할 아이템을 확인합니다.
6. 프로젝트 시작전에 자신의 main branch에서 branch를 한번 더 만듭니다.

```shell
$ git branch <issue NO>
```

7. project/server 폴더 안에서 .env 파일을 생성합니다. MONGODB_ATLAS는 PM에게 문의합니다. .env파일은 git에 업데이트 되지 않도록 각별하게 주의해주시기 바랍니다. git 설정이 꼬여서 혹시 .env파일이 git에 올라간 경우 자신의 브런치 내에서 commit log를 이전으로 롤백하고 git 설정을 다시 해주시기 바랍니다.

```env
PORT=5500
MOGODB_ATLAS=<please request to admin>
```

8. client와 server에서 패키지를 각각 설치합니다.

9. project/server 폴더 안에서 터미널에 다음과 같이 명령어를 입력합니다.

```
$ cd server
$ npm run dev
```

프론트와 백앤드 서버가 동시에 돌아갑니다. 만약 동시에 돌아가게 하고 싶지 않다면 각각 폴더에서 패키지 명령어를 입력합니다.

10. 자신의 코드를 작성합니다.

- 기능 요구사항을 잘 확인해주세요.
- 프로젝트 기본적인 디자인은 [피그마](https://www.figma.com/file/0bv2rseEAQqo8x87zefSyx/everyone-kiosk?node-id=0%3A1)에서 확인하실 수 있습니다.

- Front end는 client 폴더 안에서 작업합니다.
- Back end는 server 폴더 안에서 작업합니다.

😄 즐거운 코딩 하세요!

## Commit Rule && Setting

커밋 규칙은 인터넷에 있는 [Udacity의 Commit Rule](https://udacity.github.io/git-styleguide/)을 참고했습니다.
커밋 메시지 세팅 방법은 [Git commit message template 만들기](https://ujuc.github.io/2020/02/02/git-commit-message-template-man-deul-gi/)라는 글을 참고했습니다.

1. 터미널에 다음과 같이 입력합니다.

```shell
$ git config --global commit.template ~/.gitmessage
$ code ~/.gitmessage
```

2. 만약에 깃 커밋 메시지를 글로벌하게 세팅하고 싶지 않다면 아래와 같이 명령어를 입력하세요.

```shell
git config commit.template ./path/to/.gitmessage
```

3. vscode에서 .gitmessage파일이 열린것을 확인할 수 있습니다. 아래 규칙을 덮어쓰기하세요.

```
# type: 제목을 작성하세요. 50자 이내 핵심만 써주세요.
#  '#'이 표시된 곳은 주석처리됩니다. 지우고 커밋을 작성하면 해당 부분은 기록으로 남습니다.
# body 본문을 작성하세요.
# 제목과 본문은 한칸 띄우고 작성해주세요.
# 본문에는 무엇을 어떻게 했는지를 중심으로 작성해주세요.

# footer 이슈 번호를 등록해주세요.

# 자신에게 알맞은 type을 골라 기록하세요
# _______________________________________
# feat: 새로운 기능을 추가했을 떄.
# fix: 버그를 고쳤을 때
# docs: README와 같은 팀 전체가 공유하고 있는 문서를 수정하거나 새롭게 추가했을 때
# style: 기능외에 코드 스타일을 추가했을 때
# refactor: 코드를 리펙토링 했을 때
# test: 테스트를 진행했을 때, 또는 테스트 코드를 작성했을 때
# chore: Updating build tasks, package manager configs, etc; no production code change
# _______________________________________
#
# Remember me ~
#   Capitalize the subject line
#     제목줄은 대문자로 시작한다.
#   Use the imperative mood in the subject line
#     제목줄은 명령어로 작성한다.
#   Do not end the subject line with a period
#     제목줄은 마침표로 끝내지 않는다.
#   Separate subject from body with a blank line
#     본문과 제목에는 빈줄을 넣어서 구분한다.
#   Use the body to explain what and why vs. how
#     본문에는 "어떻게" 보다는 "왜"와 "무엇을" 설명한다.
#   Can use multiple lines with "-" for bullet points in body
#     본문에 목록을 나타낼때는 "-"로 시작한다.
#
```

4. 저장하고 종료합니다.
5. 설정이 제대로 되었는지 확인하려면 commit을 직접 해보거나 명령어를 입력해서 \[commit\] 부분에 자신이 설정한대로 저장되었는지 확인합니다.

```shell
// global로 commit message를 입력했다면
$ git config --global -e

// local에 설정했다면
$ git config -e
```

6. commit 메시지를 작성할 때 commit만 입력합니다. vi 편집기가 열립니다. 만약 vi 편집기가 익숙하지 않다면 [아티클](https://rottk.tistory.com/entry/VS-Code-%EB%A5%BC-Git-%ED%8E%B8%EC%A7%91%EA%B8%B0%EB%A1%9C-%ED%99%9C%EC%9A%A9)을 읽어보고 vscode를 git 기본 편집기로 설정합니다.

7. 커밋합니다.

```
$ git commit
```

😀 즐거운 코딩 되세요!

## Style Guide

### 🌈Color

컬러를 지정할 때 지정된 컬러를 사용해주세요.

Primary = primary600
Primary Hover = primary800
Primary Active = primary400
Secondary = secondary500
Secondary Hover = secondary700
Secondary Active = secondary300
Error, Warn = error500
Error, Warn Hover = error800
Error, Warn Active = error300
Line default = gray200
Button default = gray 300
Background default = background100
Transparent Background default = backgroundBlack70
Font Color default = fontColorBlack

색상이 지정되지 않은 버튼 등을 구분해야할 때 Primary와 Secondary에서 결정해주세요. Color Step을 300의 간격으로 설정해주세요.

error100~900은 경고나 에러에만 사용하려고 합니다. UI가 경고의 의미가 아닌 것은 사용하지 않습니다.

### Font

1. Basic Font

   - Noto Sans KR

2. Default Font Style

변경하고 싶은 사항이 있으면 언제든지 알려주세요!

- mixin.ts

```ts
export const Headline1 = styled.h1`
  font-size: 5rem;
  font-weight: 900;
  line-height: 2;
  letter-spacing: -0.2;
`;

export const Headline2 = styled.h2`
  font-size: 3rem;
  font-weight: 900;
  line-height: 2;
  letter-spacing: -0.2;
`;

export const SubTitle1 = styled.h3`
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 1.7;
  letter-spacing: -0.1;
`;

export const SubTitle2 = styled.h4`
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.7;
  letter-spacing: -0.1;
`;

export const Body1 = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: -0.1;
`;
```

## MEET UP

1. 매주 수요일 8시

   - 프로젝트 피드백
     - 좋은거, 불만 사항, 개선 사항 협의 등
   - 개인 회고
     - 자신이 배운거, 겪고 있는 이슈 공유 등
   - 계획
     - 현재 진행된 정도에 따라 앞으로 어느정도까지 완성될 수 있을지

2. 매주 일요일 8시
   - 프로젝트 동작 눈으로 보고 확인하기
     - 확인되는 버그, 따로 작업한 사항 연결할 부분 찾기 등
     - 확인된 사항을 바탕으로 역할 정하기
